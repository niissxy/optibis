import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Search, MessageCircle, LayoutDashboard, Moon, Sun, Globe2, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useAuth } from "@/lib/AuthContext";
import MegaMenuDropdown from "@/components/optibis/MegaMenuDropdown";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/LanguageContext";

const LAYANAN_CHILDREN = [
  { group: "", items: [
    { label: "Digital Asset", href: "/digital-asset" },
    { label: "Website", href: "/website" },
    { label: "Digital Growth Team", href: "/digital-growth-team" },
  ]},
];

const PAKET_CHILDREN = [
  { group: "Digital Asset", items: [
    { label: "Paket Siap Usaha", href: "/paket/digital-asset/siap-usaha" },
    { label: "Paket Citra Usaha", href: "/paket/digital-asset/citra-usaha" },
    { label: "Paket Bisnis Profesional", href: "/paket/digital-asset/bisnis-profesional" },
  ]},
  { group: "Website", items: [
    { label: "Landing Page", href: "/paket/website/landing-page" },
    { label: "Multi Page", href: "/paket/website/multi-page" },
    { label: "Toko Online", href: "/paket/website/toko-online" },
  ]},
  { group: "Digital Growth Team", items: [
    { label: "Admin Digital", href: "/paket/digital-growth-team/growth" },
  ]},
];

const PORTOFOLIO_CHILDREN = [
  { group: "", items: [
    { label: "Proyek", href: "/portofolio" },
    { label: "Tools & Platform", href: "/tools" },
    { label: "Solution Library", href: "/solution-library" },
    { label: "Marketing Kit", href: "/marketing-kit" },
  ]},
];

const KONTEN_CHILDREN = [
  { group: "Jelajah Konten", items: [
    { label: "Semua Konten", href: "/content" },
    { label: "Trending", href: "/trending" },
    { label: "Short Video", href: "/short-video" },
    { label: "Video & Podcast", href: "/video" },
    { label: "Cari Konten", href: "/search" },
  ]},
  { group: "Produk Digital", items: [
    { label: "Ebook & Pelatihan", href: "/insight" },
    { label: "Konsultasi Berbayar", href: "/insight" },
    { label: "Tools & Template", href: "/insight" },
  ]},
];

const TENTANG_CHILDREN = [
  { group: "Perusahaan", items: [
    { label: "Tentang Optibis", href: "/tentang#tentang-optibis" },
    { label: "Proses Kerja", href: "/tentang#proses" },
    { label: "Tim Kami", href: "/tentang#tim-kami" },
  ]},
  { group: "Hubungi Kami", items: [
    { label: "Konsultasi Gratis", href: "/tentang#konsultasi-gratis" },
    { label: "Chat WhatsApp", href: "/tentang#chat-whatsapp" },
    { label: "Lokasi Kantor", href: "/tentang#lokasi-kantor" },
  ]},
];

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/layanan", megaChildren: LAYANAN_CHILDREN, megaWidth: "w-64" },
  { label: "Paket", href: "/paket", megaChildren: PAKET_CHILDREN, megaWidth: "w-80" },
  { label: "Portofolio", href: "/portofolio", megaChildren: PORTOFOLIO_CHILDREN, megaWidth: "w-64" },
  { label: "Konten", href: "/content", megaChildren: KONTEN_CHILDREN, megaWidth: "w-72" },
  { label: "Tentang", href: "/tentang", megaChildren: TENTANG_CHILDREN, megaWidth: "w-72" },
];

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

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const handleNavClick = useSafeNav();
  const { isAuthenticated: isAuthed } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const { language, setLanguage, t, tr } = useLanguage();
  const darkNav = resolvedTheme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavClick = (href) => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
    setWhatsappOpen(false);
    setLanguageOpen(false);
    handleNavClick(href);
  };

  const toggleNavTheme = () => {
    setTheme(darkNav ? "light" : "dark");
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      darkNav
        ? scrolled
          ? "bg-navy/95 shadow-sm backdrop-blur-xl"
          : "bg-navy/90 backdrop-blur-md"
        : scrolled
          ? "bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-white/70 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <span className={`origin-left text-xl font-extrabold tracking-tight transition-transform group-hover:scale-105 ${darkNav ? "text-white" : "text-navy"}`}>
              OPTIBIS<span className="text-magenta">.ID</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.megaChildren) {
                return (
                  <MegaMenuDropdown
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    onNavClick={onNavClick}
                    width={item.megaWidth}
                    dark={darkNav}
                    translate={tr}
                  >
                    {item.megaChildren}
                  </MegaMenuDropdown>
                );
              }
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => onNavClick(item.href)}
                    className={`group relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      darkNav ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-navy-400 hover:bg-magenta-50/50 hover:text-magenta"
                    }`}
                  >
                    {tr(item.label)}
                    {item.children && <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />}
                  </button>
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 w-72">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 space-y-4">
                        {item.children.map((group) => (
                          <div key={group.group}>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group.group}</p>
                            <div className="space-y-1">
                              {group.items.map((sub) => (
                                <button
                                  key={sub.label}
                                  onClick={() => onNavClick(sub.href)}
                                  className="block w-full text-left px-3 py-1.5 text-sm text-navy-400 hover:text-magenta hover:bg-magenta-50 rounded-md transition-colors"
                                >
                                  {sub.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-1.5">
            {isAuthed && (
              <Link
                to="/app"
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${darkNav ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-navy-400 hover:bg-magenta-50 hover:text-magenta"}`}
                title="Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </Link>
            )}
            <button
              type="button"
              onClick={toggleNavTheme}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${darkNav ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-navy-400 hover:bg-magenta-50 hover:text-magenta"}`}
                aria-label={darkNav ? t("lightMode") : t("darkMode")}
                title={darkNav ? t("lightMode") : t("darkMode")}
            >
              {darkNav ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLanguageOpen((value) => !value);
                  setWhatsappOpen(false);
                }}
                className={`flex h-9 items-center gap-1 rounded-full px-2.5 text-xs font-semibold transition-colors ${darkNav ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-navy-400 hover:bg-magenta-50 hover:text-magenta"}`}
                aria-expanded={languageOpen}
                aria-label={t("chooseLanguage")}
              >
                <Globe2 className="h-4 w-4" /> {language.toUpperCase()} <ChevronDown className={`h-3 w-3 transition-transform ${languageOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-3 w-48 origin-top-right rounded-lg border border-gray-100 bg-white p-2 shadow-xl"
                  >
                    <button type="button" onClick={() => { setLanguage("id"); setLanguageOpen(false); }} className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold ${language === "id" ? "bg-magenta-50 text-magenta" : "text-navy hover:bg-slate-50"}`}>
                      {tr("Bahasa Indonesia")} <span className="text-xs">ID</span>
                    </button>
                    <button type="button" onClick={() => { setLanguage("en"); setLanguageOpen(false); }} className={`mt-1 flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold ${language === "en" ? "bg-magenta-50 text-magenta" : "text-navy hover:bg-slate-50"}`}>
                      English <span className="text-xs">EN</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              to="/search"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${darkNav ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-navy-400 hover:bg-magenta-50 hover:text-magenta"}`}
              aria-label={t("searchPlaceholder")}
              title={tr("Cari Konten")}
            >
              <Search className="h-4 w-4" />
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setWhatsappOpen((value) => !value);
                  setLanguageOpen(false);
                }}
                className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-all ${
                  darkNav ? "border-white/25 text-white hover:border-white/50 hover:bg-white/10" : "border-magenta/35 text-magenta hover:border-magenta hover:bg-magenta-50"
                }`}
                aria-expanded={whatsappOpen}
                aria-label="Buka pilihan kontak WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden xl:inline">{tr("Konsultasi")}</span>
              </button>
              <AnimatePresence>
                {whatsappOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-4 w-72 origin-top-right overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl"
                  >
                    <div className="bg-green-500 px-4 py-3 text-white">
                      <div className="text-sm font-bold">Optibis Support</div>
                      <div className="mt-0.5 text-xs text-white/90">{language === "en" ? "Choose a contact to chat via WhatsApp" : "Pilih kontak untuk chat via WhatsApp"}</div>
                    </div>
                    <div className="space-y-1 bg-white p-4">
                      {WHATSAPP_CONTACTS.map((contact) => (
                        <a
                          key={contact.phone}
                          href={`https://wa.me/${contact.phone.replace(/\D/g, "")}?text=Halo%20Optibis%2C%20saya%20ingin%20konsultasi%20tentang%20kebutuhan%20digital%20bisnis%20saya.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setWhatsappOpen(false)}
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
            </div>
            <Button
              onClick={() => onNavClick("#paket")}
              className="h-9 rounded-full bg-magenta px-4 text-xs font-semibold text-white shadow-lg shadow-magenta/20 transition-all duration-300 hover:scale-105 hover:bg-magenta-500 hover:shadow-xl active:scale-95"
            >
              <PackageOpen className="mr-1.5 h-4 w-4 xl:hidden" />
              <span className="hidden xl:inline">{tr("Lihat Paket")}</span>
              <span className="xl:hidden">{tr("Paket")}</span>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 ${darkNav ? "text-white" : "text-navy"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-3">
                <button
                  type="button"
                  onClick={toggleNavTheme}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-navy transition-colors hover:border-magenta hover:text-magenta"
                  aria-label={darkNav ? t("lightMode") : t("darkMode")}
                >
                  {darkNav ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <div className="flex h-10 items-center rounded-full border border-gray-200 p-1">
                  {[
                    { value: "id", label: "ID" },
                    { value: "en", label: "EN" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLanguage(option.value)}
                      className={`h-8 rounded-full px-3 text-xs font-bold transition-colors ${language === option.value ? "bg-magenta text-white" : "text-navy"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <Link
                  to="/search"
                  onClick={() => setMobileOpen(false)}
                  className="ml-auto flex h-10 items-center gap-2 rounded-full border border-gray-200 px-4 text-xs font-semibold text-navy transition-colors hover:border-magenta hover:text-magenta"
                >
                  <Search className="h-4 w-4" /> {tr("Cari Konten")}
                </Link>
              </div>
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      if (["Layanan", "Paket", "Tentang"].includes(item.label)) {
                        onNavClick(item.href);
                      } else if (item.megaChildren) {
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                      } else {
                        onNavClick(item.href);
                      }
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-navy-400 hover:bg-gray-50 rounded-lg"
                  >
                    {tr(item.label)}
                    {item.megaChildren && !["Layanan", "Paket", "Tentang"].includes(item.label) && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    )}
                  </button>
                  {item.megaChildren && !["Layanan", "Paket", "Tentang"].includes(item.label) && mobileExpanded === item.label && (
                    <div className="pl-4 space-y-3 pt-1 pb-2">
                      {item.megaChildren.map((group, idx) => (
                        <div key={group.group || idx}>
                          {group.group && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-2">{tr(group.group)}</p>}
                          {group.items.map((sub) => (
                            <button
                              key={sub.label}
                              onClick={() => onNavClick(sub.href)}
                              className="block w-full text-left px-3 py-1.5 text-sm text-navy-300 hover:text-magenta hover:bg-magenta-50 rounded-md transition-colors"
                            >
                              {tr(sub.label)}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="https://wa.me/6287772577020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-full font-semibold text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  {tr("Chat WhatsApp")}
                </a>
                <Button
                  onClick={() => onNavClick("#konsultasi")}
                  className="bg-magenta hover:bg-magenta-500 text-white rounded-full py-3 text-sm font-semibold"
                >
                  {tr("Konsultasi Gratis")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
