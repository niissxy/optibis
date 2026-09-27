import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MapPin, Calendar, Building2, X, ChevronLeft, ChevronRight, TrendingUp, MessageCircle, Sparkles, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import DocumentViewer from "@/components/optibis/DocumentViewer";
import { getPortfolioBySlug, getOtherPortfolios } from "@/data/portfolio";
import { useSafeNav } from "@/hooks/useSafeNav";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const nav = useSafeNav();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const project = getPortfolioBySlug(slug);

  if (!project) {
    return (
      <PillarLayout>
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-extrabold text-navy mb-4">Proyek tidak ditemukan</h1>
          <p className="text-muted-foreground mb-6">Proyek portofolio yang Anda cari tidak tersedia.</p>
          <Link to="/#portofolio">
            <Button className="bg-magenta hover:bg-magenta-500 text-white rounded-full">
              Kembali ke Portofolio
            </Button>
          </Link>
        </div>
      </PillarLayout>
    );
  }

  const otherProjects = getOtherPortfolios(slug, 3);
  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((p) => (p === null ? null : (p + 1) % project.galeri.length));
  const prevImage = () => setLightboxIndex((p) => (p === null ? null : (p - 1 + project.galeri.length) % project.galeri.length));

  return (
    <PillarLayout>
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-navy transition-colors">Beranda</Link>
          <span>/</span>
          <Link to="/#portofolio" className="hover:text-navy transition-colors">Portofolio</Link>
          <span>/</span>
          <span className="text-navy font-medium">{project.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-navy-50/30 to-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-magenta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link to="/#portofolio" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Portofolio
          </Link>
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta-50 text-magenta text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> {project.industry.toUpperCase()}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-navy text-white text-xs font-bold">
                    Featured Project
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
                {project.name}
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                {project.ringkasan}
              </p>
              <div className="flex flex-wrap gap-5 pt-2">
                <div className="flex items-center gap-2 text-sm text-navy">
                  <Building2 className="w-4 h-4 text-magenta" /> {project.client}
                </div>
                <div className="flex items-center gap-2 text-sm text-navy">
                  <MapPin className="w-4 h-4 text-magenta" /> {project.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-navy">
                  <Calendar className="w-4 h-4 text-magenta" /> {project.year}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={() => nav("#konsultasi")}
                  className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 shadow-lg shadow-magenta/20"
                >
                  Konsultasi Proyek Serupa <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                {project.website_url && (
                  <a
                    href={project.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-navy hover:bg-navy-400 text-white text-sm font-semibold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Kunjungi Website
                  </a>
                )}
                <a
                  href="https://wa.me/6287772577020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Chat WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-navy/10">
                <img src={project.thumbnail} alt={project.name} className="w-full h-64 lg:h-80 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {project.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-gradient-to-b from-navy-50/50 to-white rounded-2xl border border-gray-100 p-5 text-center"
              >
                <div className="text-2xl lg:text-3xl font-extrabold text-magenta mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta-50 text-magenta text-xs font-bold mb-3">
              TENTANG PROYEK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-4">Cerita di Balik Proyek</h2>
            <p className="text-base text-muted-foreground leading-relaxed">{project.deskripsi}</p>
          </div>

          {/* Services & Tags */}
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-navy mb-4">Layanan yang Diberikan</h3>
              <div className="space-y-2.5">
                {project.products.map((prod) => (
                  <div key={prod} className="flex items-center gap-2 text-sm text-navy">
                    <Check className="w-4 h-4 text-magenta shrink-0" /> {prod}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-navy mb-4">Pilar Layanan</h3>
              <div className="flex flex-wrap gap-2">
                {project.pilar.map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-navy-50 text-navy border border-navy-100">
                    {p}
                  </span>
                ))}
              </div>
              <h3 className="text-sm font-bold text-navy mb-3 mt-5">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-50 text-muted-foreground border border-gray-100">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta-50 text-magenta text-xs font-bold mb-3">
              GALERI PROYEK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2">Galeri Foto</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">Klik pada foto untuk melihat lebih detail.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.galeri.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => openLightbox(i)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
              >
                <img
                  src={img}
                  alt={`${project.name} galeri ${i + 1}`}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${i === 0 ? "h-48 sm:h-64 lg:h-full min-h-[300px]" : "h-44"}`}
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      {project.documents && project.documents.length > 0 && (
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta-50 text-magenta text-xs font-bold mb-3">
                <FileText className="w-3.5 h-3.5" /> DOKUMEN PROYEK
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2">Dokumen & Deliverables</h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">Lihat dokumen pendukung dan hasil deliverables dari proyek ini.</p>
            </div>
            <DocumentViewer documents={project.documents} projectName={project.name} />
          </div>
        </section>
      )}

      {/* Work Process */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta-50 text-magenta text-xs font-bold mb-3">
              PROSES KERJA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2">Bagaimana Kami Mengerjakannya</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">Setiap langkah dirancang untuk memastikan hasil yang maksimal dan transparan untuk klien.</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-magenta/20 via-magenta/10 to-transparent -translate-x-1/2" />
            <div className="space-y-6 lg:space-y-0">
              {project.process.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${i % 2 === 0 ? "" : "lg:[direction:rtl]"}`}
                >
                  <div className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow ${i % 2 === 0 ? "lg:text-right" : "lg:[direction:ltr]"}`}>
                    <div className="flex items-center gap-3 mb-3 lg:justify-start" style={i % 2 === 0 ? { justifyContent: "flex-end" } : {}}>
                      <div className="w-10 h-10 rounded-xl bg-magenta text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                        {step.num}
                      </div>
                      <h3 className="text-base font-bold text-navy">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy via-navy-400 to-navy rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(233,30,99,0.15),transparent_60%)]" />
            <div className="relative z-10">
              <TrendingUp className="w-10 h-10 mx-auto mb-4 text-magenta" />
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Hasil yang Dicapai</h2>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">{project.hasil}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-4">Ingin Hasil Serupa untuk Bisnis Anda?</h2>
          <p className="text-muted-foreground mb-8">Konsultasikan kebutuhan bisnis Anda secara gratis. Tim kami akan membantu merancang solusi yang tepat.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => nav("#konsultasi")}
              className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 shadow-xl shadow-magenta/30 w-full sm:w-auto"
            >
              Konsultasi Gratis <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a
              href="https://wa.me/6287772577020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" /> Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-t border-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2">Proyek Lainnya</h2>
              <p className="text-sm text-muted-foreground">Lihat hasil kerja kami untuk klien lain.</p>
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
                    <div className="h-40 overflow-hidden">
                      <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{p.industry}</span>
                      <h3 className="text-base font-bold text-navy mb-1 group-hover:text-magenta transition-colors">{p.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{p.ringkasan}</p>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-magenta mt-3 group-hover:gap-2.5 transition-all">
                        Lihat Detail <ArrowRight className="w-4 h-4" />
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
            src={project.galeri[lightboxIndex]}
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
            {lightboxIndex + 1} / {project.galeri.length}
          </div>
        </div>
      )}
    </PillarLayout>
  );
}
