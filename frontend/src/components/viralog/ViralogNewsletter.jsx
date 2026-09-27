import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import { VIRALOG_CATEGORIES } from "@/data/viralog";
import { useToast } from "@/components/ui/use-toast";

export default function ViralogNewsletter({ variant = "default" }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const toggleInterest = (slug) => {
    setInterests((prev) =>
      prev.includes(slug) ? prev.filter((i) => i !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !consent) return;
    setLoading(true);
    try {
      await base44.entities.ViralogSubscriber.create({
        name,
        email,
        interest_categories: interests,
        consent: true,
        source: "viralog_newsletter",
        status: "active",
        subscribed_at: new Date().toISOString().split("T")[0],
      });
      setSubmitted(true);
      toast({ title: "Berhasil berlangganan!", description: "Anda akan menerima insight digital terbaru setiap minggu." });
    } catch (err) {
      toast({ title: "Gagal berlangganan", description: "Silakan coba lagi.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-navy mb-2">Selamat Datang!</h3>
        <p className="text-sm text-muted-foreground">Cek email Anda untuk konfirmasi langganan.</p>
      </motion.div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="bg-gradient-to-br from-navy to-navy-400 rounded-xl p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-magenta" />
          <span className="text-xs font-bold uppercase tracking-wide text-magenta">Newsletter</span>
        </div>
        <h3 className="text-base font-bold mb-2">Insight Mingguan Gratis</h3>
        <p className="text-xs text-white/60 mb-4">Dapatkan tips digital marketing, branding, dan website langsung ke inbox Anda.</p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input type="email" placeholder="Email Anda" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-9" />
          <label className="flex items-start gap-2 text-[10px] text-white/60">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" required />
            Saya setuju menerima email dari Optibis
          </label>
          <Button type="submit" disabled={!email || !consent || loading} className="w-full bg-magenta hover:bg-magenta-500 text-white h-9 text-sm">
            {loading ? "Mengirim..." : "Berlangganan"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-navy via-navy-400 to-navy rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(233,30,99,0.15),transparent_60%)]" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magenta/20 text-magenta text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" /> VIRALOG Newsletter
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Jangan Ketinggalan Insight Terbaru</h2>
        <p className="text-white/70 mb-6">Dapatkan artikel, tren, dan tips digital marketing terbaru langsung ke inbox Anda. Gratis selamanya.</p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <Input type="text" placeholder="Nama Anda" value={name} onChange={(e) => setName(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11" />
          <Input type="email" placeholder="Email Anda" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11" />
          <div className="text-left">
            <p className="text-xs text-white/60 mb-2">Pilih topik yang menarik bagi Anda:</p>
            <div className="flex flex-wrap gap-2">
              {VIRALOG_CATEGORIES.slice(0, 6).map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => toggleInterest(cat.slug)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    interests.includes(cat.slug)
                      ? "bg-magenta text-white"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-start gap-2 text-xs text-white/60">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" required />
            Saya setuju untuk menerima email dari Optibis dan dapat berhenti berlangganan kapan saja.
          </label>
          <Button type="submit" disabled={!email || !consent || loading} className="w-full bg-magenta hover:bg-magenta-500 text-white h-11 font-semibold">
            {loading ? "Mengirim..." : "Berlangganan Sekarang"}
          </Button>
        </form>
      </div>
    </div>
  );
}