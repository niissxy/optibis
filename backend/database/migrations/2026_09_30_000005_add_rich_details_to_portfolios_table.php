<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            if (!Schema::hasColumn('portfolios', 'client')) {
                $table->string('client')->nullable()->after('name');
            }
            if (!Schema::hasColumn('portfolios', 'industry')) {
                $table->string('industry')->nullable()->after('category');
            }
            if (!Schema::hasColumn('portfolios', 'location')) {
                $table->string('location')->nullable()->after('industry');
            }
            if (!Schema::hasColumn('portfolios', 'year')) {
                $table->string('year')->nullable()->after('location');
            }
            if (!Schema::hasColumn('portfolios', 'ringkasan')) {
                $table->text('ringkasan')->nullable()->after('year');
            }
            if (!Schema::hasColumn('portfolios', 'hasil')) {
                $table->text('hasil')->nullable()->after('description');
            }
            if (!Schema::hasColumn('portfolios', 'featured')) {
                $table->boolean('featured')->default(false)->after('hasil');
            }
            if (!Schema::hasColumn('portfolios', 'galeri')) {
                $table->json('galeri')->nullable()->after('thumbnail_url');
            }
            if (!Schema::hasColumn('portfolios', 'stats')) {
                $table->json('stats')->nullable()->after('galeri');
            }
            if (!Schema::hasColumn('portfolios', 'process')) {
                $table->json('process')->nullable()->after('stats');
            }
            if (!Schema::hasColumn('portfolios', 'tags')) {
                $table->json('tags')->nullable()->after('process');
            }
            if (!Schema::hasColumn('portfolios', 'documents')) {
                $table->json('documents')->nullable()->after('tags');
            }
        });
    }

    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropColumn([
                'client', 'industry', 'location', 'year', 'ringkasan',
                'hasil', 'featured', 'galeri', 'stats', 'process', 'tags', 'documents'
            ]);
        });
    }
};
