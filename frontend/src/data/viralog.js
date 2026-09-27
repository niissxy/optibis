// VIRALOG Engine — Central Data Module
// Content Intelligence Portal data for Optibis

export const VIRALOG_CATEGORIES = [
  { slug: "branding", name: "Branding", color: "magenta", icon: "Palette" },
  { slug: "website", name: "Website", color: "navy", icon: "Globe" },
  { slug: "digital-marketing", name: "Digital Marketing", color: "amethyst", icon: "TrendingUp" },
  { slug: "social-media", name: "Social Media", color: "magenta", icon: "Users" },
  { slug: "seo", name: "SEO", color: "navy", icon: "Search" },
  { slug: "content-strategy", name: "Content Strategy", color: "amethyst", icon: "FileText" },
  { slug: "bisnis-digital", name: "Bisnis Digital", color: "magenta", icon: "Briefcase" },
  { slug: "startup", name: "Startup", color: "navy", icon: "Rocket" },
];

export const VIRALOG_AUTHORS = [
  { slug: "tim-optibis", name: "Tim Optibis", role: "staff", bio: "Tim editorial Optibis yang berdedikasi menghadirkan insight digital terbaik untuk bisnis Indonesia.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
  { slug: "rendi-pratama", name: "Rendi Pratama", role: "editor", bio: "Digital Strategist dengan 8 tahun pengalaman membantu UMKM tumbuh secara digital.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
  { slug: "sarah-anjani", name: "Sarah Anjani", role: "contributor", bio: "Content Writer & SEO Specialist yang fokus pada strategi konten berbasis data.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
  { slug: "evolis-ai", name: "EVOLIS AI", role: "ai_agent", bio: "AI Agent yang membantu riset tren, discovery konten, dan auto-summarization.", avatar: "" },
];

export const VIRALOG_TAGS = [
  "Branding UMKM", "Website Cepat", "SEO 2026", "Instagram Reels", "Google Ads",
  "Landing Page", "Content Calendar", "TikTok Marketing", "Lead Generation", "Conversion Rate",
  "Digital Strategy", "Local SEO", "Social Proof", "Email Marketing", "Google Business Profile",
];

const U = "https://images.unsplash.com/photo-";

export const VIRALOG_CONTENT = [
  {
    id: "vlog-001",
    title: "5 Strategi Branding yang Membuat UMKM Naik Kelas di 2026",
    slug: "5-strategi-branding-umkm-2026",
    subtitle: "Dari logo sekadar logo menjadi identitas yang menghasilkan kepercayaan dan penjualan",
    summary: "Branding bukan hanya soal logo. Pelajari 5 strategi konkret yang membantu UMKM Indonesia bersaing di level berikutnya.",
    body: `## Mengapa Branding UMKM Sering Tertinggal

Banyak UMKM menganggap branding adalah hal mewah yang hanya untuk perusahaan besar. Padahal, branding adalah fondasi yang menentukan apakah bisnis Anda dipersepsi profesional atau sekadar usaha pinggir jalan.

## 1. Konsistensi Visual di Semua Titik Kontak

Logo, warna, dan tipografi harus konsisten dari kartu nama hingga profil Instagram. Inkonsistensi menciptakan kebingungan dan menurunkan kepercayaan.

## 2. Positioning yang Jelas

Jangan mencoba menjadi segalanya untuk semua orang. Tentukan satu keunggulan utama yang membuat Anda berbeda dari kompetitor.

## 3. Storytelling yang Relatable

Orang membeli cerita, bukan hanya produk. Bagikan perjalanan, nilai, dan misi bisnis Anda secara otentik.

## 4. Social Proof yang Aktif

Testimoni, review, dan portfolio adalah bukti sosial yang membentuk kepercayaan. Pastikan selalu diperbarui.

## 5. Sistem Brand Assets yang Terstruktur

Miliki brand kit lengkap: logo variations, color palette, typography guide, dan template konten. Ini membuat setiap materi terlihat profesional tanpa effort berulang.`,
    thumbnail: `${U}1556761175-4b46a572b786?w=800&h=500&fit=crop`,
    content_type: "article",
    source_type: "internal",
    category_slug: "branding",
    tags: ["Branding UMKM", "Digital Strategy", "Social Proof"],
    author_name: "Rendi Pratama",
    author_slug: "rendi-pratama",
    status: "published",
    publish_date: "2026-07-10",
    featured: true,
    sponsored: false,
    cta_type: "consultation",
    cta_label: "Konsultasi Branding",
    cta_url: "#konsultasi",
    read_time_minutes: 5,
    views: 3420,
    shares: 89,
    bookmarks: 156,
    viral_score: 78,
    seo_score: 85,
    engagement_score: 72,
    freshness_score: 95,
    credibility_score: 90,
    monetization_score: 60,
  },
  {
    id: "vlog-002",
    title: "Cara Membuat Landing Page yang Konversi 3x Lebih Tinggi",
    slug: "landing-page-konversi-3x",
    subtitle: "Anatomi landing page yang membuat visitor tidak bisa menahan klik tombol CTA",
    summary: "Struktur, copywriting, dan desain — semua harus bekerja bersama. Inilah formula yang terbukti.",
    body: `## Anatomy of a High-Converting Landing Page

Landing page yang baik bukan tentang estetika semata. Ia adalah mesin konversi yang setiap elemen punya tujuan.

### Above the Fold
- Headline jelas dan benefit-driven
- Sub-headline yang menjelaskan value proposition
- CTA yang kontras dan mudah ditemukan
- Trust indicator (logo klien, rating)

### Social Proof Section
Testimoni dengan foto nyata, bukan teks generik. Angka konkret lebih kuat dari klaim vage.

### Benefit vs Feature
Jangan menjual fitur. Jual hasil dan transformasi yang customer akan dapatkan.

### CTA Strategy
Satu halaman, satu fokus. Jangan beri terlalu banyak pilihan yang membuat visitor bingung.`,
    thumbnail: `${U}1460925895917-afdab827c52f?w=800&h=500&fit=crop`,
    content_type: "article",
    source_type: "internal",
    category_slug: "website",
    tags: ["Landing Page", "Conversion Rate", "Website Cepat"],
    author_name: "Sarah Anjani",
    author_slug: "sarah-anjani",
    status: "published",
    publish_date: "2026-07-09",
    featured: true,
    sponsored: false,
    cta_type: "whatsapp",
    cta_label: "Chat WhatsApp",
    cta_url: "https://wa.me/6287772577020",
    read_time_minutes: 7,
    views: 2890,
    shares: 134,
    bookmarks: 201,
    viral_score: 82,
    seo_score: 88,
    engagement_score: 79,
    freshness_score: 90,
    credibility_score: 85,
    monetization_score: 75,
  },
  {
    id: "vlog-003",
    title: "Tren Digital Marketing Indonesia 2026: Apa yang Harus Dipersiapkan?",
    slug: "tren-digital-marketing-indonesia-2026",
    subtitle: "AI, video pendek, dan personalisasi — tiga pilar yang akan mendominasi",
    summary: "2026 menjadi tahun di mana AI tidak lagi pilihan, melainkan keharusan. Begini cara mempersiapkannya.",
    body: `## Tiga Tren Utama 2026

### 1. AI-Driven Personalization
AI tidak lagi sekadar chatbot. Ia menjadi engine yang mempersonalisasi setiap interaksi customer.

### 2. Video Pendek Dominan
TikTok, Reels, YouTube Shorts — format pendek terus mendominasi. Bisnis yang tidak adaptasi akan tertinggal.

### 3. Search Intent Evolution
Google semakin pintar memahami intent. SEO bukan lagi keyword stuffing, tapi konten yang benar-benar menjawab pertanyaan.`,
    thumbnail: `${U}1460925895917-afdab827c52f?w=800&h=500&fit=crop`,
    content_type: "news",
    source_type: "internal",
    category_slug: "digital-marketing",
    tags: ["Digital Strategy", "SEO 2026", "Conversion Rate"],
    author_name: "Tim Optibis",
    author_slug: "tim-optibis",
    status: "published",
    publish_date: "2026-07-08",
    featured: true,
    sponsored: false,
    cta_type: "consultation",
    cta_label: "Konsultasi Strategi",
    cta_url: "#konsultasi",
    read_time_minutes: 6,
    views: 4100,
    shares: 178,
    bookmarks: 98,
    viral_score: 91,
    seo_score: 82,
    engagement_score: 85,
    freshness_score: 98,
    credibility_score: 80,
    monetization_score: 70,
  },
  {
    id: "vlog-004",
    title: "Formula Reels yang Viral untuk Bisnis Lokal",
    slug: "formula-reels-viral-bisnis-lokal",
    subtitle: "3 detik pertama menentukan segalanya",
    summary: "Tidak perlu ribuan follower. Dengan formula ini, Reels Anda bisa menjangkau ribuan calon klien.",
    body: `## Formula 3-2-1 untuk Reels

**3 detik pertama**: Hook yang memicu rasa ingin tahu
**2 detik kedua**: Konteks dan nilai
**1 detik terakhir**: CTA yang jelas

Masalah bisnis lokal: mereka membuat konten yang "aman" dan membosankan. Viral itu tentang emosi, bukan kesempurnaan.`,
    thumbnail: `${U}1611162616475-46b635cb6868?w=800&h=500&fit=crop`,
    content_type: "short_video",
    source_type: "video_embed",
    category_slug: "social-media",
    tags: ["Instagram Reels", "TikTok Marketing", "Social Proof"],
    author_name: "Sarah Anjani",
    author_slug: "sarah-anjani",
    status: "published",
    publish_date: "2026-07-07",
    featured: false,
    sponsored: false,
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    embed_platform: "youtube_shorts",
    cta_type: "whatsapp",
    cta_label: "Chat WhatsApp",
    cta_url: "https://wa.me/6287772577020",
    read_time_minutes: 2,
    views: 8200,
    shares: 412,
    bookmarks: 67,
    viral_score: 95,
    seo_score: 65,
    engagement_score: 92,
    freshness_score: 88,
    credibility_score: 70,
    monetization_score: 55,
  },
  {
    id: "vlog-005",
    title: "SEO Lokal: Panduan Lengkap untuk Bisnis Indonesia",
    slug: "seo-lokal-panduan-lengkap",
    subtitle: "Dominasi pencarian Google di area bisnis Anda",
    summary: "Google Business Profile, review, dan konten lokal — tiga pilar SEO yang paling sering diabaikan UMKM.",
    body: `## Apa Itu SEO Lokal?

SEO lokal adalah optimasi agar bisnis Anda muncul di hasil pencarian Google ketika seseorang mencari dengan kata kunci lokasi.

## Google Business Profile

Ini adalah fondasi SEO lokal. Pastikan:
- Nama, alamat, nomor telepon konsisten
- Foto bisnis lengkap
- Kategori yang tepat
- Update rutin

## Review Lokal

Review Google adalah sinyal ranking terkuat untuk SEO lokal. Minta setiap klien puas untuk memberikan review.

## Konten Berbasis Lokal

Tulis artikel tentang industri Anda + nama kota. "Bengkel mobil terbaik di Bandung" lebih mudah diranking daripada "bengkel mobil terbaik".`,
    thumbnail: `${U}1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop`,
    content_type: "tutorial",
    source_type: "internal",
    category_slug: "seo",
    tags: ["Local SEO", "SEO 2026", "Google Business Profile"],
    author_name: "Rendi Pratama",
    author_slug: "rendi-pratama",
    status: "published",
    publish_date: "2026-07-06",
    featured: false,
    sponsored: false,
    cta_type: "consultation",
    cta_label: "Audit SEO Gratis",
    cta_url: "#konsultasi",
    read_time_minutes: 8,
    views: 1950,
    shares: 56,
    bookmarks: 234,
    viral_score: 45,
    seo_score: 92,
    engagement_score: 68,
    freshness_score: 85,
    credibility_score: 95,
    monetization_score: 80,
  },
  {
    id: "vlog-006",
    title: "Startup Story: Dari 0 ke 10K Followers dalam 90 Hari",
    slug: "startup-story-0-ke-10k-followers",
    subtitle: "Case study nyata strategi content growth yang bekerja",
    summary: "Tanpa iklan, tanpa influencer. Begini cara sebuah startup SaaS Indonesia membangun audiens organik.",
    body: `## Background

Sebuah startup SaaS B2B Indonesia datang ke Optibis dengan 0 follower dan 0 traffic. Dalam 90 hari, mereka mencapai 10K followers dan 15K monthly visitors.

## Strategi

### Bulan 1: Foundation
- Brand identity lengkap
- Website dengan struktur SEO
- Content calendar 3x/minggu

### Bulan 2: Distribution
- LinkedIn articles untuk B2B
- Twitter thread untuk developer
- Guest posting di media tech

### Bulan 3: Amplification
- Video pendek di setiap channel
- Community building
- Partnership dengan komunitas

## Hasil

- 10,200 followers LinkedIn
- 15,300 monthly visitors
- 230 qualified leads
- 18 konversi ke trial`,
    thumbnail: `${U}1559136555-2139a4d6b88d?w=800&h=500&fit=crop`,
    content_type: "case_study",
    source_type: "internal",
    category_slug: "startup",
    tags: ["Digital Strategy", "Content Calendar", "Lead Generation"],
    author_name: "Tim Optibis",
    author_slug: "tim-optibis",
    status: "published",
    publish_date: "2026-07-05",
    featured: false,
    sponsored: false,
    cta_type: "consultation",
    cta_label: "Mulai Seperti Ini",
    cta_url: "#konsultasi",
    read_time_minutes: 9,
    views: 3200,
    shares: 145,
    bookmarks: 189,
    viral_score: 72,
    seo_score: 78,
    engagement_score: 81,
    freshness_score: 80,
    credibility_score: 88,
    monetization_score: 90,
  },
  {
    id: "vlog-007",
    title: "Tim Digital vs Freelancer: Mana yang Lebih Hemat?",
    slug: "tim-digital-vs-freelancer",
    subtitle: "Hitungan real biaya dan produktivitas",
    summary: "Banyak bisnis masih ragu antara merekrut tim internal, pakai freelancer, atau outsourced team. Inilah perbandingannya.",
    body: `## Perbandingan Biaya

**Freelancer**: Rp 3-8 juta/bulan per orang, kualitas tidak konsisten
**Tim Internal**: Rp 8-15 juta/bulan per orang, plus benefit dan training
**Outsourced Team**: Rp 5-12 juta/bulan untuk tim lengkap, hasil terukur

## Produktivitas

Freelancer sering mengelola banyak klien sekaligus. Tim outsourced fokus 100% pada bisnis Anda dengan SLA yang jelas.`,
    thumbnail: `${U}1522071820081-009f0129c71c?w=800&h=500&fit=crop`,
    content_type: "podcast",
    source_type: "internal",
    category_slug: "bisnis-digital",
    tags: ["Digital Strategy", "Lead Generation"],
    author_name: "Rendi Pratama",
    author_slug: "rendi-pratama",
    status: "published",
    publish_date: "2026-07-04",
    featured: false,
    sponsored: false,
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    embed_platform: "youtube",
    cta_type: "consultation",
    cta_label: "Konsultasi Tim Digital",
    cta_url: "#konsultasi",
    read_time_minutes: 3,
    views: 1650,
    shares: 78,
    bookmarks: 112,
    viral_score: 55,
    seo_score: 70,
    engagement_score: 74,
    freshness_score: 75,
    credibility_score: 85,
    monetization_score: 88,
  },
  {
    id: "vlog-008",
    title: "Kenapa Website Cepat = Lebih Banyak Klien",
    slug: "website-cepat-lebih-banyak-klien",
    subtitle: "1 detik loading time bisa cost Anda jutaan",
    summary: "Google dan user sama-sama membenci website lambat. Inilah dampak nyata speed terhadap bisnis Anda.",
    body: `## Statistik yang Membuka Mata

- 53% pengunjung meninggalkan website yang loading lebih dari 3 detik
- 1 detik penundaan = 7% penurunan konversi
- Google menggunakan Core Web Vitals sebagai ranking factor

## Cara Mempercepat

1. Optimasi gambar (WebP/AVIF)
2. Lazy loading untuk media
3. Minify CSS/JS
4. CDN untuk global delivery
5. Hosting yang tepat

## Dampak Bisnis

Salah satu klien kami meningkatkan konversi 32% hanya dengan mempercepat loading time dari 5 detik ke 2 detik.`,
    thumbnail: `${U}1467232004584-a251de890e01?w=800&h=500&fit=crop`,
    content_type: "blog",
    source_type: "internal",
    category_slug: "website",
    tags: ["Website Cepat", "Conversion Rate", "Landing Page"],
    author_name: "Tim Optibis",
    author_slug: "tim-optibis",
    status: "published",
    publish_date: "2026-07-03",
    featured: false,
    sponsored: false,
    cta_type: "whatsapp",
    cta_label: "Cek Website Saya",
    cta_url: "https://wa.me/6287772577020",
    read_time_minutes: 4,
    views: 2780,
    shares: 92,
    bookmarks: 143,
    viral_score: 68,
    seo_score: 84,
    engagement_score: 71,
    freshness_score: 82,
    credibility_score: 87,
    monetization_score: 72,
  },
  {
    id: "vlog-009",
    title: "Content Strategy Framework: Dari Ide ke Publikasi",
    slug: "content-strategy-framework",
    subtitle: "Sistem yang membuat konten tidak pernah habis",
    summary: "Tidak punya ide konten lagi? Framework ini memastikan Anda selalu punya 30 hari konten ke depan.",
    body: `## Framework 4-3-2-1

**4 Pilar Konten**: Edukasi, Inspirasi, Behind-the-scenes, Promosi
**3 Format**: Artikel, Video pendek, Infografis
**2 Channel Utama**: Website/Blog, Media Sosial
**1 Goal**: Setiap konten harus mengarah ke satu CTA

## Topic Cluster

Pilih 3-5 topik utama (pillar). Setiap topik punya 1 cornerstone article + 10-15 sub-topik yang saling terhubung.

## Content Calendar

Jangan buat konten spontan. Rencanakan 30 hari ke depan dengan template:
- Senin: Edukasi
- Rabu: Inspirasi/case study
- Jumat: Behind-the-scenes
- Minggu: Promosi/CTA`,
    thumbnail: `${U}1454165804606-c3d57bc86b42?w=800&h=500&fit=crop`,
    content_type: "article",
    source_type: "internal",
    category_slug: "content-strategy",
    tags: ["Content Calendar", "Content Strategy", "Digital Strategy"],
    author_name: "Sarah Anjani",
    author_slug: "sarah-anjani",
    status: "published",
    publish_date: "2026-07-02",
    featured: false,
    sponsored: false,
    cta_type: "consultation",
    cta_label: "Buat Strategy Saya",
    cta_url: "#konsultasi",
    read_time_minutes: 6,
    views: 2100,
    shares: 67,
    bookmarks: 198,
    viral_score: 48,
    seo_score: 86,
    engagement_score: 75,
    freshness_score: 78,
    credibility_score: 82,
    monetization_score: 65,
  },
  {
    id: "vlog-010",
    title: "Sponsored: Solusi All-in-One untuk Digitalisasi Bisnis",
    slug: "sponsored-solusi-digitalisasi-all-in-one",
    subtitle: "Satu partner untuk branding, website, dan tim digital",
    summary: "Berhenti mengkoordinasikan 5 vendor berbeda. Kenapa Total Solution dari Optibis lebih efisien.",
    body: `## Masalah Multi-Vendor

Banyak bisnis mengelola branding agency, web developer, social media manager, dan SEO consultant secara terpisah. Hasilnya? Komunikasi yang berantakan, brand inconsistency, dan biaya yang membengkak.

## Solusi Total Solution

Satu partner yang mengelola semua pilar digital:
- Brand identity yang konsisten
- Website yang terintegrasi
- Tim digital bulanan
- SEMUA dalam satu strategi terpadu`,
    thumbnail: `${U}1556761175-b4c21d4a0e1d?w=800&h=500&fit=crop`,
    content_type: "sponsored_content",
    source_type: "sponsored",
    category_slug: "bisnis-digital",
    tags: ["Digital Strategy", "Lead Generation"],
    author_name: "Tim Optibis",
    author_slug: "tim-optibis",
    status: "published",
    publish_date: "2026-07-01",
    featured: false,
    sponsored: true,
    sponsor_name: "Optibis",
    cta_type: "consultation",
    cta_label: "Konsultasi Total Solution",
    cta_url: "#konsultasi",
    read_time_minutes: 3,
    views: 980,
    shares: 23,
    bookmarks: 45,
    viral_score: 35,
    seo_score: 60,
    engagement_score: 50,
    freshness_score: 70,
    credibility_score: 75,
    monetization_score: 95,
  },
  {
    id: "vlog-011",
    title: "Google Business Profile Optimization Guide 2026",
    slug: "google-business-profile-optimization-2026",
    subtitle: "Checklist lengkap untuk max visibility di Google Maps",
    summary: "Google Business Profile adalah aset digital gratis paling undervalued untuk bisnis lokal. Begini cara maksimalkannya.",
    body: `## Checklist Optimasi GBP

1. Verifikasi kepemilikan bisnis
2. Lengkapi semua informasi (jam buka, telepon, website)
3. Upload minimal 10 foto (tampak depan, interior, produk, tim)
4. Pilih kategori utama yang spesifik
5. Tulis deskripsi dengan kata kunci natural
6. Aktifkan messaging
7. Posting update rutin (minimum 1x/minggu)
8. Minta review dari customer puas
9. Balas semua review (positif dan negatif)
10. Pantau insights secara berkala`,
    thumbnail: `${U}1573804630-7c54eb325b19?w=800&h=500&fit=crop`,
    content_type: "tutorial",
    source_type: "internal",
    category_slug: "seo",
    tags: ["Google Business Profile", "Local SEO", "SEO 2026"],
    author_name: "Rendi Pratama",
    author_slug: "rendi-pratama",
    status: "published",
    publish_date: "2026-06-30",
    featured: false,
    sponsored: false,
    cta_type: "whatsapp",
    cta_label: "Audit GBP Saya",
    cta_url: "https://wa.me/6287772577020",
    read_time_minutes: 5,
    views: 1540,
    shares: 41,
    bookmarks: 167,
    viral_score: 38,
    seo_score: 90,
    engagement_score: 62,
    freshness_score: 72,
    credibility_score: 92,
    monetization_score: 70,
  },
  {
    id: "vlog-012",
    title: "Meta Ads Update 2026: Apa yang Berubah dan Bagaimana Adaptasi",
    slug: "meta-ads-update-2026",
    subtitle: "Advantage+, AI targeting, dan perubahan privacy",
    summary: "Meta terus mengubah algoritma iklan. Inilah yang harus Anda ketahui untuk tetap profitable di 2026.",
    body: `## Apa yang Baru di Meta Ads 2026

### Advantage+ Shopping Campaign
AI Meta semakin agresif. Campaign yang menggunakan Advantage+ menunjukkan ROAS 15-20% lebih tinggi.

### Privacy-First Targeting
Dengan perubahan privacy Apple dan regulasi data, targeting berbasis interest semakin terbatas. Lookalike audience dan creative quality menjadi kunci.

### Video Creative Dominance
Video pendek outperform image ads di hampir semua industri. Creative = targeting di era baru ini.`,
    thumbnail: `${U}1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop`,
    content_type: "news",
    source_type: "internal",
    category_slug: "digital-marketing",
    tags: ["Google Ads", "Digital Strategy", "Conversion Rate"],
    author_name: "Tim Optibis",
    author_slug: "tim-optibis",
    status: "published",
    publish_date: "2026-06-29",
    featured: false,
    sponsored: false,
    cta_type: "consultation",
    cta_label: "Optimasi Ads Saya",
    cta_url: "#konsultasi",
    read_time_minutes: 6,
    views: 3650,
    shares: 112,
    bookmarks: 89,
    viral_score: 74,
    seo_score: 76,
    engagement_score: 78,
    freshness_score: 88,
    credibility_score: 82,
    monetization_score: 85,
  },
  {
    id: "vlog-013",
    title: "Membangun Personal Branding untuk Entrepreneur",
    slug: "personal-branding-entrepreneur",
    subtitle: "CEO yang visible = perusahaan yang dipercaya",
    summary: "Personal branding bukan narsis. Ia adalah strategi bisnis yang membuka pintu yang tidak bisa dibuka iklan.",
    body: `## Kenapa Personal Branding Penting

92% konsumen lebih percaya pada individu daripada brand. CEO yang visible menciptakan trust yang langsung berdampak pada revenue.

## Framework Personal Branding

1. **Niche**: Pilih satu area expertise
2. **Voice**: Tentukan tone yang konsisten
3. **Platform**: Pilih 1-2 channel utama, bukan semua
4. **Cadence**: Konsistensi > Kesempurnaan
5. **Community**: Bangun, jangan hanya broadcast

## Content Pillars

Setiap entrepreneur harus punya 3-4 content pillars:
- Industry insights
- Personal journey
- Leadership lessons
- Behind-the-scenes`,
    thumbnail: `${U}1573496359142-bc2d4a3e9d2f?w=800&h=500&fit=crop`,
    content_type: "article",
    source_type: "internal",
    category_slug: "content-strategy",
    tags: ["Branding UMKM", "Content Calendar", "Social Proof"],
    author_name: "Sarah Anjani",
    author_slug: "sarah-anjani",
    status: "published",
    publish_date: "2026-06-28",
    featured: false,
    sponsored: false,
    cta_type: "consultation",
    cta_label: "Bangun Branding Saya",
    cta_url: "#konsultasi",
    read_time_minutes: 7,
    views: 2450,
    shares: 103,
    bookmarks: 178,
    viral_score: 65,
    seo_score: 80,
    engagement_score: 76,
    freshness_score: 70,
    credibility_score: 84,
    monetization_score: 68,
  },
  {
    id: "vlog-014",
    title: "Bisnis Go Digital Checklist 2026",
    slug: "bisnis-go-digital-checklist-2026",
    subtitle: "30 langkah dari offline ke digital-ready",
    summary: "Lengkap, actionable, dan bisa diceklis satu per satu. Mulai digitalisasi bisnis Anda hari ini.",
    body: `## Fase 1: Foundation (Hari 1-7)
- [ ] Daftarkan nama bisnis
- [ ] Buat logo dan brand kit
- [ ] Beli domain
- [ ] Setup email bisnis
- [ ] Buat Google Business Profile

## Fase 2: Presence (Hari 8-14)
- [ ] Landing page sederhana
- [ ] Instagram & Facebook bisnis
- [ ] WhatsApp Business
- [ ] Konsisten posting 3x/minggu

## Fase 3: Growth (Hari 15-30)
- [ ] Website lengkap
- [ ] Setup Google Analytics
- [ ] Mulai SEO dasar
- [ ] Test Meta Ads dengan budget kecil
- [ ] Sistem capture lead

## Fase 4: Scale (Bulan 2+)
- [ ] Tim digital bulanan
- [ ] Content strategy terstruktur
- [ ] CRM dan pipeline
- [ ] Automation`,
    thumbnail: `${U}1556761175-4b46a572b786?w=800&h=500&fit=crop`,
    content_type: "report",
    source_type: "internal",
    category_slug: "bisnis-digital",
    tags: ["Digital Strategy", "Lead Generation", "Content Calendar"],
    author_name: "Tim Optibis",
    author_slug: "tim-optibis",
    status: "published",
    publish_date: "2026-06-27",
    featured: false,
    sponsored: false,
    cta_type: "consultation",
    cta_label: "Mulai Digitalisasi",
    cta_url: "#konsultasi",
    read_time_minutes: 10,
    views: 5200,
    shares: 287,
    bookmarks: 412,
    viral_score: 85,
    seo_score: 88,
    engagement_score: 82,
    freshness_score: 68,
    credibility_score: 90,
    monetization_score: 92,
  },
  {
    id: "vlog-015",
    title: "Kenapa Brand Consistency Itu Penting",
    slug: "kenapa-brand-consistency-penting",
    subtitle: "Konsistensi meningkatkan revenue sampai 23%",
    summary: "Brand yang konsisten di semua titik kontak tidak hanya terlihat profesional — ia menghasilkan uang.",
    body: `## Statistik Brand Consistency

Penelitian menunjukkan brand consistency dapat meningkatkan revenue hingga 23%. Tapi konsistensi bukan sekadar "pakai warna yang sama."

## Tiga Level Konsistensi

### Visual
Logo, warna, tipografi, photography style

### Voice
Tone, pilihan kata, cara bercerita

### Experience
Bagaimana customer diperlakukan, respons time, quality

## Tantangan Utama

Konsistensi rusak ketika bisnis tumbuh dan semakin banyak orang terlibat. Solusinya: brand guidelines yang terdokumentasi dan sistem yang scalable.`,
    thumbnail: `${U}1626785777674-23ea63060c1e?w=800&h=500&fit=crop`,
    content_type: "article",
    source_type: "internal",
    category_slug: "branding",
    tags: ["Branding UMKM", "Social Proof", "Digital Strategy"],
    author_name: "Rendi Pratama",
    author_slug: "rendi-pratama",
    status: "published",
    publish_date: "2026-06-26",
    featured: false,
    sponsored: false,
    cta_type: "consultation",
    cta_label: "Audit Brand Saya",
    cta_url: "#konsultasi",
    read_time_minutes: 5,
    views: 1850,
    shares: 54,
    bookmarks: 121,
    viral_score: 52,
    seo_score: 83,
    engagement_score: 69,
    freshness_score: 65,
    credibility_score: 88,
    monetization_score: 73,
  },
  {
    id: "vlog-016",
    title: "TikTok untuk Bisnis: Bukan Sekadar Dancing",
    slug: "tiktok-untuk-bisnis-bukan-sekadar-dancing",
    subtitle: "TikTok B2B dan B2C punya strategi berbeda",
    summary: "Banyak bisnis mengira TikTok hanya untuk dance challenge. Faktanya, TikTok adalah search engine untuk Gen Z.",
    body: `## TikTok sebagai Search Engine

40% Gen Z menggunakan TikTok sebagai mesin pencari utama. Jika bisnis Anda tidak ada di TikTok, Anda hilang dari satu generasi penuh.

## Tipe Konten yang Work

- Educational tips (hook + value + CTA)
- Behind-the-scenes bisnis
- Day in the life
- Transformasi/customer journey
- Myth busting di industri Anda

## Format

15-30 detik untuk reach
30-60 detik untuk engagement
60+ detik untuk depth/authority`,
    thumbnail: `${U}1611162616475-46b635cb6868?w=800&h=500&fit=crop`,
    content_type: "short_video",
    source_type: "video_embed",
    category_slug: "social-media",
    tags: ["TikTok Marketing", "Instagram Reels", "Social Proof"],
    author_name: "Sarah Anjani",
    author_slug: "sarah-anjani",
    status: "published",
    publish_date: "2026-06-25",
    featured: false,
    sponsored: false,
    embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    embed_platform: "tiktok",
    cta_type: "whatsapp",
    cta_label: "Strategi TikTok Saya",
    cta_url: "https://wa.me/6287772577020",
    read_time_minutes: 2,
    views: 6800,
    shares: 345,
    bookmarks: 78,
    viral_score: 93,
    seo_score: 58,
    engagement_score: 89,
    freshness_score: 85,
    credibility_score: 72,
    monetization_score: 60,
  },
];

// ============ HELPER FUNCTIONS ============

export function getContentBySlug(slug) {
  return VIRALOG_CONTENT.find((c) => c.slug === slug);
}

export function getTrendingContent(limit = 8) {
  return [...VIRALOG_CONTENT]
    .filter((c) => c.status === "published")
    .sort((a, b) => b.viral_score - a.viral_score)
    .slice(0, limit);
}

export function getLatestContent(limit = 8) {
  return [...VIRALOG_CONTENT]
    .filter((c) => c.status === "published")
    .sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date))
    .slice(0, limit);
}

export function getFeaturedContent(limit = 1) {
  return VIRALOG_CONTENT.filter((c) => c.featured && c.status === "published").slice(0, limit);
}

export function getContentByCategory(categorySlug, limit = 20) {
  return VIRALOG_CONTENT
    .filter((c) => c.category_slug === categorySlug && c.status === "published")
    .slice(0, limit);
}

export function getShortVideos(limit = 6) {
  return VIRALOG_CONTENT
    .filter((c) => c.content_type === "short_video" && c.status === "published")
    .slice(0, limit);
}

export function getLongVideos(limit = 4) {
  return VIRALOG_CONTENT
    .filter((c) => (c.content_type === "long_video" || c.content_type === "podcast") && c.status === "published")
    .slice(0, limit);
}

export function getSponsoredContent(limit = 3) {
  return VIRALOG_CONTENT
    .filter((c) => c.sponsored && c.status === "published")
    .slice(0, limit);
}

export function getEditorsPick(limit = 4) {
  return [...VIRALOG_CONTENT]
    .filter((c) => c.status === "published")
    .sort((a, b) => b.bookmarks - a.bookmarks)
    .slice(0, limit);
}

export function getRelatedContent(slug, limit = 4) {
  const current = getContentBySlug(slug);
  if (!current) return [];
  return VIRALOG_CONTENT
    .filter((c) => c.slug !== slug && c.status === "published")
    .filter((c) => c.category_slug === current.category_slug || c.tags.some((t) => current.tags.includes(t)))
    .slice(0, limit);
}

export function searchContent(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase();
  return VIRALOG_CONTENT.filter((c) =>
    c.status === "published" &&
    (c.title.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q)) ||
      c.category_slug.toLowerCase().includes(q))
  );
}

export function getCategoryBySlug(slug) {
  return VIRALOG_CATEGORIES.find((c) => c.slug === slug);
}

export function getAuthorBySlug(slug) {
  return VIRALOG_AUTHORS.find((a) => a.slug === slug);
}

export function getContentByAuthor(authorSlug, limit = 20) {
  return VIRALOG_CONTENT
    .filter((c) => c.author_slug === authorSlug && c.status === "published")
    .slice(0, limit);
}

export function getContentByTag(tag, limit = 20) {
  return VIRALOG_CONTENT
    .filter((c) => c.tags.includes(tag) && c.status === "published")
    .slice(0, limit);
}

export function getPopularTags(limit = 15) {
  return VIRALOG_TAGS.slice(0, limit);
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export function formatViews(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}
