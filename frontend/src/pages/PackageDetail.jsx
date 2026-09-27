import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Star, Clock, Target, Package as PackageIcon, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import PackageHighlights from "@/components/optibis/PackageHighlights";
import PackageFAQ from "@/components/optibis/PackageFAQ";
import ClientLogosSlider from "@/components/optibis/ClientLogosSlider";
import { getPackageBySlug, getNextPackage } from "@/data/packages";
import { useSafeNav } from "@/hooks/useSafeNav";

export default function PackageDetail() {
  const { pillarSlug, packageSlug } = useParams();
  const navigate = useNavigate();
  const nav = useSafeNav();

  const pkg = getPackageBySlug(packageSlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [packageSlug]);

  if (!pkg) {
    return (
      <PillarLayout>
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-extrabold text-navy mb-4">Paket tidak ditemukan</h1>
          <p className="text-muted-foreground mb-6">Paket yang Anda cari tidak tersedia.</p>
          <Button onClick={() => navigate("/")} className="bg-magenta hover:bg-magenta-500 text-white rounded-full">
            Kembali ke Beranda
          </Button>
        </div>
      </PillarLayout>
    );
  }

  const t = pkg.theme;
  const nextPkg = getNextPackage(pkg.slug);
  const pillarRoute = `/${pkg.pillarSlug}`;

  return (
    <PillarLayout>
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-navy transition-colors">Beranda</Link>
          <span>/</span>
          <Link to={pillarRoute} className="hover:text-navy transition-colors">{pkg.pillar}</Link>
          <span>/</span>
          <span className="text-navy font-medium">{pkg.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className={`relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b ${t.gradient}`}>
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${t.glow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link to={pillarRoute} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke {pkg.pillar}
          </Link>
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${t.badge} text-xs font-bold`}>
                  <Layers className="w-3.5 h-3.5" /> {pkg.pillar.toUpperCase()}
                </span>
                {pkg.popular && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-magenta text-white text-xs font-bold">
                    <Star className="w-3 h-3" /> Paling Populer
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
                Paket {pkg.name}
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {pkg.heroDesc}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-navy">
                  <Target className={`w-4 h-4 ${t.check}`} />
                  {pkg.target}
                </div>
                <div className="flex items-center gap-2 text-sm text-navy">
                  <Clock className={`w-4 h-4 ${t.check}`} />
                  {pkg.timeline}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={() => nav("#konsultasi")}
                  className={`${t.btn} text-white rounded-full px-8 h-12 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 group`}
                >
                  Konsultasi Sekarang <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            {/* Package Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              {pkg.heroImage ? (
                <div className={`overflow-hidden rounded-2xl border-2 ${pkg.popular ? t.border : "border-gray-300"} bg-white shadow-xl lg:sticky lg:top-24`}>
                  <img src={pkg.heroImage} alt={`Paket ${pkg.name}`} className="aspect-[3/4] w-full object-cover" />
                </div>
              ) : (
                <div className={`bg-white rounded-2xl border-2 ${pkg.popular ? t.border : "border-gray-300"} shadow-xl p-6 lg:sticky lg:top-24`}>
                  <div className="text-center pb-5 border-b border-gray-50">
                    <p className="text-xs text-muted-foreground mb-1">Mulai dari</p>
                    <div className="text-3xl font-extrabold text-navy">{pkg.price}</div>
                    <p className="text-xs text-muted-foreground mt-1">{pkg.priceNote}</p>
                  </div>
                  <ul className="space-y-2.5 py-5">
                    {pkg.included.slice(0, 7).map((item) => (
                      <li key={item.title} className="flex items-start gap-2 text-sm text-navy">
                        <Check className={`w-4 h-4 ${t.check} shrink-0 mt-0.5`} />
                        <span><strong className="font-semibold">{item.title}</strong></span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => nav("#konsultasi")} className={`w-full ${t.btn} text-white rounded-full h-11 font-semibold mb-2 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95`}>Pilih Paket Ini</Button>
                  <p className="text-center text-xs text-muted-foreground mt-2">Konsultasi gratis - Tanpa biaya tersembunyi</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogosSlider />

      {/* Highlights */}
      <PackageHighlights highlights={pkg.highlights} theme={t} />

      {/* What's Included */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${t.badge} text-xs font-bold mb-3`}>
              <PackageIcon className="w-3.5 h-3.5" /> YANG ANDA DAPATKAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-3">Detail Layanan dalam Paket</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Setiap item dirancang untuk memberikan dampak nyata bagi bisnis Anda.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pkg.included.map((item, i) => (
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
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <div className={`absolute top-3 left-3 w-8 h-8 rounded-lg ${t.badge} flex items-center justify-center backdrop-blur-sm`}>
                    <Check className={`w-4 h-4 ${t.check}`} />
                  </div>
                  <h3 className="absolute bottom-3 left-3 right-3 text-sm font-bold text-white leading-tight">{item.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-3">File & Deliverables</h2>
            <p className="text-muted-foreground">Semua file dan akses yang akan Anda terima setelah proyek selesai.</p>
          </div>
          <div className="bg-slate-50/50 rounded-2xl p-6 lg:p-8">
            <ul className="grid sm:grid-cols-2 gap-3">
              {pkg.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-navy">
                  <div className={`w-5 h-5 rounded-full ${t.badge} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className={`w-3 h-3 ${t.check}`} />
                  </div>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-3">Pertanyaan Umum</h2>
            <p className="text-muted-foreground">Hal-hal yang sering ditanyakan tentang paket ini.</p>
          </div>
          <PackageFAQ faqs={pkg.faqs} />
        </div>
      </section>

      {/* Next Package */}
      {nextPkg && (
        <section className="py-10 bg-white border-t border-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to={`/paket/${nextPkg.pillarSlug}/${nextPkg.slug}`}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 group"
            >
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground mb-1">Paket Berikutnya</p>
                <h3 className="text-lg font-bold text-navy group-hover:text-magenta transition-colors">
                  {nextPkg.name}
                </h3>
                <p className="text-xs text-muted-foreground">{nextPkg.pillar} • {nextPkg.price}</p>
              </div>
              <div className="flex items-center gap-2 text-magenta font-semibold text-sm">
                Lihat Paket <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      )}
    </PillarLayout>
  );
}
