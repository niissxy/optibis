import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const colorMap = {
  navy: { bg: "bg-navy", text: "text-navy", light: "bg-navy-50" },
  magenta: { bg: "bg-magenta", text: "text-magenta", light: "bg-magenta-50" },
  amethyst: { bg: "bg-amethyst", text: "text-amethyst", light: "bg-amethyst-50" },
  teal: { bg: "bg-teal-500", text: "text-teal-600", light: "bg-teal-50" },
  green: { bg: "bg-green-500", text: "text-green-600", light: "bg-green-50" },
  amber: { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50" },
};

export default function KPICard({ label, value, sublabel, trend, trendValue, icon: Icon, color = "navy", index = 0 }) {
  const c = colorMap[color] || colorMap.navy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {Icon && (
          <div className={`w-7 h-7 rounded-lg ${c.light} flex items-center justify-center`}>
            <Icon className={`w-3.5 h-3.5 ${c.text}`} />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-navy">{value}</span>
        {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-1.5">
          {trend === "up" ? (
            <TrendingUp className="w-3 h-3 text-green-500" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-500" />
          )}
          <span className={`text-xs font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {trendValue}
          </span>
        </div>
      )}
    </motion.div>
  );
}