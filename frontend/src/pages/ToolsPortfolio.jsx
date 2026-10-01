import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Rocket, LayoutGrid, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import PillarLayout from "@/components/optibis/PillarLayout";
import ToolCard from "@/components/optibis/ToolCard";
import ToolDetailModal from "@/components/optibis/ToolDetailModal";
import FinalCTA from "@/components/optibis/FinalCTA";
import { TOOL_CATEGORIES } from "@/data/tools";
import { useTools } from "@/hooks/useTools";
import { useLanguage } from "@/lib/LanguageContext";
import { getBreadcrumbSchema } from "@/lib/seoData";

export default function ToolsPortfolio() {
  const { tools, loading } = useTools();
  const { tr } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState(null);

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const q = query.toLowerCase().trim();
      const matchesQuery = !q || (tool.name || "").toLowerCase().includes(q) || (tool.tagline || "").toLowerCase().includes(q) || (tool.description || "").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [tools, query, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts = { all: tools.length };
    TOOL_CATEGORIES.forEach((cat) => {
      if (cat.slug !== "all") {
        counts[cat.slug] = tools.filter((t) => t.category === cat.slug).length;
      }
    });
    return counts;
  }, [tools]);

  const activeCatName = TOOL_CATEGORIES.find((c) => c.slug === activeCategory)?.name || "Semua";

  const structuredData = [
    getBreadcrumbSchema([
      { name: "Beranda", url: "/" },
      { name: "Tools Portfolio", url: "/tools" },
    ]),
  ];

  return (
    <PillarLayout>
      <SEO
        title="Portofolio Tools & Platform Digital Bisnis"
        description="Eksplorasi koleksi tools, modul aplikasi, dan platform digital siap pakai yang dikembangkan oleh tim engineer Optibis untuk mendukung efisiensi bisnis."
        keywords="tools bisnis, platform digital indonesia, software bisnis umkm, aplikasi otomasi bisnis, kalkulator bisnis, tools optibis"
        canonicalUrl="https://optibis.id/tools"
        structuredData={structuredData}
      />
      {/* Hero */}
      <section className="relative py-12 lg:py-20 bg-gradient-to-br from-navy via-navy-400 to-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(233,30,99,0.15),transparent_60%)]" />
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
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta/20 backdrop-blur-sm text-magenta-100 text-xs font-bold mb-5"
          >
            <Rocket className="w-3.5 h-3.5" /> {tr("PORTOFOLIO TOOLS & PLATFORM")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
          >
            {tools.length}+ {tr("Tools & Platform Digital")} <br className="hidden sm:block" />{tr("Sudah Live & Deploy")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-base lg:text-lg max-w-2xl mx-auto mb-8"
          >
            {tr("Eksplorasi berbagai platform digital yang telah kami bangun dan deploy — dari finance, travel, HR, hingga AI dan konten.")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { label: tr("Tools Live"), value: `${tools.length}+` },
              { label: tr("Kategori"), value: `${TOOL_CATEGORIES.length - 1}` },
              { label: tr("Status"), value: "100% Deployed" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <div className="text-xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 lg:top-18 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tr("Cari tools atau platform digital...")}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50/50 text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:border-magenta focus:bg-white transition-colors"
              />
            </div>

            {/* Category Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
              {TOOL_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.slug
                      ? "bg-magenta text-white shadow-sm"
                      : "bg-gray-100 text-navy-400 hover:bg-gray-200 hover:text-navy"
                  }`}
                >
                  {tr(cat.name)} ({categoryCounts[cat.slug] || 0})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-navy">
              {tr(activeCatName)} <span className="text-sm font-normal text-muted-foreground">({filtered.length} {tr("Tools").toLowerCase()})</span>
            </h2>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-magenta hover:underline font-semibold"
              >
                {tr("Reset pencarian")}
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((tool, idx) => (
              <ToolCard
                key={tool.name || idx}
                tool={tool}
                index={idx}
                onClick={() => setSelectedTool(tool)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-1">{tr("Tools tidak ditemukan")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tr("Coba cari dengan kata kunci lain atau pilih kategori Semua.")}</p>
              <button
                onClick={() => { setQuery(""); setActiveCategory("all"); }}
                className="px-5 py-2 rounded-full bg-magenta text-white text-xs font-semibold"
              >
                {tr("Tampilkan Semua Tools")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedTool && (
        <ToolDetailModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}

      <FinalCTA />
    </PillarLayout>
  );
}
