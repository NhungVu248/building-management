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
        Schema::create('invoice_items', function (Blueprint $t) {
            $t->id();
            $t->foreignId('invoice_id')->constrained()->cascadeOnDelete();
            $t->foreignId('fee_type_id')->nullable()->constrained()->nullOnDelete();
            $t->string('description');
            $t->decimal('qty', 12, 2)->default(1);
            $t->decimal('unit_price', 12, 2)->default(0);
            $t->decimal('amount', 12, 2)->default(0);
            $t->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};
