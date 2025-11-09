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
        Schema::create('maintenance_requests', function (Blueprint $table) {
            $table->id();
            $table->string('title');                          // tiêu đề
            $table->text('description')->nullable();          // mô tả
            $table->unsignedBigInteger('apartment_id')->nullable(); // liên kết căn hộ (nếu có)
            $table->enum('priority', ['low','medium','high'])->default('medium'); // mức độ
            $table->enum('status', ['pending','in_progress','completed','cancelled'])->default('pending'); // trạng thái
            $table->string('assigned_to')->nullable();        // người phụ trách (text)
            $table->date('due_date')->nullable();             // hạn xử lý
            $table->decimal('estimated_cost', 12, 2)->nullable(); // ước tính chi phí
            $table->json('attachments')->nullable();          // danh sách file (URL/paths)
            $table->timestamp('completed_at')->nullable();    // thời điểm hoàn tất
            $table->timestamps();

            // nếu sau này có bảng apartments thì có thể bật FK:
            $table->foreign('apartment_id')->references('id')->on('apartments')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_requests');
    }
};
