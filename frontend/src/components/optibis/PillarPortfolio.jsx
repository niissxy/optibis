import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getAllPortfolios } from "@/data/portfolio";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const COLOR_THEMES = {
  magenta: {
    badge: "bg-magenta-50 text-magenta",
    hover: "group-hover:text-magenta",
    tag: "bg-magenta-50 text-magenta border-magenta/10",
  },
  amethyst: {
    badge: "bg-amethyst-50 text-amethyst",
    hover: "group-hover:text-amethyst",
    tag: "bg-amethyst-50 text-amethyst border-amethyst/10",
  },
  navy: {
    badge: "bg-blue-50 text-blue-600",
    hover: "group-hover:text-navy",
    tag: "bg-navy-50 text-navy border-navy/10",
  },
};

function PortfolioCard({ project, index, theme, tr }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        to={`/portofolio/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white transition-all duration-300 hover:shadow-xl"
      >
        <div className="relative h-44 shrink-0 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/10" />
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-navy backdrop-blur-sm">
              {project.industry}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className={`mb-1 text-base font-bold text-navy transition-colors ${theme.hover}`}>{project.name}</h3>
          <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">{tr(project.ringkasan)}</p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.products.slice(0, 3).map((product) => (
              <span key={product} className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${theme.tag}`}>
                {tr(product)}
              </span>
            ))}
          </div>
          <div className={`mt-auto flex items-center gap-1.5 text-sm font-semibold transition-all ${theme.hover} group-hover:gap-2.5`}>
            {tr("Lihat Detail")} <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PillarPortfolio({ pillar, color = "magenta", carousel = false }) {
  const { language, tr } = useLanguage();
  const theme = COLOR_THEMES[color] || COLOR_THEMES.magenta;
  const projects = getAllPortfolios().filter((p) => p.pilar.includes(pillar));

  if (projects.length === 0) return null;

  return (
    <section className="py-12 lg:py-20 bg-slate-50/50" id="portofolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Portofolio Pilar Ini" title={<>{tr("Proyek")} {pillar}</>} description={language === "en" ? `See our work for clients in ${pillar}.` : `Lihat hasil kerja kami untuk klien di bidang ${pillar.toLowerCase()}.`} className="mb-12" />

        {carousel ? (
          <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full">
            <CarouselContent className="-ml-5 pb-4">
              {projects.map((project, index) => (
                <CarouselItem key={project.slug} className="pl-5 sm:basis-1/2 lg:basis-1/3">
                  <PortfolioCard project={project} index={index} theme={theme} tr={tr} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 h-10 w-10 border-magenta bg-magenta text-white shadow-lg hover:bg-magenta-500 hover:text-white disabled:hidden lg:-left-5" />
            <CarouselNext className="-right-3 h-10 w-10 border-magenta bg-magenta text-white shadow-lg hover:bg-magenta-500 hover:text-white disabled:hidden lg:-right-5" />
          </Carousel>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <PortfolioCard key={project.slug} project={project} index={index} theme={theme} tr={tr} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
