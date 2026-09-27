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
        $data = $request->validate(['email' => ['required','email'], 'password' => ['required','string']]);
        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) return response()->json(['message' => 'Email atau password salah.'], 422);
        $plain = Str::random(64);
        ApiToken::create(['user_id' => $user->id, 'token_hash' => hash('sha256', $plain)]);
        return response()->json(['token' => $plain, 'user' => $user]);
    }
    public function me(Request $request) { return response()->json(['user' => $request->user()]); }
    public function logout(Request $request)
    {
        $plain = $request->bearerToken();
        ApiToken::where('token_hash', hash('sha256', $plain))->delete();
        return response()->json(['message' => 'Berhasil logout.']);
    }
}
