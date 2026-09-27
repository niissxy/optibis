<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Portfolio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(['email' => 'admin@optibis.test'], [
            'name' => 'Optibis Admin', 'password' => 'password123',
        ]);
        Portfolio::firstOrCreate(['name' => 'Optibis Studio'], [
            'category' => 'Branding',
            'description' => 'Website company profile modern untuk memperkuat identitas digital.',
            'website_url' => 'https://example.com',
        ]);
    }
}
