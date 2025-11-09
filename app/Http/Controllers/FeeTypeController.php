<?php

namespace App\Http\Controllers;

use App\Models\FeeType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeeTypeController extends Controller
{
    public function index()
    {
        return Inertia::render('Finance/FeeTypes/Index', [
            'feeTypes' => FeeType::orderBy('id', 'desc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Finance/FeeTypes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'default_amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        FeeType::create($validated);
        return redirect()->route('fee-types.index')->with('success', 'Thêm loại phí thành công!');
    }

    public function edit(FeeType $feeType)
    {
        return Inertia::render('Finance/FeeTypes/Edit', [
            'feeType' => $feeType,
        ]);
    }

    public function update(Request $request, FeeType $feeType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'default_amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $feeType->update($validated);
        return redirect()->route('fee-types.index')->with('success', 'Cập nhật loại phí thành công!');
    }

    public function destroy(FeeType $feeType)
    {
        $feeType->delete();
        return redirect()->route('fee-types.index')->with('success', 'Đã xóa loại phí.');
    }
}
