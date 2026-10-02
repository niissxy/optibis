import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Search, MessageCircle, LayoutDashboard, Moon, Sun, Globe2, PackageOpen, LayoutGrid, Code2, Palette, Globe, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeNav } from "@/hooks/useSafeNav";
import { useAuth } from "@/lib/AuthContext";
import MegaMenuDropdown from "@/components/optibis/MegaMenuDropdown";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/LanguageContext";
import { useServicePillars } from "@/hooks/useServicePillars";
import { useServices } from "@/hooks/useServices";

const LAYANAN_CHILDREN = [
  { group: "", items: [
    { label: "Digital Asset", href: "/digital-asset" },
    {
      label: "Website",
      href: "/website",
      subItems: [
        { label: "Landing Page", href: "/layanan/website/landing-page" },
        { label: "Multi Page", href: "/layanan/website/multi-page" },
        { label: "Toko Online", href: "/layanan/website/toko-online" },
      ],
    },
    {
      label: "Software & Sistem Bisnis",
      href: "/layanan",
      subItems: [
        { label: "Web Application", href: "/layanan/software/web-application" },
        { label: "Custom System", href: "/layanan/software/custom-system" },
      ],
    },
    { label: "Digital Growth Team", href: "/digital-growth-team" },
  ]},
];

const PAKET_CHILDREN = [
  { group: "", items: [
    {
      label: "Digital Asset",
      href: "/paket",
      subItems: [
        { label: "Paket Siap Usaha", href: "/paket/digital-asset/siap-usaha" },
        { label: "Paket Citra Usaha", href: "/paket/digital-asset/citra-usaha" },
        { label: "Paket Bisnis Profesional", href: "/paket/digital-asset/bisnis-profesional" },
      ],
    },
    {
      label: "Digital Growth Team",
      href: "/paket",
      subItems: [
        { label: "Admin Digital Starter", href: "/paket/digital-growth-team/growth-starter" },
        { label: "Admin Digital Growth", href: "/paket/digital-growth-team/growth" },
        { label: "Admin Digital Professional", href: "/paket/digital-growth-team/growth-professional" },
      ],
    },
    {
      label: "Paket Khusus",
      href: "/paket",
      subItems: [
        { label: "Paket Custom", href: "/paket/khusus/paket-custom" },
      ],
    },
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
];

const PRODUK_DIGITAL_CHILDREN = [
  { group: "", items: [
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
  { label: "Layanan", href: "/layanan", megaChildren: LAYANAN_CHILDREN, megaWidth: "w-72", footerAction: { label: "Akses Semua Layanan", href: "/layanan" } },
  { label: "Paket", href: "/paket", megaChildren: PAKET_CHILDREN, megaWidth: "w-80", footerAction: { label: "Lihat Semua Paket", href: "/paket" } },
  { label: "Portofolio", href: "/portofolio", megaChildren: PORTOFOLIO_CHILDREN, megaWidth: "w-64" },
  { label: "Konten", href: "/content", megaChildren: KONTEN_CHILDREN, megaWidth: "w-64" },
  { label: "Produk Digital", href: "/insight", megaChildren: PRODUK_DIGITAL_CHILDREN, megaWidth: "w-56" },
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
  const { pillars } = useServicePillars();
  const { getServicesByPillar } = useServices();
  const [mobileSubExpanded, setMobileSubExpanded] = useState(null);
  const darkNav = resolvedTheme === "dark";

  const dynamicLayananChildren = useMemo(() => {
    const basePillars = [
      { slug: "digital-asset", title: "Digital Asset", link: "/digital-asset", icon: Palette },
      { slug: "website", title: "Website", link: "/website", icon: Globe },
      { slug: "software", title: "Software & Sistem Bisnis", link: "/layanan", icon: Code2 },
      { slug: "digital-growth-team", title: "Digital Growth Team", link: "/digital-growth-team", icon: Users },
    ];

    const allPillars = [...basePillars];
    (pillars || []).forEach((p) => {
      const pSlug = (p.slug || "").toLowerCase();
      const existing = allPillars.find((bp) => bp.slug === pSlug);
      if (!existing) {
        allPillars.push({
          slug: p.slug,
          title: p.title,
          link: p.link || `/pilar/${p.slug}`,
          icon: p.icon || Sparkles,
        });
      } else if (p.title) {
        existing.title = p.title;
        if (p.link) existing.link = p.link;
      }
    });

    const items = allPillars.map((p) => {
      const svcs = getServicesByPillar(p.slug);
      return {
        label: p.title,
        href: p.link || `/pilar/${p.slug}`,
        subItems: svcs.map((s) => ({
          label: s.title || s.name,
          href: `/layanan/${p.slug}/${s.slug}`,
        })),
      };
    });

    return [{ group: "", items }];
  }, [pillars, getServicesByPillar]);

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Layanan", href: "/layanan", megaChildren: dynamicLayananChildren, megaWidth: "w-80", footerAction: { label: "Akses Semua Layanan", href: "/layanan" } },
    { label: "Paket", href: "/paket", megaChildren: PAKET_CHILDREN, megaWidth: "w-80", footerAction: { label: "Lihat Semua Paket", href: "/paket" } },
    { label: "Portofolio", href: "/portofolio", megaChildren: PORTOFOLIO_CHILDREN, megaWidth: "w-64" },
    { label: "Konten", href: "/content", megaChildren: KONTEN_CHILDREN, megaWidth: "w-64" },
    { label: "Produk Digital", href: "/insight", megaChildren: PRODUK_DIGITAL_CHILDREN, megaWidth: "w-56" },
    { label: "Karir", href: "/karir", megaChildren: [{ group: "", items: [
      { label: "Full Time", href: "/karir?jenis=fulltime" },
      { label: "PKL / Magang", href: "/karir?jenis=internship" },
    ] }], megaWidth: "w-56", footerAction: { label: "Lihat Semua Karir", href: "/karir" } },
    { label: "Tentang", href: "/tentang", megaChildren: TENTANG_CHILDREN, megaWidth: "w-72" },
  ];

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
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3 lg:h-18 lg:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <img
              src="/assets/optibis-logo-horizontal.png"
              alt="OPTIBIS.ID"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
            {navItems.map((item) => {
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
                    footerAction={item.footerAction}
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
                    className={`group relative flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 xl:px-3 xl:text-sm ${
                      darkNav ? "text-white/75 hover:bg-magenta/20 hover:text-white" : "text-navy-400 hover:bg-magenta-50/50 hover:text-magenta"
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
          <div className="hidden shrink-0 items-center gap-1.5 2xl:flex">
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
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              darkNav ? "text-white hover:bg-white/10" : "text-navy hover:bg-gray-100"
            }`}
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
            className={`lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-t transition-colors ${
              darkNav
                ? "bg-[#081425] border-white/10 text-white"
                : "bg-white border-gray-100 text-navy"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <div className={`mb-3 flex items-center gap-2 border-b pb-3 ${darkNav ? "border-white/10" : "border-gray-100"}`}>
                <button
                  type="button"
                  onClick={toggleNavTheme}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                    darkNav
                      ? "border-white/15 text-white/80 hover:border-magenta hover:text-magenta hover:bg-white/5"
                      : "border-gray-200 text-navy hover:border-magenta hover:text-magenta hover:bg-gray-50"
                  }`}
                  aria-label={darkNav ? t("lightMode") : t("darkMode")}
                >
                  {darkNav ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <div className={`flex h-10 items-center rounded-full border p-1 ${darkNav ? "border-white/15 bg-white/5" : "border-gray-200 bg-gray-50/50"}`}>
                  {[
                    { value: "id", label: "ID" },
                    { value: "en", label: "EN" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLanguage(option.value)}
                      className={`h-8 rounded-full px-3 text-xs font-bold transition-colors ${
                        language === option.value
                          ? "bg-magenta text-white shadow-sm"
                          : darkNav
                          ? "text-white/70 hover:text-white"
                          : "text-navy hover:text-navy-900"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <Link
                  to="/search"
                  onClick={() => setMobileOpen(false)}
                  className={`ml-auto flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-colors ${
                    darkNav
                      ? "border-white/15 text-white/80 hover:border-magenta hover:text-magenta hover:bg-white/5"
                      : "border-gray-200 text-navy hover:border-magenta hover:text-magenta hover:bg-gray-50"
                  }`}
                >
                  <Search className="h-4 w-4" /> {tr("Cari Konten")}
                </Link>
              </div>
              {navItems.map((item) => {
                const isExpanded = item.megaChildren && mobileExpanded === item.label;
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => {
                        if (item.megaChildren) {
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                        } else {
                          onNavClick(item.href);
                        }
                      }}
                      className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        darkNav
                          ? isExpanded
                            ? "bg-white/10 text-white font-semibold shadow-sm"
                            : "text-white/80 hover:bg-white/10 hover:text-white active:bg-white/15"
                          : isExpanded
                            ? "bg-magenta-50 text-magenta font-semibold shadow-sm"
                            : "text-navy-400 hover:bg-gray-50 hover:text-magenta active:bg-gray-100"
                      }`}
                    >
                      <span>{tr(item.label)}</span>
                      {item.megaChildren && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          } ${
                            darkNav
                              ? isExpanded ? "text-white" : "text-white/60"
                              : isExpanded ? "text-magenta" : "text-navy-400"
                          }`}
                        />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="pl-4 space-y-3 pt-1 pb-2">
                        {item.megaChildren.map((group, idx) => (
                          <div key={group.group || idx}>
                            {group.group && (
                              <p className={`text-xs font-semibold uppercase tracking-wider mb-1 px-2 ${
                                darkNav ? "text-white/45" : "text-muted-foreground"
                              }`}>
                                {tr(group.group)}
                              </p>
                            )}
                            {group.items.map((sub) => {
                              const hasSub = Array.isArray(sub.subItems) && sub.subItems.length > 0;
                              const isSubOpen = Boolean(mobileSubExpanded === sub.label);
                              return (
                                <div key={sub.label} className="rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <button
                                      onClick={() => {
                                        if (hasSub) {
                                          setMobileSubExpanded(isSubOpen ? null : sub.label);
                                        } else {
                                          onNavClick(sub.href);
                                        }
                                      }}
                                      className={`flex items-center gap-2.5 flex-1 text-left px-3 py-2 text-sm rounded-md transition-colors ${
                                        darkNav
                                          ? "text-white/80 hover:text-white hover:bg-white/10 active:bg-white/15"
                                          : "text-navy-300 hover:text-magenta hover:bg-magenta-50 active:bg-magenta-100/50"
                                      }`}
                                    >
                                      {sub.icon && item.label !== "Layanan" && (
                                        <sub.icon className={`w-4 h-4 shrink-0 ${darkNav ? "text-white/60" : "text-navy-400"}`} />
                                      )}
                                      <span className="font-medium">{tr(sub.label)}</span>
                                    </button>
                                    {hasSub && (
                                      <button
                                        type="button"
                                        onClick={() => setMobileSubExpanded(isSubOpen ? null : sub.label)}
                                        className={`p-2 transition-colors ${
                                          darkNav ? "text-white/60 hover:text-white" : "text-navy-300 hover:text-magenta"
                                        }`}
                                        aria-label={`Toggle ${sub.label}`}
                                      >
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSubOpen ? "rotate-180" : ""}`} />
                                      </button>
                                    )}
                                  </div>
                                  {hasSub && isSubOpen && (
                                    <div className="ml-4 pl-2.5 my-1 border-l-2 border-magenta/40 space-y-0.5">
                                      {sub.subItems.map((child) => (
                                        <button
                                          key={child.label}
                                          onClick={() => onNavClick(child.href)}
                                          className={`block w-full text-left px-2.5 py-1 text-xs rounded-md transition-colors ${
                                            darkNav
                                              ? "text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10"
                                              : "text-navy-200 hover:text-magenta hover:bg-magenta-50/50 active:bg-magenta-100/40"
                                          }`}
                                        >
                                          {tr(child.label)}
                                        </button>
                                      ))}
                                      {sub.href && (
                                        <button
                                          onClick={() => onNavClick(sub.href)}
                                          className="block w-full text-left px-2.5 py-1 text-[11px] font-semibold text-magenta hover:underline mt-1"
                                        >
                                          {tr(`Semua Layanan ${sub.label}`)} →
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                        {item.footerAction && (
                          <div className="pt-2 px-2">
                            <button
                              onClick={() => onNavClick(item.footerAction.href)}
                              className={`flex items-center justify-between w-full px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                                darkNav
                                  ? "text-magenta bg-magenta/15 hover:bg-magenta/25"
                                  : "text-magenta bg-magenta-50 hover:bg-magenta-100"
                              }`}
                            >
                              <span>{tr(item.footerAction.label)}</span>
                              <span className="text-sm">→</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
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
