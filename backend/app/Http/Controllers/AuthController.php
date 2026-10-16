<?php

namespace App\Http\Controllers;

use App\Models\ApiToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

        // Pencarian email: case-insensitive & tanpa spasi depan/belakang
        $user = User::whereRaw('LOWER(TRIM(email)) = ?', [$submittedEmail])
            ->orWhere('email', $data['email'])
            ->first();

        if (!$user) {
            return response()->json([
                'message' => 'Email admin tidak terdaftar dalam database.',
            ], 422);
        }

        $passwordMatches = false;

        // Coba verifikasi standar Bcrypt Laravel
        try {
            $passwordMatches = Hash::check($submittedPassword, $user->password);
        } catch (\Throwable $e) {
            $passwordMatches = false;
        }

        // Cek toleransi spasi ekstra pada input password
        if (!$passwordMatches) {
            $trimmedPassword = trim($submittedPassword);
            if ($trimmedPassword !== $submittedPassword) {
                try {
                    $passwordMatches = Hash::check($trimmedPassword, $user->password);
                } catch (\Throwable $e) {
                    $passwordMatches = false;
                }
            }
        }

        // Dukungan jika password di database dimasukkan langsung secara plain text, MD5, SHA1, atau SHA256 (misal via phpMyAdmin)
        if (!$passwordMatches) {
            $legacyHashes = [
                $submittedPassword,
                trim($submittedPassword),
                md5($submittedPassword),
                md5(trim($submittedPassword)),
                sha1($submittedPassword),
                sha1(trim($submittedPassword)),
                hash('sha256', $submittedPassword),
                hash('sha256', trim($submittedPassword)),
            ];

            foreach ($legacyHashes as $legacyHash) {
                if (hash_equals((string) $user->password, (string) $legacyHash)) {
                    // Otomatis upgrade ke bcrypt standar Laravel agar aman
                    $user->password = $submittedPassword;
                    $user->save();
                    $passwordMatches = true;
                    break;
                }
            }
        }

        if (!$passwordMatches) {
            return response()->json([
                'message' => 'Password yang Anda masukkan salah.',
            ], 422);
        }

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
