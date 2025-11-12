<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('invoice')->latest()->get();
        return Inertia::render('Finance/Payments/Index', [
            'payments' => $payments
        ]);
    }

    public function create()
    {
        $invoices = Invoice::query()
        ->with(['apartment:id,code']) // đổi 'number' thành 'apartment_no' hay 'code' theo DB của bạn
        ->select('id', 'code', 'apartment_id', 'billing_period', 'total', 'paid', 'balance', 'status')
        ->orderByDesc('billing_period')
        ->limit(200)// tránh load quá nặng, tuỳ bạn
        ->get()
        // Chuẩn hoá dữ liệu để frontend hiển thị label đẹp, giảm logic phía client
        ->map(function ($inv) {
            $aptLabel = $inv->apartment->number
                ?? $inv->apartment->apartment_no
                ?? $inv->apartment->code
                ?? $inv->apartment->id;

            return [
                'id'       => $inv->id,
                'code'     => $inv->code,
                'label'    => "{$inv->code} — Căn hộ {$aptLabel}",
                'period'   => $inv->billing_period?->format('Y-m-01'),
                'total'    => $inv->total,
                'paid'     => $inv->paid,
                'balance'  => $inv->balance,
                'status'   => $inv->status,
            ];
        });

    return Inertia::render('Finance/Payments/Create', [
        'invoices' => $invoices,
    ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'invoice_id' => 'nullable|exists:invoices,id',
            'payer_name' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'method' => 'required|string',
            'payment_date' => 'required|date',
            'note' => 'nullable|string'
        ]);

        Payment::create($data);
        return redirect()->route('payments.index');
    }

    public function edit(Payment $payment)
    {
        $invoices = Invoice::select('id', 'code')->get();
        return Inertia::render('Finance/Payments/Edit', [
            'payment' => $payment,
            'invoices' => $invoices
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $data = $request->validate([
            'invoice_id' => 'nullable|exists:invoices,id',
            'payer_name' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'method' => 'required|string',
            'payment_date' => 'required|date',
            'note' => 'nullable|string'
        ]);

        $payment->update($data);
        return redirect()->route('payments.index');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->route('payments.index');
    }
}
