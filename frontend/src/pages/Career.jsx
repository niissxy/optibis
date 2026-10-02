import React from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, FileText, GraduationCap, MessageCircle, Sparkles, Users } from "lucide-react";
import SEO from "@/components/SEO";
import PillarLayout from "@/components/optibis/PillarLayout";
import OptibisPageHero from "@/components/optibis/OptibisPageHero";
import { useCareers } from "@/hooks/useCareers";
import { getBreadcrumbSchema } from "@/lib/seoData";

function whatsappLink(value, title) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  const number = value.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(`Halo Optibis, saya ingin melamar posisi ${title}.`)}` : "";
}

export default function Career() {
  const { careers } = useCareers();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const selectedSlug = params.get("posisi");
  const selectedType = ["fulltime", "internship"].includes(params.get("jenis")) ? params.get("jenis") : null;
  const selectedCareer = careers.find((career) => career.slug === selectedSlug);
  const fulltime = careers.filter((career) => career.employmentType === "fulltime");
  const internship = careers.filter((career) => career.employmentType === "internship");
  const groups = [
    { type: "fulltime", title: "Full Time", description: "Kesempatan untuk menjadi bagian dari tim Optibis secara penuh waktu.", items: fulltime },
    { type: "internship", title: "PKL / Magang", description: "Ruang belajar dan pengalaman kerja untuk mengembangkan kemampuanmu.", items: internship },
  ].filter((group) => !selectedType || group.type === selectedType);

  return (
    <PillarLayout>
      <SEO title="Karir di Optibis" description="Temukan peluang karir Full Time dan PKL/Magang di Optibis." canonicalUrl="https://optibis.id/karir" structuredData={[getBreadcrumbSchema([{ name: "Beranda", url: "/" }, { name: "Karir", url: "/karir" }])]} />
      <OptibisPageHero eyebrow="Karir Optibis" title="Bertumbuh dan Berkarya Bersama Kami" description="Pilih peluang Full Time atau PKL/Magang yang sesuai, lalu kirim lamaran melalui formulir atau WhatsApp." />

      <section className="relative overflow-hidden bg-slate-50 py-12 dark:bg-navy-600 lg:py-20">
        <div className="pointer-events-none absolute -left-32 top-12 h-72 w-72 rounded-full bg-magenta/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amethyst/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {selectedCareer && <ApplicationPanel career={selectedCareer} />}
          {!selectedCareer && <div className="mb-9 max-w-2xl"><span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-magenta shadow-sm dark:bg-navy-500"><Sparkles className="h-3.5 w-3.5" /> Peluang tersedia</span><h2 className="mt-4 text-2xl font-extrabold tracking-tight text-navy dark:text-white sm:text-3xl">Temukan ruang untuk memberi dampak.</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground dark:text-navy-100 sm:text-base">Pilih jalur karir yang sesuai, lihat posisi yang tersedia, lalu daftar dengan cara yang paling nyaman.</p></div>}
          <div className={`grid gap-8 ${selectedType ? "max-w-3xl" : "lg:grid-cols-2"}`}>
            {groups.map((group) => <CareerGroup key={group.type} {...group} />)}
          </div>
        </div>
      </section>
    </PillarLayout>
  );
}

function CareerGroup({ type, title, description, items }) {
  const isInternship = type === "internship";
  const Icon = isInternship ? GraduationCap : BriefcaseBusiness;
  const accent = isInternship ? "bg-amethyst-50 text-amethyst" : "bg-magenta-50 text-magenta";
  const ring = isInternship ? "hover:border-amethyst/35" : "hover:border-magenta/35";
  return <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_14px_45px_rgba(15,35,61,0.07)] dark:border-navy-300 dark:bg-navy-500 dark:shadow-black/20"><div className={`relative overflow-hidden px-6 pb-6 pt-7 sm:px-7 ${isInternship ? "bg-gradient-to-br from-amethyst-50 via-white to-white dark:from-navy-400 dark:via-navy-500 dark:to-navy-500" : "bg-gradient-to-br from-magenta-50 via-white to-white dark:from-navy-400 dark:via-navy-500 dark:to-navy-500"}`}><div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-40 ${isInternship ? "bg-amethyst-100" : "bg-magenta-100"}`} /><div className="relative flex items-start justify-between gap-4"><span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}><Icon className="h-5 w-5" /></span><span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-navy-600 dark:text-navy-100">{items.length} posisi</span></div><h2 className="relative mt-5 text-2xl font-extrabold text-navy dark:text-white">{title}</h2><p className="relative mt-2 max-w-md text-sm leading-relaxed text-muted-foreground dark:text-navy-100">{description}</p></div><div className="space-y-3 p-4 sm:p-5">{items.map((career) => <a key={career.id} href={`/karir?jenis=${type}&posisi=${encodeURIComponent(career.slug)}`} className={`group block rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg dark:border-navy-300 dark:bg-navy-600 dark:hover:bg-navy-400 ${ring}`}><div className="flex items-start gap-3"><span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white ${isInternship ? "text-amethyst" : "text-magenta"} shadow-sm dark:bg-navy-500`}><Users className="h-4 w-4" /></span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-navy transition-colors group-hover:text-magenta dark:text-white">{career.title}</h3><ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-magenta dark:text-navy-100" /></div>{career.summary ? <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground dark:text-navy-100">{career.summary}</p> : <p className="mt-1.5 text-xs font-medium text-slate-400 dark:text-navy-100">Lihat detail dan pilihan pendaftaran</p>}</div></div></a>)}{!items.length && <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-muted-foreground dark:border-navy-300 dark:bg-navy-600 dark:text-navy-100">Belum ada posisi tersedia.</p>}</div></div>;
}

function ApplicationPanel({ career }) {
  const whatsapp = whatsappLink(career.whatsappUrl, career.title);
  const placeholderClick = (event) => event.preventDefault();
  return <div className="relative mb-10 overflow-hidden rounded-3xl bg-navy px-6 py-7 text-white shadow-xl shadow-navy/15 sm:px-9 sm:py-9"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-magenta/35 blur-2xl" /><div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-amethyst/30 blur-2xl" /><div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end"><div><span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80"><CheckCircle2 className="h-3.5 w-3.5 text-magenta-200" /> Posisi dipilih</span><h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{career.title}</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{career.summary || "Pilih cara pendaftaran yang paling nyaman untukmu."}</p>{career.applicationNote && <p className="mt-5 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm leading-relaxed text-white/85">{career.applicationNote}</p>}</div><div className="flex flex-wrap gap-3 lg:max-w-sm lg:justify-end"><a href={career.formUrl || "#"} target={career.formUrl ? "_blank" : undefined} rel={career.formUrl ? "noopener noreferrer" : undefined} onClick={career.formUrl ? undefined : placeholderClick} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${career.formUrl ? "bg-white text-navy hover:-translate-y-0.5 hover:shadow-lg" : "cursor-not-allowed bg-white/15 text-white/60"}`}><FileText className={`h-4 w-4 ${career.formUrl ? "text-magenta" : "text-white/50"}`} /> Form Pendaftaran</a><a href={whatsapp || "#"} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noopener noreferrer" : undefined} onClick={whatsapp ? undefined : placeholderClick} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${whatsapp ? "bg-green-500 text-white hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-lg" : "cursor-not-allowed bg-green-500/25 text-green-100/60"}`}><MessageCircle className="h-4 w-4" /> Via WhatsApp</a></div></div></div>;
}
