import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { KanbanSquare, ArrowRight, X, DollarSign } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import EmptyState from "@/components/evolis/shared/EmptyState";

const STAGES = [
  { value: "new", label: "New", color: "border-t-blue-400" },
  { value: "engaged", label: "Engaged", color: "border-t-cyan-400" },
  { value: "warm", label: "Warm", color: "border-t-amber-400" },
  { value: "qualified", label: "Qualified", color: "border-t-green-400" },
  { value: "proposal_sent", label: "Proposal", color: "border-t-purple-400" },
  { value: "negotiation", label: "Negotiation", color: "border-t-magenta" },
  { value: "won", label: "Won", color: "border-t-emerald-500" },
  { value: "lost", label: "Lost", color: "border-t-red-400" },
];

export default function EvolisPipeline() {
  const { workspaceId } = useWorkspace();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moving, setMoving] = useState(null);

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try { setLeads(await base44.entities.Lead.filter({ workspace_id: workspaceId }, "-created_date")); }
    catch (err) {} finally { setLoading(false); }
  }

  const handleMove = async (leadId, newStage) => {
    setMoving(leadId);
    try {
      await base44.entities.Lead.update(leadId, { lead_status: newStage });
      await base44.entities.LeadActivity.create({
        workspace_id: workspaceId,
        lead_id: leadId,
        activity_type: "status_change",
        description: `Status diubah ke ${newStage}`,
        actor_type: "user",
      });
      loadData();
    } catch (err) {} finally { setMoving(null); }
  };

  const formatCurrency = (val) => val ? `Rp ${(val / 1000000).toFixed(1)}jt` : "-";

  if (loading) return <div className="text-sm text-muted-foreground p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Pipeline" }]} />
      <div>
        <h1 className="text-xl font-bold text-navy">Sales Pipeline</h1>
        <p className="text-sm text-muted-foreground">Pindahkan lead antar stage</p>
      </div>

      {leads.length === 0 ? (
        <EmptyState icon={KanbanSquare} title="Pipeline kosong" description="Lead akan muncul di sini sebagai kanban." />
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageLeads = leads.filter((l) => (l.lead_status || "new") === stage.value);
            return (
              <div key={stage.value} className={`w-64 shrink-0 bg-white rounded-xl border border-gray-100 border-t-4 ${stage.color} overflow-hidden`}>
                <div className="px-3 py-2.5 border-b border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-navy">{stage.label}</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 px-1.5 py-0.5 rounded-full">{stageLeads.length}</span>
                </div>
                <div className="p-2 space-y-2 min-h-[100px]">
                  {stageLeads.map((lead) => (
                    <motion.div key={lead.id} layout className="bg-slate-50 rounded-lg p-2.5 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-navy truncate">{lead.nama}</h4>
                        <span className="text-[10px] font-bold text-amber-600">{lead.lead_score || 0}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate mb-1.5">{lead.company || lead.industri || lead.nama_bisnis}</p>
                      {lead.opportunity_value > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-green-600 mb-1.5"><DollarSign className="w-2.5 h-2.5" /> {formatCurrency(lead.opportunity_value)}</div>
                      )}
                      <select
                        value={lead.lead_status || "new"}
                        onChange={(e) => handleMove(lead.id, e.target.value)}
                        disabled={moving === lead.id}
                        className="w-full h-6 px-1 rounded border border-gray-200 text-[10px] text-navy bg-white outline-none focus:border-magenta disabled:opacity-50"
                      >
                        {STAGES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </motion.div>
                  ))}
                  {stageLeads.length === 0 && <p className="text-[10px] text-muted-foreground text-center py-3">Kosong</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}