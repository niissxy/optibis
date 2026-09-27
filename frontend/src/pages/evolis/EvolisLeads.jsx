import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, Trash2, Edit3, X, Phone, Mail, MessageCircle, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import { getScoreCategory } from "@/lib/evolis/scoring";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import EmptyState from "@/components/evolis/shared/EmptyState";
import { Button } from "@/components/ui/button";

const LEAD_STATUSES = ["new", "cold", "engaged", "warm", "qualified", "proposal_sent", "negotiation", "won", "lost", "dormant", "reactivated"];
const statusColors = { new: "blue", cold: "gray", engaged: "blue", warm: "amber", qualified: "green", proposal_sent: "purple", negotiation: "purple", won: "green", lost: "red", dormant: "gray", reactivated: "blue" };

export default function EvolisLeads() {
  const { workspaceId } = useWorkspace();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ nama: "", whatsapp: "", email: "", nama_bisnis: "", company: "", city: "", industri: "", product_interest: "", kebutuhan: "", pilar: "Belum Tahu", budget: "", timeline: "", lead_status: "new", lead_score: 0, next_follow_up: "", notes: "" });

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try { setLeads(await base44.entities.Lead.filter({ workspace_id: workspaceId }, "-created_date")); }
    catch (err) {} finally { setLoading(false); }
  }

  const handleSave = async () => {
    try {
      const category = getScoreCategory(Number(form.lead_score) || 0);
      const payload = { ...form, lead_score: Number(form.lead_score) || 0, lead_category: category?.value || "cold", workspace_id: workspaceId };
      if (editing) await base44.entities.Lead.update(editing.id, payload);
      else await base44.entities.Lead.create(payload);
      setShowForm(false); setEditing(null);
      setForm({ nama: "", whatsapp: "", email: "", nama_bisnis: "", company: "", city: "", industri: "", product_interest: "", kebutuhan: "", pilar: "Belum Tahu", budget: "", timeline: "", lead_status: "new", lead_score: 0, next_follow_up: "", notes: "" });
      loadData();
    } catch (err) {}
  };

  const filteredLeads = filter === "all" ? leads : leads.filter((l) => l.lead_status === filter);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Leads" }]} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-navy">Leads CRM</h1><p className="text-sm text-muted-foreground">Kelola dan skor lead</p></div>
        <Button onClick={() => { setShowForm(true); setEditing(null); }} className="bg-magenta hover:bg-magenta-500 text-white rounded-full"><UserPlus className="w-4 h-4" /> Tambah Lead</Button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${filter === "all" ? "bg-navy text-white" : "bg-white text-muted-foreground border border-gray-200"}`}>Semua ({leads.length})</button>
        {LEAD_STATUSES.map((s) => {
          const count = leads.filter((l) => l.lead_status === s).length;
          if (count === 0) return null;
          return <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${filter === s ? "bg-navy text-white" : "bg-white text-muted-foreground border border-gray-200"}`}>{s.replace(/_/g, " ")} ({count})</button>;
        })}
      </div>

      {loading ? <div className="text-sm text-muted-foreground">Loading...</div> :
        filteredLeads.length === 0 ? <EmptyState icon={UserPlus} title="Belum ada lead" description="Lead dari form konsultasi website akan muncul di sini." /> :
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead, i) => {
            const cat = getScoreCategory(lead.lead_score || 0);
            return (
              <motion.div key={lead.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy to-navy-400 text-white flex items-center justify-center text-xs font-bold shrink-0">{lead.nama?.charAt(0) || "?"}</div>
                    <div className="min-w-0"><h4 className="text-sm font-bold text-navy truncate">{lead.nama}</h4><p className="text-[10px] text-muted-foreground truncate">{lead.company || lead.nama_bisnis || lead.industri}</p></div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3 h-3 text-amber-400" />
                    <span className="text-xs font-bold text-navy">{lead.lead_score || 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <StatusChip label={lead.lead_status?.replace(/_/g, " ")} color={statusColors[lead.lead_status] || "gray"} size="xs" />
                  {cat && <StatusChip label={cat.label} color="gray" size="xs" />}
                </div>
                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  {lead.whatsapp && <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.whatsapp}</div>}
                  {lead.email && <div className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</div>}
                  {lead.pilar && lead.pilar !== "Belum Tahu" && <div className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {lead.pilar}</div>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(lead); setForm(lead); setShowForm(true); }} className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Edit3 className="w-3 h-3" /> Edit</button>
                  {lead.whatsapp && <a href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-green-600 hover:underline"><MessageCircle className="w-3 h-3" /> WhatsApp</a>}
                  <button onClick={async () => { if (confirm("Hapus?")) { await base44.entities.Lead.delete(lead.id); loadData(); } }} className="flex items-center gap-1 text-xs text-red-500 hover:underline ml-auto"><Trash2 className="w-3 h-3" /></button>
                </div>
              </motion.div>
            );
          })}
        </div>
      }

      {showForm && (
        <div className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-navy">{editing ? "Edit Lead" : "Tambah Lead"}</h3><button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-navy" /></button></div>
            <div className="space-y-3">
              <input type="text" placeholder="Nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="WhatsApp" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Nama Bisnis" value={form.nama_bisnis} onChange={(e) => setForm({ ...form, nama_bisnis: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Industri" value={form.industri} onChange={(e) => setForm({ ...form, industri: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Product Interest" value={form.product_interest} onChange={(e) => setForm({ ...form, product_interest: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.pilar} onChange={(e) => setForm({ ...form, pilar: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {["Digital Asset", "Website", "Digital Growth Team", "Total Solution", "Belum Tahu"].map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <input type="text" placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="number" placeholder="Lead Score (0-100)" value={form.lead_score} onChange={(e) => setForm({ ...form, lead_score: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.lead_status} onChange={(e) => setForm({ ...form, lead_status: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
              </select>
              <input type="date" value={form.next_follow_up} onChange={(e) => setForm({ ...form, next_follow_up: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta resize-none" />
              <Button onClick={handleSave} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full">{editing ? "Update" : "Simpan"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}