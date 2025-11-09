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
        Schema::create('fee_rules', function (Blueprint $t) {
            $t->id();
            $t->foreignId('fee_type_id')->constrained()->cascadeOnDelete();
            $t->enum('calc_method', ['fixed','per_m2','per_vehicle'])->default('fixed');
            $t->decimal('amount', 12, 2)->default(0); // dùng cho 'fixed'
            $t->boolean('is_active')->default(true);
            $t->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_rules');
    }
};
