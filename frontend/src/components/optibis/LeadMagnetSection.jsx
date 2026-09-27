import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Globe, Palette, Calculator, FileDown, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const MAGNETS = [
  { icon: ClipboardCheck, title: "Audit Digital Gratis", desc: "Evaluasi kehadiran digital bisnis Anda secara menyeluruh.", color: "bg-magenta-50 text-magenta", action: "#konsultasi" },
  { icon: Globe, title: "Audit Website", desc: "Cek performa, keamanan, dan potensi perbaikan website Anda.", color: "bg-blue-50 text-blue-600", action: "/website" },
  { icon: Palette, title: "Checklist Branding", desc: "Panduan lengkap untuk memastikan branding bisnis Anda sudah rapi.", color: "bg-amethyst-50 text-amethyst", action: "/digital-asset" },
  { icon: Lightbulb, title: "Rekomendasi Paket", desc: "Dapatkan rekomendasi paket yang tepat untuk kebutuhan Anda.", color: "bg-amber-50 text-amber-600", action: "#paket" },
  { icon: Calculator, title: "Kalkulator Estimasi", desc: "Hitung perkiraan biaya untuk project digital Anda.", color: "bg-emerald-50 text-emerald-600", action: "#paket" },
  { icon: FileDown, title: "Company Profile", desc: "Unduh profil perusahaan Optibis dalam format PDF.", color: "bg-violet-50 text-violet-600", action: "#konsultasi" },
];

export default function LeadMagnetSection() {
  const nav = useSafeNav();
  const { tr } = useLanguage();

  return (
    <section className="py-14 lg:py-20 bg-gradient-to-b from-magenta-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Resource Gratis" title="Mulai dari Sini" description="Belum yakin mulai dari mana? Coba salah satu resource gratis dari Optibis." className="mb-14" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MAGNETS.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => nav(m.action)}
              className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-magenta/10 transition-all cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${m.color}`}>
                <m.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-navy mb-1">{tr(m.title)}</h3>
              <p className="text-xs text-muted-foreground mb-3">{tr(m.desc)}</p>
              <span className="text-xs font-semibold text-magenta group-hover:underline">{tr("Akses Gratis")} →</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
