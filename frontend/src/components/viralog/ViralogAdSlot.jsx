import React from "react";
import { Megaphone } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export default function ViralogAdSlot({ placement = "in_feed", className = "" }) {
  const [campaigns, setCampaigns] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API}/modules/viralog-ad-campaigns`)
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => setCampaigns(Array.isArray(items) ? items : []))
      .catch(() => {});
  }, []);

  const labels = {
    top_leaderboard: "728 × 90", sidebar_sticky: "300 × 250", in_feed: "Native Ad", section_separator: "728 × 90", footer_ads: "728 × 90", article_top: "728 × 90", article_middle: "728 × 90", article_bottom: "728 × 90", category_banner: "728 × 90",
  };
  const heights = {
    top_leaderboard: "h-20 sm:h-24", sidebar_sticky: "h-64", in_feed: "h-32", section_separator: "h-24", footer_ads: "h-20 sm:h-24", article_top: "h-20 sm:h-24", article_middle: "h-24", article_bottom: "h-24", category_banner: "h-20 sm:h-24",
  };
  const today = new Date().toISOString().slice(0, 10);
  const campaign = campaigns
    .filter((item) => {
      const data = item.data || {};
      return item.is_published && data.placement === placement && (!data.start_at || data.start_at <= today) && (!data.end_at || data.end_at >= today);
    })
    .sort((a, b) => Number(a.data?.priority || 0) - Number(b.data?.priority || 0))[0];

  if (!campaign) {
    return <div className={`${heights[placement] || "h-24"} ${className} rounded-xl border-2 border-dashed border-navy-400/40 bg-navy flex flex-col items-center justify-center gap-1`}><div className="flex items-center gap-1.5 text-white/45"><Megaphone className="w-4 h-4"/><span className="text-xs font-semibold">Ad Placement</span><span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">{labels[placement] || placement}</span></div><p className="text-[10px] text-white/30">Sponsored content akan tampil di sini</p></div>;
  }

  const data = campaign.data || {};
  const content = campaign.image_url ? <img src={campaign.image_url} alt={campaign.title} className="h-full w-full object-contain"/> : <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-5 text-center"><span className="text-sm font-semibold text-navy">{campaign.title}</span>{campaign.summary && <p className="text-xs text-muted-foreground">{campaign.summary}</p>}{data.button_label && <span className="text-xs font-semibold text-magenta">{data.button_label}</span>}</div>;
  const wrapperClass = `${heights[placement] || "h-24"} ${className} block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md`;

  return data.destination_url ? <a className={wrapperClass} href={data.destination_url} target={data.new_tab ? "_blank" : undefined} rel={data.new_tab ? "noreferrer" : undefined}>{content}</a> : <div className={wrapperClass}>{content}</div>;
}
