<?php

namespace App\Http\Controllers;

use App\Models\ApiToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $submittedEmail = strtolower(trim((string) $data['email']));
        $submittedPassword = (string) $data['password'];
        $throttleKey = 'admin-login:'.$submittedEmail.'|'.$request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            return response()->json(['message' => 'Terlalu banyak percobaan masuk. Coba lagi beberapa saat lagi.'], 429);
        }

        // Pencarian email: case-insensitive & tanpa spasi depan/belakang
        $user = User::whereRaw('LOWER(TRIM(email)) = ?', [$submittedEmail])
            ->orWhere('email', $data['email'])
            ->first();

        if (!$user) {
            RateLimiter::hit($throttleKey, 60);
            return response()->json(['message' => 'Email atau password tidak valid.'], 422);
        }

        if (!$user->is_admin) {
            RateLimiter::hit($throttleKey, 60);
            return response()->json(['message' => 'Email atau password tidak valid.'], 422);
        }

        $passwordMatches = false;

        // Hanya menerima hash password Laravel yang aman.
        try {
            $passwordMatches = Hash::check($submittedPassword, $user->password);
        } catch (\Throwable $e) {
            $passwordMatches = false;
        }

        if (!$passwordMatches) {
            RateLimiter::hit($throttleKey, 60);
            return response()->json(['message' => 'Email atau password tidak valid.'], 422);
        }

        RateLimiter::clear($throttleKey);

        $plain = Str::random(64);
        ApiToken::create([
            'user_id' => $user->id,
            'token_hash' => hash('sha256', $plain),
        ]);

        return response()->json([
            'token' => $plain,
            'user' => $user,
        ]);
    }

    public function me(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }

    public function logout(Request $request)
    {
        $plain = $request->bearerToken();
        ApiToken::where('token_hash', hash('sha256', $plain))->delete();
        return response()->json(['message' => 'Berhasil logout.']);
    }
}
