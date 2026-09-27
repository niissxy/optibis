import React from "react";
import { Check, X, AlertTriangle, Clock } from "lucide-react";
import StatusChip from "./StatusChip";

export default function ApprovalCard({ request, onApprove, onReject, onRevise }) {
  const riskColors = {
    low: "green",
    medium: "amber",
    high: "blue",
    critical: "red",
  };

  const statusIcons = {
    pending: <Clock className="w-3.5 h-3.5" />,
    approved: <Check className="w-3.5 h-3.5" />,
    rejected: <X className="w-3.5 h-3.5" />,
    revision_requested: <AlertTriangle className="w-3.5 h-3.5" />,
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-navy truncate">{request.entity_name || "Untitled"}</h4>
          <p className="text-xs text-muted-foreground truncate">{request.action}</p>
        </div>
        <StatusChip label={request.risk_level?.toUpperCase()} color={riskColors[request.risk_level] || "gray"} size="xs" />
      </div>

      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
        {statusIcons[request.status]}
        <span className="capitalize">{request.status?.replace(/_/g, " ")}</span>
        <span className="text-gray-300">•</span>
        <span>{request.requested_by_name || "System"}</span>
      </div>

      {request.comments && (
        <p className="text-xs text-muted-foreground bg-slate-50 rounded-lg p-2 mb-3">{request.comments}</p>
      )}

      {request.status === "pending" && (
        <div className="flex gap-2">
          <button
            onClick={() => onApprove?.(request)}
            className="flex-1 flex items-center justify-center gap-1 h-7 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 text-xs font-semibold transition-colors"
          >
            <Check className="w-3 h-3" /> Approve
          </button>
          <button
            onClick={() => onRevise?.(request)}
            className="flex-1 flex items-center justify-center gap-1 h-7 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 text-xs font-semibold transition-colors"
          >
            <AlertTriangle className="w-3 h-3" /> Revise
          </button>
          <button
            onClick={() => onReject?.(request)}
            className="flex-1 flex items-center justify-center gap-1 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 text-xs font-semibold transition-colors"
          >
            <X className="w-3 h-3" /> Reject
          </button>
        </div>
      )}
    </div>
  );
}