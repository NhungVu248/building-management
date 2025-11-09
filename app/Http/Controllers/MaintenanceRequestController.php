<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceRequest;
use App\Http\Requests\StoreMaintenanceRequest;
use App\Http\Requests\UpdateMaintenanceRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceRequestController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['q','status','priority']);
        $requests = MaintenanceRequest::query()
            ->filter($filters)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Maintenance/Index', [
            'requests' => $requests,
            'filters'  => $filters,
            'enums'    => [
                'status'   => ['pending','in_progress','completed','cancelled'],
                'priority' => ['low','medium','high'],
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Maintenance/Create', [
            'enums' => [
                'status'   => ['pending','in_progress','completed','cancelled'],
                'priority' => ['low','medium','high'],
            ],
        ]);
    }

    public function store(StoreMaintenanceRequest $request)
    {
        $data = $request->validated();

        // nếu chọn completed thì ghi completed_at
        if (($data['status'] ?? 'pending') === 'completed' && empty($data['completed_at'])) {
            $data['completed_at'] = now();
        }

        MaintenanceRequest::create($data);
        return redirect()->route('maintenance.index')->with('success','Đã tạo yêu cầu bảo trì.');
    }

    public function edit(MaintenanceRequest $maintenance)
    {
        return Inertia::render('Maintenance/Edit', [
            'item'  => $maintenance,
            'enums' => [
                'status'   => ['pending','in_progress','completed','cancelled'],
                'priority' => ['low','medium','high'],
            ],
        ]);
    }

    public function update(UpdateMaintenanceRequest $request, MaintenanceRequest $maintenance)
    {
        $data = $request->validated();

        if (($data['status'] ?? 'pending') === 'completed' && empty($data['completed_at'])) {
            $data['completed_at'] = now();
        }
        if (($data['status'] ?? '') !== 'completed') {
            $data['completed_at'] = null;
        }

        $maintenance->update($data);
        return redirect()->route('maintenance.index')->with('success','Đã cập nhật yêu cầu bảo trì.');
    }

    public function destroy(MaintenanceRequest $maintenance)
    {
        $maintenance->delete();
        return redirect()->route('maintenance.index')->with('success','Đã xóa yêu cầu bảo trì.');
    }
}
