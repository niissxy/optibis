import React from "react";
import { AlertTriangle, XCircle, Info, AlertOctagon } from "lucide-react";

const SEVERITY_CONFIG = {
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
  alert: { icon: AlertOctagon, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
  critical: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
};

export default function AlertBanner({ alerts = [] }) {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert, i) => {
        const config = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.info;
        const Icon = config.icon;
        return (
          <div
            key={i}
            className={`flex items-start gap-2.5 ${config.bg} ${config.border} border rounded-xl px-4 py-2.5`}
          >
            <Icon className={`w-4 h-4 ${config.color} shrink-0 mt-0.5`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-navy">{alert.title}</p>
              {alert.message && <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}