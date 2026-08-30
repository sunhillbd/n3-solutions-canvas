<?php

namespace App\Http\Controllers\Api;

use App\Helpers\MediaHelper;
use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Partner::active();

        if ($request->has('category')) {
            $query->where('category', $request->query('category'));
        }

        if ($request->boolean('featured_only')) {
            $query->where('is_featured', true);
        }

        $partners = $query->get()->map(function ($partner) {
            return [
                'id' => $partner->id,
                'name' => $partner->name,
                'category' => $partner->category,
                'collaboration_detail' => $partner->collaboration_detail,
                'logo_url' => MediaHelper::url($partner->logo),
                'website_url' => $partner->website_url,
                'is_featured' => $partner->is_featured,
                'sort_order' => $partner->sort_order,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $partners,
        ]);
    }
}
