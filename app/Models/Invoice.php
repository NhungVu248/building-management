<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_no',
        'apartment_no',
        'fee_type_id',
        'amount',
        'issue_date',
        'due_date',
        'status',
    ];

    public function feeType()
    {
        return $this->belongsTo(FeeType::class);
    }
}
