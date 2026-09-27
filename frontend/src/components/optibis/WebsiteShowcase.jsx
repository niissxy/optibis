import React from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet, LayoutDashboard, FileEdit, BarChart3, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";

const SHOWCASE_IMG = "https://media.base44.com/images/public/6a509ada7e3a9418172110a5/fc025153c_generated_99922c01.png";

const FEATURES = [
  { icon: FileEdit, text: "Mudah diperbarui" },
  { icon: LayoutDashboard, text: "Mudah digunakan tim" },
  { icon: BarChart3, text: "Mudah memantau leads" },
  { icon: Monitor, text: "Mudah melihat perkembangan" },
  { icon: Shield, text: "Aman dan responsif" },
];

export default function WebsiteShowcase() {
  const nav = useSafeNav();
  const { tr } = useLanguage();

  return (
    <section className="py-14 lg:py-24 relative bg-[#233554] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.2] mb-6">
              {tr("Website yang Tidak Hanya")} <br className="hidden sm:block" />
              {tr("Menarik, tetapi Juga")} <span className="text-magenta">{tr("Mudah")}</span> <br className="hidden sm:block" />
              <span className="text-magenta">{tr("Digunakan")}</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 mb-10 max-w-lg leading-relaxed">
              {tr("Kami membangun website yang tidak hanya cantik dilihat, tetapi juga mudah dikelola oleh tim Anda — lengkap dengan dashboard, CMS, dan sistem monitoring.")}
            </p>

            <div className="space-y-4 mb-10">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-magenta" />
                  </div>
                  <span className="text-sm font-medium text-gray-200">{tr(f.text)}</span>
                </motion.div>
              ))}
            </div>

            <Button onClick={() => nav("/website")} className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 font-semibold shadow-lg shadow-magenta/20 transition-all group">
              {tr("Lihat Detail Website")}
              <ArrowRight className="w-4 h-4 ml-2 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
              <img src={SHOWCASE_IMG} alt="Contoh website premium Optibis" className="w-full h-auto rounded-xl" />
            </div>
            {/* Device indicators */}
            <div className="flex items-center justify-center gap-6 mt-6">
              {[
                { icon: Monitor, label: "Desktop" },
                { icon: Tablet, label: "Tablet" },
                { icon: Smartphone, label: "Mobile" },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-2 text-gray-400 text-xs">
                  <d.icon className="w-4 h-4" />
                  {d.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
