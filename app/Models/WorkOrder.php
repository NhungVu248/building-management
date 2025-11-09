<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkOrder extends Model
{
    protected $fillable = [
        'title','source','description','priority','status',
        'technician_name','due_date','completed_at','cost','linked_incident_id'
    ];
    protected $casts = ['due_date'=>'date','completed_at'=>'datetime','cost'=>'decimal:2'];
}
