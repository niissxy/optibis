import React from "react";
import { motion } from "framer-motion";
import { Dna, Radar, Target, FileText, Send, Activity, BarChart3, RefreshCw, Expand } from "lucide-react";

const LOOP_NODES = [
  { id: "dna", label: "DNA", icon: Dna, color: "bg-purple-50 text-purple-600" },
  { id: "signal", label: "Signal", icon: Radar, color: "bg-blue-50 text-blue-600" },
  { id: "opportunity", label: "Opportunity", icon: Target, color: "bg-amber-50 text-amber-600" },
  { id: "asset", label: "Asset", icon: FileText, color: "bg-teal-50 text-teal-600" },
  { id: "distribution", label: "Distribution", icon: Send, color: "bg-cyan-50 text-cyan-600" },
  { id: "response", label: "Response", icon: Activity, color: "bg-green-50 text-green-600" },
  { id: "measurement", label: "Measurement", icon: BarChart3, color: "bg-indigo-50 text-indigo-600" },
  { id: "optimization", label: "Optimization", icon: RefreshCw, color: "bg-magenta-50 text-magenta" },
  { id: "expansion", label: "Expansion", icon: Expand, color: "bg-navy-50 text-navy" },
];

export default function GrowthLoopVisualizer({ nodeStatuses = {}, nodeActivity = {} }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-navy">Growth Loop</h3>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Living System</span>
      </div>
      <div className="relative flex flex-wrap items-center justify-center gap-2">
        {LOOP_NODES.map((node, i) => {
          const Icon = node.icon;
          const status = nodeStatuses[node.id] || "idle";
          const activity = nodeActivity[node.id] || 0;

          return (
            <React.Fragment key={node.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center"
              >
                <div className={`relative w-12 h-12 rounded-xl ${node.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                  {status === "active" && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400">
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                    </span>
                  )}
                  {status === "bottleneck" && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-400" />
                  )}
                </div>
                <span className="text-[9px] font-medium text-navy mt-1">{node.label}</span>
                {activity > 0 && (
                  <span className="text-[8px] text-muted-foreground">{activity}</span>
                )}
              </motion.div>
              {i < LOOP_NODES.length - 1 && (
                <div className="w-4 h-px bg-gradient-to-r from-gray-200 to-gray-300 hidden sm:block" />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400" /> Active
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400" /> Bottleneck
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-300" /> Idle
        </span>
      </div>
    </div>
  );
}