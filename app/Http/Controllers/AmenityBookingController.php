<?php

namespace App\Http\Controllers;

use App\Models\AmenityBooking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Amenity;
use App\Models\Resident;

class AmenityBookingController extends Controller
{
    public function index()
    {
        $bookings = AmenityBooking::with(['amenity','resident.apartment'])
            ->orderByDesc('booking_date')->orderBy('start_time')
            ->paginate(20);

        return Inertia::render('Bookings/Index', ['bookings'=>$bookings]);
    }

    public function create()
    {
        return Inertia::render('Bookings/Create', [
            'amenities'=> Amenity::where('is_active',1)->orderBy('name')->get(['id','name','capacity']),
            'residents'=> Resident::with('apartment:id,code')->orderBy('name')->get(['id','name','apartment_id']),
        ]);
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'amenity_id'=>'required|exists:amenities,id',
            'resident_id'=>'required|exists:residents,id',
            'booking_date'=>'required|date',
            'start_time'=>'required|date_format:H:i',
            'end_time'=>'required|date_format:H:i|after:start_time',
            'status'=>'required|in:Đã xác nhận,Đã hủy'
        ]);

        // Kiểm tra trùng slot & capacity
        $count = AmenityBooking::where('amenity_id',$data['amenity_id'])
            ->where('booking_date',$data['booking_date'])
            ->where('status','Đã xác nhận')
            ->where(function($q) use($data){
                $q->whereBetween('start_time', [$data['start_time'],$data['end_time']])
                  ->orWhereBetween('end_time',   [$data['start_time'],$data['end_time']])
                  ->orWhere(function($q2) use($data){
                      $q2->where('start_time','<=',$data['start_time'])
                         ->where('end_time','>=',$data['end_time']);
                  });
            })->count();

        $capacity = Amenity::find($data['amenity_id'])->capacity;
        if ($count >= $capacity) {
            return back()->withErrors(['booking'=>'Khung giờ đã đầy, vui lòng chọn thời gian khác.'])->withInput();
        }

        AmenityBooking::create($data);
        return redirect()->route('bookings.index');
    }

    public function edit(AmenityBooking $booking)
    {
        return Inertia::render('Bookings/Edit', [
            'booking'=>$booking,
            'amenities'=> Amenity::where('is_active',1)->orderBy('name')->get(['id','name','capacity']),
            'residents'=> Resident::with('apartment:id,code')->orderBy('name')->get(['id','name','apartment_id']),
        ]);
    }

    public function update(Request $r, AmenityBooking $booking)
    {
        $data = $r->validate([
            'amenity_id'=>'required|exists:amenities,id',
            'resident_id'=>'required|exists:residents,id',
            'booking_date'=>'required|date',
            'start_time'=>'required|date_format:H:i',
            'end_time'=>'required|date_format:H:i|after:start_time',
            'status'=>'required|in:Đã xác nhận,Đã hủy'
        ]);

        // Kiểm tra trùng slot (loại trừ chính booking đang sửa)
        $count = AmenityBooking::where('amenity_id',$data['amenity_id'])
            ->where('booking_date',$data['booking_date'])
            ->where('status','Đã xác nhận')
            ->where('id','<>',$booking->id)
            ->where(function($q) use($data){
                $q->whereBetween('start_time', [$data['start_time'],$data['end_time']])
                  ->orWhereBetween('end_time',   [$data['start_time'],$data['end_time']])
                  ->orWhere(function($q2) use($data){
                      $q2->where('start_time','<=',$data['start_time'])
                         ->where('end_time','>=',$data['end_time']);
                  });
            })->count();

        $capacity = Amenity::find($data['amenity_id'])->capacity;
        if ($count >= $capacity) {
            return back()->withErrors(['booking'=>'Khung giờ đã đầy, vui lòng chọn thời gian khác.'])->withInput();
        }

        $booking->update($data);
        return redirect()->route('bookings.index');
    }

    public function destroy(AmenityBooking $booking)
    {
        $booking->delete();
        return redirect()->route('bookings.index');
    }
}

