<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'template',
        'is_published',
        'published_at',
        'section_toggles',
        'content',
        'seo',
        'aeo',
        'sort_order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'section_toggles' => 'array',
        'content' => 'array',
        'seo' => 'array',
        'aeo' => 'array',
        'sort_order' => 'integer',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
