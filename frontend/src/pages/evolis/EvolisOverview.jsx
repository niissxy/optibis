import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FileText, UserPlus, TrendingUp, Megaphone, AlertTriangle, Clock, Activity as ActivityIcon, Target, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import KPICard from "@/components/evolis/shared/KPICard";
import GrowthLoopVisualizer from "@/components/evolis/growth-loop/GrowthLoopVisualizer";
import AlertBanner from "@/components/evolis/shared/AlertBanner";
import ActivityFeed from "@/components/evolis/shared/ActivityFeed";
import ApprovalCard from "@/components/evolis/shared/ApprovalCard";
import ScoreGauge from "@/components/evolis/shared/ScoreGauge";
import EmptyState from "@/components/evolis/shared/EmptyState";
import SkeletonGrid from "@/components/evolis/shared/SkeletonGrid";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";

export default function EvolisOverview() {
  const { workspaceId, userRole } = useWorkspace();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [dna, setDna] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (!workspaceId) { setLoading(false); return; }
      try {
        const [leads, assets, campaigns, auditLogs, approvals, dnaList] = await Promise.all([
          base44.entities.Lead.filter({ workspace_id: workspaceId }, "-created_date", 100),
          base44.entities.Asset.filter({ workspace_id: workspaceId }, "-created_date", 100),
          base44.entities.Campaign.filter({ workspace_id: workspaceId }, "-created_date", 50),
          base44.entities.AuditLog.filter({ workspace_id: workspaceId }, "-created_date", 10),
          base44.entities.ApprovalRequest.filter({ workspace_id: workspaceId, status: "pending" }, "-created_date", 5),
          base44.entities.BusinessDNA.filter({ workspace_id: workspaceId }, "-created_date", 1),
        ]);

        setStats({
          totalLeads: leads.length,
          totalAssets: assets.length,
          totalCampaigns: campaigns.length,
          publishedAssets: assets.filter((a) => a.publishing_status === "published").length,
        });
        setActivities(auditLogs);
        setApprovals(approvals);
        setDna(dnaList[0] || null);

        if (!dnaList[0]) {
          setAlerts([{ severity: "warning", title: "Business DNA belum diset", message: "Lengkapi Business DNA untuk mengaktifkan Evolis Engine." }]);
        }
      } catch (err) {
        // entities might be empty
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [workspaceId]);

  if (loading) return <SkeletonGrid count={6} />;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Overview" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">Kondisi organisme digital bisnis Anda</p>
        </div>
      </div>

      {/* Health Score + Growth Loop */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-navy mb-3">Business Health Score</h3>
          <ScoreGauge score={dna?.completeness_score || 0} label="DNA Completeness" size={140} />
          <div className="mt-3 text-center">
            <p className="text-xs text-muted-foreground">
              {dna ? `DNA: ${dna.business_name}` : "Belum ada Business DNA"}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <GrowthLoopVisualizer
            nodeStatuses={dna ? { dna: "active", signal: "active", asset: stats.totalAssets > 0 ? "active" : "idle" } : {}}
            nodeActivity={{ asset: stats.totalAssets || 0, distribution: stats.publishedAssets || 0 }}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard label="Total Leads" value={stats.totalLeads || 0} icon={UserPlus} color="magenta" index={0} />
        <KPICard label="Total Assets" value={stats.totalAssets || 0} icon={FileText} color="navy" index={1} />
        <KPICard label="Published" value={stats.publishedAssets || 0} icon={TrendingUp} color="green" index={2} />
        <KPICard label="Campaigns" value={stats.totalCampaigns || 0} icon={Megaphone} color="amethyst" index={3} />
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <AlertBanner alerts={alerts} />
      )}

      {/* Approvals + Activity */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-navy">Pending Approvals</h3>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          {approvals.length === 0 ? (
            <EmptyState icon={CheckCircle2} title="Tidak ada approval pending" description="Semua tindakan telah disetujui." />
          ) : (
            <div className="space-y-3">
              {approvals.map((req) => (
                <ApprovalCard key={req.id} request={req} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-navy">Recent Activity</h3>
            <ActivityIcon className="w-4 h-4 text-muted-foreground" />
          </div>
          <ActivityFeed activities={activities} maxItems={8} />
        </div>
      </div>
    </div>
  );
}