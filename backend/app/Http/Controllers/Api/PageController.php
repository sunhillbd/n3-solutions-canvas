<?php

namespace App\Http\Controllers\Api;

use App\Helpers\MediaHelper;
use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(): JsonResponse
    {
        $pages = Page::published()
            ->orderBy('sort_order', 'asc')
            ->get(['title', 'slug', 'template', 'section_toggles', 'seo']);

        return response()->json([
            'success' => true,
            'data' => $pages,
        ]);
    }

    public function show(Request $request, ?string $slug = null): JsonResponse
    {
        $targetSlug = $slug ?? $request->query('slug', '/');

        // Normalize slug
        if ($targetSlug !== '/' && str_starts_with($targetSlug, '/')) {
            $targetSlug = ltrim($targetSlug, '/');
        }

        $page = Page::published()
            ->where('slug', $targetSlug)
            ->first();

        // Fallback search with leading slash if not found
        if (!$page && !str_starts_with($targetSlug, '/')) {
            $page = Page::published()->where('slug', '/' . $targetSlug)->first();
        }

        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Page not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'template' => $page->template,
                'section_toggles' => $page->section_toggles ?? [],
                'content' => $this->transformContent($page->content ?? []),
                'seo' => $this->transformContent($page->seo ?? []),
                'aeo' => $page->aeo ?? [],
            ],
        ]);
    }

    private function transformContent(?array $content): array
    {
        if (!$content) {
            return [];
        }

        foreach ($content as $key => $value) {
            if (is_string($value) && (
                str_ends_with($key, '_image') ||
                str_ends_with($key, '_bg_image') ||
                in_array($key, ['bg_image', 'background_image', 'image', 'photo', 'avatar', 'og_image', 'logo_image'])
            )) {
                $content[$key] = MediaHelper::url($value);
            } elseif (is_array($value)) {
                $content[$key] = $this->transformContent($value);
            }
        }

        return $content;
    }
}
