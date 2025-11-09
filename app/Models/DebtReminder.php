<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DebtReminder extends Model
{
    protected $fillable = ['invoice_id','channel','level','sent_at','status'];
  protected $casts = ['sent_at'=>'datetime'];
  public function invoice(){ return $this->belongsTo(Invoice::class); }
}
