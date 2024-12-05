<?php

namespace App\Http\Controllers;

use App\Models\WatchLater;
use Illuminate\Http\Request;

class WatchLaterController extends Controller
{
    /**
     * Menampilkan semua video watch later dari user tertentu.
     */
    public function index(Request $request, $userId)
    {
        $watchLaters = WatchLater::where('id_user', $userId)->with('content')->get();

        if ($watchLaters->isEmpty()) {
            return response()->json(['message' => 'No watch later videos found for this user.'], 404);
        }

        return response()->json($watchLaters);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_user' => 'required|exists:users,id',
            'id_content' => 'required|exists:contents,id',
            'date_added' => 'required|date',
        ]);

  
        $exists = WatchLater::where('id_user', $validatedData['id_user'])
            ->where('id_content', $validatedData['id_content'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Video already in watch later.'], 409);
        }

        $watchLater = WatchLater::create($validatedData);

        return response()->json(['message' => 'Video added to watch later.', 'data' => $watchLater]);
    }



    public function destroy(Request $request, $userId, $contentId)
    {
        $watchLater = WatchLater::where('id_user', $userId)
            ->where('id_content', $contentId)
            ->first();

        if (!$watchLater) {
            return response()->json(['error' => 'Video not found in watch later.'], 404);
        }

        $watchLater->delete();

        return response()->json(['message' => 'Video removed from watch later.']);
    }
}
