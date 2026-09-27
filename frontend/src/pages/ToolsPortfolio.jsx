import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Rocket, LayoutGrid, ArrowRight } from "lucide-react";
import PillarLayout from "@/components/optibis/PillarLayout";
import ToolCard from "@/components/optibis/ToolCard";
import ToolDetailModal from "@/components/optibis/ToolDetailModal";
import FinalCTA from "@/components/optibis/FinalCTA";
import { TOOLS, TOOL_CATEGORIES, getToolImage } from "@/data/tools";

const TOOLS_WITH_IMAGES = TOOLS.map((t) => ({ ...t, image: getToolImage(t) }));

export default function ToolsPortfolio() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState(null);

  const filtered = useMemo(() => {
    return TOOLS_WITH_IMAGES.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const q = query.toLowerCase().trim();
      const matchesQuery = !q || tool.name.toLowerCase().includes(q) || tool.tagline.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts = { all: TOOLS.length };
    TOOL_CATEGORIES.forEach((cat) => {
      if (cat.slug !== "all") {
        counts[cat.slug] = TOOLS.filter((t) => t.category === cat.slug).length;
      }
    });
    return counts;
  }, []);

  const activeCatName = TOOL_CATEGORIES.find((c) => c.slug === activeCategory)?.name || "Semua";

  return (
    <PillarLayout>
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
            <Rocket className="w-3.5 h-3.5" /> PORTOFOLIO TOOLS & PLATFORM
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
          >
            {TOOLS.length}+ Tools & Platform Digital <br className="hidden sm:block" />Sudah Live & Deploy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-base lg:text-lg max-w-2xl mx-auto mb-8"
          >
            Eksplorasi berbagai platform digital yang telah kami bangun dan deploy — dari finance, travel, HR, hingga AI dan konten.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { label: "Tools Live", value: `${TOOLS.length}+` },
              { label: "Kategori", value: `${TOOL_CATEGORIES.length - 1}` },
              { label: "Status", value: "100% Deployed" },
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
            <div className="relative flex-1 lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari tools..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-10 rounded-lg border border-gray-200 bg-gray-50 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:border-magenta focus:bg-white transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 lg:pb-0">
              {TOOL_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat.slug
                      ? "bg-magenta text-white shadow-md shadow-magenta/20"
                      : "bg-gray-100 text-navy-300 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                  <span className={`ml-1.5 ${activeCategory === cat.slug ? "opacity-70" : "opacity-50"}`}>
                    {categoryCounts[cat.slug] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <section className="py-10 lg:py-14 bg-slate-50/50 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground mb-6">
            Menampilkan <span className="font-bold text-navy">{filtered.length}</span> tools
            {activeCategory !== "all" && ` dalam kategori "${activeCatName}"`}
            {query && ` untuk pencarian "${query}"`}
          </p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((tool, i) => (
                <ToolCard key={tool.url} tool={tool} index={i} onClick={setSelectedTool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-lg font-bold text-navy mb-2">Tidak ada tools ditemukan</p>
              <p className="text-sm text-muted-foreground mb-4">Coba kata kunci atau kategori lain.</p>
              <button
                onClick={() => { setQuery(""); setActiveCategory("all"); }}
                className="text-sm font-semibold text-magenta hover:underline"
              >
                Reset filter
              </button>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
      <ToolDetailModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </PillarLayout>
  );
}
