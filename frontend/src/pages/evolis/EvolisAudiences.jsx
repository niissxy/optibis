import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Users, Trash2, Edit3, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import EmptyState from "@/components/evolis/shared/EmptyState";
import { Button } from "@/components/ui/button";

export default function EvolisAudiences() {
  const { workspaceId } = useWorkspace();
  const [audiences, setAudiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ persona_name: "", segment: "", industry: "", demographics: "", psychographics: "", pain_points: [], goals: [], objections: [], buying_triggers: [], preferred_channels: [], purchase_intent: "medium", status: "draft" });

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try { setAudiences(await base44.entities.Audience.filter({ workspace_id: workspaceId }, "-created_date")); }
    catch (err) {} finally { setLoading(false); }
  }

  const handleSave = async () => {
    try {
      if (editing) await base44.entities.Audience.update(editing.id, { ...form });
      else await base44.entities.Audience.create({ ...form, workspace_id: workspaceId });
      setShowForm(false); setEditing(null);
      setForm({ persona_name: "", segment: "", industry: "", demographics: "", psychographics: "", pain_points: [], goals: [], objections: [], buying_triggers: [], preferred_channels: [], purchase_intent: "medium", status: "draft" });
      loadData();
    } catch (err) {}
  };

  const parseArray = (val) => val.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Audiences" }]} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-navy">Audiences</h1><p className="text-sm text-muted-foreground">Persona & segmentasi target</p></div>
        <Button onClick={() => { setShowForm(true); setEditing(null); }} className="bg-magenta hover:bg-magenta-500 text-white rounded-full"><Plus className="w-4 h-4" /> Tambah Audience</Button>
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> :
        audiences.length === 0 ? <EmptyState icon={Users} title="Belum ada audience" description="Buat persona pertama untuk menargetkan konten yang tepat." /> :
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((aud, i) => (
            <motion.div key={aud.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Users className="w-4 h-4" /></div>
                  <h4 className="text-sm font-bold text-navy">{aud.persona_name}</h4>
                </div>
                <StatusChip label={aud.purchase_intent?.toUpperCase()} color={aud.purchase_intent === "urgent" ? "red" : aud.purchase_intent === "high" ? "amber" : "gray"} size="xs" />
              </div>
              <p className="text-xs text-muted-foreground mb-2">{aud.segment} • {aud.industry}</p>
              <p className="text-xs text-navy line-clamp-2">{aud.psychographics || aud.demographics}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setEditing(aud); setForm(aud); setShowForm(true); }} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Edit3 className="w-3 h-3" /> Edit</button>
                <button onClick={async () => { if (confirm("Hapus?")) { await base44.entities.Audience.delete(aud.id); loadData(); } }} className="flex items-center gap-1 text-xs text-red-500 hover:underline"><Trash2 className="w-3 h-3" /> Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      }

      {showForm && (
        <div className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-navy">{editing ? "Edit Audience" : "Tambah Audience"}</h3><button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-navy" /></button></div>
            <div className="space-y-3">
              <input type="text" placeholder="Persona Name" value={form.persona_name} onChange={(e) => setForm({ ...form, persona_name: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Segment" value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <textarea placeholder="Demographics" value={form.demographics} onChange={(e) => setForm({ ...form, demographics: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta resize-none" />
              <textarea placeholder="Psychographics" value={form.psychographics} onChange={(e) => setForm({ ...form, psychographics: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta resize-none" />
              <input type="text" placeholder="Pain Points (comma separated)" value={Array.isArray(form.pain_points) ? form.pain_points.join(", ") : ""} onChange={(e) => setForm({ ...form, pain_points: parseArray(e.target.value) })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Goals (comma separated)" value={Array.isArray(form.goals) ? form.goals.join(", ") : ""} onChange={(e) => setForm({ ...form, goals: parseArray(e.target.value) })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Buying Triggers (comma separated)" value={Array.isArray(form.buying_triggers) ? form.buying_triggers.join(", ") : ""} onChange={(e) => setForm({ ...form, buying_triggers: parseArray(e.target.value) })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.purchase_intent} onChange={(e) => setForm({ ...form, purchase_intent: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
              </select>
              <Button onClick={handleSave} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full">{editing ? "Update" : "Simpan"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}