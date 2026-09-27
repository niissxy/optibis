import React from "react";
import { motion } from "framer-motion";
import { Clock, ExternalLink, Globe2, MapPin, Navigation, Phone, Quote, Star } from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const TESTIMONIALS = [
  {
    nama: "Andi Wijaya",
    jabatan: "CEO",
    perusahaan: "MyTravelink",
    teks: "Optibis benar-benar memahami kebutuhan bisnis kami. Dari branding sampai pengelolaan digital bulanan, semuanya ditangani dengan profesional.",
    rating: 5,
    bulan: "Mei 2026",
  },
  {
    nama: "Sari Putri",
    jabatan: "Founder",
    perusahaan: "Samara Beauty",
    teks: "Awalnya hanya mau bikin logo, akhirnya kami pakai semua layanan Optibis. Brand kami sekarang terlihat profesional dan konsisten di semua platform.",
    rating: 5,
    bulan: "Apr 2026",
  },
  {
    nama: "Budi Santoso",
    jabatan: "Direktur",
    perusahaan: "Graha Cipta",
    teks: "Website yang dibuatkan Optibis membantu kami mendapatkan klien baru. Leads masuk lebih teratur dan mudah dipantau oleh tim kami.",
    rating: 5,
    bulan: "Mar 2026",
  },
  {
    nama: "Diana Kusuma",
    jabatan: "Owner",
    perusahaan: "Kulina Rasa",
    teks: "Sejak menggunakan Digital Growth Team dari Optibis, konten kami rutin, media sosial lebih aktif, dan kami bisa fokus pada operasional restoran.",
    rating: 5,
    bulan: "Feb 2026",
  },
];

export default function TestimonialsSection() {
  const { tr } = useLanguage();

  return (
    <section className="py-14 lg:py-20 bg-slate-50/50" id="testimoni">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimoni Klien" title="Apa Kata Klien Tentang Optibis" description="Pengalaman nyata bisnis yang tumbuh bersama layanan digital Optibis." className="mb-12" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-border">
            <GoogleIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-navy">{tr("Profil Google Bisnis")}</h3>
            <p className="text-xs text-muted-foreground">{tr("Informasi resmi & ulasan dari Google")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border border-border bg-white shadow-sm overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Foto Lokasi */}
            <div className="relative h-64 w-full shrink-0 md:h-auto md:min-h-[220px] lg:min-h-[260px] md:w-[300px] lg:w-[340px]">
              <img 
                src="/assets/lokasi.png" 
                alt="Kantor Optibis" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Info Card */}
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex flex-col gap-6 p-4 sm:p-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-magenta text-lg font-extrabold text-white shadow-sm">
                    O
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-navy sm:text-lg">Optibis Digital Partner</h3>
                    <p className="text-xs text-muted-foreground">Digital growth agency</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-navy">
                      <span className="font-bold">5.0</span>
                      <span className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, index) => (
                          <Star key={index} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </span>
                      <span className="text-muted-foreground">(42 {tr("ulasan")})</span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-wrap justify-end gap-2 lg:ml-auto lg:w-auto">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Optibis"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-magenta px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-magenta-600"
                  >
                    <Navigation className="h-4 w-4" />
                    {tr("Rute")}
                  </a>
                  <a
                    href="/"
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-bold text-navy transition-colors hover:border-magenta/30 hover:bg-magenta-50"
                  >
                    <Globe2 className="h-4 w-4" />
                    Website
                  </a>
                </div>
              </div>

              <div className="grid gap-3 border-t border-border px-4 py-3 text-xs text-navy sm:px-5 lg:grid-cols-[1.6fr_1fr_1fr]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-magenta" />
                  <span className="truncate">Bandung, Jawa Barat, Indonesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-magenta" />
                  <span className="truncate">{tr("Senin - Jumat")}, 9 AM-5 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-magenta" />
                  <span className="truncate">+62 819-5959-4529</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-extrabold text-navy">{tr("Ulasan Google")}</span>
            <span className="rounded-full bg-magenta-50 px-2 py-0.5 text-xs font-bold text-magenta">5.0</span>
            <span className="text-xs text-muted-foreground">42 {tr("ulasan")}</span>
          </div>
          <a href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-magenta hover:text-magenta-600">
            {tr("Lihat semua")}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {TESTIMONIALS.map((item, index) => (
            <motion.article
              key={item.nama}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="min-h-[150px] rounded-lg border border-border bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-extrabold text-white">
                  {item.nama.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs font-extrabold text-navy">{item.nama}</div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1">
                    <span className="flex items-center gap-0.5">
                      {[...Array(item.rating)].map((_, starIndex) => (
                        <Star key={starIndex} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{item.bulan}</span>
                  </div>
                </div>
              </div>
              <Quote className="mt-3 h-5 w-5 text-magenta/25" />
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tr(item.teks)}</p>
              <div className="mt-3 text-[10px] font-semibold text-magenta">
                {item.jabatan}, {item.perusahaan}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
