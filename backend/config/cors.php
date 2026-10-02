<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => array_filter(explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:5174,http://localhost:4173,https://api.optibis.id,https://optibis.id,https://admin.optibis.id,https://apioptibis.kembangin.online,https://adminoptibis.kembangin.online,https://optibis.kembangin.online'))),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
