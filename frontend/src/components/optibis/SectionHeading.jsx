import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SectionHeading({ eyebrow, title, description, align = "center", light = false, className = "", compact = false }) {
  const { tr } = useLanguage();
  const content = (value) => (typeof value === "string" ? tr(value) : value);
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${centered ? "mx-auto text-center" : "text-left"} ${className}`}
    >
      <span className={`mb-4 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold ${
        light
          ? "border-white/25 bg-white/15 text-white backdrop-blur-sm"
          : "border-magenta/10 bg-gradient-to-r from-magenta-50 to-amethyst-50 text-magenta"
      }`}>
        <Sparkles className="h-3.5 w-3.5" /> {content(eyebrow)}
      </span>
      <h2 className={`${compact ? "text-2xl sm:text-3xl" : "text-2xl sm:text-3xl lg:text-4xl"} font-extrabold leading-tight ${light ? "text-white" : "text-navy"}`}>
        {content(title)}
      </h2>
      {description && (
        <p className={`mt-3 text-sm leading-relaxed sm:text-base ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"} ${light ? "text-white/80" : "text-muted-foreground"}`}>
          {content(description)}
        </p>
      )}
    </motion.div>
  );
}
