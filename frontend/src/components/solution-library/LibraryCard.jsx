import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Wallet, Star } from "lucide-react";

const KATEGORI_STYLE = {
  Website: { bg: "bg-magenta/10", text: "text-magenta", border: "border-magenta/20" },
  Frontend: { bg: "bg-navy/10", text: "text-navy", border: "border-navy/20" },
  Backend: { bg: "bg-amethyst/10", text: "text-amethyst", border: "border-amethyst/20" },
  Database: { bg: "bg-navy/10", text: "text-navy", border: "border-navy/20" },
  UI: { bg: "bg-magenta/10", text: "text-magenta", border: "border-magenta/20" },
  UX: { bg: "bg-amethyst/10", text: "text-amethyst", border: "border-amethyst/20" },
  Security: { bg: "bg-navy/10", text: "text-navy", border: "border-navy/20" },
  Cloud: { bg: "bg-magenta/10", text: "text-magenta", border: "border-magenta/20" },
  AI: { bg: "bg-amethyst/10", text: "text-amethyst", border: "border-amethyst/20" },
  Integration: { bg: "bg-navy/10", text: "text-navy", border: "border-navy/20" },
  Business: { bg: "bg-magenta/10", text: "text-magenta", border: "border-magenta/20" },
  Mobile: { bg: "bg-amethyst/10", text: "text-amethyst", border: "border-amethyst/20" },
};

const LEVEL_LABEL = { basic: "Basic", intermediate: "Intermediate", advanced: "Advanced", enterprise: "Enterprise" };
const LEVEL_COLOR = {
  basic: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-orange-100 text-orange-700",
  enterprise: "bg-purple-100 text-purple-700",
};

export default function LibraryCard({ item, index, onClick }) {
  const style = KATEGORI_STYLE[item.kategori] || KATEGORI_STYLE.Backend;

  return (
    <motion.button
      onClick={() => onClick(item)}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.03, 0.4) }}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 flex flex-col text-left w-full"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-1 rounded-full ${style.bg} ${style.text} text-[10px] font-bold uppercase tracking-wide`}>
            {item.kategori}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${LEVEL_COLOR[item.level]}`}>
            {LEVEL_LABEL[item.level]}
          </span>
        </div>
        <h3 className="text-base font-bold text-navy leading-tight mb-1">{item.nama_awam}</h3>
        <p className="text-xs font-medium text-muted-foreground mb-2">{item.nama_teknis}</p>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3 line-clamp-2">{item.fungsi}</p>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400" />
            {"★".repeat(item.tingkat_kesulitan || 3)}{"☆".repeat(5 - (item.tingkat_kesulitan || 3))}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {item.estimasi_development}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="flex items-center gap-1 text-xs font-semibold text-navy">
            <Wallet className="w-3.5 h-3.5 text-magenta" /> {item.estimasi_biaya}
          </span>
          <span className={`flex items-center gap-1 text-xs font-medium ${style.text} group-hover:gap-2 transition-all`}>
            Detail <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}