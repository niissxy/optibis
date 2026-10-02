<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('content_items')) {
            return;
        }

        Schema::create('content_items', function (Blueprint $table) {
            $table->id();
            $table->string('type', 100);
            $table->string('slug');
            $table->string('title');
            $table->text('summary')->nullable();
            $table->string('image_url', 2048)->nullable();
            $table->json('data')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            $table->unique(['type', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_items');
    }
};
