import React from "react";
import { motion } from "framer-motion";
import { Eye, Download, FileText, ImageIcon, Film, Archive, Palette } from "lucide-react";

const BADGE_STYLE = {
  New: "bg-green-500 text-white",
  Popular: "bg-magenta text-white",
  Premium: "bg-navy text-white",
  none: "",
};

const FORMAT_ICON = {
  PDF: FileText, PPTX: FileText, DOCX: FileText, XLSX: FileText,
  AI: Palette, EPS: Palette, SVG: Palette, PSD: Palette, FIG: Palette, Canva: Palette,
  PNG: ImageIcon, JPG: ImageIcon, WEBP: ImageIcon,
  MP4: Film,
  ZIP: Archive,
};

const AKSES_LABEL = {
  "Free Download": "Gratis",
  "Login Required": "Login",
  "Member Only": "Member",
  "Premium Member": "Premium",
  "Paid Download": "Bayar",
  "Bundle Download": "Bundle",
  "Customer Exclusive": "Khusus Klien",
  "Partner Exclusive": "Khusus Partner",
};

const AKSES_COLOR = {
  "Free Download": "bg-green-100 text-green-700",
  "Login Required": "bg-blue-100 text-blue-700",
  "Member Only": "bg-purple-100 text-purple-700",
  "Premium Member": "bg-amber-100 text-amber-700",
  "Paid Download": "bg-red-100 text-red-700",
  "Bundle Download": "bg-indigo-100 text-indigo-700",
  "Customer Exclusive": "bg-navy/10 text-navy",
  "Partner Exclusive": "bg-navy/10 text-navy",
};

export default function MarketingKitCard({ item, index, onPreview, onDownload }) {
  const FormatIcon = FORMAT_ICON[item.format_file] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden cursor-pointer" onClick={() => onPreview(item)}>
        <img
          src={item.thumbnail}
          alt={item.nama_asset}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        {/* Badge */}
        {item.badge && item.badge !== "none" && (
          <span className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${BADGE_STYLE[item.badge]}`}>
            {item.badge}
          </span>
        )}
        {/* Akses Type */}
        <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${AKSES_COLOR[item.akses_tipe]}`}>
          {AKSES_LABEL[item.akses_tipe]}
        </span>
        {/* Format */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold text-navy">
          <FormatIcon className="w-3 h-3" /> {item.format_file}
        </div>
        {/* Hover Preview */}
        <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-1.5 text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Eye className="w-4 h-4" /> Preview
          </span>
        </div>
      </div>
      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-[10px] font-semibold text-magenta uppercase tracking-wide mb-1">{item.kategori}</span>
        <h3 className="text-sm font-bold text-navy leading-tight mb-1.5 line-clamp-2">{item.nama_asset}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2 mb-3">{item.deskripsi}</p>
        {/* Meta */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-3 pb-3 border-b border-gray-50">
          <span>{item.ukuran_file}</span>
          <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {item.download_count}</span>
        </div>
        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onPreview(item)}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-navy text-xs font-semibold transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button
            onClick={() => onDownload(item)}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg bg-magenta hover:bg-magenta-500 text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </button>
        </div>
      </div>
    </motion.div>
  );
}