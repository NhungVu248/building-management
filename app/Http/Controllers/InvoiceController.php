<?php

namespace App\Http\Controllers;

use App\Models\{Invoice, InvoiceItem, FeeRule, FeeType, Apartment, Resident};
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Carbon\Carbon;

class InvoiceController extends Controller
{
  public function index(Request $r){
    $q = Invoice::with(['apartment','resident'])
          ->when($r->status, fn($qq)=>$qq->where('status',$r->status))
          ->orderByDesc('billing_period')->paginate(20)->withQueryString();
    return Inertia::render('Finance/Invoices/Index', ['data'=>$q]);
  }

  public function show(Invoice $invoice){
    $invoice->load(['items.feeType','payments','apartment','resident']);
    return Inertia::render('Finance/InvoiceDetail', ['invoice'=>$invoice]);
  }

  // Tạo hóa đơn tháng cho 1 căn hộ
  public function store(Request $r){
    $data = $r->validate([
      'apartment_id'=>'required|exists:apartments,id',
      'resident_id'=>'nullable|exists:residents,id',
      'billing_period'=>'required|date',
      'items'=>'array'
    ]);
    $code = 'INV-'.Carbon::parse($data['billing_period'])->format('Ym').'-'.Str::padLeft((string)random_int(1,9999),4,'0');

    $inv = Invoice::create([
      'code'=>$code,
      'apartment_id'=>$data['apartment_id'],
      'resident_id'=>$data['resident_id'] ?? null,
      'billing_period'=>$data['billing_period'],
      'status'=>'issued'
    ]);

    foreach($data['items'] ?? [] as $it){
      $qty = (float)($it['qty'] ?? 1);
      $unit = (float)($it['unit_price'] ?? 0);
      InvoiceItem::create([
        'invoice_id'=>$inv->id,
        'fee_type_id'=>$it['fee_type_id'] ?? null,
        'description'=>$it['description'] ?? 'Item',
        'qty'=>$qty,
        'unit_price'=>$unit,
        'amount'=>$qty*$unit
      ]);
    }
    $inv->recalc();
    return redirect()->route('invoices.show',$inv->id);
  }

  // Sinh hóa đơn hàng loạt theo chính sách (tháng select)
  public function generateMonthly(Request $r){
    $payload = $r->validate(['period'=>'required|date']); // ví dụ 2025-11-01
    $period = Carbon::parse($payload['period'])->startOfMonth();

    $fees = FeeRule::with('feeType')->where('is_active',true)->get();
    $apartments = Apartment::with('resident')->get();

    foreach($apartments as $ap){
      $code = 'INV-'.$period->format('Ym').'-'.str_pad($ap->id,4,'0',STR_PAD_LEFT);

      // bỏ qua nếu đã tồn tại
      if(Invoice::where('code',$code)->exists()) continue;

      $inv = Invoice::create([
        'code'=>$code,
        'apartment_id'=>$ap->id,
        'resident_id'=>optional($ap->resident)->id,
        'billing_period'=>$period,
        'status'=>'issued'
      ]);

      // ví dụ tính phí: fixed = amount; per_m2 = amount * area; per_vehicle = amount * (ap->vehicles_count)
      foreach($fees as $rule){
        $qty = 1;
        if ($rule->calc_method === 'per_m2') {
          $qty = max(1, (float)($ap->area ?? 0));
        } elseif ($rule->calc_method === 'per_vehicle') {
          $qty = max(0, (int)($ap->vehicles_count ?? 0));
        }
        $unit = (float)$rule->amount;
        InvoiceItem::create([
          'invoice_id'=>$inv->id,
          'fee_type_id'=>$rule->fee_type_id,
          'description'=>$rule->feeType->name,
          'qty'=>$qty,
          'unit_price'=>$unit,
          'amount'=>$qty*$unit
        ]);
      }
      $inv->recalc();
    }
    return back()->with('ok','Đã sinh hóa đơn tháng '.$period->format('m/Y'));
  }

  public function update(Request $r, Invoice $invoice){
    $data = $r->validate([
        'billing_period' => 'required|date',
        'discount' => 'nullable|numeric',
        'status' => 'required|string',
        'items' => 'array',
    ]);

    $invoice->update([
        'billing_period' => $data['billing_period'],
        'discount' => $data['discount'] ?? 0,
        'status' => $data['status'],
    ]);

    // Cập nhật danh sách item
    $existingIds = [];
    foreach ($data['items'] as $item) {
        if (isset($item['id']) && $item['id']) {
            $ii = $invoice->items()->find($item['id']);
            if ($ii) {
                $ii->update($item);
                $existingIds[] = $ii->id;
            }
        } else {
            $new = $invoice->items()->create($item);
            $existingIds[] = $new->id;
        }
    }

    // Xóa item đã bỏ
    $invoice->items()->whereNotIn('id', $existingIds)->delete();

    $invoice->recalc();
    return redirect()->route('invoices.show', $invoice->id)->with('ok', 'Đã cập nhật hóa đơn');
  }
    public function create() {
        $apartments = Apartment::select('id', 'code')->get();
        $feeTypes   = FeeType::select('id', 'name')->get();
        return Inertia::render('Finance/Invoices/Create', [
        'apartments' => $apartments,
        'feeTypes'   => $feeTypes,
    ]);
    }

  public function destroy(Invoice $invoice){
    $invoice->delete();
    return redirect()->route('invoices.index');
  }
}
