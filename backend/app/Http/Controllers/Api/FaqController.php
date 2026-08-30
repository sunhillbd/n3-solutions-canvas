<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Faq::published();

        if ($request->has('placement')) {
            $query->where('placement', $request->query('placement'));
        }

        if ($request->has('service_id')) {
            $query->where('service_id', $request->query('service_id'));
        }

        $faqs = $query->get()->map(function ($faq) {
            return [
                'id' => $faq->id,
                'question' => $faq->question,
                'answer' => $faq->answer,
                'placement' => $faq->placement,
                'service_id' => $faq->service_id,
                'sort_order' => $faq->sort_order,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $faqs,
        ]);
    }
}
