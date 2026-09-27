import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import ViralogContentCard from "@/components/viralog/ViralogContentCard";
import { getLatestContent } from "@/data/viralog";
import { useLanguage } from "@/lib/LanguageContext";

export default function LatestInsights() {
  const { tr } = useLanguage();
  const items = getLatestContent(4);
  if (!items.length) return null;

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5" /> VIRALOG INSIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">{tr("Insight Terbaru")}</h2>
          </div>
          <Link to="/content" className="flex items-center gap-1 text-sm font-semibold text-magenta hover:gap-2 transition-all">
            {tr("Lihat Semua")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <ViralogContentCard key={item.id} content={item} variant="standard" index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
