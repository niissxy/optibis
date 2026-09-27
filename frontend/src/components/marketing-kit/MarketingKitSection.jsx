import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Share2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MarketingKitPreview from "@/components/marketing-kit/MarketingKitPreview";
import MarketingKitDownloadGate from "@/components/marketing-kit/MarketingKitDownloadGate";
import { MARKETING_KIT_ITEMS } from "@/data/marketingKit";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const BADGE_STYLE = {
  New: "bg-green-500 text-white",
  Popular: "bg-magenta text-white",
  Premium: "bg-navy text-white",
  none: "hidden",
};

export default function MarketingKitSection() {
  const { tr } = useLanguage();
  const [previewItem, setPreviewItem] = useState(null);
  const [downloadItem, setDownloadItem] = useState(null);
  const featured = MARKETING_KIT_ITEMS.filter((it) => it.featured).slice(0, 4);

  return (
    <section className="py-16 lg:py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionHeading eyebrow="Marketing Kit Center" title="Download Center & Sales Kit" description="Akses materi promosi resmi — company profile, katalog, ebook, template, dan branding assets. Preview gratis, download dengan login." className="mb-6" />
          <div className="flex justify-center">
            <Link to="/marketing-kit">
              <Button variant="outline" className="rounded-full border-magenta/30 text-magenta hover:bg-magenta/5 group">
                {tr("Lihat Semua")} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-32 overflow-hidden cursor-pointer" onClick={() => setPreviewItem(item)}>
                <img src={item.thumbnail} alt={item.nama_asset} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                {item.badge && item.badge !== "none" && (
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${BADGE_STYLE[item.badge]}`}>
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-bold text-navy">
                  {item.format_file}
                </span>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <span className="text-[9px] font-semibold text-magenta uppercase tracking-wide mb-0.5">{tr(item.kategori)}</span>
                <h3 className="text-xs font-bold text-navy leading-tight mb-1.5 line-clamp-2">{tr(item.nama_asset)}</h3>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
                  <span className="flex items-center gap-0.5"><Download className="w-2.5 h-2.5" /> {item.download_count}</span>
                  <span>•</span>
                  <span>{item.ukuran_file}</span>
                </div>
                <div className="flex gap-1.5 mt-auto">
                  <button onClick={() => setPreviewItem(item)} className="flex-1 flex items-center justify-center gap-1 h-7 rounded-md bg-slate-100 hover:bg-slate-200 text-navy text-[10px] font-semibold transition-colors">
                    <Eye className="w-3 h-3" /> {tr("Preview")}
                  </button>
                  <button onClick={() => setDownloadItem(item)} className="flex-1 flex items-center justify-center gap-1 h-7 rounded-md bg-magenta hover:bg-magenta-500 text-white text-[10px] font-semibold transition-colors">
                    <Download className="w-3 h-3" /> {tr("Download")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-magenta" /> {tr("Preview Gratis")}</span>
          <span className="flex items-center gap-1.5"><Download className="w-3.5 h-3.5 text-magenta" /> {tr("Download dengan Login")}</span>
          <span className="flex items-center gap-1.5"><Share2 className="w-3.5 h-3.5 text-magenta" /> {tr("Share & Request Custom")}</span>
        </div>
      </div>

      <MarketingKitPreview item={previewItem} onClose={() => setPreviewItem(null)} onDownload={setDownloadItem} />
      <MarketingKitDownloadGate item={downloadItem} onClose={() => setDownloadItem(null)} />
    </section>
  );
}
