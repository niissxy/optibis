import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, MessageCircle, Package, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import MarketingKitCard from "@/components/marketing-kit/MarketingKitCard";
import MarketingKitPreview from "@/components/marketing-kit/MarketingKitPreview";
import MarketingKitDownloadGate from "@/components/marketing-kit/MarketingKitDownloadGate";
import { MARKETING_KIT_ITEMS, MARKETING_KIT_CATEGORIES } from "@/data/marketingKit";
import { useSafeNav } from "@/hooks/useSafeNav";

const AKSES_FILTERS = [
  { value: "", label: "Semua Akses" },
  { value: "Free Download", label: "Gratis" },
  { value: "Login Required", label: "Login" },
  { value: "Member Only", label: "Member" },
  { value: "Premium Member", label: "Premium" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Terpopuler" },
  { value: "newest", label: "Terbaru" },
  { value: "nama", label: "Nama (A-Z)" },
];

const BADGE_FILTERS = [
  { value: "", label: "Semua" },
  { value: "New", label: "New" },
  { value: "Popular", label: "Popular" },
  { value: "Premium", label: "Premium" },
];

export default function MarketingKit() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeAkses, setActiveAkses] = useState("");
  const [activeBadge, setActiveBadge] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [previewItem, setPreviewItem] = useState(null);
  const [downloadItem, setDownloadItem] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const nav = useSafeNav();

  const filtered = useMemo(() => {
    let result = MARKETING_KIT_ITEMS.filter((item) => {
      const matchQuery =
        !query ||
        item.nama_asset.toLowerCase().includes(query.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(query.toLowerCase()) ||
        (item.subkategori || "").toLowerCase().includes(query.toLowerCase());
      const matchCat = activeCategory === "all" || item.kategori === activeCategory;
      const matchAkses = !activeAkses || item.akses_tipe === activeAkses;
      const matchBadge = !activeBadge || item.badge === activeBadge;
      return matchQuery && matchCat && matchAkses && matchBadge;
    });

    if (sortBy === "popular") {
      result = [...result].sort((a, b) => b.download_count - a.download_count);
    } else if (sortBy === "nama") {
      result = [...result].sort((a, b) => a.nama_asset.localeCompare(b.nama_asset));
    } else if (sortBy === "newest") {
      result = [...result].sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
    }
    return result;
  }, [query, activeCategory, activeAkses, activeBadge, sortBy]);

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("all");
    setActiveAkses("");
    setActiveBadge("");
    setSortBy("popular");
  };

  const FilterPanel = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-magenta" /> Filter
        </h3>
        <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-magenta transition-colors flex items-center gap-1">
          <X className="w-3 h-3" /> Reset
        </button>
      </div>
      <div className="text-xs text-muted-foreground">{filtered.length} asset ditemukan</div>

      <div>
        <p className="text-xs font-semibold text-navy mb-2 uppercase tracking-wide">Kategori</p>
        <div className="flex flex-col gap-1">
          {MARKETING_KIT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? "all" : cat.id)}
              className={`text-left px-3 py-1.5 text-xs rounded-lg transition-all duration-200 ${
                activeCategory === cat.id ? "bg-magenta text-white font-medium shadow-sm" : "text-navy-400 hover:bg-magenta-50 hover:text-magenta"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-navy mb-2 uppercase tracking-wide">Akses</p>
        <div className="flex flex-col gap-1">
          {AKSES_FILTERS.map((ak) => (
            <button
              key={ak.value}
              onClick={() => setActiveAkses(activeAkses === ak.value ? "" : ak.value)}
              className={`text-left px-3 py-1.5 text-xs rounded-lg transition-all duration-200 ${
                activeAkses === ak.value ? "bg-navy text-white font-medium" : "text-navy-400 hover:bg-navy/5 hover:text-navy"
              }`}
            >
              {ak.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-navy mb-2 uppercase tracking-wide">Badge</p>
        <div className="flex flex-wrap gap-1.5">
          {BADGE_FILTERS.map((bd) => (
            <button
              key={bd.value}
              onClick={() => setActiveBadge(activeBadge === bd.value ? "" : bd.value)}
              className={`px-2.5 py-1 text-[11px] rounded-full border transition-all duration-200 ${
                activeBadge === bd.value ? "bg-amethyst text-white border-amethyst" : "bg-white text-navy-400 border-gray-200 hover:border-amethyst hover:text-amethyst"
              }`}
            >
              {bd.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-navy mb-2 uppercase tracking-wide">Urutkan</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-navy bg-white outline-none focus:border-magenta cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <PillarLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-400 to-navy text-white py-12 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(233,30,99,0.15),transparent_60%)]" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-magenta/10 rounded-full blur-3xl"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-medium mb-5"
          >
            <Package className="w-3.5 h-3.5 text-magenta-200" /> Digital Asset Center & Lead Hub
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
          >
            Marketing Kit Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm lg:text-base text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Pusat materi promosi resmi Optibis. Preview gratis untuk semua, download dengan login untuk file resolusi tinggi.
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
                placeholder="Cari asset... (company profile, katalog, ebook, logo)"
                className="flex-1 bg-transparent border-0 outline-none text-sm text-navy placeholder:text-muted-foreground/70 py-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden w-full flex items-center justify-center gap-2 mb-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-navy"
          >
            <SlidersHorizontal className="w-4 h-4 text-magenta" /> {mobileFilterOpen ? "Tutup Filter" : "Buka Filter"}
          </button>

          <div className="grid lg:grid-cols-[260px_1fr] gap-8">
            <aside className={`${mobileFilterOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-24 lg:self-start`}>
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <FilterPanel />
              </div>
            </aside>

            <div>
              {/* Mobile inline filter */}
              <div className={`${mobileFilterOpen ? "block" : "hidden"} lg:hidden mb-4`}>
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <FilterPanel />
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
                  <p className="text-4xl mb-4">🔍</p>
                  <h3 className="text-lg font-bold text-navy mb-2">Asset tidak ditemukan</h3>
                  <p className="text-sm text-muted-foreground mb-4">Coba ubah filter atau kata kunci</p>
                  <Button onClick={resetFilters} variant="outline" className="rounded-full">Reset Filter</Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((item, i) => (
                    <MarketingKitCard
                      key={item.slug}
                      item={item}
                      index={i}
                      onPreview={setPreviewItem}
                      onDownload={setDownloadItem}
                    />
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
            Butuh Materi Custom untuk Bisnis Anda?
          </h2>
          <p className="text-white/70 mb-8">
            Tim desain kami siap membuat materi promosi yang sesuai dengan brand dan kebutuhan Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => nav("#konsultasi")}
              className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 shadow-xl shadow-magenta/30 w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              Request Custom Design <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
        </div>
      </section>

      <MarketingKitPreview item={previewItem} onClose={() => setPreviewItem(null)} onDownload={setDownloadItem} />
      <MarketingKitDownloadGate item={downloadItem} onClose={() => setDownloadItem(null)} />
    </PillarLayout>
  );
}
