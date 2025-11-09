<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected $fillable = ['apartment_id','name','phone','email','status'];

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }
}
