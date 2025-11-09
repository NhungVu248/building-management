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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('apartment_id')->constrained()->onDelete('cascade');
            $table->string('contract_code')->unique();
            $table->string('type')->default('Thuê');  // Thuê hoặc Mua
            $table->string('tenant_name');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('value', 15, 2)->default(0);
            $table->enum('status', ['Hiệu lực', 'Hết hạn', 'Hủy'])->default('Hiệu lực');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
