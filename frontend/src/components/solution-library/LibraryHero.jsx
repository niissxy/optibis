import React from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LibraryHero({ query, setQuery, onExplore }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-400 to-navy text-white py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(233,30,99,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(156,39,176,0.15),transparent_60%)]" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-magenta/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-amethyst/10 rounded-full blur-3xl"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-medium mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-magenta-200" />
          Ensiklopedia Fitur Digital
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight"
        >
          Digital Solution Library
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base lg:text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Pelajari seluruh istilah, fitur, modul, struktur website, aplikasi, ERP, SaaS, AI, dan teknologi menggunakan bahasa yang mudah dipahami.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-xl mx-auto"
        >
          <div className="relative flex items-center gap-2 bg-white rounded-2xl p-2 shadow-2xl">
            <Search className="w-5 h-5 text-muted-foreground ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onExplore()}
              placeholder="Cari... (Login, CRM, ERP, Booking, Payment, AI, Dashboard, Hosting, API, SSL, Database, Cloud)"
              className="flex-1 bg-transparent border-0 outline-none text-sm text-navy placeholder:text-muted-foreground/70 py-2"
            />
            <Button
              onClick={onExplore}
              className="bg-magenta hover:bg-magenta-500 text-white rounded-xl px-5 h-10 font-semibold shrink-0 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Explore <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {["Login", "CRM", "ERP", "Payment", "AI Chatbot", "Hosting"].map((tag) => (
              <button
                key={tag}
                onClick={() => { setQuery(tag); onExplore(); }}
                className="px-3 py-1 text-xs font-medium text-white/70 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all duration-200 hover:text-white hover:scale-105"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-10 text-xs text-white/50"
        >
          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> 300+ Istilah</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Bahasa Awam</span>
          <span className="flex items-center gap-1.5"><ArrowRight className="w-3.5 h-3.5" /> Estimasi Biaya & Waktu</span>
        </motion.div>
      </div>
    </section>
  );
}