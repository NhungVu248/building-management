<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\FeeType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('feeType')->orderByDesc('id')->get();

        return Inertia::render('Finance/Invoices/Index', [
            'invoices' => $invoices
        ]);
    }

    public function create()
    {
        return Inertia::render('Finance/Invoices/Create', [
            'feeTypes' => FeeType::all()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'apartment_no' => 'required|string',
            'fee_type_id' => 'required|exists:fee_types,id',
            'amount' => 'required|numeric|min:0',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
        ]);

        $data['invoice_no'] = 'INV-' . strtoupper(Str::random(8));
        $data['status'] = 'unpaid';

        Invoice::create($data);

        return redirect()->route('invoices.index')->with('success', 'Tạo hóa đơn thành công!');
    }

    public function edit(Invoice $invoice)
    {
        return Inertia::render('Finance/Invoices/Edit', [
            'invoice' => $invoice,
            'feeTypes' => FeeType::all()
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $data = $request->validate([
            'apartment_no' => 'required|string',
            'fee_type_id' => 'required|exists:fee_types,id',
            'amount' => 'required|numeric|min:0',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
            'status' => 'required|in:unpaid,paid,overdue',
        ]);

        $invoice->update($data);

        return redirect()->route('invoices.index')->with('success', 'Cập nhật hóa đơn thành công!');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return redirect()->route('invoices.index')->with('success', 'Đã xóa hóa đơn!');
    }

    public function show(Invoice $invoice)
    {
        return Inertia::render('Finance/Invoices/Show', [
            'invoice' => $invoice->load('feeType')
        ]);
    }
}
