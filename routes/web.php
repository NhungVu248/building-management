<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\AmenityBookingController;
use App\Http\Controllers\SecurityIncidentController;
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\ContractController;

/*
|--------------------------------------------------------------------------
| Hệ thống route chính cho ứng dụng Quản lý Tòa Nhà
|--------------------------------------------------------------------------
| - Có thêm route logout (được Ziggy nhận diện)
| - Dashboard trả dữ liệu summary thật
| - Giữ nguyên toàn bộ logic CRUD cũ
|
*/

// 🧩 Route logout — cần đặt ngoài middleware auth để Ziggy không báo lỗi
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');
Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/login');
})->name('logout');


// ⚙️ Middleware auth cho toàn bộ hệ thống admin
Route::middleware(['auth'])->group(function () {

    // 🏠 Dashboard (hiển thị dữ liệu thật)
    Route::get('/dashboard', function () {

        $summary = [
            'staff' => Schema::hasTable('staff') ? DB::table('staff')->count() : 0,
            'apartments' => Schema::hasTable('apartments') ? DB::table('apartments')->count() : 0,
            'residents' => Schema::hasTable('residents') ? DB::table('residents')->count() : 0,
            'maintenance' => Schema::hasTable('maintenance_requests')
                ? DB::table('maintenance_requests')->where('status', 'open')->count()
                : 0,
            'unpaidInvoices' => Schema::hasTable('invoices')
                ? DB::table('invoices')->where('status', 'unpaid')->count()
                : 0,
        ];

        return Inertia::render('Dashboard', compact('summary'));
    })->name('dashboard');


    // 🧩 R1 – Quản lý hệ thống & nhân sự
    Route::resource('staff', App\Http\Controllers\StaffController::class);

    // 🏘️ R2 – Quản lý căn hộ & pháp lý
    Route::resource('apartments', App\Http\Controllers\ApartmentController::class);
    Route::resource('contracts', App\Http\Controllers\ContractController::class);

    // 👪 R3 – Cư dân & tiện ích cộng đồng
    Route::resource('residents', App\Http\Controllers\ResidentController::class);
    Route::resource('amenities', App\Http\Controllers\AmenityController::class);
    Route::resource('bookings', App\Http\Controllers\AmenityBookingController::class);
    Route::resource('announcements', App\Http\Controllers\AnnouncementController::class);
    Route::resource('tickets', App\Http\Controllers\TicketController::class);
    // 🛠️ R4 – Vận hành: An ninh & Bảo trì
    Route::resource('maintenance', App\Http\Controllers\MaintenanceRequestController::class);
    Route::resource('security', App\Http\Controllers\SecurityIncidentController::class);
    Route::resource('access-cards', App\Http\Controllers\AccessCardController::class);
    Route::resource('vehicles', App\Http\Controllers\VehicleController::class);
    Route::resource('access-logs', App\Http\Controllers\AccessLogController::class)->only(['index','store']);
    Route::resource('work-orders', App\Http\Controllers\WorkOrderController::class);
    Route::resource('maintenance-schedules', App\Http\Controllers\MaintenanceScheduleController::class);
    Route::post('/maintenance-schedules/{schedule}/generate', [MaintenanceScheduleController::class, 'generate'])
        ->name('maintenance-schedules.generate');
    // 💰 R5 – Tài chính & nghiệp vụ
    Route::resource('fee-types', App\Http\Controllers\FeeTypeController::class);
    Route::resource('invoices', App\Http\Controllers\InvoiceController::class)
    ->only(['index','show','create','store','update','destroy']);
    Route::post('/invoices/generate-monthly', [App\Http\Controllers\InvoiceController::class,'generateMonthly'])->name('invoices.generateMonthly');
    Route::resource('payments', App\Http\Controllers\PaymentController::class);
    Route::get('/reports', [App\Http\Controllers\FinanceReportController::class, 'index'])
        ->name('reports.index'); 
    Route::get('/debts', [App\Http\Controllers\DebtController::class,'index'])->name('debts.index');
  Route::post('/debts/{invoice}/remind', [App\Http\Controllers\DebtController::class,'remind'])->name('debts.remind');
});
require __DIR__.'/auth.php';