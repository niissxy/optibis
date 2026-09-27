import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getServicePath } from "@/lib/serviceRoutes";
import { useLanguage } from "@/lib/LanguageContext";

export default function PillarServiceCard({ service, pillarSlug, index = 0, color = "magenta" }) {
  const { tr } = useLanguage();
  const colorMap = {
    magenta: { bg: "bg-magenta-50", text: "text-magenta", border: "hover:border-magenta/20", btn: "bg-magenta hover:bg-magenta-500" },
    amethyst: { bg: "bg-amethyst-50", text: "text-amethyst", border: "hover:border-amethyst/20", btn: "bg-amethyst hover:bg-amethyst-600" },
    navy: { bg: "bg-blue-50", text: "text-blue-600", border: "hover:border-navy/20", btn: "bg-navy hover:bg-navy-400" },
  };
  const c = colorMap[color] || colorMap.magenta;
  const detailPath = getServicePath(pillarSlug, service.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`group overflow-hidden rounded-2xl border border-gray-300 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 ${c.border}`}
    >
      <Link to={detailPath} aria-label={`Lihat detail layanan ${service.name}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy">
        <div className="relative h-40 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          <div className={`absolute top-3 left-3 w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center backdrop-blur-sm shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
            <service.icon className="w-5 h-5" />
          </div>
        </div>
        <div className="p-6 pt-3">
          <h3 className="mb-2 text-lg font-bold text-navy">{tr(service.name)}</h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{tr(service.desc)}</p>
          <ul className="mb-5 space-y-2">
            {service.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-navy-300">
                <Check className={`w-4 h-4 ${c.text} shrink-0 mt-0.5`} />
                {tr(f)}
              </li>
            ))}
          </ul>
          <span className="inline-flex h-9 w-full items-center justify-center rounded-full border border-gray-200 px-4 text-sm font-semibold text-navy transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-md group-active:scale-95">
            {tr("Pelajari Lebih Lanjut")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
