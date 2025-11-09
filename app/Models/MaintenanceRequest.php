<?php

namespace App\Models;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Model;

class MaintenanceRequest extends Model
{
    protected $fillable = [
        'title','description','apartment_id','priority','status',
        'assigned_to','due_date','estimated_cost','attachments','completed_at',
    ];

    protected $casts = [
        'due_date'      => 'date',
        'attachments'   => 'array',
        'completed_at'  => 'datetime',
    ];

    // scope tiện dụng
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['status'] ?? null, fn($q, $v) => $q->where('status', $v))
              ->when($filters['priority'] ?? null, fn($q, $v) => $q->where('priority', $v))
              ->when($filters['q'] ?? null, function($q, $v) {
                    $q->where(function($qq) use ($v) {
                        $qq->where('title','like',"%$v%")
                           ->orWhere('description','like',"%$v%");
                    });
              });
    }
}
