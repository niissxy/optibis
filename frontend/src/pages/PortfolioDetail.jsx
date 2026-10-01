import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MapPin, Calendar, Building2, X, ChevronLeft, ChevronRight, TrendingUp, MessageCircle, Sparkles, ExternalLink, FileText } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import DocumentViewer from "@/components/optibis/DocumentViewer";
import { usePortfolios } from "@/hooks/usePortfolios";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import { getBreadcrumbSchema, SITE_CONFIG } from "@/lib/seoData";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const nav = useSafeNav();
  const { tr } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { portfolios, loading } = usePortfolios();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const project = portfolios.find(
    (p) => p.slug === slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
  );

  if (loading && !project) {
    return (
      <PillarLayout>
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-magenta rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">{tr("Memuat detail portofolio...")}</p>
        </div>
      </PillarLayout>
    );
  }

  if (!project) {
    return (
      <PillarLayout>
        <SEO title="Portofolio Tidak Ditemukan" noindex={true} />
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-extrabold text-navy mb-4">{tr("Proyek tidak ditemukan")}</h1>
          <p className="text-muted-foreground mb-6">{tr("Proyek portofolio yang Anda cari tidak tersedia atau belum dipublikasikan.")}</p>
          <Button onClick={() => navigate("/portofolio")} className="bg-magenta hover:bg-magenta-500 text-white rounded-full">
            {tr("Kembali ke Portofolio")}
          </Button>
        </div>
      </PillarLayout>
    );
  }

  const otherProjects = portfolios.filter((p) => p.slug !== project.slug).slice(0, 3);
  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const galleryList = Array.isArray(project.galeri) && project.galeri.length > 0 ? project.galeri : [project.thumbnail || FALLBACK_IMG];
  const nextImage = () => setLightboxIndex((p) => (p === null ? null : (p + 1) % galleryList.length));
  const prevImage = () => setLightboxIndex((p) => (p === null ? null : (p - 1 + galleryList.length) % galleryList.length));

  const canonicalUrl = `https://optibis.id/portofolio/${project.slug}`;
  const projectDesc = project.deskripsi || project.ringkasan || `Studi kasus portofolio ${project.name} untuk klien ${project.client}.`;

  const structuredData = [
    getBreadcrumbSchema([
      { name: "Beranda", url: "/" },
      { name: "Portofolio", url: "/portofolio" },
      { name: project.name, url: canonicalUrl },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.name,
      "headline": `Studi Kasus: ${project.name}`,
      "description": projectDesc,
      "image": project.thumbnail || FALLBACK_IMG,
      "url": canonicalUrl,
      "creator": {
        "@type": "Organization",
        "name": SITE_CONFIG.name,
      },
      "provider": {
        "@type": "Organization",
        "name": project.client,
      },
    },
  ];

  return (
    <PillarLayout>
      <SEO
        title={`Portofolio: ${project.name} (${project.client})`}
        description={projectDesc}
        image={project.thumbnail || FALLBACK_IMG}
        canonicalUrl={canonicalUrl}
        structuredData={structuredData}
      />
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-navy transition-colors">{tr("Beranda")}</Link>
          <span>/</span>
          <Link to="/portofolio" className="hover:text-navy transition-colors">{tr("Portofolio")}</Link>
          <span>/</span>
          <span className="text-navy font-medium">{project.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-navy-50/30 to-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-magenta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link to="/portofolio" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {tr("Kembali ke Portofolio")}
          </Link>
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta-50 text-magenta text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> {tr(project.industry || project.categoryLabel || "WEBSITE").toUpperCase()}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-navy text-white text-xs font-bold">
                    {tr("Featured Project")}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
                {project.name}
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                {tr(project.ringkasan || project.desc)}
              </p>
              <div className="flex flex-wrap gap-5 pt-2">
                {project.client && (
                  <div className="flex items-center gap-2 text-sm text-navy">
                    <Building2 className="w-4 h-4 text-magenta" /> {project.client}
                  </div>
                )}
                {project.location && (
                  <div className="flex items-center gap-2 text-sm text-navy">
                    <MapPin className="w-4 h-4 text-magenta" /> {project.location}
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center gap-2 text-sm text-navy">
                    <Calendar className="w-4 h-4 text-magenta" /> {project.year}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={() => nav("#konsultasi")}
                  className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 shadow-lg shadow-magenta/20"
                >
                  {tr("Konsultasi Proyek Serupa")} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                {project.website_url && project.website_url !== "#" && (
                  <a
                    href={project.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-navy hover:bg-magenta text-white text-sm font-semibold transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" /> {tr("Kunjungi Website")}
                  </a>
                )}
                <a
                  href="https://wa.me/6287772577020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> {tr("Chat WhatsApp")}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-navy/10 bg-gray-100">
                <img
                  src={project.thumbnail || FALLBACK_IMG}
                  alt={project.name}
                  className="w-full h-64 lg:h-80 object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {project.stats && project.stats.length > 0 && (
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.stats.map((s, i) => (
                <div key={i} className="bg-slate-50/70 rounded-2xl p-6 border border-gray-100 text-center">
                  <div className="text-2xl lg:text-3xl font-extrabold text-magenta mb-1">{s.value}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{tr(s.label)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description & Details */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-navy mb-4">{tr("Tentang Proyek")}</h2>
                <p className="text-base text-navy-400 leading-relaxed whitespace-pre-line">
                  {tr(project.deskripsi || project.desc || project.ringkasan)}
                </p>
              </div>

              {project.hasil && (
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 text-magenta font-bold text-sm mb-2">
                    <TrendingUp className="w-4 h-4" /> {tr("Hasil & Dampak")}
                  </div>
                  <p className="text-sm font-semibold text-navy leading-relaxed">
                    {tr(project.hasil)}
                  </p>
                </div>
              )}

              {/* Process Timeline */}
              {project.process && project.process.length > 0 && (
                <div className="pt-6">
                  <h3 className="text-xl font-extrabold text-navy mb-6">{tr("Tahapan Pengerjaan")}</h3>
                  <div className="space-y-4">
                    {project.process.map((step, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-magenta-50 text-magenta font-extrabold text-xs shrink-0">
                          {step.num || idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-navy mb-1">{tr(step.title)}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{tr(step.desc)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                {project.pilar && project.pilar.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{tr("Pilar Solusi")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.pilar.map((p) => (
                        <span key={p} className="px-3 py-1 rounded-full bg-navy-50 text-navy text-xs font-semibold">
                          {tr(p)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.products && project.products.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{tr("Produk / Layanan")}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.products.map((prod) => (
                        <span key={prod} className="px-2.5 py-1 rounded-md bg-magenta-50 text-magenta text-xs font-medium">
                          {tr(prod)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{tr("Tags")}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-gray-100 text-navy-400 text-xs">
                          #{tr(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryList.length > 1 && (
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-8 text-center">{tr("Galeri Proyek")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryList.map((imgUrl, i) => (
                <div
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 shadow-sm"
                >
                  <img
                    src={imgUrl}
                    alt={`${project.name} preview ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                  <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-navy text-xs font-bold shadow">
                      {tr("Perbesar")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Documents */}
      {project.documents && project.documents.length > 0 && (
        <DocumentViewer documents={project.documents} projectName={project.name} />
      )}

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-gradient-to-r from-navy via-navy-400 to-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            {tr("Ingin Membangun Proyek Seperti Ini?")}
          </h2>
          <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
            {tr("Konsultasikan ide bisnis Anda bersama tim ahli Optibis secara gratis dan dapatkan rekomendasi solusi terbaik.")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => nav("#konsultasi")}
              className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 shadow-xl shadow-magenta/30 w-full sm:w-auto"
            >
              {tr("Konsultasi Gratis")} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a
              href="https://wa.me/6287772577020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" /> {tr("Chat WhatsApp")}
            </a>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-t border-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2">{tr("Proyek Lainnya")}</h2>
              <p className="text-sm text-muted-foreground">{tr("Lihat hasil kerja kami untuk klien lain.")}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherProjects.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/portofolio/${p.slug}`}
                    className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-40 overflow-hidden bg-gray-100">
                      <img
                        src={p.thumbnail || FALLBACK_IMG}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_IMG;
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{tr(p.industry)}</span>
                      <h3 className="text-base font-bold text-navy mb-1 group-hover:text-magenta transition-colors">{p.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{tr(p.ringkasan)}</p>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-magenta mt-3 group-hover:gap-2.5 transition-all">
                        {tr("Lihat Detail")} <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <img
            src={galleryList[lightboxIndex]}
            alt={`${project.name} foto ${lightboxIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {galleryList.length}
          </div>
        </div>
      )}
    </PillarLayout>
  );
}
