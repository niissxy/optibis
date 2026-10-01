import React from "react";
import SEO from "@/components/SEO";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seoData";
import SiteHeader from "@/components/optibis/SiteHeader";
import HeroSection from "@/components/optibis/HeroSection";
import TrustBar from "@/components/optibis/TrustBar";
import ThreePillars from "@/components/optibis/ThreePillars";
import ServiceCatalog from "@/components/optibis/ServiceCatalog";
import TotalSolution from "@/components/optibis/TotalSolution";
import PackagesSection from "@/components/optibis/PackagesSection";
import IndustriesSection from "@/components/optibis/IndustriesSection";
import PortfolioSection from "@/components/optibis/PortfolioSection";
import WebsiteShowcase from "@/components/optibis/WebsiteShowcase";
import GrowthTeamHighlight from "@/components/optibis/GrowthTeamHighlight";
import TestimonialsSection from "@/components/optibis/TestimonialsSection";
import ProcessTimeline from "@/components/optibis/ProcessTimeline";
import LeadMagnetSection from "@/components/optibis/LeadMagnetSection";
import FAQConsultation from "@/components/optibis/FAQConsultation";
import FinalCTA from "@/components/optibis/FinalCTA";
import SiteFooter from "@/components/optibis/SiteFooter";
import FloatingWhatsApp from "@/components/optibis/FloatingWhatsApp";

export default function Home() {
  const structuredData = [
    getOrganizationSchema(),
    getWebSiteSchema(),
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="OPTIBIS.ID — Satu Partner untuk Branding, Website, dan Pertumbuhan Digital Bisnis Anda"
        description="Optibis membantu bisnis tampil lebih profesional, mudah ditemukan di Google, dan bertumbuh secara digital melalui solusi branding, website modern, dan digital growth team terintegrasi."
        keywords="jasa pembuatan website, branding bisnis, digital marketing agency indonesia, kelola sosial media, logo design, landing page murah profesional, digital asset, growth team bisnis, konsultan digital umkm, optibis"
        structuredData={structuredData}
      />
      <SiteHeader />
      <HeroSection />
      <TrustBar />
      <ServiceCatalog />
      <ThreePillars />
      <TotalSolution />
      <PackagesSection />
      <IndustriesSection />
      <ProcessTimeline />
      <PortfolioSection />
      <WebsiteShowcase />
      <GrowthTeamHighlight />
      <TestimonialsSection />
      <LeadMagnetSection />
      <FAQConsultation />
      <FinalCTA />
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}