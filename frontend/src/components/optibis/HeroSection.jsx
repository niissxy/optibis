import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Globe, LayoutGrid, BarChart2, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";


const HERO_IMG = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000";

export default function HeroSection() {
  const nav = useSafeNav();
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white pb-16 pt-24 transition-colors duration-300 dark:from-navy-900 dark:via-navy-800 dark:to-navy-700 lg:pb-24 lg:pt-32">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-magenta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amethyst/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-magenta/10 px-3 py-1 mb-6" aria-hidden="true">
              <Sparkles className="w-3.5 h-3.5 text-magenta" />
              <span className="text-xs font-bold text-magenta tracking-wide">DIGITAL SOLUTION PARTNER</span>
            </div>

            <h1 className="text-2xl font-semibold leading-[1.1] tracking-[-0.04em] text-navy sm:text-5xl lg:text-5xl">
              Satu Partner untuk Branding, <span className="text-magenta">Website</span> dan Pertumbuhan Digital <span className="text-violet-800">Bisnis Anda</span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-navy-300 sm:text-base lg:text-[1.05rem]">
              {tr("Optibis membantu bisnis tampil lebih profesional, mudah ditemukan, dan bertumbuh secara digital melalui solusi yang terintegrasi dan mudah dipahami.")}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={() => nav("#konsultasi")}
                size="lg"
                className="h-12 rounded-full bg-magenta px-8 text-sm font-semibold text-white shadow-lg shadow-magenta/20 transition-all duration-300 hover:scale-105 hover:bg-magenta-500 hover:shadow-xl active:scale-95 group"
              >
                {tr("Konsultasi Gratis")}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => nav("#pilar")}
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-gray-200 px-8 text-sm font-semibold text-navy transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:bg-gray-50 active:scale-95 dark:border-white/25 dark:text-white dark:hover:bg-white/10 shadow-sm"
              >
                {tr("Lihat Semua Solusi")}
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 rounded-full bg-magenta/10 px-3 py-2 w-full">
                <Sparkles className="w-3.5 h-3.5 text-magenta shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-magenta truncate">Branding lebih rapi</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 w-full">
                <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-blue-600 truncate">Website profesional</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2 w-full">
                <LayoutGrid className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-pink-600 truncate">Konten konsisten</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 w-full">
                <BarChart2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 truncate">Leads lebih tertata</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 w-full">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-amber-600 truncate">Performa dipantau</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-purple-50 px-3 py-2 w-full">
                <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="text-[10px] sm:text-xs font-semibold text-purple-600 truncate">Support lebih cepat</span>
              </div>
            </div>

          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full aspect-[4/3] lg:aspect-[16/10] flex items-center justify-center lg:ml-10 mt-10 lg:mt-0"
          >
            {/* Main Image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={HERO_IMG} 
                alt="Tim bekerja sama" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/5 mix-blend-multiply"></div>
            </div>

            {/* Badge: Proyek Selesai */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 lg:-top-6 lg:-right-6 bg-white rounded-xl shadow-xl p-3 sm:p-4 border border-gray-100 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] z-10"
            >
              <span className="text-[9px] sm:text-[10px] text-muted-foreground font-medium mb-1">Proyek Selesai</span>
              <span className="text-lg sm:text-xl font-bold text-navy">100+</span>
            </motion.div>

            {/* Badge: 50+ Klien */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-2 lg:-bottom-6 lg:-left-8 bg-white rounded-xl shadow-xl py-2 px-3 sm:py-3 sm:px-4 border border-gray-100 flex items-center gap-2 sm:gap-3 z-10"
            >
              <div className="flex -space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-magenta"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-amethyst"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-blue-500"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-pink-500"></div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-navy pr-1 sm:pr-2">50+ Klien</span>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
