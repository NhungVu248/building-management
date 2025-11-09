<?php

namespace App\Http\Controllers;

use App\Models\AmenityBooking;
use App\Models\Amenity;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AmenityBookingController extends Controller
{
    /**
     * Danh sách đặt tiện ích
     */
    public function index()
    {
        $bookings = AmenityBooking::with(['amenity','resident.apartment'])
            ->orderByDesc('booking_date')
            ->orderBy('start_time')
            ->paginate(20);

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Form tạo mới
     */
    public function create()
    {
        return Inertia::render('Bookings/Create', [
            'amenities' => Amenity::where('is_active', 1)
                ->orderBy('name')
                ->get(['id','name','capacity','max_per_week']),
            'residents' => Resident::with('apartment:id,code')
                ->orderBy('name')
                ->get(['id','name','apartment_id']),
        ]);
    }

    /**
     * Lưu đặt tiện ích mới
     */
    public function store(Request $r)
    {
        $data = $r->validate([
            'amenity_id'   => 'required|exists:amenities,id',
            'resident_id'  => 'required|exists:residents,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time'   => 'required|date_format:H:i',
            'end_time'     => 'required|date_format:H:i|after:start_time',
            'status'       => 'required|in:Đã xác nhận,Đã hủy',
        ]);

        $amenity = Amenity::findOrFail($data['amenity_id']);

        // 1️⃣ Kiểm tra chồng lấn khung giờ (tính theo capacity)
        $count = AmenityBooking::where('amenity_id', $data['amenity_id'])
            ->where('booking_date', $data['booking_date'])
            ->where('status', 'Đã xác nhận')
            ->where(function ($q) use ($data) {
                $q->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                  ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']])
                  ->orWhere(function ($q2) use ($data) {
                      $q2->where('start_time', '<=', $data['start_time'])
                         ->where('end_time', '>=', $data['end_time']);
                  });
            })
            ->count();

        if ($count >= $amenity->capacity) {
            return back()
                ->withErrors(['booking' => 'Khung giờ đã đầy công suất.'])
                ->withInput();
        }

        // 2️⃣ Giới hạn số lần/tuần mỗi cư dân
        $date = Carbon::parse($data['booking_date']);
        $weekStart = $date->copy()->startOfWeek();
        $weekEnd   = $date->copy()->endOfWeek();

        $weeklyCount = AmenityBooking::where('amenity_id', $data['amenity_id'])
            ->where('resident_id', $data['resident_id'])
            ->whereBetween('booking_date', [$weekStart->toDateString(), $weekEnd->toDateString()])
            ->where('status', 'Đã xác nhận')
            ->count();

        if ($weeklyCount >= ($amenity->max_per_week ?? 5)) {
            return back()
                ->withErrors(['resident_id' => 'Cư dân đã đạt giới hạn đặt / tuần cho tiện ích này.'])
                ->withInput();
        }

        // 3️⃣ Chặn trùng giờ cùng cư dân
        $userOverlap = AmenityBooking::where('resident_id', $data['resident_id'])
            ->where('booking_date', $data['booking_date'])
            ->where('status', 'Đã xác nhận')
            ->where(function ($q) use ($data) {
                $q->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                  ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']])
                  ->orWhere(function ($q2) use ($data) {
                      $q2->where('start_time', '<=', $data['start_time'])
                         ->where('end_time', '>=', $data['end_time']);
                  });
            })
            ->exists();

        if ($userOverlap) {
            return back()
                ->withErrors(['resident_id' => 'Cư dân đã có lịch trùng khung giờ này.'])
                ->withInput();
        }

        AmenityBooking::create($data);

        return redirect()
            ->route('bookings.index')
            ->with('success', 'Đã tạo lịch đặt tiện ích.');
    }

    /**
     * Form sửa đặt tiện ích
     */
    public function edit(AmenityBooking $booking)
    {
        return Inertia::render('Bookings/Edit', [
            'booking'    => $booking->load(['amenity','resident.apartment']),
            'amenities'  => Amenity::where('is_active', 1)
                ->orderBy('name')
                ->get(['id','name','capacity','max_per_week']),
            'residents'  => Resident::with('apartment:id,code')
                ->orderBy('name')
                ->get(['id','name','apartment_id']),
        ]);
    }

    /**
     * Cập nhật đặt tiện ích
     */
    public function update(Request $r, AmenityBooking $booking)
    {
        $data = $r->validate([
            'amenity_id'   => 'required|exists:amenities,id',
            'resident_id'  => 'required|exists:residents,id',
            'booking_date' => 'required|date',
            'start_time'   => 'required|date_format:H:i',
            'end_time'     => 'required|date_format:H:i|after:start_time',
            'status'       => 'required|in:Đã xác nhận,Đã hủy',
        ]);

        $amenity = Amenity::findOrFail($data['amenity_id']);

        // 1️⃣ Kiểm tra trùng slot (loại bỏ chính bản ghi này)
        $count = AmenityBooking::where('amenity_id', $data['amenity_id'])
            ->where('booking_date', $data['booking_date'])
            ->where('status', 'Đã xác nhận')
            ->where('id', '<>', $booking->id)
            ->where(function ($q) use ($data) {
                $q->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                  ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']])
                  ->orWhere(function ($q2) use ($data) {
                      $q2->where('start_time', '<=', $data['start_time'])
                         ->where('end_time', '>=', $data['end_time']);
                  });
            })
            ->count();

        if ($count >= $amenity->capacity) {
            return back()
                ->withErrors(['booking' => 'Khung giờ đã đầy công suất.'])
                ->withInput();
        }

        // 2️⃣ Kiểm tra trùng giờ của cư dân (bỏ qua bản hiện tại)
        $userOverlap = AmenityBooking::where('resident_id', $data['resident_id'])
            ->where('booking_date', $data['booking_date'])
            ->where('id', '<>', $booking->id)
            ->where('status', 'Đã xác nhận')
            ->where(function ($q) use ($data) {
                $q->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                  ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']])
                  ->orWhere(function ($q2) use ($data) {
                      $q2->where('start_time', '<=', $data['start_time'])
                         ->where('end_time', '>=', $data['end_time']);
                  });
            })
            ->exists();

        if ($userOverlap) {
            return back()
                ->withErrors(['resident_id' => 'Cư dân đã có lịch trùng khung giờ này.'])
                ->withInput();
        }

        $booking->update($data);

        return redirect()
            ->route('bookings.index')
            ->with('success', 'Đã cập nhật lịch đặt tiện ích.');
    }

    /**
     * Xóa đặt tiện ích
     */
    public function destroy(AmenityBooking $booking)
    {
        $booking->delete();

        return redirect()
            ->route('bookings.index')
            ->with('success', 'Đã xóa lịch đặt tiện ích.');
    }
}
