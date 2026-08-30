<?php

namespace App\Http\Controllers\Api;

use App\Helpers\MediaHelper;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::published()
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'slug' => $service->slug,
                    'eyebrow' => $service->eyebrow,
                    'badge' => $service->badge,
                    'tagline' => $service->tagline,
                    'short_description' => $service->short_description,
                    'icon' => $service->icon,
                    'featured_image_url' => MediaHelper::url($service->featured_image),
                    'metrics' => $service->metrics ?? [],
                    'sort_order' => $service->sort_order,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $services,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $service = Service::published()
            ->where('slug', $slug)
            ->first();

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $service->id,
                'title' => $service->title,
                'slug' => $service->slug,
                'eyebrow' => $service->eyebrow,
                'badge' => $service->badge,
                'tagline' => $service->tagline,
                'short_description' => $service->short_description,
                'description' => $service->description,
                'icon' => $service->icon,
                'featured_image_url' => MediaHelper::url($service->featured_image),
                'metrics' => $service->metrics ?? [],
                'pillars' => $service->pillars ?? [],
                'lifecycle_phases' => $service->lifecycle_phases ?? [],
                'faqs' => $service->faqs ?? [],
                'section_toggles' => $service->section_toggles ?? [
                    'show_hero' => true,
                    'show_metrics' => true,
                    'show_pillars' => true,
                    'show_roadmap' => true,
                    'show_faqs' => true,
                    'show_cta' => true,
                ],
                'seo' => $service->seo ?? [],
                'aeo' => $service->aeo ?? [],
            ],
        ]);
    }
}
