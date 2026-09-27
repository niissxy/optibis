import React from "react";
import { motion } from "framer-motion";
import { Rocket, Award, Target, TrendingUp, Building2, Landmark, ArrowRight } from "lucide-react";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const SOLUTIONS = [
  {
    icon: Rocket,
    title: "Memulai Bisnis",
    desc: "Logo, identitas, landing page, email bisnis, akun digital, dan konten launching.",
    tags: ["Digital Asset", "Website"],
    color: "bg-magenta-50 text-magenta",
  },
  {
    icon: Award,
    title: "Meningkatkan Citra",
    desc: "Brand refresh, company profile, marketing kit, website, Google Business, dan sales assets.",
    tags: ["Digital Asset", "Website"],
    color: "bg-amethyst-50 text-amethyst",
  },
  {
    icon: Target,
    title: "Mendapatkan Leads",
    desc: "Landing page, campaign assets, form, WhatsApp, ads setup, dan lead reporting.",
    tags: ["Website", "Growth Team"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Kelola Digital Bulanan",
    desc: "Content management, social media, website update, SEO, campaign, dan reporting.",
    tags: ["Growth Team"],
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Building2,
    title: "Multi-Cabang",
    desc: "Brand standardization, multi-location website, Google Business per cabang, dan central reporting.",
    tags: ["Digital Asset", "Website", "Growth Team"],
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Landmark,
    title: "Corporate",
    desc: "Corporate branding, company profile, corporate website, campaign, maintenance, dan custom integration.",
    tags: ["Digital Asset", "Website", "Growth Team"],
    color: "bg-violet-50 text-violet-600",
  },
];

const TAG_COLORS = {
  "Digital Asset": "bg-magenta-50 text-magenta",
  "Website": "bg-amethyst-50 text-amethyst",
  "Growth Team": "bg-blue-50 text-blue-600",
};

export default function TotalSolution() {
  const nav = useSafeNav();
  const { tr } = useLanguage();

  return (
    <section className="py-14 lg:py-20 bg-slate-50/50" id="total-solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Solusi Bisnis" title="Pilih Solusi Berdasarkan Kondisi Bisnis Anda" description="Setiap bisnis punya kebutuhan berbeda. Pilih solusi yang paling sesuai dengan kondisi dan tujuan bisnis Anda saat ini." className="mb-14" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => nav("#konsultasi")}
              className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy mb-2">{tr(s.title)}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tr(s.desc)}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${TAG_COLORS[tag]}`}>
                    {tr(tag)}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
