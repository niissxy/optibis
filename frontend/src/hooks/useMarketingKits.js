import { useEffect, useState } from "react";
import { MARKETING_KIT_ITEMS } from "@/data/marketingKit";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

function normalizeMarketingKit(item, fallback = {}) {
  const data = item.data || {};

  return {
    ...fallback,
    ...data,
    id: item.id || fallback.id || item.slug,
    slug: item.slug || fallback.slug,
    nama_asset: item.title || data.nama_asset || fallback.nama_asset || "Marketing Kit",
    deskripsi: item.summary || data.deskripsi || fallback.deskripsi || "",
    thumbnail: item.image_url || data.thumbnail || data.preview_url || fallback.thumbnail || "",
    kategori: data.kategori || fallback.kategori || "Lainnya",
    subkategori: data.subkategori || fallback.subkategori || "",
    format_file: data.format_file || fallback.format_file || "",
    ukuran_file: data.ukuran_file || fallback.ukuran_file || "",
    file_url: data.file_url || fallback.file_url || "",
    preview_url: data.preview_url || fallback.preview_url || "",
    akses_tipe: data.akses_tipe || fallback.akses_tipe || "Free Download",
    badge: data.badge || fallback.badge || "none",
    download_count: Number(data.download_count ?? fallback.download_count ?? 0),
    featured: Boolean(data.featured ?? fallback.featured),
  };
}

export function useMarketingKits() {
  const [marketingKits, setMarketingKits] = useState(MARKETING_KIT_ITEMS);

  useEffect(() => {
    fetch(`${API}/modules/marketing-kits`)
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => {
        if (!Array.isArray(items)) return;

        const remoteItems = items
          .filter((item) => item.is_published)
          .map((item) => normalizeMarketingKit(item, MARKETING_KIT_ITEMS.find((fallback) => fallback.slug === item.slug)));

        setMarketingKits(remoteItems);
      })
      .catch(() => {});
  }, []);

  return marketingKits;
}
