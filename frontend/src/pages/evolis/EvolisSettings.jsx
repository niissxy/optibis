import React, { useState, useEffect } from "react";
import { Settings, Plug, ShieldCheck, Users, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import { useAuth } from "@/lib/AuthContext";
import { EVOLIS_ROLES, getRoleColor } from "@/data/evolis/roles";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import EmptyState from "@/components/evolis/shared/EmptyState";

const INTEGRATION_PROVIDERS = [
  { value: "website_cms", label: "Website CMS", icon: "🌐" },
  { value: "analytics", label: "Google Analytics", icon: "📊" },
  { value: "email", label: "Email", icon: "📧" },
  { value: "whatsapp", label: "WhatsApp", icon: "💬" },
  { value: "social_facebook", label: "Facebook", icon: "📘" },
  { value: "social_instagram", label: "Instagram", icon: "📸" },
  { value: "social_tiktok", label: "TikTok", icon: "🎵" },
  { value: "social_linkedin", label: "LinkedIn", icon: "💼" },
  { value: "crm", label: "CRM External", icon: "🗂️" },
  { value: "spreadsheet", label: "Google Sheets", icon: "📋" },
  { value: "webhook", label: "Webhook", icon: "🔗" },
  { value: "payment", label: "Payment", icon: "💳" },
  { value: "booking", label: "Booking System", icon: "📅" },
];

export default function EvolisSettings() {
  const { workspace, workspaceId, workspaceMember } = useWorkspace();
  const { user } = useAuth();
  const [integrations, setIntegrations] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("workspace");

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try {
      const [ints, mems] = await Promise.all([
        base44.entities.Integration.filter({ workspace_id: workspaceId }),
        base44.entities.WorkspaceMember.filter({ workspace_id: workspaceId }),
      ]);
      setIntegrations(ints);
      setMembers(mems);
    } catch (err) {} finally { setLoading(false); }
  }

  if (loading) return <div className="text-sm text-muted-foreground p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Settings" }]} />
      <div>
        <h1 className="text-xl font-bold text-navy">Settings</h1>
        <p className="text-sm text-muted-foreground">Konfigurasi workspace, integrasi, dan user</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setTab("workspace")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === "workspace" ? "bg-navy text-white" : "bg-white border border-gray-200 text-muted-foreground"}`}>Workspace</button>
        <button onClick={() => setTab("integrations")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === "integrations" ? "bg-navy text-white" : "bg-white border border-gray-200 text-muted-foreground"}`}>Integrations</button>
        <button onClick={() => setTab("team")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === "team" ? "bg-navy text-white" : "bg-white border border-gray-200 text-muted-foreground"}`}>Team</button>
      </div>

      {tab === "workspace" && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4"><Settings className="w-4 h-4 text-navy" /><h3 className="text-sm font-bold text-navy">Workspace Info</h3></div>
          {workspace ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">Name</span><span className="text-sm font-semibold text-navy">{workspace.name}</span></div>
              <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">Plan</span><StatusChip label={workspace.plan?.toUpperCase()} color="blue" size="xs" /></div>
              <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">Status</span><StatusChip label={workspace.status?.toUpperCase()} color="green" size="xs" /></div>
              <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">Your Role</span><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRoleColor(workspaceMember?.role || user?.role || "viewer")}`}>{EVOLIS_ROLES.find((r) => r.id === (workspaceMember?.role || user?.role || "viewer"))?.label}</span></div>
            </div>
          ) : (
            <EmptyState icon={Settings} title="Workspace belum dikonfigurasi" description="Hubungi admin untuk setup workspace." />
          )}
        </div>
      )}

      {tab === "integrations" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTEGRATION_PROVIDERS.map((provider) => {
            const integration = integrations.find((i) => i.provider === provider.value);
            const connected = integration?.connection_status === "connected";
            return (
              <div key={provider.value} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2"><span className="text-xl">{provider.icon}</span><div><h4 className="text-sm font-bold text-navy">{provider.label}</h4><p className="text-[10px] text-muted-foreground">{provider.value}</p></div></div>
                  <StatusChip label={connected ? "Connected" : integration ? integration.connection_status?.toUpperCase() : "Off"} color={connected ? "green" : "gray"} size="xs" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">{integration?.is_mock ? "Mock adapter (belum terhubung ke provider)" : "Belum dikonfigurasi"}</p>
                <button className="w-full h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-navy transition-colors">{connected ? "Manage" : "Connect"}</button>
              </div>
            );
          })}
        </div>
      )}

      {tab === "team" && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          {members.length === 0 ? <EmptyState icon={Users} title="Belum ada anggota" description="Invite anggota tim untuk berkolaborasi." /> :
            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy to-navy-400 text-white flex items-center justify-center text-xs font-bold">{member.user_name?.charAt(0) || "?"}</div>
                    <div><p className="text-sm font-semibold text-navy">{member.user_name || member.user_email}</p><p className="text-xs text-muted-foreground">{member.user_email}</p></div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRoleColor(member.role)}`}>{EVOLIS_ROLES.find((r) => r.id === member.role)?.label || member.role}</span>
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
}