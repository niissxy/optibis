import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, ExternalLink, Download, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentViewer({ documents, projectName }) {
  const [activeDoc, setActiveDoc] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  const openViewer = (doc) => {
    setActiveDoc(doc);
    setIframeLoading(true);
  };

  const closeViewer = () => {
    setActiveDoc(null);
    setIframeLoading(true);
  };

  if (!documents || documents.length === 0) return null;

  return (
    <>
      {/* Document Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, i) => (
          <motion.div
            key={doc.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-magenta/20 transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-navy leading-tight">{doc.title}</h4>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-gray-100 text-muted-foreground">
                  {doc.type}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{doc.desc}</p>
            <Button
              onClick={() => openViewer(doc)}
              variant="outline"
              className="w-full rounded-full text-xs font-semibold border-gray-200 text-navy hover:bg-magenta-50 hover:text-magenta hover:border-magenta/20 h-9"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" /> Lihat Dokumen
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {activeDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeViewer}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-navy truncate">{activeDoc.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{projectName} — {activeDoc.type}</p>
                  </div>
                </div>
                <button
                  onClick={closeViewer}
                  className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-navy flex items-center justify-center transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto bg-gray-50 relative">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gray-50">
                    <Loader2 className="w-10 h-10 text-magenta animate-spin mb-3" />
                    <p className="text-sm text-muted-foreground">Memuat dokumen...</p>
                  </div>
                )}
                <iframe
                  src={activeDoc.url}
                  title={activeDoc.title}
                  className="w-full h-full min-h-[60vh]"
                  onLoad={() => setIframeLoading(false)}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between gap-3 px-6 py-3 border-t border-gray-100 bg-white">
                <span className="text-xs text-muted-foreground shrink-0">{activeDoc.type} Document</span>
                <div className="flex items-center gap-2">
                  <a
                    href={activeDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-magenta hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Buka Tab Baru
                  </a>
                  <a
                    href={activeDoc.url}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}