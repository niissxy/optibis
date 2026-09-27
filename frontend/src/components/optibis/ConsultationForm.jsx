import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Send, CheckCircle, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/optibis/SectionHeading";

const INDUSTRIES = ["Travel & Tour", "Properti", "Kesehatan", "Pendidikan", "Kuliner", "Beauty", "Kontraktor", "Distributor", "Personal Brand", "Corporate", "Organisasi", "Multi-Cabang", "Lainnya"];
const PILARS = ["Digital Asset", "Website", "Digital Growth Team", "Total Solution", "Belum Tahu"];

export default function ConsultationForm({ embedded = false }) {
  const { toast } = useToast();
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
      toast({ title: "Lengkapi data", description: "Nama dan nomor WhatsApp wajib diisi.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await base44.entities.Lead.create({ ...form, sumber: "Form Konsultasi Homepage", status: "Lead Baru", lead_status: "new" });
      setSubmitted(true);
    } catch (err) {
      toast({ title: "Gagal mengirim", description: "Silakan coba lagi atau hubungi kami via WhatsApp.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    if (embedded) {
      return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-96 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg">
          <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
          <h2 className="mb-2 text-2xl font-extrabold text-navy">Terima Kasih!</h2>
          <p className="mb-6 text-muted-foreground">Tim kami akan menghubungi Anda dalam 1x24 jam melalui WhatsApp.</p>
          <a href="https://wa.me/6287772577020" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600">
            <MessageCircle className="h-4 w-4" /> Chat Langsung via WhatsApp
          </a>
        </motion.div>
      );
    }

    return (
      <section className="py-14 lg:py-20 bg-slate-50/50" id="konsultasi">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold text-navy mb-2">Terima Kasih!</h2>
            <p className="text-muted-foreground mb-6">Tim kami akan menghubungi Anda dalam 1×24 jam melalui WhatsApp.</p>
            <a
              href="https://wa.me/6287772577020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Langsung via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  const formContent = (
    <>
      <SectionHeading eyebrow="Konsultasi Optibis" title="Konsultasi Gratis" description="Ceritakan kebutuhan bisnis Anda. Tim kami siap membantu." align={embedded ? "left" : "center"} compact className={embedded ? "mb-7" : "mb-10"} />

      <form onSubmit={handleSubmit} className={`space-y-4 rounded-2xl bg-white p-6 lg:p-8 ${embedded ? "border-2 border-magenta/20 shadow-xl shadow-magenta/5" : "border border-gray-100 shadow-lg"}`}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-navy mb-1.5 block">Nama *</label>
            <Input value={form.nama} onChange={(e) => handleChange("nama", e.target.value)} placeholder="Nama lengkap" className="rounded-lg" />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy mb-1.5 block">Nomor WhatsApp *</label>
            <Input value={form.whatsapp} onChange={(e) => handleChange("whatsapp", e.target.value)} placeholder="08xxxxxxxxxx" className="rounded-lg" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-navy mb-1.5 block">Email</label>
            <Input value={form.email} onChange={(e) => handleChange("email", e.target.value)} type="email" placeholder="email@contoh.com" className="rounded-lg" />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy mb-1.5 block">Nama Bisnis</label>
            <Input value={form.nama_bisnis} onChange={(e) => handleChange("nama_bisnis", e.target.value)} placeholder="Nama perusahaan/bisnis" className="rounded-lg" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-navy mb-1.5 block">Industri</label>
            <Select value={form.industri} onValueChange={(v) => handleChange("industri", v)}>
              <SelectTrigger className="rounded-lg"><SelectValue placeholder="Pilih industri" /></SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold text-navy mb-1.5 block">Pilar yang Diminati</label>
            <Select value={form.pilar} onValueChange={(v) => handleChange("pilar", v)}>
              <SelectTrigger className="rounded-lg"><SelectValue placeholder="Pilih pilar" /></SelectTrigger>
              <SelectContent>
                {PILARS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-navy mb-1.5 block">Kebutuhan</label>
          <Input value={form.kebutuhan} onChange={(e) => handleChange("kebutuhan", e.target.value)} placeholder="Jelaskan singkat kebutuhan Anda" className="rounded-lg" />
        </div>

        <div>
          <label className="text-xs font-semibold text-navy mb-1.5 block">Pesan Tambahan</label>
          <Textarea value={form.pesan} onChange={(e) => handleChange("pesan", e.target.value)} placeholder="Detail tambahan, budget, timeline, dll." rows={3} className="rounded-lg" />
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full h-12 text-sm font-semibold shadow-lg shadow-magenta/20">
          {loading ? "Mengirim..." : <>Kirim Konsultasi <Send className="w-4 h-4 ml-2" /></>}
        </Button>
      </form>
    </>
  );

  if (embedded) return <div id="konsultasi">{formContent}</div>;

  return (
    <section className="py-14 lg:py-20 bg-slate-50/50" id="konsultasi">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {formContent}
      </div>
    </section>
  );
}
