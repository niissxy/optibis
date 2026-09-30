import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PillarLayout from "@/components/optibis/PillarLayout";
import PillarSplitHero from "@/components/optibis/PillarSplitHero";
import PillarPortfolio from "@/components/optibis/PillarPortfolio";
import SectionHeading from "@/components/optibis/SectionHeading";
import FinalCTA from "@/components/optibis/FinalCTA";
import PageNotFound from "@/lib/PageNotFound";
import { useServicePillars, resolveIcon } from "@/hooks/useServicePillars";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useSafeNav } from "@/hooks/useSafeNav";

export default function DynamicPillar() {
  const { slug } = useParams();
  const location = useLocation();
  const nav = useSafeNav();
  const { pillars, loading } = useServicePillars();

  const currentPath = location.pathname.replace(/^\//, "").replace(/^pilar\//, "");
  const cleanSlug = (slug || "").replace(/^pilar\//, "");

  const pillar = pillars.find((p) => {
    const pSlug = (p.slug || "").toLowerCase();
    const pLink = (p.link || "").replace(/^\//, "").replace(/^pilar\//, "").toLowerCase();
    const targetSlug = cleanSlug.toLowerCase();
    const targetPath = currentPath.toLowerCase();

    return (
      pSlug === targetSlug ||
      pSlug === targetPath ||
      pLink === targetSlug ||
      pLink === targetPath ||
      (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === targetSlug) ||
      (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === targetPath)
    );
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug, location.pathname]);

  if (loading) {
    return (
      <PillarLayout>
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-magenta rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Memuat pilar layanan...</p>
        </div>
      </PillarLayout>
    );
  }

  if (!pillar) {
    return <PageNotFound />;
  }

  const data = pillar.data || {};
  const Icon = pillar.icon;
  const badgeText = data.badge || `${pillar.tag} — ${pillar.title.toUpperCase()}`;
  const titlePrefix = data.title_prefix || `${pillar.title}: `;
  const titleHighlight = data.title_highlight || pillar.headline || pillar.title;
  const description = pillar.desc || data.desc || "";
  const imageSrc = pillar.img || "/assets/paket-digital-asset/siap-usaha.jpg";
  const color = pillar.color || "magenta";

  return (
    <PillarLayout showPageRecommendations={false}>
      {/* Hero Section */}
      <PillarSplitHero
        badgeIcon={Icon}
        badgeText={badgeText}
        titlePrefix={titlePrefix}
        titleHighlight={titleHighlight}
        description={description}
        imageSrc={imageSrc}
        color={color}
        imageContainerClassName="max-w-sm"
      />

      {/* Highlights / Services Grid */}
      {pillar.highlights && pillar.highlights.length > 0 && (
        <section className="py-14 lg:py-20 bg-slate-50/60 border-t border-slate-100" id="layanan">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={pillar.tag}
              title={`Layanan & Solusi ${pillar.title}`}
              description={`Cakupan solusi dan layanan unggulan yang termasuk dalam pilar ${pillar.title}.`}
              className="mb-12"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillar.highlights.map((h, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:border-magenta/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-magenta-50 text-magenta flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-navy mb-2 group-hover:text-magenta transition-colors">
                      {h}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Layanan terintegrasi dan dirancang secara spesifik untuk mendukung efektivitas dan pertumbuhan bisnis Anda.
                    </p>
                  </div>
                  <div
                    onClick={() => nav("#konsultasi")}
                    className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-magenta cursor-pointer group-hover:gap-2 transition-all"
                  >
                    <span>Konsultasikan Kebutuhan</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio of this Pillar */}
      <PillarPortfolio pillar={pillar.title} />

      {/* CTA Section */}
      <FinalCTA />
    </PillarLayout>
  );
}
