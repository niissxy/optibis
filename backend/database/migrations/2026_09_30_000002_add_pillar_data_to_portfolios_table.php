<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('id');
            $table->json('pilar')->nullable()->after('category');
            $table->json('products')->nullable()->after('pilar');
        });

        DB::table('portfolios')->whereNull('slug')->orderBy('id')->each(function ($portfolio) {
            DB::table('portfolios')->where('id', $portfolio->id)->update(['slug' => Str::slug($portfolio->name)]);
        });
    }

    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropColumn(['slug', 'pilar', 'products']);
        });
    }
};
