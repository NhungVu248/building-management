<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class FinanceReportController extends Controller
{
    public function index()
    {
        /**
         * ⚙️ 1. Tổng thu (Payments)
         * Bảng payments có cột: amount, paid_at
         */
        $totalIncome = Payment::sum('amount');

        /**
         * ⚙️ 2. Tổng công nợ (Invoices chưa thanh toán)
         * Bảng invoices KHÔNG có cột 'amount'
         * => dùng cột 'balance' (số tiền còn nợ)
         */
        $totalDebt = Invoice::where('status', '!=', 'paid')->sum('balance');

        /**
         * ⚙️ 3. Thống kê số lượng hóa đơn theo trạng thái
         * Các trạng thái gồm: issued, partial, paid, overdue
         */
        $invoiceCount = [
            'total'   => Invoice::count(),
            'paid'    => Invoice::where('status', 'paid')->count(),
            'partial' => Invoice::where('status', 'partial')->count(),
            'issued'  => Invoice::where('status', 'issued')->count(),
            'overdue' => Invoice::where('status', 'overdue')->count(),
        ];

        /**
         * ⚙️ 4. Dữ liệu doanh thu theo tháng (12 tháng gần nhất)
         * Bảng payments có cột 'paid_at' thay vì 'payment_date'
         */
        $monthlyRevenue = Payment::select(
                DB::raw('MONTH(payment_date) as month'),
                DB::raw('SUM(amount) as total')
            )
            ->whereYear('payment_date', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        /**
         * ⚙️ 5. Trả dữ liệu về view Inertia
         */
        return Inertia::render('Finance/Reports/Index', [
            'totalIncome'    => $totalIncome,
            'totalDebt'      => $totalDebt,
            'invoiceCount'   => $invoiceCount,
            'monthlyRevenue' => $monthlyRevenue,
        ]);
    }
}
