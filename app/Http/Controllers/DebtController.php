<?php

namespace App\Http\Controllers;

use App\Models\{Invoice, DebtReminder};
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class DebtController extends Controller
{
  public function index(Request $r){
    $overdue = Invoice::with(['apartment','resident'])
      ->whereIn('status',['issued','partial','overdue'])
      ->where('balance','>','0')
      ->orderBy('billing_period')
      ->paginate(20);
    return Inertia::render('Finance/DebtReminder/Index', ['data'=>$overdue]);
  }

  // Gửi nhắc nợ đơn giản (ghi log + tạo bản ghi)
  public function remind(Request $r, Invoice $invoice){
    $level = $r->input('level','d7'); // d7/d15/d30
    DebtReminder::create([
      'invoice_id'=>$invoice->id,
      'channel'=>'email',
      'level'=>$level,
      'sent_at'=>now(),
      'status'=>'sent'
    ]);
    Log::info("Debt reminder $level sent for invoice {$invoice->code}");
    $invoice->update(['status'=>'overdue']); // đánh dấu
    return back();
  }
}
