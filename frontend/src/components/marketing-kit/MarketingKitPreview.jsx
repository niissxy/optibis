import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MarketingKitPreview({ item, onClose, onDownload }) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 rounded-md bg-magenta/10 text-magenta text-[10px] font-bold uppercase shrink-0">{item.kategori}</span>
                <h3 className="text-sm font-bold text-navy truncate">{item.nama_asset}</h3>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 text-muted-foreground hover:text-navy hover:bg-gray-50 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button onClick={onClose} className="p-2 text-muted-foreground hover:text-navy hover:bg-gray-50 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Preview Area */}
            <div className="flex-1 overflow-auto bg-slate-50 flex items-center justify-center min-h-[300px] lg:min-h-[400px] p-4">
              {item.format_file === "MP4" ? (
                <video controls className="max-w-full max-h-[60vh] rounded-lg shadow-lg">
                  <source src={item.preview_url} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.preview_url}
                  alt={item.nama_asset}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                />
              )}
            </div>
            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100">
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{item.deskripsi}</p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {item.format_file} • {item.ukuran_file}</span>
                <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {item.download_count} downloads</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.subkategori}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="rounded-lg flex-1">
                  Tutup
                </Button>
                <Button
                  onClick={() => { onClose(); onDownload(item); }}
                  className="bg-magenta hover:bg-magenta-500 text-white rounded-lg flex-1"
                >
                  <Download className="w-4 h-4 mr-1" /> Download Sekarang
                </Button>
              </div>
              <p className="text-center text-[11px] text-muted-foreground mt-2">
                Preview gratis • Download memerlukan login
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}