<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('career_items', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('summary')->nullable();
            $table->string('image_url', 2048)->nullable();
            $table->json('data')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        $now = now();
        foreach ([
            ['it-fulltime', 'IT', 'fulltime'],
            ['admin-digital-fulltime', 'Admin Digital', 'fulltime'],
            ['it-magang', 'IT', 'internship'],
            ['admin-digital-magang', 'Admin Digital', 'internship'],
        ] as [$slug, $title, $employmentType]) {
            DB::table('career_items')->insert([
                'slug' => $slug,
                'title' => $title,
                'summary' => null,
                'image_url' => null,
                'data' => json_encode(['employment_type' => $employmentType, 'form_url' => '', 'whatsapp_url' => '', 'application_note' => '']),
                'is_published' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('career_items');
    }
};
