import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import LibraryHero from "@/components/solution-library/LibraryHero";
import LibraryCard from "@/components/solution-library/LibraryCard";
import LibraryFilters from "@/components/solution-library/LibraryFilters";
import { SOLUTION_ITEMS, SOLUTION_CATEGORIES } from "@/data/solutionLibrary";
import { useSafeNav } from "@/hooks/useSafeNav";

export default function SolutionLibrary() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState("");
  const [activeJenis, setActiveJenis] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const gridRef = useRef(null);
  const nav = useSafeNav();

  const filtered = useMemo(() => {
    let result = SOLUTION_ITEMS.filter((item) => {
      const matchQuery =
        !query ||
        item.nama_awam.toLowerCase().includes(query.toLowerCase()) ||
        item.nama_teknis.toLowerCase().includes(query.toLowerCase()) ||
        item.fungsi.toLowerCase().includes(query.toLowerCase()) ||
        (item.kategori || "").toLowerCase().includes(query.toLowerCase());
      const matchCat = activeCategory === "all" || item.kategori === activeCategory;
      const matchLevel = !activeLevel || item.level === activeLevel;
      const matchJenis = !activeJenis || item.jenis === activeJenis;
      return matchQuery && matchCat && matchLevel && matchJenis;
    });

    if (sortBy === "nama") {
      result = [...result].sort((a, b) => a.nama_awam.localeCompare(b.nama_awam));
    } else if (sortBy === "level") {
      const order = { basic: 1, intermediate: 2, advanced: 3, enterprise: 4 };
      result = [...result].sort((a, b) => (order[a.level] || 0) - (order[b.level] || 0));
    }
    return result;
  }, [query, activeCategory, activeLevel, activeJenis, sortBy]);

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCardClick = (item) => {
    nav(`/solution-library/${item.slug}`);
  };

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("all");
    setActiveLevel("");
    setActiveJenis("");
    setSortBy("relevance");
  };

  const QUICK_CATS = [
    { label: "Website", icon: "🌐" },
    { label: "E-Commerce", icon: "🛒" },
    { label: "ERP", icon: "🏢" },
    { label: "CRM", icon: "👥" },
    { label: "HRIS", icon: "💼" },
    { label: "POS", icon: "🧾" },
    { label: "Booking", icon: "📅" },
    { label: "Payment", icon: "💳" },
    { label: "AI Chatbot", icon: "🤖" },
    { label: "Login System", icon: "🔐" },
    { label: "Cloud Hosting", icon: "☁️" },
    { label: "Database", icon: "🗄️" },
  ];

  return (
    <PillarLayout>
      <LibraryHero query={query} setQuery={setQuery} onExplore={scrollToGrid} />

      {/* Quick Category Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2">Jelajahi Kategori</h2>
            <p className="text-sm text-muted-foreground">Pilih topik yang ingin Anda pelajari</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {QUICK_CATS.map((cat, i) => (
              <motion.button
                key={cat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                onClick={() => {
                  setQuery(cat.label);
                  scrollToGrid();
                }}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-magenta/30 hover:bg-magenta-50/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50"
              >
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                <span className="text-xs font-medium text-navy text-center leading-tight">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main: Filters + Grid */}
      <section ref={gridRef} className="py-12 lg:py-16 bg-slate-50/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <LibraryFilters
                  categories={SOLUTION_CATEGORIES}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  activeLevel={activeLevel}
                  setActiveLevel={setActiveLevel}
                  activeJenis={activeJenis}
                  setActiveJenis={setActiveJenis}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onReset={resetFilters}
                  resultCount={filtered.length}
                />
              </div>
            </aside>

            {/* Grid */}
            <div>
              {filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
                  <p className="text-4xl mb-4">🔍</p>
                  <h3 className="text-lg font-bold text-navy mb-2">Tidak ada hasil</h3>
                  <p className="text-sm text-muted-foreground mb-4">Coba ubah filter atau kata kunci pencarian</p>
                  <Button onClick={resetFilters} variant="outline" className="rounded-full">
                    Reset Filter
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((item, i) => (
                    <LibraryCard key={item.slug} item={item} index={i} onClick={handleCardClick} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-navy via-navy-400 to-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(233,30,99,0.15),transparent_60%)]" />
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            Masih Bingung Menentukan Fitur?
          </h2>
          <p className="text-white/70 mb-8">
            Gunakan Feature Planner kami. Konsultasikan kebutuhan Anda dan dapatkan estimasi yang tepat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Button
              onClick={() => nav("#konsultasi")}
              className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 shadow-xl shadow-magenta/30 w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              Konsultasi Gratis <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a
              href="https://wa.me/6287772577020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" /> Chat WhatsApp
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
            {["Konsultasi Gratis", "Minta Proposal", "Estimasi Harga", "Download Checklist"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </PillarLayout>
  );
}
