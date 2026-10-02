import React from "react";
import { Globe, Monitor, FileText, ShoppingCart } from "lucide-react";
import PillarLayout from "@/components/optibis/PillarLayout";
import PillarServiceCard from "@/components/optibis/PillarServiceCard";
import PillarPortfolio from "@/components/optibis/PillarPortfolio";
import SectionHeading from "@/components/optibis/SectionHeading";
import PillarSplitHero from "@/components/optibis/PillarSplitHero";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema, getServiceSchema } from "@/lib/seoData";
import { useServices } from "@/hooks/useServices";

export const SERVICES = [
  {
    slug: "landing-page",
    icon: Monitor,
    name: "Landing Page",
    desc: "Satu halaman landing page yang fokus konversi — cepat, responsif, dan dioptimasi untuk promosi, event, atau lead generation.",
    image: "/assets/paket-website/landing-page.png",
    features: [
      "Website live (1 halaman landing page)",
      "Akses hosting & domain .com (1 tahun)",
      "Form inquiry terintegrasi email + database",
      "Google Analytics & Search Console terpasang",
      "Panduan update konten dasar",
      "Sertifikat SSL (HTTPS) terpasang",
      "Mobile responsive & loading cepat (<3s)",
    ],
  },
  {
    slug: "multi-page",
    icon: FileText,
    name: "Multi Page",
    desc: "Website company profile multi-halaman dengan CMS sederhana — bisnis Anda tampil profesional dan mudah diperbarui, lengkap dengan gallery, portfolio, dan form kontak.",
    image: "/assets/paket-website/multi-page.png",
    features: [
      "Website live (5–8 halaman)",
      "Akses CMS admin dashboard",
      "Gallery & portfolio terintegrasi dengan filter",
      "Blog/artikel system dengan CMS",
      "Google Analytics & Search Console terintegrasi",
      "Sertifikat SSL (HTTPS) terpasang",
      "Dokumentasi & training CMS",
      "Maintenance 3 bulan",
    ],
  },
  {
    slug: "toko-online",
    icon: ShoppingCart,
    name: "Toko Online",
    desc: "Website custom dengan dashboard admin, CRM ringan, lead management, dan booking system — bukan sekadar website, tapi sistem yang bekerja untuk bisnis Anda.",
    image: "/assets/paket-website/toko-online.png",
    features: [
      "Website + sistem custom live",
      "Dashboard admin lengkap dengan role management",
      "CRM & lead management system",
      "Booking/reservation system dengan kalender",
      "Reporting & analytics dashboard",
      "API documentation & user manual",
      "Training tim (2 sesi)",
    ],
  },
];

export default function WebsiteService() {
  const { getServicesByPillar } = useServices();
  const dynamicServices = getServicesByPillar("website");
  const displayServices = dynamicServices.length > 0 ? dynamicServices : SERVICES;

  const [hero, setHero] = React.useState({
    badgeText: "PILAR 2 — WEBSITE",
    titlePrefix: "Kembangkan Bisnis Anda dengan ",
    titleHighlight: "Website Modern",
    description: "Website profesional yang responsif, cepat, dan dioptimasi untuk menghasilkan konversi serta merepresentasikan brand Anda di dunia digital.",
    imageSrc: "/assets/paket-website/landing-page.png",
    color: "amethyst",
  });

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/modules/service-pillars`)
      .then((res) => (res.ok ? res.json() : []))
      .then((items) => {
        const item = Array.isArray(items) && items.find((i) => i.slug === 'website');
        if (item) {
          const d = item.data || {};
          setHero({
            badgeText: d.badge || "PILAR 2 — WEBSITE",
            titlePrefix: d.title_prefix || "Kembangkan Bisnis Anda dengan ",
            titleHighlight: d.title_highlight || "Website Modern",
            description: item.summary || d.desc || "Website profesional yang responsif, cepat, dan dioptimasi untuk menghasilkan konversi serta merepresentasikan brand Anda di dunia digital.",
            imageSrc: item.image_url || d.flyer_image || "/assets/paket-website/landing-page.png",
            color: d.color || "amethyst",
          });
        }
      })
      .catch(() => {});
  }, []);

  const structuredData = [
    getBreadcrumbSchema([
      { name: "Beranda", url: "/" },
      { name: "Website", url: "/website" },
    ]),
    getServiceSchema({
      name: "Jasa Pembuatan Website Profesional",
      description: "Layanan pembuatan website modern: Landing Page, Multi Page, dan Toko Online dengan performa tinggi dan ramah SEO.",
      url: "/website",
      serviceType: "Web Development",
    }),
  ];

  return (
    <PillarLayout showPageRecommendations={false}>
      <SEO
        title="Jasa Pembuatan Website Profesional & Toko Online Cepat"
        description="Solusi pembuatan website modern: Landing Page, Multi Page, dan Toko Online yang responsif, cepat, dan ramah SEO."
        keywords="jasa pembuatan website profesional, jasa bikin website jakarta, landing page murah berkualitas, company profile multi page, pembuatan toko online ecommerce, website company profile"
        canonicalUrl="https://optibis.id/website"
        structuredData={structuredData}
      />
      {/* Hero */}
      <PillarSplitHero
        badgeIcon={Globe}
        badgeText={hero.badgeText}
        titlePrefix={hero.titlePrefix}
        titleHighlight={hero.titleHighlight}
        description={hero.description}
        imageSrc={hero.imageSrc}
        color={hero.color}
        imageContainerClassName="max-w-sm"
      />

      {/* Services */}
      <section className="py-12 lg:py-20 bg-slate-50/50" id="layanan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Website Optibis" title="Layanan Website" description="Pilihan layanan website untuk berbagai kebutuhan bisnis Anda." className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((s, i) => <PillarServiceCard key={s.slug || s.name} service={s} pillarSlug="website" index={i} color="amethyst" />)}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <PillarPortfolio pillar="Website" color="amethyst" carousel />

    </PillarLayout>
  );
}
