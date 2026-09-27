import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, Zap, Target } from "lucide-react";
import StatusChip from "./StatusChip";

const URGENCY_COLORS = {
  low: "gray",
  medium: "blue",
  high: "amber",
  critical: "red",
};

const TYPE_ICONS = {
  create: Zap,
  update: Target,
  follow_up_lead: ArrowRight,
  strengthen_cta: Target,
};

export default function RecommendationCard({ rec, index = 0, onAccept, onReject, onSchedule }) {
  const Icon = TYPE_ICONS[rec.type] || AlertTriangle;
  const urgencyColor = URGENCY_COLORS[rec.urgency] || "gray";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-navy" />
          </div>
          <h4 className="text-sm font-bold text-navy truncate">{rec.title}</h4>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <StatusChip label={rec.urgency?.toUpperCase()} color={urgencyColor} size="xs" />
        </div>
      </div>

      {rec.problem && (
        <p className="text-xs text-muted-foreground mb-1.5">
          <span className="font-semibold">Masalah:</span> {rec.problem}
        </p>
      )}
      {rec.recommended_action && (
        <p className="text-xs text-navy mb-2">
          <span className="font-semibold text-muted-foreground">Aksi:</span> {rec.recommended_action}
        </p>
      )}
      {rec.expected_impact && (
        <p className="text-xs text-green-600 mb-2">
          <span className="font-semibold">Dampak:</span> {rec.expected_impact}
        </p>
      )}

      <div className="flex items-center gap-3 mb-3 text-[10px] text-muted-foreground">
        <span>Confidence: <strong className="text-navy">{rec.confidence || 0}%</strong></span>
        <span className="text-gray-300">•</span>
        <span>Risk: <strong className="text-navy">{rec.risk_level}</strong></span>
        {rec.auto_executable && (
          <>
            <span className="text-gray-300">•</span>
            <span className="text-green-600 font-semibold">Auto-executable</span>
          </>
        )}
      </div>

      {rec.status === "new" && (
        <div className="flex gap-2">
          <button
            onClick={() => onAccept?.(rec)}
            className="flex-1 h-7 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 text-xs font-semibold transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => onSchedule?.(rec)}
            className="flex-1 h-7 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition-colors"
          >
            Schedule
          </button>
          <button
            onClick={() => onReject?.(rec)}
            className="flex-1 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 text-xs font-semibold transition-colors"
          >
            Reject
          </button>
        </div>
      )}
      {rec.status !== "new" && (
        <StatusChip label={rec.status?.toUpperCase()} color="gray" size="xs" />
      )}
    </motion.div>
  );
}