<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\FrontendContentSeeder;
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
        $this->call(FrontendContentSeeder::class);
    }
}
