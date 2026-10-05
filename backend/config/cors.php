<?php

$defaultOrigins = [
    'https://optibis.id',
    'https://www.optibis.id',
    'http://optibis.id',
    'http://www.optibis.id',
    'https://admin.optibis.id',
    'https://www.admin.optibis.id',
    'http://admin.optibis.id',
    'https://api.optibis.id',
    'http://api.optibis.id',
    'https://optibis.kembangin.online',
    'https://adminoptibis.kembangin.online',
    'https://apioptibis.kembangin.online',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:4173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
];

$envOrigins = array_map('trim', explode(',', (string) env('CORS_ALLOWED_ORIGINS', '')));

$allowedOrigins = array_values(array_unique(array_filter(array_merge($defaultOrigins, $envOrigins))));

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => $allowedOrigins,
    'allowed_origins_patterns' => [
        '#^https?://([a-zA-Z0-9-]+\.)*optibis\.id(:[0-9]+)?$#',
        '#^https?://([a-zA-Z0-9-]+\.)*kembangin\.online(:[0-9]+)?$#',
        '#^https?://localhost(:[0-9]+)?$#',
        '#^https?://127\.0\.0\.1(:[0-9]+)?$#',
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => ['*'],
    'max_age' => 86400,
    'supports_credentials' => false,
];

