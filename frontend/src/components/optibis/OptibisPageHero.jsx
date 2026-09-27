import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function OptibisPageHero({ eyebrow, title, description, children }) {
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-magenta-700 via-magenta-500 to-amethyst py-20 text-white lg:py-24">
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-white/10" />
      <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-white/10" />
      <div className="absolute bottom-[-10rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl text-left"
        >
          <span className="mb-5 inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {tr(eyebrow)}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {tr(title)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
            {tr(description)}
          </p>
          {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
