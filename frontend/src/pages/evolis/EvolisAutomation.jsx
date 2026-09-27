import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Plus, Trash2, X, Play, Pause } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import EmptyState from "@/components/evolis/shared/EmptyState";
import { Button } from "@/components/ui/button";

const TRIGGERS = [
  { value: "new_lead_submitted", label: "New Lead Submitted" },
  { value: "lead_score_changed", label: "Lead Score Changed" },
  { value: "campaign_started", label: "Campaign Started" },
  { value: "asset_approved", label: "Asset Approved" },
  { value: "publishing_failed", label: "Publishing Failed" },
  { value: "conversion_dropped", label: "Conversion Dropped" },
  { value: "cta_underperformed", label: "CTA Underperformed" },
  { value: "lead_follow_up_overdue", label: "Lead Follow-up Overdue" },
];

export default function EvolisAutomation() {
  const { workspaceId } = useWorkspace();
  const [automations, setAutomations] = useState([]);
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", trigger: "new_lead_submitted", risk_level: "medium", enabled: false });

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try {
      const [autos, autoRuns] = await Promise.all([
        base44.entities.Automation.filter({ workspace_id: workspaceId }, "-created_date"),
        base44.entities.AutomationRun.filter({ workspace_id: workspaceId }, "-created_date", 10),
      ]);
      setAutomations(autos);
      setRuns(autoRuns);
    } catch (err) {} finally { setLoading(false); }
  }

  const handleSave = async () => {
    try {
      await base44.entities.Automation.create({ ...form, workspace_id: workspaceId, success_count: 0, failure_count: 0 });
      setShowForm(false);
      setForm({ name: "", description: "", trigger: "new_lead_submitted", risk_level: "medium", enabled: false });
      loadData();
    } catch (err) {}
  };

  const toggleEnabled = async (auto) => {
    await base44.entities.Automation.update(auto.id, { enabled: !auto.enabled });
    loadData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus automation?")) return;
    await base44.entities.Automation.delete(id);
    loadData();
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Automation" }]} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-navy">Automation Engine</h1><p className="text-sm text-muted-foreground">Trigger dan aksi otomatis</p></div>
        <Button onClick={() => setShowForm(true)} className="bg-magenta hover:bg-magenta-500 text-white rounded-full"><Plus className="w-4 h-4" /> Tambah Automation</Button>
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> :
        automations.length === 0 ? <EmptyState icon={Zap} title="Belum ada automation" description="Buat automation rule untuk otomatisasi tindakan." /> :
        <div className="space-y-3">
          {automations.map((auto, i) => (
            <motion.div key={auto.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${auto.enabled ? "bg-green-50 text-green-600" : "bg-slate-100 text-muted-foreground"}`}><Zap className="w-4 h-4" /></div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-navy truncate">{auto.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Trigger: {TRIGGERS.find((t) => t.value === auto.trigger)?.label || auto.trigger}</span>
                    <StatusChip label={auto.risk_level} color={auto.risk_level === "low" ? "green" : auto.risk_level === "medium" ? "amber" : "red"} size="xs" />
                    {auto.success_count > 0 && <span>• {auto.success_count} sukses</span>}
                    {auto.failure_count > 0 && <span>• {auto.failure_count} gagal</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleEnabled(auto)} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${auto.enabled ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-slate-100 text-muted-foreground hover:bg-slate-200"}`}>
                  {auto.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={() => handleDelete(auto.id)} className="w-9 h-9 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      }

      {runs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-navy mb-3">Recent Automation Runs</h3>
          <div className="space-y-2">
            {runs.map((run) => (
              <div key={run.id} className="flex items-center gap-2 text-xs">
                <StatusChip label={run.status} color={run.status === "success" ? "green" : run.status === "failed" ? "red" : "gray"} size="xs" />
                <span className="text-navy">{run.automation_name}</span>
                {run.error_message && <span className="text-red-500">• {run.error_message}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-navy">Tambah Automation</h3><button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-navy" /></button></div>
            <div className="space-y-3">
              <input type="text" placeholder="Nama Automation" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta resize-none" />
              <select value={form.trigger} onChange={(e) => setForm({ ...form, trigger: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {TRIGGERS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <select value={form.risk_level} onChange={(e) => setForm({ ...form, risk_level: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                <option value="low">Low Risk</option><option value="medium">Medium Risk</option><option value="high">High Risk</option><option value="critical">Critical Risk</option>
              </select>
              <Button onClick={handleSave} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full">Simpan</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}