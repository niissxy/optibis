import { useEffect, useState } from "react";
import { CONSULTATIONS, DIGITAL_TOOLS, EBOOKS, TRAININGS } from "@/data/insight";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
const fallbackInsights = [
  ...EBOOKS.map((item) => ({ ...item, category: "Ebook", cover: item.cover })),
  ...TRAININGS.map((item) => ({ ...item, category: "Pelatihan" })),
  ...CONSULTATIONS.map((item) => ({ ...item, category: "Konsultasi" })),
  ...DIGITAL_TOOLS.map((item) => ({ ...item, category: "Tools & Produk" })),
];

function normalizeCategory(value) {
  const category = String(value || "").toLowerCase();
  if (category.includes("ebook")) return "ebook";
  if (category.includes("pelatihan") || category.includes("training")) return "pelatihan";
  if (category.includes("konsultasi")) return "konsultasi";
  return "tool";
}

function normalizeInsight(item) {
  const data = item.data || {};
  const category = data.category || (String(item.slug).startsWith("ebook-") ? "Ebook" : String(item.slug).startsWith("pelatihan-") ? "Pelatihan" : String(item.slug).startsWith("konsultasi-") ? "Konsultasi" : "Tools & Produk");
  return {
    ...data,
    id: item.slug,
    title: item.title,
    desc: item.summary || data.desc || "",
    category,
    categoryKey: normalizeCategory(category),
    image: item.image_url || data.image || data.cover || "",
    cover: item.image_url || data.cover || data.image || "",
    price: Number(data.price || 0),
    author: data.author || "Tim Optibis",
    pages: data.pages || 0,
    duration: data.duration || data.format || "",
    modules: data.modules || 0,
    topics: Array.isArray(data.topics) ? data.topics : [],
    format: data.format || "",
    includes: Array.isArray(data.includes) ? data.includes : [],
  };
}

export function useInsights() {
  const [insights, setInsights] = useState(fallbackInsights.map((item) => ({ ...item, categoryKey: normalizeCategory(item.category) })));

  useEffect(() => {
    fetch(`${API}/modules/insights`)
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => {
        if (Array.isArray(items)) setInsights(items.filter((item) => item.is_published).map(normalizeInsight));
      })
      .catch(() => {});
  }, []);

  return insights;
}
