<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ModuleContentController;
use App\Http\Controllers\DashboardAnalyticsController;
use App\Http\Controllers\VisitorAnalyticsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

$registerRoutes = function () {
    Route::post('auth/login', [AuthController::class, 'login']);

    // Public read routes (no token required for public frontend)
    Route::get('portfolios', [PortfolioController::class, 'index']);
    Route::get('portfolios/{portfolio}', [PortfolioController::class, 'show']);
    Route::get('modules/{module}', [ModuleContentController::class, 'index']);
    Route::get('modules/{module}/{id}', [ModuleContentController::class, 'show']);
    Route::post('analytics/visits', [VisitorAnalyticsController::class, 'store']);
    Route::post('leads', function (\Illuminate\Http\Request $request) {
        $lead = $request->validate(['nama' => ['required','string','max:255'], 'email' => ['required','email','max:255'], 'whatsapp' => ['required','string','max:50'], 'perusahaan' => ['nullable','string','max:255'], 'jabatan' => ['nullable','string','max:255'], 'kota' => ['nullable','string','max:255'], 'industri' => ['nullable','string','max:255'], 'tujuan' => ['nullable','string'], 'consent' => ['required','boolean'], 'asset' => ['nullable','string','max:255']]);
        $slug = 'lead-'.Str::uuid();
        DB::table('evolis_leads')->insert(['slug' => $slug, 'title' => $lead['nama'], 'summary' => $lead['email'], 'image_url' => null, 'data' => json_encode(['nama' => $lead['nama'], 'email' => $lead['email'], 'whatsapp' => $lead['whatsapp'], 'perusahaan' => $lead['perusahaan'] ?? '', 'jabatan' => $lead['jabatan'] ?? '', 'kota' => $lead['kota'] ?? '', 'industri' => $lead['industri'] ?? '', 'tujuan' => $lead['tujuan'] ?? '', 'consent' => $lead['consent'], 'sumber' => 'Marketing Kit Download', 'asset' => $lead['asset'] ?? '', 'lead_status' => 'new']), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]);
        return response()->json(['recorded' => true], 201);
    });

    // Protected routes (admin auth token required)
    Route::middleware('auth.token')->group(function () {
        Route::get('auth/me', [AuthController::class, 'me']);
        Route::get('dashboard-analytics', [DashboardAnalyticsController::class, 'index']);
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::post('portfolios', [PortfolioController::class, 'store']);
        Route::put('portfolios/{portfolio}', [PortfolioController::class, 'update']);
        Route::delete('portfolios/{portfolio}', [PortfolioController::class, 'destroy']);
        Route::apiResource('admins', AdminController::class);
        Route::post('modules/{module}', [ModuleContentController::class, 'store']);
        Route::put('modules/{module}/{id}', [ModuleContentController::class, 'update']);
        Route::delete('modules/{module}/{id}', [ModuleContentController::class, 'destroy']);
    });
};

Route::prefix('v1')->group($registerRoutes);
$registerRoutes();

