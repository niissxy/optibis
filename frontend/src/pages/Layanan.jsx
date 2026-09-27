import React from "react";
import PillarLayout from "@/components/optibis/PillarLayout";
import ServiceCatalog from "@/components/optibis/ServiceCatalog";
import OptibisPageHero from "@/components/optibis/OptibisPageHero";
import PageDirectorySection from "@/components/optibis/PageDirectorySection";
import { Award, CalendarDays, Globe, Palette, Rocket, Target, Users } from "lucide-react";

const SERVICE_GROUPS = [
  {
    title: "Pilar Layanan",
    items: [
      { label: "Digital Asset", href: "/digital-asset", icon: Palette },
      { label: "Website", href: "/website", icon: Globe },
      { label: "Digital Growth Team", href: "/digital-growth-team", icon: Users },
    ],
  },
  {
    title: "Berdasarkan Kebutuhan",
    items: [
      { label: "Memulai Bisnis", href: "/paket/digital-asset/siap-usaha", icon: Rocket },
      { label: "Meningkatkan Citra Bisnis", href: "/digital-asset", icon: Award },
      { label: "Membuat Website", href: "/website", icon: Globe },
      { label: "Mendapatkan Leads", href: "/digital-growth-team", icon: Target },
      { label: "Mengelola Digital Bulanan", href: "/digital-growth-team", icon: CalendarDays },
    ],
  },
];

export default function Layanan() {
  return (
    <PillarLayout>
      <OptibisPageHero
        eyebrow="Layanan Optibis"
        title="Solusi Digital untuk Setiap Tahap Bisnis"
        description="Dari membangun brand hingga mengelola pertumbuhan digital, pilih layanan yang paling sesuai dengan kebutuhan bisnis Anda."
      />
      <PageDirectorySection
        eyebrow="Jelajahi Layanan"
        title="Pilih Jalur Layanan yang Tepat"
        description="Mulai berdasarkan pilar keahlian atau kebutuhan utama bisnis Anda saat ini."
        groups={SERVICE_GROUPS}
        columnsClass="lg:grid-cols-2"
      />
      <ServiceCatalog />
    </PillarLayout>
  );
}
