<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SecurityIncident extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'reported_by',
        'location',
        'occurred_at',
        'severity',
        'status',
    ];

    protected $casts = [
        'occurred_at' => 'datetime',
    ];

    public const STATUSES = ['open', 'in_progress', 'resolved'];
    public const SEVERITIES = ['low', 'medium', 'high', 'critical'];
}

