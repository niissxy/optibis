import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid, Layout, Briefcase, ShoppingCart, Server, AppWindow, Smartphone, Monitor, PenTool, ExternalLink, ChevronRight } from "lucide-react";
import { usePortfolios } from "@/hooks/usePortfolios";

const BASE_CATEGORIES = [
  { id: "all", label: "Semua Proyek", icon: LayoutGrid },
  { id: "company-profile", label: "Website Company Profile", icon: Layout },
  { id: "website-bisnis", label: "Website Bisnis", icon: Briefcase },
  { id: "e-commerce", label: "E-Commerce", icon: ShoppingCart },
  { id: "sistem-informasi", label: "Sistem Informasi", icon: Server },
  { id: "aplikasi-web", label: "Aplikasi Web", icon: AppWindow },
  { id: "aplikasi-mobile", label: "Aplikasi Mobile", icon: Smartphone },
  { id: "landing-page", label: "Landing Page", icon: Monitor },
  { id: "redesign", label: "Redesign", icon: PenTool },
];

const FALLBACK_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80";

export default function PortfolioGallery() {
  const { portfolios: projects, loading } = usePortfolios();
  const [activeCategory, setActiveCategory] = useState("all");

  const categoriesWithCounts = useMemo(() => {
    return BASE_CATEGORIES.map((cat) => {
      let count = 0;
      if (cat.id === "all") {
        count = projects.length;
      } else {
        count = projects.filter((p) => {
          const cSlug = p.categorySlug || "";
          const ind = (p.industry || "").toLowerCase();
          const catLabel = cat.label.toLowerCase();
          return cSlug === cat.id || ind.includes(catLabel) || ind.includes(cat.id.replace("-", " "));
        }).length;
      }
      return { ...cat, count };
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => {
      const cSlug = p.categorySlug || "";
      const ind = (p.industry || "").toLowerCase();
      const currentCat = BASE_CATEGORIES.find((c) => c.id === activeCategory);
      const catLabel = currentCat ? currentCat.label.toLowerCase() : "";
      return cSlug === activeCategory || ind.includes(catLabel) || ind.includes(activeCategory.replace("-", " "));
    });
  }, [projects, activeCategory]);

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-x-clip" id="portfolio-gallery">
      {/* Decorative background elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-magenta/10 to-transparent rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-bl from-pink-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-magenta-50 text-magenta text-xs font-bold tracking-widest uppercase mb-4 mx-auto lg:mx-0">
              PORTOFOLIO
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-4">
              Hasil Nyata, <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta to-orange-400">Kepuasan Sebenarnya</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Berbagai proyek website, aplikasi, dan sistem yang telah kami kembangkan untuk membantu bisnis tumbuh di era digital.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 self-start">
            <h3 className="text-xl font-bold text-navy mb-6">Kategori Proyek</h3>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide lg:mx-0 lg:flex-col lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0">
              {categoriesWithCounts.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`group flex shrink-0 items-center px-4 py-3 rounded-xl transition-all duration-200 lg:w-full ${
                      isActive 
                        ? "bg-magenta-50 text-magenta shadow-sm font-bold" 
                        : "text-navy-400 hover:bg-gray-50 hover:text-navy dark:hover:!bg-magenta/20 dark:hover:!text-white font-medium"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-magenta" : "text-gray-400 dark:group-hover:text-magenta"}`} />
                    <span className="text-sm flex-1 text-left">{cat.label}</span>
                    <span className={`text-xs font-bold mr-2 ${isActive ? "text-magenta" : "text-gray-400 dark:group-hover:text-magenta"}`}>
                      {cat.count}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? "text-magenta" : "text-gray-300 dark:group-hover:text-magenta"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.slug || project.id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 p-3">
                    <div className="absolute top-5 left-5 z-10">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-magenta text-xs font-bold rounded-full shadow-sm">
                        {project.badge || "Website"}
                      </span>
                    </div>
                    <img
                      src={project.image || project.thumbnail || FALLBACK_IMG}
                      alt={project.title || project.name}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-extrabold text-navy mb-1 group-hover:text-magenta transition-colors">
                      <Link to={`/portofolio/${project.slug}`}>
                        {project.title || project.name}
                      </Link>
                    </h3>
                    <div className="text-xs font-semibold text-gray-400 mb-3">
                      {project.categoryLabel || project.industry || "Website Company Profile"}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                      {project.desc || project.ringkasan}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                      <Link
                        to={`/portofolio/${project.slug}`}
                        className="text-sm font-bold text-navy hover:text-magenta group-hover:text-magenta transition-colors inline-flex items-center"
                      >
                        Lihat Detail <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>

                      {project.website_url && project.website_url !== "#" ? (
                        <a
                          href={project.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Kunjungi ${project.title || project.name}`}
                          className="w-8 h-8 rounded-full bg-magenta-50 flex items-center justify-center text-magenta hover:bg-magenta hover:text-white transition-all shadow-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link
                          to={`/portofolio/${project.slug}`}
                          title={`Lihat detail ${project.title || project.name}`}
                          className="w-8 h-8 rounded-full bg-magenta-50 flex items-center justify-center text-magenta hover:bg-magenta hover:text-white transition-all shadow-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-navy font-semibold">Belum ada proyek di kategori ini.</p>
              </div>
            )}
          </div>
          
        </div>
        
        <div className="mt-16 text-center border-t border-gray-100 pt-8">
          <p className="text-sm text-gray-400 italic">"Setiap proyek adalah cerita baru tentang kepercayaan dan hasil nyata."</p>
        </div>
        
      </div>
    </section>
  );
}
