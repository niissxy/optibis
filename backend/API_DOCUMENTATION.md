# OPTIBIS.ID — Dokumentasi API (REST API Reference)

Dokumentasi resmi endpoint REST API untuk ekosistem **OPTIBIS.ID**.

> **Keamanan**: Dokumentasi ini tidak memuat kredensial, API key, atau data sensitif. Gunakan variabel lingkungan (`.env`) pada masing-masing environment.

---

## 1. Ikhtisar & Base URL

- **Base URL Lokal**: `http://localhost:8000/api/v1` (atau `/api`)
- **Base URL Production**: `https://api.optibis.id/api/v1`
- **Format Payload**: `application/json` (Kecuali upload file menggunakan `multipart/form-data`)
- **Autentikasi Protected Endpoints**: `Authorization: Bearer <token>`

---

## 2. Autentikasi (Admin Auth)

### `POST /auth/login`
Melakukan autentikasi admin.

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response (200 OK):**
```json
{
  "token": "<generated_bearer_token>",
  "user": {
    "id": 1,
    "name": "Admin Name",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

---

### `GET /auth/me`
Mengambil data profil admin yang sedang login.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Admin Name",
  "email": "user@example.com",
  "role": "admin"
}
```

---

### `POST /auth/logout`
Mencabut token admin aktif.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

---

## 3. Leads & Kontak

### `POST /leads`
Menyimpan formulir kontak, konsultasi, atau download Marketing Kit dari pengunjung situs.

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "nama": "Budi Santoso",
  "email": "budi@perusahaan.com",
  "whatsapp": "081234567890",
  "perusahaan": "PT Solusi Digital",
  "jabatan": "Marketing Manager",
  "kota": "Jakarta",
  "industri": "Retail / F&B",
  "tujuan": "Ingin membuat website toko online modern",
  "asset": "Ebook Social Media Playbook 2026",
  "consent": true
}
```

**Response (201 Created):**
```json
{
  "recorded": true
}
```

---

## 4. Analitik Pengunjung & Dashboard

### `POST /analytics/visits`
Endpoint tracking publik untuk mencatat statistik kunjungan halaman secara anonim.

**Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "visitor_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "path": "/website",
  "referrer": "google.com",
  "device": "desktop"
}
```

**Response (200 OK):**
```json
{
  "status": "success"
}
```

---

### `GET /dashboard-analytics`
Mengambil data metrik performa agregat untuk dashboard admin.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "total_visits": 1250,
  "unique_visitors": 840,
  "total_leads": 42,
  "devices": {
    "desktop": 520,
    "mobile": 320
  },
  "top_referrers": [
    { "referrer": "google.com", "count": 410 },
    { "referrer": "direct", "count": 280 }
  ],
  "top_pages": [
    { "path": "/", "count": 650 },
    { "path": "/website", "count": 220 },
    { "path": "/paket", "count": 180 }
  ]
}
```

---

## 5. Portofolio (`/portfolios`)

### `GET /portfolios`
Mengambil daftar portofolio publik.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "slug": "smart-gps-tracker",
    "name": "Smart GPS Tracker",
    "client": "PT Indo Tracker Solusi",
    "category": "Website Company Profile",
    "description": "Website solusi pelacakan kendaraan dengan live demo.",
    "website_url": "https://example.com",
    "image_url": "https://example.com/storage/portfolio/sample.jpg",
    "data": {},
    "is_published": true
  }
]
```

### `GET /portfolios/{id}`
Mengambil detail portofolio berdasarkan ID atau Slug.

### `POST /portfolios` (Admin)
Membuat data portofolio baru.
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Fields**: `name`, `category`, `description`, `website_url`, `image` (file), `data` (json string), `is_published` (boolean).

### `PUT /portfolios/{id}` (Admin)
Memperbarui data portofolio.

### `DELETE /portfolios/{id}` (Admin)
Menghapus portofolio.

---

## 6. Dynamic Content Modules (`/modules/{module}`)

Sistem menyediakan antarmuka CRUD generik terpadu untuk semua modul konten:

### Daftar Modul yang Didukung:
| Modul | Deskripsi |
|---|---|
| `service-pillars` | 3 Pilar Layanan Utama |
| `services` | Katalog Layanan Detail |
| `packages` | Paket Harga & Fitur |
| `tools` | Direktori Portofolio Tools |
| `solution-library` | Ensiklopedia & Kamus Solusi |
| `solution-library-categories` | Kategori Kamus Solusi |
| `solution-library-explore-categories` | Kategori Eksplorasi Cepat |
| `marketing-kits` | File & Template Download |
| `insights` | Ebook, Pelatihan & Konsultasi |
| `viralog-contents` | Artikel, Berita & Video VIRALOG |
| `viralog-categories` | Kategori VIRALOG |
| `viralog-tags` | Tag VIRALOG |
| `viralog-authors` | Profil Penulis VIRALOG |
| `viralog-ads` | Slot Banner Iklan |
| `viralog-newsletters` | Subscriber Newsletter |
| `evolis-*` | Modul DNA Bisnis, Kampanye, Aset & Pipeline |

### Endpoint Modul:
- `GET /modules/{module}` — Ambil daftar item (Publik)
- `GET /modules/{module}/{id}` — Detail item berdasarkan ID/Slug (Publik)
- `POST /modules/{module}` — Tambah item baru (Membutuhkan Bearer Token)
- `PUT /modules/{module}/{id}` — Update item (Membutuhkan Bearer Token)
- `DELETE /modules/{module}/{id}` — Hapus item (Membutuhkan Bearer Token)

**Contoh Payload Item Modul (`POST` / `PUT`):**
```json
{
  "slug": "sample-item-slug",
  "title": "Judul Konten Modul",
  "summary": "Ringkasan penjelasan konten",
  "image_url": "https://example.com/image.jpg",
  "data": {
    "kategori": "Web Development",
    "fitur": ["Fitur 1", "Fitur 2"]
  },
  "is_published": true
}
```

---

## 7. Manajemen Admin (`/admins`)

*Semua endpoint membutuhkan `Authorization: Bearer <token>`.*

- `GET /admins` — Daftar seluruh user admin
- `POST /admins` — Registrasi admin baru (`name`, `email`, `password`)
- `GET /admins/{id}` — Detail admin
- `PUT /admins/{id}` — Edit admin (`name`, `email`, `password` [opsional])
- `DELETE /admins/{id}` — Hapus akun admin

---

## 8. Kode Status HTTP

- `200 OK`: Permintaan berhasil diproses.
- `201 Created`: Resource baru berhasil dibuat.
- `400 Bad Request`: Format data tidak sesuai.
- `401 Unauthorized`: Token tidak tersedia atau tidak valid.
- `403 Forbidden`: Hak akses tidak mencukupi.
- `404 Not Found`: Resource yang diminta tidak ditemukan.
- `422 Unprocessable Content`: Validasi formulir gagal.
- `500 Internal Server Error`: Kesalahan server internal.
