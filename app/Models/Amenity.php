<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    protected $fillable = ['name','description','capacity','is_active'];

    public function bookings()
    {
        return $this->hasMany(AmenityBooking::class);
    }
}
