import React, { useState } from "react";
import { ArrowRight, LayoutGrid, Layout, Briefcase, ShoppingCart, Server, AppWindow, Smartphone, Monitor, PenTool, ExternalLink, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Semua Proyek", count: 12, icon: LayoutGrid },
  { id: "company-profile", label: "Website Company Profile", count: 4, icon: Layout },
  { id: "website-bisnis", label: "Website Bisnis", count: 3, icon: Briefcase },
  { id: "e-commerce", label: "E-Commerce", count: 2, icon: ShoppingCart },
  { id: "sistem-informasi", label: "Sistem Informasi", count: 2, icon: Server },
  { id: "aplikasi-web", label: "Aplikasi Web", count: 2, icon: AppWindow },
  { id: "aplikasi-mobile", label: "Aplikasi Mobile", count: 1, icon: Smartphone },
  { id: "landing-page", label: "Landing Page", count: 2, icon: Monitor },
  { id: "redesign", label: "Redesign", count: 1, icon: PenTool },
];

const PROJECTS = [
  {
    id: 1,
    title: "Smart GPS Tracker",
    category: "company-profile",
    categoryLabel: "Website Company Profile",
    badge: "Website",
    desc: "Website untuk layanan pelacakan kendaraan dengan fitur real-time tracking.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    url: "#"
  },
  {
    id: 2,
    title: "Muli Property",
    category: "website-bisnis",
    categoryLabel: "Website Bisnis",
    badge: "Website",
    desc: "Website properti modern dengan tampilan elegan dan fitur pencarian advanced.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    url: "#"
  },
  {
    id: 3,
    title: "Wisata Di Bali",
    category: "website-bisnis",
    categoryLabel: "Website Bisnis",
    badge: "Website",
    desc: "Portal informasi wisata Bali dengan desain atraktif dan responsif.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    url: "#"
  },
  {
    id: 4,
    title: "WisataGo",
    category: "aplikasi-mobile",
    categoryLabel: "Aplikasi Mobile",
    badge: "Aplikasi Mobile",
    desc: "Aplikasi mobile untuk eksplorasi destinasi wisata terbaik di Indonesia.",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80",
    url: "#"
  },
  {
    id: 5,
    title: "Hidroponik ID",
    category: "e-commerce",
    categoryLabel: "E-Commerce",
    badge: "E-Commerce",
    desc: "Toko online perlengkapan hidroponik dengan sistem pembelian yang mudah.",
    image: "https://images.unsplash.com/photo-1530836369250-ef71a3a5e4fd?w=600&q=80",
    url: "#"
  },
  {
    id: 6,
    title: "Contech ID",
    category: "landing-page",
    categoryLabel: "Landing Page",
    badge: "Landing Page",
    desc: "Landing page modern untuk layanan digital dan pengembangan software.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    url: "#"
  }
];

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = PROJECTS.filter(p => activeCategory === "all" || p.category === activeCategory);

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-x-clip">
      {/* Decorative background elements matching the image */}
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
            <div className="flex flex-col space-y-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? "bg-magenta-50 text-magenta shadow-sm" 
                        : "text-navy-400 hover:bg-gray-50 hover:text-navy"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-magenta" : "text-gray-400"}`} />
                    <span className="font-semibold text-sm flex-1 text-left">{cat.label}</span>
                    <span className={`text-xs font-bold mr-2 ${isActive ? "text-magenta" : "text-gray-400"}`}>
                      {cat.count}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? "text-magenta" : "text-gray-300"}`} />
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
                    key={project.id}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 p-3">
                      <div className="absolute top-5 left-5 z-10">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-magenta text-xs font-bold rounded-full shadow-sm">
                          {project.badge}
                        </span>
                      </div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-extrabold text-navy mb-1 group-hover:text-magenta transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-xs font-semibold text-gray-400 mb-3">
                        {project.categoryLabel}
                      </div>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                        {project.desc}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                        <span className="text-sm font-bold text-navy group-hover:text-magenta transition-colors inline-flex items-center">
                          Lihat Detail <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                        <div className="w-8 h-8 rounded-full bg-magenta-50 flex items-center justify-center text-magenta group-hover:bg-magenta group-hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </div>
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
