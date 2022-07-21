<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParkingC extends Model
{
    use HasFactory;

    protected $table = 'parking_c';

    protected $appends = ['status_string'];

    public function getStatusStringAttribute()
    {
        if ($this->status === 1) return '空';
        if ($this->status === 2) return '混';
        if ($this->status === 3) return '満';

        return '';
    }
}
