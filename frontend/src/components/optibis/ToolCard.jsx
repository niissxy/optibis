import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Wallet, Building2, Plane, Users, Moon, Sparkles, Megaphone, Zap, GraduationCap, Package } from "lucide-react";

const CATEGORY_CONFIG = {
  finance: { icon: Wallet, bg: "bg-magenta/10", text: "text-magenta" },
  business: { icon: Building2, bg: "bg-navy/10", text: "text-navy" },
  travel: { icon: Plane, bg: "bg-amethyst/10", text: "text-amethyst" },
  hr: { icon: Users, bg: "bg-magenta/10", text: "text-magenta" },
  muslim: { icon: Moon, bg: "bg-navy/10", text: "text-navy" },
  ai: { icon: Sparkles, bg: "bg-amethyst/10", text: "text-amethyst" },
  marketing: { icon: Megaphone, bg: "bg-magenta/10", text: "text-magenta" },
  productivity: { icon: Zap, bg: "bg-navy/10", text: "text-navy" },
  education: { icon: GraduationCap, bg: "bg-amethyst/10", text: "text-amethyst" },
  other: { icon: Package, bg: "bg-navy/10", text: "text-navy" },
};

export default function ToolCard({ tool, index, onClick }) {
  const config = CATEGORY_CONFIG[tool.category] || CATEGORY_CONFIG.other;
  const Icon = config.icon;

  return (
    <motion.button
      onClick={() => onClick(tool)}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.02, 0.3) }}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 flex flex-col text-left w-full"
    >
      {/* Thumbnail */}
      <div className="relative h-28 overflow-hidden">
        <img
          src={tool.image}
          alt={tool.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
        <div className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`w-4 h-4 ${config.text}`} />
        </div>
        <ExternalLink className="absolute top-2.5 right-2.5 w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
      </div>
      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-bold text-navy leading-tight mb-1">{tool.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">{tool.tagline}</p>
      </div>
    </motion.button>
  );
}