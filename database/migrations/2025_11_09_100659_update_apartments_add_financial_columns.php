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
        Schema::table('apartments', function (Blueprint $table) {
            // Thêm các cột mới nếu chưa tồn tại
            if (!Schema::hasColumn('apartments', 'email_contact')) {
                $table->string('email_contact')->nullable()->after('owner_name');
            }

            if (!Schema::hasColumn('apartments', 'phone_number')) {
                $table->string('phone_number')->nullable()->after('email_contact');
            }

            if (!Schema::hasColumn('apartments', 'building_block')) {
                $table->string('building_block')->nullable()->after('floor');
            }

            if (!Schema::hasColumn('apartments', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('status');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('apartments', function (Blueprint $table) {
            $table->dropColumn(['email_contact', 'phone_number', 'building_block', 'is_active']);
        });
    }
};
