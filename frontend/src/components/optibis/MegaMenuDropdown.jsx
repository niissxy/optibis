import React from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function MegaMenuDropdown({ label, href = "#", children: groups, activeDropdown, setActiveDropdown, onNavClick, width = "w-72", dark = false, translate = (value) => value }) {
  const isOpen = activeDropdown === label;

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown(label)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button
        onClick={() => onNavClick(href)}
        className={`group relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
          dark ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-navy-400 hover:bg-magenta-50/50 hover:text-magenta"
        }`}
      >
        {translate(label)}
        <ChevronDownLocal />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full left-0 pt-2 ${width} z-50`}
          >
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 space-y-4">
              {groups.map((group, idx) => (
                <div key={group.group || idx}>
                  {group.group && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{translate(group.group)}</p>}
                  <div className="space-y-1">
                    {group.items.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => onNavClick(sub.href)}
                        className="block w-full text-left px-3 py-1.5 text-sm text-navy-400 hover:text-magenta hover:bg-magenta-50 rounded-md transition-colors"
                      >
                        {translate(sub.label)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChevronDownLocal() {
  return (
    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
