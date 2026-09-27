import React from "react";
import { motion } from "framer-motion";
import { Code2, HeartHandshake, Lightbulb, MapPin, Megaphone, MessageCircle, Palette, Target, Users } from "lucide-react";
import PillarLayout from "@/components/optibis/PillarLayout";
import OptibisPageHero from "@/components/optibis/OptibisPageHero";
import ConsultationForm from "@/components/optibis/ConsultationForm";
import SectionHeading from "@/components/optibis/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";

const VALUES = [
  {
    icon: Target,
    title: "Fokus pada Pertumbuhan",
    desc: "Setiap rekomendasi kami diarahkan pada tujuan bisnis dan hasil yang dapat diukur.",
  },
  {
    icon: Lightbulb,
    title: "Solusi yang Terintegrasi",
    desc: "Branding, website, dan pengelolaan digital dirancang untuk saling memperkuat.",
  },
  {
    icon: HeartHandshake,
    title: "Partner yang Transparan",
    desc: "Proses kerja, timeline, dan deliverables disampaikan dengan jelas sejak awal.",
  },
  {
    icon: Users,
    title: "Memahami Bisnis Anda",
    desc: "Kami memulai dari konteks, tantangan, dan karakter bisnis Anda sebelum menyusun solusi.",
  },
];

const TEAMS = [
  {
    icon: Palette,
    title: "Brand & Creative",
    desc: "Membangun identitas brand, materi promosi, dan komunikasi visual yang konsisten.",
  },
  {
    icon: Code2,
    title: "Website & Technology",
    desc: "Merancang website profesional, mudah dikelola, dan mendukung kebutuhan bisnis.",
  },
  {
    icon: Megaphone,
    title: "Growth & Strategy",
    desc: "Mengelola strategi, konten, SEO, iklan, dan laporan performa secara terarah.",
  },
];

export default function Tentang() {
  const { tr } = useLanguage();

  return (
    <PillarLayout>
      <OptibisPageHero
        eyebrow="Tentang Optibis"
        title="Satu Partner untuk Pertumbuhan Digital Bisnis Anda"
        description="Optibis membantu bisnis tampil lebih profesional, mudah ditemukan, dan bertumbuh secara digital melalui solusi yang terintegrasi dan mudah dipahami."
      />

      <section className="scroll-mt-24 bg-white py-12 lg:py-20" id="tentang-optibis">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionHeading eyebrow="Tentang Kami" title="Membantu Bisnis Tampil Lebih Profesional dan Bertumbuh" description="Optibis adalah digital solution partner yang membantu bisnis dalam tiga area utama: branding melalui Digital Asset, website melalui layanan Website, dan pengelolaan digital bulanan melalui Digital Growth Team." align="left" className="mb-4" />
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">
              {tr("Kami percaya solusi digital yang baik harus mudah dipahami, mudah dikelola, dan relevan dengan tujuan bisnis. Karena itu, kami bekerja sebagai partner yang mendampingi dari perencanaan hingga pertumbuhan.")}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl bg-gradient-to-br from-magenta-50 to-amethyst-50 p-6 sm:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-magenta shadow-sm">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-extrabold text-navy">{tr("Satu Partner, Tiga Pilar")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-300">{tr("Dari membangun identitas hingga mengelola pertumbuhan digital, kebutuhan bisnis Anda ditangani dalam satu ekosistem yang terarah.")}</p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {["Digital Asset", "Website", "Growth Team"].map((item) => (
                <div key={item} className="rounded-xl bg-white/80 px-2 py-3 text-xs font-bold text-navy">{tr(item)}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="scroll-mt-24 bg-slate-50/60 py-12 lg:py-20" id="proses">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Proses Kerja" title="Cara Kami Bekerja" description="Pendekatan yang kolaboratif, transparan, dan berorientasi pada hasil bisnis." className="mb-12" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <motion.article key={value.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-magenta-50 text-magenta"><value.icon className="h-5 w-5" /></div>
                <h3 className="text-sm font-bold text-navy">{tr(value.title)}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tr(value.desc)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 bg-white py-12 lg:py-20" id="tim-kami">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Tim Kami" title="Tim Digital Lengkap untuk Bisnis Anda" description="Keahlian lintas disiplin yang bekerja bersama untuk menghadirkan solusi digital yang konsisten dan terintegrasi." className="mb-12" />

          <div className="grid gap-5 md:grid-cols-3">
            {TEAMS.map((team, index) => (
              <motion.article
                key={team.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-magenta/20 hover:shadow-xl hover:shadow-magenta/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-magenta-50 to-amethyst-50 text-magenta">
                  <team.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-extrabold text-navy">{tr(team.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tr(team.desc)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 bg-slate-50/60 py-12 lg:py-20" id="hubungi-kami">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
            <div className="scroll-mt-24" id="konsultasi-gratis">
              <SectionHeading eyebrow="Hubungi Kami" title="Mari Diskusikan Kebutuhan Bisnis Anda" description="Pilih cara yang paling nyaman untuk terhubung dengan tim Optibis." align="left" />

              <div className="mt-8 grid gap-5">
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  href="https://wa.me/6287772577020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group scroll-mt-24 rounded-2xl border border-green-100 bg-green-50/60 p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                  id="chat-whatsapp"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-navy">{tr("Chat WhatsApp")}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tr("Hubungi konsultan Optibis untuk mendiskusikan kebutuhan bisnis Anda secara langsung.")}</p>
                  <span className="mt-5 inline-flex text-sm font-bold text-green-600 group-hover:underline">+62 877-7257-7020</span>
                </motion.a>

                <motion.article
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24 rounded-2xl border border-magenta/10 bg-gradient-to-br from-magenta-50/70 to-amethyst-50/70 p-6"
                  id="lokasi-kantor"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-magenta text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-navy">{tr("Lokasi Kantor")}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tr("Indonesia - melayani kebutuhan digital bisnis dari berbagai wilayah secara online.")}</p>
                  <span className="mt-5 inline-flex text-sm font-bold text-magenta">Senin-Jumat, 09.00-18.00 WIB</span>
                </motion.article>
              </div>
            </div>

            <ConsultationForm embedded />
          </div>
        </div>
      </section>
    </PillarLayout>
  );
}
