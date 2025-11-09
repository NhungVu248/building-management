<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    protected $fillable = ['name','description','capacity','max_per_week','is_active'];

  public function bookings() {
    return $this->hasMany(Booking::class);
  }
}
