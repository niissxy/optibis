<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentItem extends Model
{
    protected $fillable = ['type', 'slug', 'title', 'summary', 'image_url', 'data', 'is_published'];

    protected function casts(): array
    {
        return [
            'data' => 'array',
            'is_published' => 'boolean',
        ];
    }
}
