import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarClock, Trash2, Edit3, X, Copy, Check, AlertCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import EmptyState from "@/components/evolis/shared/EmptyState";
import { Button } from "@/components/ui/button";

const PUBLISHING_STATUSES = ["waiting", "awaiting_approval", "approved", "scheduled", "publishing", "published", "failed", "cancelled"];
const statusColors = { waiting: "gray", awaiting_approval: "amber", approved: "green", scheduled: "teal", publishing: "blue", published: "green", failed: "red", cancelled: "gray" };

export default function EvolisPublishing() {
  const { workspaceId } = useWorkspace();
  const [jobs, setJobs] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [copied, setCopied] = useState(null);
  const [form, setForm] = useState({ asset_id: "", asset_title: "", channel: "", scheduled_date: "", scheduled_time: "09:00", publishing_method: "copy_ready", status: "waiting" });

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try {
      const [j, a] = await Promise.all([
        base44.entities.PublishingJob.filter({ workspace_id: workspaceId }, "-scheduled_date"),
        base44.entities.Asset.filter({ workspace_id: workspaceId }, "-created_date"),
      ]);
      setJobs(j);
      setAssets(a);
    } catch (err) {} finally { setLoading(false); }
  }

  const handleSave = async () => {
    try {
      const asset = assets.find((a) => a.id === form.asset_id);
      const payload = { ...form, asset_title: asset?.title || form.asset_title };
      if (editing) await base44.entities.PublishingJob.update(editing.id, payload);
      else await base44.entities.PublishingJob.create({ ...payload, workspace_id: workspaceId });
      setShowForm(false); setEditing(null);
      setForm({ asset_id: "", asset_title: "", channel: "", scheduled_date: "", scheduled_time: "09:00", publishing_method: "copy_ready", status: "waiting" });
      loadData();
    } catch (err) {}
  };

  const copyContent = (job) => {
    navigator.clipboard.writeText(job.content_preview || "No preview");
    setCopied(job.id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Publishing" }]} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-navy">Publishing Queue</h1><p className="text-sm text-muted-foreground">Jadwalkan dan distribusikan aset</p></div>
        <Button onClick={() => { setShowForm(true); setEditing(null); }} className="bg-magenta hover:bg-magenta-500 text-white rounded-full"><CalendarClock className="w-4 h-4" /> Tambah Job</Button>
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> :
        jobs.length === 0 ? <EmptyState icon={CalendarClock} title="Publishing queue kosong" description="Tambahkan asset ke queue untuk dijadwalkan." /> :
        <div className="space-y-3">
          {jobs.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0"><CalendarClock className="w-4 h-4 text-navy" /></div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-navy truncate">{job.asset_title || "Untitled Asset"}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{job.channel || "No channel"}</span>
                      {job.scheduled_date && <span>• {job.scheduled_date} {job.scheduled_time}</span>}
                      <span>• {job.publishing_method?.replace(/_/g, " ")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusChip label={job.status?.toUpperCase()} color={statusColors[job.status] || "gray"} size="xs" />
                  {job.publishing_method === "copy_ready" && (
                    <button onClick={() => copyContent(job)} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                      {copied === job.id ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                    </button>
                  )}
                  <button onClick={() => { setEditing(job); setForm(job); setShowForm(true); }} className="text-xs text-blue-600 hover:underline"><Edit3 className="w-3 h-3" /></button>
                  <button onClick={async () => { if (confirm("Hapus?")) { await base44.entities.PublishingJob.delete(job.id); loadData(); } }} className="text-xs text-red-500 hover:underline"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
              {job.error_message && (
                <div className="flex items-center gap-2 mt-2 bg-red-50 rounded-lg p-2"><AlertCircle className="w-3 h-3 text-red-500" /><span className="text-xs text-red-600">{job.error_message}</span></div>
              )}
              {job.publishing_method === "copy_ready" && job.content_preview && (
                <div className="mt-2 bg-slate-50 rounded-lg p-2"><p className="text-xs text-navy whitespace-pre-wrap line-clamp-3">{job.content_preview}</p></div>
              )}
            </motion.div>
          ))}
        </div>
      }

      {showForm && (
        <div className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-navy">{editing ? "Edit Job" : "Tambah Publishing Job"}</h3><button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-navy" /></button></div>
            <div className="space-y-3">
              <select value={form.asset_id} onChange={(e) => setForm({ ...form, asset_id: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                <option value="">Pilih Asset...</option>
                {assets.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
              </select>
              <input type="text" placeholder="Channel" value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.scheduled_date} onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
                <input type="time" value={form.scheduled_time} onChange={(e) => setForm({ ...form, scheduled_time: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              </div>
              <select value={form.publishing_method} onChange={(e) => setForm({ ...form, publishing_method: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                <option value="copy_ready">Copy Ready (manual)</option>
                <option value="export">Export</option>
                <option value="manual">Manual</option>
                <option value="auto">Auto (requires integration)</option>
              </select>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {PUBLISHING_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
              </select>
              <Button onClick={handleSave} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full">{editing ? "Update" : "Simpan"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}