<?php

namespace App\Http\Controllers;

use App\Models\ApiToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class ModuleContentController extends Controller
{
    private const MODULES = [
        'services' => 'service_items',
        'service-pillars' => 'service_pillars',
        'packages' => 'package_items',
        'careers' => 'career_items',
        'marketing-kits' => 'marketing_kit_items',
        'insights' => 'insight_items',
        'insight-categories' => 'site_settings',
        'tools' => 'tool_items',
        'solution-library' => 'solution_library_items',
        'solution-library-categories' => 'site_settings',
        'solution-library-explore-categories' => 'site_settings',
        'portfolio-categories' => 'site_settings',
        'viralog-content' => 'viralog_contents',
        'viralog-categories' => 'viralog_categories',
        'viralog-authors' => 'viralog_authors',
        'viralog-tags' => 'viralog_tags',
        'viralog-rss-sources' => 'viralog_rss_sources',
        'viralog-ad-campaigns' => 'viralog_ad_campaigns',
        'evolis-business-dna' => 'evolis_business_dnas',
        'evolis-products' => 'evolis_products',
        'evolis-audiences' => 'evolis_audiences',
        'evolis-objectives' => 'evolis_objectives',
        'evolis-campaigns' => 'evolis_campaigns',
        'evolis-assets' => 'evolis_assets',
        'evolis-publishing' => 'evolis_publishing_jobs',
        'evolis-leads' => 'evolis_leads',
        'evolis-pipeline' => 'evolis_pipelines',
        'evolis-analytics' => 'evolis_analytics',
        'evolis-recommendations' => 'evolis_recommendations',
        'evolis-automations' => 'evolis_automations',
        'evolis-governance' => 'evolis_audit_logs',
        'evolis-briefs' => 'evolis_daily_briefs',
        'evolis-settings' => 'evolis_settings',
        'site-settings' => 'site_settings',
    ];

    public function index(Request $request, string $module)
    {
        // Karir is optional on deployments made before its migration is applied.
        // Return an empty collection so public pages remain available.
        if ($module === 'careers' && !Schema::hasTable('career_items')) {
            return response()->json([]);
        }

        if ($module === 'insights') {
            $this->syncInsightItemCategories();
        }
        if ($module === 'solution-library-categories') {
            $this->syncSolutionLibraryCategories();
        }
        if ($module === 'solution-library-explore-categories') {
            $this->syncSolutionLibraryExploreCategories();
        }
        if ($module === 'insight-categories') {
            $this->syncInsightCategories();
        }
        if ($module === 'portfolio-categories') {
            $this->syncPortfolioCategories();
        }
        if ($module === 'viralog-content' && !$this->canViewUnpublished($request)) {
            $this->scheduleRssImport();
        }

        $query = DB::table($this->table($module));
        if (!$this->canViewUnpublished($request)) {
            $query->where('is_published', true);
        }
        if ($module === 'solution-library-categories') {
            $query->where('slug', 'like', 'solution-library-category-%');
        }
        if ($module === 'solution-library-explore-categories') {
            $query->where('slug', 'like', 'solution-library-explore-category-%');
        }
        if ($module === 'insight-categories') {
            $query->where('slug', 'like', 'insight-category-%');
        }
        if ($module === 'portfolio-categories') {
            $query->where('slug', 'like', 'portfolio-category-%');
        }

        $items = $query
            ->orderBy('id', 'desc')
            ->get()
            ->map(fn ($item) => $this->normalize($item))
            ->sort(function ($left, $right) {
                $leftOrder = $left->data['display_order'] ?? $left->data['order'] ?? PHP_INT_MAX;
                $rightOrder = $right->data['display_order'] ?? $right->data['order'] ?? PHP_INT_MAX;

                if ((int) $leftOrder === (int) $rightOrder) {
                    return $right->id <=> $left->id;
                }

                return (int) $leftOrder <=> (int) $rightOrder;
            })
            ->values();

        return response()->json($items);
    }

    public function store(Request $request, string $module)
    {
        $data = $this->storageData($request, $module) + [
            'created_at' => now(),
            'updated_at' => now()
        ];
        $id = DB::table($this->table($module))->insertGetId($data);
        $item = DB::table($this->table($module))->find($id);

        if ($module === 'services') {
            $this->syncServicePackages($item);
            $item = DB::table($this->table($module))->find($id);
        } elseif ($module === 'packages') {
            $this->syncPackageToService($item);
        }

        return response()->json($this->normalize($item), 201);
    }

    public function show(Request $request, string $module, $id)
    {
        $item = $this->item($module, $id);
        abort_if(!$this->canViewUnpublished($request) && !(bool) $item->is_published, 404);

        return response()->json($this->normalize($item));
    }

    private function canViewUnpublished(Request $request): bool
    {
        $token = $request->bearerToken();

        return $token !== null
            && ApiToken::where('token_hash', hash('sha256', $token))->exists();
    }

    private function scheduleRssImport(): void
    {
        if (!Cache::add('viralog-rss-import-pending', true, now()->addMinutes(55))) {
            return;
        }

        app()->terminating(function (): void {
            try {
                if (Artisan::call('viralog:import-rss', ['--limit' => 10]) !== 0) {
                    Cache::forget('viralog-rss-import-pending');
                }
            } catch (\Throwable $exception) {
                Cache::forget('viralog-rss-import-pending');
                Log::warning('Viralog RSS import failed.', ['exception' => $exception->getMessage()]);
            }
        });
    }

    public function update(Request $request, string $module, $id)
    {
        $current = $this->item($module, $id);
        $updateData = $this->storageData($request, $module, (int) $id) + [
            'updated_at' => now()
        ];
        DB::table($this->table($module))->where('id', $id)->update($updateData);
        if ($module === 'solution-library-categories' && $current->title !== $updateData['title']) {
            $this->renameSolutionLibraryCategory($current->title, $updateData['title']);
        }
        if ($module === 'insight-categories' && $current->title !== $updateData['title']) {
            $this->renameInsightCategory($current->title, $updateData['title']);
        }
        if ($module === 'portfolio-categories' && $current->title !== $updateData['title']) {
            $this->renamePortfolioCategory($current->title, $updateData['title']);
        }
        if ($module === 'services') {
            $item = DB::table($this->table($module))->find($id);
            $this->syncServicePackages($item, $current->slug);
        } elseif ($module === 'packages') {
            $item = DB::table($this->table($module))->find($id);
            $this->syncPackageToService($item, $current);
        }
        $item = DB::table($this->table($module))->find($id);

        return response()->json($this->normalize($item));
    }

    public function destroy(string $module, $id)
    {
        $current = $this->item($module, $id);
        DB::table($this->table($module))->where('id', $id)->delete();

        if ($module === 'services') {
            DB::table('package_items')
                ->where(function ($q) use ($current) {
                    $q->where('data->service_slug', $current->slug)
                      ->orWhere('data->service', $current->slug);
                })
                ->delete();
        } elseif ($module === 'packages') {
            $this->removePackageFromService($current);
        }

        return response()->json(['message' => 'Konten dihapus.']);
    }

    private function validated(Request $request, string $module, ?int $id = null): array
    {
        $table = $this->table($module);
        return $request->validate([
            'slug' => ['required', 'string', 'max:255', Rule::unique($table, 'slug')->ignore($id)],
            'title' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string', 'max:2048'],
            'data' => ['nullable', 'array'],
            'is_published' => ['sometimes', 'boolean']
        ]);
    }

    private function storageData(Request $request, string $module, ?int $id = null): array
    {
        $data = $this->validated($request, $module, $id);
        if ($module === 'solution-library-categories') {
            $data['slug'] = 'solution-library-category-'.str($data['title'])->slug();
        }
        if ($module === 'solution-library-explore-categories') {
            $data['slug'] = 'solution-library-explore-category-'.str($data['title'])->slug();
        }
        if ($module === 'insight-categories') {
            $data['slug'] = 'insight-category-'.str($data['title'])->slug();
        }
        if ($module === 'portfolio-categories') {
            $data['slug'] = 'portfolio-category-'.str($data['title'])->slug();
        }
        $data['data'] = json_encode($data['data'] ?? []);
        return $data;
    }

    private function syncSolutionLibraryCategories(): void
    {
        if (DB::table('site_settings')->where('slug', 'solution-library-categories-synced-v3')->exists()) {
            return;
        }

        $categories = [
            'Website', 'Frontend', 'Backend', 'Database', 'UI', 'UX', 'Security',
            'Cloud', 'AI', 'Integration', 'Business', 'Mobile', 'API',
        ];

        DB::table('site_settings')
            ->where('slug', 'like', 'solution-library-category-%')
            ->whereNotIn('title', $categories)
            ->delete();

        foreach ($categories as $category) {
            DB::table('site_settings')->updateOrInsert(
                ['slug' => 'solution-library-category-'.str($category)->slug()],
                ['title' => $category, 'summary' => null, 'image_url' => null, 'data' => json_encode([]), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]
            );
        }

        DB::table('site_settings')->updateOrInsert(
            ['slug' => 'solution-library-categories-synced-v3'],
            ['title' => 'Solution Library categories synced', 'summary' => null, 'image_url' => null, 'data' => json_encode([]), 'is_published' => false, 'created_at' => now(), 'updated_at' => now()]
        );
    }

    private function renameSolutionLibraryCategory(string $previousCategory, string $nextCategory): void
    {
        DB::table('solution_library_items')->orderBy('id')->each(function ($item) use ($previousCategory, $nextCategory) {
            $data = json_decode($item->data, true) ?: [];
            if (($data['kategori'] ?? $data['category'] ?? null) !== $previousCategory) {
                return;
            }

            $data['kategori'] = $nextCategory;
            $data['category'] = $nextCategory;
            DB::table('solution_library_items')->where('id', $item->id)->update([
                'data' => json_encode($data),
                'updated_at' => now(),
            ]);
        });
    }

    private function syncInsightCategories(): void
    {
        $categories = collect(['Ebook', 'Pelatihan', 'Konsultasi', 'Tools & Produk']);

        $categories->filter()->unique()->each(function ($category) {
            DB::table('site_settings')->updateOrInsert(
                ['slug' => 'insight-category-'.str($category)->slug()],
                ['title' => $category, 'summary' => null, 'image_url' => null, 'data' => json_encode([]), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]
            );
        });
    }

    private function syncInsightItemCategories(): void
    {
        DB::table('insight_items')->orderBy('id')->each(function ($item) {
            $data = json_decode($item->data, true) ?: [];
            $category = match (true) {
                str_starts_with($item->slug, 'ebook-') => 'Ebook',
                str_starts_with($item->slug, 'pelatihan-') => 'Pelatihan',
                str_starts_with($item->slug, 'konsultasi-') => 'Konsultasi',
                default => 'Tools & Produk',
            };
            if (($data['category'] ?? null) === $category) {
                return;
            }
            if (filled($data['category'] ?? null) && !filled($data['subkategori'] ?? null)) {
                $data['subkategori'] = $data['category'];
            }
            $data['category'] = $category;
            DB::table('insight_items')->where('id', $item->id)->update(['data' => json_encode($data), 'updated_at' => now()]);
        });
    }

    private function renameInsightCategory(string $previousCategory, string $nextCategory): void
    {
        DB::table('insight_items')->orderBy('id')->each(function ($item) use ($previousCategory, $nextCategory) {
            $data = json_decode($item->data, true) ?: [];
            if (($data['category'] ?? null) !== $previousCategory) {
                return;
            }
            $data['category'] = $nextCategory;
            DB::table('insight_items')->where('id', $item->id)->update(['data' => json_encode($data), 'updated_at' => now()]);
        });
    }

    private function syncSolutionLibraryExploreCategories(): void
    {
        if (DB::table('site_settings')->where('slug', 'solution-library-explore-categories-initialized')->exists()) {
            return;
        }

        foreach ([
            'Website' => '🌐', 'E-Commerce' => '🛒', 'ERP' => '🏢', 'CRM' => '👥',
            'HRIS' => '💼', 'POS' => '🧾', 'Booking' => '📅', 'Payment' => '💳',
            'AI Chatbot' => '🤖', 'Login System' => '🔐', 'Cloud Hosting' => '☁️', 'Database' => '🗄️',
        ] as $title => $icon) {
            DB::table('site_settings')->updateOrInsert(
                ['slug' => 'solution-library-explore-category-'.str($title)->slug()],
                ['title' => $title, 'summary' => null, 'image_url' => null, 'data' => json_encode(['icon' => $icon]), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]
            );
        }

        DB::table('site_settings')->updateOrInsert(
            ['slug' => 'solution-library-explore-categories-initialized'],
            ['title' => 'Solution Library explore categories initialized', 'summary' => null, 'image_url' => null, 'data' => json_encode([]), 'is_published' => false, 'created_at' => now(), 'updated_at' => now()]
        );
    }

    private function syncPortfolioCategories(): void
    {
        if (DB::table('site_settings')->where('slug', 'portfolio-categories-synced-v1')->exists()) {
            return;
        }

        $projectCategories = [
            'Website Company Profile' => ['type' => 'project', 'icon' => 'Layout'],
            'Website Bisnis' => ['type' => 'project', 'icon' => 'Briefcase'],
            'E-Commerce' => ['type' => 'project', 'icon' => 'ShoppingCart'],
            'Sistem Informasi' => ['type' => 'project', 'icon' => 'Server'],
            'Aplikasi Web' => ['type' => 'project', 'icon' => 'AppWindow'],
            'Aplikasi Mobile' => ['type' => 'project', 'icon' => 'Smartphone'],
            'Landing Page' => ['type' => 'project', 'icon' => 'Monitor'],
            'Redesign' => ['type' => 'project', 'icon' => 'PenTool'],
        ];

        $digitalAssetCategories = [
            'Logo Brand' => ['type' => 'digital-asset', 'icon' => 'Palette'],
            'Desain Sosial Media' => ['type' => 'digital-asset', 'icon' => 'Sparkles'],
            'Marketing Kit & Cetak' => ['type' => 'digital-asset', 'icon' => 'Printer'],
            'Banner & Promosi' => ['type' => 'digital-asset', 'icon' => 'Image'],
        ];

        foreach (array_merge($projectCategories, $digitalAssetCategories) as $title => $meta) {
            $slug = 'portfolio-category-' . str($title)->slug();
            DB::table('site_settings')->updateOrInsert(
                ['slug' => $slug],
                [
                    'title' => $title,
                    'summary' => $meta['type'],
                    'image_url' => null,
                    'data' => json_encode($meta),
                    'is_published' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        DB::table('site_settings')->updateOrInsert(
            ['slug' => 'portfolio-categories-synced-v1'],
            [
                'title' => 'Portfolio categories synced',
                'summary' => null,
                'image_url' => null,
                'data' => json_encode([]),
                'is_published' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }

    private function renamePortfolioCategory(string $previousCategory, string $nextCategory): void
    {
        DB::table('portfolios')
            ->where('category', $previousCategory)
            ->update([
                'category' => $nextCategory,
                'industry' => $nextCategory,
                'updated_at' => now(),
            ]);
    }

    private function syncServicePackages(object $service, ?string $previousServiceSlug = null): void
    {
        $serviceData = json_decode($service->data, true) ?: [];
        $packages = $serviceData['packages'] ?? null;

        if (!is_array($packages)) {
            return;
        }

        $serviceSlugs = array_values(array_unique(array_filter([$service->slug, $previousServiceSlug])));
        $activeSlugs = [];
        $updatedPackages = [];

        foreach ($packages as $pkg) {
            $name = trim($pkg['name'] ?? $pkg['title'] ?? 'Paket Baru');
            $rawSlug = trim($pkg['slug'] ?? '');

            if (empty($rawSlug) || preg_match('/^paket-\d+$/', $rawSlug)) {
                $baseSlug = str($service->slug . '-' . $name)->slug();
            } else {
                $baseSlug = str($rawSlug)->slug();
            }

            $pkgSlug = (string) $baseSlug;
            $counter = 1;
            while (in_array($pkgSlug, $activeSlugs, true) || $this->packageSlugBelongsToAnotherService($pkgSlug, $serviceSlugs)) {
                $counter++;
                $pkgSlug = "{$baseSlug}-{$counter}";
            }

            $activeSlugs[] = $pkgSlug;
            $pkg['slug'] = $pkgSlug;
            $pkg['name'] = $name;
            $updatedPackages[] = $pkg;

            $packageData = [
                'name' => $name,
                'title' => $name,
                'service' => $service->slug,
                'service_slug' => $service->slug,
                'service_name' => $service->title,
                'is_service_package' => true,
                'pillar' => $serviceData['pillar'] ?? $serviceData['pillar_slug'] ?? 'website',
                'pillar_slug' => $serviceData['pillar_slug'] ?? $serviceData['pillar'] ?? 'website',
                'pillar_name' => $serviceData['pillar_name'] ?? ($serviceData['pillar'] ?? 'Website'),
                'price' => $pkg['price'] ?? '',
                'price_short' => $pkg['price'] ?? '',
                'original_price' => $pkg['original_price'] ?? '',
                'discount' => $pkg['discount'] ?? '',
                'renewal' => $pkg['renewal'] ?? '',
                'price_period' => $pkg['renewal'] ?? $pkg['price_period'] ?? 'sekali bayar',
                'price_note' => $pkg['renewal'] ?? $pkg['price_period'] ?? '',
                'target' => $pkg['target'] ?? '',
                'popular' => !empty($pkg['popular']) || !empty($pkg['is_popular']),
                'badge' => $pkg['badge'] ?? '',
                'heroImage' => $service->image_url,
                'flyer_image' => $service->image_url,
                'features' => $pkg['features'] ?? [],
                'highlights' => $pkg['highlights'] ?? [],
                'included' => $pkg['included'] ?? [],
                'deliverables' => $pkg['deliverables'] ?? [],
                'faqs' => $pkg['faqs'] ?? [],
            ];

            DB::table('package_items')->updateOrInsert(
                ['slug' => $pkgSlug],
                [
                    'title' => $name,
                    'summary' => $pkg['target'] ?? $service->summary ?? '',
                    'image_url' => $service->image_url,
                    'data' => json_encode($packageData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    'is_published' => $service->is_published ?? true,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }

        // Delete packages previously associated with this service that were removed
        DB::table('package_items')
            ->where(function ($q) use ($serviceSlugs) {
                foreach ($serviceSlugs as $serviceSlug) {
                    $q->orWhere('data->service_slug', $serviceSlug)
                      ->orWhere('data->service', $serviceSlug);
                }
            })
            ->whereNotIn('slug', $activeSlugs)
            ->delete();

        // Update service_items with normalized package slugs if any changed
        $serviceData['packages'] = $updatedPackages;
        DB::table('service_items')->where('id', $service->id)->update([
            'data' => json_encode($serviceData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'updated_at' => now(),
        ]);
    }

    private function packageSlugBelongsToAnotherService(string $packageSlug, array $serviceSlugs): bool
    {
        $package = DB::table('package_items')->where('slug', $packageSlug)->first();
        if (!$package) {
            return false;
        }

        $data = json_decode($package->data, true) ?: [];
        $packageServiceSlug = $data['service_slug'] ?? $data['service'] ?? null;

        return !in_array($packageServiceSlug, $serviceSlugs, true);
    }

    private function syncPackageToService(object $package, ?object $previousPackage = null): void
    {
        $pkgData = json_decode($package->data, true) ?: [];
        $serviceSlug = $pkgData['service_slug'] ?? $pkgData['service'] ?? null;
        if (!$serviceSlug) return;

        $previousData = $previousPackage ? (json_decode($previousPackage->data, true) ?: []) : [];
        $previousServiceSlug = $previousData['service_slug'] ?? $previousData['service'] ?? null;
        $previousPackageSlug = $previousPackage?->slug;

        if ($previousServiceSlug && $previousServiceSlug !== $serviceSlug) {
            $this->removePackageFromService($previousPackage, $previousPackageSlug);
        }

        $service = DB::table('service_items')->where('slug', $serviceSlug)->first();
        if (!$service) return;

        $serviceData = json_decode($service->data, true) ?: [];
        $packages = is_array($serviceData['packages'] ?? null) ? $serviceData['packages'] : [];

        $packageEntry = [
            'slug' => $package->slug,
            'name' => $package->title,
            'price' => $pkgData['price'] ?? '',
            'original_price' => $pkgData['original_price'] ?? '',
            'discount' => $pkgData['discount'] ?? '',
            'renewal' => $pkgData['renewal'] ?? '',
            'target' => $pkgData['target'] ?? '',
            'popular' => !empty($pkgData['popular']),
            'badge' => $pkgData['badge'] ?? '',
            'features' => $pkgData['features'] ?? [],
        ];

        $found = false;
        foreach ($packages as $k => $p) {
            if (($p['slug'] ?? '') === $package->slug || ($previousPackageSlug && ($p['slug'] ?? '') === $previousPackageSlug)) {
                $packages[$k] = $packageEntry;
                $found = true;
                break;
            }
        }
        if (!$found) {
            $packages[] = $packageEntry;
        }

        $serviceData['packages'] = $this->uniquePackages($packages);
        DB::table('service_items')->where('id', $service->id)->update([
            'data' => json_encode($serviceData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'updated_at' => now(),
        ]);
    }

    private function removePackageFromService(object $package, ?string $packageSlug = null): void
    {
        $pkgData = json_decode($package->data, true) ?: [];
        $serviceSlug = $pkgData['service_slug'] ?? $pkgData['service'] ?? null;
        if (!$serviceSlug) return;

        $service = DB::table('service_items')->where('slug', $serviceSlug)->first();
        if (!$service) return;

        $serviceData = json_decode($service->data, true) ?: [];
        $packages = is_array($serviceData['packages'] ?? null) ? $serviceData['packages'] : [];

        $packages = array_values(array_filter($packages, function ($p) use ($package, $packageSlug) {
            return ($p['slug'] ?? '') !== ($packageSlug ?? $package->slug);
        }));

        $serviceData['packages'] = $packages;
        DB::table('service_items')->where('id', $service->id)->update([
            'data' => json_encode($serviceData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'updated_at' => now(),
        ]);
    }

    private function uniquePackages(array $packages): array
    {
        $slugs = [];
        $uniquePackages = [];

        foreach ($packages as $package) {
            $slug = $package['slug'] ?? null;
            if ($slug && isset($slugs[$slug])) {
                continue;
            }

            if ($slug) {
                $slugs[$slug] = true;
            }
            $uniquePackages[] = $package;
        }

        return $uniquePackages;
    }

    private function table(string $module): string
    {
        if (!array_key_exists($module, self::MODULES)) {
            abort(404, "Modul '$module' tidak ditemukan.");
        }
        return self::MODULES[$module];
    }

    private function item(string $module, $id): object
    {
        $item = DB::table($this->table($module))->find($id);
        if (!$item) {
            abort(404, 'Data tidak ditemukan.');
        }
        return $item;
    }

    private function normalize(object $item): object
    {
        if (isset($item->data) && is_string($item->data)) {
            $item->data = json_decode($item->data, true) ?: [];
        } elseif (!isset($item->data)) {
            $item->data = [];
        }
        if (isset($item->is_published)) {
            $item->is_published = (bool) $item->is_published;
        }
        return $item;
    }
}

