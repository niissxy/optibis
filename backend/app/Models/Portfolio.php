<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Portfolio extends Model
{
    protected $fillable = ['name', 'category', 'description', 'website_url', 'image_path'];
    protected $appends = ['image_url'];
    public function getImageUrlAttribute(): ?string
    { return $this->image_path ? url('storage/'.$this->image_path) : null; }
}
