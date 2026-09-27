import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Megaphone, Trash2, Edit3, X, Calendar, Users as UsersIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import EmptyState from "@/components/evolis/shared/EmptyState";
import { Button } from "@/components/ui/button";

const CAMPAIGN_STATUSES = ["draft", "planning", "awaiting_approval", "approved", "scheduled", "active", "paused", "completed", "archived"];

export default function EvolisCampaigns() {
  const { workspaceId } = useWorkspace();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", objective: "", product_name: "", audience_name: "", funnel_stage: "awareness", channel: "", start_date: "", end_date: "", brief: "", angle: "", message: "", pain_point: "", promise: "", cta: "", status: "draft", priority: "medium" });

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try { setCampaigns(await base44.entities.Campaign.filter({ workspace_id: workspaceId }, "-created_date")); }
    catch (err) {} finally { setLoading(false); }
  }

  const handleSave = async () => {
    try {
      if (editing) await base44.entities.Campaign.update(editing.id, { ...form });
      else await base44.entities.Campaign.create({ ...form, workspace_id: workspaceId });
      setShowForm(false); setEditing(null);
      setForm({ name: "", objective: "", product_name: "", audience_name: "", funnel_stage: "awareness", channel: "", start_date: "", end_date: "", brief: "", angle: "", message: "", pain_point: "", promise: "", cta: "", status: "draft", priority: "medium" });
      loadData();
    } catch (err) {}
  };

  const statusColors = { active: "green", paused: "amber", draft: "gray", completed: "blue", planning: "blue", awaiting_approval: "amber", approved: "green", scheduled: "teal", archived: "gray" };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Campaigns" }]} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-navy">Campaigns</h1><p className="text-sm text-muted-foreground">Kelola kampanye pemasaran</p></div>
        <Button onClick={() => { setShowForm(true); setEditing(null); }} className="bg-magenta hover:bg-magenta-500 text-white rounded-full"><Plus className="w-4 h-4" /> Tambah Campaign</Button>
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> :
        campaigns.length === 0 ? <EmptyState icon={Megaphone} title="Belum ada campaign" description="Buat kampanye pertama untuk mulai mendistribusikan aset." /> :
        <div className="grid sm:grid-cols-2 gap-4">
          {campaigns.map((camp, i) => (
            <motion.div key={camp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div><h4 className="text-sm font-bold text-navy">{camp.name}</h4><p className="text-xs text-muted-foreground">{camp.objective || "No objective"}</p></div>
                <StatusChip label={camp.status?.toUpperCase()} color={statusColors[camp.status] || "gray"} size="xs" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                {camp.product_name && <span>Product: <strong className="text-navy">{camp.product_name}</strong></span>}
                {camp.audience_name && <span>Audience: <strong className="text-navy">{camp.audience_name}</strong></span>}
                {camp.channel && <span>Channel: <strong className="text-navy">{camp.channel}</strong></span>}
                {camp.funnel_stage && <span>Funnel: <strong className="text-navy">{camp.funnel_stage}</strong></span>}
              </div>
              {camp.brief && <p className="text-xs text-navy bg-slate-50 rounded-lg p-2 mb-3 line-clamp-2">{camp.brief}</p>}
              {(camp.start_date || camp.end_date) && (
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3" /> {camp.start_date || "TBD"} → {camp.end_date || "TBD"}
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => { setEditing(camp); setForm(camp); setShowForm(true); }} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Edit3 className="w-3 h-3" /> Edit</button>
                <button onClick={async () => { if (confirm("Hapus?")) { await base44.entities.Campaign.delete(camp.id); loadData(); } }} className="flex items-center gap-1 text-xs text-red-500 hover:underline"><Trash2 className="w-3 h-3" /> Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      }

      {showForm && (
        <div className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-navy">{editing ? "Edit Campaign" : "Tambah Campaign"}</h3><button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-navy" /></button></div>
            <div className="space-y-3">
              <input type="text" placeholder="Nama Campaign" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Objective" value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Product Name" value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Audience Name" value={form.audience_name} onChange={(e) => setForm({ ...form, audience_name: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.funnel_stage} onChange={(e) => setForm({ ...form, funnel_stage: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {["awareness", "interest", "consideration", "decision", "action", "retention"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="text" placeholder="Channel" value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
                <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              </div>
              <textarea placeholder="Brief" value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta resize-none" />
              <input type="text" placeholder="Angle" value={form.angle} onChange={(e) => setForm({ ...form, angle: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta resize-none" />
              <input type="text" placeholder="CTA" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {CAMPAIGN_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
              </select>
              <Button onClick={handleSave} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full">{editing ? "Update" : "Simpan"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}