<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class MediaHelper
{
    /**
     * Resolve a storage path or external URL to a complete, accessible public URL.
     */
    public static function url(?string $path, string $disk = 'public'): ?string
    {
        if (!$path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return Storage::disk($disk)->url($path);
    }
}
