import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ArrowRight, TrendingUp, Eye } from "lucide-react";
import { getTrendingContent, getCategoryBySlug, formatViews } from "@/data/viralog";
import { useLanguage } from "@/lib/LanguageContext";

export default function TrendingNow() {
  const { tr } = useLanguage();
  const items = getTrendingContent(6);
  if (!items.length) return null;
  const hero = items[0];
  const rest = items.slice(1, 6);
  const cat = getCategoryBySlug(hero.category_slug);

  return (
    <section className="py-12 lg:py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-magenta" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">Trending Now</h2>
          </div>
          <Link to="/trending" className="flex items-center gap-1 text-sm font-semibold text-magenta hover:gap-2 transition-all">
            {tr("Semua Trending")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Hero trending */}
          <Link to={`/content/${hero.slug}`} className="group relative h-64 lg:h-80 rounded-2xl overflow-hidden">
            <img src={hero.thumbnail} alt={hero.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-magenta text-white text-xs font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> #1 Trending
              </span>
              {cat && <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-bold">{cat.name}</span>}
            </div>
            <div className="absolute bottom-0 p-5">
              <h3 className="text-lg lg:text-xl font-extrabold text-white leading-tight mb-2 group-hover:text-magenta-200 transition-colors">
                {tr(hero.title)}
              </h3>
              <div className="flex items-center gap-3 text-white/60 text-xs">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatViews(hero.views)} {tr("views")}</span>
                <span>{tr("Viral Score")}: {hero.viral_score}</span>
              </div>
            </div>
          </Link>
          {/* Trending list */}
          <div className="space-y-3">
            {rest.map((item, i) => (
              <Link key={item.id} to={`/content/${item.slug}`} className="group flex gap-3 items-start">
                <span className={`text-2xl font-extrabold ${i < 2 ? "text-magenta" : "text-muted-foreground/30"} leading-none shrink-0 w-7`}>
                  {String(i + 2).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2 group-hover:text-magenta transition-colors">
                    {tr(item.title)}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" /> {formatViews(item.views)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><TrendingUp className="w-2.5 h-2.5" /> {item.viral_score}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
