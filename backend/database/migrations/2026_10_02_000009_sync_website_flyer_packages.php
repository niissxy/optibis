<?php

use App\Support\WebsiteFlyerPackages;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        foreach (WebsiteFlyerPackages::services() as $serviceSlug) {
            $service = DB::table('service_items')->where('slug', $serviceSlug)->first();
            if ($service) {
                $data = json_decode($service->data, true) ?: [];
                if (empty($data['packages'])) {
                    $data = array_merge($data, WebsiteFlyerPackages::details($serviceSlug));
                    DB::table('service_items')->where('id', $service->id)->update([
                        'data' => json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                        'updated_at' => now(),
                    ]);
                }
            }

            foreach (WebsiteFlyerPackages::packages($serviceSlug) as $package) {
                if (DB::table('package_items')->where('slug', $package['slug'])->exists()) {
                    continue;
                }

                $data = WebsiteFlyerPackages::packageData($serviceSlug, $package);
                DB::table('package_items')->insert([
                    'slug' => $package['slug'],
                    'title' => $package['name'],
                    'summary' => $package['target'],
                    'image_url' => WebsiteFlyerPackages::flyer($serviceSlug),
                    'data' => json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    'is_published' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
    }
};
