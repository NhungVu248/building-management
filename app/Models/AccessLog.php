<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessLog extends Model
{
    protected $fillable = ['access_card_id','gate','action','result','reason','scanned_at'];
    protected $casts = ['scanned_at'=>'datetime'];
    public function card() { return $this->belongsTo(AccessCard::class); }
}
