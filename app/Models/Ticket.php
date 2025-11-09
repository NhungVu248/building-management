<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = ['subject','description','priority','status','resident_id'];

  public function resident() { return $this->belongsTo(Resident::class); }
}
