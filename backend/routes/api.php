<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;
Route::prefix('v1')->group(function () {
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::middleware('auth.token')->group(function () {
        Route::get('auth/me', [AuthController::class, 'me']);
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::apiResource('portfolios', PortfolioController::class);
        Route::apiResource('admins', AdminController::class);
    });
});
