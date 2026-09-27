import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Tag, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORY_LABELS = {
  finance: "Finance & Akuntansi",
  business: "Bisnis & ERP",
  travel: "Travel & Pariwisata",
  hr: "HR & Rekrutmen",
  muslim: "Muslim & Islami",
  ai: "AI & Konten",
  marketing: "Marketing & Sales",
  productivity: "Produktivitas",
  education: "Pendidikan",
  other: "Lainnya",
};

export default function ToolDetailModal({ tool, onClose }) {
  useEffect(() => {
    if (tool) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [tool]);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {tool && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
          >
            {/* Banner Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl">
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-navy hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magenta text-white text-xs font-bold mb-2">
                  <Tag className="w-3 h-3" />
                  {CATEGORY_LABELS[tool.category] || "Lainnya"}
                </span>
                <h2 className="text-2xl font-extrabold text-white leading-tight">{tool.name}</h2>
                <p className="text-white/80 text-sm mt-0.5">{tool.tagline}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* URL */}
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground truncate">{tool.url}</span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Tentang Platform</h3>
                <p className="text-sm text-navy leading-relaxed">{tool.description}</p>
              </div>

              {/* CTA */}
              <div className="pt-2 border-t border-gray-100">
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full h-11 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 group">
                    Kunjungi Platform
                    <ExternalLink className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}