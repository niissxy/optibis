import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, ExternalLink, Download, Eye, Loader2, FileCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function DocumentViewer({ documents, projectName }) {
  const [activeDoc, setActiveDoc] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const { tr } = useLanguage();

  const openViewer = (doc) => {
    setActiveDoc(doc);
    setIframeLoading(true);
  };

  const closeViewer = () => {
    setActiveDoc(null);
    setIframeLoading(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeViewer();
    };
    if (activeDoc) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeDoc]);

  if (!documents || documents.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-slate-50 border-t border-slate-200/70" id="documents-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-magenta-50 text-magenta text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" /> {tr("Dokumen & Deliverables")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mb-2">
            {tr("Dokumen Terkait Proyek")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {tr("Pelajari spesifikasi, brand guideline, atau materi deliverable resmi dari pengerjaan")} {projectName || tr("proyek ini")}.
          </p>
        </div>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {documents.map((doc, i) => (
            <motion.div
              key={doc.title || i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:border-magenta/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-magenta-50 group-hover:text-magenta transition-all">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 tracking-wider uppercase">
                    {doc.type || "PDF"}
                  </span>
                </div>
                
                <h4 className="text-base font-bold text-navy mb-2 leading-snug group-hover:text-magenta transition-colors">
                  {tr(doc.title)}
                </h4>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tr(doc.desc || "Dokumen resmi dan materi deliverable pendukung proyek.")}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                <Button
                  onClick={() => openViewer(doc)}
                  className="flex-1 rounded-full text-xs font-semibold bg-navy hover:bg-magenta text-white transition-all h-10 shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> {tr("Lihat Dokumen")}
                </Button>

                {doc.url && (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={tr("Buka dokumen di tab baru")}
                    className="w-10 h-10 rounded-full border border-navy-400 bg-navy text-white hover:border-magenta hover:bg-magenta flex items-center justify-center shrink-0 transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {activeDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
            onClick={closeViewer}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-navy truncate">{tr(activeDoc.title)}</h3>
                    <p className="text-xs text-muted-foreground truncate">{projectName || tr("Dokumen")} — {activeDoc.type || "PDF"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-magenta-50 text-magenta hover:bg-magenta hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> {tr("Buka Tab Baru")}
                  </a>
                  <button
                    onClick={closeViewer}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-navy flex items-center justify-center transition-colors shrink-0"
                    aria-label={tr("Tutup")}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto bg-slate-100 relative min-h-[55vh] flex flex-col">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-50/90">
                    <Loader2 className="w-10 h-10 text-magenta animate-spin mb-3" />
                    <p className="text-sm font-medium text-navy">{tr("Memuat preview dokumen...")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tr("Harap tunggu beberapa detik.")}</p>
                  </div>
                )}
                <iframe
                  src={activeDoc.url}
                  title={activeDoc.title}
                  className="w-full flex-1 min-h-[55vh] border-0"
                  onLoad={() => setIframeLoading(false)}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3.5 border-t border-gray-100 bg-white">
                <span className="text-xs text-muted-foreground text-center sm:text-left">
                  {tr("Format")} {activeDoc.type || "Dokumen"} • {tr("Jika pratinjau tidak tampil, klik tombol buka/unduh.")}
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href={activeDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-magenta-50 text-magenta hover:bg-magenta hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> {tr("Buka Tab Baru")}
                  </a>
                  <a
                    href={activeDoc.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-navy hover:bg-navy-600 text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> {tr("Download")}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
