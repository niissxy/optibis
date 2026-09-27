import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import { useSafeNav } from "@/hooks/useSafeNav";
import { getServiceSlug } from "@/lib/serviceRoutes";
import { SERVICES as DIGITAL_ASSET_SERVICES } from "@/pages/DigitalAsset";
import { SERVICES as WEBSITE_SERVICES } from "@/pages/WebsiteService";
import { SERVICES as DIGITAL_GROWTH_SERVICES } from "@/pages/DigitalGrowthTeam";
import { useLanguage } from "@/lib/LanguageContext";

const PILLARS = {
  "digital-asset": {
    name: "Digital Asset",
    path: "/digital-asset",
    services: DIGITAL_ASSET_SERVICES,
    accentText: "text-magenta",
    accentBg: "bg-magenta-50",
    button: "bg-magenta hover:bg-magenta-500",
    border: "border-magenta/15",
  },
  website: {
    name: "Website",
    path: "/website",
    services: WEBSITE_SERVICES,
    accentText: "text-amethyst",
    accentBg: "bg-amethyst-50",
    button: "bg-amethyst hover:bg-amethyst-600",
    border: "border-amethyst/15",
  },
  "digital-growth-team": {
    name: "Digital Growth Team",
    path: "/digital-growth-team",
    services: DIGITAL_GROWTH_SERVICES,
    accentText: "text-magenta",
    accentBg: "bg-magenta-50",
    button: "bg-magenta hover:bg-magenta-500",
    border: "border-magenta/15",
  },
};

export default function ServiceDetail() {
  const { pillarSlug, serviceSlug } = useParams();
  const nav = useSafeNav();
  const { language, tr } = useLanguage();
  const pillar = PILLARS[pillarSlug];
  const service = pillar?.services.find((item) => getServiceSlug(item.name) === serviceSlug);

  if (!pillar || !service) {
    return (
      <PillarLayout>
        <section className="px-4 py-24 text-center">
          <h1 className="text-3xl font-extrabold text-navy">{tr("Layanan tidak ditemukan")}</h1>
          <p className="mt-3 text-muted-foreground">{language === "en" ? "The service page you requested is unavailable." : "Halaman layanan yang Anda cari tidak tersedia."}</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 font-semibold text-magenta">
            <ArrowLeft className="h-4 w-4" /> {tr("Kembali ke Beranda")}
          </Link>
        </section>
      </PillarLayout>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <PillarLayout>
      <section className={`border-b bg-white py-12 lg:py-16 ${pillar.border}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to={pillar.path} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-navy">
            <ArrowLeft className="h-4 w-4" /> {language === "en" ? "Back to" : "Kembali ke"} {pillar.name}
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${pillar.accentBg} ${pillar.accentText}`}>
                <ServiceIcon className="h-6 w-6" />
              </div>
              <p className={`text-xs font-bold uppercase ${pillar.accentText}`}>{pillar.name}</p>
              <h1 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">{service.name}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">{service.desc}</p>
              <Button onClick={() => nav("#konsultasi")} className={`mt-7 h-12 rounded-full px-8 text-white ${pillar.button}`}>
                {tr("Konsultasikan Layanan")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12 }} className="overflow-hidden rounded-xl border border-gray-100 shadow-xl shadow-navy/10">
              <img src={service.image} alt={service.name} className="aspect-[4/3] w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/50 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">{tr("Yang Termasuk dalam Layanan")}</h2>
            <p className="mt-3 text-muted-foreground">{language === "en" ? `The main deliverables included in ${service.name}.` : `Cakupan utama yang akan Anda dapatkan dari layanan ${service.name}.`}</p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4"
              >
                <Check className={`mt-0.5 h-5 w-5 shrink-0 ${pillar.accentText}`} />
                <span className="text-sm font-medium text-navy-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-4 py-16 text-center text-white">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{language === "en" ? `Need ${service.name}?` : `Butuh Layanan ${service.name}?`}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">{language === "en" ? "Discuss your business needs with the Optibis team." : "Diskusikan kebutuhan bisnis Anda bersama tim Optibis."}</p>
        <a
          href="https://wa.me/6287772577020"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green-500 px-8 text-sm font-semibold text-white transition-colors hover:bg-green-600"
        >
          <MessageCircle className="h-4 w-4" /> {tr("Chat WhatsApp")}
        </a>
      </section>
    </PillarLayout>
  );
}
