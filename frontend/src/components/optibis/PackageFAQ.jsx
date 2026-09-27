import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PackageFAQ({ faqs = [] }) {
  const [open, setOpen] = useState(0);

  if (!faqs.length) return null;

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left"
          >
            <span className="text-sm font-semibold text-navy">{item.q}</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-5">
              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}