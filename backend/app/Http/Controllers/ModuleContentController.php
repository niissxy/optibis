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
        $items = DB::table($this->table($module))
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
        $this->item($module, $id);
        $updateData = $this->storageData($request, $module, (int) $id) + [
            'updated_at' => now()
        ];
        DB::table($this->table($module))->where('id', $id)->update($updateData);
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
        $data['data'] = json_encode($data['data'] ?? []);
        return $data;
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

