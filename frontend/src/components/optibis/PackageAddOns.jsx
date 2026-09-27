import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/optibis/SectionHeading";

export default function PackageAddOns({ addOns = [], theme }) {
  if (!addOns.length) return null;
  const t = theme;

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Tambahan Opsional" title="Add-Ons Tersedia" description="Lengkapi paket Anda dengan layanan tambahan yang fleksibel sesuai kebutuhan." compact className="mb-8" />
        <div className="space-y-3">
          {addOns.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between gap-4 bg-slate-50/50 rounded-xl border border-gray-300 p-4 hover:border-magenta/40 hover:shadow-sm transition-all"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-navy">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className={`text-sm font-bold ${t.check}`}>{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
