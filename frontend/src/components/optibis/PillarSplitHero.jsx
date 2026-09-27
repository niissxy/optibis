import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSafeNav } from "@/hooks/useSafeNav";

export default function PillarSplitHero({ 
  badgeIcon: BadgeIcon = Layers,
  badgeText,
  titlePrefix,
  titleHighlight,
  description,
  imageSrc,
  color = "magenta",
  imageContainerClassName = ""
}) {
  const nav = useSafeNav();

  const colorStyles = {
    magenta: { text: "text-magenta", bg: "bg-magenta", hover: "hover:bg-magenta-600", lightBg: "bg-magenta-50" },
    amethyst: { text: "text-amethyst", bg: "bg-amethyst", hover: "hover:bg-amethyst-600", lightBg: "bg-amethyst-50" },
    navy: { text: "text-navy", bg: "bg-navy", hover: "hover:bg-navy-800", lightBg: "bg-navy-50" }
  }[color];

  return (
    <section className="relative pt-12 pb-12 lg:pt-20 lg:pb-20 overflow-hidden bg-gradient-to-br from-white to-slate-50/50">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-navy transition-colors mb-8 lg:mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${colorStyles.lightBg} ${colorStyles.text} text-xs font-bold tracking-wider uppercase mb-6`}>
              <BadgeIcon className="w-3.5 h-3.5" />
              {badgeText}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-navy leading-[1.15] tracking-tight mb-6">
              {titlePrefix}
              <span className={`block mt-1 ${colorStyles.text}`}>{titleHighlight}</span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button onClick={() => nav("#konsultasi")} className={`${colorStyles.bg} ${colorStyles.hover} text-white rounded-full px-8 h-12 shadow-lg shadow-${color}/20 w-full sm:w-auto transition-all`}>
                Konsultasi Sekarang <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => nav("#portofolio")} className="rounded-full px-8 h-12 w-full sm:w-auto border-gray-200 text-navy hover:bg-gray-50 transition-all">
                Lihat Portofolio
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex justify-center w-full items-center"
          >
            <div className={`rounded-2xl overflow-hidden shadow-2xl relative bg-white border border-gray-100 p-2 w-full ${imageContainerClassName}`}>
              <img 
                src={imageSrc} 
                alt={titleHighlight} 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
