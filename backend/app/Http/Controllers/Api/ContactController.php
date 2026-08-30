<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function submit(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organisation' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $inquiry = ContactInquiry::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'organisation' => $request->input('organisation'),
            'phone' => $request->input('phone'),
            'message' => $request->input('message'),
            'status' => 'new',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you. Your inquiry has been received by our engineering team.',
            'data' => [
                'id' => $inquiry->id,
            ],
        ], 201);
    }
}
