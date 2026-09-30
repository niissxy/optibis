import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";
import { useServicePillars } from "@/hooks/useServicePillars";

export default function ThreePillars() {
  const { tr } = useLanguage();
  const { pillars: pillarsData } = useServicePillars();

  const count = pillarsData.length;
  const gridColsClass = count <= 2
    ? "grid md:grid-cols-2 max-w-4xl mx-auto gap-6"
    : count === 3
    ? "grid lg:grid-cols-3 gap-6"
    : "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  const headingTitle = count === 3 ? "3 Pilar Utama Optibis" : `${count} Pilar Solusi Optibis`;

  return (
    <section className="py-14 lg:py-20 bg-white" id="pilar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pilar Optibis"
          title={tr(headingTitle)}
          description="Kompetensi utama yang saling melengkapi untuk membantu bisnis Anda dari membangun identitas hingga mengelola pertumbuhan digital."
          className="mb-14"
        />

        <div className={gridColsClass}>
          {pillarsData.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.slug || p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/60 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-navy/10">
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${p.bgClass} ${p.textClass} group-hover:scale-110 transition-transform duration-300`}>
                      {Icon ? <Icon className="w-3.5 h-3.5" /> : null}
                      {tr(p.tag)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-extrabold text-navy mb-1 transition-colors group-hover:text-magenta">{p.title}</h3>
                  <p className="text-sm font-semibold text-navy-300 mb-3">{tr(p.headline)}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{tr(p.desc)}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.highlights.map((h) => (
                      <span key={h} className="px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-navy-300 border border-gray-100 group-hover:border-magenta/20 group-hover:text-navy transition-colors duration-300">
                        {tr(h)}
                      </span>
                    ))}
                  </div>

                  <Link to={p.link} className="mt-auto block">
                    <Button className={`${p.btnClass} text-white rounded-full w-full text-sm font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.03] active:scale-95`}>
                      {tr(p.data?.button_text || `Lihat ${p.title}`)}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
