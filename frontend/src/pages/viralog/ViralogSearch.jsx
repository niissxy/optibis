import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Box, Filter, Newspaper, Package, Search, X } from "lucide-react";
import PillarLayout from "@/components/optibis/PillarLayout";
import { searchGlobal } from "@/data/globalSearch";
import { useLanguage } from "@/lib/LanguageContext";

const TYPE_STYLES = {
  product: { icon: Box, badge: "bg-amethyst-50 text-amethyst", labelKey: "products" },
  package: { icon: Package, badge: "bg-magenta-50 text-magenta", labelKey: "packages" },
  news: { icon: Newspaper, badge: "bg-blue-50 text-blue-600", labelKey: "news" },
};

const FILTERS = [
  { value: "all", labelKey: "all" },
  { value: "product", labelKey: "products" },
  { value: "package", labelKey: "packages" },
  { value: "news", labelKey: "news" },
];

const POPULAR_SEARCHES = ["website", "branding", "CRM", "SEO", "social media", "company profile"];

function ResultCard({ item, openLabel, typeLabel }) {
  const styles = TYPE_STYLES[item.type];
  const Icon = styles.icon;
  const content = (
    <>
      <div className="h-36 overflow-hidden bg-navy-50">
        {item.image ? (
          <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center"><Icon className="h-9 w-9 text-navy-200" /></div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${styles.badge}`}>{typeLabel}</span>
        <h2 className="mt-3 line-clamp-2 text-base font-bold leading-snug text-navy transition-colors group-hover:text-magenta">{item.title}</h2>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="line-clamp-1 text-[10px] text-muted-foreground">{item.meta}</span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-magenta">{openLabel} <ArrowUpRight className="h-3.5 w-3.5" /></span>
        </div>
      </div>
    </>
  );

  const className = "group flex min-h-[330px] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:border-magenta/20 hover:shadow-xl hover:shadow-gray-200/50";

  if (item.external) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>;
  }

  return <Link to={item.href} className={className}>{content}</Link>;
}

export default function ViralogSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "all";
  const [query, setQuery] = useState(initialQuery);
  const [activeType, setActiveType] = useState(initialType);
  const { t } = useLanguage();

  useEffect(() => setQuery(initialQuery), [initialQuery]);
  useEffect(() => setActiveType(initialType), [initialType]);

  const normalizedQuery = query.trim();
  const results = useMemo(() => searchGlobal(query, activeType), [query, activeType]);

  const updateSearch = (nextQuery, nextType = activeType) => {
    setQuery(nextQuery);
    const params = {};
    if (nextQuery) params.q = nextQuery;
    if (nextType !== "all") params.type = nextType;
    setSearchParams(params, { replace: true });
  };

  const changeType = (value) => {
    setActiveType(value);
    updateSearch(query, value);
  };

  return (
    <PillarLayout>
      <div className="min-h-screen bg-slate-50/50">
        <section className="border-b border-gray-100 bg-white py-8 lg:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder={t("searchPlaceholder")}
                  autoFocus
                  className="h-14 w-full rounded-xl border border-gray-200 bg-slate-50 pl-12 pr-12 text-sm font-medium outline-none transition-all focus:border-magenta focus:bg-white focus:ring-2 focus:ring-magenta/10"
                />
                {query && (
                  <button type="button" onClick={() => updateSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy" aria-label="Clear search">
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Filter className="mr-1 h-4 w-4 text-muted-foreground" />
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => changeType(filter.value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  activeType === filter.value ? "bg-navy text-white" : "border border-gray-200 bg-white text-navy hover:border-magenta hover:text-magenta"
                }`}
              >
                {t(filter.labelKey)}
              </button>
            ))}
          </div>

          {normalizedQuery ? (
            <p className="mb-5 text-sm text-muted-foreground">
              {t("resultFor")} "<strong className="text-navy">{normalizedQuery}</strong>" - {results.length} {t("resultsFound")}
            </p>
          ) : (
            <div className="py-10 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <h2 className="mt-4 text-lg font-bold text-navy">{t("popularSearches")}</h2>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button key={term} type="button" onClick={() => updateSearch(term)} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-navy transition-colors hover:border-magenta hover:text-magenta">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {normalizedQuery && results.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((item) => <ResultCard key={item.id} item={item} openLabel={t("openResult")} typeLabel={t(TYPE_STYLES[item.type].labelKey)} />)}
            </div>
          )}

          {normalizedQuery && results.length === 0 && (
            <div className="py-16 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <h2 className="mt-4 text-lg font-bold text-navy">{t("noResults")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("noResultsDescription")}</p>
            </div>
          )}
        </section>
      </div>
    </PillarLayout>
  );
}
