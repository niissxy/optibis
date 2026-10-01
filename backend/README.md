# OPTIBIS Backend Service

Backend REST API untuk platform **OPTIBIS.ID**, dibangun menggunakan Laravel 11. Layanan ini mengelola data portofolio, modul konten terintegrasi, manajemen lead, analitik pengunjung, dan administrasi dashboard.

---

## 🛠️ Persyaratan Sistem

- **PHP**: >= 8.2
- **Composer**: >= 2.x
- **Database**: SQLite / MySQL / PostgreSQL
- **Ekstensi PHP yang dibutuhkan**: `pdo`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `curl`

---

## 🚀 Panduan Instalasi & Menjalankan Backend

1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```

2. Pasang dependensi PHP:
   ```bash
   composer install
   ```

3. Buat file konfigurasi `.env`:
   ```bash
   cp .env.example .env
   ```

4. Generate Application Key:
   ```bash
   php artisan key:generate
   ```

5. Konfigurasi database pada file `.env` (misal SQLite):
   ```env
   DB_CONNECTION=sqlite
   ```
   *(Jika menggunakan SQLite, pastikan file `database/database.sqlite` telah dibuat jika belum ada)*

6. Jalankan migrasi dan seeder awal:
   ```bash
   php artisan migrate --seed
   ```

7. Hubungkan storage publik (untuk upload file media):
   ```bash
   php artisan storage:link
   ```

8. Jalankan server pengembangan lokal:
   ```bash
   php artisan serve
   ```
   Server default berjalan di `http://127.0.0.1:8000`.

---

## 📂 Struktur Direktori Utama

```
backend/
├── app/
│   ├── Console/Commands/       # Custom artisan command (e.g. ImportViralogRss)
│   ├── Http/
│   │   ├── Controllers/        # API Controllers (Auth, Portfolio, ModuleContent, Analytics)
│   │   └── Middleware/         # Token Auth & CORS Middleware
│   └── Models/                 # Eloquent Models (Admin, Portfolio, etc.)
├── config/                     # Konfigurasi aplikasi, auth, cors, database
├── database/
│   ├── migrations/             # Database schema migrations
│   └── seeders/                # Initial database seeders
├── routes/
│   └── api.php                 # Rute REST API v1
├── storage/                    # Uploads, log file, dan cache
├── openapi.yaml                # Spesifikasi OpenAPI 3.0.3
├── API_DOCUMENTATION.md        # Panduan teknis endpoint API
└── README.md                   # Dokumentasi backend ini
```

---

## ⚙️ Artisan Commands Khusus

### 1. Import RSS Feed VIRALOG
Digunakan untuk mengimpor dan menyinkronkan feed konten digital/teknologi ke dalam database VIRALOG:
```bash
php artisan viralog:import-rss
```

---

## 📖 Dokumentasi Endpoint API

Dokumentasi lengkap mengenai struktur payload, header, dan response code dapat dibaca di:
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- [openapi.yaml](./openapi.yaml)
