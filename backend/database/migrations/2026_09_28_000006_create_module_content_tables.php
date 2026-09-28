<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    private array $tables = ['service_items', 'package_items', 'marketing_kit_items', 'insight_items', 'tool_items', 'solution_library_items', 'viralog_contents', 'viralog_categories', 'viralog_authors', 'viralog_tags', 'viralog_rss_sources', 'viralog_ad_campaigns', 'evolis_business_dnas', 'evolis_products', 'evolis_audiences', 'evolis_objectives', 'evolis_campaigns', 'evolis_assets', 'evolis_publishing_jobs', 'evolis_leads', 'evolis_pipelines', 'evolis_analytics', 'evolis_recommendations', 'evolis_automations', 'evolis_audit_logs', 'evolis_daily_briefs', 'evolis_settings', 'site_settings'];

    public function up(): void { foreach ($this->tables as $name) { Schema::create($name, function (Blueprint $table) { $table->id(); $table->string('slug')->unique(); $table->string('title'); $table->text('summary')->nullable(); $table->string('image_url', 2048)->nullable(); $table->json('data')->nullable(); $table->boolean('is_published')->default(true); $table->timestamps(); }); } }
    public function down(): void { foreach (array_reverse($this->tables) as $name) { Schema::dropIfExists($name); } }
};
