import { useState, useEffect } from "react";
import { PORTFOLIO_DATA, getAllPortfolios } from "@/data/portfolio";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export function resolvePortfolioImageUrl(value) {
  const url = String(value || "").trim();
  if (!url) return "";

  const portfolioMediaUrl = (path, search = "") => {
    const normalizedPath = path.replace(/^\/+/, "").replace(/^storage\//i, "");
    const encodedPath = normalizedPath
      .split("/")
      .filter(Boolean)
      .map((segment) => {
        try {
          return encodeURIComponent(decodeURIComponent(segment));
        } catch {
          return encodeURIComponent(segment);
        }
      })
      .join("/");

    const apiUrl = new URL(API, window.location.origin);
    return `${apiUrl.origin}/storage/app/public/${encodedPath}${search}`;
  };

  // Accept URLs saved by Laravel as well as legacy values without a leading
  // slash (for example, "storage/portfolios/image.jpg").
  const relativeStoragePath = url.match(/^\/?(?:storage\/)?(portfolios\/[^?#]+)(\?[^#]*)?$/i);
  if (relativeStoragePath) {
    return portfolioMediaUrl(relativeStoragePath[1], relativeStoragePath[2] || "");
  }

  try {
    const parsed = new URL(url);
    const storagePath = parsed.pathname.match(/\/(?:storage|public\/storage)\/(portfolios\/.+)$/i);
    if (storagePath) {
      return portfolioMediaUrl(storagePath[1], parsed.search);
    }
  } catch {
    // Keep non-URL asset paths unchanged.
  }

  return url;
}

function normalizeGallery(value) {
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      value = Array.isArray(parsed) ? parsed : value;
    } catch {
      value = value.split(/\r?\n|,(?=\s*(?:https?:\/\/|\/))/);
    }
  }

  return Array.isArray(value)
    ? value.map(resolvePortfolioImageUrl).filter(Boolean)
    : [];
}

export function normalizePortfolio(apiItem = {}, fallback = {}) {
  const name = apiItem.name || fallback.name || "Portfolio";
  const slug = apiItem.slug || fallback.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const category = apiItem.category || apiItem.industry || fallback.industry || fallback.categoryLabel || "Website Company Profile";
  const pilar = Array.isArray(apiItem.pilar) && apiItem.pilar.length > 0 ? apiItem.pilar : (fallback.pilar || ["Website"]);
  const products = Array.isArray(apiItem.products) && apiItem.products.length > 0 ? apiItem.products : (fallback.products || []);
  const desc = apiItem.description || apiItem.ringkasan || fallback.ringkasan || fallback.deskripsi || "";
  const ringkasan = apiItem.ringkasan || fallback.ringkasan || desc;
  const deskripsi = apiItem.description || fallback.deskripsi || desc;
  const website_url = apiItem.website_url || fallback.website_url || "#";
  const apiGallery = normalizeGallery(apiItem.galeri);
  const thumbnail = resolvePortfolioImageUrl(apiItem.image_url) || resolvePortfolioImageUrl(apiItem.thumbnail_url) || apiGallery[0] || fallback.thumbnail || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80";
  const client = apiItem.client || fallback.client || name;
  const location = apiItem.location || fallback.location || "Indonesia";
  const year = apiItem.year || fallback.year || new Date().getFullYear().toString();
  const hasil = apiItem.hasil || fallback.hasil || "Proyek selesai dikerjakan dengan hasil maksimal sesuai kebutuhan klien.";
  const featured = typeof apiItem.featured === "boolean" ? apiItem.featured : (fallback.featured ?? false);

  const fallbackGallery = normalizeGallery(fallback.galeri);
  const hasGallery = apiGallery.length > 0 || fallbackGallery.length > 0;
  const galeri = apiGallery.length > 0 ? apiGallery : (fallbackGallery.length > 0 ? fallbackGallery : [thumbnail]);

  const process = Array.isArray(apiItem.process) && apiItem.process.length > 0
    ? apiItem.process
    : (Array.isArray(fallback.process) && fallback.process.length > 0 ? fallback.process : [
        { num: "01", title: "Discovery & Planning", desc: "Memahami model bisnis dan target audiens proyek." },
        { num: "02", title: "Design & Development", desc: "Membangun sistem dengan standar kualitas tinggi." },
        { num: "03", title: "Launch & Support", desc: "Deployment dan pendampingan performa proyek." },
      ]);

  const stats = Array.isArray(apiItem.stats) && apiItem.stats.length > 0
    ? apiItem.stats
    : (Array.isArray(fallback.stats) && fallback.stats.length > 0 ? fallback.stats : [
        { label: "Status", value: "Live" },
        { label: "Durasi", value: "Selesai" },
      ]);

  const tags = Array.isArray(apiItem.tags) && apiItem.tags.length > 0
    ? apiItem.tags
    : (Array.isArray(fallback.tags) && fallback.tags.length > 0 ? fallback.tags : [category, ...pilar]);

  const documents = Array.isArray(apiItem.documents) && apiItem.documents.length > 0
    ? apiItem.documents
    : (Array.isArray(fallback.documents) ? fallback.documents : []);

  let categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "company-profile";
  const catLower = category.toLowerCase();
  if (catLower.includes("bisnis") || catLower.includes("properti")) categorySlug = "website-bisnis";
  else if (catLower.includes("commerce") || catLower.includes("toko") || catLower.includes("kuliner")) categorySlug = "e-commerce";
  else if (catLower.includes("sistem") || catLower.includes("informasi") || catLower.includes("kesehatan")) categorySlug = "sistem-informasi";
  else if (catLower.includes("aplikasi web") || catLower.includes("kontraktor")) categorySlug = "aplikasi-web";
  else if (catLower.includes("mobile")) categorySlug = "aplikasi-mobile";
  else if (catLower.includes("landing")) categorySlug = "landing-page";
  else if (catLower.includes("redesign")) categorySlug = "redesign";
  else if (catLower.includes("profile")) categorySlug = "company-profile";
  else if (catLower.includes("logo") || catLower.includes("brand")) categorySlug = "logo-brand";
  else if (catLower.includes("sosial") || catLower.includes("social")) categorySlug = "desain-sosial-media";
  else if (catLower.includes("marketing") || catLower.includes("cetak")) categorySlug = "marketing-kit-cetak";
  else if (catLower.includes("banner") || catLower.includes("promosi")) categorySlug = "banner-promosi";

  return {
    ...fallback,
    id: apiItem.id || fallback.id || slug,
    slug,
    name,
    title: name,
    client,
    industry: category,
    categorySlug: fallback.categorySlug || categorySlug,
    categoryLabel: category,
    badge: fallback.badge || pilar[0] || "Website",
    location,
    year,
    pilar,
    products,
    ringkasan,
    desc: ringkasan,
    deskripsi,
    thumbnail,
    image: thumbnail,
    galeri,
    hasGallery,
    hasil,
    featured,
    process,
    stats,
    tags,
    website_url,
    url: website_url,
    documents,
  };
}

export function usePortfolios() {
  const [portfolios, setPortfolios] = useState(() => getAllPortfolios().map((p) => normalizePortfolio(p, p)));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/portfolios`)
      .then((res) => (res.ok ? res.json() : []))
      .then((apiItems) => {
        if (Array.isArray(apiItems) && apiItems.length > 0) {
          const staticList = getAllPortfolios();
          const merged = apiItems.map((item) => {
            const staticItem = staticList.find(
              (s) => s.slug === item.slug || s.name.toLowerCase() === (item.name || "").toLowerCase()
            );
            return normalizePortfolio(item, staticItem || {});
          });

          // Add any static items that weren't in API yet
          const existingSlugs = new Set(merged.map((m) => m.slug));
          const leftovers = staticList
            .filter((s) => !existingSlugs.has(s.slug))
            .map((s) => normalizePortfolio(s, s));

          setPortfolios([...merged, ...leftovers]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { portfolios, loading };
}
