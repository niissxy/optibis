import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/optibis/SectionHeading";

const FAQS = [
  { q: "Apa itu Optibis?", a: "Optibis adalah digital solution partner yang membantu bisnis dalam tiga area utama: branding melalui Digital Asset, website melalui layanan Website, dan pengelolaan digital bulanan melalui Digital Growth Team." },
  { q: "Layanan apa saja yang tersedia?", a: "Optibis menyediakan layanan pembuatan identitas brand, desain marketing materials, pembuatan website (dari landing page hingga custom system), serta pengelolaan konten, media sosial, SEO, iklan digital, dan reporting bulanan." },
  { q: "Apakah paket dapat disesuaikan?", a: "Ya, semua paket dapat disesuaikan dengan kebutuhan spesifik bisnis Anda. Konsultasikan kebutuhan Anda dan kami akan merancang solusi yang tepat." },
  { q: "Berapa lama pengerjaan?", a: "Waktu pengerjaan bervariasi tergantung layanan. Logo dan branding biasanya 2-4 minggu, website 3-8 minggu, dan Digital Growth Team beroperasi secara bulanan berkelanjutan." },
  { q: "Bagaimana proses revisi?", a: "Setiap paket memiliki kuota revisi yang tercantum. Revisi dilakukan secara terstruktur melalui dashboard klien sehingga prosesnya transparan dan terdokumentasi." },
  { q: "Apakah ada layanan bulanan?", a: "Ya, Digital Growth Team adalah layanan bulanan dimana Optibis menjadi tim digital eksternal Anda — mengelola konten, sosial media, website, SEO, iklan, dan pelaporan performa." },
  { q: "Apakah Optibis bisa menangani bisnis saya?", a: "Optibis melayani berbagai industri mulai dari travel, properti, kesehatan, pendidikan, kuliner, beauty, kontraktor, hingga corporate dan multi-cabang." },
  { q: "Apakah tersedia maintenance?", a: "Ya, kami menyediakan paket maintenance website yang mencakup update sistem, backup, monitoring keamanan, perbaikan bug, dan dukungan teknis." },
  { q: "Bagaimana cara memulai?", a: "Hubungi kami melalui WhatsApp atau isi form konsultasi di website. Tim kami akan menghubungi Anda dalam 1x24 jam untuk menjadwalkan sesi konsultasi gratis." },
  { q: "Bagaimana sistem pembayaran?", a: "Pembayaran dilakukan secara bertahap sesuai milestone project. Untuk layanan bulanan, pembayaran dilakukan di awal setiap bulan." },
];

export default function FAQSection() {
  return (
    <section className="py-14 lg:py-20 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ Optibis" title="Pertanyaan yang Sering Diajukan" className="mb-14" />

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white border border-gray-100 rounded-xl px-6 data-[state=open]:border-magenta/20 data-[state=open]:shadow-lg data-[state=open]:shadow-magenta/5"
            >
              <AccordionTrigger className="text-sm font-semibold text-navy hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
