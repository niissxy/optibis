import React from "react";
import PillarLayout from "@/components/optibis/PillarLayout";
import PackagesSection from "@/components/optibis/PackagesSection";
import OptibisPageHero from "@/components/optibis/OptibisPageHero";
import { Globe } from "lucide-react";

export default function Paket() {
  return (
    <PillarLayout>
      <OptibisPageHero
        eyebrow="Paket Optibis"
        title="Paket Digital yang Siap Disesuaikan"
        description="Pilih paket sesuai kebutuhan dan budget bisnis Anda. Semua paket dapat disesuaikan bersama tim Optibis."
      />
      <PackagesSection />
    </PillarLayout>
  );
}
