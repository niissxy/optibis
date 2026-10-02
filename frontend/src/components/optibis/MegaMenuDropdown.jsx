import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function MegaMenuDropdown({
  label,
  href = "#",
  children: groups,
  activeDropdown,
  setActiveDropdown,
  onNavClick,
  width = "w-72",
  dark = false,
  translate = (value) => value,
  footerAction,
}) {
  const isOpen = activeDropdown === label;
  const [openSubMenus, setOpenSubMenus] = useState(() => {
    return {
      "Digital Asset": false,
      Website: true,
      "Software & Sistem Bisnis": false,
      "Digital Growth Team": false,
    };
  });

  const toggleSubMenu = (itemLabel) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [itemLabel]: !prev[itemLabel],
    }));
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown(label)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button
        onClick={() => onNavClick(href)}
        className={`group relative flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 xl:px-3 xl:text-sm ${
          dark ? "text-white/75 hover:bg-magenta/20 hover:text-white" : "text-navy-400 hover:bg-magenta-50/50 hover:text-magenta"
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
            <div className={`${dark ? "bg-navy border-navy-300" : "bg-white border-gray-100"} rounded-xl shadow-xl border p-4 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto`}>
              {groups.map((group, idx) => (
                <div key={group.group || idx}>
                  {group.group && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{translate(group.group)}</p>}
                  <div className="space-y-1">
                    {group.items.map((sub) => {
                      const hasSub = Array.isArray(sub.subItems) && sub.subItems.length > 0;
                      const isSubOpen = !!openSubMenus[sub.label];

                      if (hasSub) {
                        const SubIcon = sub.icon;
                        return (
                          <div key={sub.label} className="rounded-lg">
                            <div className="flex items-center justify-between group/parent rounded-md hover:bg-magenta-50 dark:hover:bg-magenta/20 transition-colors">
                              <button
                                onClick={() => {
                                  toggleSubMenu(sub.label);
                                }}
                                className={`flex-1 flex items-center gap-2 text-left px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                  dark ? "text-white/85 group-hover/parent:text-white" : "text-navy-400 group-hover/parent:text-magenta"
                                }`}
                              >
                                {SubIcon && label !== "Layanan" && <SubIcon className="w-4 h-4 shrink-0 text-navy-400 dark:text-white/70" />}
                                <span>{translate(sub.label)}</span>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSubMenu(sub.label);
                                }}
                                className={`p-1.5 mr-1 rounded transition-colors ${
                                  dark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-navy-300 hover:text-magenta"
                                }`}
                                aria-label={`Toggle ${sub.label} dropdown`}
                              >
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSubOpen ? "rotate-180" : ""}`} />
                              </button>
                            </div>

                            {isSubOpen && (
                              <div className="ml-3 pl-2.5 my-1 border-l-2 border-magenta/40 space-y-0.5">
                                {sub.subItems.map((child) => {
                                  const ChildIcon = child.icon;
                                  return (
                                    <button
                                      key={child.label}
                                      onClick={() => onNavClick(child.href)}
                                      className={`flex items-center gap-2 w-full text-left px-2.5 py-1 text-xs rounded-md transition-colors ${
                                        dark ? "text-white/70 hover:bg-magenta/20 hover:text-white" : "text-navy-300 hover:text-magenta hover:bg-magenta-50/70"
                                      }`}
                                    >
                                      {ChildIcon && label !== "Layanan" && <ChildIcon className="w-3.5 h-3.5 shrink-0 text-navy-400 dark:text-white/70" />}
                                      <span>{translate(child.label)}</span>
                                    </button>
                                  );
                                })}
                                {sub.href && (
                                  <button
                                    onClick={() => onNavClick(sub.href)}
                                    className="flex items-center gap-1 w-full text-left px-2.5 py-1 text-[11px] font-semibold text-magenta hover:underline mt-1"
                                  >
                                    <span>{translate(`Semua Layanan ${sub.label}`)}</span>
                                    <ArrowRight className="w-3 h-3 ml-0.5" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }

                      const SubIcon = sub.icon;
                      return (
                        <button
                          key={sub.label}
                          onClick={() => onNavClick(sub.href)}
                          className={`flex items-center gap-2.5 w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                            dark ? "text-white/75 hover:bg-magenta/20 hover:text-white" : "text-navy-400 hover:text-magenta hover:bg-magenta-50"
                          }`}
                        >
                          {SubIcon && label !== "Layanan" && <SubIcon className="w-4 h-4 shrink-0 text-navy-400 dark:text-white/70" />}
                          <span>{translate(sub.label)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {footerAction && (
                <div className={`pt-3 border-t ${dark ? "border-navy-300/40" : "border-gray-100"}`}>
                  <button
                    onClick={() => onNavClick(footerAction.href)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                      dark
                        ? "bg-magenta/20 text-magenta hover:bg-magenta/30"
                        : "bg-magenta-50/70 text-magenta hover:bg-magenta-100/80"
                    }`}
                  >
                    <span>{translate(footerAction.label)}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              )}
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
