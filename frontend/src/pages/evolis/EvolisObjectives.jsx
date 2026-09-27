import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Target, Trash2, Edit3, X, TrendingUp } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import { OBJECTIVE_TYPES } from "@/data/evolis/objectives";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import EmptyState from "@/components/evolis/shared/EmptyState";
import { Button } from "@/components/ui/button";

export default function EvolisObjectives() {
  const { workspaceId } = useWorkspace();
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", type: "lead_generation", target_metric: "", baseline: 0, target: 0, period: "", confidence: 50, data_source: "", status: "draft" });

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try { setObjectives(await base44.entities.Objective.filter({ workspace_id: workspaceId }, "-created_date")); }
    catch (err) {} finally { setLoading(false); }
  }

  const handleSave = async () => {
    try {
      const payload = { ...form, baseline: Number(form.baseline), target: Number(form.target), confidence: Number(form.confidence) };
      if (editing) await base44.entities.Objective.update(editing.id, payload);
      else await base44.entities.Objective.create({ ...payload, workspace_id: workspaceId });
      setShowForm(false); setEditing(null);
      setForm({ title: "", type: "lead_generation", target_metric: "", baseline: 0, target: 0, period: "", confidence: 50, data_source: "", status: "draft" });
      loadData();
    } catch (err) {}
  };

  const getProgress = (obj) => obj.target > 0 ? Math.min(100, Math.round((obj.current_progress / obj.target) * 100)) : 0;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Objectives" }]} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-navy">Objectives & KPI</h1><p className="text-sm text-muted-foreground">Target pertumbuhan dan metrik utama</p></div>
        <Button onClick={() => { setShowForm(true); setEditing(null); }} className="bg-magenta hover:bg-magenta-500 text-white rounded-full"><Plus className="w-4 h-4" /> Tambah Objective</Button>
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> :
        objectives.length === 0 ? <EmptyState icon={Target} title="Belum ada objective" description="Tetapkan target pertumbuhan untuk mengarahkan strategi." /> :
        <div className="grid sm:grid-cols-2 gap-4">
          {objectives.map((obj, i) => {
            const typeInfo = OBJECTIVE_TYPES.find((t) => t.value === obj.type);
            const progress = getProgress(obj);
            return (
              <motion.div key={obj.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div><h4 className="text-sm font-bold text-navy">{obj.title}</h4><p className="text-xs text-muted-foreground">{typeInfo?.label || obj.type}</p></div>
                  <StatusChip label={obj.status?.toUpperCase()} color={obj.status === "active" ? "green" : "gray"} size="xs" />
                </div>
                <div className="mb-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-2xl font-bold text-navy">{obj.current_progress || 0}</span>
                    <span className="text-xs text-muted-foreground">/ {obj.target} {obj.target_metric}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${progress >= 75 ? "bg-green-500" : progress >= 50 ? "bg-blue-500" : progress >= 25 ? "bg-amber-500" : "bg-red-400"}`} style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground">Progress: {progress}%</span>
                    <span className="text-[10px] text-muted-foreground">Confidence: {obj.confidence}%</span>
                  </div>
                </div>
                {obj.period && <p className="text-xs text-muted-foreground mb-2">Periode: {obj.period}</p>}
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(obj); setForm(obj); setShowForm(true); }} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Edit3 className="w-3 h-3" /> Edit</button>
                  <button onClick={async () => { if (confirm("Hapus?")) { await base44.entities.Objective.delete(obj.id); loadData(); } }} className="flex items-center gap-1 text-xs text-red-500 hover:underline"><Trash2 className="w-3 h-3" /> Delete</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      }

      {showForm && (
        <div className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-navy">{editing ? "Edit Objective" : "Tambah Objective"}</h3><button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-navy" /></button></div>
            <div className="space-y-3">
              <input type="text" placeholder="Judul Objective" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {OBJECTIVE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <input type="text" placeholder="Target Metric" value={form.target_metric} onChange={(e) => setForm({ ...form, target_metric: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Baseline" value={form.baseline} onChange={(e) => setForm({ ...form, baseline: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
                <input type="number" placeholder="Target" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              </div>
              <input type="text" placeholder="Periode (e.g. Q1 2026)" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Data Source" value={form.data_source} onChange={(e) => setForm({ ...form, data_source: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                <option value="draft">Draft</option><option value="active">Active</option><option value="completed">Completed</option><option value="paused">Paused</option>
              </select>
              <Button onClick={handleSave} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full">{editing ? "Update" : "Simpan"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}