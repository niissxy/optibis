import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/optibis/SectionHeading";

export default function PackageHighlights({ highlights = [], theme }) {
  if (!highlights.length) return null;
  const t = theme;

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Keunggulan Paket" title="Mengapa Memilih Paket Ini?" description="Tiga alasan utama mengapa paket ini memberikan nilai terbaik untuk bisnis Anda." compact className="mb-8" />
        <div className="grid sm:grid-cols-3 gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative bg-gradient-to-b from-slate-50/80 to-white rounded-2xl border border-gray-300 p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`absolute -top-3 left-6 w-7 h-7 rounded-full ${t.btn} flex items-center justify-center text-white text-xs font-extrabold shadow-lg`}>
                {i + 1}
              </div>
              <h3 className="text-base font-bold text-navy mb-2 mt-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
