<?php

// MaintenanceScheduleController
namespace App\Http\Controllers;

use App\Models\MaintenanceSchedule;
use App\Models\WorkOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class MaintenanceScheduleController extends Controller
{
    public function index() {
        return Inertia::render('Schedules/Index', [
            'items' => MaintenanceSchedule::orderBy('next_run_on')->paginate(15)
        ]);
    }
    public function create() { return Inertia::render('Schedules/Form'); }
    public function store(Request $r) {
        $data = $r->validate([
            'asset_name'=>'required','frequency'=>'in:weekly,monthly,quarterly,yearly',
            'next_run_on'=>'required|date','last_run_on'=>'nullable|date','notes'=>'nullable|string'
        ]);
        MaintenanceSchedule::create($data);
        return redirect()->route('maintenance-schedules.index');
    }
    public function edit(MaintenanceSchedule $maintenance_schedule) {
        return Inertia::render('Schedules/Form', ['item'=>$maintenance_schedule]);
    }
    public function update(Request $r, MaintenanceSchedule $maintenance_schedule) {
        $data = $r->validate([
            'asset_name'=>'required','frequency'=>'in:weekly,monthly,quarterly,yearly',
            'next_run_on'=>'required|date','last_run_on'=>'nullable|date','notes'=>'nullable|string'
        ]);
        $maintenance_schedule->update($data);
        return redirect()->route('maintenance-schedules.index');
    }
    public function destroy(MaintenanceSchedule $maintenance_schedule) {
        $maintenance_schedule->delete();
        return redirect()->route('maintenance-schedules.index');
    }

    // Sinh WorkOrder từ lịch định kỳ (click 1 nút)
    public function generate(MaintenanceSchedule $schedule) {
        WorkOrder::create([
            'title' => 'Bảo dưỡng định kỳ - '.$schedule->asset_name,
            'source' => 'schedule',
            'priority' => 'normal',
            'status' => 'new',
            'description' => 'WO sinh từ lịch định kỳ ('.$schedule->frequency.')',
            'due_date' => $schedule->next_run_on,
        ]);

        // đẩy next_run_on theo tần suất
        $next = match ($schedule->frequency) {
            'weekly' => Carbon::parse($schedule->next_run_on)->addWeek(),
            'monthly' => Carbon::parse($schedule->next_run_on)->addMonth(),
            'quarterly' => Carbon::parse($schedule->next_run_on)->addMonths(3),
            'yearly' => Carbon::parse($schedule->next_run_on)->addYear(),
        };
        $schedule->update(['last_run_on'=>$schedule->next_run_on,'next_run_on'=>$next]);

        return redirect()->route('maintenance-schedules.index');
    }
}
