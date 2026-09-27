import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Building2, Calendar, Star, RotateCw } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const STATS = [
  { icon: Briefcase, value: "100+", label: "Proyek Selesai", color: "bg-cyan-500" },
  { icon: Users, value: "50+", label: "Klien Aktif", color: "bg-violet-500" },
  { icon: Building2, value: "15+", label: "Industri Dilayani", color: "bg-orange-500" },
  { icon: Calendar, value: "5+", label: "Tahun Pengalaman", color: "bg-emerald-500" },
  { icon: Star, value: "4.9", label: "Rating Klien", color: "bg-pink-500" },
  { icon: RotateCw, value: "70%", label: "Repeat Order", color: "bg-blue-500" },
];

export default function TrustBar() {
  const { tr } = useLanguage();

  return (
    <section className="pb-12 lg:pb-16 pt-0 bg-transparent -mt-8 lg:-mt-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center justify-center py-3 px-2 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:border-gray-300 transition-all duration-300 group cursor-default h-full"
              whileHover={{ y: -3 }}
            >
              <div className={`w-9 h-9 rounded-[0.65rem] flex items-center justify-center text-white mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="text-base font-extrabold text-navy group-hover:text-magenta transition-colors duration-300 leading-tight">{stat.value}</div>
              <div className="text-[11px] font-medium text-gray-500 mt-0.5 text-center leading-tight">{tr(stat.label)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
