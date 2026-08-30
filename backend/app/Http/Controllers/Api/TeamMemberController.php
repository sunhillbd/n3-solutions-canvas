<?php

namespace App\Http\Controllers\Api;

use App\Helpers\MediaHelper;
use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = TeamMember::active();

        if ($request->has('category')) {
            $query->where('category', $request->query('category'));
        }

        if ($request->boolean('home_only')) {
            $query->where('show_on_home', true);
        }

        $members = $query->get()->map(function ($member) {
            return [
                'id' => $member->id,
                'name' => $member->name,
                'role' => $member->role,
                'category' => $member->category,
                'credential' => $member->credential,
                'bio' => $member->bio,
                'initials' => $member->initials ?? strtoupper(substr($member->name, 0, 2)),
                'photo_url' => MediaHelper::url($member->photo),
                'show_on_home' => $member->show_on_home,
                'sort_order' => $member->sort_order,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $members,
        ]);
    }
}
