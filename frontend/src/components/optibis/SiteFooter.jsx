import React from "react";
import { MessageCircle, Mail, MapPin, Clock, Instagram, Youtube } from "lucide-react";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useLanguage } from "@/lib/LanguageContext";
import LatestInsights from "@/components/viralog/LatestInsights";

const FOOTER_LINKS = {
  "Tiga Pilar": [
    { label: "Digital Asset", href: "/digital-asset" },
    { label: "Website", href: "/website" },
    { label: "Digital Growth Team", href: "/digital-growth-team" },
  ],
  "Solusi": [
    { label: "Memulai Bisnis", href: "#total-solution" },
    { label: "Meningkatkan Citra", href: "#total-solution" },
    { label: "Membuat Website", href: "/website" },
    { label: "Cari Leads", href: "#total-solution" },
    { label: "Kelola Digital", href: "/digital-growth-team" },
    { label: "Multi-Cabang", href: "#total-solution" },
  ],
  "Perusahaan": [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Portofolio", href: "#portofolio" },
    { label: "FAQ", href: "#faq-konsultasi" },
    { label: "Kontak", href: "#konsultasi" },
  ],
  "Bantuan": [
    { label: "FAQ", href: "#faq-konsultasi" },
    { label: "Kebijakan Privasi", href: "#konsultasi" },
    { label: "Syarat & Ketentuan", href: "#konsultasi" },
  ],
};

export default function SiteFooter() {
  const nav = useSafeNav();
  const { language, tr } = useLanguage();

  return (
    <>
      <LatestInsights />
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="text-xl font-extrabold mb-3">
              OPTIBIS<span className="text-magenta">.ID</span>
            </div>
            <p className="text-sm text-white/60 mb-5 max-w-xs leading-relaxed">
              {language === "en" ? "One partner for your business branding, website, and digital growth." : "Satu partner untuk branding, website, dan pertumbuhan digital bisnis Anda."}
            </p>
            <div className="flex gap-3 mb-5">
              <a href="https://instagram.com/optibis.id" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-magenta hover:scale-110 hover:-rotate-6 transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@optibis" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-magenta hover:scale-110 hover:rotate-6 transition-all duration-300" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-2 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <a href="https://wa.me/6287772577020" target="_blank" rel="noopener noreferrer" className="hover:text-magenta">+62 877-7257-7020</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <a href="mailto:hello@optibis.id" className="hover:text-magenta">hello@optibis.id</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{language === "en" ? "Mon - Fri, 09:00 - 18:00 WIB" : "Sen - Jum, 09:00 - 18:00 WIB"}</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4">{tr(title)}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => nav(link.href)}
                      className="text-sm text-white/50 hover:text-magenta hover:translate-x-1 transition-all duration-300 text-left"
                    >
                      {tr(link.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            © 2024 OPTIBIS.ID. {language === "en" ? "All rights reserved." : "Hak cipta dilindungi."}
          </p>
          <p className="text-xs text-white/30">
            {language === "en" ? "Built for digital business growth in Indonesia." : "Dibuat untuk pertumbuhan digital bisnis di Indonesia."}
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
