# OPTIBIS Frontend Application

Frontend aplikasi web publik dan portal pengguna **OPTIBIS.ID**, dibangun menggunakan React 18, Vite, Tailwind CSS, dan Framer Motion.

---

## 🛠️ Fitur Frontend

1. **Halaman & Navigasi**:
   - Beranda (`/`)
   - 3 Pilar Layanan (`/digital-asset`, `/website`, `/digital-growth-team`, `/pilar/:slug`)
   - Halaman Paket & Layanan Detail (`/paket`, `/layanan`, `/paket/:pillar/:package`, `/layanan/:pillar/:service`)
   - Portofolio & Detail Studi Kasus (`/portofolio`, `/portofolio/:slug`)
   - Direktori Tools (`/tools`)
   - Solution Library (`/solution-library`, `/solution-library/:slug`)
   - Marketing Kit (`/marketing-kit`)
   - Insight Bisnis (`/insight`)
   - Portal Konten VIRALOG (`/content`, `/trending`, `/short-video`, `/video`, `/kategori/:slug`, `/search`)
   - Workspace Klien Evolis (`/app/*`)
   - Halaman Tentang Kami (`/tentang`)

2. **SEO & Performance Suite**:
   - Komponen `<SEO />` dinamis untuk judul, meta deskripsi, Open Graph, dan Twitter Cards.
   - Otomasi Structured Data JSON-LD (Schema.org Organization, WebSite, BreadcrumbList, Service, Article, DefinedTerm).
   - Sitemap XML generator (`scripts/generate-sitemap.js`) yang memetakan seluruh rute publik.
   - PWA Manifest (`site.webmanifest`) dan `robots.txt`.

3. **Visitor Analytics**:
   - Pelacak kunjungan otomatis anonim yang mengirimkan data rute dan perangkat ke backend `/api/v1/analytics/visits`.

4. **Multi-Language Support**:
   - Disediakan `LanguageContext` untuk transisi bahasa Indonesia (ID) dan Inggris (EN).

---

## 📁 Struktur Direktori `frontend/src`

```
src/
├── api/            # Client API helper
├── components/     # UI reusable components & section blocks
│   ├── optibis/    # Komponen halaman umum Optibis (Header, Footer, Hero, Pricing, dll)
│   ├── solution-library/ # Komponen kartu & filter ensiklopedia teknologi
│   ├── marketing-kit/    # Komponen preview & unduhan marketing kit
│   ├── viralog/          # Komponen portal berita & konten video VIRALOG
│   ├── evolis/           # Komponen dashboard workspace Evolis
│   ├── ui/               # Radix UI primitive wrappers
│   └── SEO.jsx           # Komponen dynamic meta & JSON-LD schema
├── data/           # Data master & fallback mock static data
├── hooks/          # React custom hooks (usePackages, usePortfolios, useSEO, dll)
├── lib/            # Utilities, Context (Auth, Language, SEO generator)
├── pages/          # Komponen rute halaman
├── App.jsx         # Router & root layout
└── main.jsx        # Entry point React
```

---

## 🚀 Menjalankan Frontend

1. Install dependensi:
   ```bash
   npm install
   ```

2. Konfigurasi variabel lingkungan (opsional):
   Buat file `.env` jika ingin mengarahkan API URL:
   ```env
   # Mode Production:
   VITE_API_URL=https://api.optibis.id/api

   # Mode Lokal (Development):
   VITE_API_URL=http://localhost:8000/api/v1
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

4. Build untuk production (otomatis menjalankan generator sitemap):
   ```bash
   npm run build
   ```

5. Generate sitemap secara mandiri:
   ```bash
   npm run sitemap
   ```
