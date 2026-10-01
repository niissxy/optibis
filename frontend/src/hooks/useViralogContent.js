import { useEffect, useState } from "react";
import { VIRALOG_CONTENT } from "@/data/viralog";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
const FOREIGN_RSS_WORDS = /\b(the|for|with|from|into|after|before|funding|backed|subscribers|lands|files|global|venture|round|across|we['’]?re)\b/giu;
const RSS_PROMOTIONAL_BOILERPLATE = /telegram\s+dailyseo|course-?nya\s+dailyseo|topik\s+selanjutnya\s+untuk\s+kami\s+bahas|gabung\s+ke\s+grup\s+telegram/iu;
export const VIRALOG_FALLBACK_THUMBNAIL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%230a192f'/%3E%3Cstop offset='1' stop-color='%23e91e63'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='675' fill='url(%23g)'/%3E%3Ctext x='600' y='350' fill='white' font-family='Arial, sans-serif' font-size='72' font-weight='700' text-anchor='middle'%3EVIRALOG%3C/text%3E%3C/svg%3E";

function isVisibleRssContent(item) {
  if (item.source_type !== "rss") return true;

  const matches = `${item.title || ""} ${item.summary || ""}`.match(FOREIGN_RSS_WORDS) || [];
  return matches.length < 2;
}

function cleanRssArticleBody(body) {
  const paragraphs = String(body || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph && !RSS_PROMOTIONAL_BOILERPLATE.test(paragraph));
  const cleaned = paragraphs.join("\n\n").replace(/\s*…\s*$/, "").trim();
  const lastSentence = Math.max(cleaned.lastIndexOf("."), cleaned.lastIndexOf("!"), cleaned.lastIndexOf("?"));

  return lastSentence >= 0 ? cleaned.slice(0, lastSentence + 1) : cleaned;
}

function normalizeContent(item) {
  const data = item.data || {};
  const isRss = data.source_type === "rss";

  return {
    ...data,
    id: data.id || `content-${item.id}`,
    slug: item.slug,
    title: item.title,
    summary: item.summary || data.summary || "",
    body: isRss ? cleanRssArticleBody(data.body) : data.body,
    thumbnail: data.thumbnail || data.image || item.image_url || VIRALOG_FALLBACK_THUMBNAIL,
    tags: Array.isArray(data.tags) ? data.tags : [],
    status: data.status || (item.is_published ? "published" : "draft"),
    is_published: item.is_published,
  };
}

export function useViralogContent() {
  const [content, setContent] = useState(VIRALOG_CONTENT);

  useEffect(() => {
    fetch(`${API}/modules/viralog-content`)
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => {
        if (!Array.isArray(items)) return;

        const published = items
          .filter((item) => item.is_published && (item.data?.status || "published") === "published")
          .map(normalizeContent)
          .filter(isVisibleRssContent);
        const savedSlugs = new Set(published.map((item) => item.slug));

        setContent([...published, ...VIRALOG_CONTENT.filter((item) => !savedSlugs.has(item.slug))]);
      })
      .catch(() => {});
  }, []);

  return content;
}
