import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const CLIENT_LOGOS = [
  "MyTravelink",
  "Samara Property",
  "Optik Clinic",
  "Kulina Rasa",
  "Nisa Konsultan",
  "Graha Cipta",
  "Optibis",
  "Digital Hub",
  "Cipta Mandiri",
  "Nusa Digital",
];

export default function ClientLogosSlider() {
  const { tr } = useLanguage();
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-10 bg-white border-b border-gray-100 dark:bg-[#071321] dark:border-navy-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">
          {tr("Dipercaya oleh 50+ bisnis & brand")}
        </p>
        <div className="relative">
          <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused]">
            {doubled.map((name, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center justify-center px-6 py-3 rounded-xl bg-slate-50/70 border border-gray-50 min-w-[160px] hover:bg-magenta-50 hover:border-magenta/10 dark:bg-[#102842] dark:border-navy-300 dark:hover:bg-magenta/20 dark:hover:border-magenta/40 transition-all duration-300 hover:scale-110 cursor-default"
              >
                <span className="text-lg font-extrabold text-navy/40 font-heading whitespace-nowrap hover:text-magenta dark:text-slate-300 dark:hover:text-magenta-200 transition-colors duration-300">{name}</span>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#071321] pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#071321] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
