<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    private const SOURCES = [
        ['slug' => 'rss-dailysocial', 'title' => 'DailySocial', 'url' => 'https://dailysocial.id/feed/'],
        ['slug' => 'rss-idcloudhost-blog', 'title' => 'IDCloudHost Blog', 'url' => 'https://idcloudhost.com/blog/feed/'],
        ['slug' => 'rss-jagoan-hosting-blog', 'title' => 'Jagoan Hosting Blog', 'url' => 'https://www.jagoanhosting.com/blog/feed/'],
        ['slug' => 'rss-qwords-blog', 'title' => 'Qwords Blog', 'url' => 'https://qwords.com/blog/feed/'],
    ];

    public function up(): void
    {
        if (!Schema::hasTable('viralog_rss_sources')) {
            return;
        }

        foreach (self::SOURCES as $source) {
            DB::table('viralog_rss_sources')->updateOrInsert(
                ['slug' => $source['slug']],
                [
                    'title' => $source['title'],
                    'summary' => 'Sumber RSS Indonesia untuk otomasi Viralog.',
                    'image_url' => null,
                    'data' => json_encode(['url' => $source['url'], 'keywords' => []]),
                    'is_published' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }

    public function down(): void
    {
        DB::table('viralog_rss_sources')->whereIn('slug', array_column(self::SOURCES, 'slug'))->delete();
    }
};
