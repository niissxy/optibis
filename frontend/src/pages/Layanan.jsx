import React from "react";
import SEO from "@/components/SEO";
import PillarLayout from "@/components/optibis/PillarLayout";
import ServiceCatalog from "@/components/optibis/ServiceCatalog";
import OptibisPageHero from "@/components/optibis/OptibisPageHero";
import { getBreadcrumbSchema } from "@/lib/seoData";

export default function Layanan() {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Layanan", url: "/layanan" },
  ]);

  return (
    <PillarLayout>
      <SEO
        title="Layanan & Solusi Digital Bisnis"
        description="Jelajahi katalog layanan lengkap Optibis: Digital Asset (Branding & Logo), Website Development profesional, dan Digital Growth Team untuk akselerasi bisnis Anda."
        keywords="layanan optibis, jasa branding bisnis, jasa pembuatan website, digital growth team, jasa seo jakarta, social media management, jasa kelola digital"
        canonicalUrl="https://optibis.id/layanan"
        structuredData={breadcrumb}
      />
      <OptibisPageHero
        eyebrow="Layanan Optibis"
        title="Solusi Digital untuk Setiap Tahap Bisnis"
        description="Dari membangun brand hingga mengelola pertumbuhan digital, pilih layanan yang paling sesuai dengan kebutuhan bisnis Anda."
      />
      <ServiceCatalog />
    </PillarLayout>
  );
}
