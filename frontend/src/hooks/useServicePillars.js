import { useState, useEffect } from "react";
import { Palette, Globe, Users, Sparkles, Layers, Box, Cpu, Wrench, Shield, Rocket } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const ICON_MAP = {
  Palette,
  Globe,
  Users,
  Sparkles,
  Layers,
  Box,
  Cpu,
  Wrench,
  Shield,
  Rocket,
  Columns3: Layers,
};

export const DEFAULT_PILLARS = [
  {
    id: 1,
    slug: "digital-asset",
    icon: Palette,
    tag: "PILAR 1",
    title: "Digital Asset",
    link: "/digital-asset",
    headline: "Bangun citra bisnis yang profesional",
    desc: "Dari logo, brand guideline, company profile, hingga materi promosi — semua aset yang dibutuhkan bisnis Anda untuk tampil konsisten dan dipercaya.",
    highlights: ["Logo & Brand Guideline", "Company Profile", "Marketing Kit", "Social Media Assets", "Video Profile", "Stationery Bisnis"],
    img: "/assets/paket-digital-asset/siap-usaha.jpg",
    color: "magenta",
    bgClass: "bg-magenta-50",
    textClass: "text-magenta",
    btnClass: "!bg-[#f51d6a] hover:!bg-[#e0185e]",
    is_published: true,
  },
  {
    id: 2,
    slug: "website",
    icon: Globe,
    tag: "PILAR 2",
    title: "Website",
    link: "/website",
    headline: "Miliki website yang bekerja untuk bisnis",
    desc: "Website yang membantu bisnis Anda ditemukan, dipercaya, dihubungi, dan dikelola dengan lebih mudah — dari landing page hingga sistem terintegrasi.",
    highlights: ["Landing Page", "Company Website", "Website Bisnis", "Website Growth System", "Website Remake", "Maintenance"],
    img: "/assets/paket-website/landing-page.png",
    color: "amethyst",
    bgClass: "bg-amethyst-50",
    textClass: "text-amethyst",
    btnClass: "bg-amethyst hover:bg-amethyst-600",
    is_published: true,
  },
  {
    id: 3,
    slug: "digital-growth-team",
    icon: Users,
    tag: "PILAR 3",
    title: "Digital Growth Team",
    link: "/digital-growth-team",
    headline: "Punya tim digital tanpa harus merekrut sendiri",
    desc: "Tim digital lengkap yang mengelola konten, media sosial, SEO, iklan, dan laporan performa bisnis Anda secara konsisten setiap bulan.",
    highlights: ["Content Management", "Social Media", "SEO", "Digital Ads", "Website Update", "Reporting"],
    img: "/assets/paket-growth/admin-digital.png",
    color: "navy",
    bgClass: "bg-blue-50",
    textClass: "text-blue-600",
    btnClass: "bg-navy hover:bg-navy-400",
    is_published: true,
  },
];

export function resolveIcon(iconName, slug) {
  if (iconName && ICON_MAP[iconName]) return ICON_MAP[iconName];
  if (slug === "digital-asset") return Palette;
  if (slug === "website") return Globe;
  if (slug === "digital-growth-team") return Users;
  return Sparkles;
}

export function useServicePillars() {
  const [pillars, setPillars] = useState(DEFAULT_PILLARS);
  const [loading, setLoading] = useState(true);
  const [hasRemoteData, setHasRemoteData] = useState(false);

  useEffect(() => {
    fetch(`${API}/modules/service-pillars`)
      .then((res) => (res.ok ? res.json() : []))
      .then((items) => {
        if (Array.isArray(items)) {
          setHasRemoteData(true);
          const sorted = [...items].sort((a, b) => (a.data?.order ?? 99) - (b.data?.order ?? 99));
          const mapped = sorted
            .filter((item) => item.is_published === true)
            .map((item, idx) => {
              const data = item.data || {};
              const defaultStatic = DEFAULT_PILLARS.find(
                (p) => p.title.toLowerCase() === item.title.toLowerCase() || p.slug === item.slug
              );
              const color = data.color || defaultStatic?.color || (idx % 3 === 0 ? "magenta" : idx % 3 === 1 ? "amethyst" : "navy");
              const iconComp = resolveIcon(data.icon, item.slug) || defaultStatic?.icon || Users;

              return {
                id: item.id,
                icon: iconComp,
                slug: item.slug,
                tag: data.tag || defaultStatic?.tag || `PILAR ${idx + 1}`,
                title: item.title,
                link: data.link || defaultStatic?.link || `/pilar/${item.slug}`,
                headline: data.headline || defaultStatic?.headline || item.title,
                desc: item.summary || data.desc || defaultStatic?.desc || "",
                highlights: Array.isArray(data.highlights) && data.highlights.length > 0 ? data.highlights : defaultStatic?.highlights || [],
                img: item.image_url || data.flyer_image || data.img || defaultStatic?.img || "/assets/paket-digital-asset/siap-usaha.jpg",
                color,
                bgClass: color === "amethyst" ? "bg-amethyst-50" : color === "navy" ? "bg-blue-50" : "bg-magenta-50",
                textClass: color === "amethyst" ? "text-amethyst" : color === "navy" ? "text-blue-600" : "text-magenta",
                btnClass: color === "amethyst" ? "bg-amethyst hover:bg-amethyst-600" : color === "navy" ? "bg-navy hover:bg-navy-400" : "!bg-[#f51d6a] hover:!bg-[#e0185e]",
                is_published: true,
                data,
              };
            });

          setPillars(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { pillars, loading, hasRemoteData };
}
