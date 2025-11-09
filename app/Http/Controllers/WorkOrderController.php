<?php

// WorkOrderController
namespace App\Http\Controllers;

use App\Models\WorkOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class WorkOrderController extends Controller
{
    public function index() {
        return Inertia::render('WorkOrders/Index', [
            'items' => WorkOrder::latest()->paginate(15)
        ]);
    }
    public function create() { return Inertia::render('WorkOrders/Form'); }

    public function store(Request $r) {
        $data = $r->validate([
            'title'=>'required',
            'source'=>'in:resident,incident,schedule,manual',
            'description'=>'nullable|string',
            'priority'=>'in:low,normal,high,urgent',
            'status'=>'in:new,assigned,in_progress,waiting_material,completed,closed',
            'technician_name'=>'nullable|string',
            'due_date'=>'nullable|date',
            'cost'=>'nullable|numeric',
            'linked_incident_id'=>'nullable|integer'
        ]);
        WorkOrder::create($data);
        return redirect()->route('work-orders.index');
    }

    public function edit(WorkOrder $work_order) {
        return Inertia::render('WorkOrders/Form', ['item'=>$work_order]);
    }

    public function update(Request $r, WorkOrder $work_order) {
        $data = $r->validate([
            'title'=>'required',
            'source'=>'in:resident,incident,schedule,manual',
            'description'=>'nullable|string',
            'priority'=>'in:low,normal,high,urgent',
            'status'=>'in:new,assigned,in_progress,waiting_material,completed,closed',
            'technician_name'=>'nullable|string',
            'due_date'=>'nullable|date',
            'completed_at'=>'nullable|date',
            'cost'=>'nullable|numeric'
        ]);
        // nếu chuyển completed thì gắn completed_at nếu chưa có
        if (($data['status'] ?? null) === 'completed' && empty($data['completed_at'])) {
            $data['completed_at'] = Carbon::now();
        }
        $work_order->update($data);
        return redirect()->route('work-orders.index');
    }

    public function destroy(WorkOrder $work_order) {
        $work_order->delete();
        return redirect()->route('work-orders.index');
    }
}
