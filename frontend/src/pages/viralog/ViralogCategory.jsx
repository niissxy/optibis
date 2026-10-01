import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Newspaper } from "lucide-react";
import SEO from "@/components/SEO";
import PillarLayout from "@/components/optibis/PillarLayout";
import ViralogContentCard from "@/components/viralog/ViralogContentCard";
import ViralogAdSlot from "@/components/viralog/ViralogAdSlot";
import ViralogNewsletter from "@/components/viralog/ViralogNewsletter";
import { useViralogContent } from "@/hooks/useViralogContent";
import { useLanguage } from "@/lib/LanguageContext";
import {
  getContentByCategory,
  getContentByTag,
  getContentByAuthor,
  getCategoryBySlug,
  getAuthorBySlug,
  getTrendingContent,
  VIRALOG_CATEGORIES,
} from "@/data/viralog";
import { getBreadcrumbSchema } from "@/lib/seoData";

export default function ViralogCategory() {
  const { slug } = useParams();
  const location = useLocation();
  const content = useViralogContent();
  const { language, tr } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const isTag = location.pathname.startsWith("/tag/");
  const isAuthor = location.pathname.startsWith("/author/");

  let items = [];
  let title = "";
  let subtitle = "";
  let category = null;
  let author = null;

  if (isTag) {
    items = getContentByTag(slug, 20, content);
    title = `#${slug}`;
    subtitle = language === "en" ? `Content tagged with "${slug}"` : `Konten dengan tag "${slug}"`;
  } else if (isAuthor) {
    author = getAuthorBySlug(slug);
    items = getContentByAuthor(slug, 20, content);
    title = author?.name || "Author";
    subtitle = author?.bio ? tr(author.bio) : (language === "en" ? "Content from this author" : "Konten dari penulis ini");
  } else {
    category = getCategoryBySlug(slug);
    items = getContentByCategory(slug, 20, content);
    title = category ? tr(category.name) : tr("Kategori");
    subtitle = category
      ? (language === "en" ? `All content in the ${tr(category.name)} category` : `Semua konten dalam kategori ${category.name}`)
      : (language === "en" ? "All content" : "Semua konten");
  }

  const trendingSidebar = getTrendingContent(5, content);
  const canonicalUrl = `https://optibis.id${location.pathname}`;

  const structuredData = [
    getBreadcrumbSchema([
      { name: "Beranda", url: "/" },
      { name: "VIRALOG", url: "/content" },
      { name: title, url: canonicalUrl },
    ]),
  ];

  return (
    <PillarLayout>
      <SEO
        title={`${title} — VIRALOG Insight`}
        description={subtitle}
        canonicalUrl={canonicalUrl}
        structuredData={structuredData}
      />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/content" className="hover:text-navy transition-colors">VIRALOG</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium">{title}</span>
        </nav>
      </div>

      {/* Category Header */}
      <section className={`py-8 ${category ? `bg-${category.color}/5` : "bg-slate-50/50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {author && (
            <div className="flex items-center gap-4 mb-4">
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-navy-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-navy">{author.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">{title}</h1>
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              </div>
            </div>
          )}
          {!author && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                {category && (
                  <div className={`w-10 h-10 rounded-lg bg-${category.color}/10 flex items-center justify-center`}>
                    <Newspaper className={`w-5 h-5 text-${category.color}`} />
                  </div>
                )}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">{title}</h1>
              </div>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
              <p className="text-xs text-muted-foreground mt-1">{items.length} {tr("konten ditemukan")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Top Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ViralogAdSlot placement="category_banner" />
      </div>

      {/* Content Grid + Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            {items.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {items.map((item, i) => (
                  <ViralogContentCard key={item.id} content={item} variant="standard" index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Newspaper className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-navy mb-2">{tr("Belum ada konten")}</h3>
                <p className="text-sm text-muted-foreground">{tr("Konten untuk kategori ini akan segera hadir.")}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <Newspaper className="w-4 h-4 text-magenta" />
                <h3 className="font-bold text-navy text-sm uppercase tracking-wide">{tr("Trending")}</h3>
              </div>
              <div className="space-y-0">
                {trendingSidebar.map((item, i) => (
                  <ViralogContentCard key={item.id} content={item} variant="trending" index={i} />
                ))}
              </div>
            </div>

            <ViralogAdSlot placement="sidebar_sticky" />

            {/* Other Categories */}
            {!isTag && !isAuthor && (
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-bold text-navy text-sm uppercase tracking-wide mb-3">{tr("Kategori Lain")}</h3>
                <div className="space-y-1">
                  {VIRALOG_CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
                    <Link key={c.slug} to={`/kategori/${c.slug}`} className="block px-3 py-2 rounded-lg text-sm text-navy-300 hover:text-magenta hover:bg-magenta/5 transition-colors">
                      {tr(c.name)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <ViralogNewsletter variant="sidebar" />
          </div>
        </div>
      </section>
    </PillarLayout>
  );
}
