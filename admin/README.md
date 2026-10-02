# OPTIBIS Admin Dashboard

Dashboard administrasi dan Content Management System (CMS) untuk platform **OPTIBIS.ID**, dibangun dengan React, TypeScript, Vite, Tailwind CSS, dan Lucide Icons.

---

## 🛠️ Fitur Admin Dashboard

1. **Dashboard & Analitik**:
   - Ringkasan total kunjungan website, unique visitors, dan perolehan leads baru.
   - Grafik distribusi perangkat pengunjung (Desktop vs Mobile).
   - Daftar sumber rujukan (*top referrers*) dan halaman paling sering dikunjungi (*top pages*).

2. **Manajemen Portofolio**:
   - Tambah, ubah, dan hapus studi kasus portofolio.
   - Upload gambar thumbnail & galeri portofolio ke backend storage.
   - Atur status publikasi (`is_published`).

3. **Manajemen Konten Modul (Dynamic Modules)**:
   - Manajemen konten Pilar Layanan, Paket Harga, dan Detail Service.
   - Manajemen Ensiklopedia Solution Library & Kategori.
   - Manajemen Tools & Platform Showcase.
   - Manajemen Resource Marketing Kit.
   - Manajemen Konten VIRALOG (Artikel, Kategori, Tag, Author, Slot Iklan, dan Newsletter).

4. **Manajemen Akun Administrator**:
   - Pembuatan akun admin baru dan pengaturan hak akses.

---

## 🚀 Menjalankan Admin Dashboard

1. Masuk ke direktori admin:
   ```bash
   cd admin
   ```

2. Pasang dependensi:
   ```bash
   npm install
   ```

3. Konfigurasi variabel lingkungan:
   Buat file `.env` untuk menentukan endpoint API backend:
   ```env
   # Mode Production:
   VITE_API_URL=https://api.optibis.id/api

   # Mode Lokal (Development):
   VITE_API_URL=http://localhost:8000/api/v1
   ```

4. Jalankan server lokal:
   ```bash
   npm run dev
   ```

5. Build untuk production:
   ```bash
   npm run build
   ```

---

## 🔒 Catatan Keamanan

- Akses ke dashboard admin memerlukan autentikasi login yang valid dari backend.
- Token autentikasi disimpan di `localStorage` klien dengan format Bearer Token dan diverifikasi pada setiap request.
- Jangan simpan kredensial atau password akun di dalam file repositori.
