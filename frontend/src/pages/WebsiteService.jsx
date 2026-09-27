import React from "react";
import { Globe, Layout, Settings, TrendingUp, Shield, Monitor } from "lucide-react";
import PillarLayout from "@/components/optibis/PillarLayout";
import PillarServiceCard from "@/components/optibis/PillarServiceCard";
import { getPackagesByPillar } from "@/data/packages";
import PillarPortfolio from "@/components/optibis/PillarPortfolio";
import PillarPackagesHero from "@/components/optibis/PillarPackagesHero";
import SectionHeading from "@/components/optibis/SectionHeading";
import PillarSplitHero from "@/components/optibis/PillarSplitHero";
export const SERVICES = [
  {
    icon: Layout, name: "Landing Page", desc: "Halaman fokus untuk promosi, event, campaign, atau lead generation.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    features: ["1 halaman responsif", "Form inquiry & WhatsApp", "Integrasi Google Analytics", "SEO dasar", "Loading cepat (<3s)", "SSL certificate (HTTPS)", "Sosial media integration"],
  },
  {
    icon: Globe, name: "Company Website", desc: "Website company profile, corporate, portfolio, dan layanan profesional.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    features: ["Multi halaman", "CMS sederhana", "Gallery & portfolio", "Blog/artikel", "Form kontak", "Google Maps integration", "Multi-bahasa ready"],
  },
  {
    icon: Settings, name: "Website Growth System", desc: "Website custom dengan CMS, CRM, booking, dan sistem terintegrasi.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    features: ["Custom dashboard admin", "CRM & lead management", "Booking/reservation system", "Multi-user & role", "API integration", "Auto-followup & notification", "Real-time reporting & analytics"],
  },
  {
    icon: TrendingUp, name: "Website Improvement", desc: "Redesign, remake, optimasi kecepatan, SEO, dan konversi website.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    features: ["Audit & analisis website", "Redesign UI/UX", "Optimasi kecepatan", "SEO optimization", "Conversion rate optimization", "Security hardening", "Content migration assistance"],
  },
  {
    icon: Shield, name: "Website Maintenance", desc: "Update berkala, backup, keamanan, dan dukungan teknis website.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    features: ["Update sistem & plugin", "Backup harian/mingguan", "Monitoring keamanan", "Perbaikan bug", "Dukungan teknis prioritas", "Uptime monitoring 24/7", "Monthly performance report"],
  },
  {
    icon: Monitor, name: "Website by Function", desc: "Website sesuai kebutuhan fungsi bisnis: toko online, booking, dll.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    features: ["Toko online/e-commerce", "Booking & reservation", "Membership portal", "Business directory", "Multi-cabang/franchise", "Payment gateway integration", "Learning management system (LMS)"],
  },
];

const PACKAGES = getPackagesByPillar("website").map((p) => ({
  slug: p.slug, name: p.name, target: p.target, price: p.priceShort || p.price,
  features: p.included.map((i) => i.title), popular: p.popular,
}));

export default function WebsiteService() {
  return (
    <PillarLayout showPageRecommendations={false}>
      {/* Hero */}
      <PillarSplitHero
        badgeIcon={Globe}
        badgeText="PILAR 2 — WEBSITE"
        titlePrefix="Kembangkan Bisnis Anda dengan "
        titleHighlight="Website Modern"
        description="Website profesional yang responsif, cepat, dan dioptimasi untuk menghasilkan konversi serta merepresentasikan brand Anda di dunia digital."
        imageSrc="/assets/paket-website/landing-page.png"
        color="amethyst"
        imageContainerClassName="max-w-sm"
      />

      <PillarPackagesHero
        title="Paket Website"
        description="Pilih paket website yang sesuai dengan kebutuhan bisnis Anda."
        pillarSlug="website"
        packages={PACKAGES}
        accent="amethyst"
      />

      {/* Services */}
      <section className="py-12 lg:py-20 bg-slate-50/50" id="layanan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Website Optibis" title="Layanan Website" description="Enam layanan website untuk berbagai kebutuhan bisnis Anda." className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => <PillarServiceCard key={s.name} service={s} pillarSlug="website" index={i} color="amethyst" />)}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <PillarPortfolio pillar="Website" color="amethyst" carousel />

    </PillarLayout>
  );
}
