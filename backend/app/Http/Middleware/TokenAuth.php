<?php
namespace App\Http\Middleware;
use App\Models\ApiToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class TokenAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $plain = $request->bearerToken();
        $record = $plain ? ApiToken::with('user')->where('token_hash', hash('sha256', $plain))->first() : null;
        if (!$record || !$record->user || !$record->user->is_admin) return response()->json(['message' => 'Akses admin tidak diizinkan.'], 403);
        $record->forceFill(['last_used_at' => now()])->save();
        $request->setUserResolver(fn () => $record->user);
        return $next($request);
    }
}
