<?php

namespace App\Models;
use Inertia\Inertia; // 👈 THÊM DÒNG NÀY
use App\Models\AmenityBooking;
use App\Models\Amenity;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

class AmenityBooking extends Model
{
    protected $fillable = ['amenity_id','resident_id','booking_date','start_time','end_time','status'];

    public function amenity()  { return $this->belongsTo(Amenity::class); }
    public function resident() { return $this->belongsTo(Resident::class); }
}
