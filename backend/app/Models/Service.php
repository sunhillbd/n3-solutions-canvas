<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'eyebrow',
        'badge',
        'tagline',
        'short_description',
        'description',
        'icon',
        'featured_image',
        'metrics',
        'pillars',
        'lifecycle_phases',
        'faqs',
        'section_toggles',
        'seo',
        'aeo',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'metrics' => 'array',
        'pillars' => 'array',
        'lifecycle_phases' => 'array',
        'faqs' => 'array',
        'section_toggles' => 'array',
        'seo' => 'array',
        'aeo' => 'array',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function relatedFaqs(): HasMany
    {
        return $this->hasMany(Faq::class, 'service_id')->orderBy('sort_order');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
