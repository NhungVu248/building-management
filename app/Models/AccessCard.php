<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessCard extends Model
{
    protected $fillable = ['code','holder_name','type','status','valid_from','valid_to'];
    protected $casts = ['valid_from'=>'date','valid_to'=>'date'];

    public function vehicles() { return $this->hasMany(Vehicle::class); }
    public function logs() { return $this->hasMany(AccessLog::class); }
}
