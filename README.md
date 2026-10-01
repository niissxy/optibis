# OPTIBIS.ID — Digital Solution Partner Platform

Selamat datang di repositori ekosistem **OPTIBIS.ID**. Platform ini dirancang sebagai solusi digital terintegrasi untuk membantu bisnis tampil profesional, mudah ditemukan, dan bertumbuh secara digital di Indonesia.

---

## 🏗️ Arsitektur Proyek

Repositori ini terdiri dari tiga komponen utama:

```
optibis/
├── frontend/    # Website Publik & Portal Pengguna (React + Vite + Tailwind CSS)
├── admin/       # Dashboard Manajemen CMS & Analitik (React + TypeScript + Vite)
├── backend/     # Layanan REST API & Data Engine (Laravel 11 / PHP)
└── README.md    # Dokumentasi utama proyek
```

---

## 🌟 Fitur Utama Platform

1. **3 Pilar Solusi Bisnis**:
   - **Digital Asset**: Logo, Brand Identity, Stationery, Pitch Deck, dan Channel Setup.
   - **Website**: Pembuatan Website Profesional, Toko Online, Landing Page, dan Custom Growth System.
   - **Digital Growth Team**: Manajemen Konten, Sosial Media, Optimasi SEO, dan Digital Advertising (Meta & Google Ads).

2. **Katalog & Showcase Interaktif**:
   - **Paket Solusi**: Perbandingan fitur paket, estimasi harga, dan konsultasi langsung.
   - **Portofolio Klien**: Studi kasus nyata, galeri proyek, dampak hasil, dan integrasi penampil dokumen.
   - **Solution Library**: Ensiklopedia istilah teknis dan modul software dalam bahasa awam.
   - **Tools Portfolio**: Direktori modul dan aplikasi produktivitas bisnis.
   - **Marketing Kit**: Pusat unduhan template promosi, guideline bisnis, dan lead capture terintegrasi.
   - **Insight & Edukasi**: Ebook, pelatihan, dan program mentoring digital.

3. **VIRALOG Content Intelligence**:
   - Portal tren konten, strategi digital marketing, dan feed aggregator otomatis.
   - Kategori, tag, profil author, slot periklanan, dan pendaftaran newsletter.

4. **Evolis Engine & Workspace**:
   - Framework Business DNA, manajemen audiens, sasaran objektif, kampanye, pipeline leads, dan sistem rekomendasi otomatis.

5. **Arsitektur SEO & Performa**:
   - Dynamic Meta Tags (Title, Description, Canonical URL, OpenGraph, Twitter Cards).
   - Rich Snippets JSON-LD Schema (Organization, WebSite, ProfessionalService, Breadcrumbs, Article, FAQ, DefinedTerm).
   - Generator XML Sitemap otomatis (`public/sitemap.xml`) & `robots.txt`.

6. **Admin CMS & Dashboard**:
   - Manajemen konten portofolio, pilar layanan, paket, tools, dan konten modul lainnya.
   - Analitik kunjungan web anonim & grafik konversi prospek/leads.
   - Manajemen akun administrator.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion, React Router v6, Radix UI.
- **Admin**: React, TypeScript, Vite, Tailwind CSS, TanStack Query, Lucide Icons.
- **Backend**: Laravel 11, PHP 8.2+, SQLite/MySQL, REST API architecture.

---

## 🚀 Panduan Memulai Cepat (Quick Start)

### 1. Prasyarat
- **Node.js**: v18.x atau lebih baru
- **PHP**: v8.2 atau lebih baru
- **Composer**: v2.x atau lebih baru

---

### 2. Menjalankan Backend (Laravel API)

```bash
# Masuk ke folder backend
cd backend

# Pasang dependensi
composer install

# Salin file environment contoh
cp .env.example .env

# Generate application key
php artisan key:generate

# Jalankan migrasi dan seeder
php artisan migrate --seed

# Hubungkan symlink storage
php artisan storage:link

# Jalankan server API (Port 8000)
php artisan serve
```

---

### 3. Menjalankan Frontend (Website Publik)

```bash
# Masuk ke folder frontend
cd frontend

# Pasang dependensi
npm install

# Buat file environment lokal (jika diperlukan)
# VITE_API_URL=http://localhost:8000/api/v1

# Generate sitemap SEO terbaru
npm run sitemap

# Jalankan development server
npm run dev
```

---

### 4. Menjalankan Admin Dashboard

```bash
# Masuk ke folder admin
cd admin

# Pasang dependensi
npm install

# Jalankan development server
npm run dev
```

---

## 📚 Dokumentasi Lebih Lanjut

- 📡 **REST API Specification**: [backend/openapi.yaml](backend/openapi.yaml)
- 📖 **API Endpoints Reference**: [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)
- ⚙️ **Backend Service Guide**: [backend/README.md](backend/README.md)
- 🌐 **Frontend Application Guide**: [frontend/README.md](frontend/README.md)
- 🛡️ **Admin Dashboard Guide**: [admin/README.md](admin/README.md)

---

## 🔒 Kebijakan Keamanan & Kredensial

- Jangan pernah menambahkan file `.env` asli, kredensial database, API key rahasia, atau private key ke dalam sistem kontrol versi (Git).
- Gunakan file `.env.example` sebagai referensi konfigurasi variabel lingkungan yang dibutuhkan.
