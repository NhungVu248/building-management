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
        Schema::create('work_orders', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('source', ['resident','incident','schedule','manual'])->default('manual'); // nguồn UC11
            $table->text('description')->nullable();
            $table->enum('priority', ['low','normal','high','urgent'])->default('normal');
            $table->enum('status', [
                'new','assigned','in_progress','waiting_material','completed','closed'
            ])->default('new'); // theo UC11
            $table->string('technician_name')->nullable();
            $table->date('due_date')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->decimal('cost', 14, 2)->default(0); // đồng bộ UC12 sau này
            $table->unsignedBigInteger('linked_incident_id')->nullable(); // nếu sinh từ incident
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_orders');
    }
};
