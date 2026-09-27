import React from "react";
import SiteHeader from "@/components/optibis/SiteHeader";
import SiteFooter from "@/components/optibis/SiteFooter";
import FloatingWhatsApp from "@/components/optibis/FloatingWhatsApp";
import PageRecommendations from "@/components/optibis/PageRecommendations";

export default function PillarLayout({ children, showPageRecommendations = true }) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-16 lg:pt-18">
        {children}
        {showPageRecommendations && <PageRecommendations />}
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
