import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle, X, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePackages } from "@/hooks/usePackages";

const WA_CONTACTS = [
  { initials: "A1", name: "CS Admin 1", phone: "6287772577020", color: "bg-magenta" },
  { initials: "A2", name: "CS Admin 2", phone: "6287821138949", color: "bg-amethyst" },
  { initials: "OC", name: "Optibis Consultant", phone: "6287741539006", color: "bg-navy" },
];

const PILLAR_GROUPS = [
  {
    pillar: "Digital Asset",
    pillarSlug: "digital-asset",
    activeColor: "bg-magenta text-white border-magenta",
    dotColor: "bg-magenta",
  },
  {
    pillar: "Website",
    pillarSlug: "website",
    activeColor: "bg-amethyst text-white border-amethyst",
    dotColor: "bg-amethyst",
  },
  {
    pillar: "Digital Growth Team",
    pillarSlug: "digital-growth-team",
    activeColor: "bg-navy text-white border-navy",
    dotColor: "bg-navy",
  },
];

function buildWaMessage(selected) {
  const lines = selected.map((s) => `• ${s.name} (${s.price})`).join("\n");
  return encodeURIComponent(
    `Halo Optibis, saya tertarik dengan Paket Custom dan ingin menggabungkan beberapa layanan berikut:\n\n${lines}\n\nMohon bantu saya untuk konsultasi lebih lanjut. Terima kasih!`
  );
}

export default function PaketCustomSelector() {
  const [selected, setSelected] = useState([]);
  const [showWA, setShowWA] = useState(false);
  const [openPillars, setOpenPillars] = useState({ "Digital Asset": true, "Website": true, "Digital Growth Team": true });
  const packages = usePackages();
  const packageGroups = PILLAR_GROUPS.map((group) => ({
    ...group,
    packages: packages
      .filter((pkg) => pkg.pillarSlug === group.pillarSlug && !pkg.isServicePackage)
      .map((pkg) => ({ slug: pkg.slug, name: pkg.name, price: pkg.priceShort || pkg.price })),
  })).filter((group) => group.packages.length > 0);

  function togglePillar(pillar) {
    setOpenPillars((prev) => ({ ...prev, [pillar]: !prev[pillar] }));
  }

  function togglePackage(pkg) {
    setSelected((prev) =>
      prev.find((s) => s.slug === pkg.slug)
        ? prev.filter((s) => s.slug !== pkg.slug)
        : [...prev, pkg]
    );
  }

  function isSelected(slug) {
    return selected.some((s) => s.slug === slug);
  }

  const waMsg = buildWaMessage(selected);

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta-50 dark:bg-magenta/20 text-magenta text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> BANGUN PAKET ANDA
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-3">
            Pilih Layanan yang Ingin Digabungkan
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pilih satu atau lebih layanan dari pilar kami. Setelah memilih, kami akan langsung
            konsultasikan kombinasi terbaik untuk bisnis Anda.
          </p>
        </div>

        {/* Pillar Groups */}
        <div className="space-y-4 mb-8">
          {packageGroups.map((group) => (
            <div
              key={group.pillar}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Pillar toggle header */}
              <button
                onClick={() => togglePillar(group.pillar)}
                className="w-full flex items-center justify-between px-5 py-4 bg-slate-50/80 dark:bg-gray-800/80 hover:bg-slate-100/80 dark:hover:bg-gray-700/80 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${group.dotColor}`} />
                  <span className="text-sm font-bold text-navy dark:text-white">{group.pillar}</span>
                  {selected.filter((s) => group.packages.find((p) => p.slug === s.slug)).length > 0 && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-magenta text-white text-[10px] font-bold">
                      {selected.filter((s) => group.packages.find((p) => p.slug === s.slug)).length} dipilih
                    </span>
                  )}
                </div>
                {openPillars[group.pillar] ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {/* Package list */}
              <AnimatePresence initial={false}>
                {openPillars[group.pillar] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="grid sm:grid-cols-3 gap-3 p-4 bg-white dark:bg-gray-900">
                      {group.packages.map((pkg) => {
                        const active = isSelected(pkg.slug);
                        return (
                          <button
                            key={pkg.slug}
                            onClick={() => togglePackage(pkg)}
                            className={`relative flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 hover:scale-[1.02] ${
                              active
                                ? group.activeColor + " shadow-md"
                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                            }`}
                          >
                            {active && (
                              <span className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                            <span className={`text-sm font-semibold leading-tight pr-6 ${active ? "text-white" : "text-navy dark:text-white"}`}>
                              {pkg.name}
                            </span>
                            <span className={`text-xs font-medium ${active ? "text-white/80" : "text-muted-foreground"}`}>
                              {pkg.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Selected summary + CTA */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="rounded-2xl border-2 border-magenta/20 dark:border-magenta/30 bg-magenta-50/40 dark:bg-magenta/10 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Chips */}
                <div className="flex-1">
                  <p className="text-xs font-bold text-magenta uppercase tracking-wide mb-3">
                    Layanan yang dipilih ({selected.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.map((s) => (
                      <span
                        key={s.slug}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-magenta/20 dark:border-magenta/30 text-xs font-semibold text-navy dark:text-white"
                      >
                        {s.name}
                        <button
                          onClick={() => togglePackage(s)}
                          className="text-muted-foreground hover:text-magenta transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* WA CTA button */}
                <div className="shrink-0">
                  <Button
                    onClick={() => setShowWA(true)}
                    className="bg-[#25D366] hover:bg-[#1ebd57] text-white rounded-full px-6 h-11 font-semibold shadow-lg shadow-[#25D366]/20 flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Konsultasi via WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WA contact picker modal */}
        <AnimatePresence>
          {showWA && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowWA(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                {/* Header */}
                <div className="flex items-start justify-between bg-[#25D366] px-5 py-4 text-white">
                  <div>
                    <p className="text-sm font-bold">Pilih Kontak WhatsApp</p>
                    <p className="text-xs text-white/85 mt-0.5">Tim kami siap membantu Anda</p>
                  </div>
                  <button
                    onClick={() => setShowWA(false)}
                    className="text-white/75 hover:text-white transition-colors mt-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Summary */}
                <div className="px-5 pt-4 pb-2">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Paket yang dipilih:
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    {selected.map((s) => (
                      <span
                        key={s.slug}
                        className="px-2 py-0.5 rounded-full bg-magenta-50 dark:bg-magenta/20 text-magenta text-[11px] font-semibold"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contacts */}
                <div className="p-4 space-y-1">
                  {WA_CONTACTS.map((c) => (
                    <a
                      key={c.phone}
                      href={`https://wa.me/${c.phone}?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${c.color} text-sm font-extrabold text-white`}>
                        {c.initials}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-navy dark:text-white">{c.name}</span>
                        <span className="block text-xs text-muted-foreground">{c.phone}</span>
                      </span>
                      <MessageCircle className="w-4 h-4 text-[#25D366] ml-auto shrink-0" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
