import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Palette, Globe, Users, ArrowRight, FileText, Megaphone, Camera, Mail, Layout, Settings, TrendingUp, Search, BarChart3, ClipboardList } from "lucide-react";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const PILLAR_ROUTES = {
  "Digital Asset": "/digital-asset",
  "Website": "/website",
  "Digital Growth Team": "/digital-growth-team",
};

const SERVICES = {
  "Digital Asset": [
    { icon: Palette, name: "Brand Identity", desc: "Logo, brand guideline, dan seluruh identitas visual bisnis Anda." },
    { icon: FileText, name: "Stationery Bisnis", desc: "Kartu nama, kop surat, invoice, dan dokumen bisnis profesional." },
    { icon: Megaphone, name: "Marketing & Sales Assets", desc: "Company profile, pitch deck, brosur, katalog, dan materi penjualan." },
    { icon: Camera, name: "Social Media Assets", desc: "Template feed, story, highlight, dan seluruh visual media sosial." },
    { icon: FileText, name: "Content & Media", desc: "Copywriting, artikel, video promosi, foto produk, dan konten digital." },
    { icon: Mail, name: "Digital Channel Setup", desc: "Email bisnis, Google Business, WhatsApp Business, dan akun digital." },
  ],
  "Website": [
    { icon: Layout, name: "Landing Page", desc: "Halaman fokus untuk promosi, event, campaign, atau lead generation." },
    { icon: Globe, name: "Company Website", desc: "Website company profile, corporate, portfolio, dan layanan profesional." },
    { icon: Settings, name: "Website Growth System", desc: "Website custom dengan CMS, CRM, booking, dan sistem terintegrasi." },
    { icon: TrendingUp, name: "Website Improvement", desc: "Redesign, remake, optimasi kecepatan, SEO, dan konversi website." },
    { icon: Settings, name: "Website Maintenance", desc: "Update berkala, backup, keamanan, dan dukungan teknis website." },
    { icon: Globe, name: "Website Berdasarkan Fungsi", desc: "Toko online, booking, membership, directory, dan multi-cabang." },
  ],
  "Digital Growth Team": [
    { icon: ClipboardList, name: "Strategi & Planning", desc: "Digital audit, riset kompetitor, content strategy, dan monthly roadmap." },
    { icon: Camera, name: "Content Management", desc: "Kalender konten, desain, copywriting, reels, artikel, dan publishing." },
    { icon: Users, name: "Social Media Management", desc: "Posting, scheduling, monitoring, dan reporting media sosial." },
    { icon: Globe, name: "Website Management", desc: "Update konten, maintenance, blog, dan monitoring performa website." },
    { icon: Search, name: "SEO & Visibility", desc: "SEO on-page, local SEO, Google Business, dan monitoring keyword." },
    { icon: BarChart3, name: "Digital Advertising", desc: "Meta Ads, Google Ads, TikTok Ads, creative, dan campaign reporting." },
  ],
};

export default function ServiceCatalog() {
  const nav = useSafeNav();
  const { tr } = useLanguage();

  return (
    <section className="py-14 lg:py-20 bg-white" id="layanan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Katalog Layanan" title="Semua Kebutuhan Digital Bisnis dalam Satu Tempat" description="Pilih layanan yang sesuai dengan kebutuhan bisnis Anda — dari branding, website, hingga pengelolaan digital bulanan." className="mb-12" />

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

          {Object.entries(SERVICES).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => nav(PILLAR_ROUTES[category])}
                    className="group bg-white rounded-xl border border-gray-300 p-5 hover:border-magenta/40 hover:shadow-lg hover:shadow-magenta/5 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-magenta-50 transition-colors">
                      <s.icon className="w-5 h-5 text-navy-300 group-hover:text-magenta transition-colors" />
                    </div>
                    <h3 className="text-sm font-bold text-navy mb-1">{tr(s.name)}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tr(s.desc)}</p>
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
