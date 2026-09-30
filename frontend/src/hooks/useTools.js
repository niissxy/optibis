import { useState, useEffect } from "react";
import { TOOLS, TOOL_CATEGORIES, getToolImage } from "@/data/tools";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export function normalizeTool(item, fallback = {}) {
  const data = item.data || {};
  const name = item.title || item.name || fallback.name || "Tool";
  const url = data.url || item.url || fallback.url || "#";
  const category = data.category || item.category || fallback.category || "other";
  const tagline = data.tagline || item.summary || fallback.tagline || "";
  const description = item.summary || data.description || fallback.description || "";
  const image = item.image_url || data.image || fallback.image || getToolImage({ name, category });

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
        if (Array.isArray(apiItems) && apiItems.length > 0) {
          const published = apiItems.filter((i) => i.is_published !== false);
          const staticList = TOOLS.map((t) => ({ ...t, image: getToolImage(t) }));
          
          const merged = published.map((item) => {
            const staticItem = staticList.find(
              (s) => s.name.toLowerCase() === (item.title || "").toLowerCase()
            );
            return normalizeTool(item, staticItem || {});
          });

          const existingNames = new Set(merged.map((m) => m.name.toLowerCase()));
          const leftovers = staticList.filter((s) => !existingNames.has(s.name.toLowerCase()));

          setTools([...merged, ...leftovers]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { tools, loading };
}
