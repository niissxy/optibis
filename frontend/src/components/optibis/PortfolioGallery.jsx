import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  LayoutGrid,
  Layout,
  Briefcase,
  ShoppingCart,
  Server,
  AppWindow,
  Smartphone,
  Monitor,
  PenTool,
  ExternalLink,
  ChevronRight,
  Palette,
  Sparkles,
  Printer,
  Image as ImageIcon,
  Share2,
  Layers,
  FileText,
} from "lucide-react";
import { usePortfolios } from "@/hooks/usePortfolios";
import { useLanguage } from "@/lib/LanguageContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
const FALLBACK_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80";

const ICON_MAP = {
  LayoutGrid,
  Layout,
  Briefcase,
  ShoppingCart,
  Server,
  AppWindow,
  Smartphone,
  Monitor,
  PenTool,
  Palette,
  Sparkles,
  Printer,
  Image: ImageIcon,
  Share2,
  Layers,
  FileText,
};

function resolveIcon(iconName, defaultIcon = LayoutGrid) {
  if (!iconName) return defaultIcon;
  if (typeof iconName === "function" || typeof iconName === "object") return iconName;
  return ICON_MAP[iconName] || defaultIcon;
}

const DEFAULT_PROJECT_CATS = [
  { id: "all-projects", label: "Semua Proyek", icon: LayoutGrid, type: "project" },
  { id: "company-profile", label: "Website Company Profile", icon: Layout, type: "project" },
  { id: "website-bisnis", label: "Website Bisnis", icon: Briefcase, type: "project" },
  { id: "e-commerce", label: "E-Commerce", icon: ShoppingCart, type: "project" },
  { id: "sistem-informasi", label: "Sistem Informasi", icon: Server, type: "project" },
  { id: "aplikasi-web", label: "Aplikasi Web", icon: AppWindow, type: "project" },
  { id: "aplikasi-mobile", label: "Aplikasi Mobile", icon: Smartphone, type: "project" },
  { id: "landing-page", label: "Landing Page", icon: Monitor, type: "project" },
  { id: "redesign", label: "Redesign", icon: PenTool, type: "project" },
];

const DEFAULT_DIGITAL_ASSET_CATS = [
  { id: "all-digital-assets", label: "Semua Digital Asset", icon: Sparkles, type: "digital-asset" },
  { id: "logo-brand", label: "Logo Brand", icon: Palette, type: "digital-asset" },
  { id: "desain-sosial-media", label: "Desain Sosial Media", icon: Sparkles, type: "digital-asset" },
  { id: "marketing-kit-cetak", label: "Marketing Kit & Cetak", icon: Printer, type: "digital-asset" },
  { id: "banner-promosi", label: "Banner & Promosi", icon: ImageIcon, type: "digital-asset" },
];

function isDigitalAssetProject(project, digitalAssetCategoryIds, digitalAssetCategoryLabels) {
  const cSlug = (project.categorySlug || "").toLowerCase();
  const ind = (project.industry || project.category || project.categoryLabel || "").toLowerCase();
  const pilar = Array.isArray(project.pilar) ? project.pilar : [];
  const badge = (project.badge || "").toLowerCase();

  if (badge.includes("digital asset") || badge.includes("asset")) return true;
  if (digitalAssetCategoryIds.some((id) => cSlug === id || cSlug.includes(id))) return true;
  if (digitalAssetCategoryLabels.some((l) => ind.includes(l.toLowerCase()))) return true;
  if (pilar.includes("Digital Asset") && !pilar.includes("Website") && !pilar.includes("Software & Sistem Bisnis")) {
    return true;
  }
  return false;
}

export default function PortfolioGallery() {
  const { portfolios: projects, loading } = usePortfolios();
  const { tr } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all-projects");
  const [mobileTab, setMobileTab] = useState("project"); // 'project' | 'digital-asset'

  const [projectCats, setProjectCats] = useState(DEFAULT_PROJECT_CATS);
  const [digitalAssetCats, setDigitalAssetCats] = useState(DEFAULT_DIGITAL_ASSET_CATS);

  useEffect(() => {
    fetch(`${API}/modules/portfolio-categories`)
      .then((res) => (res.ok ? res.json() : []))
      .then((items) => {
        if (!Array.isArray(items)) return;
        const published = items.filter((item) => item.is_published);
        const remoteProjects = [];
        const remoteDigitalAssets = [];

        published.forEach((item) => {
          const type = item.summary || item.data?.type || "project";
          const id = item.slug.replace(/^portfolio-category-/, "");
          const catObj = {
            id,
            label: item.title,
            icon: resolveIcon(item.data?.icon, type === "digital-asset" ? Palette : Layout),
            type,
          };
          if (type === "digital-asset") {
            remoteDigitalAssets.push(catObj);
          } else {
            remoteProjects.push(catObj);
          }
        });

        setProjectCats([
          { id: "all-projects", label: "Semua Proyek", icon: LayoutGrid, type: "project" },
          ...remoteProjects,
        ]);
        setDigitalAssetCats([
          { id: "all-digital-assets", label: "Semua Digital Asset", icon: Sparkles, type: "digital-asset" },
          ...remoteDigitalAssets,
        ]);
      })
      .catch(() => {});
  }, []);

  const digitalAssetCategoryIds = useMemo(() => {
    return digitalAssetCats.filter((c) => c.id !== "all-digital-assets").map((c) => c.id);
  }, [digitalAssetCats]);

  const digitalAssetCategoryLabels = useMemo(() => {
    return digitalAssetCats.filter((c) => c.id !== "all-digital-assets").map((c) => c.label);
  }, [digitalAssetCats]);

  const projectCategoryLabels = useMemo(() => {
    return projectCats.filter((c) => c.id !== "all-projects").map((c) => c.label);
  }, [projectCats]);

  // Compute counts for project categories
  const projectCatsWithCounts = useMemo(() => {
    const totalProjects = projects.filter((p) => !isDigitalAssetProject(p, digitalAssetCategoryIds, digitalAssetCategoryLabels)).length;

    return projectCats.map((cat) => {
      if (cat.id === "all-projects" || cat.id === "all") {
        return { ...cat, count: totalProjects };
      }
      const count = projects.filter((p) => {
        if (isDigitalAssetProject(p, digitalAssetCategoryIds, digitalAssetCategoryLabels)) return false;
        const cSlug = p.categorySlug || "";
        const ind = (p.industry || p.category || "").toLowerCase();
        const catLabel = cat.label.toLowerCase();
        return cSlug === cat.id || ind.includes(catLabel) || ind.includes(cat.id.replace(/-/g, " "));
      }).length;
      return { ...cat, count };
    });
  }, [projects, projectCats, digitalAssetCategoryIds, digitalAssetCategoryLabels]);

  // Compute counts for digital asset categories
  const digitalAssetCatsWithCounts = useMemo(() => {
    const totalDigitalAssets = projects.filter((p) => isDigitalAssetProject(p, digitalAssetCategoryIds, digitalAssetCategoryLabels)).length;

    return digitalAssetCats.map((cat) => {
      if (cat.id === "all-digital-assets") {
        return { ...cat, count: totalDigitalAssets };
      }
      const count = projects.filter((p) => {
        if (!isDigitalAssetProject(p, digitalAssetCategoryIds, digitalAssetCategoryLabels)) return false;
        const cSlug = p.categorySlug || "";
        const ind = (p.industry || p.category || "").toLowerCase();
        const catLabel = cat.label.toLowerCase();
        return cSlug === cat.id || ind.includes(catLabel) || ind.includes(cat.id.replace(/-/g, " "));
      }).length;
      return { ...cat, count };
    });
  }, [projects, digitalAssetCats, digitalAssetCategoryIds, digitalAssetCategoryLabels]);

  // Filter projects according to activeCategory
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all-projects" || activeCategory === "all") {
      return projects.filter((p) => !isDigitalAssetProject(p, digitalAssetCategoryIds, digitalAssetCategoryLabels));
    }
    if (activeCategory === "all-digital-assets") {
      return projects.filter((p) => isDigitalAssetProject(p, digitalAssetCategoryIds, digitalAssetCategoryLabels));
    }

    // Check if active category is a digital asset category
    const isDigitalCat = digitalAssetCats.some((c) => c.id === activeCategory);

    return projects.filter((p) => {
      const isItemDigital = isDigitalAssetProject(p, digitalAssetCategoryIds, digitalAssetCategoryLabels);
      if (isDigitalCat !== isItemDigital) return false;

      const cSlug = p.categorySlug || "";
      const ind = (p.industry || p.category || "").toLowerCase();
      const allCats = [...projectCats, ...digitalAssetCats];
      const currentCat = allCats.find((c) => c.id === activeCategory);
      const catLabel = currentCat ? currentCat.label.toLowerCase() : "";
      return cSlug === activeCategory || ind.includes(catLabel) || ind.includes(activeCategory.replace(/-/g, " "));
    });
  }, [projects, activeCategory, digitalAssetCats, projectCats, digitalAssetCategoryIds, digitalAssetCategoryLabels]);

  const activeCategoryTitle = useMemo(() => {
    const allCats = [...projectCats, ...digitalAssetCats];
    const found = allCats.find((c) => c.id === activeCategory);
    return found ? found.label : "Portofolio";
  }, [activeCategory, projectCats, digitalAssetCats]);

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 relative overflow-x-clip" id="portfolio-gallery">
      {/* Decorative background elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-magenta/10 to-transparent rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-bl from-pink-100/50 dark:from-magenta/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-magenta-50 dark:bg-magenta/20 text-magenta text-xs font-bold tracking-widest uppercase mb-4 mx-auto lg:mx-0">
              {tr("PORTOFOLIO")}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white tracking-tight mb-4">
              {tr("Hasil Nyata,")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta to-orange-400">
                {tr("Kepuasan Sebenarnya")}
              </span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {tr("Koleksi proyek website, software aplikasi, dan aset digital (branding, logo, sosial media) yang kami kembangkan untuk mendorong pertumbuhan bisnis.")}
            </p>
          </div>
        </div>

        {/* Mobile Tab Switcher: Proyek vs Digital Asset */}
        <div className="flex lg:hidden items-center justify-center p-1 rounded-xl bg-slate-100 dark:bg-gray-800 mb-6 max-w-sm mx-auto">
          <button
            onClick={() => {
              setMobileTab("project");
              if (activeCategory.startsWith("all-digital") || digitalAssetCats.some((c) => c.id === activeCategory)) {
                setActiveCategory("all-projects");
              }
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${
              mobileTab === "project"
                ? "bg-white dark:bg-gray-900 text-navy dark:text-white shadow-sm"
                : "text-muted-foreground hover:text-navy dark:hover:text-white"
            }`}
          >
            {tr("Proyek")} ({projectCatsWithCounts[0]?.count || 0})
          </button>
          <button
            onClick={() => {
              setMobileTab("digital-asset");
              if (!digitalAssetCats.some((c) => c.id === activeCategory)) {
                setActiveCategory("all-digital-assets");
              }
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${
              mobileTab === "digital-asset"
                ? "bg-white dark:bg-gray-900 text-magenta shadow-sm"
                : "text-muted-foreground hover:text-navy dark:hover:text-white"
            }`}
          >
            {tr("Digital Assets")} ({digitalAssetCatsWithCounts[0]?.count || 0})
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 self-start space-y-8">
            {/* Section 1: Kategori Proyek */}
            <div className={`${mobileTab === "digital-asset" ? "hidden lg:block" : "block"}`}>
              <h3 className="text-xl font-bold text-navy dark:text-white mb-4 flex items-center justify-between">
                <span>{tr("Kategori Proyek")}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-800 text-muted-foreground">
                  {projectCatsWithCounts[0]?.count || 0}
                </span>
              </h3>
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide lg:mx-0 lg:flex-col lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0">
                {projectCatsWithCounts.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group flex shrink-0 items-center px-4 py-3 rounded-xl transition-all duration-200 lg:w-full ${
                        isActive
                          ? "bg-magenta-50 dark:bg-magenta/20 text-magenta shadow-sm font-bold"
                          : "text-navy-400 dark:text-gray-300 hover:bg-gray-50 hover:text-navy dark:hover:bg-gray-800 dark:hover:text-white font-medium"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 shrink-0 ${isActive ? "text-magenta" : "text-gray-400 group-hover:text-navy dark:group-hover:text-magenta"}`} />
                      <span className="text-sm flex-1 text-left truncate">{tr(cat.label)}</span>
                      <span className={`text-xs font-bold mr-2 ${isActive ? "text-magenta" : "text-gray-400 group-hover:text-navy dark:group-hover:text-magenta"}`}>
                        {cat.count}
                      </span>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? "text-magenta" : "text-gray-300 group-hover:text-navy dark:group-hover:text-magenta"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Digital Assets */}
            <div className={`${mobileTab === "project" ? "hidden lg:block" : "block"} pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100 dark:border-gray-800`}>
              <h3 className="text-xl font-bold text-navy dark:text-white mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span>{tr("Digital Assets")}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-magenta text-white text-[10px] font-bold">
                    Asset
                  </span>
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-magenta-50 dark:bg-magenta/20 text-magenta">
                  {digitalAssetCatsWithCounts[0]?.count || 0}
                </span>
              </h3>
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide lg:mx-0 lg:flex-col lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0">
                {digitalAssetCatsWithCounts.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group flex shrink-0 items-center px-4 py-3 rounded-xl transition-all duration-200 lg:w-full ${
                        isActive
                          ? "bg-magenta-50 dark:bg-magenta/20 text-magenta shadow-sm font-bold"
                          : "text-navy-400 dark:text-gray-300 hover:bg-gray-50 hover:text-navy dark:hover:bg-gray-800 dark:hover:text-white font-medium"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 shrink-0 ${isActive ? "text-magenta" : "text-gray-400 group-hover:text-navy dark:group-hover:text-magenta"}`} />
                      <span className="text-sm flex-1 text-left truncate">{tr(cat.label)}</span>
                      <span className={`text-xs font-bold mr-2 ${isActive ? "text-magenta" : "text-gray-400 group-hover:text-navy dark:group-hover:text-magenta"}`}>
                        {cat.count}
                      </span>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? "text-magenta" : "text-gray-300 group-hover:text-navy dark:group-hover:text-magenta"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grid Section */}
          <div className="flex-1 w-full">
            {/* Active category pill for clarity */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori:</span>
                <span className="px-3 py-1 rounded-full bg-magenta-50 dark:bg-magenta/20 text-magenta text-xs font-extrabold">
                  {tr(activeCategoryTitle)}
                </span>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {filteredProjects.length} {tr("karya ditemukan")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const isDigital = isDigitalAssetProject(project, digitalAssetCategoryIds, digitalAssetCategoryLabels);
                return (
                  <div
                    key={project.slug || project.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 p-3">
                      <div className="absolute top-5 left-5 z-10 flex gap-1.5 flex-wrap">
                        <span
                          className={`px-3 py-1.5 backdrop-blur-sm text-xs font-bold rounded-full shadow-sm ${
                            isDigital
                              ? "bg-magenta text-white"
                              : "bg-white/90 dark:bg-gray-800/90 text-navy dark:text-white"
                          }`}
                        >
                          {tr(project.badge || (isDigital ? "Digital Asset" : "Website"))}
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
                      <h3 className="text-lg font-extrabold text-navy dark:text-white mb-1 group-hover:text-magenta transition-colors">
                        <Link to={`/portofolio/${project.slug}`}>
                          {project.title || project.name}
                        </Link>
                      </h3>
                      <div className="text-xs font-semibold text-gray-400 dark:text-gray-400 mb-3">
                        {tr(project.categoryLabel || project.industry || project.category || "Website Company Profile")}
                      </div>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                        {tr(project.desc || project.ringkasan)}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-gray-50 dark:border-gray-700 pt-4">
                        <Link
                          to={`/portofolio/${project.slug}`}
                          className="text-sm font-bold text-navy dark:text-gray-200 hover:text-magenta dark:hover:text-magenta group-hover:text-magenta transition-colors inline-flex items-center"
                        >
                          {tr("Lihat Detail")}{" "}
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </Link>

                        {project.website_url && project.website_url !== "#" ? (
                          <a
                            href={project.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Kunjungi ${project.title || project.name}`}
                            className="w-8 h-8 rounded-full bg-magenta-50 dark:bg-magenta/20 flex items-center justify-center text-magenta hover:bg-magenta hover:text-white transition-all shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <Link
                            to={`/portofolio/${project.slug}`}
                            title={`Lihat detail ${project.title || project.name}`}
                            className="w-8 h-8 rounded-full bg-magenta-50 dark:bg-magenta/20 flex items-center justify-center text-magenta hover:bg-magenta hover:text-white transition-all shadow-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-navy dark:text-white font-semibold">
                  {tr("Belum ada portofolio di kategori ini.")}
                </p>
                <button
                  onClick={() => setActiveCategory("all-projects")}
                  className="mt-4 px-4 py-2 rounded-full bg-magenta text-white text-xs font-bold hover:bg-magenta-500 transition-colors"
                >
                  {tr("Lihat Semua Proyek")}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center border-t border-gray-100 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-400 italic">
            "{tr("Setiap karya adalah cerita baru tentang kepercayaan dan hasil nyata.")}"
          </p>
        </div>
      </div>
    </section>
  );
}
