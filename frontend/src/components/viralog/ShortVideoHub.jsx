import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Eye, Smartphone } from "lucide-react";
import { getShortVideos, formatViews } from "@/data/viralog";
import { useLanguage } from "@/lib/LanguageContext";

export default function ShortVideoHub() {
  const { tr } = useLanguage();
  const videos = getShortVideos(8);
  if (!videos.length) return null;

  return (
    <section className="py-12 lg:py-16 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(233,30,99,0.1),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magenta/20 text-magenta text-xs font-bold mb-2">
              <Smartphone className="w-3.5 h-3.5" /> SHORT VIDEO HUB
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{tr("Video Pendek Pilihan")}</h2>
          </div>
          <Link to="/short-video" className="flex items-center gap-1 text-sm font-semibold text-magenta hover:gap-2 transition-all">
            {tr("Semua Video")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="shrink-0 w-40 sm:w-48 snap-start"
            >
              <Link to={`/content/${video.slug}`} className="group block">
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-magenta transition-all duration-300">
                      <Play className="w-5 h-5 text-navy group-hover:text-white fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/50 text-white text-[9px] font-bold uppercase">
                    {video.embed_platform === "tiktok" ? "TikTok" : video.embed_platform === "youtube_shorts" ? "YT Shorts" : "Reels"}
                  </span>
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-xs font-bold text-white leading-tight line-clamp-2 mb-1">{tr(video.title)}</h3>
                    <span className="flex items-center gap-1 text-white/60 text-[9px]">
                      <Eye className="w-2.5 h-2.5" /> {formatViews(video.views)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
