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
        Schema::create('debt_reminders', function (Blueprint $t) {
            $t->id();
            $t->foreignId('invoice_id')->constrained()->cascadeOnDelete();
            $t->enum('channel',['email','sms','app'])->default('email');
            $t->enum('level',['d7','d15','d30'])->default('d7'); // theo gợi ý 7/15/30 ngày
            $t->timestamp('sent_at');
            $t->string('status')->default('sent'); // sent/failed
            $t->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('debt_reminders');
    }
};
