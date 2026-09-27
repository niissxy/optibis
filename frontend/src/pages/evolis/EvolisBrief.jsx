import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileClock, AlertTriangle, CheckCircle2, TrendingUp, ArrowRight, Activity } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import KPICard from "@/components/evolis/shared/KPICard";
import AlertBanner from "@/components/evolis/shared/AlertBanner";
import ScoreGauge from "@/components/evolis/shared/ScoreGauge";
import EmptyState from "@/components/evolis/shared/EmptyState";

export default function EvolisBrief() {
  const { workspaceId } = useWorkspace();
  const [brief, setBrief] = useState(null);
  const [stats, setStats] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try {
      const today = new Date().toISOString().split("T")[0];
      const [briefs, leads, assets, activities] = await Promise.all([
        base44.entities.DailyBrief.filter({ workspace_id: workspaceId, brief_date: today }, "-created_date", 1),
        base44.entities.Lead.filter({ workspace_id: workspaceId }, "-created_date", 50),
        base44.entities.Asset.filter({ workspace_id: workspaceId }, "-created_date", 50),
        base44.entities.AuditLog.filter({ workspace_id: workspaceId }, "-created_date", 10),
      ]);

      const todayLeads = leads.filter((l) => l.created_date?.startsWith(today));
      const qualifiedLeads = leads.filter((l) => (l.lead_score || 0) >= 70);
      const newAssets = assets.filter((a) => a.created_date?.startsWith(today));
      const publishedToday = assets.filter((a) => a.publishing_status === "published");

      setStats({
        newLeads: todayLeads.length,
        qualifiedLeads: qualifiedLeads.length,
        newAssets: newAssets.length,
        publishedAssets: publishedToday.length,
        totalActivities: activities.length,
      });

      const newAlerts = [];
      if (assets.filter((a) => a.quality_score < 60 && a.quality_score > 0).length > 0) {
        newAlerts.push({ severity: "warning", title: "Asset quality rendah", message: "Beberapa asset memiliki quality score < 60" });
      }
      const overdueLeads = leads.filter((l) => l.next_follow_up && new Date(l.next_follow_up) < new Date() && l.lead_status !== "won" && l.lead_status !== "lost");
      if (overdueLeads.length > 0) {
        newAlerts.push({ severity: "alert", title: `${overdueLeads.length} lead overdue`, message: "Lead follow-up sudah lewat tanggal" });
      }
      setAlerts(newAlerts);

      if (briefs[0]) setBrief(briefs[0]);
      else setBrief({ brief_date: today, what_happened: `${todayLeads.length} leads baru, ${newAssets.length} assets dibuat, ${publishedToday.length} dipublikasi`, what_matters: qualifiedLeads.length > 0 ? `${qualifiedLeads.length} qualified leads siap di-follow-up` : "Fokus pada lead nurturing", what_needs_attention: newAlerts.length > 0 ? "Ada alert yang perlu ditindaklanjuti" : "Sistem berjalan normal", recommended_actions: [], expected_impact: "Konsistensi aktivitas harian meningkatkan pertumbuhan organik" });
    } catch (err) {} finally { setLoading(false); }
  }

  if (loading) return <div className="text-sm text-muted-foreground p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Daily Brief" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy">Daily Growth Brief</h1>
          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <ScoreGauge score={alerts.length === 0 ? 85 : alerts.length <= 2 ? 65 : 40} label="Health" size={80} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <KPICard label="New Leads" value={stats.newLeads || 0} icon={TrendingUp} color="magenta" index={0} />
        <KPICard label="Qualified" value={stats.qualifiedLeads || 0} icon={CheckCircle2} color="green" index={1} />
        <KPICard label="New Assets" value={stats.newAssets || 0} icon={FileClock} color="navy" index={2} />
        <KPICard label="Published" value={stats.publishedAssets || 0} icon={ArrowRight} color="teal" index={3} />
        <KPICard label="Activities" value={stats.totalActivities || 0} icon={Activity} color="amethyst" index={4} />
      </div>

      {alerts.length > 0 && <AlertBanner alerts={alerts} />}

      {brief ? (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Activity className="w-4 h-4" /></div><h3 className="text-sm font-bold text-navy">1. What Happened</h3></div>
            <p className="text-sm text-navy leading-relaxed">{brief.what_happened}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div><h3 className="text-sm font-bold text-navy">2. What Matters</h3></div>
            <p className="text-sm text-navy leading-relaxed">{brief.what_matters}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><AlertTriangle className="w-4 h-4" /></div><h3 className="text-sm font-bold text-navy">3. What Needs Attention</h3></div>
            <p className="text-sm text-navy leading-relaxed">{brief.what_needs_attention}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-lg bg-magenta-50 text-magenta flex items-center justify-center"><TrendingUp className="w-4 h-4" /></div><h3 className="text-sm font-bold text-navy">4. Expected Impact</h3></div>
            <p className="text-sm text-navy leading-relaxed">{brief.expected_impact}</p>
          </div>
        </div>
      ) : (
        <EmptyState icon={FileClock} title="Belum ada brief hari ini" description="Brief akan tergenerate otomatis berdasarkan aktivitas harian." />
      )}
    </div>
  );
}