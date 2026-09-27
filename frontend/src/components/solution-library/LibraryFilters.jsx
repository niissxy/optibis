import React from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LEVELS = [
  { value: "basic", label: "Basic" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "enterprise", label: "Enterprise" },
];

const JENIS = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Database" },
  { value: "api", label: "API" },
  { value: "ui", label: "UI" },
  { value: "ux", label: "UX" },
  { value: "business", label: "Business" },
  { value: "security", label: "Security" },
  { value: "cloud", label: "Cloud" },
  { value: "ai", label: "AI" },
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Paling Relevan" },
  { value: "nama", label: "Nama (A-Z)" },
  { value: "level", label: "Level" },
  { value: "biaya", label: "Estimasi Biaya" },
];

export default function LibraryFilters({
  categories,
  activeCategory,
  setActiveCategory,
  activeLevel,
  setActiveLevel,
  activeJenis,
  setActiveJenis,
  sortBy,
  setSortBy,
  onReset,
  resultCount,
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy flex items-center gap-2">
          <Filter className="w-4 h-4 text-magenta" /> Filter
        </h3>
        <button onClick={onReset} className="text-xs text-muted-foreground hover:text-magenta transition-colors flex items-center gap-1">
          <X className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="text-xs text-muted-foreground">{resultCount} hasil ditemukan</div>

      {/* Kategori */}
      <div>
        <p className="text-xs font-semibold text-navy mb-2 uppercase tracking-wide">Kategori</p>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? "all" : cat.id)}
              className={`text-left px-3 py-1.5 text-xs rounded-lg transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-magenta text-white font-medium shadow-sm"
                  : "text-navy-400 hover:bg-magenta-50 hover:text-magenta"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Level */}
      <div>
        <p className="text-xs font-semibold text-navy mb-2 uppercase tracking-wide">Level</p>
        <div className="flex flex-wrap gap-1.5">
          {LEVELS.map((lvl) => (
            <button
              key={lvl.value}
              onClick={() => setActiveLevel(activeLevel === lvl.value ? "" : lvl.value)}
              className={`px-2.5 py-1 text-[11px] rounded-full border transition-all duration-200 ${
                activeLevel === lvl.value
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy-400 border-gray-200 hover:border-navy hover:text-navy"
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Jenis */}
      <div>
        <p className="text-xs font-semibold text-navy mb-2 uppercase tracking-wide">Jenis</p>
        <div className="flex flex-wrap gap-1.5">
          {JENIS.map((jns) => (
            <button
              key={jns.value}
              onClick={() => setActiveJenis(activeJenis === jns.value ? "" : jns.value)}
              className={`px-2.5 py-1 text-[11px] rounded-full border transition-all duration-200 ${
                activeJenis === jns.value
                  ? "bg-amethyst text-white border-amethyst"
                  : "bg-white text-navy-400 border-gray-200 hover:border-amethyst hover:text-amethyst"
              }`}
            >
              {jns.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-navy mb-2 uppercase tracking-wide">Urutkan</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-navy bg-white outline-none focus:border-magenta transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}