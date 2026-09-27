import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({ icon: Icon = Inbox, title = "Belum ada data", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
        <Icon className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-bold text-navy mb-1">{title}</h3>
      {description && <p className="text-xs text-muted-foreground max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}