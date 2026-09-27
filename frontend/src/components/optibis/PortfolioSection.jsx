import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSafeNav } from "@/hooks/useSafeNav";
import { getAllPortfolios } from "@/data/portfolio";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const FILTERS = ["Semua", "Digital Asset", "Website", "Growth Team"];

const PORTFOLIO_ITEMS = getAllPortfolios().map((p) => ({
  slug: p.slug, name: p.name, industry: p.industry, pilar: p.pilar, desc: p.ringkasan, thumbnail: p.thumbnail,
}));

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const nav = useSafeNav();
  const { tr } = useLanguage();

  const filtered = activeFilter === "Semua"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((p) => p.pilar.includes(activeFilter));

  return (
    <section className="py-14 lg:py-20 bg-white" id="portofolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Portofolio Proyek" title="Lihat Hasil Pekerjaan Kami" description="Portofolio pilihan dari berbagai industri dan layanan yang telah kami kerjakan." className="mb-12" />

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === f
                  ? "bg-navy text-white shadow-lg"
                  : "bg-gray-100 text-navy-300 hover:bg-gray-200"
              }`}
            >
              {tr(f)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <Link
              key={p.slug}
              to={`/portofolio/${p.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="h-44 overflow-hidden relative">
                <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{p.industry}</span>
                </div>
                <h3 className="text-base font-bold text-navy mb-1 group-hover:text-magenta transition-colors">{p.name}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{tr(p.desc)}</p>
                <div className="flex flex-wrap gap-1">
                  {p.pilar.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-50 text-navy-300 border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" onClick={() => nav("#konsultasi")} className="rounded-full border-navy-100 text-navy font-semibold">
            {tr("Konsultasi Proyek")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
