import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function PackageFAQ({ faqs = [] }) {
  const [open, setOpen] = useState(0);
  const { tr } = useLanguage();

  if (!faqs.length) return null;

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-gray-100 bg-white dark:border-navy-300 dark:bg-navy-500">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-navy-400"
          >
            <span className="text-sm font-semibold text-navy dark:text-white">{tr(item.q)}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 dark:text-navy-100 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="border-t border-gray-100 px-5 pb-5 pt-4 dark:border-navy-300">
              <p className="text-sm leading-relaxed text-muted-foreground dark:text-navy-100">{tr(item.a)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
