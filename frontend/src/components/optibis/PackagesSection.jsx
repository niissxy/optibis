import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useSafeNav } from "@/hooks/useSafeNav";
import { getPackagesByPillar } from "@/data/packages";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const PILLAR_SLUGS = {
  "Digital Asset": "digital-asset",
  "Website": "website",
  "Digital Growth Team": "digital-growth-team",
};

const PACKAGES = {
  "Digital Asset": getPackagesByPillar("digital-asset").map((p) => ({ name: p.name, target: p.target, price: p.priceShort || p.price, features: p.included.map((i) => i.title), popular: p.popular, slug: p.slug })),
  "Website": getPackagesByPillar("website").map((p) => ({ name: p.name, target: p.target, price: p.priceShort || p.price, features: p.included.map((i) => i.title), popular: p.popular, slug: p.slug })),
  "Digital Growth Team": getPackagesByPillar("digital-growth-team").map((p) => ({ name: p.name, target: p.target, price: p.priceShort || p.price, features: p.included.map((i) => i.title), popular: p.popular, slug: p.slug })),
};

export default function PackagesSection() {
  const nav = useSafeNav();
  const { tr } = useLanguage();

  return (
    <section className="py-14 lg:py-20 bg-white" id="paket">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Paket Optibis" title="Paket Unggulan" description="Pilih paket yang sesuai kebutuhan dan budget bisnis Anda. Semua paket dapat disesuaikan." className="mb-12" />

        <Tabs defaultValue="Digital Asset" className="w-full">
          <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 bg-gray-100 p-1 rounded-full mb-10">
            <TabsTrigger value="Digital Asset" className="rounded-full text-xs sm:text-sm font-semibold data-[state=active]:bg-magenta data-[state=active]:text-white">
              Digital Asset
            </TabsTrigger>
            <TabsTrigger value="Website" className="rounded-full text-xs sm:text-sm font-semibold data-[state=active]:bg-magenta data-[state=active]:text-white">
              Website
            </TabsTrigger>
            <TabsTrigger value="Digital Growth Team" className="rounded-full text-xs sm:text-sm font-semibold data-[state=active]:bg-magenta data-[state=active]:text-white">
              Growth Team
            </TabsTrigger>
          </TabsList>

          {Object.entries(PACKAGES).map(([category, pkgs]) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-3 gap-6">
                {pkgs.map((pkg, i) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`relative bg-white rounded-2xl border p-6 transition-all duration-300 ${
                      pkg.popular
                        ? "border-magenta shadow-xl shadow-magenta/10 scale-[1.02]"
                        : "border-gray-300 hover:border-magenta/40 hover:shadow-lg"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-magenta text-white text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" /> {tr("Paling Populer")}
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="text-lg font-extrabold text-navy">{tr(pkg.name)}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{tr(pkg.target)}</p>
                    </div>

                    <div className="mb-6">
                      <span className="text-sm text-muted-foreground">{tr("Mulai dari")}</span>
                      <div className="text-2xl font-extrabold text-navy">{pkg.price}</div>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-navy-300">
                          <Check className="w-4 h-4 text-magenta shrink-0 mt-0.5" />
                          {tr(f)}
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-2">
                      <Link
                        to={`/paket/${PILLAR_SLUGS[category]}/${pkg.slug}`}
                        className={`inline-flex items-center justify-center w-full rounded-full text-sm font-semibold h-9 px-4 transition-colors ${
                          pkg.popular
                            ? "bg-magenta hover:bg-magenta-500 text-white"
                            : "bg-navy hover:bg-navy-400 text-white"
                        }`}
                      >
                        {tr("Lihat Detail")}
                      </Link>
                      <Button variant="ghost" onClick={() => nav("#konsultasi")} className="w-full rounded-full text-sm font-medium text-navy-300">
                        {tr("Konsultasi Paket")}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
