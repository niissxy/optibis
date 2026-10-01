<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\Portfolio;

return new class extends Migration {
    public function up(): void
    {
        $items = [
            [
                'name' => 'Kopi Nusantara Visual Identity & Logo',
                'slug' => 'kopi-nusantara-visual-identity',
                'client' => 'Kopi Nusantara Roasters',
                'category' => 'Logo Brand',
                'industry' => 'Logo Brand',
                'location' => 'Yogyakarta',
                'year' => '2024',
                'pilar' => ['Digital Asset'],
                'products' => ['Logo Design', 'Brand Guidelines', 'Packaging'],
                'ringkasan' => 'Perancangan identitas visual lengkap mulai dari logo utama, color palette, tipografi, dan packaging kopi specialty.',
                'description' => 'Kopi Nusantara Roasters adalah brand kopi lokal yang menghadirkan biji kopi pilihan dari seluruh penjuru Indonesia. Kami merancang identitas visual menyeluruh yang mencerminkan autentisitas tradisi nusantara dalam kemasan modern dan elegan.',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=80',
                'website_url' => '#',
                'featured' => true,
                'hasil' => 'Identitas brand baru meningkatkan daya tarik ritel dan distribusi ke 25+ kafe partner di Jawa dan Bali.',
            ],
            [
                'name' => 'Glow Beauty Social Media Kit',
                'slug' => 'glow-beauty-social-media-kit',
                'client' => 'Glow Beauty Skincare',
                'category' => 'Desain Sosial Media',
                'industry' => 'Desain Sosial Media',
                'location' => 'Jakarta',
                'year' => '2024',
                'pilar' => ['Digital Asset', 'Digital Growth Team'],
                'products' => ['Instagram Feed', 'Story Templates', 'Carousel Ads'],
                'ringkasan' => 'Paket template feed, story Instagram, dan konten promosi carousel untuk peluncuran lini produk skincare lokal.',
                'description' => 'Glow Beauty Skincare membutuhkan materi visual media sosial yang konsisten, estetik, dan berdaya konversi tinggi untuk peluncuran rangkaian serum pencerah kulit.',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80',
                'website_url' => '#',
                'featured' => true,
                'hasil' => '+340% peningkatan engagement rate di Instagram dan 1.200+ leads order via direct message dalam 1 bulan.',
            ],
            [
                'name' => 'Finansialku Corporate Stationery & Kit',
                'slug' => 'finansialku-corporate-stationery-kit',
                'client' => 'PT Finansialku Konsultasi',
                'category' => 'Marketing Kit & Cetak',
                'industry' => 'Marketing Kit & Cetak',
                'location' => 'Jakarta',
                'year' => '2024',
                'pilar' => ['Digital Asset'],
                'products' => ['Company Profile', 'Business Cards', 'Presentation Deck'],
                'ringkasan' => 'Desain company profile cetak, kartu nama premium, map folder, dan brosur penawaran program konsultasi bisnis.',
                'description' => 'PT Finansialku Konsultasi membutuhkan perlengkapan presentasi bisnis fisik dan digital kelas korporat untuk meyakinkan klien B2B.',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&q=80',
                'website_url' => '#',
                'featured' => false,
                'hasil' => 'Materi presentasi resmi membantu closing 14 kontrak klien korporat bernilai tinggi di kuartal kedua.',
            ],
            [
                'name' => 'Sambal Bu Rudy Rebranding & Packaging',
                'slug' => 'sambal-bu-rudy-rebranding-packaging',
                'client' => 'Sambal Bu Rudy Surabaya',
                'category' => 'Logo Brand',
                'industry' => 'Logo Brand',
                'location' => 'Surabaya',
                'year' => '2024',
                'pilar' => ['Digital Asset'],
                'products' => ['Logo Redesign', 'Bottle Label', 'Outer Box'],
                'ringkasan' => 'Penyegaran logo dan label kemasan botol sambal khas Surabaya agar tampil lebih eye-catching di rak supermarket.',
                'description' => 'Kami memperbarui logo legendaris Sambal Bu Rudy dengan tetap mempertahankan esensi visual ikonik beliau, serta merancang ulang label botol waterproof dan kemasan gift box.',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
                'website_url' => '#',
                'featured' => false,
                'hasil' => 'Desain kemasan baru lolos uji display modern retail dan meningkatkan repeat order wisatawan hingga 45%.',
            ],
        ];

        foreach ($items as $data) {
            Portfolio::updateOrCreate(['slug' => $data['slug']], $data);
        }
    }

    public function down(): void
    {
        Portfolio::whereIn('slug', [
            'kopi-nusantara-visual-identity',
            'glow-beauty-social-media-kit',
            'finansialku-corporate-stationery-kit',
            'sambal-bu-rudy-rebranding-packaging',
        ])->delete();
    }
};
