import React from "react";

const STATUS_COLORS = {
  green: "bg-green-50 text-green-600 border-green-200",
  red: "bg-red-50 text-red-600 border-red-200",
  amber: "bg-amber-50 text-amber-600 border-amber-200",
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  gray: "bg-gray-100 text-gray-500 border-gray-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  teal: "bg-teal-50 text-teal-600 border-teal-200",
  magenta: "bg-magenta-50 text-magenta border-magenta-200",
};

export default function StatusChip({ label, color = "gray", size = "sm" }) {
  const colorClass = STATUS_COLORS[color] || STATUS_COLORS.gray;
  const sizeClass = size === "xs" ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-1";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-bold ${colorClass} ${sizeClass}`}>
      {label}
    </span>
  );
}