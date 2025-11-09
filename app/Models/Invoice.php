<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
    'code','apartment_id','resident_id','billing_period',
    'subtotal','discount','total','paid','balance','status'
  ];
  protected $casts = ['billing_period'=>'date'];
  public function items(){ return $this->hasMany(InvoiceItem::class); }
  public function payments(){ return $this->hasMany(Payment::class); }
  public function apartment(){ return $this->belongsTo(Apartment::class); }
  public function resident(){ return $this->belongsTo(Resident::class); }

  public function recalc(): void {
    $this->subtotal = $this->items()->sum('amount');
    $this->total = max($this->subtotal - $this->discount, 0);
    $this->paid = $this->payments()->sum('amount');
    $this->balance = max($this->total - $this->paid, 0);
    $this->status = $this->balance <= 0 ? 'paid' : ($this->paid > 0 ? 'partial' : $this->status);
    $this->save();
  }
}
