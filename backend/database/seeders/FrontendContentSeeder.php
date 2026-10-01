<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FrontendContentSeeder extends Seeder
{
    private const TABLES = [
        'services' => 'service_items', 'service-pillars' => 'service_pillars', 'packages' => 'package_items', 'marketing-kits' => 'marketing_kit_items', 'insights' => 'insight_items', 'tools' => 'tool_items', 'solution-library' => 'solution_library_items',
        'viralog-content' => 'viralog_contents', 'viralog-categories' => 'viralog_categories', 'viralog-authors' => 'viralog_authors', 'viralog-tags' => 'viralog_tags',
        'evolis-objectives' => 'evolis_objectives', 'evolis-assets' => 'evolis_assets', 'evolis-settings' => 'evolis_settings',
    ];

    public function run(): void
    {
        $path = dirname(base_path()).'/frontend/src/data';

        $this->seedPortfolios($path.'/portfolio.js');
        $this->seedServicePillars();
        $this->seedPackages();
        $this->seedServices(dirname($path).'/pages/DigitalAsset.jsx', 'digital-asset', 'Digital Asset');
        $this->seedServices(dirname($path).'/pages/WebsiteService.jsx', 'website', 'Website');
        $this->seedServices(dirname($path).'/pages/DigitalGrowthTeam.jsx', 'digital-growth-team', 'Digital Growth Team');
        $this->seedSoftwareServices();
        $this->seedMatches($path.'/marketingKit.js', 'marketing-kits', '/nama_asset:\s*"(?<title>[^"]+)",\s*slug:\s*"(?<slug>[^"]+)",\s*deskripsi:\s*"(?<summary>[^"]+)",\s*kategori:\s*"(?<category>[^"]+)"/s');
        $this->seedMatches($path.'/insight.js', 'insights', '/id:\s*"(?<slug>[^"]+)",\s*title:\s*"(?<title>[^"]+)".*?desc:\s*"(?<summary>[^"]+)"/s');
        $this->seedMatches($path.'/tools.js', 'tools', '/\{\s*name:\s*"(?<title>[^"]+)",\s*url:\s*"(?<url>[^"]+)",\s*category:\s*"(?<category>[^"]+)",\s*tagline:\s*"(?<tagline>[^"]+)",\s*description:\s*"(?<summary>[^"]+)"\s*\}/');
        $this->seedMatches($path.'/solutionLibrary.js', 'solution-library', '/nama_awam:\s*"(?<title>[^"]+)",\s*nama_teknis:\s*"(?<technical>[^"]+)",\s*slug:\s*"(?<slug>[^"]+)",\s*kategori:\s*"(?<category>[^"]+)".*?fungsi:\s*"(?<summary>[^"]+)"/s');
        $this->seedMatches($path.'/viralog.js', 'viralog-content', '/id:\s*"(?<source_id>[^"]+)",\s*title:\s*"(?<title>[^"]+)",\s*slug:\s*"(?<slug>[^"]+)".*?summary:\s*"(?<summary>[^"]+)"/s');
        $this->seedMatches($path.'/viralog.js', 'viralog-categories', '/\{\s*slug:\s*"(?<slug>[^"]+)",\s*name:\s*"(?<title>[^"]+)",\s*color:\s*"(?<color>[^"]+)"/');
        $this->seedMatches($path.'/viralog.js', 'viralog-authors', '/\{\s*slug:\s*"(?<slug>[^"]+)",\s*name:\s*"(?<title>[^"]+)",\s*role:\s*"(?<role>[^"]+)",\s*bio:\s*"(?<summary>[^"]+)"/');

        foreach ([
            ['marketingKit.js', 'MARKETING_KIT_ITEMS', 'marketing-kits'],
            ['insight.js', 'EBOOKS', 'insights'], ['insight.js', 'TRAININGS', 'insights'], ['insight.js', 'CONSULTATIONS', 'insights'], ['insight.js', 'DIGITAL_TOOLS', 'insights'],
            ['tools.js', 'TOOLS', 'tools'], ['solutionLibrary.js', 'SOLUTION_ITEMS', 'solution-library'],
            ['viralog.js', 'VIRALOG_CONTENT', 'viralog-content'], ['viralog.js', 'VIRALOG_CATEGORIES', 'viralog-categories'], ['viralog.js', 'VIRALOG_AUTHORS', 'viralog-authors'],
            ['evolis/objectives.js', 'OBJECTIVE_TYPES', 'evolis-objectives'], ['evolis/assetTypes.js', 'ASSET_TYPES', 'evolis-assets'],
            ['evolis/assetTypes.js', 'ASSET_CATEGORIES', 'evolis-settings'], ['evolis/assetTypes.js', 'ASSET_LIFECYCLE', 'evolis-settings'], ['evolis/roles.js', 'EVOLIS_ROLES', 'evolis-settings'],
        ] as [$file, $export, $module]) {
            $this->seedCollection($path.'/'.$file, $export, $module);
        }
        $this->seedStringCollection($path.'/viralog.js', 'VIRALOG_TAGS', 'viralog-tags');
        $this->seedStringCollection($path.'/evolis/objectives.js', 'PRIORITY_METRICS', 'evolis-settings');

        DB::table('site_settings')->updateOrInsert(['slug' => 'general'], ['title' => 'Pengaturan Website', 'summary' => 'Kontak, identitas bisnis, SEO, dan navigasi frontend.', 'data' => json_encode(['site_name' => 'Optibis', 'email' => 'hello@optibis.id']), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]);
    }

    private function seedPortfolios(string $file): void
    {
        $portfolios = [
            [
                'slug' => 'smart-gps-tracker',
                'name' => 'Smart GPS Tracker',
                'client' => 'PT Indo Tracker Solusi',
                'industry' => 'Website Company Profile',
                'category' => 'Website Company Profile',
                'location' => 'Jakarta',
                'year' => '2024',
                'ringkasan' => 'Website untuk layanan pelacakan kendaraan dengan fitur real-time tracking.',
                'description' => 'Smart GPS Tracker adalah penyedia solusi pelacakan kendaraan dan aset berbasis IoT untuk enterprise dan retail. Kami membangun website company profile modern dengan fitur showcase produk, kalkulator estimasi armada, integrasi live demo tracking, serta form lead generation yang terhubung langsung dengan tim sales.',
                'hasil' => '+210% peningkatan qualified leads dari form konsultasi armada dalam 3 bulan pertama.',
                'featured' => true,
                'website_url' => 'https://smartgpstracker.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
                'pilar' => ['Website', 'Digital Asset'],
                'products' => ['Company Website', 'Tracking System', 'SEO'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
                    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
                    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Discovery & Analysis', 'desc' => 'Menganalisis profil target klien B2B logistik dan kebutuhan presentasi fitur GPS real-time.'],
                    ['num' => '02', 'title' => 'UI/UX Architecture', 'desc' => 'Merancang wireframe interaktif yang menonjolkan keunggulan sistem tracking dan transparansi harga.'],
                    ['num' => '03', 'title' => 'Web Development', 'desc' => 'Pengembangan website berperforma tinggi dengan animasi interaktif dan integrasi formulir leads.'],
                    ['num' => '04', 'title' => 'Testing & SEO', 'desc' => 'Optimasi SEO teknis untuk kata kunci GPS tracker armada dan uji responsivitas multi-device.'],
                ],
                'stats' => [
                    ['label' => 'Peningkatan Leads', 'value' => '+210%'],
                    ['label' => 'Page Speed', 'value' => '98/100'],
                    ['label' => 'Bounce Rate', 'value' => '28%'],
                    ['label' => 'Durasi Proyek', 'value' => '4 minggu'],
                ],
                'tags' => ['Company Profile', 'IoT', 'Tracking', 'B2B', 'SEO'],
                'documents' => [
                    ['title' => 'Company Profile Document', 'type' => 'PDF', 'desc' => 'Dokumen profil solusi GPS tracker', 'url' => 'https://example.com/docs/smart-gps-profile.pdf'],
                    ['title' => 'Product Specification', 'type' => 'PDF', 'desc' => 'Spesifikasi teknis hardware & server GPS', 'url' => 'https://example.com/docs/smart-gps-specs.pdf'],
                ],
            ],
            [
                'slug' => 'muli-property',
                'name' => 'Muli Property',
                'client' => 'Muli Property Indonesia',
                'industry' => 'Website Bisnis',
                'category' => 'Website Bisnis',
                'location' => 'Bandung',
                'year' => '2024',
                'ringkasan' => 'Website properti modern dengan tampilan elegan dan fitur pencarian advanced.',
                'description' => 'Muli Property adalah agensi properti independen terkemuka di Bandung. Kami merancang website bisnis interaktif dengan filter pencarian perumahan, tur virtual, estimasi KPR, dan sistem penghubung langsung ke agen WhatsApp secara cepat.',
                'hasil' => 'Listing properti terindeks cepat di Google dengan rata-rata 35+ inquiry per bulan.',
                'featured' => true,
                'website_url' => 'https://muliproperty.com',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
                'pilar' => ['Website'],
                'products' => ['Website Bisnis', 'Listing Properti', 'CMS'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
                    'https://images.unsplash.com/photo-1516156008625-3a2636957917?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Requirement Gathering', 'desc' => 'Pemetaan kebutuhan filter tipe properti, rentang harga, dan integrasi nomor agen.'],
                    ['num' => '02', 'title' => 'Visual Design', 'desc' => 'Desain UI modern bergaya arsitektural minimalis yang memberikan impresi mewah.'],
                    ['num' => '03', 'title' => 'CMS Development', 'desc' => 'Pembuatan dashboard CMS yang mempermudah tim internal menambah listing hunian baru.'],
                ],
                'stats' => [
                    ['label' => 'Listing Aktif', 'value' => '120+'],
                    ['label' => 'Inquiry/Bulan', 'value' => '35+'],
                    ['label' => 'Page Load', 'value' => '0.8s'],
                    ['label' => 'Durasi Proyek', 'value' => '5 minggu'],
                ],
                'tags' => ['Property', 'Listing', 'Real Estate', 'CMS'],
                'documents' => [
                    ['title' => 'Catalog Properti 2024', 'type' => 'PDF', 'desc' => 'Katalog properti premium Muli Property', 'url' => 'https://example.com/docs/muli-catalog.pdf'],
                ],
            ],
            [
                'slug' => 'wisata-di-bali',
                'name' => 'Wisata Di Bali',
                'client' => 'Bali Tour & Leisure',
                'industry' => 'Website Bisnis',
                'category' => 'Website Bisnis',
                'location' => 'Bali',
                'year' => '2024',
                'ringkasan' => 'Portal informasi wisata Bali dengan desain atraktif dan responsif.',
                'description' => 'Wisata Di Bali adalah portal panduan perjalanan dan reservasi tur lokal di Bali. Kami membangun website responsif dengan katalog paket liburan, pemesanan tiket online, ulasan wisatawan, dan panduan destinasi terpopuler.',
                'hasil' => '+160% pertumbuhan trafik organik dan pemesanan tur langsung tanpa perantara.',
                'featured' => false,
                'website_url' => 'https://wisatadibali.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
                'pilar' => ['Website', 'Digital Growth Team'],
                'products' => ['Website Bisnis', 'Booking Online', 'Social Media'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
                    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
                    'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Content Strategy', 'desc' => 'Perencanaan kategori destinasi, paket watersport, tur pulau, dan sewa kendaraan.'],
                    ['num' => '02', 'title' => 'Development', 'desc' => 'Integrasi sistem booking WhatsApp & kalkulasi harga paket rombongan otomatis.'],
                    ['num' => '03', 'title' => 'Speed Optimization', 'desc' => 'Optimasi aset gambar HD agar tetap ringan dibuka dari jaringan mobile turis.'],
                ],
                'stats' => [
                    ['label' => 'Kunjungan/Bulan', 'value' => '45K+'],
                    ['label' => 'Paket Tur', 'value' => '28'],
                    ['label' => 'Rating Kepuasan', 'value' => '4.9/5'],
                    ['label' => 'Durasi Proyek', 'value' => '4 minggu'],
                ],
                'tags' => ['Tourism', 'Travel', 'Bali', 'Booking System'],
                'documents' => [],
            ],
            [
                'slug' => 'wisatago',
                'name' => 'WisataGo',
                'client' => 'WisataGo Nusantara',
                'industry' => 'Aplikasi Mobile',
                'category' => 'Aplikasi Mobile',
                'location' => 'Yogyakarta',
                'year' => '2024',
                'ringkasan' => 'Aplikasi mobile untuk eksplorasi destinasi wisata terbaik di Indonesia.',
                'description' => 'WisataGo adalah aplikasi mobile eksplorasi wisata nusantara berbasis komunitas. Kami merancang identitas visual, UI/UX aplikasi mobile, sistem rekomendasi berbasis lokasi, dan materi peluncuran aplikasi di Play Store & App Store.',
                'hasil' => 'Mencapai 50.000+ unduhan dalam 6 bulan pertama rilis di Google Play Store.',
                'featured' => true,
                'website_url' => 'https://wisatago.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&q=80',
                'pilar' => ['Digital Asset', 'Digital Growth Team'],
                'products' => ['Mobile UI/UX', 'Brand Identity', 'Growth Marketing'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80',
                    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80',
                    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'User Research', 'desc' => 'Riset preferensi backpacker dan solo traveler dalam mencari hidden gem wisata.'],
                    ['num' => '02', 'title' => 'Interactive Prototype', 'desc' => 'Desain antarmuka responsif dengan alur navigasi peta dan bookmark lokasi.'],
                    ['num' => '03', 'title' => 'Design System', 'desc' => 'Pembuatan komponen UI library untuk kemudahan scale fitur di masa depan.'],
                ],
                'stats' => [
                    ['label' => 'Total Downloads', 'value' => '50K+'],
                    ['label' => 'Active Users', 'value' => '18K'],
                    ['label' => 'Rating App', 'value' => '4.8'],
                    ['label' => 'Durasi Proyek', 'value' => '8 minggu'],
                ],
                'tags' => ['Mobile App', 'UI/UX', 'Travel', 'Community'],
                'documents' => [],
            ],
            [
                'slug' => 'hidroponik-id',
                'name' => 'Hidroponik ID',
                'client' => 'Hidroponik Indonesia',
                'industry' => 'E-Commerce',
                'category' => 'E-Commerce',
                'location' => 'Bogor',
                'year' => '2024',
                'ringkasan' => 'Toko online perlengkapan hidroponik dengan sistem pembelian yang mudah.',
                'description' => 'Hidroponik ID adalah toko online penyedia kit, bibit, nutrisi, dan perlengkapan pertanian modern hidroponik. Kami mengembangkan website e-commerce dengan integrasi payment gateway otomatis, kalkulator ongkir kurir, dan katalog produk yang terstruktur rapi.',
                'hasil' => '+320% peningkatan volume pesanan harian tanpa perlu input manual admin.',
                'featured' => false,
                'website_url' => 'https://hidroponik.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80',
                'pilar' => ['Website', 'Digital Asset'],
                'products' => ['E-Commerce', 'Payment Gateway', 'Marketing Kit'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
                    'https://images.unsplash.com/photo-1530836369250-ef71a3a5e4fd?w=800&q=80',
                    'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'E-Commerce Planning', 'desc' => 'Struktur varian bibit, nutrisi AB Mix, dan bundle starter kit pemula.'],
                    ['num' => '02', 'title' => 'Checkout Flow', 'desc' => 'Penyederhanaan alur checkout tanpa registrasi rumit dan integrasi QRIS.'],
                    ['num' => '03', 'title' => 'Inventory Sync', 'desc' => 'Integrasi stok real-time dengan gudang operasional.'],
                ],
                'stats' => [
                    ['label' => 'Pertumbuhan Order', 'value' => '+320%'],
                    ['label' => 'Konversi Checkout', 'value' => '4.2%'],
                    ['label' => 'SKU Terdaftar', 'value' => '350+'],
                    ['label' => 'Durasi Proyek', 'value' => '6 minggu'],
                ],
                'tags' => ['E-Commerce', 'Agriculture', 'Payment Gateway', 'Online Shop'],
                'documents' => [],
            ],
            [
                'slug' => 'contech-id',
                'name' => 'Contech ID',
                'client' => 'PT Contech Inovasi Digital',
                'industry' => 'Landing Page',
                'category' => 'Landing Page',
                'location' => 'Jakarta',
                'year' => '2024',
                'ringkasan' => 'Landing page modern untuk layanan digital dan pengembangan software.',
                'description' => 'Contech ID adalah studio konsultan teknologi dan software house inovatif. Kami merancang landing page bertenaga tinggi dengan animasi halus, copy conversion-focused, showcase studi kasus, dan integrasi form konsultasi instan.',
                'hasil' => 'Rasio konversi pengunjung landing page menjadi leads konsultasi mencapai 8.4%.',
                'featured' => true,
                'website_url' => 'https://contech.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
                'pilar' => ['Website', 'Digital Asset'],
                'products' => ['Landing Page', 'Lead Generation', 'Brand Identity'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Copywriting Strategy', 'desc' => 'Penyusunan value proposition yang tajam untuk membedakan dengan kompetitor.'],
                    ['num' => '02', 'title' => 'Interactive UI', 'desc' => 'Penerapan micro-interactions dan visual grafis modern bertenaga WebGL/Framer Motion.'],
                    ['num' => '03', 'title' => 'Analytics Setup', 'desc' => 'Integrasi event tracking Google Analytics 4 dan Meta Pixel untuk retargeting.'],
                ],
                'stats' => [
                    ['label' => 'Conversion Rate', 'value' => '8.4%'],
                    ['label' => 'Avg Time on Page', 'value' => '3m 45s'],
                    ['label' => 'Client Inquiries', 'value' => '60+/bln'],
                    ['label' => 'Durasi Proyek', 'value' => '3 minggu'],
                ],
                'tags' => ['Landing Page', 'Tech Startup', 'Conversion', 'SaaS'],
                'documents' => [],
            ],
            [
                'slug' => 'mytravelink',
                'name' => 'MyTravelink',
                'client' => 'MyTravelink Indonesia',
                'industry' => 'Website Company Profile',
                'category' => 'Website Company Profile',
                'location' => 'Jakarta',
                'year' => '2024',
                'ringkasan' => 'Branding & website lengkap untuk agen travel premium yang ingin tampil profesional dan meningkatkan booking online.',
                'description' => 'MyTravelink adalah agen travel premium yang menawarkan paket wisata domestik dan internasional. Sebelum bekerja sama dengan Optibis, MyTravelink kesulitan menampilkan kesan profesional dan tidak punya sistem booking online. Kami merancang identitas brand yang modern dan terpercaya, membangun website dengan sistem booking terintegrasi, dan mengelola konten media sosial serta iklan untuk meningkatkan leads dan konversi.',
                'hasil' => '+180% peningkatan booking online dalam 6 bulan setelah website live dan kampanye iklan berjalan.',
                'featured' => true,
                'website_url' => 'https://mytravelink.co.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
                'pilar' => ['Digital Asset', 'Website', 'Digital Growth Team'],
                'products' => ['Brand Identity', 'Company Website', 'Social Media Management', 'Meta Ads'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
                    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
                    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
                    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
                    'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80',
                    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Brand Discovery', 'desc' => 'Workshop 2 jam untuk memahami visi MyTravelink sebagai agen travel premium dan target pasar mereka.'],
                    ['num' => '02', 'title' => 'Brand Identity', 'desc' => 'Pembuatan logo, brand guideline, dan semua aset visual yang konsisten untuk semua touchpoint.'],
                    ['num' => '03', 'title' => 'Website Development', 'desc' => 'Pembangunan website dengan sistem booking online, galeri paket wisata, dan integrasi pembayaran.'],
                    ['num' => '04', 'title' => 'Content & Social Media', 'desc' => 'Produksi konten travel yang inspiratif, kalender bulanan, dan manajemen Instagram & Facebook.'],
                    ['num' => '05', 'title' => 'Ads Campaign', 'desc' => 'Setup dan optimasi Meta Ads untuk paket wisata unggulan dengan targeting audiens yang tepat.'],
                    ['num' => '06', 'title' => 'Reporting & Optimization', 'desc' => 'Laporan bulanan dan optimasi berkelanjutan untuk meningkatkan ROAS dan konversi booking.'],
                ],
                'stats' => [
                    ['label' => 'Peningkatan Booking', 'value' => '+180%'],
                    ['label' => 'Followers IG', 'value' => '+12K'],
                    ['label' => 'ROAS Ads', 'value' => '4.2x'],
                    ['label' => 'Durasi Proyek', 'value' => '4 bulan'],
                ],
                'tags' => ['Branding', 'Website', 'Booking System', 'Social Media', 'Meta Ads'],
                'documents' => [
                    ['title' => 'Brand Guideline', 'type' => 'PDF', 'desc' => 'Panduan lengkap identitas brand MyTravelink', 'url' => 'https://example.com/docs/mytravelink-brand-guideline.pdf'],
                    ['title' => 'Company Profile', 'type' => 'PDF', 'desc' => 'Profil perusahaan & layanan travel', 'url' => 'https://example.com/docs/mytravelink-company-profile.pdf'],
                    ['title' => 'Proposal Proyek', 'type' => 'PDF', 'desc' => 'Proposal lengkap scope kerja website & digital marketing', 'url' => 'https://example.com/docs/mytravelink-proposal.pdf'],
                ],
            ],
            [
                'slug' => 'samara-property',
                'name' => 'Samara Property',
                'client' => 'Samara Property Group',
                'industry' => 'Website Bisnis',
                'category' => 'Website Bisnis',
                'location' => 'Surabaya',
                'year' => '2024',
                'ringkasan' => 'Corporate website dan brand identity untuk developer properti yang ingin menampilkan portfolio proyek dengan elegan.',
                'description' => 'Samara Property adalah developer properti yang sedang berkembang dengan beberapa proyek perumahan dan komersial. Mereka butuh identitas brand yang terpercaya dan website yang mampu menampilkan portfolio proyek secara menarik dengan galeri foto yang detail. Kami merancang brand identity yang premium dan membangun website company profile dengan galeri interaktif.',
                'hasil' => 'Website live dengan 5 proyek portfolio terdaftar, peningkatan inquiry form +120% dibanding website lama.',
                'featured' => true,
                'website_url' => 'https://samaraproperty.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
                'pilar' => ['Digital Asset', 'Website'],
                'products' => ['Brand Identity', 'Company Website', 'Company Profile'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
                    'https://images.unsplash.com/photo-1516156008625-3a2636957917?w=800&q=80',
                    'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Brand Discovery', 'desc' => 'Diskusi untuk memahami positioning Samara Property sebagai developer terpercaya di Surabaya.'],
                    ['num' => '02', 'title' => 'Brand Identity', 'desc' => 'Pembuatan logo, brand guideline, dan company profile premium untuk presentasi ke calon investor.'],
                    ['num' => '03', 'title' => 'Website Planning', 'desc' => 'Perencanaan struktur website dengan fokus pada galeri proyek dan inquiry management.'],
                    ['num' => '04', 'title' => 'Design & Development', 'desc' => 'Desain UI/UX premium dan development website dengan CMS untuk update proyek mandiri.'],
                    ['num' => '05', 'title' => 'Launch & Training', 'desc' => 'Deployment website, training CMS untuk tim marketing Samara Property.'],
                ],
                'stats' => [
                    ['label' => 'Inquiry Form', 'value' => '+120%'],
                    ['label' => 'Proyek Terdaftar', 'value' => '5'],
                    ['label' => 'Page Speed', 'value' => '95/100'],
                    ['label' => 'Durasi Proyek', 'value' => '6 minggu'],
                ],
                'tags' => ['Branding', 'Company Website', 'Company Profile', 'CMS'],
                'documents' => [
                    ['title' => 'Brand Guideline', 'type' => 'PDF', 'desc' => 'Panduan identitas brand Samara Property', 'url' => 'https://example.com/docs/samara-brand-guideline.pdf'],
                    ['title' => 'Company Profile', 'type' => 'PDF', 'desc' => 'Profil developer & portfolio proyek', 'url' => 'https://example.com/docs/samara-company-profile.pdf'],
                    ['title' => 'Wireframe Website', 'type' => 'PDF', 'desc' => 'Wireframe & struktur halaman website', 'url' => 'https://example.com/docs/samara-wireframe.pdf'],
                ],
            ],
            [
                'slug' => 'optik-clinic',
                'name' => 'Optik Clinic',
                'client' => 'Optik Clinic Jakarta',
                'industry' => 'Sistem Informasi',
                'category' => 'Sistem Informasi',
                'location' => 'Jakarta',
                'year' => '2023',
                'ringkasan' => 'Website booking & social media management untuk klinik mata yang ingin meningkatkan appointment online.',
                'description' => 'Optik Clinic adalah klinik mata dengan 3 cabang di Jakarta. Mereka kesulitan mengelola appointment karena pasien masih booking via telepon. Kami membangun website dengan sistem booking online real-time yang terintegrasi dengan kalender klinik, serta mengelola konten media sosial untuk edukasi pasien dan branding klinik.',
                'hasil' => '60% appointment beralih ke online booking dalam 3 bulan, mengurangi beban telepon resepsionis secara signifikan.',
                'featured' => false,
                'website_url' => 'https://optikclinic.co.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&q=80',
                'pilar' => ['Website', 'Digital Growth Team'],
                'products' => ['Website Growth System', 'Booking System', 'Social Media Management'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80',
                    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
                    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
                    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Audit & Onboarding', 'desc' => 'Analisis workflow booking klinik dan kebutuhan sistem untuk 3 cabang.'],
                    ['num' => '02', 'title' => 'Website & Booking System', 'desc' => 'Pembangunan website dengan booking system real-time, notifikasi WhatsApp, dan dashboard admin.'],
                    ['num' => '03', 'title' => 'Social Media Setup', 'desc' => 'Setup akun media sosial dan produksi konten edukasi kesehatan mata.'],
                    ['num' => '04', 'title' => 'Launch & Training', 'desc' => 'Deployment sistem dan training staf klinik untuk menggunakan dashboard booking.'],
                    ['num' => '05', 'title' => 'Monthly Management', 'desc' => 'Manajemen konten media sosial bulanan dan monitoring performa booking.'],
                ],
                'stats' => [
                    ['label' => 'Online Booking', 'value' => '60%'],
                    ['label' => 'Cabang Aktif', 'value' => '3'],
                    ['label' => 'Konten/Bulan', 'value' => '20+'],
                    ['label' => 'Durasi Proyek', 'value' => '8 minggu'],
                ],
                'tags' => ['Website', 'Booking System', 'Social Media', 'Dashboard'],
                'documents' => [
                    ['title' => 'User Manual Booking System', 'type' => 'PDF', 'desc' => 'Panduan penggunaan sistem booking untuk staf klinik', 'url' => 'https://example.com/docs/optik-booking-manual.pdf'],
                    ['title' => 'Content Strategy', 'type' => 'PDF', 'desc' => 'Strategi konten media sosial bulanan', 'url' => 'https://example.com/docs/optik-content-strategy.pdf'],
                    ['title' => 'Monthly Report', 'type' => 'PDF', 'desc' => 'Laporan performa booking & social media', 'url' => 'https://example.com/docs/optik-monthly-report.pdf'],
                ],
            ],
            [
                'slug' => 'kulina-rasa',
                'name' => 'Kulina Rasa',
                'client' => 'Kulina Rasa Group',
                'industry' => 'E-Commerce',
                'category' => 'E-Commerce',
                'location' => 'Bandung',
                'year' => '2024',
                'ringkasan' => 'Branding, content management & ads untuk restoran chain yang ingin meningkatkan brand awareness dan kunjungan.',
                'description' => 'Kulina Rasa adalah jaringan restoran dengan 5 outlet di Bandung. Mereka butuh identitas brand yang konsisten di semua outlet dan strategi digital untuk meningkatkan kunjungan. Kami merancang brand identity lengkap, mengelola konten media sosial dengan fokus pada food photography yang menggugah selera, dan menjalankan kampanye iklan Meta dan TikTok.',
                'hasil' => '+250% followers Instagram dalam 4 bulan, ROAS 5.1x dari Meta & TikTok Ads campaign.',
                'featured' => true,
                'website_url' => 'https://kulinarasa.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
                'pilar' => ['Digital Asset', 'Digital Growth Team'],
                'products' => ['Brand Identity', 'Content Management', 'Meta Ads', 'TikTok Ads'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
                    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
                    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
                    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
                    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
                    'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Brand Discovery', 'desc' => 'Workshop untuk memahami konsep Kulina Rasa dan positioning sebagai restoran modern.'],
                    ['num' => '02', 'title' => 'Brand Identity', 'desc' => 'Pembuatan logo, menu design, packaging design, dan brand guideline untuk semua outlet.'],
                    ['num' => '03', 'title' => 'Content Strategy', 'desc' => 'Rencana konten dengan fokus food photography, behind-the-scenes, dan customer stories.'],
                    ['num' => '04', 'title' => 'Produksi & Publishing', 'desc' => 'Produksi konten bulanan di Instagram, Facebook, dan TikTok dengan jadwal yang konsisten.'],
                    ['num' => '05', 'title' => 'Ads Campaign', 'desc' => 'Setup dan optimasi Meta Ads dan TikTok Ads untuk promo menu dan event outlet.'],
                    ['num' => '06', 'title' => 'Reporting & Growth', 'desc' => 'Laporan bulanan dengan fokus pada engagement, reach, dan konversi kunjungan outlet.'],
                ],
                'stats' => [
                    ['label' => 'Followers IG', 'value' => '+250%'],
                    ['label' => 'ROAS Ads', 'value' => '5.1x'],
                    ['label' => 'Outlet', 'value' => '5'],
                    ['label' => 'Durasi Proyek', 'value' => 'Ongoing'],
                ],
                'tags' => ['Branding', 'Content', 'Meta Ads', 'TikTok Ads'],
                'documents' => [
                    ['title' => 'Brand Guideline', 'type' => 'PDF', 'desc' => 'Panduan brand identity untuk semua outlet', 'url' => 'https://example.com/docs/kulina-brand-guideline.pdf'],
                    ['title' => 'Menu Design', 'type' => 'PDF', 'desc' => 'Desain menu & packaging untuk 5 outlet', 'url' => 'https://example.com/docs/kulina-menu-design.pdf'],
                    ['title' => 'Ads Campaign Report', 'type' => 'PDF', 'desc' => 'Laporan performa Meta & TikTok Ads', 'url' => 'https://example.com/docs/kulina-ads-report.pdf'],
                ],
            ],
            [
                'slug' => 'nisa-konsultan',
                'name' => 'Nisa Konsultan',
                'client' => 'Nisa Pratiwi, M.M.',
                'industry' => 'Website Company Profile',
                'category' => 'Website Company Profile',
                'location' => 'Jakarta',
                'year' => '2023',
                'ringkasan' => 'Personal branding & portfolio website untuk konsultan bisnis yang ingin tampil profesional dan menarik klien korporat.',
                'description' => 'Nisa Pratiwi adalah konsultan bisnis dengan pengalaman 10+ tahun yang ingin membangun personal brand yang kuat secara digital. Kami merancang identitas personal brand yang elegan, membangun website portfolio dengan blog untuk berbagi insights, dan membuat pitch deck yang siap digunakan untuk presentasi ke klien korporat.',
                'hasil' => '15 klien korporat baru dalam 6 bulan setelah website live, semua datang dari referral dan pencarian Google.',
                'featured' => false,
                'website_url' => 'https://nisapratiwi.com',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80',
                'pilar' => ['Digital Asset', 'Website'],
                'products' => ['Personal Branding', 'Portfolio Website', 'Pitch Deck'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
                    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
                    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
                    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Personal Brand Discovery', 'desc' => 'Sesi mendalam untuk memahami expertise, nilai, dan target klien Nisa.'],
                    ['num' => '02', 'title' => 'Brand Identity', 'desc' => 'Pembuatan personal logo, brand guideline, dan pitch deck yang elegan dan profesional.'],
                    ['num' => '03', 'title' => 'Website Development', 'desc' => 'Pembangunan portfolio website dengan blog, services page, dan contact form.'],
                    ['num' => '04', 'title' => 'SEO & Launch', 'desc' => 'Optimasi SEO untuk kata kunci konsultan bisnis dan deployment website.'],
                    ['num' => '05', 'title' => 'Handover', 'desc' => 'Training CMS untuk update blog mandiri dan dokumentasi lengkap.'],
                ],
                'stats' => [
                    ['label' => 'Klien Baru', 'value' => '15'],
                    ['label' => 'Google Rank', 'value' => 'Top 3'],
                    ['label' => 'Blog Articles', 'value' => '20+'],
                    ['label' => 'Durasi Proyek', 'value' => '5 minggu'],
                ],
                'tags' => ['Personal Branding', 'Portfolio Website', 'Pitch Deck', 'SEO'],
                'documents' => [
                    ['title' => 'Brand Guideline', 'type' => 'PDF', 'desc' => 'Panduan personal brand identity Nisa Pratiwi', 'url' => 'https://example.com/docs/nisa-brand-guideline.pdf'],
                    ['title' => 'Pitch Deck', 'type' => 'PDF', 'desc' => 'Pitch deck untuk presentasi ke klien korporat', 'url' => 'https://example.com/docs/nisa-pitch-deck.pdf'],
                    ['title' => 'SEO Strategy', 'type' => 'PDF', 'desc' => 'Strategi SEO & keyword targeting', 'url' => 'https://example.com/docs/nisa-seo-strategy.pdf'],
                ],
            ],
            [
                'slug' => 'graha-cipta',
                'name' => 'Graha Cipta',
                'client' => 'Graha Cipta Kontraktor',
                'industry' => 'Aplikasi Web',
                'category' => 'Aplikasi Web',
                'location' => 'Semarang',
                'year' => '2024',
                'ringkasan' => 'Company website premium dengan portfolio gallery untuk kontraktor yang ingin menampilkan proyek-proyek megah mereka.',
                'description' => 'Graha Cipta adalah kontraktor B2B yang mengerjakan proyek gedung komersial dan industri. Mereka butuh website yang mampu menampilkan portfolio proyek dengan foto-foto detail dan spesifikasi teknis. Kami membangun website company profile premium dengan galeri proyek yang interaktif, filter kategori, dan CMS untuk update proyek baru.',
                'hasil' => 'Website menjadi tools sales utama tim marketing, membantu closing 3 proyek besar dalam 4 bulan pertama.',
                'featured' => false,
                'website_url' => 'https://grahacipta.co.id',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
                'pilar' => ['Website'],
                'products' => ['Company Website', 'Portfolio Gallery', 'CMS'],
                'galeri' => [
                    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
                    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
                    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
                    'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&q=80',
                    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b67?w=800&q=80',
                ],
                'process' => [
                    ['num' => '01', 'title' => 'Discovery & Planning', 'desc' => 'Analisis kebutuhan website kontraktor B2B dan struktur portfolio proyek.'],
                    ['num' => '02', 'title' => 'Design & Wireframe', 'desc' => 'Desain UI/UX premium dengan fokus pada galeri proyek dan spesifikasi.'],
                    ['num' => '03', 'title' => 'Development', 'desc' => 'Pembangunan website dengan galeri interaktif, filter kategori, dan CMS.'],
                    ['num' => '04', 'title' => 'Content Migration', 'desc' => 'Migrasi data proyek dari dokumen lama ke format galeri website.'],
                    ['num' => '05', 'title' => 'Launch & Training', 'desc' => 'Deployment website dan training CMS untuk tim marketing Graha Cipta.'],
                ],
                'stats' => [
                    ['label' => 'Proyek Closing', 'value' => '3'],
                    ['label' => 'Galeri Proyek', 'value' => '15'],
                    ['label' => 'Page Speed', 'value' => '92/100'],
                    ['label' => 'Durasi Proyek', 'value' => '7 minggu'],
                ],
                'tags' => ['Company Website', 'Portfolio Gallery', 'CMS', 'B2B'],
                'documents' => [
                    ['title' => 'Sitemap & Structure', 'type' => 'PDF', 'desc' => 'Struktur website & sitemap lengkap', 'url' => 'https://example.com/docs/graha-sitemap.pdf'],
                    ['title' => 'CMS Manual', 'type' => 'PDF', 'desc' => 'Panduan update proyek & galeri via CMS', 'url' => 'https://example.com/docs/graha-cms-manual.pdf'],
                    ['title' => 'Project Specification', 'type' => 'PDF', 'desc' => 'Spesifikasi teknis proyek yang ditampilkan', 'url' => 'https://example.com/docs/graha-project-spec.pdf'],
                ],
            ],
        ];

        foreach ($portfolios as $p) {
            Portfolio::updateOrCreate(
                ['slug' => $p['slug']],
                $p
            );
        }
    }

    private function seedServicePillars(): void
    {
        $pillars = [
            [
                'slug' => 'digital-asset',
                'title' => 'Digital Asset',
                'summary' => 'Dari logo, brand guideline, company profile, hingga materi promosi — semua aset yang dibutuhkan bisnis Anda untuk tampil konsisten dan dipercaya.',
                'image_url' => '/assets/paket-digital-asset/siap-usaha.jpg',
                'data' => [
                    'tag' => 'PILAR 1',
                    'order' => 1,
                    'headline' => 'Bangun citra bisnis yang profesional',
                    'desc' => 'Dari logo, brand guideline, company profile, hingga materi promosi — semua aset yang dibutuhkan bisnis Anda untuk tampil konsisten dan dipercaya.',
                    'highlights' => ['Logo & Brand Guideline', 'Company Profile', 'Marketing Kit', 'Social Media Assets', 'Video Profile', 'Stationery Bisnis'],
                    'link' => '/digital-asset',
                    'color' => 'magenta',
                    'theme' => 'magenta',
                    'icon' => 'Palette',
                    'button_text' => 'Lihat Digital Asset',
                    'badge' => 'PILAR 1 — DIGITAL ASSET',
                    'title_prefix' => 'Bangun Citra Bisnis yang ',
                    'title_highlight' => 'Profesional',
                    'flyer_image' => '/assets/paket-digital-asset/siap-usaha.jpg'
                ],
                'is_published' => true,
            ],
            [
                'slug' => 'website',
                'title' => 'Website',
                'summary' => 'Website yang membantu bisnis Anda ditemukan, dipercaya, dihubungi, dan dikelola dengan lebih mudah — dari landing page hingga sistem terintegrasi.',
                'image_url' => '/assets/paket-website/landing-page.png',
                'data' => [
                    'tag' => 'PILAR 2',
                    'order' => 2,
                    'headline' => 'Miliki website yang bekerja untuk bisnis',
                    'desc' => 'Website yang membantu bisnis Anda ditemukan, dipercaya, dihubungi, dan dikelola dengan lebih mudah — dari landing page hingga sistem terintegrasi.',
                    'highlights' => ['Landing Page', 'Company Website', 'Website Bisnis', 'Website Growth System', 'Website Remake', 'Maintenance'],
                    'link' => '/website',
                    'color' => 'amethyst',
                    'theme' => 'amethyst',
                    'icon' => 'Globe',
                    'button_text' => 'Lihat Website',
                    'badge' => 'PILAR 2 — WEBSITE',
                    'title_prefix' => 'Kembangkan Bisnis Anda dengan ',
                    'title_highlight' => 'Website Modern',
                    'flyer_image' => '/assets/paket-website/landing-page.png'
                ],
                'is_published' => true,
            ],
            [
                'slug' => 'digital-growth-team',
                'title' => 'Digital Growth Team',
                'summary' => 'Tim digital lengkap yang mengelola konten, media sosial, SEO, iklan, dan laporan performa bisnis Anda secara konsisten setiap bulan.',
                'image_url' => '/assets/paket-growth/admin-digital.png',
                'data' => [
                    'tag' => 'PILAR 3',
                    'order' => 3,
                    'headline' => 'Punya tim digital tanpa harus merekrut sendiri',
                    'desc' => 'Tim digital lengkap yang mengelola konten, media sosial, SEO, iklan, dan laporan performa bisnis Anda secara konsisten setiap bulan.',
                    'highlights' => ['Content Management', 'Social Media', 'SEO', 'Digital Ads', 'Website Update', 'Reporting'],
                    'link' => '/digital-growth-team',
                    'color' => 'navy',
                    'theme' => 'navy',
                    'icon' => 'Users',
                    'button_text' => 'Lihat Digital Growth Team',
                    'badge' => 'PILAR 3 — DIGITAL GROWTH TEAM',
                    'title_prefix' => 'Akselerasi Pertumbuhan Bisnis dengan ',
                    'title_highlight' => 'Growth Team',
                    'flyer_image' => '/assets/paket-growth/admin-digital.png'
                ],
                'is_published' => true,
            ],
        ];

        foreach ($pillars as $pillar) {
            DB::table('service_pillars')->updateOrInsert(
                ['slug' => $pillar['slug']],
                [
                    'title' => $pillar['title'],
                    'summary' => $pillar['summary'],
                    'image_url' => $pillar['image_url'],
                    'data' => json_encode($pillar['data'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    'is_published' => $pillar['is_published'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }

    private function seedPackages(): void
    {
        $packages = [
            // ===== DIGITAL ASSET =====
            [
                'slug' => 'siap-usaha',
                'title' => 'Siap Usaha',
                'summary' => 'Bisnis baru & UMKM yang baru memulai',
                'image_url' => '/assets/paket-digital-asset/siap-usaha.jpg',
                'data' => [
                    'name' => 'Siap Usaha',
                    'pillar' => 'Digital Asset',
                    'pillar_slug' => 'digital-asset',
                    'target' => 'Bisnis baru & UMKM yang baru memulai',
                    'timeline' => '7–10 hari kerja',
                    'price' => 'Rp 2.900.000',
                    'price_short' => 'Rp 2,9jt',
                    'price_note' => 'Sekali bayar',
                    'popular' => false,
                    'hero_desc' => 'Paket awal untuk bisnis yang baru memulai — punya logo, kartu nama, email bisnis, dan kehadiran Google, semua siap pakai dalam waktu singkat.',
                    'flyer_image' => '/assets/paket-digital-asset/siap-usaha.jpg',
                    'highlights' => [
                        ['title' => 'Logo Original', 'desc' => 'Logo dirancang khusus untuk bisnis Anda, bukan template, agar identitas tetap unik.'],
                        ['title' => 'Siap Berjualan', 'desc' => 'Semua aset dasar siap pakai untuk mulai berjualan online maupun offline dari hari pertama.'],
                        ['title' => 'Google Verified', 'desc' => 'Terdaftar di Google Business Profile agar bisnis mudah ditemukan oleh pelanggan di sekitar Anda.'],
                    ],
                    'included' => [
                        ['title' => 'Logo & Brand Guideline', 'desc' => 'Logo utama, logo sekunder, panduan warna, dan tipografi dasar.', 'image' => 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80'],
                        ['title' => 'Kartu Nama', 'desc' => 'Desain kartu nama depan & belakang siap cetak dengan layout profesional.', 'image' => 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&q=80'],
                        ['title' => 'Social Media Starter Kit', 'desc' => '5 template feed dan 3 template story siap pakai untuk media sosial Anda.', 'image' => 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=600&q=80'],
                        ['title' => 'Google Business Profile', 'desc' => 'Pendaftaran dan optimasi profil bisnis di Google Maps dan Search.', 'image' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80'],
                        ['title' => 'WhatsApp Business Setup', 'desc' => 'Konfigurasi WhatsApp Business dengan profil bisnis dan katalog produk dasar.', 'image' => 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=600&q=80'],
                        ['title' => '5x Revisi', 'desc' => 'Kuota revisi untuk logo dan materi visual selama proses pengerjaan.', 'image' => 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80'],
                    ],
                    'deliverables' => [
                        'File logo (AI, PNG, SVG, PDF)',
                        'Brand guideline dasar (PDF)',
                        'File kartu nama siap cetak',
                        'File template social media (PSD/Canva)',
                        'Akses email bisnis aktif',
                        'Google Business Profile aktif',
                        'WhatsApp Business terkonfigurasi',
                    ],
                    'faqs' => [
                        ['q' => 'Berapa lama proses pengerjaan?', 'a' => 'Rata-rata 7–10 hari kerja, tergantung kecepatan feedback dari Anda. Jika Anda responsif, proses bisa lebih cepat.'],
                        ['q' => 'Apakah logo yang dibuat original?', 'a' => 'Ya, setiap logo dirancang khusus untuk bisnis Anda, bukan template. Anda mendapatkan file dalam berbagai format.'],
                        ['q' => 'Bisa tambah jumlah revisi?', 'a' => 'Bisa, tambahan revisi di atas kuota dikenakan biaya Rp 250.000 per revisi.'],
                        ['q' => 'Apakah domain sudah termasuk?', 'a' => 'Domain tidak termasuk. Kami bantu pembelian domain dengan biaya terpisah mulai Rp 200.000/tahun.'],
                        ['q' => 'Apakah bisa pilih warna sendiri?', 'a' => 'Tentu. Pada sesi Brand Discovery, Anda bisa menyampaikan preferensi warna dan gaya yang diinginkan.'],
                        ['q' => 'Bagaimana cara terima file?', 'a' => 'Semua file dikirim dalam folder Google Drive dengan format yang siap pakai untuk cetak maupun digital.'],
                    ],
                    'ideal_for' => [
                        'Bisnis yang baru dirintis dan belum punya identitas visual',
                        'UMKM yang ingin terlihat profesional tanpa biaya besar',
                        'Brand yang butuh logo dan akun digital dasar untuk mulai berjualan',
                        'Pelaku usaha yang ingin terdaftar di Google Business Profile',
                    ],
                    'theme' => ['color' => 'magenta', 'gradient' => 'from-magenta-50/30 to-white', 'glow' => 'bg-magenta/5', 'badge' => 'bg-magenta-50 text-magenta', 'btn' => 'bg-magenta hover:bg-magenta-500', 'check' => 'text-magenta', 'border' => 'border-magenta/20'],
                ],
                'is_published' => true,
            ],
            [
                'slug' => 'citra-usaha',
                'title' => 'Citra Usaha',
                'summary' => 'Bisnis yang ingin tampil lebih profesional',
                'image_url' => '/assets/paket-digital-asset/citra-usaha.jpg',
                'data' => [
                    'name' => 'Citra Usaha',
                    'pillar' => 'Digital Asset',
                    'pillar_slug' => 'digital-asset',
                    'target' => 'Bisnis yang ingin tampil lebih profesional',
                    'timeline' => '14–21 hari kerja',
                    'price' => 'Rp 5.900.000',
                    'price_short' => 'Rp 5,9jt',
                    'price_note' => 'Sekali bayar',
                    'popular' => true,
                    'hero_desc' => 'Paket lengkap untuk bisnis yang siap tampil profesional — full stationery, company profile, marketing kit, dan social media assets dalam satu paket.',
                    'flyer_image' => '/assets/paket-digital-asset/citra-usaha.jpg',
                    'highlights' => [
                        ['title' => 'Full Stationery', 'desc' => 'Semua dokumen bisnis konsisten: kartu nama, kop surat, invoice, dan receipt dalam satu identitas.'],
                        ['title' => 'Company Profile Digital', 'desc' => 'Presentasi bisnis profesional dalam format PDF interaktif 8-12 halaman siap kirim ke klien.'],
                        ['title' => 'Marketing Ready', 'desc' => 'Brosur, flyer, dan banner siap pakai untuk promosi langsung — tinggal cetak dan distribusikan.'],
                    ],
                    'included' => [
                        ['title' => 'Logo & Brand Guideline', 'desc' => 'Logo lengkap + brand guideline komprehensif (warna, tipografi, layout, usage rules).', 'image' => 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80'],
                        ['title' => 'Stationery Lengkap', 'desc' => 'Kartu nama, kop surat, amplop, invoice, dan receipt — semua konsisten dengan brand.', 'image' => 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&q=80'],
                        ['title' => 'Company Profile', 'desc' => 'Company profile digital (PDF interaktif) 8–12 halaman dengan layout profesional.', 'image' => 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80'],
                        ['title' => 'Marketing Kit', 'desc' => 'Brosur, flyer, dan banner promosi siap pakai untuk berbagai kebutuhan marketing.', 'image' => 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80'],
                        ['title' => 'Social Media Assets', 'desc' => '15 template feed, 10 template story, dan highlight cover untuk Instagram.', 'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'],
                        ['title' => 'Pitch Deck Template', 'desc' => 'Template presentasi bisnis 5–8 slide yang konsisten dengan identitas brand Anda.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                        ['title' => '8x Revisi', 'desc' => 'Kuota revisi yang cukup untuk penyempurnaan semua materi dalam paket.', 'image' => 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80'],
                    ],
                    'deliverables' => [
                        'File logo lengkap (AI, PNG, SVG, PDF)',
                        'Brand guideline komprehensif (PDF)',
                        'Semua file stationery siap cetak',
                        'Company profile digital interaktif',
                        'File marketing kit (PSD/Canva)',
                        'Template social media (PSD/Canva)',
                        'Template pitch deck (PPT/Google Slides)',
                    ],
                    'faqs' => [
                        ['q' => 'Apa beda dengan paket Siap Usaha?', 'a' => 'Paket Citra Usaha mencakup stationery lengkap, company profile, marketing kit, pitch deck template, dan lebih banyak template social media.'],
                        ['q' => 'Apakah company profile bisa dicetak?', 'a' => 'Company profile dirancang digital. Versi cetak tersedia sebagai add-on dengan biaya Rp 500.000.'],
                        ['q' => 'Bisa upgrade ke paket Bisnis Profesional?', 'a' => 'Bisa, selisih biaya akan dihitung dari harga paket yang dipilih.'],
                        ['q' => 'Apakah termasuk foto produk?', 'a' => 'Tidak termasuk. Foto produk tersedia sebagai add-on dengan tim fotografi kami mulai Rp 1.500.000.'],
                        ['q' => 'Berapa template social media yang saya dapatkan?', 'a' => '15 template feed, 10 template story, dan highlight cover — semua siap pakai dan editable di Canva/Photoshop.'],
                        ['q' => 'Apakah brand guideline bisa dipakai tim internal?', 'a' => 'Ya, brand guideline dirancang agar tim Anda bisa membuat materi sendiri secara konsisten dengan brand.'],
                    ],
                    'ideal_for' => [
                        'Bisnis yang sudah berjalan dan ingin meningkatkan citra profesional',
                        'Perusahaan yang butuh dokumen bisnis lengkap dan konsisten',
                        'Bisnis yang ingin materi presentasi & penjualan lebih meyakinkan',
                        'Brand yang aktif di media sosial dan butuh template visual',
                    ],
                    'theme' => ['color' => 'magenta', 'gradient' => 'from-magenta-50/30 to-white', 'glow' => 'bg-magenta/5', 'badge' => 'bg-magenta-50 text-magenta', 'btn' => 'bg-magenta hover:bg-magenta-500', 'check' => 'text-magenta', 'border' => 'border-magenta/20'],
                ],
                'is_published' => true,
            ],
            [
                'slug' => 'bisnis-profesional',
                'title' => 'Bisnis Profesional',
                'summary' => 'Bisnis berkembang & corporate',
                'image_url' => '/assets/paket-digital-asset/bisnis.png',
                'data' => [
                    'name' => 'Bisnis Profesional',
                    'pillar' => 'Digital Asset',
                    'pillar_slug' => 'digital-asset',
                    'target' => 'Bisnis berkembang & corporate',
                    'timeline' => '21–30 hari kerja',
                    'price' => 'Rp 8.900.000',
                    'price_short' => 'Rp 8,9jt',
                    'price_note' => 'Sekali bayar',
                    'popular' => false,
                    'hero_desc' => 'Paket premium untuk bisnis korporat yang butuh identitas brand lengkap — full brand identity, company profile premium, pitch deck, video profile, dan template presentasi profesional.',
                    'flyer_image' => '/assets/paket-digital-asset/bisnis.png',
                    'highlights' => [
                        ['title' => 'Premium Brand Identity', 'desc' => 'Identitas brand menyeluruh dengan guideline premium, icon set kustom, dan elemen visual eksklusif.'],
                        ['title' => 'Pitch Deck Investor-Grade', 'desc' => 'Template presentasi 15-20 slide profesional yang siap untuk meeting klien dan investor.'],
                        ['title' => 'Video Profile Corporate', 'desc' => 'Video profile 60-90 detik dengan motion graphics dan voice over untuk corporate communication.'],
                    ],
                    'included' => [
                        ['title' => 'Full Brand Identity', 'desc' => 'Logo lengkap, brand guideline premium, icon set kustom, dan elemen visual eksklusif.', 'image' => 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80'],
                        ['title' => 'Company Profile Premium', 'desc' => 'Company profile digital + cetak 16–20 halaman dengan desain editorial premium.', 'image' => 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80'],
                        ['title' => 'Pitch Deck', 'desc' => 'Template pitch deck 15–20 slide untuk presentasi bisnis & investor yang meyakinkan.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                        ['title' => 'Video Profile', 'desc' => 'Video profile 60–90 detik dengan motion graphics dan voice over profesional.', 'image' => 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80'],
                        ['title' => 'Template Presentasi', 'desc' => 'Template PowerPoint/Google Slides konsisten dengan brand untuk semua kebutuhan presentasi.', 'image' => 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80'],
                        ['title' => 'Brand Collateral Kit', 'desc' => 'Icon set kustom, pattern, texture, dan elemen visual untuk berbagai keperluan brand.', 'image' => 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80'],
                        ['title' => 'Unlimited Revisi Minor', 'desc' => 'Revisi minor tanpa batas selama proses pengerjaan untuk hasil yang sempurna.', 'image' => 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80'],
                    ],
                    'deliverables' => [
                        'File logo lengkap + brand guideline premium',
                        'Company profile digital + siap cetak premium',
                        'File pitch deck (PPT/Google Slides)',
                        'Video profile (MP4, 1080p)',
                        'Template presentasi (PPT/Google Slides)',
                        'Icon set & elemen visual kustom',
                        'Brand collateral kit lengkap',
                    ],
                    'faqs' => [
                        ['q' => 'Apakah proses syuting video sudah termasuk?', 'a' => 'Video profile menggunakan motion graphics dan stok footage. Syuting langsung tersedia sebagai add-on mulai Rp 3.000.000.'],
                        ['q' => 'Berapa halaman company profile?', 'a' => '16–20 halaman, dirancang dengan layout editorial premium dan siap untuk versi cetak.'],
                        ['q' => 'Apakah brand guideline bisa dipakai tim internal?', 'a' => 'Ya, brand guideline premium dirancang agar tim Anda bisa membuat materi sendiri secara konsisten.'],
                        ['q' => 'Bisa custom lebih lanjut?', 'a' => 'Tentu, paket ini bisa dikustomisasi sesuai kebutuhan korporat Anda. Hubungi kami untuk diskusi.'],
                        ['q' => 'Apakah pitch deck siap pakai untuk investor?', 'a' => 'Ya, template dirancang dengan struktur yang umum digunakan untuk pitch investor dan presentasi bisnis.'],
                        ['q' => 'Berapa lama proses video profile?', 'a' => 'Video profile 60-90 detik menggunakan motion graphics membutuhkan 5-7 hari kerja dalam timeline paket.'],
                    ],
                    'ideal_for' => [
                        'Perusahaan corporate yang butuh identitas brand menyeluruh',
                        'Bisnis yang serius tampil profesional di semua touchpoint',
                        'Eksekutif yang butuh pitch deck dan presentasi berkelas',
                        'Brand yang butuh video profile untuk corporate communication',
                    ],
                    'theme' => ['color' => 'magenta', 'gradient' => 'from-magenta-50/30 to-white', 'glow' => 'bg-magenta/5', 'badge' => 'bg-magenta-50 text-magenta', 'btn' => 'bg-magenta hover:bg-magenta-500', 'check' => 'text-magenta', 'border' => 'border-magenta/20'],
                ],
                'is_published' => true,
            ],

            // ===== DIGITAL GROWTH TEAM =====
            [
                'slug' => 'growth-starter',
                'title' => 'Starter',
                'summary' => 'UMKM & bisnis kecil',
                'image_url' => '/assets/paket-growth/admin-digital.png',
                'data' => [
                    'name' => 'Starter',
                    'pillar' => 'Digital Growth Team',
                    'pillar_slug' => 'digital-growth-team',
                    'target' => 'UMKM & bisnis kecil',
                    'timeline' => 'Bulanan berkelanjutan',
                    'price' => 'Rp 3.500.000/bulan',
                    'price_short' => 'Rp 3,5jt/bln',
                    'price_note' => 'Kontrak minimal 3 bulan',
                    'popular' => false,
                    'hero_desc' => 'Tim digital dasar untuk UMKM — 12 konten/bulan di 2 platform, content calendar, basic reporting, dan konsultasi bulanan untuk mulai tumbuh secara konsisten.',
                    'flyer_image' => '/assets/paket-growth/admin-digital.png',
                    'highlights' => [
                        ['title' => 'Konten Konsisten', 'desc' => '12 konten siap posting setiap bulan — desain + caption — tanpa repot produksi sendiri.'],
                        ['title' => '2 Platform Terkelola', 'desc' => 'Manajemen 2 platform media sosial pilihan Anda dengan jadwal posting yang terencana.'],
                        ['title' => 'Konsultasi Bulanan', 'desc' => 'Sesi strategi 1x/bulan dengan tim digital kami untuk evaluasi dan perencanaan.'],
                    ],
                    'included' => [
                        ['title' => '12 Konten/Bulan', 'desc' => '12 desain feed + caption siap posting per bulan dengan tema yang terencana.', 'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'],
                        ['title' => '2 Platform', 'desc' => 'Manajemen 2 platform media sosial (pilihan: Instagram, Facebook, atau TikTok).', 'image' => 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80'],
                        ['title' => 'Basic Reporting', 'desc' => 'Laporan performa bulanan ringkas: reach, engagement, followers, dan posting summary.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                        ['title' => 'Content Calendar', 'desc' => 'Kalender konten bulanan dengan tema, jadwal posting, dan caption preview.', 'image' => 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80'],
                        ['title' => 'Monthly Consultation', 'desc' => 'Sesi konsultasi 1x/bulan (45 menit) untuk evaluasi dan strategi.', 'image' => 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80'],
                        ['title' => 'WhatsApp Support', 'desc' => 'Dukungan via WhatsApp untuk pertanyaan dan diskusi cepat di jam kerja.', 'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'],
                        ['title' => 'Hashtag Strategy', 'desc' => 'Riset dan rekomendasi hashtag yang relevan untuk setiap konten.', 'image' => 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80'],
                    ],
                    'deliverables' => [
                        '12 desain konten + caption/bulan',
                        'Content calendar bulanan',
                        'Laporan performa bulanan',
                        'Sesi konsultasi 1x/bulan (45 menit)',
                        'Akses WhatsApp support (jam kerja)',
                        'Riset hashtag untuk setiap konten',
                    ],
                    'faqs' => [
                        ['q' => 'Berapa lama kontrak minimal?', 'a' => 'Kontrak minimal 3 bulan untuk memastikan strategi memiliki waktu untuk menunjukkan hasil.'],
                        ['q' => 'Apakah boleh pilih platform selain Instagram?', 'a' => 'Bisa. Pilih 2 dari: Instagram, Facebook, atau TikTok.'],
                        ['q' => 'Bagaimana jika butuh konten tambahan?', 'a' => 'Konten tambahan tersedia mulai Rp 150.000/konten.'],
                        ['q' => 'Apakah termasuk manajemen iklan?', 'a' => 'Tidak. Manajemen iklan tersedia sebagai add-on mulai Rp 1.000.000/bulan + budget iklan.'],
                        ['q' => 'Apakah kontennya original?', 'a' => 'Ya, semua konten dirancang khusus untuk brand Anda dengan copywriting profesional.'],
                        ['q' => 'Bisa upgrade ke paket Growth?', 'a' => 'Bisa kapan saja. Selisih biaya dihitung pro-rata dari periode tersisa.'],
                    ],
                    'ideal_for' => [
                        'UMKM yang baru mulai serius di media sosial',
                        'Bisnis kecil yang butuh konten rutin tapi tidak punya tim',
                        'Brand yang ingin konsisten posting tanpa repot produksi sendiri',
                        'Bisnis yang butuh panduan strategi digital dasar',
                    ],
                    'theme' => ['color' => 'navy', 'gradient' => 'from-blue-50/30 to-white', 'glow' => 'bg-navy/5', 'badge' => 'bg-blue-50 text-blue-600', 'btn' => 'bg-navy hover:bg-navy-400', 'check' => 'text-blue-600', 'border' => 'border-navy/20'],
                ],
                'is_published' => true,
            ],
            [
                'slug' => 'growth',
                'title' => 'Admin Digital',
                'summary' => 'Bisnis berkembang',
                'image_url' => '/assets/paket-growth/admin-digital.png',
                'data' => [
                    'name' => 'Admin Digital',
                    'pillar' => 'Digital Growth Team',
                    'pillar_slug' => 'digital-growth-team',
                    'target' => 'Bisnis berkembang',
                    'timeline' => 'Bulanan berkelanjutan',
                    'price' => 'Rp 7.500.000/bulan',
                    'price_short' => 'Rp 7,5jt/bln',
                    'price_note' => 'Kontrak minimal 3 bulan',
                    'popular' => true,
                    'hero_desc' => 'Tim digital lengkap untuk bisnis berkembang — 24 konten/bulan di 3 platform, SEO & ads management, lead reporting, dan meeting dua mingguan untuk pertumbuhan yang terukur.',
                    'flyer_image' => '/assets/paket-growth/admin-digital.png',
                    'highlights' => [
                        ['title' => '24 Konten + Reels', 'desc' => '24 desain feed + 8 video reels setiap bulan di 3 platform — konten yang konsisten dan variatif.'],
                        ['title' => 'SEO & Ads Managed', 'desc' => 'SEO dan manajemen iklan dikelola oleh tim profesional untuk pertumbuhan organik dan paid.'],
                        ['title' => 'Bi-weekly Strategy', 'desc' => 'Meeting 2x/bulan untuk evaluasi performa, perencanaan, dan optimasi strategi.'],
                    ],
                    'included' => [
                        ['title' => '24 Konten/Bulan', 'desc' => '24 desain feed + caption + 8 video reels pendek (15-30 detik) per bulan.', 'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'],
                        ['title' => '3 Platform', 'desc' => 'Manajemen 3 platform: Instagram, Facebook, dan TikTok dengan strategi per platform.', 'image' => 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80'],
                        ['title' => 'SEO Management', 'desc' => 'SEO on-page, local SEO, Google Business Profile, dan monitoring keyword ranking.', 'image' => 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80'],
                        ['title' => 'Ads Management', 'desc' => 'Manajemen Meta Ads atau Google Ads: setup, monitoring, dan optimasi campaign (budget terpisah).', 'image' => 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80'],
                        ['title' => 'Lead Reporting', 'desc' => 'Laporan leads dan konversi dengan tracking pipeline dan source attribution.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                        ['title' => 'Bi-weekly Meeting', 'desc' => 'Meeting 2x/bulan (60 menit) untuk strategy review, planning, dan optimization.', 'image' => 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80'],
                        ['title' => 'Content & Ads Strategy', 'desc' => 'Dokumen strategi konten dan iklan bulanan dengan target dan KPI yang jelas.', 'image' => 'https://images.unsplash.com/photo-1554189097-ffe88e998a2b?w=600&q=80'],
                    ],
                    'deliverables' => [
                        '24 desain konten + caption + 8 reels/bulan',
                        'SEO report & keyword monitoring',
                        'Ads management & campaign report',
                        'Lead reporting dengan pipeline tracking',
                        'Sesi meeting 2x/bulan (60 menit)',
                        'Content calendar & strategy document',
                        'Ads creative & copy untuk campaign',
                    ],
                    'faqs' => [
                        ['q' => 'Apakah budget iklan sudah termasuk?', 'a' => 'Tidak. Budget iklan terpisah dan dibayarkan langsung ke platform. Kami mengelola campaign-nya.'],
                        ['q' => 'Berapa budget iklan yang disarankan?', 'a' => 'Minimal Rp 1.500.000/bulan untuk hasil yang terukur. Kami akan merekomendasikan budget optimal.'],
                        ['q' => 'Apakah reels dibuat oleh tim Anda?', 'a' => 'Ya, reels berupa video pendek (15–30 detik) yang dirancang dan diedit oleh tim kami.'],
                        ['q' => 'Bisa upgrade ke paket Professional?', 'a' => 'Bisa kapan saja. Selisih biaya dihitung pro-rata dari periode tersisa.'],
                        ['q' => 'Apakah termasuk manajemen Google Ads?', 'a' => 'Ya, paket Growth termasuk manajemen Meta Ads ATAU Google Ads. Keduanya tersedia sebagai add-on.'],
                        ['q' => 'Bagaimana cara melapor hasil?', 'a' => 'Laporan bulanan lengkap + meeting 2x/bulan untuk review performa, leads, dan strategi.'],
                    ],
                    'ideal_for' => [
                        'Bisnis menengah yang aktif beriklan di digital',
                        'Brand yang butuh konten lebih banyak dan konsisten',
                        'Bisnis yang ingin generate leads dari digital',
                        'Perusahaan yang butuh SEO dan ads dikelola profesional',
                    ],
                    'theme' => ['color' => 'navy', 'gradient' => 'from-blue-50/30 to-white', 'glow' => 'bg-navy/5', 'badge' => 'bg-blue-50 text-blue-600', 'btn' => 'bg-navy hover:bg-navy-400', 'check' => 'text-blue-600', 'border' => 'border-navy/20'],
                ],
                'is_published' => true,
            ],
            [
                'slug' => 'growth-professional',
                'title' => 'Professional',
                'summary' => 'Bisnis yang serius bertumbuh',
                'image_url' => '/assets/paket-growth/admin-digital.png',
                'data' => [
                    'name' => 'Professional',
                    'pillar' => 'Digital Growth Team',
                    'pillar_slug' => 'digital-growth-team',
                    'target' => 'Bisnis yang serius bertumbuh',
                    'timeline' => 'Bulanan berkelanjutan',
                    'price' => 'Rp 15.000.000/bulan',
                    'price_short' => 'Rp 15jt/bln',
                    'price_note' => 'Kontrak minimal 3 bulan',
                    'popular' => false,
                    'hero_desc' => 'Tim digital full-service untuk bisnis yang serius bertumbuh — 40 konten/bulan di semua platform, full SEO & ads, website management, CRM administration, dan meeting mingguan dengan tim dedicated.',
                    'flyer_image' => '/assets/paket-growth/admin-digital.png',
                    'highlights' => [
                        ['title' => 'Full-Service Digital', 'desc' => 'Konten, SEO, ads, website, dan CRM dikelola satu tim dedicated — semua kebutuhan digital dalam satu paket.'],
                        ['title' => 'Dedicated Manager', 'desc' => 'Account manager pribadi yang memahami bisnis Anda secara mendalam dan menjadi kontak utama.'],
                        ['title' => 'Weekly Reporting', 'desc' => 'Laporan dan meeting mingguan untuk transparansi penuh dan optimasi yang cepat.'],
                    ],
                    'included' => [
                        ['title' => '40 Konten/Bulan', 'desc' => '40 desain feed + caption + 15 video reels + 4 artikel blog SEO per bulan.', 'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'],
                        ['title' => 'All Platforms', 'desc' => 'Manajemen semua platform: Instagram, Facebook, TikTok, LinkedIn, YouTube.', 'image' => 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80'],
                        ['title' => 'Full SEO & Ads', 'desc' => 'SEO lengkap (on-page, off-page, technical) + Meta Ads, Google Ads, TikTok Ads.', 'image' => 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80'],
                        ['title' => 'Website Management', 'desc' => 'Update konten, maintenance, blog posting, dan monitoring performa website.', 'image' => 'https://images.unsplash.com/photo-1467232004584-a241de879f5a?w=600&q=80'],
                        ['title' => 'CRM Administration', 'desc' => 'Manajemen CRM, lead pipeline, auto-followup system, dan sales reporting.', 'image' => 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80'],
                        ['title' => 'Dedicated Account Manager', 'desc' => 'Account manager pribadi yang memimpin tim dan menjadi kontak utama Anda.', 'image' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80'],
                        ['title' => 'Weekly Meeting', 'desc' => 'Meeting 1x/minggu (60 menit) dengan account manager untuk strategi dan reporting.', 'image' => 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80'],
                    ],
                    'deliverables' => [
                        '40 konten + 15 reels + 4 artikel blog/bulan',
                        'Full SEO report & analytics',
                        'Multi-platform ads management & reporting',
                        'Website update & maintenance',
                        'CRM management & lead reporting',
                        'Dedicated account manager',
                        'Weekly strategy meeting (60 menit)',
                        'Monthly comprehensive digital report',
                    ],
                    'faqs' => [
                        ['q' => 'Apakah saya dapat account manager dedicated?', 'a' => 'Ya, paket Professional termasuk dedicated account manager yang menjadi kontak utama Anda.'],
                        ['q' => 'Berapa budget ads yang disarankan?', 'a' => 'Minimal Rp 3.000.000/bulan untuk hasil optimal di multiple platform.'],
                        ['q' => 'Apakah artikel blog ditulis oleh tim Anda?', 'a' => 'Ya, 4 artikel blog/bulan ditulis oleh copywriter profesional dan dioptimasi untuk SEO.'],
                        ['q' => 'Apakah bisa custom paket?', 'a' => 'Tentu. Paket Professional sangat fleksibel dan dapat disesuaikan dengan kebutuhan spesifik bisnis Anda.'],
                        ['q' => 'Platform apa saja yang dikelola?', 'a' => 'Semua platform utama: Instagram, Facebook, TikTok, LinkedIn, dan YouTube.'],
                        ['q' => 'Apakah termasuk website maintenance?', 'a' => 'Ya, paket Professional termasuk update konten, maintenance, dan monitoring performa website.'],
                    ],
                    'ideal_for' => [
                        'Perusahaan yang butuh tim digital full-service',
                        'Bisnis yang serius scaling melalui digital',
                        'Brand yang aktif di semua platform dan butuh konsistensi',
                        'Bisnis yang butuh website, SEO, ads, dan CRM dikelola satu tim',
                    ],
                    'theme' => ['color' => 'navy', 'gradient' => 'from-blue-50/30 to-white', 'glow' => 'bg-navy/5', 'badge' => 'bg-blue-50 text-blue-600', 'btn' => 'bg-navy hover:bg-navy-400', 'check' => 'text-blue-600', 'border' => 'border-navy/20'],
                ],
                'is_published' => true,
            ],
            [
                'slug' => 'paket-custom',
                'title' => 'Paket Custom',
                'summary' => 'Bisnis dengan kebutuhan spesifik & custom',
                'image_url' => 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
                'data' => [
                    'name' => 'Paket Custom',
                    'pillar' => 'Paket Khusus',
                    'pillar_slug' => 'khusus',
                    'target' => 'Bisnis dengan kebutuhan spesifik & custom',
                    'timeline' => 'Fleksibel sesuai kesepakatan',
                    'price' => 'Sesuai Kebutuhan',
                    'price_short' => 'Custom',
                    'price_note' => 'Konsultasi gratis',
                    'popular' => false,
                    'hero_desc' => 'Solusi paket fleksibel yang dirancang khusus mengikuti skala, alur kerja, dan target pertumbuhan bisnis Anda.',
                    'flyer_image' => 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
                    'highlights' => [
                        ['title' => 'Solusi Fleksibel', 'desc' => 'Kombinasi layanan branding, website, software, atau digital growth yang disesuaikan penuh.'],
                        ['title' => 'Sesuai Budget', 'desc' => 'Skema biaya dan timeline pengerjaan yang diselaraskan dengan prioritas dan kapasitas bisnis.'],
                        ['title' => 'Dedicated Support', 'desc' => 'Konsultasi mendalam dan pendampingan intensif dari tim spesialis Optibis.'],
                    ],
                    'included' => [
                        ['title' => 'Kustomisasi Ruang Lingkup', 'desc' => 'Penyusunan fitur, aset, dan deliverable sesuai kebutuhan nyata bisnis Anda.', 'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'],
                        ['title' => 'Analisis & Scoping Gratis', 'desc' => 'Sesi discovery untuk membedah problem, workflow, dan arsitektur solusi.', 'image' => 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80'],
                        ['title' => 'Timeline Fleksibel', 'desc' => 'Jadwal pengerjaan bertahap sesuai kesiapan data dan operasional tim Anda.', 'image' => 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80'],
                    ],
                    'deliverables' => [
                        'Proposal solusi & technical specification',
                        'Deliverable gabungan sesuai kesepakatan',
                        'Handover & sesi training',
                        'Garansi & dukungan purna jual',
                    ],
                    'faqs' => [
                        ['q' => 'Bagaimana cara menentukan harga paket custom?', 'a' => 'Harga ditentukan setelah sesi konsultasi dan penyusunan scope of work (SOW) yang transparan.'],
                        ['q' => 'Apakah konsultasi awal berbayar?', 'a' => 'Tidak. Sesi konsultasi awal dan pembuatan estimasi biaya 100% gratis.'],
                    ],
                    'ideal_for' => [
                        'Bisnis dengan model operasional atau workflow khusus',
                        'Perusahaan yang ingin menggabungkan berbagai layanan dalam satu kontrak',
                        'Bisnis yang butuh milestone atau fase rilis bertahap',
                    ],
                    'theme' => ['color' => 'magenta', 'gradient' => 'from-magenta-50/30 to-white', 'glow' => 'bg-magenta/5', 'badge' => 'bg-magenta-50 text-magenta', 'btn' => 'bg-magenta hover:bg-magenta-500', 'check' => 'text-magenta', 'border' => 'border-magenta/20'],
                ],
                'is_published' => true,
            ],
        ];

        $validSlugs = array_column($packages, 'slug');
        DB::table('package_items')->whereNotIn('slug', $validSlugs)->delete();

        foreach ($packages as $pkg) {
            DB::table('package_items')->updateOrInsert(
                ['slug' => $pkg['slug']],
                [
                    'title' => $pkg['title'],
                    'summary' => $pkg['summary'],
                    'image_url' => $pkg['image_url'],
                    'data' => json_encode($pkg['data'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    'is_published' => $pkg['is_published'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }

    private function seedServices(string $file, string $pillarSlug, string $pillarName): void
    {
        $source = file_get_contents($file);
        if ($source === false) {
            return;
        }

        $websiteDetails = [
            'landing-page' => [
                'price' => 'Rp 3.500.000',
                'price_note' => 'Sekali bayar',
                'target' => 'Promosi & campaign',
                'timeline' => '5–7 hari kerja',
                'highlights' => [
                    ['title' => 'Fokus Konversi', 'desc' => 'Satu halaman yang dirancang khusus untuk mengubah pengunjung menjadi lead dengan CTA yang jelas.'],
                    ['title' => 'Loading Cepat', 'desc' => 'Dioptimasi untuk loading di bawah 3 detik di semua perangkat, karena setiap detik berpengaruh pada konversi.'],
                    ['title' => 'SEO Ready', 'desc' => 'Struktur HTML dan meta tags yang ramah Google sejak hari pertama agar mudah ditemukan.'],
                ],
                'included' => [
                    ['title' => '1 Halaman Landing Page', 'desc' => 'Satu halaman responsif dengan section hero, fitur, testimoni, dan CTA yang terstruktur.', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ck3bjCR8GNjgVWyXDVSmo1gi-2fa7NqB9Bta_NxfuA&s=10'],
                    ['title' => 'Mobile Responsive', 'desc' => 'Tampil optimal di desktop, tablet, dan mobile dengan desain yang adaptif.', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8J7SID0VLWgS0mF6iIUp3iqfjXk34VAewuraRG33HSQ&s'],
                    ['title' => 'Form Inquiry', 'desc' => 'Form kontak yang terhubung ke email dan database untuk capture lead secara otomatis.', 'image' => 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80'],
                    ['title' => 'WhatsApp Integration', 'desc' => 'Tombol WhatsApp mengambang dan click-to-chat untuk konversi langsung.', 'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'],
                    ['title' => 'SEO Dasar', 'desc' => 'Meta tags, structured data, sitemap, dan optimasi kecepatan dasar untuk Google.', 'image' => 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80'],
                    ['title' => 'Google Analytics', 'desc' => 'Pemasangan Google Analytics dan Search Console untuk tracking pengunjung.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                    ['title' => 'Hosting 1 Tahun', 'desc' => 'Hosting dan domain .com selama 1 tahun pertama sudah termasuk.', 'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80'],
                ],
                'faqs' => [
                    ['q' => 'Apakah domain sudah termasuk?', 'a' => 'Ya, domain .com dan hosting 1 tahun sudah termasuk dalam paket.'],
                    ['q' => 'Bisa tambah halaman?', 'a' => 'Paket ini untuk 1 halaman. Tambahan halaman tersedia mulai Rp 500.000/halaman.'],
                    ['q' => 'Apakah bisa diupdate sendiri?', 'a' => 'Konten dasar bisa diupdate sendiri. Untuk perubahan struktur, tim kami siap membantu.'],
                    ['q' => 'Berapa lama hosting aktif?', 'a' => 'Hosting aktif 1 tahun. Perpanjangan tahun berikutnya mulai Rp 500.000/tahun.'],
                    ['q' => 'Apakah website loading-nya cepat?', 'a' => 'Ya, website dioptimasi untuk loading di bawah 3 detik dengan kompresi gambar dan caching.'],
                    ['q' => 'Bisa integrasi dengan WhatsApp?', 'a' => 'Ya, tombol WhatsApp mengambang dan click-to-chat sudah termasuk dalam paket.'],
                ],
            ],
            'multi-page' => [
                'price' => 'Rp 7.500.000',
                'price_note' => 'Sekali bayar',
                'target' => 'Company profile online',
                'timeline' => '14–21 hari kerja',
                'highlights' => [
                    ['title' => 'CMS Mandiri', 'desc' => 'Update konten, blog, dan portfolio sendiri tanpa bantuan teknis melalui dashboard admin yang intuitif.'],
                    ['title' => 'Multi-Halaman Lengkap', 'desc' => '5-8 halaman terstruktur: Home, About, Services, Portfolio, Blog, Contact yang siap profesional.'],
                    ['title' => 'SEO & Analytics', 'desc' => 'Google Analytics dan Search Console terintegrasi sejak awal untuk tracking performa website.'],
                ],
                'included' => [
                    ['title' => 'Multi Halaman', 'desc' => '5–8 halaman: Home, About, Services, Portfolio, Blog, dan Contact — terstruktur profesional.', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT733siFmNQb7BsceEeZGJA7-5USoKKMdUnQ9jLXdBFog&s=10'],
                    ['title' => 'CMS Sederhana', 'desc' => 'Dashboard admin untuk update konten, blog, dan portfolio sendiri tanpa pengetahuan teknis.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                    ['title' => 'Gallery & Portfolio', 'desc' => 'Halaman gallery dan portfolio dengan filter kategori yang interaktif.', 'image' => 'https://images.unsplash.com/photo-1554189097-ffe88e998a2b?w=600&q=80'],
                    ['title' => 'Form Kontak', 'desc' => 'Form kontak dengan notifikasi email otomatis untuk setiap inquiry yang masuk.', 'image' => 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80'],
                    ['title' => 'Google Analytics', 'desc' => 'Integrasi Google Analytics dan Search Console untuk tracking pengunjung dan performa.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                    ['title' => 'SEO Optimization', 'desc' => 'Optimasi SEO on-page: meta tags, sitemap, structured data, dan heading structure.', 'image' => 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80'],
                    ['title' => 'Maintenance 3 Bulan', 'desc' => 'Dukungan teknis, update sistem, dan perbaikan bug selama 3 bulan pertama.', 'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80'],
                ],
                'faqs' => [
                    ['q' => 'Berapa halaman yang saya dapatkan?', 'a' => '5–8 halaman standar (Home, About, Services, Portfolio, Blog, Contact). Halaman tambahan mulai Rp 500.000.'],
                    ['q' => 'Apakah CMS mudah dipakai?', 'a' => 'Ya, CMS dirancang untuk pengguna non-teknis. Kami berikan training dan dokumentasi lengkap.'],
                    ['q' => 'Apakah bisa tambah fitur e-commerce?', 'a' => 'Bisa, sebagai add-on. Fitur toko online mulai Rp 2.000.000 dengan keranjang dan pembayaran.'],
                    ['q' => 'Apa yang terjadi setelah 3 bulan maintenance?', 'a' => 'Anda bisa melanjutkan dengan paket maintenance bulanan mulai Rp 500.000/bulan.'],
                    ['q' => 'Apakah website sudah SEO friendly?', 'a' => 'Ya, website dibangun dengan struktur SEO-friendly: meta tags, sitemap, structured data, dan heading yang terorganisir.'],
                    ['q' => 'Bisa pindah dari website lama?', 'a' => 'Tentu. Kami bantu migrasi konten dari website lama Anda tanpa kehilangan data.'],
                ],
            ],
            'toko-online' => [
                'price' => 'Rp 15.000.000',
                'price_note' => 'Sekali bayar',
                'target' => 'Bisnis yang butuh sistem',
                'timeline' => '30–45 hari kerja',
                'highlights' => [
                    ['title' => 'Bukan Sekadar Website', 'desc' => 'Sistem terintegrasi: website + dashboard admin + CRM + booking system dalam satu platform.'],
                    ['title' => 'CRM & Lead Pipeline', 'desc' => 'Kelola leads, klien, dan pipeline penjualan dari satu dashboard terpusat yang mudah digunakan.'],
                    ['title' => 'Booking Otomatis', 'desc' => 'Sistem reservasi online dengan kalender real-time, notifikasi otomatis, dan manajemen slot.'],
                ],
                'included' => [
                    ['title' => 'Website Custom', 'desc' => 'Website custom multi-halaman dengan desain premium dan fitur khusus sesuai kebutuhan bisnis.', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Mll7exIfybaV-27BYX7P3pBCBVWCCTbH4Aim_A7qTw&s=10'],
                    ['title' => 'Dashboard Admin', 'desc' => 'Dashboard admin lengkap untuk mengelola seluruh sistem: konten, leads, booking, dan laporan.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                    ['title' => 'CRM Ringan', 'desc' => 'Sistem CRM untuk manajemen leads, klien, pipeline penjualan, dan riwayat komunikasi.', 'image' => 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80'],
                    ['title' => 'Lead Management', 'desc' => 'Form, tracking, auto-followup, dan scoring untuk setiap lead yang masuk ke sistem.', 'image' => 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80'],
                    ['title' => 'Booking System', 'desc' => 'Sistem booking/reservation online dengan kalender real-time, notifikasi email & WhatsApp.', 'image' => 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80'],
                    ['title' => 'Multi-User & Role', 'desc' => 'Sistem multi-user dengan role berbeda (admin, staff, viewer) dan permission control.', 'image' => 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80'],
                    ['title' => 'Reporting & Analytics', 'desc' => 'Laporan penjualan, leads, booking, dan performa website real-time dalam dashboard.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                ],
                'faqs' => [
                    ['q' => 'Apakah CRM bisa diintegrasikan dengan WhatsApp?', 'a' => 'Ya, sistem bisa diintegrasikan dengan WhatsApp Business API untuk auto-reply dan notifikasi otomatis.'],
                    ['q' => 'Berapa user yang bisa mengakses dashboard?', 'a' => 'Default 5 user dengan role berbeda. Tambahan user tersedia mulai Rp 100.000/user/bulan.'],
                    ['q' => 'Apakah sistem bisa dikembangkan lebih lanjut?', 'a' => 'Tentu, sistem dibangun dengan arsitektur yang scalable untuk pengembangan future.'],
                    ['q' => 'Apakah termasuk maintenance?', 'a' => 'Termasuk 3 bulan maintenance. Setelah itu, paket maintenance mulai Rp 1.000.000/bulan.'],
                    ['q' => 'Bisa custom fitur sesuai kebutuhan?', 'a' => 'Ya, sistem dibangun custom. Fitur khusus bisa didiskusikan dan dikembangkan sesuai kebutuhan bisnis.'],
                    ['q' => 'Apakah sistem mendukung multi-cabang?', 'a' => 'Default untuk 1 lokasi. Module multi-cabang tersedia sebagai add-on mulai Rp 3.000.000.'],
                ],
            ],
        ];

        $seededSlugs = [];
        foreach ($this->objectBlocks($source, 'SERVICES') as $block) {
            $fields = $this->parseObject($block, $this->constants($source));
            $title = $this->firstValue($fields, ['title', 'name']);
            if ($title === null) {
                continue;
            }

            $slug = $this->firstValue($fields, ['slug', 'id']) ?? str($title)->slug()->value();
            $summary = $this->firstValue($fields, ['summary', 'desc', 'description']);
            $image = $this->firstValue($fields, ['thumbnail', 'cover', 'image']);

            $data = $fields;
            $data['pillar'] = $pillarSlug;
            $data['pillar_name'] = $pillarName;
            if (!isset($data['features']) || !is_array($data['features'])) {
                $data['features'] = [];
            }
            if ($pillarSlug === 'website' && isset($websiteDetails[$slug])) {
                $data = array_merge($data, $websiteDetails[$slug]);
            }

            $seededSlugs[] = $slug;

            DB::table('service_items')->updateOrInsert(
                ['slug' => $slug],
                [
                    'title' => $title,
                    'summary' => $summary,
                    'image_url' => $image,
                    'data' => json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    'is_published' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        if (!empty($seededSlugs)) {
            DB::table('service_items')
                ->where('data->pillar', $pillarSlug)
                ->whereNotIn('slug', $seededSlugs)
                ->delete();
        }
    }

    private function seedSoftwareServices(): void
    {
        $softwareServices = [
            [
                'slug' => 'web-application',
                'title' => 'Web Application',
                'summary' => 'Pengembangan web application kustom yang interaktif, scalable, dan modern untuk operasional bisnis serta layanan pelanggan.',
                'image_url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
                'data' => [
                    'name' => 'Web Application',
                    'pillar' => 'software',
                    'pillar_name' => 'Software & Sistem Bisnis',
                    'price' => 'Sesuai Kebutuhan',
                    'price_note' => 'Konsultasi & estimasi gratis',
                    'target' => 'Bisnis & startup digital',
                    'timeline' => '14–30 hari kerja',
                    'features' => [
                        'Custom Frontend & Backend Architecture',
                        'User Authentication & Role-Based Access Control',
                        'Database Design & API Integration',
                        'Dashboard Analytics & Reporting',
                        'Cloud Deployment & High Availability Setup',
                        'Security Auditing & SSL Integration',
                        'Dokumentasi Teknis & Training Admin',
                    ],
                    'highlights' => [
                        ['title' => 'Arsitektur Modern', 'desc' => 'Dibangun dengan teknologi modern yang cepat, aman, dan mudah dikembangkan di masa depan.'],
                        ['title' => 'Scalable & Cloud-Ready', 'desc' => 'Mendukung pertumbuhan pengguna dan transaksi tanpa hambatan performa.'],
                        ['title' => 'UI/UX Responsif', 'desc' => 'Tampilan intuitif yang memudahkan pengguna di desktop, tablet, maupun smartphone.'],
                    ],
                    'included' => [
                        ['title' => 'Arsitektur Kustom', 'desc' => 'Perancangan arsitektur scalable sesuai model bisnis Anda.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                        ['title' => 'Dashboard & Reporting', 'desc' => 'Panel admin untuk memonitor data, pengguna, dan analitik.', 'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'],
                        ['title' => 'Testing & Security', 'desc' => 'Pengujian keamanan, performa beban, dan integrasi SSL.', 'image' => 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80'],
                    ],
                    'faqs' => [
                        ['q' => 'Berapa lama proses pembuatan web application?', 'a' => 'Rata-rata 14–30 hari kerja tergantung kompleksitas fitur dan kesiapan data.'],
                        ['q' => 'Apakah source code menjadi milik klien?', 'a' => 'Ya, seluruh source code dan hak kepemilikan diserahkan penuh kepada klien.'],
                    ],
                ],
                'is_published' => true,
            ],
            [
                'slug' => 'custom-system',
                'title' => 'Custom System',
                'summary' => 'Sistem informasi bisnis, ERP ringan, manajemen inventaris, dan workflow automation yang dirancang spesifik mengikuti proses bisnis Anda.',
                'image_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
                'data' => [
                    'name' => 'Custom System',
                    'pillar' => 'software',
                    'pillar_name' => 'Software & Sistem Bisnis',
                    'price' => 'Sesuai Kebutuhan',
                    'price_note' => 'Konsultasi & estimasi gratis',
                    'target' => 'Perusahaan & UMKM berkembang',
                    'timeline' => '21–45 hari kerja',
                    'features' => [
                        'Sistem Informasi & Workflow Management Custom',
                        'Manajemen Inventaris, Transaksi & Operasional',
                        'Integrasi WhatsApp API & Notifikasi Otomatis',
                        'Multi-Cabang & Multi-Gudang Terpusat',
                        'Audit Trail & Log Aktivitas Pengguna',
                        'Otomasi Export Data (PDF, Excel, CSV)',
                        'Garansi & Dukungan Teknis Purna Jual',
                    ],
                    'highlights' => [
                        ['title' => 'Sesuai Alur Bisnis', 'desc' => 'Sistem mengikuti cara kerja bisnis Anda, bukan memaksa Anda mengikuti template kaku.'],
                        ['title' => 'Otomasi Terintegrasi', 'desc' => 'Mengurangi kesalahan manual dengan notifikasi otomatis dan integrasi WhatsApp.'],
                        ['title' => 'Multi-User & Hak Akses', 'desc' => 'Pengaturan peran admin, manager, dan staf dengan batasan data yang aman.'],
                    ],
                    'included' => [
                        ['title' => 'Modul Kustom Sesuai Kebutuhan', 'desc' => 'Pengembangan modul inventaris, transaksi, atau alur kerja operasional.', 'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'],
                        ['title' => 'Integrasi WhatsApp API', 'desc' => 'Notifikasi real-time ke admin dan pelanggan via WhatsApp.', 'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'],
                        ['title' => 'Export & Reporting', 'desc' => 'Laporan berkala dalam format PDF dan Excel siap cetak.', 'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'],
                    ],
                    'faqs' => [
                        ['q' => 'Apakah bisa dihubungkan dengan WhatsApp?', 'a' => 'Bisa. Sistem dapat mengirimkan notifikasi transaksi, invoice, dan reminder via WhatsApp.'],
                        ['q' => 'Apakah ada garansi purna jual?', 'a' => 'Ya, kami menyediakan garansi pemeliharaan dan perbaikan bug selama masa garansi.'],
                    ],
                ],
                'is_published' => true,
            ],
        ];

        foreach ($softwareServices as $srv) {
            DB::table('service_items')->updateOrInsert(
                ['slug' => $srv['slug']],
                [
                    'title' => $srv['title'],
                    'summary' => $srv['summary'],
                    'image_url' => $srv['image_url'],
                    'data' => json_encode($srv['data'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    'is_published' => $srv['is_published'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }

    private function seedMatches(string $file, string $module, string $pattern): void
    {
        $source = file_get_contents($file);
        if ($source === false) {
            return;
        }

        $count = preg_match_all($pattern, $source, $matches, PREG_SET_ORDER);
        if ($count === false || $count === 0) {
            return;
        }

        foreach ($matches as $match) {
            $slug = $match['slug'] ?? str($match['title'])->slug()->value();
            $data = collect($match)
                ->filter(fn ($value, $key) => is_string($key) && !in_array($key, ['slug', 'title', 'summary'], true))
                ->all();

            DB::table(self::TABLES[$module])->updateOrInsert(
                ['slug' => $slug],
                ['title' => $match['title'], 'summary' => $match['summary'] ?? null, 'image_url' => $match['thumbnail'] ?? $match['image'] ?? $match['cover'] ?? null, 'data' => json_encode($data), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }

    private function seedCollection(string $file, string $export, string $module): void
    {
        $source = file_get_contents($file);
        if ($source === false) {
            return;
        }

        foreach ($this->objectBlocks($source, $export) as $block) {
            $fields = $this->parseObject($block, $this->constants($source));
            $title = $this->firstValue($fields, ['title', 'name', 'nama_asset', 'nama_awam', 'label']);
            if ($title === null) {
                continue;
            }

            $slug = $this->firstValue($fields, ['slug', 'id', 'value']) ?? str($title)->slug()->value();
            $summary = $this->firstValue($fields, ['summary', 'desc', 'description', 'deskripsi', 'fungsi', 'bio']);
            $image = $this->firstValue($fields, ['thumbnail', 'cover', 'image', 'avatar']);

            DB::table(self::TABLES[$module])->updateOrInsert(
                ['slug' => $slug],
                ['title' => $title, 'summary' => $summary, 'image_url' => $image, 'data' => json_encode($fields, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }

    private function seedStringCollection(string $file, string $export, string $module): void
    {
        $source = file_get_contents($file);
        if ($source === false || !preg_match('/export\\s+const\\s+'.preg_quote($export, '/').'\\s*=\\s*\\[(?<values>.*?)\\];/s', $source, $match)) {
            return;
        }

        preg_match_all('/["\'](?<value>[^"\']+)["\']/', $match['values'], $values);
        foreach ($values['value'] as $value) {
            DB::table(self::TABLES[$module])->updateOrInsert(
                ['slug' => str($value)->slug()->value()],
                ['title' => $value, 'summary' => null, 'image_url' => null, 'data' => json_encode(['value' => $value]), 'is_published' => true, 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }

    private function objectBlocks(string $source, string $export): array
    {
        $start = strpos($source, 'export const '.$export);
        if ($start === false || ($arrayStart = strpos($source, '[', $start)) === false) {
            return [];
        }

        $blocks = [];
        $arrayDepth = 0;
        $objectDepth = 0;
        $objectStart = null;
        $quote = null;
        $escaped = false;

        for ($index = $arrayStart, $length = strlen($source); $index < $length; $index++) {
            $character = $source[$index];
            if ($quote !== null) {
                if ($escaped) {
                    $escaped = false;
                } elseif ($character === '\\') {
                    $escaped = true;
                } elseif ($character === $quote) {
                    $quote = null;
                }
                continue;
            }
            if (in_array($character, ['"', "'", '`'], true)) {
                $quote = $character;
                continue;
            }
            if ($character === '[') {
                $arrayDepth++;
            } elseif ($character === ']') {
                if (--$arrayDepth === 0) {
                    break;
                }
            } elseif ($character === '{') {
                if ($arrayDepth === 1 && $objectDepth === 0) {
                    $objectStart = $index;
                }
                $objectDepth++;
            } elseif ($character === '}') {
                $objectDepth--;
                if ($arrayDepth === 1 && $objectDepth === 0 && $objectStart !== null) {
                    $blocks[] = substr($source, $objectStart, $index - $objectStart + 1);
                    $objectStart = null;
                }
            }
        }

        return $blocks;
    }

    private function parseObject(string $block, array $constants): array
    {
        $pattern = '/(?:^|,)\\s*(?<key>[A-Za-z_]\\w*)\\s*:\\s*(?:"(?<double>(?:\\\\\\\\.|[^"])*)"|\'(?<single>(?:\\\\\\\\.|[^\'])*)\'|`(?<template>(?:\\\\\\\\.|[^`])*)`|(?<boolean>true|false)|(?<number>-?\\d+(?:\\.\\d+)?)|\\[(?<array>.*?)\\])\\s*(?=,|\\z)/s';
        preg_match_all($pattern, trim($block, "{} \\t\\r\\n"), $matches, PREG_SET_ORDER | PREG_UNMATCHED_AS_NULL);
        $fields = [];

        foreach ($matches as $match) {
            if ($match['double'] !== null || $match['single'] !== null || $match['template'] !== null) {
                $value = $match['double'] ?? $match['single'] ?? $match['template'];
                $fields[$match['key']] = str_replace(array_keys($constants), array_values($constants), stripcslashes($value));
            } elseif ($match['boolean'] !== null) {
                $fields[$match['key']] = $match['boolean'] === 'true';
            } elseif ($match['number'] !== null) {
                $fields[$match['key']] = str_contains($match['number'], '.') ? (float) $match['number'] : (int) $match['number'];
            } else {
                preg_match_all('/["\'](?<item>[^"\']+)["\']/', $match['array'], $items);
                $fields[$match['key']] = $items['item'];
            }
        }

        return $fields;
    }

    private function constants(string $source): array
    {
        preg_match_all('/const\\s+(?<name>[A-Za-z_]\\w*)\\s*=\\s*["\'](?<value>[^"\']+)["\'];/', $source, $matches, PREG_SET_ORDER);
        $constants = [];
        foreach ($matches as $match) {
            $constants['${'.$match['name'].'}'] = $match['value'];
        }
        return $constants;
    }

    private function firstValue(array $fields, array $keys): ?string
    {
        foreach ($keys as $key) {
            if (isset($fields[$key]) && is_string($fields[$key]) && $fields[$key] !== '') {
                return $fields[$key];
            }
        }

        return null;
    }
}
