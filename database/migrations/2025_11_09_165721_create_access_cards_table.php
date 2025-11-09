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
        Schema::create('access_cards', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // mã thẻ
            $table->string('holder_name');    // người giữ thẻ
            $table->enum('type', ['resident','guest','staff'])->default('resident');
            $table->enum('status', ['active','suspended','expired'])->default('active'); // UC10
            $table->date('valid_from')->nullable();
            $table->date('valid_to')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_cards');
    }
};
