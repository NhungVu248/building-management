<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| Đây là nơi bạn có thể đăng ký các lệnh Artisan tùy chỉnh, 
| hoặc thiết lập lịch trình chạy định kỳ (Scheduler) cho ứng dụng.
|
*/

/**
 * Lệnh mẫu có sẵn của Laravel
 */
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Hiển thị câu nói truyền cảm hứng.');

/**
 * 🧾 Tự động sinh hóa đơn hàng tháng
 * - Chạy vào 1 giờ sáng ngày đầu tiên mỗi tháng
 * - Lệnh thực thi: php artisan app:generate-monthly-invoices
 */
Schedule::command('app:generate-monthly-invoices')
    ->monthlyOn(1, '01:00')
    ->description('Tự động sinh hóa đơn hàng tháng cho các căn hộ.');
