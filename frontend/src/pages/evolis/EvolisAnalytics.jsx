import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, FileText, Target } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import KPICard from "@/components/evolis/shared/KPICard";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import EmptyState from "@/components/evolis/shared/EmptyState";

export default function EvolisAnalytics() {
  const { workspaceId } = useWorkspace();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ leads: [], assets: [], campaigns: [] });

  useEffect(() => {
    async function loadData() {
      if (!workspaceId) { setLoading(false); return; }
      try {
        const [leads, assets, campaigns] = await Promise.all([
          base44.entities.Lead.filter({ workspace_id: workspaceId }, "-created_date", 200),
          base44.entities.Asset.filter({ workspace_id: workspaceId }, "-created_date", 200),
          base44.entities.Campaign.filter({ workspace_id: workspaceId }, "-created_date", 100),
        ]);
        setData({ leads, assets, campaigns });
      } catch (err) {} finally { setLoading(false); }
    }
    loadData();
  }, [workspaceId]);

  if (loading) return <div className="text-sm text-muted-foreground p-6">Loading...</div>;

  const totalLeads = data.leads.length;
  const qualifiedLeads = data.leads.filter((l) => (l.lead_score || 0) >= 70).length;
  const totalAssets = data.assets.length;
  const publishedAssets = data.assets.filter((a) => a.publishing_status === "published").length;
  const activeCampaigns = data.campaigns.filter((c) => c.status === "active").length;

  // Leads by status
  const leadsByStatus = ["new", "engaged", "warm", "qualified", "proposal_sent", "negotiation", "won"].map((status) => ({
    name: status.replace(/_/g, " "),
    count: data.leads.filter((l) => l.lead_status === status).length,
  }));

  // Assets by type
  const assetTypeMap = {};
  data.assets.forEach((a) => { assetTypeMap[a.type] = (assetTypeMap[a.type] || 0) + 1; });
  const assetsByType = Object.entries(assetTypeMap).map(([type, count]) => ({ name: type.replace(/_/g, " "), count })).slice(0, 8);

  // Leads by industry
  const industryMap = {};
  data.leads.forEach((l) => { const ind = l.industri || "Unknown"; industryMap[ind] = (industryMap[ind] || 0) + 1; });
  const leadsByIndustry = Object.entries(industryMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Analytics" }]} />
      <div>
        <h1 className="text-xl font-bold text-navy">Analytics</h1>
        <p className="text-sm text-muted-foreground">Performa organisme digital</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard label="Total Leads" value={totalLeads} icon={Users} color="magenta" index={0} />
        <KPICard label="Qualified Leads" value={qualifiedLeads} icon={Target} color="green" index={1} />
        <KPICard label="Total Assets" value={totalAssets} icon={FileText} color="navy" index={2} />
        <KPICard label="Published" value={publishedAssets} icon={TrendingUp} color="teal" index={3} />
      </div>

      {totalLeads === 0 && totalAssets === 0 ? (
        <EmptyState icon={BarChart3} title="Belum ada data analytics" description="Data akan muncul setelah ada leads dan assets." />
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-navy mb-4">Leads by Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={leadsByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#E91E63" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-navy mb-4">Assets by Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={assetsByType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#9C27B0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 lg:col-span-2">
            <h3 className="text-sm font-bold text-navy mb-4">Leads by Industry</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={leadsByIndustry}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#0A192F" strokeWidth={2} dot={{ fill: "#E91E63", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}