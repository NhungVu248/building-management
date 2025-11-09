<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        $staff = Staff::all();
        return Inertia::render('Staff/Index', ['staff' => $staff]);
    }

    public function create()
    {
        return Inertia::render('Staff/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:staff',
            'phone' => 'nullable|string|max:15',
            'role'  => 'nullable|string|max:100',
        ]);

        Staff::create($data);
        return redirect()->route('staff.index');
    }

    public function edit(Staff $staff)
    {
        return Inertia::render('Staff/Edit', ['staff' => $staff]);
    }

    public function update(Request $request, Staff $staff)
    {
        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:staff,email,' . $staff->id,
            'phone' => 'nullable|string|max:15',
            'role'  => 'nullable|string|max:100',
        ]);

        $staff->update($data);
        return redirect()->route('staff.index');
    }

    public function destroy(Staff $staff)
    {
        $staff->delete();
        return redirect()->route('staff.index');
    }
}
