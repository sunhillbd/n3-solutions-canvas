<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\NewsPostController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\TeamMemberController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Frontend API Routes (v1)
|--------------------------------------------------------------------------
|
| Clean, read-only endpoints consumed by the React/Vite frontend.
| No sensitive admin fields exposed.
|
*/

Route::prefix('v1')->group(function () {
    // 1. Services / Solutions
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{slug}', [ServiceController::class, 'show']);

    // 2. Team Members & Leadership
    Route::get('/team-members', [TeamMemberController::class, 'index']);

    // 3. Partners Ecosystem
    Route::get('/partners', [PartnerController::class, 'index']);

    // 4. News & Updates
    Route::get('/news', [NewsPostController::class, 'index']);
    Route::get('/news/{slug}', [NewsPostController::class, 'show']);

    // 5. Frequently Asked Questions
    Route::get('/faqs', [FaqController::class, 'index']);

    // 6. Pages (Core content, feature toggles, SEO, AEO)
    Route::get('/pages', [PageController::class, 'index']);
    Route::get('/pages/single', [PageController::class, 'show']);
    Route::get('/pages/{slug}', [PageController::class, 'show'])->where('slug', '.*');

    // 7. Site Navigation & Layout Settings (Header & Footer)
    Route::get('/settings/all', [SiteSettingController::class, 'all']);
    Route::get('/settings/{key}', [SiteSettingController::class, 'show']);

    // 8. Public Contact Inquiries Submission
    Route::post('/contact', [ContactController::class, 'submit']);
});
