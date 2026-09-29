<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('viralog_rss_sources')) {
            return;
        }

        DB::table('viralog_rss_sources')->whereIn('slug', ['rss-search-engine-journal', 'rss-smashing-magazine'])->delete();

        foreach ([
            ['slug' => 'rss-dailyseo-id', 'title' => 'DailySEO ID', 'url' => 'https://www.dailyseo.id/feed/'],
            ['slug' => 'rss-niagahoster-blog', 'title' => 'Niagahoster Blog', 'url' => 'https://www.niagahoster.co.id/blog/feed/'],
            ['slug' => 'rss-dewaweb-blog', 'title' => 'Dewaweb Blog', 'url' => 'https://www.dewaweb.com/blog/feed/'],
        ] as $source) {
            DB::table('viralog_rss_sources')->updateOrInsert(
                ['slug' => $source['slug']],
                ['title' => $source['title'], 'summary' => 'Sumber RSS Indonesia untuk otomasi Viralog.', 'image_url' => null, 'data' => json_encode(['url' => $source['url'], 'keywords' => []]), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }

    public function down(): void
    {
        DB::table('viralog_rss_sources')->whereIn('slug', ['rss-dailyseo-id', 'rss-niagahoster-blog', 'rss-dewaweb-blog'])->delete();
    }
};
