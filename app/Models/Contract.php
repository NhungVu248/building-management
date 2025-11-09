<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = ['apartment_id','contract_code','type','tenant_name','start_date','end_date','value','status',];

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }
}
