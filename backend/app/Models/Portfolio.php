<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'client',
        'industry',
        'category',
        'location',
        'year',
        'ringkasan',
        'description',
        'hasil',
        'featured',
        'website_url',
        'image_path',
        'thumbnail_url',
        'pilar',
        'products',
        'galeri',
        'stats',
        'process',
        'tags',
        'documents',
    ];

    protected $appends = ['image_url'];

    protected $casts = [
        'pilar' => 'array',
        'products' => 'array',
        'galeri' => 'array',
        'stats' => 'array',
        'process' => 'array',
        'tags' => 'array',
        'documents' => 'array',
        'featured' => 'boolean',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? url('storage/'.$this->image_path) : $this->thumbnail_url;
    }
}
