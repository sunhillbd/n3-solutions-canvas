<?php

namespace App\Http\Controllers\Api;

use App\Helpers\MediaHelper;
use App\Http\Controllers\Controller;
use App\Models\NewsPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsPostController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $limit = $request->query('limit', 10);

        $posts = NewsPost::published()
            ->take($limit)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'published_date_text' => $post->published_date_text ?? $post->published_at?->format('d F Y'),
                    'summary' => $post->summary,
                    'featured_image_url' => MediaHelper::url($post->featured_image),
                    'external_link' => $post->external_link,
                    'published_at' => $post->published_at,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $posts,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $post = NewsPost::published()
            ->where('slug', $slug)
            ->first();

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'published_date_text' => $post->published_date_text ?? $post->published_at?->format('d F Y'),
                'summary' => $post->summary,
                'content' => $post->content,
                'featured_image_url' => MediaHelper::url($post->featured_image),
                'external_link' => $post->external_link,
                'published_at' => $post->published_at,
            ],
        ]);
    }
}
