<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Ensure temporary upload directory is always valid and writable across all platforms/environments
        if (! ini_get('sys_temp_dir') || ! is_writable(sys_get_temp_dir())) {
            $tempDir = storage_path('app/temp');
            if (! file_exists($tempDir)) {
                @mkdir($tempDir, 0777, true);
            }
            @ini_set('sys_temp_dir', $tempDir);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
