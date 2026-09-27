import React from "react";
import PillarLayout from "@/components/optibis/PillarLayout";
import PillarServiceCard from "@/components/optibis/PillarServiceCard";
import { Palette, FileText, Megaphone, Camera, Mail, LayoutDashboard } from "lucide-react";
import { getPackagesByPillar } from "@/data/packages";
import PillarPortfolio from "@/components/optibis/PillarPortfolio";
import PillarPackagesHero from "@/components/optibis/PillarPackagesHero";
import SectionHeading from "@/components/optibis/SectionHeading";
import PillarSplitHero from "@/components/optibis/PillarSplitHero";
export const SERVICES = [
  {
    icon: Palette, name: "Brand Identity", desc: "Identitas visual lengkap untuk bisnis Anda agar tampil konsisten dan profesional.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
    features: ["Logo utama & varian", "Brand guideline (warna, tipografi, layout)", "Icon & elemen visual", "Brand voice & tone", "Mockup aplikasi brand", "Logo animation (opsional)", "File siap cetak & digital (AI, PNG, SVG, PDF)"],
  },
  {
    icon: FileText, name: "Stationery Bisnis", desc: "Dokumen dan materi bisnis yang konsisten dengan identitas brand Anda.",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&h=400&fit=crop",
    features: ["Kartu nama", "Kop surat & amplop", "Invoice & receipt", "ID card karyawan", "Folder & sticker bisnis", "Form & template dokumen", "Sertifikat & letterhead"],
  },
  {
    icon: Megaphone, name: "Marketing & Sales Assets", desc: "Materi promosi dan penjualan yang membantu tim Anda menutup deal lebih cepat.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    features: ["Company profile", "Pitch deck presentasi", "Brosur & flyer", "Katalog produk", "Banner & spanduk", "Proposal template", "Sales one-pager & rate card"],
  },
  {
    icon: Camera, name: "Social Media Assets", desc: "Template dan materi visual untuk semua kebutuhan media sosial Anda.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop",
    features: ["Template feed & carousel", "Template story & highlight", "Cover & thumbnail video", "Twibbon & filter", "Social media kit lengkap", "Caption template per format", "Branded sticker & GIF pack"],
  },
  {
    icon: Mail, name: "Content & Media", desc: "Konten tertulis dan visual yang menarik untuk semua kanal digital.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCZHCxxa39iY-AuHAaAl5mUBm7lSSUZvpCd0ooKCBOCg&s=10",
    features: ["Copywriting profesional", "Artikel & blog post", "Video promosi/profile", "Fotografi produk", "Infografis & ilustrasi", "Voice over & naskah video", "Newsletter & email template"],
  },
  {
    icon: LayoutDashboard, name: "Digital Channel Setup", desc: "Pengaturan akun dan kanal digital bisnis Anda dari nol hingga siap pakai.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    features: ["Email bisnis (custom domain)", "Google Business Profile", "WhatsApp Business setup", "Akun media sosial", "Google Workspace setup", "Domain registration & DNS", "Meta Business Suite configuration"],
  },
];

const PACKAGES = getPackagesByPillar("digital-asset").map((p) => ({
  slug: p.slug, name: p.name, target: p.target, price: p.priceShort || p.price,
  features: p.included.map((i) => i.title), popular: p.popular,
}));

export default function DigitalAsset() {
  return (
    <PillarLayout showPageRecommendations={false}>
      <PillarSplitHero
        badgeIcon={Palette}
        badgeText="PILAR 1 — DIGITAL ASSET"
        titlePrefix="Bangun Citra Bisnis yang "
        titleHighlight="Profesional"
        description="Dari logo, brand guideline, company profile, hingga materi promosi — semua aset yang dibutuhkan bisnis Anda untuk tampil konsisten dan dipercaya."
        imageSrc="/assets/paket-digital-asset/siap-usaha.jpg"
        color="magenta"
        imageContainerClassName="max-w-sm"
      />

      <PillarPackagesHero
        title="Paket Digital Asset"
        description="Pilih paket yang sesuai dengan kebutuhan dan budget bisnis Anda."
        pillarSlug="digital-asset"
        packages={PACKAGES}
        accent="magenta"
      />

      {/* Services */}
      <section className="py-12 lg:py-20 bg-slate-50/50" id="layanan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Digital Asset" title="Layanan Digital Asset" description="Enam layanan utama untuk membangun identitas digital bisnis Anda dari nol." className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => <PillarServiceCard key={s.name} service={s} pillarSlug="digital-asset" index={i} color="magenta" />)}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <PillarPortfolio pillar="Digital Asset" color="magenta" carousel />

    </PillarLayout>
  );
}
