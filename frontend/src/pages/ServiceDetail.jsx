import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Clock, Target, Layers, Package as PackageIcon } from "lucide-react";
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
  const pillar = PILLARS[pillarSlug];
  const pkgData = PACKAGE_DATA[serviceSlug];
  const staticService = pillar?.services.find((item) => (item.slug && item.slug === serviceSlug) || getServiceSlug(item.name) === serviceSlug);

  const [remoteService, setRemoteService] = React.useState(null);

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/modules/services`)
      .then((res) => (res.ok ? res.json() : []))
      .then((items) => {
        if (Array.isArray(items)) {
          const match = items.find(
            (item) =>
              (item.slug === serviceSlug || getServiceSlug(item.title) === serviceSlug) &&
              (!pillarSlug || item.data?.pillar === pillarSlug || !item.data?.pillar)
          );
          if (match && match.is_published) {
            setRemoteService(match);
          }
        }
      })
      .catch(() => {});
  }, [pillarSlug, serviceSlug]);

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
        <section className="py-12 lg:py-16 bg-slate-50/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-3">{tr("Pertanyaan Umum")}</h2>
              <p className="text-muted-foreground">{tr("Hal-hal yang sering ditanyakan tentang layanan ini.")}</p>
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
