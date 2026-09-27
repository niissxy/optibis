import React from "react";
import PillarLayout from "@/components/optibis/PillarLayout";
import PackagesSection from "@/components/optibis/PackagesSection";
import OptibisPageHero from "@/components/optibis/OptibisPageHero";
import PageDirectorySection from "@/components/optibis/PageDirectorySection";
import { Globe, Palette, TrendingUp } from "lucide-react";

const PACKAGE_GROUPS = [
  {
    title: "Digital Asset",
    items: [
      { label: "Paket Siap Usaha", href: "/paket/digital-asset/siap-usaha", icon: Palette },
      { label: "Paket Citra Usaha", href: "/paket/digital-asset/citra-usaha", icon: Palette },
      { label: "Paket Bisnis Profesional", href: "/paket/digital-asset/bisnis-profesional", icon: Palette },
    ],
  },
  {
    title: "Website",
    items: [
      { label: "Landing Page", href: "/paket/website/landing-page", icon: Globe },
      { label: "Multi Page", href: "/paket/website/multi-page", icon: Globe },
      { label: "Toko Online", href: "/paket/website/toko-online", icon: Globe },
    ],
  },
  {
    title: "Digital Growth Team",
    items: [
      { label: "Admin Digital", href: "/paket/digital-growth-team/growth", icon: TrendingUp },
    ],
  },
];

export default function Paket() {
  return (
    <PillarLayout>
      <OptibisPageHero
        eyebrow="Paket Optibis"
        title="Paket Digital yang Siap Disesuaikan"
        description="Pilih paket sesuai kebutuhan dan budget bisnis Anda. Semua paket dapat disesuaikan bersama tim Optibis."
      />
      <PageDirectorySection
        eyebrow="Semua Paket"
        title="Temukan Paket Sesuai Kebutuhan Bisnis"
        description="Bandingkan paket dari tiga pilar Optibis dan buka detail paket yang ingin Anda pelajari."
        groups={PACKAGE_GROUPS}
      />
      <PackagesSection />
    </PillarLayout>
  );
}
