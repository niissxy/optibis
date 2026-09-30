<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    private const PILLARS = [
        'MyTravelink' => ['Digital Asset', 'Website', 'Digital Growth Team'],
        'Samara Property' => ['Digital Asset', 'Website'],
        'Optik Clinic' => ['Website', 'Digital Growth Team'],
        'Kulina Rasa' => ['Digital Asset', 'Digital Growth Team'],
        'Nisa Konsultan' => ['Digital Asset', 'Website'],
        'Graha Cipta' => ['Website'],
    ];

    public function up(): void
    {
        foreach (self::PILLARS as $name => $pillars) {
            DB::table('portfolios')->where('name', $name)->whereNull('pilar')->update(['pilar' => json_encode($pillars)]);
        }
    }

    public function down(): void
    {
        DB::table('portfolios')->whereIn('name', array_keys(self::PILLARS))->update(['pilar' => null]);
    }
};
