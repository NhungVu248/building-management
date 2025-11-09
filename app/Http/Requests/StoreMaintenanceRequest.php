<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaintenanceRequest extends FormRequest
{
    public function authorize(): bool { return true; } // chỉ admin sử dụng nội bộ
    public function rules(): array
    {
        return [
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string',
            'apartment_id'   => 'nullable|integer',
            'priority'       => 'required|in:low,medium,high',
            'status'         => 'required|in:pending,in_progress,completed,cancelled',
            'assigned_to'    => 'nullable|string|max:255',
            'due_date'       => 'nullable|date',
            'estimated_cost' => 'nullable|numeric|min:0',
            'attachments'    => 'nullable|array',
            'attachments.*'  => 'nullable|string',
        ];
    }
}
