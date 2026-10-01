import { useState, useEffect } from "react";
import { TOOLS, getToolImage } from "@/data/tools";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export function normalizeTool(item, fallback = {}) {
  const data = item.data || {};
  const name = item.title || item.name || fallback.name || "Tool";
  const url = data.url || item.url || fallback.url || "#";
  const category = data.category || item.category || fallback.category || "other";
  const tagline = data.tagline || item.summary || fallback.tagline || "";
  const description = item.summary || data.description || fallback.description || "";
  const fallbackImage = getToolImage({ name, category });
  const imageCandidate = item.image_url || data.image || fallback.image;
  const image = typeof imageCandidate === "string" && imageCandidate.trim()
    ? imageCandidate
    : fallbackImage;

  return {
    ...fallback,
    id: item.id || fallback.id || name,
    name,
    title: name,
    url,
    category,
    tagline,
    description,
    image,
    fallbackImage,
    is_published: item.is_published !== false,
  };
}

export function useTools() {
  const [tools, setTools] = useState(() => TOOLS.map((t) => ({ ...t, image: getToolImage(t) })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/modules/tools`)
      .then((res) => (res.ok ? res.json() : []))
      .then((apiItems) => {
        if (Array.isArray(apiItems)) {
          const published = apiItems.filter((i) => i.is_published !== false);
          setTools(published.map((item) => normalizeTool(item)));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { tools, loading };
}
