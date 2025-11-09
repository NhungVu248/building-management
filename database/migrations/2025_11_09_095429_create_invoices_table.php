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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no')->unique(); // Mã hóa đơn tự động
            $table->string('apartment_no');
            $table->foreignId('fee_type_id')->constrained('fee_types')->onDelete('cascade');
            $table->decimal('amount', 12, 2);
            $table->date('issue_date');
            $table->date('due_date');
            $table->enum('status', ['unpaid', 'paid', 'overdue'])->default('unpaid');
            $table->timestamps();
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
