<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchLater extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_content',
        'date_added',
    ];

    // Relasi dengan tabel users
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    // Relasi dengan tabel contents
    public function content()
    {
        return $this->belongsTo(Contents::class, 'id_content');
    }
}
