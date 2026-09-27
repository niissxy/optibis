import React from "react";
import { Sparkles, Megaphone } from "lucide-react";

export default function ViralogAdSlot({ placement = "in_feed", className = "" }) {
  const labels = {
    top_leaderboard: "728 × 90",
    sidebar_sticky: "300 × 250",
    in_feed: "Native Ad",
    section_separator: "Banner",
    footer_ads: "728 × 90",
  };

  const heights = {
    top_leaderboard: "h-20 sm:h-24",
    sidebar_sticky: "h-64",
    in_feed: "h-32",
    section_separator: "h-24",
    footer_ads: "h-20 sm:h-24",
  };

  return (
    <div className={`${heights[placement] || "h-24"} ${className} rounded-xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center gap-1 group hover:border-magenta/30 transition-colors`}>
      <div className="flex items-center gap-1.5 text-muted-foreground/60">
        <Megaphone className="w-4 h-4" />
        <span className="text-xs font-semibold">Ad Placement</span>
        <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{labels[placement] || placement}</span>
      </div>
      <p className="text-[10px] text-muted-foreground/40">Sponsored content akan tampil di sini</p>
    </div>
  );
}