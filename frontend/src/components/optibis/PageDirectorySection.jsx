import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

export default function PageDirectorySection({ eyebrow, title, description, groups, columnsClass = "lg:grid-cols-3" }) {
  const { tr } = useLanguage();

  return (
    <section className="border-b border-gray-100 bg-slate-50/60 py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-10" />

        <div className={`grid gap-5 ${columnsClass}`}>
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.06 }}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-navy-300">{tr(group.title)}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-magenta-50"
                    >
                      {Icon && (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-navy-300 transition-colors group-hover:bg-white group-hover:text-magenta">
                          <Icon className="h-4 w-4" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1 text-sm font-semibold text-navy-400 transition-colors group-hover:text-magenta">
                        {tr(item.label)}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-magenta" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
