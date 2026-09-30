import React from "react";
import PillarLayout from "@/components/optibis/PillarLayout";
import ServiceCatalog from "@/components/optibis/ServiceCatalog";
import OptibisPageHero from "@/components/optibis/OptibisPageHero";

export default function Layanan() {
  return (
    <PillarLayout>
      <OptibisPageHero
        eyebrow="Layanan Optibis"
        title="Solusi Digital untuk Setiap Tahap Bisnis"
        description="Dari membangun brand hingga mengelola pertumbuhan digital, pilih layanan yang paling sesuai dengan kebutuhan bisnis Anda."
      />
      <ServiceCatalog />
    </PillarLayout>
  );
}
