<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class ResetAdminPassword extends Command
{
    protected $signature = 'admin:reset-password 
                            {email=admin@optibis.id : Email admin} 
                            {password=password123 : Password baru admin} 
                            {--name=Optibis Admin : Nama admin jika membuat akun baru}';

    protected $description = 'Membuat atau mereset password akun admin Optibis dengan Bcrypt yang valid.';

    public function handle(): int
    {
        $email = strtolower(trim((string) $this->argument('email')));
        $password = (string) $this->argument('password');
        $name = (string) $this->option('name');

        $user = User::whereRaw('LOWER(TRIM(email)) = ?', [$email])->first();

        if ($user) {
            $user->password = $password; // Cast 'hashed' otomatis melakukan Hash::make
            $user->save();
            $this->info("✓ Password untuk akun admin [{$user->email}] (ID: {$user->id}) berhasil diperbarui!");
        } else {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => $password,
            ]);
            $this->info("✓ Akun admin baru [{$user->email}] (ID: {$user->id}) berhasil dibuat!");
        }

        $this->line("Detail Login:");
        $this->line("  Email   : {$user->email}");
        $this->line("  Password: {$password}");
        $this->line("  Bcrypt  : {$user->password}");
        $this->newLine();
        $this->comment("Jika menggunakan phpMyAdmin di cPanel, Anda juga bisa menyalin nilai Bcrypt di atas ke kolom 'password'.");

        return self::SUCCESS;
    }
}
