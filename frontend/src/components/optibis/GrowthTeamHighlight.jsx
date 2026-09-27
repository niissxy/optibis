import React from "react";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, FileText, Search, Megaphone, BarChart3, ArrowRight, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const BENEFITS = [
  { icon: FileText, title: "Konten konsisten", desc: "Konten terbit rutin sesuai jadwal yang terencana." },
  { icon: TrendingUp, title: "Website terawat", desc: "Update berkala, monitoring performa, dan perbaikan." },
  { icon: Megaphone, title: "Promosi lebih aktif", desc: "Campaign dan iklan dikelola secara profesional." },
  { icon: BarChart3, title: "Laporan lebih jelas", desc: "Laporan performa bulanan yang mudah dipahami." },
  { icon: DollarSign, title: "Tim lebih hemat", desc: "Tanpa biaya rekrutmen, training, dan benefit karyawan." },
  { icon: Users, title: "Fokus bisnis terjaga", desc: "Serahkan urusan digital, fokus pada bisnis inti." },
];

const STATS = [
  { value: "+25%", label: "Engagement" },
  { value: "+40%", label: "Leads" },
  { value: "+3x", label: "Konten" },
];

export default function GrowthTeamHighlight() {
  const nav = useSafeNav();
  const { tr } = useLanguage();

  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Digital Growth Team" title="Tim Digital Lengkap untuk Menjaga Bisnis Anda Tetap Aktif" description="Tidak perlu merekrut banyak karyawan untuk mengelola digital bisnis Anda. Serahkan pada Optibis." className="mb-14" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-50 rounded-xl p-4 border border-gray-100"
              >
                <div className="w-9 h-9 rounded-lg bg-magenta-50 text-magenta flex items-center justify-center mb-2">
                  <b.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-navy mb-1">{tr(b.title)}</h3>
                <p className="text-xs text-muted-foreground">{tr(b.desc)}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-magenta-50 to-amethyst-50 rounded-2xl p-8 border border-magenta/10">
              <h3 className="text-lg font-bold text-navy mb-6">{tr("Rata-rata hasil klien setelah 3 bulan")}</h3>
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl font-extrabold text-magenta">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{tr(s.label)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => nav("#paket")}
                className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 font-semibold shadow-lg shadow-magenta/20"
              >
                {tr("Lihat Paket Bulanan")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => nav("#konsultasi")}
                variant="outline"
                className="rounded-full border-navy-100 text-navy font-semibold"
              >
                {tr("Jadwalkan Konsultasi")}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
