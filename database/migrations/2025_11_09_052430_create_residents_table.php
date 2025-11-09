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
        Schema::create('residents', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('cccd')->unique();      // CCCD duy nhất
      $table->string('phone')->nullable();
      $table->string('email')->nullable();
      $table->unsignedBigInteger('apartment_id')->nullable(); // liên kết căn hộ (R2)
      $table->enum('status', ['dang_o','tam_vang','chuyen_di'])->default('dang_o');
      $table->text('note')->nullable();
      $table->timestamps();
      $table->foreign('apartment_id')->references('id')->on('apartments')->nullOnDelete();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
