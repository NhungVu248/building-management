<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| ✅ Thêm các route cho menu R1–R5
| Giữ nguyên logic cũ, không ghi đè hoặc xóa route mặc định.
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    Route::get('/r1', fn() => Inertia::render('Placeholders/R1'))->name('r1.index');
    Route::get('/r2', fn() => Inertia::render('Placeholders/R2'))->name('r2.index');
    Route::get('/r3', fn() => Inertia::render('Placeholders/R3'))->name('r3.index');
    Route::get('/r4', fn() => Inertia::render('Placeholders/R4'))->name('r4.index');
    Route::get('/r5', fn() => Inertia::render('Placeholders/R5'))->name('r5.index');
});

require __DIR__.'/auth.php';
