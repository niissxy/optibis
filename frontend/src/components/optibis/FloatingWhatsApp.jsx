import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const WHATSAPP_CONTACTS = [
  {
    initials: "A1",
    name: "CS Admin 1",
    phone: "+6287772577020",
    color: "bg-magenta",
  },
  {
    initials: "A2",
    name: "CS Admin 2",
    phone: "+6287821138949",
    color: "bg-amethyst",
  },
  {
    initials: "OC",
    name: "Optibis Consultant",
    phone: "+6287741539006",
    color: "bg-navy",
  },
];

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const { language, tr } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 h-14 w-14">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-72 origin-bottom-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-green-500"
            />
            <div className="flex items-start justify-between bg-green-500 px-5 py-4 text-white">
              <div>
                <span className="text-sm font-bold">Optibis Support</span>
                <p className="mt-0.5 text-xs text-white/90">{tr("Pilih kontak untuk chat via WhatsApp")}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/75 hover:text-white" aria-label={tr("Tutup")}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-1 bg-white p-4">
              {WHATSAPP_CONTACTS.map((contact) => (
                <a
                  key={contact.phone}
                  href={`https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(language === "en" ? "Hello Optibis, I would like to discuss my business's digital needs." : "Halo Optibis, saya ingin konsultasi tentang kebutuhan digital bisnis saya.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-slate-50"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${contact.color} text-sm font-extrabold text-white`}>
                    {contact.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-navy">{contact.name}</span>
                    <span className="block text-xs text-muted-foreground">{contact.phone}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:bg-green-600 active:scale-95"
        aria-label="Chat WhatsApp"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring" />
        )}
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="relative z-10 h-6 w-6" />}
      </button>
    </div>
  );
}
