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
            $table->foreignId('amenity_id')->constrained()->onDelete('cascade');
            $table->foreignId('resident_id')->constrained()->onDelete('cascade');
            $table->date('booking_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->enum('status', ['Đã xác nhận','Đã hủy'])->default('Đã xác nhận');
            $table->timestamps();

            $table->index(
            ['amenity_id', 'booking_date', 'start_time', 'end_time'],
            'amenity_booking_idx');
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
