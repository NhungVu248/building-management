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
        Schema::create('amenity_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('amenity_id')->constrained()->cascadeOnDelete();
            $table->foreignId('resident_id')->nullable()->constrained()->nullOnDelete(); // admin đặt hộ
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->enum('status',['confirmed','cancelled'])->default('confirmed');
            $table->timestamps();

            $table->unique(['amenity_id','date','start_time','end_time','resident_id'], 'uniq_booking_slot_user');
            // Tối giản: chặn trùng chính xác khung giờ. Ta sẽ bổ sung check chồng lấn ở Controller.
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amenity_bookings');
    }
};
