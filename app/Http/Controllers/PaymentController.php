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
        $invoices = Invoice::select('id', 'apartment_no')->get();
        return Inertia::render('Finance/Payments/Create', [
            'invoices' => $invoices
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
        $invoices = Invoice::select('id', 'apartment_no')->get();
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
