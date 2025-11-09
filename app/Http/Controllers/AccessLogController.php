<?php

// AccessLogController (ghi log entry/exit, dùng cho mô phỏng quẹt thẻ)
namespace App\Http\Controllers;

use App\Models\AccessLog;
use App\Models\AccessCard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AccessLogController extends Controller
{
    public function index() {
        return Inertia::render('AccessLogs/Index', [
            'items' => AccessLog::with('card')->latest()->paginate(20),
            'cards' => AccessCard::select('id','code')->orderBy('code')->get()
        ]);
    }
    public function store(Request $r) {
        $data = $r->validate([
            'access_card_id'=>'required|exists:access_cards,id',
            'gate'=>'required|string',
            'action'=>'required|in:entry,exit',
            'result'=>'required|in:allowed,denied',
            'reason'=>'nullable|string',
            'scanned_at'=>'nullable|date'
        ]);
        if (empty($data['scanned_at'])) $data['scanned_at'] = Carbon::now();
        AccessLog::create($data);
        return back();
    }
}
