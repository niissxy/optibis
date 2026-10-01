import React from "react";
import SEO from "@/components/SEO";
import PillarLayout from "@/components/optibis/PillarLayout";
import PortfolioGallery from "@/components/optibis/PortfolioGallery";
import { getBreadcrumbSchema } from "@/lib/seoData";

export default function PortofolioPage() {
  const structuredData = [
    getBreadcrumbSchema([
      { name: "Beranda", url: "/" },
      { name: "Portofolio", url: "/portofolio" },
    ]),
  ];

  return (
    <PillarLayout>
      <SEO
        title="Portofolio & Studi Kasus Proyek Digital"
        description="Lihat hasil karya dan studi kasus nyata klien Optibis dalam pembuatan website, desain branding logo, sistem aplikasi, dan strategi pertumbuhan digital."
        keywords="portofolio optibis, contoh website perusahaan, portofolio desain logo branding, studi kasus digital marketing indonesia, hasil kerja agensi website"
        canonicalUrl="https://optibis.id/portofolio"
        structuredData={structuredData}
      />
      <PortfolioGallery />
    </PillarLayout>
  );
}
