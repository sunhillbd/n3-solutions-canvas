<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'group',
        'payload',
    ];

    protected $casts = [
        'payload' => 'array',
    ];

    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        return $setting ? $setting->payload : $default;
    }

    public static function set(string $key, mixed $payload, string $group = 'general'): self
    {
        return static::updateOrCreate(
            ['key' => $key],
            ['payload' => $payload, 'group' => $group]
        );
    }
}
