<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceSchedule extends Model
{
    protected $fillable = ['asset_name','frequency','next_run_on','last_run_on','notes'];
    protected $casts = ['next_run_on'=>'date','last_run_on'=>'date'];

}
