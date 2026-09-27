import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

export default function FinalCTA() {
  const nav = useSafeNav();
  const { tr } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#233554] py-16 lg:py-24" id="final-cta">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[40rem] h-[40rem] bg-magenta/15 rounded-full blur-[100px]" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            {tr("Siap Membangun Brand, Website, dan Pertumbuhan Digital Bisnis Anda?")}
          </h2>
          
          <p className="text-sm sm:text-base text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
            {tr("Konsultasikan kebutuhan bisnis Anda secara gratis dan dapatkan rekomendasi solusi yang sesuai.")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => nav("#konsultasi")}
              size="lg"
              className="rounded-full px-8 h-12 text-sm font-semibold w-full sm:w-auto transition-all group bg-magenta text-white hover:bg-magenta-500 shadow-lg shadow-magenta/20"
            >
              {tr("Konsultasi Gratis")}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 text-white" />
            </Button>
            <a
              href="https://wa.me/6287772577020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#25D366] hover:bg-[#1ebd57] text-white text-sm font-semibold transition-all shadow-lg shadow-[#25D366]/20 w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              {tr("Chat via WhatsApp")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
