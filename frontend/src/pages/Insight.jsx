import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, Video, Wrench, Star, Clock, Layers, Check, MessageCircle, Sparkles, TrendingUp, Download, Target, Palette, Globe, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import { EBOOKS, TRAININGS, CONSULTATIONS, DIGITAL_TOOLS, formatRupiah } from "@/data/insight";
import { useSafeNav } from "@/hooks/useSafeNav";

const CONSULTATION_ICONS = { Target, Palette, Globe, Briefcase };

const TABS = [
  { id: "ebook", label: "Ebook", icon: BookOpen },
  { id: "pelatihan", label: "Pelatihan", icon: GraduationCap },
  { id: "konsultasi", label: "Konsultasi", icon: Video },
  { id: "tool", label: "Tools & Produk", icon: Wrench },
];

export default function Insight() {
  const nav = useSafeNav();
  const [activeTab, setActiveTab] = useState("ebook");

  return (
    <PillarLayout>
      {/* Hero */}
      <section className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-b from-magenta-50/30 to-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-magenta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta-50 text-magenta text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> INSIGHT OPTIBIS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
                Insight & Produk Digital untuk <span className="text-magenta">Mempercepat</span> Bisnis Anda
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Ebook, pelatihan, konsultasi, dan tools digital yang dirancang oleh praktisi Optibis — dipilih berdasarkan pengalaman melayani ratusan klien bisnis.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { icon: BookOpen, label: "6+ Ebook" },
                  { icon: GraduationCap, label: "4 Pelatihan" },
                  { icon: Video, label: "4 Konsultasi" },
                  { icon: Wrench, label: "6 Tools" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-sm text-navy">
                    <s.icon className="w-4 h-4 text-magenta" />
                    {s.label}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=560&fit=crop" alt="Ebook" className="w-full rounded-2xl shadow-xl shadow-navy/10 object-cover h-56 lg:h-64" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop" alt="Pelatihan" className="w-full rounded-2xl shadow-xl shadow-navy/10 object-cover h-36 lg:h-44" loading="lazy" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop" alt="Tool" className="w-full rounded-2xl shadow-xl shadow-navy/10 object-cover h-36 lg:h-44" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=560&fit=crop" alt="Konsultasi" className="w-full rounded-2xl shadow-xl shadow-navy/10 object-cover h-56 lg:h-64" loading="lazy" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 lg:top-18 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-magenta text-white shadow-lg shadow-magenta/20 scale-105"
                    : "bg-gray-50 text-navy-300 hover:bg-magenta-50 hover:text-magenta"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ebook Section */}
          {activeTab === "ebook" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta-50 text-magenta text-xs font-bold mb-3">
                  <BookOpen className="w-3.5 h-3.5" /> EBOOK
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mb-3">Ebook Praktis untuk Bisnis</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Panduan digital yang bisa langsung Anda terapkan untuk bisnis. Format PDF, akses seumur hidup.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {EBOOKS.map((ebook, i) => (
                  <motion.div
                    key={ebook.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img src={ebook.cover} alt={ebook.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {ebook.badge && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-magenta text-white text-xs font-bold">{ebook.badge}</span>
                      )}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white/90 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {ebook.pages} halaman
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-navy mb-1 leading-tight">{ebook.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">oleh {ebook.author}</p>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{ebook.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-extrabold text-navy">{formatRupiah(ebook.price)}</div>
                        <Button className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-5 h-9 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group">
                          <Download className="w-4 h-4 mr-1" /> Beli
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Training Section */}
          {activeTab === "pelatihan" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amethyst-50 text-amethyst text-xs font-bold mb-3">
                  <GraduationCap className="w-3.5 h-3.5" /> PELATIHAN
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mb-3">Pelatihan Berbayar</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Workshop dan bootcamp interaktif bersama praktisi Optibis. Sertifikat penyelesaian disertakan.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {TRAININGS.map((training, i) => (
                  <motion.div
                    key={training.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="grid sm:grid-cols-2">
                      <div className="relative h-48 sm:h-full overflow-hidden">
                        <img src={training.image} alt={training.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-navy text-xs font-bold">{training.level}</span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-bold text-navy mb-2 leading-tight">{training.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{training.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="flex items-center gap-1 text-xs text-navy-300 bg-gray-50 px-2.5 py-1 rounded-full"><Clock className="w-3 h-3" /> {training.duration}</span>
                          <span className="flex items-center gap-1 text-xs text-navy-300 bg-gray-50 px-2.5 py-1 rounded-full"><Layers className="w-3 h-3" /> {training.modules} modul</span>
                        </div>
                        <ul className="space-y-1.5 mb-4">
                          {training.topics.map((t) => (
                            <li key={t} className="flex items-start gap-1.5 text-xs text-navy-300">
                              <Check className="w-3.5 h-3.5 text-amethyst shrink-0 mt-0.5" /> {t}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-extrabold text-navy">{formatRupiah(training.price)}</div>
                          <Button className="bg-amethyst hover:bg-amethyst-600 text-white rounded-full px-5 h-9 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
                            Daftar <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Consultation Section */}
          {activeTab === "konsultasi" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-navy-50 text-navy text-xs font-bold mb-3">
                  <Video className="w-3.5 h-3.5" /> KONSULTASI
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mb-3">Konsultasi Berbayar 1-on-1</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Sesi langsung dengan ahli Optibis. Dapatkan rekomendasi konkret dan roadmap untuk bisnis Anda.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CONSULTATIONS.map((cons, i) => {
                  const IconComp = CONSULTATION_ICONS[cons.icon] || Target;
                  return (
                    <motion.div
                      key={cons.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 flex flex-col"
                    >
                      <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-navy mb-2 leading-tight">{cons.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{cons.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="flex items-center gap-1 text-xs text-navy-300 bg-gray-50 px-2.5 py-1 rounded-full"><Clock className="w-3 h-3" /> {cons.duration}</span>
                      </div>
                      <div className="text-xs text-navy-300 mb-3">{cons.format}</div>
                      <ul className="space-y-1.5 mb-4">
                        {cons.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-1.5 text-xs text-navy-300">
                            <Check className="w-3.5 h-3.5 text-magenta shrink-0 mt-0.5" /> {inc}
                          </li>
                        ))}
                      </ul>
                      <div className="text-xl font-extrabold text-navy mb-3">{formatRupiah(cons.price)}</div>
                      <Button className="w-full bg-navy hover:bg-navy-400 text-white rounded-full h-9 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95">
                        Booking Sesi <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Digital Tools Section */}
          {activeTab === "tool" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold mb-3">
                  <Wrench className="w-3.5 h-3.5" /> TOOLS & PRODUK DIGITAL
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mb-3">Tools & Produk Digital</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Template, checklist, dan tool digital siap pakai untuk menghemat waktu dan tenaga tim Anda.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DIGITAL_TOOLS.map((tool, i) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={tool.image} alt={tool.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-navy text-xs font-bold">{tool.category}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-navy mb-1 leading-tight">{tool.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">Format: {tool.format}</p>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tool.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-extrabold text-navy">{formatRupiah(tool.price)}</div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5 h-9 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
                          <Download className="w-4 h-4 mr-1" /> Beli
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Insight Optibis */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mb-3">Kenapa Beli dari Insight Optibis?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Produk digital kami dibuat berdasarkan pengalaman melayani ratusan klien bisnis dari berbagai industri.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Star, title: "Berbasis Pengalaman", desc: "Dibuat dari praktik nyata, bukan teori semata." },
              { icon: TrendingUp, title: "Hasil Terukur", desc: "Setiap produk dirancang untuk dampak bisnis nyata." },
              { icon: Clock, title: "Akses Seumur Hidup", desc: "Beli sekali, akses kapan saja selamanya." },
              { icon: MessageCircle, title: "Dukungan Tim", desc: "Ada pertanyaan? Tim kami siap membantu." },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-magenta-50 text-magenta flex items-center justify-center mb-3">
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-navy mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-navy via-navy-400 to-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(233,30,99,0.15),transparent_60%)]" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-magenta/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-amethyst/10 rounded-full blur-3xl"
        />
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">Butuh Solusi Lebih Lengkap?</h2>
          <p className="text-white/70 mb-8">Selain produk digital, Optibis menyediakan layanan branding, website, dan digital growth team untuk bisnis Anda.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button onClick={() => nav("/")} className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 shadow-xl shadow-magenta/30 w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 group">
              Lihat Semua Layanan <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <a
              href="https://wa.me/6287772577020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" /> Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PillarLayout>
  );
}
