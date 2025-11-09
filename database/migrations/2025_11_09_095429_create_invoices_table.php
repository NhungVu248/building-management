<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $t) {
            $t->id();
            $t->string('code')->unique();     // INV-YYYYMM-XXXX
            $t->foreignId('apartment_id')->constrained()->cascadeOnDelete();
            $t->foreignId('resident_id')->nullable()->constrained()->nullOnDelete();
            $t->date('billing_period');       // ví dụ: 2025-11-01 (tháng)
            $t->decimal('subtotal', 12, 2)->default(0);
            $t->decimal('discount', 12, 2)->default(0);
            $t->decimal('total', 12, 2)->default(0);
            $t->decimal('paid', 12, 2)->default(0);
            $t->decimal('balance', 12, 2)->default(0);
            $t->enum('status', ['draft','issued','partial','paid','overdue'])->default('issued');
            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
