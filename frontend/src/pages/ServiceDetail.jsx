import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Clock, Target, Layers, Package as PackageIcon, Star, X } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import PackageHighlights from "@/components/optibis/PackageHighlights";
import PackageFAQ from "@/components/optibis/PackageFAQ";
import { useSafeNav } from "@/hooks/useSafeNav";
import { getServiceSlug } from "@/lib/serviceRoutes";
import { SERVICES as DIGITAL_ASSET_SERVICES } from "@/pages/DigitalAsset";
import { SERVICES as WEBSITE_SERVICES } from "@/pages/WebsiteService";
import { SERVICES as DIGITAL_GROWTH_SERVICES } from "@/pages/DigitalGrowthTeam";
import { PACKAGE_DATA } from "@/data/packages";
import { useLanguage } from "@/lib/LanguageContext";
import { getBreadcrumbSchema, getServiceSchema, getFAQSchema } from "@/lib/seoData";
import { useServicePillars } from "@/hooks/useServicePillars";
import { normalizePillarSlug } from "@/hooks/useServices";

export const SOFTWARE_SERVICES = [
  {
    slug: "web-application",
    name: "Web Application",
    desc: "Pengembangan web application kustom yang interaktif, scalable, dan modern untuk operasional bisnis serta layanan pelanggan.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    features: [
      "Custom Frontend & Backend Architecture",
      "User Authentication & Role-Based Access Control",
      "Database Design & API Integration",
      "Dashboard Analytics & Reporting",
      "Cloud Deployment & High Availability Setup",
      "Security Auditing & SSL Integration",
      "Dokumentasi Teknis & Training Admin",
    ],
  },
  {
    slug: "custom-system",
    name: "Custom System",
    desc: "Sistem informasi bisnis, ERP ringan, manajemen inventaris, dan workflow automation yang dirancang spesifik mengikuti proses bisnis Anda.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    features: [
      "Sistem Informasi & Workflow Management Custom",
      "Manajemen Inventaris, Transaksi & Operasional",
      "Integrasi WhatsApp API & Notifikasi Otomatis",
      "Multi-Cabang & Multi-Gudang Terpusat",
      "Audit Trail & Log Aktivitas Pengguna",
      "Otomasi Export Data (PDF, Excel, CSV)",
      "Garansi & Dukungan Teknis Purna Jual",
    ],
  },
];

const PILLARS = {
  "digital-asset": {
    name: "Digital Asset",
    path: "/digital-asset",
    services: DIGITAL_ASSET_SERVICES,
    accentText: "text-magenta",
    accentBg: "bg-magenta-50",
    button: "bg-magenta hover:bg-magenta-500",
    border: "border-magenta/15",
  },
  website: {
    name: "Website",
    path: "/website",
    services: WEBSITE_SERVICES,
    accentText: "text-amethyst",
    accentBg: "bg-amethyst-50",
    button: "bg-amethyst hover:bg-amethyst-600",
    border: "border-amethyst/15",
  },
  "digital-growth-team": {
    name: "Digital Growth Team",
    path: "/digital-growth-team",
    services: DIGITAL_GROWTH_SERVICES,
    accentText: "text-magenta",
    accentBg: "bg-magenta-50",
    button: "bg-magenta hover:bg-magenta-500",
    border: "border-magenta/15",
  },
  software: {
    name: "Software & Sistem Bisnis",
    path: "/layanan",
    services: SOFTWARE_SERVICES,
    accentText: "text-blue-600",
    accentBg: "bg-blue-50",
    button: "bg-navy hover:bg-navy-400",
    border: "border-blue-500/15",
  },
};

export default function ServiceDetail() {
  const { pillarSlug, serviceSlug } = useParams();
  const nav = useSafeNav();
  const { language, tr } = useLanguage();
  const { pillars: dynamicPillars } = useServicePillars();
  const [loading, setLoading] = React.useState(true);

  const normalizedPillar = normalizePillarSlug(pillarSlug);
  const staticPillar = PILLARS[pillarSlug] || PILLARS[normalizedPillar];
  const dynamicPillar = dynamicPillars?.find(
    (p) =>
      p.slug === pillarSlug ||
      p.slug === normalizedPillar ||
      (p.link && p.link.replace(/^\//, "").replace(/^pilar\//, "") === pillarSlug)
  );

  const pillar =
    staticPillar ||
    (dynamicPillar
      ? {
          name: dynamicPillar.title,
          path: dynamicPillar.link || `/pilar/${dynamicPillar.slug}`,
          services: [],
          accentText: dynamicPillar.textClass || "text-magenta",
          accentBg: dynamicPillar.bgClass || "bg-magenta-50",
          button: dynamicPillar.btnClass || "bg-magenta hover:bg-magenta-500",
          border: "border-magenta/15",
        }
      : null);

  const pkgData = PACKAGE_DATA[serviceSlug];
  const staticService = pillar?.services?.find(
    (item) => (item.slug && item.slug === serviceSlug) || getServiceSlug(item.name) === serviceSlug
  );

  const [remoteService, setRemoteService] = React.useState(null);
  const [remotePackages, setRemotePackages] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/modules/services`)
      .then((res) => (res.ok ? res.json() : []))
      .then((items) => {
        if (!isMounted) return;
        if (Array.isArray(items)) {
          const sSlug = (serviceSlug || "").toLowerCase();
          const targetPillar = normalizedPillar;

          const match = items.find((item) => {
            const itemSlug = (item.slug || getServiceSlug(item.title || "")).toLowerCase();
            const itemPillar = normalizePillarSlug(item.data?.pillar_slug || item.data?.pillar);
            return (
              (itemSlug === sSlug || getServiceSlug(item.title) === sSlug) &&
              (!targetPillar || itemPillar === targetPillar || !item.data?.pillar)
            );
          });

          if (match && match.is_published) {
            setRemoteService(match);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pillarSlug, serviceSlug, normalizedPillar]);

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/modules/packages`)
      .then((res) => (res.ok ? res.json() : []))
      .then((items) => {
        if (Array.isArray(items)) {
          setRemotePackages(items.filter((item) => item.is_published));
        }
      })
      .catch(() => {});
  }, []);

  const service = React.useMemo(() => {
    if (!staticService && !remoteService && !pkgData) return null;
    const base = staticService || {
      name: pkgData?.name || remoteService?.title || '',
      desc: pkgData?.heroDesc || remoteService?.summary || '',
      image: pkgData?.heroImage || remoteService?.image_url || '',
      features: pkgData?.deliverables || [],
      icon: null,
    };
    if (remoteService) {
      const data = remoteService.data || {};
      return {
        ...base,
        name: remoteService.title || base.name,
        desc: remoteService.summary || data.desc || base.desc,
        image: remoteService.image_url || data.image || base.image,
        features: Array.isArray(data.features) && data.features.length > 0 ? data.features : base.features,
      };
    }
    return base;
  }, [staticService, remoteService, pkgData]);

  const servicePackages = React.useMemo(() => {
    // 1. Direct packages from service data (configured via Admin Panel in service_items)
    const directPkgs = remoteService?.data?.packages;
    if (Array.isArray(directPkgs) && directPkgs.length > 0) {
      return directPkgs;
    }

    // 2. Packages from package_items module matching service_slug, service name, or slug prefix
    const matched = remotePackages
      .filter((item) => {
        const d = item.data || {};
        const sSlug = serviceSlug?.toLowerCase();
        const rSlug = remoteService?.slug?.toLowerCase();
        const itemSlug = item.slug?.toLowerCase() || "";
        const itemService = (d.service_slug || d.service || "").toLowerCase();
        return (
          (sSlug && itemService === sSlug) ||
          (rSlug && itemService === rSlug) ||
          (sSlug && itemSlug.startsWith(`${sSlug}-`)) ||
          (rSlug && itemSlug.startsWith(`${rSlug}-`))
        );
      })
      .map((item) => {
        const d = item.data || {};
        return {
          slug: item.slug,
          name: item.title || d.name,
          target: d.target,
          price: d.price,
          original_price: d.original_price,
          discount: d.discount,
          renewal: d.renewal || d.price_note,
          popular: Boolean(d.popular),
          badge: d.badge,
          features: Array.isArray(d.features) ? d.features : [],
        };
      });
    if (matched.length > 0) {
      return matched;
    }

    // 3. Fallback static packages matching flyer data
    if (serviceSlug === "landing-page") {
      return [
        {
          slug: "landing-page-ekonomis",
          name: "Ekonomis",
          target: "UMKM & promosi cepat",
          original_price: "Rp 1.4JT",
          price: "Rp 990RB",
          discount: "Diskon 410RB",
          renewal: "Perpanjang Rp. 650.000 / Tahun",
          popular: false,
          badge: "",
          features: [
            { text: "Include Domain my.id / web.id", included: true },
            { text: "Hosting Non Cpanel 1 Tahun", included: true },
            { text: "Fitur Click to WhatsApp", included: true },
            { text: "Bantu Setup SEO Basic", included: true },
            { text: "100% Konten Dari Klien", included: true },
            { text: "Kecepatan Optimal", included: true },
            { text: "Website 1 Halaman", included: true },
            { text: "Desain Menjual", included: true },
            { text: "Mobile Friendly", included: true },
            { text: "Tanpa E-Mail Bisnis", included: false },
            { text: "Tanpa Source Code", included: false },
            { text: "Tanpa Akses Edit Sendiri", included: false },
          ],
        },
        {
          slug: "landing-page-standard",
          name: "Standard",
          target: "Bisnis berkembang",
          original_price: "Rp 2.0JT",
          price: "Rp 1.4JT",
          discount: "Diskon 600RB",
          renewal: "Perpanjang Rp. 950rb / Tahun",
          popular: true,
          badge: "PAKET TERLARIS",
          features: [
            { text: "Desain Modern & Kekinian", included: true },
            { text: "Fitur Click to WhatsApp", included: true },
            { text: "75% Konten Dari Klien", included: true },
            { text: "Kecepatan Optimal", included: true },
            { text: "Advance SEO Setup", included: true },
            { text: "Website 1 Halaman", included: true },
            { text: "Bonus E-Mail Bisnis", included: true },
            { text: "Mobile Friendly", included: true },
            { text: "Include Domain .com / .id", included: true },
            { text: "Hosting Non Cpanel 1 Tahun", included: true },
            { text: "Tanpa Akses Edit Sendiri", included: false },
            { text: "Tanpa Source Code", included: false },
          ],
        },
        {
          slug: "landing-page-premium",
          name: "Premium",
          target: "Solusi kustom & skala besar",
          original_price: "Rp 3.8JT",
          price: "Rp 2.9JT",
          discount: "Diskon 910RB",
          renewal: "Perpanjang Rp. 1.5JT / Tahun",
          popular: false,
          badge: "",
          features: [
            { text: "Menggunakan ReactJS / NextJS & Laravel", included: true },
            { text: "Fitur Click to WhatsApp", included: true },
            { text: "Bantu Buat 3 Halaman", included: true },
            { text: "50% Konten Dari Klien", included: true },
            { text: "Kecepatan Optimal", included: true },
            { text: "Desain Premium", included: true },
            { text: "Mobile Friendly", included: true },
            { text: "100% Source Code", included: true },
            { text: "Advance SEO Setup", included: true },
            { text: "Bonus E-Mail Bisnis", included: true },
            { text: "Full Akses Admin Panel", included: true },
            { text: "Hosting Cpanel 1 Tahun", included: true },
            { text: "Include Domain .com / .id", included: true },
          ],
        },
      ];
    }

    return [];
  }, [remoteService, remotePackages, serviceSlug]);

  const packageAddons = React.useMemo(() => {
    if (Array.isArray(remoteService?.data?.package_addons) && remoteService.data.package_addons.length > 0) {
      return remoteService.data.package_addons;
    }
    if (serviceSlug === "landing-page") {
      return [
        {
          title: "Tambah Halaman",
          price: "Rp. 200.000 - 350.000 / Halaman",
          desc: "Penambahan halaman baru sesuai kebutuhan konten atau struktur website Anda.",
        },
        {
          title: "Pembelian Domain",
          price: "Penyesuaian Harga Khusus",
          desc: "Penyesuaian harga khusus untuk domain tertentu, misalnya (.ai, .io, .net, atau org dll).",
        },
      ];
    }
    return [];
  }, [remoteService, serviceSlug]);

  if (loading && !staticService && !pkgData) {
    return (
      <PillarLayout>
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-magenta rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">{tr("Memuat layanan...")}</p>
        </div>
      </PillarLayout>
    );
  }

  if (!pillar || !service) {
    return (
      <PillarLayout>
        <SEO title="Layanan Tidak Ditemukan" noindex={true} />
        <section className="px-4 py-24 text-center">
          <h1 className="text-3xl font-extrabold text-navy">{tr("Layanan tidak ditemukan")}</h1>
          <p className="mt-3 text-muted-foreground">{language === "en" ? "The service page you requested is unavailable." : "Halaman layanan yang Anda cari tidak tersedia."}</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 font-semibold text-magenta">
            <ArrowLeft className="h-4 w-4" /> {tr("Kembali ke Beranda")}
          </Link>
        </section>
      </PillarLayout>
    );
  }

  const ServiceIcon = staticService?.icon || Check;
  const canonicalUrl = `https://optibis.id/layanan/${pillarSlug}/${serviceSlug}`;

  const remoteData = (remoteService?.data || {});
  const effectivePrice = remoteData.price || pkgData?.price;
  const effectivePriceNote = remoteData.price_note || remoteData.price_period || pkgData?.priceNote;
  const effectiveTarget = remoteData.target || pkgData?.target;
  const effectiveTimeline = remoteData.timeline || pkgData?.timeline;
  const effectiveHighlights = (Array.isArray(remoteData.highlights) && remoteData.highlights.length > 0)
    ? remoteData.highlights
    : (pkgData?.highlights || []);
  const effectiveIncluded = (Array.isArray(remoteData.included) && remoteData.included.length > 0)
    ? remoteData.included
    : (pkgData?.included || []);
  const effectiveDeliverables = (Array.isArray(remoteData.deliverables) && remoteData.deliverables.length > 0)
    ? remoteData.deliverables
    : (pkgData?.deliverables || []);
  const effectiveFaqs = (Array.isArray(remoteData.faqs) && remoteData.faqs.length > 0)
    ? remoteData.faqs
    : (pkgData?.faqs || []);

  const packageSectionTitle =
    remoteData.packages_title ||
    (language === "en"
      ? `Package Options for ${service.name}`
      : `Pilihan Paket ${service.name}`);

  const packageSectionSubtitle =
    remoteData.packages_subtitle ||
    (language === "en"
      ? `Choose the ${(service.name || "").toLowerCase()} package that best fits your business needs and budget.`
      : `Pilih paket ${(service.name || "").toLowerCase()} yang sesuai dengan kebutuhan dan budget bisnis Anda.`);

  const serviceFeatures = (Array.isArray(service?.features) && service.features.length > 0)
    ? service.features
    : (Array.isArray(remoteData.features) && remoteData.features.length > 0)
    ? remoteData.features
    : (Array.isArray(staticService?.features) && staticService.features.length > 0)
    ? staticService.features
    : (Array.isArray(pkgData?.deliverables) && pkgData.deliverables.length > 0)
    ? pkgData.deliverables
    : [];

  const hasDistinctDeliverables = Boolean(
    effectiveDeliverables &&
    effectiveDeliverables.length > 0 &&
    !effectiveDeliverables.every((d) => serviceFeatures.includes(d))
  );

  const structuredData = [
    getBreadcrumbSchema([
      { name: "Beranda", url: "/" },
      { name: pillar.name, url: pillar.path },
      { name: service.name, url: canonicalUrl },
    ]),
    getServiceSchema({
      name: `${service.name} — ${pillar.name}`,
      description: service.desc,
      url: canonicalUrl,
      image: service.image,
      ...(effectivePrice ? { price: effectivePrice } : {}),
    }),
    ...(effectiveFaqs && effectiveFaqs.length ? [getFAQSchema(effectiveFaqs)] : []),
  ];

  const isFlyer = Boolean(
    pillarSlug === "website" ||
    service.image?.includes("paket-website") ||
    ["landing-page", "multi-page", "toko-online"].includes(serviceSlug)
  );

  return (
    <PillarLayout>
      <SEO
        title={`${service.name} (${pillar.name}) — Solusi Profesional`}
        description={service.desc || `Layanan ${service.name} dari pilar ${pillar.name} Optibis.`}
        image={service.image}
        canonicalUrl={canonicalUrl}
        structuredData={structuredData}
      />
      <section className={`border-b bg-white py-12 lg:py-16 ${pillar.border}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to={pillar.path} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-navy">
            <ArrowLeft className="h-4 w-4" /> {language === "en" ? "Back to" : "Kembali ke"} {pillar.name}
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${pillar.accentBg} ${pillar.accentText}`}>
                <ServiceIcon className="h-6 w-6" />
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${pillar.accentBg} ${pillar.accentText} text-xs font-bold`}>
                  <Layers className="w-3.5 h-3.5" /> {tr(pillar.name).toUpperCase()}
                </span>
                {effectivePrice && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-navy text-xs font-bold">
                    {effectivePrice} {effectivePriceNote && <span className="text-muted-foreground font-normal ml-1">({tr(effectivePriceNote)})</span>}
                  </span>
                )}
              </div>

              <h1 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">{tr(service.name)}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">{tr(service.desc)}</p>

              {(effectiveTarget || effectiveTimeline) && (
                <div className="flex flex-wrap gap-4 pt-3 text-sm text-navy">
                  {effectiveTarget && (
                    <div className="flex items-center gap-1.5">
                      <Target className={`w-4 h-4 ${pillar.accentText}`} />
                      <span>{tr(effectiveTarget)}</span>
                    </div>
                  )}
                  {effectiveTimeline && (
                    <div className="flex items-center gap-1.5">
                      <Clock className={`w-4 h-4 ${pillar.accentText}`} />
                      <span>{tr(effectiveTimeline)}</span>
                    </div>
                  )}
                </div>
              )}

              <Button onClick={() => nav("#konsultasi")} className={`mt-7 h-12 rounded-full px-8 text-white ${pillar.button}`}>
                {tr("Konsultasikan Layanan")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12 }}
              className={
                isFlyer
                  ? "flex items-center justify-center rounded-2xl border border-gray-200 bg-slate-50/70 p-3 sm:p-4 shadow-xl shadow-navy/10 overflow-hidden"
                  : "overflow-hidden rounded-xl border border-gray-100 shadow-xl shadow-navy/10"
              }
            >
              <img
                src={service.image}
                alt={service.name}
                className={
                  isFlyer
                    ? "h-auto max-h-[580px] w-auto max-w-full rounded-xl object-contain drop-shadow-lg transition-transform duration-500 hover:scale-[1.02]"
                    : "aspect-[4/3] w-full object-cover"
                }
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pilihan Paket Layanan (Matching Image 2 & Flyer) */}
      {servicePackages && servicePackages.length > 0 && (
        <section className="bg-white py-14 lg:py-20 border-b border-gray-200" id="paket-layanan">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-extrabold text-navy sm:text-4xl tracking-tight">
                {packageSectionTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
                {packageSectionSubtitle}
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 items-stretch">
              {servicePackages.map((pkg, index) => {
                const isPopular = Boolean(pkg.popular || pkg.is_popular);
                const feats = Array.isArray(pkg.features) ? pkg.features : [];

                return (
                  <motion.article
                    key={pkg.slug || index}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className={`relative flex flex-col rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                      isPopular
                        ? "border-2 border-magenta bg-white shadow-xl shadow-magenta/15 md:-translate-y-2 z-10"
                        : "border border-gray-300 hover:border-magenta/40 bg-white hover:shadow-lg"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-magenta px-4 py-1 text-xs font-bold text-white shadow-md shadow-magenta/30 tracking-wide">
                        <Star className="h-3.5 w-3.5 fill-current" /> {tr(pkg.badge || "Populer")}
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-extrabold text-navy tracking-tight">{tr(pkg.name)}</h3>
                        {pkg.target && (
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{tr(pkg.target)}</p>
                        )}
                      </div>
                      {pkg.discount && (
                        <span className="shrink-0 rounded-full bg-magenta/10 px-2.5 py-0.5 text-[11px] font-bold text-magenta">
                          {tr(pkg.discount)}
                        </span>
                      )}
                    </div>

                    <div className="my-5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{tr("Mulai dari")}</span>
                        {pkg.original_price && (
                          <span className="text-xs text-muted-foreground line-through decoration-slate-400">
                            {pkg.original_price}
                          </span>
                        )}
                      </div>
                      <div className="text-3xl font-extrabold text-navy tracking-tight mt-1">{pkg.price}</div>
                      {pkg.renewal && (
                        <div className="text-xs text-muted-foreground mt-1.5 font-medium">
                          {tr(pkg.renewal)}
                        </div>
                      )}
                    </div>

                    <ul className="mb-6 space-y-2.5 flex-1 border-t border-gray-100 pt-5">
                      {feats.map((feat, fIdx) => {
                        const featText = typeof feat === "string" ? feat : feat.text;
                        const isIncluded =
                          typeof feat === "string"
                            ? !feat.toLowerCase().startsWith("tanpa ")
                            : feat.included !== false;

                        return (
                          <li key={fIdx} className="flex items-start gap-2.5 text-sm">
                            {isIncluded ? (
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
                            ) : (
                              <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                            )}
                            <span className={isIncluded ? "text-navy-300" : "text-muted-foreground/75"}>
                              {tr(featText)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <a
                      href={`https://wa.me/6287772577020?text=${encodeURIComponent(
                        `Halo Optibis, saya tertarik untuk konsultasi dan memesan layanan ${service.name} Paket ${pkg.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex h-11 w-full items-center justify-center rounded-xl bg-magenta px-4 text-sm font-bold text-white transition-colors hover:bg-magenta-500 shadow-md shadow-magenta/20"
                    >
                      {tr("Pilih Paket")}
                    </a>
                  </motion.article>
                );
              })}
            </div>

            {/* Extra Info / Add-ons bar from flyer */}
            {packageAddons && packageAddons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mx-auto mt-10 max-w-5xl rounded-2xl border border-gray-200 bg-slate-50/70 p-5 sm:p-6"
              >
                <div className="grid gap-6 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/70">
                  {packageAddons.map((addon, aIdx) => (
                    <div key={aIdx} className={`flex items-start gap-3.5 ${aIdx > 0 ? "pt-5 sm:pt-0 sm:pl-6" : ""}`}>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-magenta/10 text-magenta font-bold text-sm">
                        {aIdx === 0 ? "📄" : "🌐"}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-navy">{tr(addon.title)}:</h4>
                          <span className="rounded-md bg-magenta/10 px-2 py-0.5 text-xs font-semibold text-magenta">
                            {addon.price}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{tr(addon.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Highlights */}
      {effectiveHighlights && effectiveHighlights.length > 0 && (
        <PackageHighlights
          highlights={effectiveHighlights}
          theme={pkgData?.theme || { color: "amethyst", badge: `${pillar.accentBg} ${pillar.accentText}`, border: pillar.border, btn: pillar.button }}
          eyebrow={tr("Keunggulan Layanan")}
          title={tr("Mengapa Memilih Layanan Ini?")}
          description={tr("Tiga alasan utama mengapa layanan ini memberikan nilai terbaik untuk bisnis Anda.")}
        />
      )}

      {/* Yang Termasuk dalam Layanan */}
      {serviceFeatures && serviceFeatures.length > 0 && (
        <section className="bg-slate-50/50 py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${pillar.accentBg} ${pillar.accentText} text-xs font-bold mb-3`}>
                <Check className="w-3.5 h-3.5" /> {tr("CAKUPAN LAYANAN")}
              </span>
              <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">{tr("Yang Termasuk dalam Layanan")}</h2>
              <p className="mt-3 text-muted-foreground">{language === "en" ? `The main deliverables included in ${tr(service.name)}.` : `Cakupan utama yang akan Anda dapatkan dari layanan ${tr(service.name)}.`}</p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {serviceFeatures.map((feature, index) => (
                <motion.div
                  key={feature + index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <Check className={`mt-0.5 h-5 w-5 shrink-0 ${pillar.accentText}`} />
                  <span className="text-sm font-medium text-navy-300">{tr(feature)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Included / Detail Layanan */}
      {effectiveIncluded && effectiveIncluded.length > 0 && (
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${pillar.accentBg} ${pillar.accentText} text-xs font-bold mb-3`}>
                <PackageIcon className="w-3.5 h-3.5" /> {tr("YANG ANDA DAPATKAN")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-3">{tr("Detail Layanan")}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{tr("Setiap item dirancang untuk memberikan dampak nyata bagi bisnis Anda.")}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {effectiveIncluded.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-300 overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 group hover:-translate-y-2"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={item.image || service.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <div className={`absolute top-3 left-3 w-8 h-8 rounded-lg ${pillar.accentBg} ${pillar.accentText} flex items-center justify-center backdrop-blur-sm`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <h3 className="absolute bottom-3 left-3 right-3 text-sm font-bold text-white leading-tight">{tr(item.title)}</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">{tr(item.desc)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables */}
      {hasDistinctDeliverables && (
        <section className="py-12 lg:py-16 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-3">{tr("File & Deliverables")}</h2>
              <p className="text-muted-foreground">{tr("Semua file dan akses yang akan Anda terima setelah proyek selesai.")}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
              <ul className="grid sm:grid-cols-2 gap-3">
                {effectiveDeliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-navy">
                    <div className={`w-5 h-5 rounded-full ${pillar.accentBg} ${pillar.accentText} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3" />
                    </div>
                    {tr(d)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {effectiveFaqs && effectiveFaqs.length > 0 && (
          <section className="bg-slate-50/30 py-12 dark:bg-navy-600 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h2 className="mb-3 text-2xl font-extrabold text-navy dark:text-white sm:text-3xl">{tr("Pertanyaan Umum")}</h2>
                <p className="text-muted-foreground dark:text-navy-100">{tr("Hal-hal yang sering ditanyakan tentang layanan ini.")}</p>
            </div>
            <PackageFAQ faqs={effectiveFaqs} />
          </div>
        </section>
      )}

      <section className="bg-navy px-4 py-16 text-center text-white">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{language === "en" ? `Need ${tr(service.name)}?` : `Butuh Layanan ${service.name}?`}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">{language === "en" ? "Discuss your business needs with the Optibis team." : "Diskusikan kebutuhan bisnis Anda bersama tim Optibis."}</p>
        <a
          href="https://wa.me/6287772577020"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green-500 px-8 text-sm font-semibold text-white transition-colors hover:bg-green-600"
        >
          <MessageCircle className="h-4 w-4" /> {tr("Chat WhatsApp")}
        </a>
      </section>
    </PillarLayout>
  );
}
