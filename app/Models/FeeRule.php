<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeeRule extends Model
{
    protected $fillable = ['fee_type_id','calc_method','amount','is_active'];
  public function feeType(){ return $this->belongsTo(FeeType::class); }
}
