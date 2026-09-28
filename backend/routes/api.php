<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ModuleContentController;
use Illuminate\Support\Facades\Route;

$registerRoutes = function () {
    Route::post('auth/login', [AuthController::class, 'login']);

    // Public read routes (no token required for public frontend)
    Route::get('portfolios', [PortfolioController::class, 'index']);
    Route::get('portfolios/{portfolio}', [PortfolioController::class, 'show']);
    Route::get('modules/{module}', [ModuleContentController::class, 'index']);
    Route::get('modules/{module}/{id}', [ModuleContentController::class, 'show']);

    // Protected routes (admin auth token required)
    Route::middleware('auth.token')->group(function () {
        Route::get('auth/me', [AuthController::class, 'me']);
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

