<?php

namespace App\Http\Controllers\Api;

use App\Helpers\MediaHelper;
use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SiteSettingController extends Controller
{
    public function show(string $key): JsonResponse
    {
        $setting = SiteSetting::where('key', $key)->first();

        if (!$setting) {
            return response()->json([
                'success' => false,
                'message' => 'Settings not found',
            ], 404);
        }

        $payload = $this->transformPayload($setting->payload);

        return response()->json([
            'success' => true,
            'data' => $payload,
        ]);
    }

    public function all(): JsonResponse
    {
        $settings = SiteSetting::all()->mapWithKeys(function ($setting) {
            return [$setting->key => $this->transformPayload($setting->payload)];
        });

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    private function transformPayload(?array $payload): array
    {
        if (!$payload) {
            return [];
        }

        if (isset($payload['logo'])) {
            $payload['logo_url'] = MediaHelper::url($payload['logo']);
        }
        if (isset($payload['logo_dark'])) {
            $payload['logo_dark_url'] = MediaHelper::url($payload['logo_dark']);
        }
        if (isset($payload['favicon'])) {
            $payload['favicon_url'] = MediaHelper::url($payload['favicon']);
        }
        if (isset($payload['og_image'])) {
            $payload['og_image_url'] = MediaHelper::url($payload['og_image']);
        }
        if (isset($payload['seo']['og_image'])) {
            $payload['seo']['og_image_url'] = MediaHelper::url($payload['seo']['og_image']);
        }
        if (isset($payload['default_seo']['og_image'])) {
            $payload['default_seo']['og_image_url'] = MediaHelper::url($payload['default_seo']['og_image']);
        }

        return $payload;
    }
}
