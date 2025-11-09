<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = ['plate','owner_name','access_card_id','slot','status'];
    public function card() { return $this->belongsTo(AccessCard::class,'access_card_id'); }
}
