<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    use HasFactory;

    protected $fillable = ['number','floor', 'owner_name', 'area', 'status', 'code', 'note'];
    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
    public function resident()
    {
        return $this->belongsTo(Resident::class,'resident_id');
    }
}
