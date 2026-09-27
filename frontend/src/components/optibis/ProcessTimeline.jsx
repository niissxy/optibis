import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Lightbulb, ClipboardList, Cog, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const STEPS = [
  { icon: MessageCircle, num: "01", title: "Konsultasi", desc: "Ceritakan kebutuhan bisnis Anda. Kami dengarkan, pahami, dan analisa bersama." },
  { icon: Lightbulb, num: "02", title: "Rekomendasi Solusi", desc: "Kami berikan rekomendasi solusi, paket, dan estimasi yang paling sesuai." },
  { icon: ClipboardList, num: "03", title: "Perencanaan", desc: "Menyusun timeline, deliverables, dan milestone yang jelas dan transparan." },
  { icon: Cog, num: "04", title: "Produksi & Review", desc: "Tim kami mengerjakan, Anda mereview. Revisi sampai hasilnya sesuai harapan." },
  { icon: Rocket, num: "05", title: "Launch & Support", desc: "Project diluncurkan dengan dukungan penuh. Kami tetap mendampingi setelahnya." },
];

export default function ProcessTimeline() {
  const nav = useSafeNav();
  const { tr } = useLanguage();

  return (
    <section className="py-14 lg:py-20 bg-white" id="cara-kerja">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Proses Kerja" title="Cara Kerja Optibis" description="Lima langkah sederhana untuk memulai transformasi digital bisnis Anda." className="mb-14" />

        <div className="relative">
          {/* Desktop line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-magenta via-amethyst to-navy" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl bg-white border-2 border-magenta/20 flex items-center justify-center mb-4 shadow-lg shadow-magenta/5">
                  <step.icon className="w-7 h-7 text-magenta" />
                </div>
                <span className="text-xs font-bold text-magenta mb-1 block">{step.num}</span>
                <h3 className="text-sm font-bold text-navy mb-2">{tr(step.title)}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{tr(step.desc)}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={() => nav("#konsultasi")} className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 text-sm font-semibold shadow-lg shadow-magenta/20">
              {tr("Mulai Konsultasi")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
