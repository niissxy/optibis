import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Clock, Wallet, Star, Layers, ChevronRight, Lightbulb, Code, ListChecks, GitBranch, Boxes, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import LibraryCard from "@/components/solution-library/LibraryCard";
import { SOLUTION_ITEMS } from "@/data/solutionLibrary";
import { useSafeNav } from "@/hooks/useSafeNav";

const LEVEL_LABEL = { basic: "Basic", intermediate: "Intermediate", advanced: "Advanced", enterprise: "Enterprise" };
const LEVEL_COLOR = {
  basic: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-orange-100 text-orange-700",
  enterprise: "bg-purple-100 text-purple-700",
};

export default function SolutionLibraryDetail() {
  const { slug } = useParams();
  const nav = useSafeNav();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const item = useMemo(() => SOLUTION_ITEMS.find((it) => it.slug === slug), [slug]);

  if (!item) {
    return (
      <PillarLayout>
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-extrabold text-navy mb-4">Istilah tidak ditemukan</h1>
          <p className="text-muted-foreground mb-6">Istilah yang Anda cari tidak tersedia di library.</p>
          <Button onClick={() => nav("/solution-library")} className="bg-magenta hover:bg-magenta-500 text-white rounded-full">
            Kembali ke Library
          </Button>
        </div>
      </PillarLayout>
    );
  }

  const related = SOLUTION_ITEMS
    .filter((it) => it.slug !== item.slug && (it.kategori === item.kategori || (item.fitur_terkait || []).includes(it.nama_teknis)))
    .slice(0, 3);

  const handleCardClick = (rel) => nav(`/solution-library/${rel.slug}`);

  const DetailRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide sm:w-40 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-navy leading-relaxed">{value}</span>
    </div>
  );

  const Section = ({ icon: Icon, title, children, bg = "bg-white" }) => (
    <section className={`py-12 lg:py-16 ${bg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-magenta/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-magenta" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );

  const FlowDiagram = ({ steps, color = "magenta" }) => {
    const colorMap = {
      magenta: { line: "bg-magenta/30", dot: "bg-magenta text-white", text: "text-navy" },
      navy: { line: "bg-navy/30", dot: "bg-navy text-white", text: "text-navy" },
    };
    const c = colorMap[color] || colorMap.magenta;
    return (
      <div className="flex flex-col items-center gap-0 py-4">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`px-5 py-2.5 rounded-xl ${c.dot} text-sm font-medium shadow-sm`}
            >
              {step}
            </motion.div>
            {i < steps.length - 1 && (
              <div className={`w-0.5 h-8 ${c.line}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <PillarLayout>
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-navy transition-colors">Beranda</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/solution-library" className="hover:text-navy transition-colors">Solution Library</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium truncate">{item.nama_awam}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/solution-library" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Library
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-magenta/10 text-magenta text-xs font-bold uppercase tracking-wide">{item.kategori}</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${LEVEL_COLOR[item.level]}`}>{LEVEL_LABEL[item.level]}</span>
              <span className="px-2.5 py-1 rounded-full bg-navy/10 text-navy text-xs font-medium uppercase">{item.jenis}</span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">{item.nama_awam}</h1>
              <p className="text-lg text-muted-foreground mt-1">{item.nama_teknis}</p>
            </div>
            <p className="text-base text-navy-400 leading-relaxed max-w-2xl">{item.fungsi}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-navy">
                <Star className="w-4 h-4 text-amber-400" />
                <span>{"★".repeat(item.tingkat_kesulitan || 3)}{"☆".repeat(5 - (item.tingkat_kesulitan || 3))}</span>
                <span className="text-muted-foreground">Tingkat Kesulitan</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-navy">
                <Clock className="w-4 h-4 text-magenta" /> {item.estimasi_development}
              </div>
              <div className="flex items-center gap-2 text-sm text-navy">
                <Wallet className="w-4 h-4 text-magenta" /> {item.estimasi_biaya}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detail Table */}
      <Section icon={Layers} title="Detail Fitur" bg="bg-slate-50/50">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
          <DetailRow label="Nama Awam" value={item.nama_awam} />
          <DetailRow label="Nama Teknis" value={item.nama_teknis} />
          <DetailRow label="Kategori" value={`${item.kategori} → ${item.subkategori || "-"}`} />
          <DetailRow label="Level" value={LEVEL_LABEL[item.level]} />
          <DetailRow label="Jenis" value={item.jenis} />
          <DetailRow label="Fungsi" value={item.fungsi} />
          <DetailRow label="Tujuan Bisnis" value={item.tujuan_bisnis} />
          <DetailRow label="Cara Kerja" value={item.cara_kerja} />
          <DetailRow label="Input" value={item.input} />
          <DetailRow label="Output" value={item.output} />
          <DetailRow label="Komponen" value={(item.komponen || []).join(", ")} />
          <DetailRow label="Digunakan Pada" value={(item.digunakan_pada || []).join(", ")} />
          <DetailRow label="Integrasi" value={(item.integrasi || []).join(", ")} />
          <DetailRow label="Tingkat Kesulitan" value={"★".repeat(item.tingkat_kesulitan || 3) + "☆".repeat(5 - (item.tingkat_kesulitan || 3))} />
          <DetailRow label="Estimasi Dev" value={item.estimasi_development} />
          <DetailRow label="Estimasi Biaya" value={item.estimasi_biaya} />
          <DetailRow label="Contoh Platform" value={(item.contoh || []).join(", ")} />
          <DetailRow label="Fitur Terkait" value={(item.fitur_terkait || []).join(", ")} />
        </div>
      </Section>

      {/* Diagram */}
      {item.diagram && item.diagram.length > 0 && (
        <Section icon={GitBranch} title="Diagram Alur Sistem" bg="bg-white">
          <FlowDiagram steps={item.diagram} color="magenta" />
        </Section>
      )}

      {/* Business Flow */}
      {item.business_flow && item.business_flow.length > 0 && (
        <Section icon={ListChecks} title="Business Flow" bg="bg-slate-50/50">
          <FlowDiagram steps={item.business_flow} color="navy" />
        </Section>
      )}

      {/* Penjelasan Awam */}
      <Section icon={Lightbulb} title="Penjelasan Bahasa Awam" bg="bg-white">
        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6">
          <p className="text-base text-navy leading-relaxed">{item.penjelasan_awam}</p>
        </div>
      </Section>

      {/* Penjelasan Teknis */}
      <Section icon={Code} title="Penjelasan Teknis" bg="bg-slate-50/50">
        <div className="bg-navy/5 border border-navy/10 rounded-2xl p-6">
          <p className="text-sm text-navy leading-relaxed">{item.penjelasan_teknis}</p>
        </div>
      </Section>

      {/* Manfaat */}
      {item.manfaat && item.manfaat.length > 0 && (
        <Section icon={CheckCircle2} title="Manfaat" bg="bg-white">
          <div className="grid sm:grid-cols-2 gap-3">
            {item.manfaat.map((m, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-green-50/50 rounded-xl p-3 border border-green-100">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span className="text-sm text-navy font-medium">{m}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Contoh Nyata */}
      {item.contoh_nyata && item.contoh_nyata.length > 0 && (
        <Section icon={Star} title="Contoh Nyata" bg="bg-slate-50/50">
          <div className="flex flex-wrap gap-2">
            {item.contoh_nyata.map((ex, i) => (
              <span key={i} className="px-4 py-2 bg-white rounded-xl border border-gray-100 text-sm font-medium text-navy shadow-sm">
                {ex}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Ketergantungan */}
      {item.ketergantungan && item.ketergantungan.length > 0 && (
        <Section icon={Link2} title="Ketergantungan" bg="bg-white">
          <div className="flex flex-wrap gap-2">
            {item.ketergantungan.map((dep, i) => (
              <span key={i} className="px-3 py-1.5 bg-magenta/5 border border-magenta/20 rounded-lg text-sm text-magenta font-medium">
                {dep}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Rekomendasi Fitur */}
      {item.rekomendasi_fitur && item.rekomendasi_fitur.length > 0 && (
        <Section icon={Boxes} title="Rekomendasi Fitur" bg="bg-slate-50/50">
          <div className="grid sm:grid-cols-2 gap-3">
            {item.rekomendasi_fitur.map((rec, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white rounded-xl p-3 border border-gray-100">
                <ArrowRight className="w-4 h-4 text-amethyst shrink-0" />
                <span className="text-sm text-navy font-medium">{rec}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Related Items */}
      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy mb-2">Istilah Terkait</h2>
              <p className="text-sm text-muted-foreground">Orang yang melihat ini juga melihat</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {related.map((rel, i) => (
                <LibraryCard key={rel.slug} item={rel} index={i} onClick={handleCardClick} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-navy via-navy-400 to-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(233,30,99,0.15),transparent_60%)]" />
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            Butuh Fitur Ini untuk Bisnis Anda?
          </h2>
          <p className="text-white/70 mb-8">
            Konsultasikan kebutuhan Anda secara gratis. Tim kami akan bantu menyusun requirement dan estimasi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => nav("#konsultasi")}
              className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-8 h-12 shadow-xl shadow-magenta/30 w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              Konsultasi Gratis <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
