<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ModuleContentController extends Controller
{
    private const MODULES = [
        'services' => 'service_items',
        'service-pillars' => 'service_pillars',
        'packages' => 'package_items',
        'marketing-kits' => 'marketing_kit_items',
        'insights' => 'insight_items',
        'tools' => 'tool_items',
        'solution-library' => 'solution_library_items',
        'solution-library-categories' => 'site_settings',
        'solution-library-explore-categories' => 'site_settings',
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

    public function index(string $module)
    {
        if ($module === 'solution-library-categories') {
            $this->syncSolutionLibraryCategories();
        }
        if ($module === 'solution-library-explore-categories') {
            $this->syncSolutionLibraryExploreCategories();
        }

        $query = DB::table($this->table($module));
        if ($module === 'solution-library-categories') {
            $query->where('slug', 'like', 'solution-library-category-%');
        }
        if ($module === 'solution-library-explore-categories') {
            $query->where('slug', 'like', 'solution-library-explore-category-%');
        }

        $items = $query
            ->orderBy('id', 'desc')
            ->get()
            ->map(fn ($item) => $this->normalize($item));

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

        return response()->json($this->normalize($item), 201);
    }

    public function show(string $module, $id)
    {
        $item = $this->item($module, $id);
        return response()->json($this->normalize($item));
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
        $item = DB::table($this->table($module))->find($id);

        return response()->json($this->normalize($item));
    }

    public function destroy(string $module, $id)
    {
        $this->item($module, $id);
        DB::table($this->table($module))->where('id', $id)->delete();

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

