<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\ApiToken;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class ResetAdminPassword extends Command
{
    protected $signature = 'admin:reset-password 
                            {email : Email admin} 
                            {password : Password baru admin}';

    protected $description = 'Membuat atau mereset password akun admin Optibis dengan Bcrypt yang valid.';

    public function handle(): int
    {
        $email = strtolower(trim((string) $this->argument('email')));
        $password = (string) $this->argument('password');

        $user = User::whereRaw('LOWER(TRIM(email)) = ?', [$email])
            ->where('is_admin', true)
            ->first();

        if ($user) {
            $user->password = $password; // Cast 'hashed' otomatis melakukan Hash::make
            $user->save();
            ApiToken::where('user_id', $user->id)->delete();
            $this->info('Password admin berhasil diperbarui.');
        } else {
            $this->error('Akun admin tidak ditemukan. Gunakan admin:replace-account untuk menetapkan akun admin baru.');
            return self::FAILURE;
        }

        return self::SUCCESS;
    }
}
