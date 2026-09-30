<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class VisitorAnalyticsController extends Controller
{
    public function store(Request $request)
    {
        if (!Schema::hasTable('website_visits')) {
            return response()->json(['recorded' => false], 202);
        }

        $data = $request->validate([
            'visitor_id' => ['required', 'string', 'max:120'],
            'path' => ['required', 'string', 'max:500'],
            'referrer' => ['nullable', 'string', 'max:255'],
            'device' => ['nullable', 'string', 'max:20'],
        ]);

        DB::table('website_visits')->insert([
            'visitor_id' => hash('sha256', $data['visitor_id']),
            'path' => $data['path'],
            'referrer' => $data['referrer'] ?? null,
            'device' => $data['device'] ?? null,
            'visited_at' => now(),
        ]);

        return response()->json(['recorded' => true], 201);
    }
}
