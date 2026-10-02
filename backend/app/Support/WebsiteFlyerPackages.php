<?php

namespace App\Support;

final class WebsiteFlyerPackages
{
    private const SERVICES = [
        'multi-page' => [
            'title' => 'Pilihan Paket Multi Page',
            'subtitle' => 'Pilih paket Multi Page yang sesuai dengan kebutuhan dan budget bisnis Anda.',
            'flyer' => '/assets/paket-website/multi-page.png',
            'packages' => [
                [
                    'slug' => 'multi-page-standard', 'name' => 'Standard', 'target' => 'Website 5 halaman',
                    'original_price' => 'Rp 3.5JT', 'price' => 'Rp 2.7JT', 'discount' => 'Diskon Rp. 800.000', 'renewal' => 'Perpanjang Rp. 1.5JT / Tahun', 'popular' => false, 'badge' => '',
                    'features' => [
                        ['text' => 'Website 5 Halaman', 'included' => true], ['text' => 'Checkout to WhatsApp', 'included' => true], ['text' => 'Desain Modern & Kekinian', 'included' => true], ['text' => '100% Konten Dari Klien', 'included' => true], ['text' => 'Katalog Produk', 'included' => true], ['text' => 'Mobile Friendly', 'included' => true], ['text' => 'Advance SEO Setup', 'included' => true], ['text' => 'Kecepatan Optimal', 'included' => true], ['text' => 'Include Domain .com / .id', 'included' => true], ['text' => 'Hosting Non Cpanel 1 Tahun', 'included' => true], ['text' => 'Tanpa Akses Edit Sendiri', 'included' => false], ['text' => 'Tanpa E-Mail Bisnis', 'included' => false],
                    ],
                ],
                [
                    'slug' => 'multi-page-olshop-profesional', 'name' => 'Olshop Profesional', 'target' => 'Website 10–15 halaman',
                    'original_price' => 'Rp 8.5JT', 'price' => 'Rp 3.5JT', 'discount' => 'Diskon Rp. 5.000.000', 'renewal' => 'Perpanjang Rp. 1.5JT / Tahun', 'popular' => true, 'badge' => 'PAKET TERLARIS',
                    'features' => [
                        ['text' => 'Website 10–15 Halaman', 'included' => true], ['text' => 'Checkout to WhatsApp', 'included' => true], ['text' => 'Desain Modern & Kekinian', 'included' => true], ['text' => '75% Konten Dari Klien', 'included' => true], ['text' => 'Katalog Produk', 'included' => true], ['text' => 'Mobile Friendly', 'included' => true], ['text' => 'Advance SEO Setup', 'included' => true], ['text' => 'Kecepatan Optimal', 'included' => true], ['text' => 'Bonus E-Mail Bisnis', 'included' => true], ['text' => 'Akses Admin Panel Standar', 'included' => true], ['text' => 'Include Domain .com / .id', 'included' => true], ['text' => 'Hosting Non Cpanel 1 Tahun', 'included' => true],
                    ],
                ],
                [
                    'slug' => 'multi-page-ecommerce-premium', 'name' => 'E-Commerce Premium', 'target' => 'Website 30+ halaman',
                    'original_price' => 'Rp 12.9JT', 'price' => 'Rp 6.9JT', 'discount' => 'Diskon Rp. 5.500.000', 'renewal' => 'Perpanjang Rp. 2.1JT / Tahun', 'popular' => false, 'badge' => '',
                    'features' => [
                        ['text' => 'Website 30+ Halaman', 'included' => true], ['text' => 'Checkout Payment Gateway', 'included' => true], ['text' => '50% Konten Dari Klien', 'included' => true], ['text' => 'Kecepatan Optimal', 'included' => true], ['text' => 'Desain Premium', 'included' => true], ['text' => 'Mobile Friendly', 'included' => true], ['text' => '100% Source Code', 'included' => true], ['text' => 'Advance SEO Setup', 'included' => true], ['text' => 'Bonus E-Mail Bisnis', 'included' => true], ['text' => 'Full Akses Admin Panel', 'included' => true], ['text' => 'Hosting Cpanel 1 Tahun', 'included' => true], ['text' => 'Include Domain .com / .id', 'included' => true],
                    ],
                ],
            ],
        ],
        'toko-online' => [
            'title' => 'Pilihan Paket Toko Online',
            'subtitle' => 'Pilih paket Toko Online yang sesuai dengan kebutuhan dan budget bisnis Anda.',
            'flyer' => '/assets/paket-website/toko-online.png',
            'packages' => [
                [
                    'slug' => 'toko-online-olshop-basic', 'name' => 'Olshop Basic', 'target' => 'Website 5 halaman',
                    'original_price' => 'Rp 3.5JT', 'price' => 'Rp 2.7JT', 'discount' => 'Diskon Rp. 800.000', 'renewal' => 'Perpanjang Rp. 1.5JT / Tahun', 'popular' => false, 'badge' => '',
                    'features' => [
                        ['text' => 'Website 5 Halaman', 'included' => true], ['text' => 'Checkout to WhatsApp', 'included' => true], ['text' => 'Desain Modern & Kekinian', 'included' => true], ['text' => '100% Konten Dari Klien', 'included' => true], ['text' => 'Katalog Produk', 'included' => true], ['text' => 'Mobile Friendly', 'included' => true], ['text' => 'Advance SEO Setup', 'included' => true], ['text' => 'Kecepatan Optimal', 'included' => true], ['text' => 'Include Domain .com / .id', 'included' => true], ['text' => 'Hosting Non Cpanel 1 Tahun', 'included' => true], ['text' => 'Tanpa Akses Edit Sendiri', 'included' => false], ['text' => 'Tanpa E-Mail Bisnis', 'included' => false],
                    ],
                ],
                [
                    'slug' => 'toko-online-olshop-profesional', 'name' => 'Olshop Profesional', 'target' => 'Website 10–15 halaman',
                    'original_price' => 'Rp 8.5JT', 'price' => 'Rp 3.5JT', 'discount' => 'Diskon Rp. 4.600.000', 'renewal' => 'Perpanjang Rp. 2.1JT / Tahun', 'popular' => true, 'badge' => 'PALING POPULER',
                    'features' => [
                        ['text' => 'Website 10–15 Halaman', 'included' => true], ['text' => 'Checkout to WhatsApp', 'included' => true], ['text' => 'Desain Modern & Kekinian', 'included' => true], ['text' => '75% Konten Dari Klien', 'included' => true], ['text' => 'Katalog Produk', 'included' => true], ['text' => 'Mobile Friendly', 'included' => true], ['text' => 'Advance SEO Setup', 'included' => true], ['text' => 'Kecepatan Optimal', 'included' => true], ['text' => 'Akses Admin Panel Standar', 'included' => true], ['text' => 'Include Domain .com / .id', 'included' => true], ['text' => 'Hosting Non Cpanel 1 Tahun', 'included' => true], ['text' => 'Bonus E-Mail Bisnis', 'included' => true], ['text' => 'Payment Gateway', 'included' => false],
                    ],
                ],
                [
                    'slug' => 'toko-online-ecommerce-premium', 'name' => 'E-Commerce Premium', 'target' => 'Website 30+ halaman',
                    'original_price' => 'Rp 12.9JT', 'price' => 'Rp 6.9JT', 'discount' => 'Diskon Rp. 5.500.000', 'renewal' => 'Perpanjang Rp. 3.5JT / Tahun', 'popular' => false, 'badge' => '',
                    'features' => [
                        ['text' => 'Website 30+ Halaman', 'included' => true], ['text' => 'Checkout Payment Gateway', 'included' => true], ['text' => '50% Konten Dari Klien', 'included' => true], ['text' => 'Kecepatan Optimal', 'included' => true], ['text' => 'Desain Premium', 'included' => true], ['text' => 'Mobile Friendly', 'included' => true], ['text' => '100% Source Code', 'included' => true], ['text' => 'Advance SEO Setup', 'included' => true], ['text' => 'Bonus E-Mail Bisnis', 'included' => true], ['text' => 'Full Akses Admin Panel', 'included' => true], ['text' => 'Hosting Cpanel 1 Tahun', 'included' => true], ['text' => 'Include Domain .com / .id', 'included' => true],
                    ],
                ],
            ],
        ],
    ];

    private const ADDONS = [
        ['title' => 'Tambah Halaman', 'price' => 'Rp. 200.000 - 350.000 / Halaman', 'desc' => 'Penambahan halaman baru sesuai kebutuhan konten atau struktur website Anda.'],
        ['title' => 'Pembelian Domain', 'price' => 'Penyesuaian Harga Khusus', 'desc' => 'Biaya tambahan khusus untuk domain tertentu, misalnya (.ai, .io, .net, atau .org).'],
    ];

    public static function services(): array
    {
        return array_keys(self::SERVICES);
    }

    public static function details(string $serviceSlug): array
    {
        $service = self::SERVICES[$serviceSlug] ?? null;
        if ($service === null) {
            return [];
        }

        return [
            'packages' => $service['packages'],
            'packages_title' => $service['title'],
            'packages_subtitle' => $service['subtitle'],
            'package_addons' => self::ADDONS,
        ];
    }

    public static function packages(string $serviceSlug): array
    {
        return self::SERVICES[$serviceSlug]['packages'] ?? [];
    }

    public static function flyer(string $serviceSlug): ?string
    {
        return self::SERVICES[$serviceSlug]['flyer'] ?? null;
    }

    public static function packageData(string $serviceSlug, array $package): array
    {
        return [
            ...$package,
            'title' => $package['name'],
            'service' => $serviceSlug,
            'service_slug' => $serviceSlug,
            'service_name' => $serviceSlug === 'multi-page' ? 'Multi Page' : 'Toko Online',
            'is_service_package' => true,
            'pillar' => 'website',
            'pillar_slug' => 'website',
            'pillar_name' => 'Website',
            'price_short' => $package['price'],
            'price_note' => $package['renewal'],
            'heroImage' => self::flyer($serviceSlug),
            'flyer_image' => self::flyer($serviceSlug),
        ];
    }
}
