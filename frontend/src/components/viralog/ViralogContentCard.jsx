import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Eye, Clock, TrendingUp, Bookmark, Share2, BadgeCheck, Sparkles } from "lucide-react";
import { getCategoryBySlug, getAuthorBySlug, formatViews } from "@/data/viralog";
import { useLanguage } from "@/lib/LanguageContext";

const TYPE_LABELS = {
  article: "Artikel",
  blog: "Blog",
  news: "News",
  rss_item: "RSS",
  short_video: "Short Video",
  long_video: "Video",
  social_post: "Social",
  podcast: "Podcast",
  gallery: "Galeri",
  report: "Report",
  sponsored_content: "Sponsored",
  event_content: "Event",
  press_release: "Press Release",
  case_study: "Case Study",
  tutorial: "Tutorial",
  editorial: "Editorial",
};

export default function ViralogContentCard({ content, variant = "compact", index = 0 }) {
  const { language, tr } = useLanguage();
  if (!content) return null;
  const cat = getCategoryBySlug(content.category_slug);
  const author = getAuthorBySlug(content.author_slug);
  const typeLabel = TYPE_LABELS[content.content_type] || "Artikel";
  const publishDate = new Date(content.publish_date).toLocaleDateString(language === "en" ? "en-US" : "id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const isVideo = content.content_type === "short_video" || content.content_type === "long_video" || content.content_type === "podcast";

  // ---- FEATURED: large, image-dominant ----
  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link to={`/content/${content.slug}`} className="group block">
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-navy-100">
            <img
              src={content.thumbnail}
              alt={content.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              {cat && (
                <span className={`px-3 py-1 rounded-full bg-${cat.color} text-white text-xs font-bold uppercase tracking-wide`}>
                  {tr(cat.name)}
                </span>
              )}
              {content.sponsored && (
                <span className="px-3 py-1 rounded-full bg-amber-400 text-navy text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Sponsored
                </span>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
              <p className="text-white/60 text-xs mb-2">{tr(typeLabel)} • {publishDate}</p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-2 group-hover:text-magenta-200 transition-colors">
                {tr(content.title)}
              </h2>
              <p className="text-white/70 text-sm line-clamp-2 mb-3 hidden sm:block">{tr(content.summary)}</p>
              <div className="flex items-center gap-3 text-white/60 text-xs">
                <span>{content.author_name}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {content.read_time_minutes} min</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatViews(content.views)}</span>
                {content.viral_score >= 80 && (
                  <span className="flex items-center gap-1 text-magenta-300 font-semibold">
                    <TrendingUp className="w-3 h-3" /> Viral
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // ---- COMPACT: small horizontal card ----
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.04 }}
      >
        <Link to={`/content/${content.slug}`} className="group flex gap-3 items-start">
          <div className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0 bg-navy-100">
            <img src={content.thumbnail} alt={content.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-3 h-3 text-navy fill-navy ml-0.5" />
                </div>
              </div>
            )}
            {content.sponsored && (
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-400 text-navy text-[8px] font-bold">ADS</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              {cat && <span className={`text-[10px] font-bold uppercase text-${cat.color}`}>{tr(cat.name)}</span>}
              <span className="text-[10px] text-muted-foreground">• {formatViews(content.views)} views</span>
            </div>
            <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2 group-hover:text-magenta transition-colors">
              {tr(content.title)}
            </h3>
            <p className="text-[10px] text-muted-foreground mt-1">{content.read_time_minutes} {tr("min baca")}</p>
          </div>
        </Link>
      </motion.div>
    );
  }

  // ---- VIDEO: play button overlay ----
  if (variant === "video") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06 }}
        className="shrink-0 w-44 sm:w-52"
      >
        <Link to={`/content/${content.slug}`} className="group block">
          <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-navy-100">
            <img src={content.thumbnail} alt={content.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-magenta transition-all duration-300">
                <Play className="w-5 h-5 text-navy group-hover:text-white fill-current ml-0.5" />
              </div>
            </div>
            <div className="absolute top-2 left-2">
              <span className="px-2 py-0.5 rounded bg-black/50 text-white text-[9px] font-bold uppercase">
                {content.embed_platform === "tiktok" ? "TikTok" : content.embed_platform === "youtube_shorts" ? "YT Shorts" : content.embed_platform === "instagram" ? "Reels" : "Video"}
              </span>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-xs font-bold text-white leading-tight line-clamp-2 group-hover:text-magenta-200 transition-colors">
                {tr(content.title)}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-white/60 text-[9px]">
                <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" /> {formatViews(content.views)}</span>
                {content.viral_score >= 80 && <span className="flex items-center gap-0.5 text-magenta-300"><TrendingUp className="w-2.5 h-2.5" /> Viral</span>}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // ---- TRENDING: numbered list item ----
  if (variant === "trending") {
    return (
      <Link to={`/content/${content.slug}`} className="group flex gap-3 items-start py-2.5 border-b border-gray-100 last:border-0">
        <span className={`text-2xl font-extrabold ${index < 3 ? "text-magenta" : "text-muted-foreground/40"} leading-none shrink-0 w-7`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2 group-hover:text-magenta transition-colors">
            {tr(content.title)}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
            {cat && <span className={`font-medium text-${cat.color}`}>{tr(cat.name)}</span>}
            <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" /> {formatViews(content.views)}</span>
            <span className="flex items-center gap-0.5"><TrendingUp className="w-2.5 h-2.5" /> {content.viral_score}</span>
          </div>
        </div>
      </Link>
    );
  }

  // ---- STANDARD: vertical card ----
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/content/${content.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-44 overflow-hidden">
          <img src={content.thumbnail} alt={content.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            {cat && (
              <span className={`px-2.5 py-1 rounded-full bg-${cat.color} text-white text-[10px] font-bold uppercase`}>
                {tr(cat.name)}
              </span>
            )}
            {content.sponsored && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-navy text-[10px] font-bold flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> Sponsored
              </span>
            )}
          </div>
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-navy fill-navy ml-0.5" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
            <span>{tr(typeLabel)}</span>
            <span>•</span>
            <span>{publishDate}</span>
            <span>•</span>
            <span>{content.read_time_minutes} min</span>
          </div>
          <h3 className="text-base font-bold text-navy leading-snug line-clamp-2 mb-2 group-hover:text-magenta transition-colors">
            {tr(content.title)}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{tr(content.summary)}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {author?.avatar ? (
                <img src={author.avatar} alt={content.author_name} className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-navy-100 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-navy">{content.author_name.charAt(0)}</span>
                </div>
              )}
              <span className="text-[10px] text-muted-foreground">{content.author_name}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {formatViews(content.views)}</span>
              {content.viral_score >= 80 && (
                <span className="flex items-center gap-0.5 text-magenta font-semibold"><TrendingUp className="w-3 h-3" /> {content.viral_score}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
