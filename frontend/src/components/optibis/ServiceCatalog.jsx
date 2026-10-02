import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import { useServices } from "@/hooks/useServices";
import SectionHeading from "@/components/optibis/SectionHeading";

const PILLAR_CATEGORIES = [
  { id: "digital-asset", label: "Digital Asset" },
  { id: "website", label: "Website" },
  { id: "digital-growth-team", label: "Growth Team" },
];

export default function ServiceCatalog() {
  const nav = useSafeNav();
  const { tr } = useLanguage();
  const { getServicesByPillar } = useServices();

  return (
    <section className="py-14 lg:py-20 bg-white" id="layanan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Katalog Layanan"
          title="Semua Kebutuhan Digital Bisnis dalam Satu Tempat"
          description="Pilih layanan yang sesuai dengan kebutuhan bisnis Anda — dari branding, website, hingga pengelolaan digital bulanan."
          className="mb-12"
        />

        <Tabs defaultValue="digital-asset" className="w-full">
          <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 bg-gray-100 p-1 rounded-full mb-10">
            {PILLAR_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="rounded-full text-xs sm:text-sm font-semibold data-[state=active]:bg-magenta data-[state=active]:text-white"
              >
                {tr(cat.label)}
              </TabsTrigger>
            ))}
          </TabsList>

          {PILLAR_CATEGORIES.map((cat) => {
            const items = getServicesByPillar(cat.id);
            return (
              <TabsContent key={cat.id} value={cat.id}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div
                        key={s.slug || s.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => nav(`/layanan/${cat.id}/${s.slug}`)}
                        className="group bg-white rounded-xl border border-gray-300 p-5 hover:border-magenta/40 hover:shadow-lg hover:shadow-magenta/5 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-magenta-50 transition-colors">
                            {Icon && <Icon className="w-5 h-5 text-navy-300 group-hover:text-magenta transition-colors" />}
                          </div>
                          <h3 className="text-sm font-bold text-navy mb-1 group-hover:text-magenta transition-colors">
                            {tr(s.name)}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{tr(s.desc)}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-magenta">
                          <span>{tr("Lihat Detail Layanan")}</span>
                          <span>→</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
