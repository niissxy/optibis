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
        if (!$record) return response()->json(['message' => 'Unauthenticated.'], 401);
        $record->forceFill(['last_used_at' => now()])->save();
        $request->setUserResolver(fn () => $record->user);
        return $next($request);
    }
}
