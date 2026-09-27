import React from "react";
import { Users, ClipboardList, Camera, Search, BarChart3, Globe } from "lucide-react";
import PillarLayout from "@/components/optibis/PillarLayout";
import PillarServiceCard from "@/components/optibis/PillarServiceCard";
import { getPackagesByPillar } from "@/data/packages";
import PillarPortfolio from "@/components/optibis/PillarPortfolio";
import PillarPackagesHero from "@/components/optibis/PillarPackagesHero";
import SectionHeading from "@/components/optibis/SectionHeading";
import PillarSplitHero from "@/components/optibis/PillarSplitHero";
export const SERVICES = [
  {
    icon: ClipboardList, name: "Strategi & Planning", desc: "Digital audit, riset kompetitor, content strategy, dan monthly roadmap.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    features: ["Digital audit menyeluruh", "Riset kompetitor & industri", "Content strategy & calendar", "Monthly roadmap", "KPI & target bulanan", "Audience persona mapping", "SWOT analysis digital"],
  },
  {
    icon: Camera, name: "Content Management", desc: "Kalender konten, desain, copywriting, reels, artikel, dan publishing.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS79cQFZbP44UJIrC_zpi64HcVvligl9kWNrapi64XuQw&s=10",
    features: ["12-40 konten/bulan", "Desain feed & carousel", "Copywriting profesional", "Video reels & shorts", "Artikel blog & SEO", "Infografis & carousel storytelling", "Thumbnail & cover design"],
  },
  {
    icon: Users, name: "Social Media Management", desc: "Posting, scheduling, monitoring, dan reporting media sosial.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop",
    features: ["Content scheduling", "Community management", "Reply & engagement", "Cross-platform posting", "Monthly social report", "Crisis response protocol", "Influencer & KOL coordination"],
  },
  {
    icon: Globe, name: "Website Management", desc: "Update konten, maintenance, blog, dan monitoring performa website.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    features: ["Update konten berkala", "Maintenance & backup", "Blog & artikel posting", "Performance monitoring", "Security updates", "Speed optimization", "Landing page creation"],
  },
  {
    icon: Search, name: "SEO & Visibility", desc: "SEO on-page, local SEO, Google Business, dan monitoring keyword.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    features: ["SEO on-page optimization", "Local SEO & Google Business", "Keyword monitoring", "Backlink strategy", "Monthly SEO report", "Technical SEO audit", "Competitor rank tracking"],
  },
  {
    icon: BarChart3, name: "Digital Advertising", desc: "Meta Ads, Google Ads, TikTok Ads, creative, dan campaign reporting.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    features: ["Meta Ads management", "Google Ads management", "TikTok Ads management", "Creative & copy ads", "Campaign reporting", "A/B testing & optimization", "Retargeting & remarketing setup"],
  },
];

const PACKAGES = getPackagesByPillar("digital-growth-team").map((p) => ({
  slug: p.slug, name: p.name, target: p.target, price: p.priceShort || p.price,
  features: p.included.map((i) => i.title), popular: p.popular,
}));

export default function DigitalGrowthTeam() {
  return (
    <PillarLayout showPageRecommendations={false}>
      {/* Hero */}
      <PillarSplitHero
        badgeIcon={Users}
        badgeText="PILAR 3 — DIGITAL GROWTH TEAM"
        titlePrefix="Tingkatkan Pertumbuhan Bisnis dengan "
        titleHighlight="Tim Digital Ahli"
        description="Layanan pengelolaan digital secara komprehensif mulai dari social media, SEO, hingga iklan berbayar untuk memastikan bisnis Anda terus berkembang."
        imageSrc="/assets/paket-growth/admin-digital.png"
        color="navy"
        imageContainerClassName="max-w-sm"
      />

      <PillarPackagesHero
        title="Paket Bulanan"
        description="Pilih paket bulanan yang sesuai dengan kebutuhan dan budget bisnis Anda."
        pillarSlug="digital-growth-team"
        packages={PACKAGES}
        accent="magenta"
      />

      {/* Services */}
      <section className="py-12 lg:py-20 bg-slate-50/50" id="layanan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Digital Growth Team" title="Layanan Digital Growth Team" description="Enam layanan utama yang dikelola secara berkelanjutan setiap bulan." className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => <PillarServiceCard key={s.name} service={s} pillarSlug="digital-growth-team" index={i} color="navy" />)}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <PillarPortfolio pillar="Digital Growth Team" color="navy" />

    </PillarLayout>
  );
}
