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
        Schema::create('security_incidents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('reported_by')->nullable();
            $table->string('location')->nullable();
            $table->dateTime('occurred_at')->nullable();
            $table->enum('severity', ['low', 'medium', 'high', 'critical'])->default('low');
            $table->enum('status', ['open', 'in_progress', 'resolved'])->default('open');
            $table->timestamps();
            $table->softDeletes(); // soft delete để không mất dữ liệu
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('security_incidents');
    }
};
