import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, Eye, TrendingUp } from "lucide-react";
import { getPackageBySlug, getPackagesByPillar } from "@/data/packages";
import { formatViews, getContentBySlug, getTrendingContent } from "@/data/viralog";
import { useViralogContent } from "@/hooks/useViralogContent";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const PILLAR_META = {
  "digital-asset": { name: "Digital Asset", accent: "magenta" },
  website: { name: "Website", accent: "amethyst" },
  "digital-growth-team": { name: "Digital Growth Team", accent: "magenta" },
};

const ACCENT_STYLES = {
  magenta: {
    text: "text-magenta",
    badge: "bg-magenta-50 text-magenta",
    border: "hover:border-magenta/25",
    button: "bg-magenta hover:bg-magenta-500",
  },
  amethyst: {
    text: "text-amethyst",
    badge: "bg-amethyst-50 text-amethyst",
    border: "hover:border-amethyst/25",
    button: "bg-amethyst hover:bg-amethyst-600",
  },
};

const CONTENT_PILLARS = {
  branding: "digital-asset",
  website: "website",
  seo: "website",
  startup: "website",
  "digital-marketing": "digital-growth-team",
  "social-media": "digital-growth-team",
  "content-strategy": "digital-growth-team",
  "bisnis-digital": "digital-growth-team",
};

function getPageContext(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const root = segments[0];

  if (PILLAR_META[root]) return { pillarSlug: root, pageType: "pillar" };
  if (root === "paket" && PILLAR_META[segments[1]]) {
    return {
      pillarSlug: segments[1],
      currentPackageSlug: segments[2] || null,
      pageType: "package",
    };
  }
  if (root === "layanan" && PILLAR_META[segments[1]]) {
    return {
      pillarSlug: segments[1],
      currentServiceSlug: segments[2] || null,
      pageType: "service",
    };
  }
  if (root === "marketing-kit") return { pillarSlug: "digital-asset", currentPackageSlug: "page:marketing-kit" };
  if (root === "tools") return { pillarSlug: "website", currentPackageSlug: "page:tools" };
  if (root === "solution-library") return { pillarSlug: "website", currentPackageSlug: "solution-library" };
  if (root === "content") return { pillarSlug: "website", currentPackageSlug: "page:content" };
  if (root === "insight") return { pillarSlug: "website", currentPackageSlug: "page:insight" };
  if (root === "portofolio") return { pillarSlug: "website", currentPackageSlug: "page:portofolio" };
  if (root === "tentang") return { pillarSlug: "website", currentPackageSlug: "page:tentang" };
  if (["trending", "short-video", "video", "kategori", "tag", "author", "search"].includes(root)) return { pillarSlug: "website", currentPackageSlug: "page:viralog" };
  if (root === "content" && segments[1]) {
    const content = getContentBySlug(segments[1]);
    return { pillarSlug: CONTENT_PILLARS[content?.category_slug] };
  }
  if (root === "kategori" && segments[1]) return { pillarSlug: CONTENT_PILLARS[segments[1]] };

  return { pillarSlug: null };
}

function toPackage(item) {
  if (!item) return null;
  if (item.name && item.pillarSlug && Array.isArray(item.included)) {
    return item;
  }
  const data = item.data || {};
  const rawPillar = (data.pillar_slug || data.pillar || item.pillarSlug || "website").toLowerCase();
  const pillarSlug = rawPillar.includes("asset")
    ? "digital-asset"
    : rawPillar.includes("growth")
    ? "digital-growth-team"
    : "website";

  const includedList = Array.isArray(data.included) && data.included.length > 0
    ? data.included
    : Array.isArray(data.features) && data.features.length > 0
    ? data.features
        .filter((f) => typeof f === "string" || f.included !== false)
        .map((f) => ({
          title: typeof f === "string" ? f : f.text,
          desc: "",
        }))
    : [];

  return {
    slug: item.slug,
    pillarSlug,
    name: item.title || data.name || item.name || item.slug,
    target: data.target || item.summary || item.target || "",
    price: data.price || item.price || "",
    priceShort: data.price_short || data.price || item.priceShort || item.price || "",
    included: includedList,
  };
}

function getRecommendedPackages(pillarSlug, currentPackageSlug, currentServiceSlug, managedPackages) {
  const hasManagedPackages = Array.isArray(managedPackages);
  const availablePackages = managedPackages || [];
  const targetKeys = [
    currentPackageSlug,
    pillarSlug ? `page:${pillarSlug}` : null,
    pillarSlug ? `pillar:${pillarSlug}` : null,
    currentServiceSlug,
    currentServiceSlug ? `service:${currentServiceSlug}` : null,
    currentServiceSlug ? `page:service:${currentServiceSlug}` : null,
  ].filter(Boolean);

  const currentPackageItem = availablePackages.find((item) => item.slug === currentPackageSlug);
  const isConfigured = Boolean(currentPackageItem?.data?.recommendations_configured);

  // Additional / explicitly targeted recommendations from packages configured in admin panel
  const packagesRecommendingCurrent = availablePackages
    .filter((item) => {
      if (item.slug === currentPackageSlug) return false;
      const recs = item?.data?.recommended_packages;
      return (
        Array.isArray(recs) &&
        recs.some((r) => {
          const rSlug = typeof r === "string" ? r : r?.slug;
          return targetKeys.includes(rSlug);
        })
      );
    })
    .map(toPackage)
    .filter(Boolean);

  // CASE 1: Current package has custom recommendations configured from the admin panel
  if (isConfigured) {
    const configuredSlugs = Array.isArray(currentPackageItem?.data?.recommended_packages)
      ? currentPackageItem.data.recommended_packages
          .map((r) => (typeof r === "string" ? r : r?.slug))
          .filter((slug) => slug && !slug.startsWith("page:") && !slug.startsWith("service:") && !slug.startsWith("solution-library"))
      : [];

    const configuredPackages = configuredSlugs
      .map((slug) => {
        const foundManaged = availablePackages.find((p) => p.slug === slug);
        if (foundManaged) return toPackage(foundManaged);
        const foundStatic = !hasManagedPackages && getPackageBySlug(slug);
        if (foundStatic) return toPackage({ slug, ...foundStatic });
        return null;
      })
      .filter((pkg) => pkg && pkg.slug !== currentPackageSlug);

    const result = [];
    const seen = new Set();

    for (const pkg of configuredPackages) {
      if (pkg && !seen.has(pkg.slug)) {
        result.push(pkg);
        seen.add(pkg.slug);
      }
    }

    // Append any packages targeting this item below
    for (const pkg of packagesRecommendingCurrent) {
      if (pkg && !seen.has(pkg.slug)) {
        result.push(pkg);
        seen.add(pkg.slug);
      }
    }

    return result;
  }

  // CASE 2: Automatic recommendations (default) -> cap at 3 packages automatically!
  const defaultStatic = !hasManagedPackages && pillarSlug
    ? (getPackagesByPillar(pillarSlug) || []).filter((pkg) => pkg && pkg.slug !== currentPackageSlug)
    : !hasManagedPackages
    ? Object.keys(PILLAR_META)
        .map((slug) => {
          const packages = getPackagesByPillar(slug) || [];
          return packages.find((pkg) => pkg?.popular) || packages[0];
        })
        .filter((pkg) => pkg && pkg.slug)
    : [];

  // Managed packages belonging to this pillar from DB
  const managedFromPillar = availablePackages
    .filter((item) => {
      const d = item.data || {};
      const p = (d.pillar_slug || d.pillar || "").toLowerCase();
      return (
        item.slug !== currentPackageSlug &&
        (!pillarSlug || p === pillarSlug.toLowerCase())
      );
    })
    .map(toPackage)
    .filter(Boolean);

  // Existing/default recommendations in their original order
  const existingMap = new Map();
  for (const pkg of [...defaultStatic, ...managedFromPillar]) {
    if (pkg && pkg.slug && !existingMap.has(pkg.slug)) {
      existingMap.set(pkg.slug, pkg);
    }
  }

  // Automatic recommendations are capped at 3!
  const automaticPackages = Array.from(existingMap.values()).slice(0, 3);

  // Keep 3 automatic recommendations first, and append any packages explicitly targeted via admin below
  const combined = [];
  const seenSlugs = new Set();

  for (const pkg of automaticPackages) {
    combined.push(pkg);
    seenSlugs.add(pkg.slug);
  }

  for (const pkg of packagesRecommendingCurrent) {
    if (pkg && pkg.slug && !seenSlugs.has(pkg.slug)) {
      combined.push(pkg);
      seenSlugs.add(pkg.slug);
    }
  }

  return combined;
}

export default function PageRecommendations() {
  const { pathname } = useLocation();
  const { language, t, tr } = useLanguage();
  const [managedPackages, setManagedPackages] = useState(null);
  const { pillarSlug, currentPackageSlug, currentServiceSlug } = getPageContext(pathname);
  const content = useViralogContent();
  const packages = getRecommendedPackages(pillarSlug, currentPackageSlug, currentServiceSlug, managedPackages);
  const trending = getTrendingContent(3, content);
  const categoryName = (pillarSlug && PILLAR_META[pillarSlug]?.name) || "pilihan Optibis";
  const showTrending = pathname === "/content";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"}/modules/packages`)
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => setManagedPackages(Array.isArray(items) ? items.filter((item) => item.is_published === true && String(item.data?.status || "published").toLowerCase() !== "draft") : []))
      .catch(() => {});
  }, []);

  if (pathname === "/") return null;
  if (!packages.length && !showTrending) return null;

  return (
    <>
      {packages.length > 0 && (
        <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Paket Pilihan" title="Rekomendasi Paket Lainnya" description={t("relevantPackages", { category: categoryName })} compact className="mb-6" />
            <div className="mb-10 flex justify-center">
              {pillarSlug && (
                <Link to={`/${pillarSlug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-magenta">
                  {tr("Lihat semua paket")} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => {
                const meta = PILLAR_META[pkg.pillarSlug] || { name: pkg.pillarSlug, accent: "magenta" };
                const styles = ACCENT_STYLES[meta.accent] || ACCENT_STYLES.magenta;

                return (
                  <article key={pkg.slug} className={`flex flex-col rounded-lg border border-gray-300 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 ${styles.border}`}>
                    <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${styles.badge}`}>{meta.name}</span>
                    <h3 className="mt-4 text-lg font-extrabold text-navy">{tr(pkg.name)}</h3>
                    <p className="mt-1 min-h-10 text-xs leading-relaxed text-muted-foreground">{tr(pkg.target)}</p>
                    <div className="mt-4 text-xs text-muted-foreground">{tr("Mulai dari")}</div>
                    <div className="text-2xl font-extrabold text-navy">{pkg.priceShort || pkg.price}</div>
                    <ul className="my-5 space-y-2">
                      {pkg.included.slice(0, 3).map((item) => (
                        <li key={item.title} className="flex items-start gap-2 text-sm text-navy-300">
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${styles.text}`} /> {tr(item.title)}
                        </li>
                      ))}
                    </ul>
                    <Link to={`/paket/${pkg.pillarSlug}/${pkg.slug}`} className={`mt-auto inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-colors ${styles.button}`}>
                      {tr("Lihat Paket")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {showTrending && (
        <section className="bg-slate-50/60 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Insight Terbaru" title="Berita Trending" description={t("trendingDescription")} compact className="mb-6" />
            <div className="mb-10 flex justify-center">
              <Link to="/trending" className="hidden items-center gap-1 text-sm font-semibold text-magenta sm:inline-flex">
                {tr("Lihat semua")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {trending.map((item, index) => (
                <Link key={item.id} to={`/content/${item.slug}`} className="group overflow-hidden rounded-lg border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50">
                  <div className="relative h-44 overflow-hidden bg-navy-100">
                    <img src={item.thumbnail} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-magenta px-2.5 py-1 text-[10px] font-bold text-white">#{index + 1} Trending</span>
                  </div>
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-navy transition-colors group-hover:text-magenta">{tr(item.title)}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{tr(item.summary)}</p>
                    <div className="mt-4 flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {formatViews(item.views)} {tr("views")}</span>
                      <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {tr("Skor")} {item.viral_score}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link to="/trending" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-magenta sm:hidden">
              {language === "en" ? "View all trending news" : "Lihat semua berita trending"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
