import { useState, useEffect, useMemo } from "react";
import {
  Palette,
  FileText,
  Megaphone,
  Camera,
  Mail,
  LayoutDashboard,
  Monitor,
  ShoppingCart,
  ClipboardList,
  Users,
  Globe,
  Search,
  BarChart3,
  Code2,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { getServiceSlug } from "@/lib/serviceRoutes";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const ICON_MAP = {
  Palette,
  FileText,
  Megaphone,
  Camera,
  Mail,
  LayoutDashboard,
  Monitor,
  ShoppingCart,
  ClipboardList,
  Users,
  Globe,
  Search,
  BarChart3,
  Code2,
  LayoutGrid,
  Sparkles,
};

export const DEFAULT_SERVICES = [
  // Digital Asset
  {
    slug: "brand-identity",
    name: "Brand Identity",
    pillar: "digital-asset",
    icon: Palette,
    desc: "Identitas visual lengkap untuk bisnis Anda agar tampil konsisten dan profesional.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
    features: [
      "Logo utama & varian",
      "Brand guideline (warna, tipografi, layout)",
      "Icon & elemen visual",
      "Brand voice & tone",
      "Mockup aplikasi brand",
      "Logo animation (opsional)",
      "File siap cetak & digital (AI, PNG, SVG, PDF)",
    ],
  },
  {
    slug: "stationery-bisnis",
    name: "Stationery Bisnis",
    pillar: "digital-asset",
    icon: FileText,
    desc: "Dokumen dan materi bisnis yang konsisten dengan identitas brand Anda.",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&h=400&fit=crop",
    features: [
      "Kartu nama",
      "Kop surat & amplop",
      "Invoice & receipt",
      "ID card karyawan",
      "Folder & sticker bisnis",
      "Form & template dokumen",
      "Sertifikat & letterhead",
    ],
  },
  {
    slug: "marketing-sales-assets",
    name: "Marketing & Sales Assets",
    pillar: "digital-asset",
    icon: Megaphone,
    desc: "Materi promosi dan penjualan yang membantu tim Anda menutup deal lebih cepat.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    features: [
      "Company profile",
      "Pitch deck presentasi",
      "Brosur & flyer",
      "Katalog produk",
      "Banner & spanduk",
      "Proposal template",
      "Sales one-pager & rate card",
    ],
  },
  {
    slug: "social-media-assets",
    name: "Social Media Assets",
    pillar: "digital-asset",
    icon: Camera,
    desc: "Template dan materi visual untuk semua kebutuhan media sosial Anda.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop",
    features: [
      "Template feed & carousel",
      "Template story & highlight",
      "Cover & thumbnail video",
      "Twibbon & filter",
      "Social media kit lengkap",
      "Caption template per format",
      "Branded sticker & GIF pack",
    ],
  },
  {
    slug: "content-media",
    name: "Content & Media",
    pillar: "digital-asset",
    icon: Mail,
    desc: "Konten tertulis dan visual yang menarik untuk semua kanal digital.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCZHCxxa39iY-AuHAaAl5mUBm7lSSUZvpCd0ooKCBOCg&s=10",
    features: [
      "Copywriting profesional",
      "Artikel & blog post",
      "Video promosi/profile",
      "Fotografi produk",
      "Infografis & ilustrasi",
      "Voice over & naskah video",
      "Newsletter & email template",
    ],
  },
  {
    slug: "digital-channel-setup",
    name: "Digital Channel Setup",
    pillar: "digital-asset",
    icon: LayoutDashboard,
    desc: "Pengaturan akun dan kanal digital bisnis Anda dari nol hingga siap pakai.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    features: [
      "Email bisnis (custom domain)",
      "Google Business Profile",
      "WhatsApp Business setup",
      "Akun media sosial",
      "Google Workspace setup",
      "Domain registration & DNS",
      "Meta Business Suite configuration",
    ],
  },

  // Website
  {
    slug: "landing-page",
    name: "Landing Page",
    pillar: "website",
    icon: Monitor,
    desc: "Satu halaman landing page yang fokus konversi — cepat, responsif, dan dioptimasi untuk promosi, event, atau lead generation.",
    image: "/assets/paket-website/landing-page.png",
    features: [
      "Website live (1 halaman landing page)",
      "Akses hosting & domain .com (1 tahun)",
      "Form inquiry terintegrasi email + database",
      "Google Analytics & Search Console terpasang",
      "Panduan update konten dasar",
      "Sertifikat SSL (HTTPS) terpasang",
      "Mobile responsive & loading cepat (<3s)",
    ],
  },
  {
    slug: "multi-page",
    name: "Multi Page",
    pillar: "website",
    icon: FileText,
    desc: "Website company profile multi-halaman dengan CMS sederhana — bisnis Anda tampil profesional dan mudah diperbarui, lengkap dengan gallery, portfolio, dan form kontak.",
    image: "/assets/paket-website/multi-page.png",
    features: [
      "Website live (5–8 halaman)",
      "Akses CMS admin dashboard",
      "Gallery & portfolio terintegrasi dengan filter",
      "Blog/artikel system dengan CMS",
      "Google Analytics & Search Console terintegrasi",
      "Sertifikat SSL (HTTPS) terpasang",
      "Dokumentasi & training CMS",
      "Maintenance 3 bulan",
    ],
  },
  {
    slug: "toko-online",
    name: "Toko Online",
    pillar: "website",
    icon: ShoppingCart,
    desc: "Website custom dengan dashboard admin, CRM ringan, lead management, dan booking system — bukan sekadar website, tapi sistem yang bekerja untuk bisnis Anda.",
    image: "/assets/paket-website/toko-online.png",
    features: [
      "Website + sistem custom live",
      "Dashboard admin lengkap dengan role management",
      "CRM & lead management system",
      "Booking/reservation system dengan kalender",
      "Reporting & analytics dashboard",
      "API documentation & user manual",
      "Training tim (2 sesi)",
    ],
  },

  // Software & Sistem Bisnis
  {
    slug: "web-application",
    name: "Web Application",
    pillar: "software",
    icon: LayoutGrid,
    desc: "Pengembangan web application kustom yang interaktif, scalable, dan modern untuk operasional bisnis serta layanan pelanggan.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    features: [
      "Custom Frontend & Backend Architecture",
      "User Authentication & Role-Based Access Control",
      "Database Design & API Integration",
      "Dashboard Analytics & Reporting",
      "Cloud Deployment & High Availability Setup",
      "Security Auditing & SSL Integration",
      "Dokumentasi Teknis & Training Admin",
    ],
  },
  {
    slug: "custom-system",
    name: "Custom System",
    pillar: "software",
    icon: Code2,
    desc: "Sistem informasi bisnis, ERP ringan, manajemen inventaris, dan workflow automation yang dirancang spesifik mengikuti proses bisnis Anda.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    features: [
      "Sistem Informasi & Workflow Management Custom",
      "Manajemen Inventaris, Transaksi & Operasional",
      "Integrasi WhatsApp API & Notifikasi Otomatis",
      "Multi-Cabang & Multi-Gudang Terpusat",
      "Audit Trail & Log Aktivitas Pengguna",
      "Otomasi Export Data (PDF, Excel, CSV)",
      "Garansi & Dukungan Teknis Purna Jual",
    ],
  },

  // Digital Growth Team
  {
    slug: "strategi-planning",
    name: "Strategi & Planning",
    pillar: "digital-growth-team",
    icon: ClipboardList,
    desc: "Digital audit, riset kompetitor, content strategy, dan monthly roadmap.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    features: [
      "Digital audit menyeluruh",
      "Riset kompetitor & industri",
      "Content strategy & calendar",
      "Monthly roadmap",
      "KPI & target bulanan",
      "Audience persona mapping",
      "SWOT analysis digital",
    ],
  },
  {
    slug: "content-management",
    name: "Content Management",
    pillar: "digital-growth-team",
    icon: Camera,
    desc: "Kalender konten, desain, copywriting, reels, artikel, dan publishing.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS79cQFZbP44UJIrC_zpi64HcVvligl9kWNrapi64XuQw&s=10",
    features: [
      "12-40 konten/bulan",
      "Desain feed & carousel",
      "Copywriting profesional",
      "Video reels & shorts",
      "Artikel blog & SEO",
      "Infografis & carousel storytelling",
      "Thumbnail & cover design",
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    pillar: "digital-growth-team",
    icon: Users,
    desc: "Posting, scheduling, monitoring, dan reporting media sosial.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop",
    features: [
      "Content scheduling",
      "Community management",
      "Reply & engagement",
      "Cross-platform posting",
      "Monthly social report",
      "Crisis response protocol",
      "Influencer & KOL coordination",
    ],
  },
  {
    slug: "website-management",
    name: "Website Management",
    pillar: "digital-growth-team",
    icon: Globe,
    desc: "Update konten, maintenance, blog, dan monitoring performa website.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    features: [
      "Update konten berkala",
      "Maintenance & backup",
      "Blog & artikel posting",
      "Performance monitoring",
      "Security updates",
      "Speed optimization",
      "Landing page creation",
    ],
  },
  {
    slug: "seo-visibility",
    name: "SEO & Visibility",
    pillar: "digital-growth-team",
    icon: Search,
    desc: "SEO on-page, local SEO, Google Business, dan monitoring keyword.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    features: [
      "SEO on-page optimization",
      "Local SEO & Google Business",
      "Keyword monitoring",
      "Backlink strategy",
      "Monthly SEO report",
      "Technical SEO audit",
      "Competitor rank tracking",
    ],
  },
  {
    slug: "digital-advertising",
    name: "Digital Advertising",
    pillar: "digital-growth-team",
    icon: BarChart3,
    desc: "Meta Ads, Google Ads, TikTok Ads, creative, dan campaign reporting.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    features: [
      "Meta Ads management",
      "Google Ads management",
      "TikTok Ads management",
      "Creative & copy ads",
      "Campaign reporting",
      "A/B testing & optimization",
      "Retargeting & remarketing setup",
    ],
  },
];

export function resolveServiceIcon(iconName, slug) {
  if (iconName && ICON_MAP[iconName]) return ICON_MAP[iconName];
  const staticFound = DEFAULT_SERVICES.find((s) => s.slug === slug);
  if (staticFound?.icon) return staticFound.icon;
  return Sparkles;
}

export function normalizePillarSlug(rawPillar = "") {
  const p = String(rawPillar || "").toLowerCase().trim();
  if (p === "digital asset" || p === "digital-asset") return "digital-asset";
  if (p === "website") return "website";
  if (p === "digital growth team" || p === "digital-growth-team" || p === "growth-team") return "digital-growth-team";
  if (p === "software & sistem bisnis" || p === "software" || p === "software-sistem-bisnis") return "software";
  return p || "website";
}

export function useServices() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/modules/services`)
      .then((res) => (res.ok ? res.json() : []))
      .then((items) => {
        if (!Array.isArray(items)) return;

        const published = items.filter((item) => item.is_published !== false);

        // Merge DB services with default static services
        const dbMap = new Map();
        published.forEach((item) => {
          const d = item.data || {};
          const slug = item.slug || getServiceSlug(item.title);
          const pillar = normalizePillarSlug(d.pillar_slug || d.pillar);
          const staticMatch = DEFAULT_SERVICES.find((s) => s.slug === slug);

          dbMap.set(slug, {
            id: item.id,
            slug,
            name: item.title,
            title: item.title,
            pillar,
            pillarSlug: pillar,
            pillarName: d.pillar_name || d.pillar,
            desc: item.summary || d.desc || staticMatch?.desc || "",
            image: item.image_url || d.image || staticMatch?.image || "",
            icon: resolveServiceIcon(d.icon, slug),
            features:
              Array.isArray(d.features) && d.features.length > 0
                ? d.features
                : staticMatch?.features || [],
            packages: Array.isArray(d.packages) ? d.packages : [],
            packages_title: d.packages_title,
            packages_subtitle: d.packages_subtitle,
            is_published: item.is_published !== false,
          });
        });

        // Add any default services that were not yet in the DB map
        DEFAULT_SERVICES.forEach((s) => {
          if (!dbMap.has(s.slug)) {
            dbMap.set(s.slug, s);
          }
        });

        setServices(Array.from(dbMap.values()));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getServicesByPillar = useMemo(() => {
    return (pillarSlug) => {
      const target = normalizePillarSlug(pillarSlug);
      return services.filter((s) => normalizePillarSlug(s.pillar) === target);
    };
  }, [services]);

  return {
    services,
    loading,
    getServicesByPillar,
  };
}
