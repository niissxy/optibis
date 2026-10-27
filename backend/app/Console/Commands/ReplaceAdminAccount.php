<?php

namespace App\Console\Commands;

use App\Models\ApiToken;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ReplaceAdminAccount extends Command
{
    protected $signature = 'admin:replace-account
                            {email : Email akun admin baru}
                            {password : Password akun admin baru}
                            {--name=Optibis Admin : Nama akun admin}';

    protected $description = 'Mengganti akun yang memiliki akses panel admin dan mencabut akses semua akun lain.';

    public function handle(): int
    {
        $email = strtolower(trim((string) $this->argument('email')));
        $password = (string) $this->argument('password');
        $name = trim((string) $this->option('name')) ?: 'Optibis Admin';

        if (strlen($password) < 8) {
            $this->error('Password admin minimal 8 karakter.');
            return self::FAILURE;
        }

        $admin = DB::transaction(function () use ($email, $password, $name) {
            $admin = User::whereRaw('LOWER(TRIM(email)) = ?', [$email])->first();

            if ($admin) {
                $admin->fill(['name' => $name, 'email' => $email, 'password' => $password, 'is_admin' => true])->save();
            } else {
                $admin = User::create(['name' => $name, 'email' => $email, 'password' => $password, 'is_admin' => true]);
            }

            User::where('id', '!=', $admin->id)->update(['is_admin' => false]);
            ApiToken::query()->delete();

            return $admin;
        });

        $this->info("Akun admin aktif: {$admin->email}");
        $this->comment('Semua sesi sebelumnya dicabut dan akun lain tidak dapat mengakses panel admin.');

        return self::SUCCESS;
    }
}
