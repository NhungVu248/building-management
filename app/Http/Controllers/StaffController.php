<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    /**
     * Danh sách nhân sự (có tìm kiếm và phân trang)
     */
    public function index(Request $request)
    {
        $query = Staff::query();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhere('phone', 'like', "%$search%");
            });
        }

        $staff = $query->orderByDesc('id')->paginate(10)->withQueryString();

        return Inertia::render('Staff/Index', [
            'staff' => $staff,
            'filters' => ['search' => $search],
            'success' => session('success'),
        ]);
    }

    /**
     * Trang tạo mới nhân sự
     */
    public function create()
    {
        return Inertia::render('Staff/Create');
    }

    /**
     * Lưu nhân sự mới
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255', 'unique:staff,email'],
            'phone'      => ['nullable', 'string', 'max:30'],
            'position'   => ['nullable', 'string', 'max:255'],
            'department' => ['nullable', 'string', 'max:255'],
            'note'       => ['nullable', 'string'],
            'avatar'     => ['nullable', 'image', 'max:2048'],
        ]);
        if ($request->hasFile('avatar')) {
        $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }
        Staff::create($data);

        return redirect()
            ->route('staff.index')
            ->with('success', 'Nhân sự đã được thêm thành công.');
    }

    /**
     * Trang sửa nhân sự
     */
    public function edit(Staff $staff)
    {
        return Inertia::render('Staff/Edit', ['staff' => $staff]);
    }

    /**
     * Cập nhật thông tin nhân sự
     */
    public function update(Request $request, Staff $staff)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255', 'unique:staff,email,' . $staff->id],
            'phone'      => ['nullable', 'string', 'max:30'],
            'position'   => ['nullable', 'string', 'max:255'],
            'department' => ['nullable', 'string', 'max:255'],
            'note'       => ['nullable', 'string'],
            'avatar'     => ['nullable', 'image', 'max:2048'],
        ]);
        if ($request->hasFile('avatar')) {
        // Xoá file cũ nếu có
        if ($staff->avatar && \Storage::disk('public')->exists($staff->avatar)) {
            \Storage::disk('public')->delete($staff->avatar);
        }

        $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }
        $staff->update($data);

        return redirect()
            ->route('staff.index')
            ->with('success', 'Cập nhật thông tin nhân sự thành công.');
    }

    /**
     * Xoá nhân sự
     */
    public function destroy(Staff $staff)
    {
        $staff->delete();

        return redirect()
            ->route('staff.index')
            ->with('success', 'Đã xoá nhân sự.');
    }
}
