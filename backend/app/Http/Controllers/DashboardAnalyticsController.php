<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DashboardAnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $period = (int) $request->query('period', 7);
        $period = in_array($period, [7, 30, 365], true) ? $period : 7;
        $start = now()->subDays($period - 1)->startOfDay();
        $days = collect(range(0, $period - 1))->map(fn ($offset) => now()->subDays($period - 1 - $offset)->toDateString());
        $hasVisitTracking = Schema::hasTable('website_visits');
        $contentByDay = DB::table('viralog_contents')
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->where('created_at', '>=', $start)
            ->groupByRaw('DATE(created_at)')
            ->pluck('total', 'date');

        $visitsByDay = $hasVisitTracking ? DB::table('website_visits')
            ->selectRaw('DATE(visited_at) as date, COUNT(*) as visits, COUNT(DISTINCT visitor_id) as visitors')
            ->where('visited_at', '>=', $start)
            ->groupByRaw('DATE(visited_at)')
            ->get()
            ->keyBy('date') : collect();

        $recentVisitorActivity = $hasVisitTracking ? DB::table('website_visits')
            ->orderByDesc('visited_at')
            ->limit(6)
            ->get(['path', 'referrer', 'device', 'visited_at']) : collect();

        $popularPages = $hasVisitTracking ? DB::table('website_visits')
            ->where('visited_at', '>=', $start)
            ->selectRaw('path, COUNT(*) as total')
            ->groupBy('path')
            ->orderByDesc('total')
            ->limit(5)
            ->get() : collect();

        $recentContent = DB::table('viralog_contents')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get(['id', 'title', 'is_published', 'created_at'])
            ->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'is_published' => (bool) $item->is_published,
                'created_at' => $item->created_at,
            ]);

        return response()->json([
            'period_days' => $period,
            'metrics' => [
                'portfolios' => DB::table('portfolios')->count(),
                'published_content' => DB::table('viralog_contents')->where('is_published', true)->count(),
                'rss_articles' => DB::table('viralog_contents')->whereJsonContains('data->source_type', 'rss')->count(),
                'active_rss_sources' => DB::table('viralog_rss_sources')->where('is_published', true)->count(),
                'active_ads' => DB::table('viralog_ad_campaigns')->where('is_published', true)->count(),
                'leads' => DB::table('evolis_leads')->count(),
                'visitors' => $hasVisitTracking ? DB::table('website_visits')->where('visited_at', '>=', $start)->distinct('visitor_id')->count('visitor_id') : 0,
                'pageviews' => $hasVisitTracking ? DB::table('website_visits')->where('visited_at', '>=', $start)->count() : 0,
            ],
            'content_by_day' => $days->map(fn ($date) => ['date' => $date, 'total' => (int) ($contentByDay[$date] ?? 0)]),
            'visitor_by_day' => $days->map(fn ($date) => [
                'date' => $date,
                'visits' => (int) ($visitsByDay[$date]->visits ?? 0),
                'visitors' => (int) ($visitsByDay[$date]->visitors ?? 0),
            ]),
            'popular_pages' => $popularPages,
            'recent_visitor_activity' => $recentVisitorActivity,
            'recent_content' => $recentContent,
        ]);
    }
}
