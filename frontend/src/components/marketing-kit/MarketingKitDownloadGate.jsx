import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Lock, LogIn, UserPlus, CheckCircle2, Mail, MessageCircle, Building2, Briefcase, MapPin, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";

export default function MarketingKitDownloadGate({ item, onClose }) {
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState("auth"); // auth → form → success → qualify
  const [form, setForm] = useState({ nama: "", email: "", whatsapp: "", perusahaan: "", jabatan: "", kota: "", industri: "", tujuan: "", consent: false });
  const [qualify, setQualify] = useState({ kebutuhan: "", produk: "", dihubungi: "", jadwal: "", budget: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
      setStep(isAuthenticated ? "success" : "auth");
    }
    return () => { document.body.style.overflow = ""; };
  }, [item, isAuthenticated]);

  const handleRegister = async () => {
    if (!form.nama || !form.email || !form.whatsapp || !form.consent) return;
    setLoading(true);
    try {
      await base44.entities.Lead.create({
        nama: form.nama,
        email: form.email,
        whatsapp: form.whatsapp,
        nama_bisnis: form.perusahaan,
        city: form.kota,
        industri: form.industri,
        kebutuhan: form.tujuan,
        sumber: "Marketing Kit Download",
        product_interest: item?.produk_terkait || "",
        consent: true,
        lead_status: "new",
        status: "Lead Baru",
        notes: `Download: ${item?.nama_asset}`,
      });
      setStep("success");
    } catch (e) {
      setStep("success");
    }
    setLoading(false);
  };

  const handleQualifySubmit = async () => {
    setLoading(true);
    try {
      // Update lead with qualification data could go here
      setStep("success");
    } catch (e) {
      setStep("success");
    }
    setLoading(false);
  };

  const Input = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        {...props}
        onChange={(e) => setForm({ ...form, [props.name]: e.target.value })}
        className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-magenta transition-colors text-navy bg-white"
      />
    </div>
  );

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-navy to-navy-400 text-white px-5 py-5 relative">
              <button onClick={onClose} className="absolute top-3 right-3 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">{item.nama_asset}</h3>
                  <p className="text-xs text-white/60 mt-0.5">{item.format_file} • {item.ukuran_file}</p>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              {/* Step: Auth Choice */}
              {step === "auth" && (
                <div className="p-5 space-y-4">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-magenta/10 flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-5 h-5 text-magenta" />
                    </div>
                    <h4 className="text-sm font-bold text-navy mb-1">Download Memerlukan Akun</h4>
                    <p className="text-xs text-muted-foreground">Login atau daftar untuk mengunduh. Data Anda aman & menjadi prospek yang dikelola tim kami.</p>
                  </div>
                  <div className="space-y-2">
                    <Link to="/login" className="block">
                      <Button className="w-full bg-navy hover:bg-navy-600 text-white rounded-lg h-10 text-sm font-semibold">
                        <LogIn className="w-4 h-4 mr-1.5" /> Saya Sudah Punya Akun
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setStep("form")}
                      className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-lg h-10 text-sm font-semibold"
                    >
                      <UserPlus className="w-4 h-4 mr-1.5" /> Daftar Cepat
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground justify-center pt-2 border-t border-gray-50">
                    <Shield className="w-3 h-3" /> Data dilindungi • Akan dihubungi tim sales
                  </div>
                </div>
              )}

              {/* Step: Registration Form */}
              {step === "form" && (
                <div className="p-5 space-y-3">
                  <div className="text-center mb-2">
                    <h4 className="text-sm font-bold text-navy mb-0.5">Daftar Cepat</h4>
                    <p className="text-[11px] text-muted-foreground">Isi data untuk mengunduh asset</p>
                  </div>
                  <Input icon={UserPlus} type="text" name="nama" placeholder="Nama Lengkap *" value={form.nama} />
                  <Input icon={Mail} type="email" name="email" placeholder="Email *" value={form.email} />
                  <Input icon={MessageCircle} type="text" name="whatsapp" placeholder="Nomor WhatsApp *" value={form.whatsapp} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input icon={Building2} type="text" name="perusahaan" placeholder="Perusahaan" value={form.perusahaan} />
                    <Input icon={Briefcase} type="text" name="jabatan" placeholder="Jabatan" value={form.jabatan} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input icon={MapPin} type="text" name="kota" placeholder="Kota" value={form.kota} />
                    <Input icon={Target} type="text" name="industri" placeholder="Industri" value={form.industri} />
                  </div>
                  <Input icon={Target} type="text" name="tujuan" placeholder="Tujuan Download" value={form.tujuan} />
                  <label className="flex items-start gap-2 text-[11px] text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 accent-magenta"
                    />
                    <span>Saya setuju dengan <span className="text-magenta font-medium">Privacy Policy</span> dan bersedia dihubungi tim Optibis.</span>
                  </label>
                  <Button
                    onClick={handleRegister}
                    disabled={!form.nama || !form.email || !form.whatsapp || !form.consent || loading}
                    className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-lg h-10 text-sm font-semibold"
                  >
                    {loading ? "Memproses..." : "Daftar & Download"}
                  </Button>
                  <button onClick={() => setStep("auth")} className="w-full text-center text-[11px] text-muted-foreground hover:text-navy transition-colors">
                    ← Kembali
                  </button>
                </div>
              )}

              {/* Step: Qualify */}
              {step === "qualify" && (
                <div className="p-5 space-y-3">
                  <div className="text-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                      <Target className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="text-sm font-bold text-navy mb-0.5">Sebentar Lagi!</h4>
                    <p className="text-[11px] text-muted-foreground">Bantu kami pahami kebutuhan Anda</p>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-navy mb-1 block">Apa kebutuhan Anda saat ini?</label>
                    <select value={qualify.kebutuhan} onChange={(e) => setQualify({ ...qualify, kebutuhan: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-magenta">
                      <option value="">Pilih...</option>
                      <option value="branding">Branding</option>
                      <option value="website">Website</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="erp">Sistem / ERP</option>
                      <option value="konsultasi">Konsultasi</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-navy mb-1 block">Produk yang diminati?</label>
                    <select value={qualify.produk} onChange={(e) => setQualify({ ...qualify, produk: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-magenta">
                      <option value="">Pilih...</option>
                      <option value="digital-asset">Digital Asset</option>
                      <option value="website">Website</option>
                      <option value="growth-team">Digital Growth Team</option>
                      <option value="total-solution">Total Solution</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-navy mb-1 block">Kapan rencana pembelian?</label>
                    <select value={qualify.jadwal} onChange={(e) => setQualify({ ...qualify, jadwal: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-magenta">
                      <option value="">Pilih...</option>
                      <option value="segera">Segera (1-2 minggu)</option>
                      <option value="1bulan">1 bulan</option>
                      <option value="3bulan">3 bulan</option>
                      <option value="lainnya">Belum tahu</option>
                    </select>
                  </div>
                  <Button onClick={handleQualifySubmit} disabled={loading} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-lg h-10 text-sm font-semibold">
                    {loading ? "Menyimpan..." : "Selesai & Download"}
                  </Button>
                </div>
              )}

              {/* Step: Success */}
              {step === "success" && (
                <div className="p-6 text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-bold text-navy mb-1">Download Berhasil!</h4>
                    <p className="text-xs text-muted-foreground">File siap diunduh. Tim kami akan menghubungi Anda segera untuk konsultasi gratis.</p>
                  </div>
                  <a
                    href={item.file_url}
                    className="inline-flex items-center gap-2 bg-magenta hover:bg-magenta-500 text-white rounded-full px-6 h-10 text-sm font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4" /> Unduh File
                  </a>
                  <div className="pt-3 border-t border-gray-50">
                    <p className="text-[11px] font-medium text-navy mb-2">Rekomendasi untuk Anda:</p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {["Konsultasi Gratis", "Lihat Paket", "Portofolio"].map((rec) => (
                        <span key={rec} className="px-2.5 py-1 bg-slate-50 rounded-full text-[10px] font-medium text-navy border border-gray-100">{rec}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}