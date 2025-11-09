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
        Schema::create('access_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('access_card_id')->nullable()->constrained()->nullOnDelete();
            $table->string('gate')->nullable(); // cổng/barrier
            $table->enum('action', ['entry','exit']);
            $table->enum('result', ['allowed','denied'])->default('allowed'); // bị từ chối khi thẻ sai/hết hạn
            $table->string('reason')->nullable(); // lý do denied
            $table->dateTime('scanned_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_logs');
    }
};
