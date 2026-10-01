<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use DOMDocument;
use DOMXPath;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ImportViralogRss extends Command
{
    protected $signature = 'viralog:import-rss {--limit=10 : Jumlah maksimum artikel baru (5-10)}';
    protected $description = 'Mengimpor artikel RSS relevan untuk layanan Optibis ke database Viralog.';

    private const DEFAULT_SOURCES = [
        ['slug' => 'rss-dailyseo-id', 'title' => 'DailySEO ID', 'url' => 'https://www.dailyseo.id/feed/'],
        ['slug' => 'rss-niagahoster-blog', 'title' => 'Niagahoster Blog', 'url' => 'https://www.niagahoster.co.id/blog/feed/'],
        ['slug' => 'rss-dewaweb-blog', 'title' => 'Dewaweb Blog', 'url' => 'https://www.dewaweb.com/blog/feed/'],
        ['slug' => 'rss-dailysocial', 'title' => 'DailySocial', 'url' => 'https://dailysocial.id/feed/'],
        ['slug' => 'rss-idcloudhost-blog', 'title' => 'IDCloudHost Blog', 'url' => 'https://idcloudhost.com/blog/feed/'],
        ['slug' => 'rss-jagoan-hosting-blog', 'title' => 'Jagoan Hosting Blog', 'url' => 'https://www.jagoanhosting.com/blog/feed/'],
        ['slug' => 'rss-qwords-blog', 'title' => 'Qwords Blog', 'url' => 'https://qwords.com/blog/feed/'],
    ];

    private const KEYWORDS = [
        'website', 'landing page', 'company profile', 'web design', 'web development',
        'seo', 'digital marketing', 'social media', 'content marketing', 'branding',
        'business', 'e-commerce', 'conversion', 'admin digital', 'google ads',
    ];

    public function handle(): int
    {
        $limit = min(max((int) $this->option('limit'), 5), 10);
        $sources = $this->sources();
        $imported = 0;

        foreach ($sources as $source) {
            if ($imported >= $limit) {
                break;
            }

            foreach ($this->feedItems($source) as $article) {
                if ($imported >= $limit) {
                    break;
                }

                if (!$this->isRelevant($article, $source) || !$this->isIndonesian($article) || $this->exists($article['url'])) {
                    continue;
                }

                $detail = $this->articleDetail($article['url']);
                $publishedAt = $this->publishedAt($article['published_at']);
                $slug = 'rss-'.substr(sha1($article['url']), 0, 24);
                $summary = $this->limitCompleteText($this->cleanArticleText($article['summary']), 500);
                $body = $this->limitCompleteText($this->cleanArticleText($detail['body'] ?: $article['summary']), 2200);

                DB::table('viralog_contents')->insert([
                    'slug' => $slug,
                    'title' => $article['title'],
                    'summary' => $summary,
                    'image_url' => $detail['image'] ?: $article['image'],
                    'data' => json_encode([
                        'id' => $slug,
                        'subtitle' => $summary,
                        'body' => $body,
                        'thumbnail' => $detail['image'] ?: $article['image'],
                        'content_type' => 'article',
                        'source_type' => 'rss',
                        'category_slug' => $this->categoryFor($article),
                        'tags' => $this->tagsFor($article),
                        'author_name' => $article['author'] ?: $source->title,
                        'author_slug' => Str::slug($source->title),
                        'status' => 'published',
                        'publish_date' => $publishedAt->toDateString(),
                        'featured' => false,
                        'sponsored' => false,
                        'cta_type' => 'external',
                        'cta_label' => 'Baca sumber asli',
                        'cta_url' => $article['url'],
                        'read_time_minutes' => max(1, (int) ceil(str_word_count(strip_tags($body)) / 200)),
                        'views' => 0,
                        'shares' => 0,
                        'bookmarks' => 0,
                        'viral_score' => 0,
                        'seo_score' => 0,
                        'engagement_score' => 0,
                        'freshness_score' => 100,
                        'credibility_score' => 70,
                        'monetization_score' => 0,
                        'original_url' => $article['url'],
                        'source_name' => $source->title,
                        'source_feed' => $source->data['url'],
                        'imported_at' => now()->toIso8601String(),
                    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    'is_published' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $imported++;
                $this->line("Diimpor: {$article['title']}");
            }
        }

        $this->info("{$imported} artikel RSS baru disimpan ke database.");
        return self::SUCCESS;
    }

    private function sources()
    {
        if (!DB::table('viralog_rss_sources')->where('is_published', true)->exists()) {
            foreach (self::DEFAULT_SOURCES as $source) {
                DB::table('viralog_rss_sources')->updateOrInsert(
                    ['slug' => $source['slug']],
                    ['title' => $source['title'], 'summary' => 'Sumber RSS otomatis Viralog.', 'image_url' => null, 'data' => json_encode(['url' => $source['url'], 'keywords' => self::KEYWORDS]), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]
                );
            }
        }

        return DB::table('viralog_rss_sources')->where('is_published', true)->get()->map(function ($source) {
            $source->data = json_decode($source->data, true) ?: [];
            return $source;
        })->filter(fn ($source) => filled($source->data['url'] ?? null));
    }

    private function feedItems(object $source): array
    {
        try {
            $xml = Http::timeout(20)->withUserAgent('Optibis Viralog RSS Importer/1.0')->get($source->data['url'])->throw()->body();
            libxml_use_internal_errors(true);
            $feed = simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA);
            if (!$feed) {
                return [];
            }

            $nodes = isset($feed->channel->item) ? $feed->channel->item : $feed->entry;
            $items = [];
            foreach ($nodes ?: [] as $node) {
                $content = $node->children('http://purl.org/rss/1.0/modules/content/')->encoded ?? null;
                $media = $node->children('http://search.yahoo.com/mrss/');
                $link = (string) ($node->link ?? '');
                if (isset($node->link['href'])) {
                    $link = (string) $node->link['href'];
                }
                $items[] = [
                    'title' => trim((string) $node->title),
                    'url' => trim($link),
                    'summary' => trim(strip_tags((string) ($content ?: $node->description ?: $node->summary ?: ''))),
                    'image' => (string) ($media->content['url'] ?? $media->thumbnail['url'] ?? $node->enclosure['url'] ?? ''),
                    'author' => trim((string) ($node->author ?? $node->children('http://purl.org/dc/elements/1.1/')->creator ?? '')),
                    'published_at' => (string) ($node->pubDate ?? $node->published ?? $node->updated ?? ''),
                ];
            }
            return array_filter($items, fn ($item) => filled($item['title']) && filter_var($item['url'], FILTER_VALIDATE_URL));
        } catch (\Throwable $exception) {
            $this->warn("RSS gagal dibaca: {$source->title}");
            return [];
        }
    }

    private function isRelevant(array $article, object $source): bool
    {
        $keywords = array_filter($source->data['keywords'] ?? []) ?: self::KEYWORDS;
        $text = Str::lower("{$article['title']} {$article['summary']}");
        foreach ($keywords as $keyword) {
            if (Str::contains($text, Str::lower($keyword))) {
                return true;
            }
        }
        return false;
    }

    private function isIndonesian(array $article): bool
    {
        $text = strip_tags("{$article['title']} {$article['summary']}");
        $pattern = '/\b(the|for|with|from|into|after|before|funding|backed|subscribers|lands|files|global|venture|round|across|we[\'’]?re)\b/iu';

        return preg_match_all($pattern, $text) < 2;
    }

    private function exists(string $url): bool
    {
        $slug = 'rss-'.substr(sha1($url), 0, 24);
        return DB::table('viralog_contents')->where('slug', $slug)->exists();
    }

    private function articleDetail(string $url): array
    {
        try {
            $html = Http::timeout(20)->withUserAgent('Optibis Viralog RSS Importer/1.0')->get($url)->throw()->body();
            $dom = new DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTML($html, LIBXML_NOERROR | LIBXML_NOWARNING);
            $xpath = new DOMXPath($dom);
            $image = $xpath->evaluate('string(//meta[@property="og:image"]/@content)');
            $paragraphs = $xpath->query('//article//p | //main//p');
            $body = collect(iterator_to_array($paragraphs ?: []))
                ->map(fn ($node) => trim($node->textContent))
                ->filter(fn ($text) => mb_strlen($text) > 40 && !$this->isPromotionalBoilerplate($text))
                ->take(12)
                ->implode("\n\n");
            return ['image' => $image, 'body' => $body];
        } catch (\Throwable) {
            return ['image' => '', 'body' => ''];
        }
    }

    private function publishedAt(string $value): Carbon
    {
        try {
            return Carbon::parse($value);
        } catch (\Throwable) {
            return now();
        }
    }

    private function cleanArticleText(string $text): string
    {
        return collect(preg_split('/\R{2,}/u', trim($text)))
            ->map(fn ($paragraph) => trim($paragraph))
            ->filter(fn ($paragraph) => filled($paragraph) && !$this->isPromotionalBoilerplate($paragraph))
            ->implode("\n\n");
    }

    private function isPromotionalBoilerplate(string $text): bool
    {
        return (bool) preg_match('/telegram\s+dailyseo|course-?nya\s+dailyseo|topik\s+selanjutnya\s+untuk\s+kami\s+bahas|gabung\s+ke\s+grup\s+telegram/iu', $text);
    }

    private function limitCompleteText(string $text, int $limit): string
    {
        $text = trim($text);
        if (mb_strlen($text) <= $limit) {
            return $text;
        }

        $excerpt = mb_substr($text, 0, $limit);
        $sentenceEnd = max(mb_strrpos($excerpt, '.'), mb_strrpos($excerpt, '!'), mb_strrpos($excerpt, '?'));

        return $sentenceEnd !== false && $sentenceEnd > 0 ? mb_substr($excerpt, 0, $sentenceEnd + 1) : trim($excerpt);
    }

    private function categoryFor(array $article): string
    {
        $text = Str::lower("{$article['title']} {$article['summary']}");
        return match (true) {
            Str::contains($text, ['seo', 'search engine']) => 'seo',
            Str::contains($text, ['social media', 'instagram', 'tiktok']) => 'social-media',
            Str::contains($text, ['content marketing', 'content strategy']) => 'content-strategy',
            Str::contains($text, ['branding', 'brand']) => 'branding',
            Str::contains($text, ['website', 'landing page', 'web design', 'web development']) => 'website',
            default => 'digital-marketing',
        };
    }

    private function tagsFor(array $article): array
    {
        $text = Str::lower("{$article['title']} {$article['summary']}");
        return collect(self::KEYWORDS)->filter(fn ($keyword) => Str::contains($text, $keyword))->map(fn ($keyword) => Str::title($keyword))->take(3)->values()->all();
    }
}
