import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Palette, Globe, Search, FileText, Users, Megaphone, BarChart3, ClipboardList } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PROBLEMS = [
  { icon: Palette, title: "Branding belum rapi", desc: "Logo, warna, dan materi promosi belum konsisten sehingga bisnis terlihat kurang profesional." },
  { icon: Globe, title: "Website belum profesional", desc: "Belum punya website atau website yang ada sudah ketinggalan zaman dan sulit dikelola." },
  { icon: Search, title: "Sulit ditemukan di Google", desc: "Bisnis Anda tidak muncul saat calon pelanggan mencari layanan yang Anda tawarkan." },
  { icon: FileText, title: "Konten tidak rutin", desc: "Media sosial jarang update karena tidak ada tim yang mengelola konten secara konsisten." },
  { icon: Users, title: "Tim internal kewalahan", desc: "Tim Anda harus mengerjakan banyak hal sekaligus dan tidak fokus pada pekerjaan utama." },
  { icon: Megaphone, title: "Materi promosi tidak konsisten", desc: "Setiap materi terlihat berbeda karena tidak ada panduan brand yang jelas." },
  { icon: ClipboardList, title: "Leads tidak tertata", desc: "Data calon pelanggan tersebar di banyak tempat dan sulit ditindaklanjuti." },
  { icon: BarChart3, title: "Tidak ada laporan performa", desc: "Tidak tahu mana strategi yang berhasil karena tidak ada laporan yang jelas." },
];

export default function PainPoints() {
  const { tr } = useLanguage();

  return (
    <section className="py-8 lg:py-14 bg-white" id="masalah">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-r from-magenta to-amethyst px-4 py-10 sm:px-8 lg:px-12 lg:py-16 shadow-2xl shadow-magenta/20">
          {/* Gelembung dekoratif mengikuti gaya section Final CTA */}
          <div className="absolute -bottom-40 left-1/4 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-[2px]" />
          <div className="absolute -top-32 -right-16 w-96 h-96 bg-white/10 rounded-full blur-[2px]" />
          <div className="absolute top-10 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[2px]" />
          <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-[2px]" />

          <div className="relative z-10">
            <SectionHeading eyebrow="Tantangan Bisnis" title="Apakah Bisnis Anda Mengalami Hal Ini?" description="Banyak bisnis menghadapi tantangan serupa. Optibis hadir untuk menyelesaikan semuanya dalam satu solusi terpadu." light className="mb-10 lg:mb-14" />

            <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full">
              <CarouselContent className="-ml-3 pb-4">
                {PROBLEMS.map((p, i) => (
                  <CarouselItem key={p.title} className="pl-3 sm:basis-1/2 lg:basis-1/4">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="group h-full rounded-xl border border-white/25 bg-white/10 p-5 backdrop-blur-[2px] transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:shadow-lg hover:shadow-black/10"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-magenta transition-colors group-hover:text-amethyst">
                        <p.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-1.5 text-sm font-bold text-white">{tr(p.title)}</h3>
                      <p className="text-xs leading-relaxed text-white/75">{tr(p.desc)}</p>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-3 h-9 w-9 border-white/50 bg-white text-magenta shadow-lg hover:bg-magenta hover:text-white disabled:hidden lg:-left-5" />
              <CarouselNext className="-right-3 h-9 w-9 border-white/50 bg-white text-magenta shadow-lg hover:bg-magenta hover:text-white disabled:hidden lg:-right-5" />
            </Carousel>

          </div>
        </div>
      </div>
    </section>
  );
}
