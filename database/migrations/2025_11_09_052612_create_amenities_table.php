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
       Schema::create('amenities', function (Blueprint $table) {
            $table->id();
            $table->string('name');                // VD: Gym, Hồ bơi, Sân tennis
            $table->text('description')->nullable();
            $table->unsignedInteger('capacity')->default(1); // số slot cùng lúc
            $table->unsignedInteger('max_per_week')->default(5); // giới hạn mỗi cư dân/tuần
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            });
        }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amenities');
    }
};
