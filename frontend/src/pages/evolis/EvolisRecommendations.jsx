import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles, Check, X, Calendar } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import EmptyState from "@/components/evolis/shared/EmptyState";
import RecommendationCard from "@/components/evolis/shared/RecommendationCard";
import { Button } from "@/components/ui/button";

export default function EvolisRecommendations() {
  const { workspaceId } = useWorkspace();
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try { setRecs(await base44.entities.Recommendation.filter({ workspace_id: workspaceId }, "-created_date")); }
    catch (err) {} finally { setLoading(false); }
  }

  const updateStatus = async (rec, status) => {
    await base44.entities.Recommendation.update(rec.id, { status });
    loadData();
  };

  const generateRuleBased = async () => {
    setGenerating(true);
    try {
      const [leads, assets, campaigns] = await Promise.all([
        base44.entities.Lead.filter({ workspace_id: workspaceId }, "-created_date", 50),
        base44.entities.Asset.filter({ workspace_id: workspaceId }, "-created_date", 50),
        base44.entities.Campaign.filter({ workspace_id: workspaceId }, "-created_date", 20),
      ]);

      const newRecs = [];
      const coldLeads = leads.filter((l) => (l.lead_score || 0) < 30);
      if (coldLeads.length > 0) {
        newRecs.push({ type: "follow_up_lead", title: `Follow-up ${coldLeads.length} cold leads`, problem: `${coldLeads.length} leads memiliki score < 30`, recommended_action: "Hubungi leads via WhatsApp dan email untuk re-engagement", reason: "Cold leads cenderung tidak konversi tanpa follow-up", expected_impact: "Potensi increase conversion rate 15-20%", urgency: "high", confidence: 80, risk_level: "low", auto_executable: false, approval_required: true, status: "new" });
      }

      const draftAssets = assets.filter((a) => a.publishing_status === "draft" || a.publishing_status === "generated");
      if (draftAssets.length > 0) {
        newRecs.push({ type: "update", title: `${draftAssets.length} assets perlu di-review`, problem: `${draftAssets.length} assets masih dalam status draft/generated`, recommended_action: "Review dan kirim untuk approval", reason: "Assets yang tidak dipublikasi tidak menghasilkan impact", expected_impact: "Meningkatkan distribusi konten", urgency: "medium", confidence: 75, risk_level: "low", auto_executable: false, approval_required: true, status: "new" });
      }

      const lowQualityAssets = assets.filter((a) => (a.quality_score || 0) < 75 && a.quality_score > 0);
      if (lowQualityAssets.length > 0) {
        newRecs.push({ type: "refresh", title: `${lowQualityAssets.length} assets perlu diperbaiki`, problem: `Quality score < 75 pada ${lowQualityAssets.length} assets`, recommended_action: "Perbaiki CTA, tone, dan struktur konten", reason: "Low quality assets dapat menurunkan brand credibility", expected_impact: "Meningkatkan engagement rate 10-15%", urgency: "medium", confidence: 70, risk_level: "low", auto_executable: false, approval_required: false, status: "new" });
      }

      const pausedCampaigns = campaigns.filter((c) => c.status === "paused");
      if (pausedCampaigns.length > 0) {
        newRecs.push({ type: "pause", title: `${pausedCampaigns.length} campaigns paused`, problem: "Campaigns dalam status paused terlalu lama", recommended_action: "Review dan reactivate atau archive", reason: "Paused campaigns menghabiskan resource tanpa hasil", expected_impact: "Fokus resource ke active campaigns", urgency: "low", confidence: 60, risk_level: "low", auto_executable: false, approval_required: false, status: "new" });
      }

      if (newRecs.length === 0) {
        newRecs.push({ type: "create", title: "Sistem dalam kondisi sehat", problem: "Tidak ada bottleneck yang terdeteksi", recommended_action: "Lanjutkan distribusi dan monitoring", reason: "Semua metrics dalam batas normal", expected_impact: "Pertahankan konsistensi", urgency: "low", confidence: 90, risk_level: "low", auto_executable: false, approval_required: false, status: "new" });
      }

      for (const rec of newRecs) {
        await base44.entities.Recommendation.create({ ...rec, workspace_id: workspaceId });
      }
      loadData();
    } catch (err) {} finally { setGenerating(false); }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Recommendations" }]} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-navy">Recommendations</h1><p className="text-sm text-muted-foreground">Rekomendasi berbasis data dan aturan</p></div>
        <Button onClick={generateRuleBased} disabled={generating} className="bg-magenta hover:bg-magenta-500 text-white rounded-full">
          <Sparkles className="w-4 h-4" /> {generating ? "Generating..." : "Generate Recommendations"}
        </Button>
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> :
        recs.length === 0 ? <EmptyState icon={Lightbulb} title="Belum ada rekomendasi" description="Generate rekomendasi berbasis data untuk melihat insight." action={<Button onClick={generateRuleBased} className="bg-magenta text-white rounded-full"><Sparkles className="w-4 h-4" /> Generate</Button>} /> :
        <div className="grid sm:grid-cols-2 gap-4">
          {recs.map((rec, i) => (
            <RecommendationCard
              key={rec.id}
              rec={rec}
              index={i}
              onAccept={(r) => updateStatus(r, "accepted")}
              onReject={(r) => updateStatus(r, "rejected")}
              onSchedule={(r) => updateStatus(r, "scheduled")}
            />
          ))}
        </div>
      }
    </div>
  );
}