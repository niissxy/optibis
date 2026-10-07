import { useEffect, useState } from "react";
import { PACKAGE_DATA } from "@/data/packages";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const PILLARS = {
  "digital-asset": {
    name: "Digital Asset",
    theme: { color: "magenta", gradient: "from-magenta-50/30 to-white", glow: "bg-magenta/5", badge: "bg-magenta-50 text-magenta", btn: "bg-magenta hover:bg-magenta-500", check: "text-magenta", border: "border-magenta/20" },
  },
  website: {
    name: "Website",
    theme: { color: "amethyst", gradient: "from-amethyst-50/30 to-white", glow: "bg-amethyst/5", badge: "bg-amethyst-50 text-amethyst", btn: "bg-amethyst hover:bg-amethyst-600", check: "text-amethyst", border: "border-amethyst/20" },
  },
  "digital-growth-team": {
    name: "Digital Growth Team",
    theme: { color: "navy", gradient: "from-blue-50/30 to-white", glow: "bg-navy/5", badge: "bg-blue-50 text-blue-600", btn: "bg-navy hover:bg-navy-400", check: "text-blue-600", border: "border-navy/20" },
  },
  khusus: {
    name: "Paket Khusus",
    theme: { color: "magenta", gradient: "from-magenta-50/30 to-white", glow: "bg-magenta/5", badge: "bg-magenta-50 text-magenta", btn: "bg-magenta hover:bg-magenta-500", check: "text-magenta", border: "border-magenta/20" },
  },
};

function pillarSlug(data = {}) {
  const value = String(data.pillar_slug || data.pillarSlug || data.pillar || "").toLowerCase();
  if (PILLARS[value]) return value;
  return Object.entries(PILLARS).find(([, pillar]) => pillar.name.toLowerCase() === value)?.[0] || "website";
}

export function normalizePackage(item) {
  const data = item.data || {};
  const slug = pillarSlug(data);
  const pillar = PILLARS[slug];

  const service = data.service || data.service_slug || "";
  const serviceSlug = data.service_slug || data.service || "";
  const isServicePackage = Boolean(service || serviceSlug || data.is_service_package);

  return {
    ...data,
    slug: item.slug,
    name: item.title || data.name || "",
    pillar: data.pillar_name || pillar.name,
    pillarSlug: slug,
    service,
    serviceSlug,
    isServicePackage,
    heroImage: item.image_url || data.heroImage || data.flyer_image || "",
    heroDesc: data.hero_desc || data.heroDesc || item.summary || data.tagline || "",
    price: data.price || "",
    priceShort: data.price_short || data.priceShort || data.price || "",
    priceNote: data.price_note || data.price_period || data.priceNote || "",
    target: data.target || "",
    timeline: data.timeline || "",
    popular: Boolean(data.popular),
    theme: data.theme || pillar.theme,
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    included: Array.isArray(data.included) ? data.included : [],
    deliverables: Array.isArray(data.deliverables) ? data.deliverables : [],
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
  };
}

const fallbackPackages = Object.entries(PACKAGE_DATA).map(([slug, item]) => ({ slug, ...item }));

export function usePackages() {
  const [packages, setPackages] = useState(fallbackPackages);

  useEffect(() => {
    fetch(`${API}/modules/packages`)
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => {
        if (!Array.isArray(items)) return;
        setPackages(items
          .filter((item) => item.is_published === true && String(item.data?.status || "published").toLowerCase() !== "draft")
          .map(normalizePackage));
      })
      .catch(() => {});
  }, []);

  return packages;
}
