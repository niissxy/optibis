<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ModuleContentController extends Controller
{
    private const MODULES = [
        'services' => 'service_items', 'service-pillars' => 'service_pillars', 'packages' => 'package_items', 'marketing-kits' => 'marketing_kit_items', 'insights' => 'insight_items', 'tools' => 'tool_items', 'solution-library' => 'solution_library_items',
        'viralog-content' => 'viralog_contents', 'viralog-categories' => 'viralog_categories', 'viralog-authors' => 'viralog_authors', 'viralog-tags' => 'viralog_tags', 'viralog-rss-sources' => 'viralog_rss_sources', 'viralog-ad-campaigns' => 'viralog_ad_campaigns',
        'evolis-business-dna' => 'evolis_business_dnas', 'evolis-products' => 'evolis_products', 'evolis-audiences' => 'evolis_audiences', 'evolis-objectives' => 'evolis_objectives', 'evolis-campaigns' => 'evolis_campaigns', 'evolis-assets' => 'evolis_assets', 'evolis-publishing' => 'evolis_publishing_jobs', 'evolis-leads' => 'evolis_leads', 'evolis-pipeline' => 'evolis_pipelines', 'evolis-analytics' => 'evolis_analytics', 'evolis-recommendations' => 'evolis_recommendations', 'evolis-automations' => 'evolis_automations', 'evolis-governance' => 'evolis_audit_logs', 'evolis-briefs' => 'evolis_daily_briefs', 'evolis-settings' => 'evolis_settings', 'site-settings' => 'site_settings',
    ];

    public function index(string $module) { return response()->json(DB::table($this->table($module))->latest()->get()->map(fn ($item) => $this->normalize($item))); }
    public function store(Request $request, string $module) { $data = $this->storageData($request, $module) + ['created_at' => now(), 'updated_at' => now()]; $id = DB::table($this->table($module))->insertGetId($data); return response()->json($this->normalize(DB::table($this->table($module))->find($id)), 201); }
    public function show(string $module, int $id) { return response()->json($this->normalize($this->item($module, $id))); }
    public function update(Request $request, string $module, int $id) { $this->item($module, $id); DB::table($this->table($module))->where('id', $id)->update($this->storageData($request, $module, $id) + ['updated_at' => now()]); return response()->json($this->normalize($this->item($module, $id))); }
    public function destroy(string $module, int $id) { $this->item($module, $id); DB::table($this->table($module))->where('id', $id)->delete(); return response()->json(['message' => 'Konten dihapus.']); }

    private function validated(Request $request, string $module, ?int $id = null): array { $table = $this->table($module); return $request->validate(['slug' => ['required', 'string', 'max:255', Rule::unique($table, 'slug')->ignore($id)], 'title' => ['required', 'string', 'max:255'], 'summary' => ['nullable', 'string'], 'image_url' => ['nullable', 'string', 'max:2048'], 'data' => ['nullable', 'array'], 'is_published' => ['sometimes', 'boolean']]); }
    private function storageData(Request $request, string $module, ?int $id = null): array { $data = $this->validated($request, $module, $id); $data['data'] = json_encode($data['data'] ?? []); return $data; }
    private function table(string $module): string { abort_unless(array_key_exists($module, self::MODULES), 404); return self::MODULES[$module]; }
    private function item(string $module, int $id): object { return abort_unless(DB::table($this->table($module))->find($id), 404); }
    private function normalize(object $item): object { $item->data = $item->data ? json_decode($item->data, true) : []; return $item; }
}
