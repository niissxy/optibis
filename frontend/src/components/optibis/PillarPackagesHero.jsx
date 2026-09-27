import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const ACCENT_STYLES = {
  amethyst: {
    featuredCard: "border-amethyst shadow-xl shadow-amethyst/10",
    regularCard: "border-gray-300 hover:border-amethyst/40 hover:shadow-lg",
    badge: "bg-amethyst",
    check: "text-amethyst",
    button: "bg-amethyst hover:bg-amethyst-600",
  },
  magenta: {
    featuredCard: "border-magenta shadow-xl shadow-magenta/10",
    regularCard: "border-gray-300 hover:border-magenta/40 hover:shadow-lg",
    badge: "bg-magenta",
    check: "text-magenta",
    button: "bg-magenta hover:bg-magenta-500",
  },
};

export default function PillarPackagesHero({ title, description, pillarSlug, packages, accent }) {
  const styles = ACCENT_STYLES[accent];
  const { language, tr } = useLanguage();

  return (
    <section className="bg-white py-12 lg:py-16" id="paket">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">{tr(title)}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {language === "en" ? "Choose the package that best fits your business needs and budget." : description}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`relative flex min-h-[454px] flex-col rounded-xl border bg-white p-6 transition-all ${
                pkg.popular ? styles.featuredCard : styles.regularCard
              }`}
            >
              {pkg.popular && (
                <div className={`absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-4 py-1 text-xs font-bold text-white ${styles.badge}`}>
                  <Star className="h-3 w-3" /> {tr("Populer")}
                </div>
              )}

              <h2 className="text-lg font-extrabold text-navy">{tr(pkg.name)}</h2>
              <p className="mt-1 min-h-10 text-xs leading-relaxed text-muted-foreground">{tr(pkg.target)}</p>

              <div className="my-5">
                <span className="text-xs text-muted-foreground">{tr("Mulai dari")}</span>
                <div className="text-2xl font-extrabold text-navy">{pkg.price}</div>
              </div>

              <ul className="mb-6 space-y-2.5">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-navy-300">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${styles.check}`} />
                    <span>{tr(feature)}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/paket/${pillarSlug}/${pkg.slug}`}
                className={`mt-auto inline-flex h-10 w-full items-center justify-center rounded-full px-4 text-sm font-semibold text-white transition-colors ${
                  pkg.popular ? styles.button : "bg-navy hover:bg-navy-400"
                }`}
              >
                {tr("Pilih Paket")}
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
