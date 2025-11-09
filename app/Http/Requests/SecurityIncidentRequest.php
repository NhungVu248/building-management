<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\SecurityIncident;

class SecurityIncidentRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Chỉ admin dùng hệ thống => true
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'reported_by' => ['nullable', 'string', 'max:255'],
            'location'    => ['nullable', 'string', 'max:255'],
            'occurred_at' => ['nullable', 'date'],
            'severity'    => ['required', 'in:' . implode(',', SecurityIncident::SEVERITIES)],
            'status'      => ['required', 'in:' . implode(',', SecurityIncident::STATUSES)],
        ];
    }
}
