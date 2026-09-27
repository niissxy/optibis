import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Palette, Globe, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const DA_IMG = "https://media.base44.com/images/public/6a509ada7e3a9418172110a5/78518a7f2_generated_dfb7c12e.png";
const WEB_IMG = "https://media.base44.com/images/public/6a509ada7e3a9418172110a5/56292e899_generated_ffb905b3.png";
const DGT_IMG = "https://media.base44.com/images/public/6a509ada7e3a9418172110a5/3448c14bb_generated_ca1e5c00.png";

const PILLARS = [
  {
    icon: Palette,
    tag: "PILAR 1",
    title: "Digital Asset",
    link: "/digital-asset",
    headline: "Bangun citra bisnis yang profesional",
    desc: "Dari logo, brand guideline, company profile, hingga materi promosi — semua aset yang dibutuhkan bisnis Anda untuk tampil konsisten dan dipercaya.",
    highlights: ["Logo & Brand Guideline", "Company Profile", "Marketing Kit", "Social Media Assets", "Video Profile", "Stationery Bisnis"],
    img: DA_IMG,
    color: "magenta",
    bgClass: "bg-magenta-50",
    textClass: "text-magenta",
    btnClass: "bg-magenta hover:bg-magenta-500",
  },
  {
    icon: Globe,
    tag: "PILAR 2",
    title: "Website",
    link: "/website",
    headline: "Miliki website yang bekerja untuk bisnis",
    desc: "Website yang membantu bisnis Anda ditemukan, dipercaya, dihubungi, dan dikelola dengan lebih mudah — dari landing page hingga sistem terintegrasi.",
    highlights: ["Landing Page", "Company Website", "Website Bisnis", "Website Growth System", "Website Remake", "Maintenance"],
    img: WEB_IMG,
    color: "amethyst",
    bgClass: "bg-amethyst-50",
    textClass: "text-amethyst",
    btnClass: "bg-amethyst hover:bg-amethyst-600",
  },
  {
    icon: Users,
    tag: "PILAR 3",
    title: "Digital Growth Team",
    link: "/digital-growth-team",
    headline: "Punya tim digital tanpa harus merekrut sendiri",
    desc: "Tim digital lengkap yang mengelola konten, media sosial, SEO, iklan, dan laporan performa bisnis Anda secara konsisten setiap bulan.",
    highlights: ["Content Management", "Social Media", "SEO", "Digital Ads", "Website Update", "Reporting"],
    img: DGT_IMG,
    color: "navy",
    bgClass: "bg-blue-50",
    textClass: "text-blue-600",
    btnClass: "bg-navy hover:bg-navy-400",
  },
];

export default function ThreePillars() {
  const { tr } = useLanguage();

  return (
    <section className="py-14 lg:py-20 bg-white" id="pilar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Pilar Optibis" title="3 Pilar Utama Optibis" description="Tiga kompetensi utama yang saling melengkapi untuk membantu bisnis Anda dari membangun identitas hingga mengelola pertumbuhan digital." className="mb-14" />

        <div className="grid lg:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/60 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${p.bgClass} ${p.textClass} group-hover:scale-110 transition-transform duration-300`}>
                    <p.icon className="w-3.5 h-3.5" />
                    {tr(p.tag)}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-extrabold text-navy mb-1 transition-colors group-hover:text-magenta">{p.title}</h3>
                <p className="text-sm font-semibold text-navy-300 mb-3">{tr(p.headline)}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tr(p.desc)}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.highlights.map((h) => (
                    <span key={h} className="px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-navy-300 border border-gray-100 group-hover:border-magenta/20 group-hover:text-navy transition-colors duration-300">
                      {tr(h)}
                    </span>
                  ))}
                </div>

                <Link to={p.link} className="mt-auto block">
                  <Button className={`${p.btnClass} text-white rounded-full w-full text-sm font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.03] active:scale-95`}>
                    {tr("Lihat")} {p.title}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
