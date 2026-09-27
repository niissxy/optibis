import React, { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Send, CheckCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import SectionHeading from "@/components/optibis/SectionHeading";

const FAQS = [
  { q: "Apa itu Optibis?", a: "Optibis adalah digital solution partner yang membantu bisnis dalam tiga area utama: branding melalui Digital Asset, website melalui layanan Website, dan pengelolaan digital bulanan melalui Digital Growth Team." },
  { q: "Layanan apa saja yang tersedia?", a: "Optibis menyediakan layanan pembuatan identitas brand, desain marketing materials, pembuatan website (dari landing page hingga custom system), serta pengelolaan konten, media sosial, SEO, iklan digital, dan reporting bulanan." },
  { q: "Apakah paket dapat disesuaikan?", a: "Ya, semua paket dapat disesuaikan dengan kebutuhan spesifik bisnis Anda. Konsultasikan kebutuhan Anda dan kami akan merancang solusi yang tepat." },
  { q: "Berapa lama pengerjaan?", a: "Waktu pengerjaan bervariasi tergantung layanan. Logo dan branding biasanya 2-4 minggu, website 3-8 minggu, dan Digital Growth Team beroperasi secara bulanan berkelanjutan." },
  { q: "Bagaimana proses revisi?", a: "Setiap paket memiliki kuota revisi yang tercantum. Revisi dilakukan secara terstruktur melalui dashboard klien sehingga prosesnya transparan dan terdokumentasi." },
  { q: "Apakah ada layanan bulanan?", a: "Ya, Digital Growth Team adalah layanan bulanan dimana Optibis menjadi tim digital eksternal Anda — mengelola konten, sosial media, website, SEO, iklan, dan pelaporan performa." },
  { q: "Bagaimana cara memulai?", a: "Hubungi kami melalui WhatsApp atau isi form konsultasi di samping. Tim kami akan menghubungi Anda dalam 1x24 jam untuk menjadwalkan sesi konsultasi gratis." },
];

const INDUSTRIES = ["Travel & Tour", "Properti", "Kesehatan", "Pendidikan", "Kuliner", "Beauty", "Kontraktor", "Distributor", "Personal Brand", "Corporate", "Organisasi", "Multi-Cabang", "Lainnya"];
const PILARS = ["Digital Asset", "Website", "Digital Growth Team", "Total Solution", "Belum Tahu"];

export default function FAQConsultation() {
  const { toast } = useToast();
  const { tr } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "", whatsapp: "", email: "", nama_bisnis: "",
    industri: "", kebutuhan: "", pilar: "", pesan: "",
  });

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.whatsapp) {
      toast({ title: tr("Lengkapi data"), description: tr("Nama dan nomor WhatsApp wajib diisi."), variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await base44.entities.Lead.create({ ...form, sumber: "Form Konsultasi Homepage", status: "Lead Baru" });
      setSubmitted(true);
    } catch (err) {
      toast({ title: tr("Gagal mengirim"), description: tr("Silakan coba lagi atau hubungi kami via WhatsApp."), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-14 lg:py-20 bg-slate-50/50" id="faq-konsultasi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Bantuan Optibis" title="Pertanyaan Umum & Konsultasi Gratis" description="Temukan jawaban cepat atau langsung hubungi kami untuk konsultasi gratis." className="mb-12" />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* FAQ Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-magenta rounded-full" />
              FAQ
            </h3>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-white border border-gray-100 rounded-xl px-5 data-[state=open]:border-magenta/20 data-[state=open]:shadow-lg data-[state=open]:shadow-magenta/5"
                >
                  <AccordionTrigger className="text-sm font-semibold text-navy hover:no-underline py-4 text-left">
                    {tr(faq.q)}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {tr(faq.a)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Consultation Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
            id="konsultasi"
          >
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-magenta rounded-full" />
              {tr("Konsultasi Gratis")}
            </h3>

            {submitted ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg text-center">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-extrabold text-navy mb-2">{tr("Terima Kasih!")}</h4>
                <p className="text-sm text-muted-foreground mb-6">{tr("Tim kami akan menghubungi Anda dalam 1×24 jam melalui WhatsApp.")}</p>
                <a
                  href="https://wa.me/6287772577020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {tr("Chat Langsung via WhatsApp")}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-7 shadow-lg space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-navy mb-1.5 block">{tr("Nama")} *</label>
                    <Input value={form.nama} onChange={(e) => handleChange("nama", e.target.value)} placeholder={tr("Nama lengkap")} className="rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-navy mb-1.5 block">WhatsApp *</label>
                    <Input value={form.whatsapp} onChange={(e) => handleChange("whatsapp", e.target.value)} placeholder="08xxxxxxxxxx" className="rounded-lg" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-navy mb-1.5 block">Email</label>
                    <Input value={form.email} onChange={(e) => handleChange("email", e.target.value)} type="email" placeholder="email@contoh.com" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-navy mb-1.5 block">{tr("Nama Bisnis")}</label>
                    <Input value={form.nama_bisnis} onChange={(e) => handleChange("nama_bisnis", e.target.value)} placeholder={tr("Nama bisnis")} className="rounded-lg" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-navy mb-1.5 block">{tr("Industri")}</label>
                    <Select value={form.industri} onValueChange={(v) => handleChange("industri", v)}>
                      <SelectTrigger className="rounded-lg"><SelectValue placeholder={tr("Pilih industri")} /></SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((ind) => <SelectItem key={ind} value={ind}>{tr(ind)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-navy mb-1.5 block">{tr("Pilar")}</label>
                    <Select value={form.pilar} onValueChange={(v) => handleChange("pilar", v)}>
                      <SelectTrigger className="rounded-lg"><SelectValue placeholder={tr("Pilih pilar")} /></SelectTrigger>
                      <SelectContent>
                        {PILARS.map((p) => <SelectItem key={p} value={p}>{tr(p)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-navy mb-1.5 block">{tr("Kebutuhan")}</label>
                  <Input value={form.kebutuhan} onChange={(e) => handleChange("kebutuhan", e.target.value)} placeholder={tr("Jelaskan singkat kebutuhan Anda")} className="rounded-lg" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-navy mb-1.5 block">{tr("Pesan Tambahan")}</label>
                  <Textarea value={form.pesan} onChange={(e) => handleChange("pesan", e.target.value)} placeholder="Budget, timeline, dll." rows={3} className="rounded-lg" />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full h-12 text-sm font-semibold shadow-lg shadow-magenta/20"
                >
                  {loading ? tr("Mengirim...") : <>{tr("Kirim Konsultasi")} <Send className="w-4 h-4 ml-2" /></>}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
