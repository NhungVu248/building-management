<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use PDF;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\FinanceReportExport;

class FinanceReportController extends Controller
{
    public function index()
    {
        // Tổng thu (Payments)
        $totalIncome = Payment::sum('amount');

        // Tổng công nợ (Invoices chưa thanh toán)
        $totalDebt = Invoice::where('status', '!=', 'paid')->sum('amount');

        // Thống kê số hóa đơn
        $invoiceCount = [
            'total' => Invoice::count(),
            'paid' => Invoice::where('status', 'paid')->count(),
            'unpaid' => Invoice::where('status', 'unpaid')->count(),
            'overdue' => Invoice::where('status', 'overdue')->count(),
        ];

        // Dữ liệu doanh thu theo tháng (12 tháng gần nhất)
        $monthlyRevenue = Payment::select(
            DB::raw('MONTH(payment_date) as month'),
            DB::raw('SUM(amount) as total')
        )
        ->whereYear('payment_date', now()->year)
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        return Inertia::render('Finance/Reports/Index', [
            'totalIncome' => $totalIncome,
            'totalDebt' => $totalDebt,
            'invoiceCount' => $invoiceCount,
            'monthlyRevenue' => $monthlyRevenue,
        ]);
    }
}
