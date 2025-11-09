<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Invoice;
use App\Models\Apartment;
use App\Models\FeeType;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\InvoiceLog; 
class GenerateMonthlyInvoices extends Command
{
    /**
     * Lệnh: php artisan app:generate-monthly-invoices
     */
    protected $signature = 'app:generate-monthly-invoices';

    protected $description = 'Tự động sinh hóa đơn hàng tháng cho tất cả căn hộ và loại phí định kỳ.';

    public function handle()
    {
        $today = Carbon::now();
        $monthKey = $today->format('Y-m'); // Ví dụ: 2025-11
        $issueDate = $today->toDateString();
        $dueDate = $today->copy()->addDays(10)->toDateString();

        $apartments = Apartment::all();
        $feeTypes = FeeType::all();

        if ($apartments->isEmpty() || $feeTypes->isEmpty()) {
            $this->warn("Không có căn hộ hoặc loại phí nào. Hủy tạo hóa đơn.");
            return Command::SUCCESS;
        }

        $count = 0;

        foreach ($apartments as $apt) {
            foreach ($feeTypes as $fee) {
                // Kiểm tra hóa đơn đã tồn tại cho tháng này chưa
                $exists = Invoice::where('apartment_no', $apt->number)
                    ->where('fee_type_id', $fee->id)
                    ->whereMonth('issue_date', $today->month)
                    ->whereYear('issue_date', $today->year)
                    ->exists();

                if (!$exists) {
                    Invoice::create([
                        'invoice_no'   => 'INV-' . strtoupper(Str::random(8)),
                        'apartment_no' => $apt->number,
                        'fee_type_id'  => $fee->id,
                        'amount'       => $fee->default_amount,
                        'issue_date'   => $issueDate,
                        'due_date'     => $dueDate,
                        'status'       => 'unpaid',
                    ]);
                    $count++;
                }
            }
        }
        InvoiceLog::create([
            'month_key' => $monthKey,
            'created_count' => $count
        ]);
        $this->info("✅ Đã tạo {$count} hóa đơn cho tháng {$monthKey}.");
        return Command::SUCCESS;
    }
}
