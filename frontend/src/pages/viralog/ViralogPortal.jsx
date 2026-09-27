import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, TrendingUp, Flame, ArrowRight, Clock, Eye, Sparkles, Newspaper, Play, ChevronRight } from "lucide-react";
import PillarLayout from "@/components/optibis/PillarLayout";
import ViralogContentCard from "@/components/viralog/ViralogContentCard";
import ViralogAdSlot from "@/components/viralog/ViralogAdSlot";
import ViralogNewsletter from "@/components/viralog/ViralogNewsletter";
import {
  VIRALOG_CATEGORIES,
  VIRALOG_TAGS,
  getLatestContent,
  getTrendingContent,
  getFeaturedContent,
  getShortVideos,
  getLongVideos,
  getSponsoredContent,
  getEditorsPick,
  getCategoryBySlug,
  formatViews,
  formatDate,
} from "@/data/viralog";

export default function ViralogPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const featured = getFeaturedContent(1)[0];
  const trending = getTrendingContent(5);
  const latest = getLatestContent(6);
  const shortVideos = getShortVideos(6);
  const longVideos = getLongVideos(3);
  const sponsored = getSponsoredContent(2);
  const editorsPick = getEditorsPick(4);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <PillarLayout>
      {/* Category Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-18 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            <Link to="/content" className="shrink-0 px-3 py-1.5 rounded-full bg-navy text-white text-xs font-semibold whitespace-nowrap">
              Semua
            </Link>
            {VIRALOG_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/kategori/${cat.slug}`}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors hover:bg-${cat.color}/10 hover:text-${cat.color} text-navy-300`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Top Ads Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <ViralogAdSlot placement="top_leaderboard" />
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel, video, tutorial..."
            className="w-full pl-11 pr-4 h-11 rounded-full border border-gray-200 bg-slate-50 focus:bg-white focus:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta/10 text-sm font-medium"
          />
        </form>
      </div>

      {/* Main Hero Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Featured */}
          <div className="lg:col-span-2">
            {featured && <ViralogContentCard content={featured} variant="featured" />}
          </div>
          {/* Trending Sidebar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <Flame className="w-5 h-5 text-magenta" />
              <h3 className="font-bold text-navy text-sm uppercase tracking-wide">Trending</h3>
            </div>
            <div className="space-y-0">
              {trending.map((item, i) => (
                <ViralogContentCard key={item.id} content={item} variant="trending" index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-magenta" />
          <h2 className="text-lg font-bold text-navy">Sedang Naik Daun</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getLatestContent(4).map((item, i) => (
            <ViralogContentCard key={item.id} content={item} variant="standard" index={i} />
          ))}
        </div>
      </section>

      {/* Section Separator Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ViralogAdSlot placement="section_separator" />
      </div>

      {/* Short Video Hub */}
      <section className="py-8 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(233,30,99,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-end justify-between mb-5">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-magenta" />
              <h2 className="text-lg font-bold text-white">Short Video Hub</h2>
            </div>
            <Link to="/short-video" className="text-xs font-semibold text-magenta flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 snap-x">
            {shortVideos.map((video, i) => (
              <motion.div key={video.id} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="shrink-0 w-36 sm:w-44 snap-start">
                <Link to={`/content/${video.slug}`} className="group block">
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden">
                    <img src={video.thumbnail} alt={video.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-magenta transition-all">
                        <Play className="w-4 h-4 text-navy group-hover:text-white fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/50 text-white text-[8px] font-bold uppercase">
                      {video.embed_platform === "tiktok" ? "TikTok" : video.embed_platform === "youtube_shorts" ? "YT" : "Reels"}
                    </span>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-[11px] font-bold text-white leading-tight line-clamp-2 mb-0.5">{video.title}</h3>
                      <span className="flex items-center gap-0.5 text-white/60 text-[8px]"><Eye className="w-2.5 h-2.5" /> {formatViews(video.views)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles + Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="w-5 h-5 text-navy" />
              <h2 className="text-lg font-bold text-navy">Artikel Terbaru</h2>
            </div>
            <div className="space-y-4">
              {latest.slice(0, 4).map((item, i) => (
                <ViralogContentCard key={item.id} content={item} variant="compact" index={i} />
              ))}
            </div>
            {/* In-feed Ad */}
            <div className="my-6">
              <ViralogAdSlot placement="in_feed" />
            </div>
            {latest.slice(4).map((item, i) => (
              <div key={item.id} className="mb-4">
                <ViralogContentCard content={item} variant="compact" index={i + 4} />
              </div>
            ))}
            <div className="text-center mt-6">
              <Link to="/content" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-navy text-white text-sm font-semibold hover:bg-navy-400 transition-colors">
                Muat Lebih Banyak <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Sidebar Ad */}
            <ViralogAdSlot placement="sidebar_sticky" />

            {/* Popular Tags */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-navy text-sm uppercase tracking-wide mb-3">Tag Populer</h3>
              <div className="flex flex-wrap gap-2">
                {VIRALOG_TAGS.slice(0, 10).map((tag) => (
                  <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`} className="px-2.5 py-1 rounded-lg bg-slate-50 text-xs font-medium text-navy-300 hover:bg-magenta hover:text-white transition-colors">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Editor's Pick */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <Sparkles className="w-4 h-4 text-amethyst" />
                <h3 className="font-bold text-navy text-sm uppercase tracking-wide">Editor's Pick</h3>
              </div>
              <div className="space-y-0">
                {editorsPick.map((item, i) => (
                  <ViralogContentCard key={item.id} content={item} variant="trending" index={i} />
                ))}
              </div>
            </div>

            {/* Newsletter Sidebar */}
            <ViralogNewsletter variant="sidebar" />
          </div>
        </div>
      </section>

      {/* Sponsored Content */}
      {sponsored.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-navy text-sm">Sponsored Content</h3>
              <span className="ml-auto px-2 py-0.5 rounded bg-amber-200 text-amber-800 text-[10px] font-bold">ADS</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {sponsored.map((item, i) => (
                <ViralogContentCard key={item.id} content={item} variant="standard" index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Long Video / Podcast */}
      {longVideos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-navy" />
            <h2 className="text-lg font-bold text-navy">Video & Podcast</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {longVideos.map((item, i) => (
              <ViralogContentCard key={item.id} content={item} variant="standard" index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Category Cluster */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-lg font-bold text-navy mb-4">Jelajah Kategori</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIRALOG_CATEGORIES.map((cat, i) => {
            const count = getLatestContent().filter((c) => c.category_slug === cat.slug).length;
            return (
              <motion.div key={cat.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={`/kategori/${cat.slug}`} className="group block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg hover:border-magenta/30 transition-all">
                  <div className={`w-10 h-10 rounded-lg bg-${cat.color}/10 flex items-center justify-center mb-3`}>
                    <Newspaper className={`w-5 h-5 text-${cat.color}`} />
                  </div>
                  <h3 className="font-bold text-navy text-sm mb-1 group-hover:text-magenta transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{count} konten</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ViralogAdSlot placement="footer_ads" />
      </div>

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ViralogNewsletter />
      </section>
    </PillarLayout>
  );
}