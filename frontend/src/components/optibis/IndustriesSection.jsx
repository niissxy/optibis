import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Home, Stethoscope, GraduationCap, UtensilsCrossed, Sparkles, HardHat, Truck, User, Landmark, Heart, Building2, ArrowRight, X, CheckCircle2, Lightbulb, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const INDUSTRIES = [
  {
    icon: Plane, name: "Travel & Tour", desc: "Travel, umrah, wisata religi",
    challenges: ["Booking manual yang lambat", "Konten travel kurang menarik", "Iklan tidak targeted"],
    solutions: ["Website dengan booking system", "Konten travel yang inspiratif", "Meta Ads targeting audiens tepat"],
    services: ["Website", "Social Media", "Ads Campaign"],
  },
  {
    icon: Home, name: "Properti", desc: "Real estate, developer, agen",
    challenges: ["Galeri proyek kurang menarik", "Inquiry form tidak optimal", "Brand belum terpercaya"],
    solutions: ["Website dengan galeri interaktif", "Sistem inquiry & lead management", "Brand identity premium"],
    services: ["Brand Identity", "Company Website", "CMS"],
  },
  {
    icon: Stethoscope, name: "Kesehatan", desc: "Klinik, dokter, dental, wellness",
    challenges: ["Appointment via telepon lambat", "Konten edukasi pasien kurang", "Brand klinik belum dikenal"],
    solutions: ["Website booking real-time", "Konten edukasi kesehatan", "Branding klinik yang tepercaya"],
    services: ["Website Growth System", "Social Media", "Booking System"],
  },
  {
    icon: GraduationCap, name: "Pendidikan", desc: "Sekolah, kursus, training",
    challenges: ["Pendaftaran masih manual", "Informasi program tersebar", "Brand sekolah kurang online"],
    solutions: ["Website dengan sistem pendaftaran", "Halaman program yang terstruktur", "Branding sekolah modern"],
    services: ["Company Website", "CMS", "Social Media"],
  },
  {
    icon: UtensilsCrossed, name: "Kuliner", desc: "Restoran, coffee shop, catering",
    challenges: ["Konten food tidak konsisten", "Brand outlet belum seragam", "Iklan promo kurang efektif"],
    solutions: ["Brand identity untuk semua outlet", "Konten food photography", "Iklan promo Meta & TikTok"],
    services: ["Brand Identity", "Content Management", "Meta & TikTok Ads"],
  },
  {
    icon: Sparkles, name: "Beauty", desc: "Salon, skincare, spa",
    challenges: ["Booking bingung via WhatsApp", "Galeri before-after kurang", "Brand belum premium"],
    solutions: ["Website dengan booking online", "Galeri portfolio treatment", "Brand identity elegan"],
    services: ["Brand Identity", "Website", "Social Media"],
  },
  {
    icon: HardHat, name: "Kontraktor", desc: "Interior, arsitektur, konstruksi",
    challenges: ["Portfolio proyek sulit ditampilkan", "Spesifikasi teknis tidak rapi", "Klien B2B butuh presentasi"],
    solutions: ["Website dengan galeri proyek detail", "Halaman spesifikasi terstruktur", "Company profile premium"],
    services: ["Company Website", "Portfolio Gallery", "Company Profile"],
  },
  {
    icon: Truck, name: "Distributor", desc: "Retail, manufaktur, supplier",
    challenges: ["Katalog produk tidak online", "Order masih via telepon", "Brand B2B belum profesional"],
    solutions: ["Website katalog produk", "Sistem order online B2B", "Brand identity korporat"],
    services: ["Company Website", "E-commerce", "Brand Identity"],
  },
  {
    icon: User, name: "Personal Brand", desc: "Konsultan, trainer, pembicara",
    challenges: ["Belum punya portfolio online", "Brand personal belum kuat", "Klien datang dari referral saja"],
    solutions: ["Portfolio website dengan blog", "Personal branding yang kuat", "SEO untuk ditemukan Google"],
    services: ["Personal Branding", "Portfolio Website", "SEO"],
  },
  {
    icon: Landmark, name: "Corporate", desc: "Perusahaan besar, holding",
    challenges: ["Website lama tidak responsif", "Brand tidak konsisten antar divisi", "Sulit update konten"],
    solutions: ["Website korporat premium", "Brand guideline untuk semua divisi", "CMS untuk update mandiri"],
    services: ["Company Website", "Brand Identity", "CMS"],
  },
  {
    icon: Heart, name: "Organisasi", desc: "Yayasan, komunitas, NGO",
    challenges: ["Belum punya website resmi", "Konten kegiatan tidak terdokumentasi", "Donasi/pendaftaran manual"],
    solutions: ["Website organisasi yang kredibel", "Galeri kegiatan & dokumentasi", "Sistem donasi/pendaftaran online"],
    services: ["Company Website", "Social Media", "CMS"],
  },
  {
    icon: Building2, name: "Multi-Cabang", desc: "Franchise, chain, multi-brand",
    challenges: ["Brand tidak seragam antar cabang", "Sistem tidak terintegrasi", "Konten berbeda di tiap cabang"],
    solutions: ["Brand guideline konsisten", "Sistem terintegrasi multi-cabang", "Strategi konten terpusat"],
    services: ["Brand Identity", "Website Growth System", "Social Media"],
  },
];

export default function IndustriesSection() {
  const nav = useSafeNav();
  const { tr } = useLanguage();
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-14 lg:py-20 bg-slate-50/50" id="industri">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Industri Kami" title="Solusi Digital untuk Berbagai Industri" description="Kami memahami kebutuhan unik setiap industri dan menyediakan solusi yang tepat sasaran. Klik untuk melihat detail tantangan & solusinya." className="mb-14" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelected(ind)}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-xl border border-gray-100 p-4 text-center hover:border-magenta/20 hover:shadow-xl hover:shadow-magenta/10 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-magenta-50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <ind.icon className="w-6 h-6 text-navy-300 group-hover:text-magenta transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-navy mb-0.5">{tr(ind.name)}</h3>
              <p className="text-[11px] text-muted-foreground">{tr(ind.desc)}</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-[10px] font-semibold text-magenta opacity-0 group-hover:opacity-100 transition-opacity">
                {tr("Lihat Detail")} <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" onClick={() => nav("#konsultasi")} className="rounded-full border-navy-100 text-navy font-semibold">
            {tr("Konsultasi Industri Anda")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-navy via-navy-400 to-navy p-6 lg:p-8 rounded-t-3xl">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-magenta/20 flex items-center justify-center shrink-0">
                    <selected.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-extrabold text-white">{tr(selected.name)}</h3>
                    <p className="text-sm text-white/70">{tr(selected.desc)}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 space-y-6">
                {/* Challenges */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-red-500" />
                    </div>
                    <h4 className="text-sm font-bold text-navy">{tr("Tantangan yang Sering Dihadapi")}</h4>
                  </div>
                  <div className="space-y-2 pl-1">
                    {selected.challenges.map((c) => (
                      <div key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                        {tr(c)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <h4 className="text-sm font-bold text-navy">{tr("Solusi dari Optibis")}</h4>
                  </div>
                  <div className="space-y-2 pl-1">
                    {selected.solutions.map((s) => (
                      <div key={s} className="flex items-start gap-2 text-sm text-navy">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {tr(s)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Services */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-magenta-50 flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-magenta" />
                    </div>
                    <h4 className="text-sm font-bold text-navy">{tr("Layanan yang Direkomendasikan")}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.services.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-navy-50 text-navy border border-navy-100">
                        {tr(s)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2 border-t border-gray-50">
                  <Button
                    onClick={() => { setSelected(null); nav("#konsultasi"); }}
                    className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full h-11"
                  >
                    {tr("Konsultasi untuk Industri")} {tr(selected.name)} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
