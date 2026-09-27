import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Check, X, AlertTriangle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import { RISK_LEVELS, APPROVAL_STATES } from "@/lib/evolis/governance";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import ApprovalCard from "@/components/evolis/shared/ApprovalCard";
import EmptyState from "@/components/evolis/shared/EmptyState";

export default function EvolisGovernance() {
  const { workspaceId } = useWorkspace();
  const [approvals, setApprovals] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("approvals");

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try {
      const [apps, logs] = await Promise.all([
        base44.entities.ApprovalRequest.filter({ workspace_id: workspaceId }, "-created_date"),
        base44.entities.AuditLog.filter({ workspace_id: workspaceId }, "-created_date", 20),
      ]);
      setApprovals(apps);
      setAuditLogs(logs);
    } catch (err) {} finally { setLoading(false); }
  }

  const handleApprove = async (req) => {
    await base44.entities.ApprovalRequest.update(req.id, { status: "approved", reviewer_id: "current" });
    loadData();
  };
  const handleReject = async (req) => {
    await base44.entities.ApprovalRequest.update(req.id, { status: "rejected" });
    loadData();
  };
  const handleRevise = async (req) => {
    await base44.entities.ApprovalRequest.update(req.id, { status: "revision_requested" });
    loadData();
  };

  const pendingCount = approvals.filter((a) => a.status === "pending").length;

  if (loading) return <div className="text-sm text-muted-foreground p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Governance" }]} />
      <div>
        <h1 className="text-xl font-bold text-navy">Governance & Approval</h1>
        <p className="text-sm text-muted-foreground">Audit trail, approval workflow, dan risk management</p>
      </div>

      {/* Risk Levels Info */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(RISK_LEVELS).map(([key, level]) => (
          <div key={key} className={`rounded-xl border p-3 ${level.color}`}>
            <div className="flex items-center gap-1.5 mb-1"><ShieldCheck className="w-3.5 h-3.5" /><span className="text-xs font-bold">{level.label}</span></div>
            <p className="text-[10px] leading-tight opacity-80">{level.description}</p>
            <div className="mt-1.5 text-[9px] font-semibold opacity-60">{level.autoExecutable ? "Auto-executable" : level.requiresApproval ? "Approval required" : ""}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button onClick={() => setTab("approvals")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === "approvals" ? "bg-navy text-white" : "bg-white border border-gray-200 text-muted-foreground"}`}>
          Approvals {pendingCount > 0 && `(${pendingCount})`}
        </button>
        <button onClick={() => setTab("audit")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${tab === "audit" ? "bg-navy text-white" : "bg-white border border-gray-200 text-muted-foreground"}`}>
          Audit Log
        </button>
      </div>

      {tab === "approvals" ? (
        approvals.length === 0 ? <EmptyState icon={ShieldCheck} title="Belum ada approval request" description="Approval akan muncul ketika ada aksi yang membutuhkan persetujuan." /> :
        <div className="grid sm:grid-cols-2 gap-4">
          {approvals.map((req) => (
            <ApprovalCard key={req.id} request={req} onApprove={handleApprove} onReject={handleReject} onRevise={handleRevise} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          {auditLogs.length === 0 ? <EmptyState icon={Clock} title="Audit log kosong" description="Semua aktivitas akan tercatat di sini." /> :
            <div className="space-y-2">
              {auditLogs.map((log, i) => (
                <motion.div key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${log.status === "success" ? "bg-green-50 text-green-600" : log.status === "failed" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-600"}`}>
                    {log.status === "success" ? <Check className="w-3.5 h-3.5" /> : log.status === "failed" ? <X className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy"><span className="font-semibold">{log.actor_name || "System"}</span> {log.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{log.entity_type} • {log.entity_name}</p>
                  </div>
                  <StatusChip label={log.risk_level?.toUpperCase()} color={log.risk_level === "low" ? "green" : log.risk_level === "medium" ? "amber" : log.risk_level === "high" ? "blue" : "red"} size="xs" />
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{log.created_date ? new Date(log.created_date).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : ""}</span>
                </motion.div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
}