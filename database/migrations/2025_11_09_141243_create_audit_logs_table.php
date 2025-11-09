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
         Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('action');                 // login_success, login_failed, logout, staff_created, staff_updated, staff_deleted, profile_updated...
            $table->string('ip')->nullable();
            $table->string('user_agent')->nullable();
            $table->json('meta')->nullable();         // dữ liệu phụ (id bản ghi, trước/sau ...)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
