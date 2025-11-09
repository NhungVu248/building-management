<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected $fillable = ['name','cccd','phone','email','apartment_id','status','note'];

  // Quan hệ (nếu có bảng apartments)
  public function apartment() {
    return $this->belongsTo(\App\Models\Apartment::class);
  }

  // Helper: kiểm tra có thể chuyển đi (giản lược, chưa nối R5/R2)
  public function canMoveOut(): bool {
    // TODO: sau GĐ6, kiểm tra công nợ/hợp đồng
    return true;
  }
}
