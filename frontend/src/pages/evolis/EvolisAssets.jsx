import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, FileText, Sparkles, Trash2, Edit3, X, Eye } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import { ASSET_TYPES, ASSET_LIFECYCLE } from "@/data/evolis/assetTypes";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import EmptyState from "@/components/evolis/shared/EmptyState";
import AIGenerationDrawer from "@/components/evolis/ai/AIGenerationDrawer";
import { Button } from "@/components/ui/button";

export default function EvolisAssets() {
  const { workspaceId } = useWorkspace();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState({ title: "", type: "article", content: "", campaign_name: "", product_name: "", channel: "", funnel_stage: "awareness", cta: "", publishing_status: "draft" });

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try { setAssets(await base44.entities.Asset.filter({ workspace_id: workspaceId }, "-created_date")); }
    catch (err) {} finally { setLoading(false); }
  }

  const handleSave = async () => {
    try {
      if (editing) await base44.entities.Asset.update(editing.id, { ...form });
      else await base44.entities.Asset.create({ ...form, workspace_id: workspaceId });
      setShowForm(false); setEditing(null);
      setForm({ title: "", type: "article", content: "", campaign_name: "", product_name: "", channel: "", funnel_stage: "awareness", cta: "", publishing_status: "draft" });
      loadData();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus asset ini?")) return;
    await base44.entities.Asset.delete(id);
    loadData();
  };

  const getLifecycleChip = (status) => {
    const lc = ASSET_LIFECYCLE.find((l) => l.value === status);
    return <StatusChip label={lc?.label || status} color="gray" size="xs" />;
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Assets" }]} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-navy">Assets</h1><p className="text-sm text-muted-foreground">Generate dan kelola aset digital</p></div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAI(true)} variant="outline" className="rounded-full border-magenta/20 text-magenta hover:bg-magenta-50">
            <Sparkles className="w-4 h-4" /> AI Generate
          </Button>
          <Button onClick={() => { setShowForm(true); setEditing(null); }} className="bg-magenta hover:bg-magenta-500 text-white rounded-full"><Plus className="w-4 h-4" /> Tambah Asset</Button>
        </div>
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> :
        assets.length === 0 ? <EmptyState icon={FileText} title="Belum ada asset" description="Generate aset pertama menggunakan AI atau buat manual." action={<Button onClick={() => setShowAI(true)} className="bg-magenta text-white rounded-full"><Sparkles className="w-4 h-4" /> Generate dengan AI</Button>} /> :
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset, i) => {
            const typeInfo = ASSET_TYPES.find((t) => t.value === asset.type);
            return (
              <motion.div key={asset.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-navy" /></div>
                    <div className="min-w-0"><h4 className="text-sm font-bold text-navy truncate">{asset.title}</h4><p className="text-[10px] text-muted-foreground">{typeInfo?.label || asset.type}</p></div>
                  </div>
                  {asset.quality_score > 0 && <span className={`text-xs font-bold ${asset.quality_score >= 75 ? "text-green-600" : asset.quality_score >= 60 ? "text-amber-600" : "text-red-500"}`}>{asset.quality_score}</span>}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{asset.content?.substring(0, 100) || "No content"}</p>
                <div className="flex items-center gap-2 mb-3">{getLifecycleChip(asset.publishing_status)}</div>
                <div className="flex gap-2">
                  <button onClick={() => setViewing(asset)} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Eye className="w-3 h-3" /> View</button>
                  <button onClick={() => { setEditing(asset); setForm(asset); setShowForm(true); }} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Edit3 className="w-3 h-3" /> Edit</button>
                  <button onClick={() => handleDelete(asset.id)} className="flex items-center gap-1 text-xs text-red-500 hover:underline"><Trash2 className="w-3 h-3" /> Delete</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      }

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setViewing(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-navy">{viewing.title}</h3><button onClick={() => setViewing(null)}><X className="w-4 h-4 text-navy" /></button></div>
            <div className="prose prose-sm max-w-none"><pre className="whitespace-pre-wrap text-sm text-navy">{viewing.content}</pre></div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-navy">{editing ? "Edit Asset" : "Tambah Asset"}</h3><button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-navy" /></button></div>
            <div className="space-y-3">
              <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {ASSET_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <textarea placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta resize-none" />
              <input type="text" placeholder="Campaign Name" value={form.campaign_name} onChange={(e) => setForm({ ...form, campaign_name: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Product Name" value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Channel" value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="CTA" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.funnel_stage} onChange={(e) => setForm({ ...form, funnel_stage: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {["awareness", "interest", "consideration", "decision", "action", "retention"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={form.publishing_status} onChange={(e) => setForm({ ...form, publishing_status: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {ASSET_LIFECYCLE.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
              <Button onClick={handleSave} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full">{editing ? "Update" : "Simpan"}</Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Generation Drawer */}
      <AIGenerationDrawer
        isOpen={showAI}
        onClose={() => setShowAI(false)}
        workspaceId={workspaceId}
        onGenerated={(result, generation, qualityResult) => {
          if (generation && qualityResult) {
            base44.entities.Asset.create({
              workspace_id: workspaceId,
              title: `AI Asset ${new Date().toLocaleString("id-ID")}`,
              type: "article",
              content: typeof result === "string" ? result : JSON.stringify(result),
              ai_generation_id: generation.id,
              ai_model: generation.model,
              quality_score: qualityResult.score,
              quality_details: qualityResult.details,
              publishing_status: "generated",
              compliance_status: qualityResult.score >= 75 ? "compliant" : "warning",
            }).then(() => loadData());
          }
        }}
      />
    </div>
  );
}