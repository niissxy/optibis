import React from "react";
import { motion } from "framer-motion";
import { User, Bot, Zap, CheckCircle2 } from "lucide-react";

const ACTOR_ICONS = {
  user: User,
  ai: Bot,
  automation: Zap,
  system: CheckCircle2,
};

const ACTOR_COLORS = {
  user: "bg-blue-50 text-blue-600",
  ai: "bg-purple-50 text-purple-600",
  automation: "bg-amber-50 text-amber-600",
  system: "bg-green-50 text-green-600",
};

export default function ActivityFeed({ activities = [], maxItems = 10 }) {
  const items = activities.slice(0, maxItems);

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        Belum ada aktivitas terbaru.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((activity, i) => {
        const Icon = ACTOR_ICONS[activity.actor_type] || User;
        const colorClass = ACTOR_COLORS[activity.actor_type] || ACTOR_COLORS.user;
        return (
          <motion.div
            key={activity.id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-start gap-2.5"
          >
            <div className={`w-7 h-7 rounded-lg ${colorClass} flex items-center justify-center shrink-0`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-navy">
                <span className="font-semibold">{activity.actor_name || "System"}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              {activity.entity_name && (
                <p className="text-xs text-muted-foreground truncate">{activity.entity_name}</p>
              )}
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {activity.created_date ? new Date(activity.created_date).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : ""}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}