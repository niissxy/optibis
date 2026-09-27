import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, CornerDownLeft } from "lucide-react";
import { getAccessibleModules } from "@/lib/evolis/permissions";
import { useAuth } from "@/lib/AuthContext";

const SEARCH_ITEMS = [
  { label: "Overview Dashboard", path: "/app", keywords: ["dashboard", "overview", "home"] },
  { label: "Business DNA", path: "/app/business-dna", keywords: ["dna", "brand", "business"] },
  { label: "Products", path: "/app/products", keywords: ["product", "branch", "catalog"] },
  { label: "Audiences", path: "/app/audiences", keywords: ["audience", "persona", "segment"] },
  { label: "Objectives", path: "/app/objectives", keywords: ["objective", "kpi", "goal", "target"] },
  { label: "Campaigns", path: "/app/campaigns", keywords: ["campaign", "marketing", "ads"] },
  { label: "Assets", path: "/app/assets", keywords: ["asset", "content", "article", "page"] },
  { label: "Publishing Queue", path: "/app/publishing", keywords: ["publishing", "schedule", "queue"] },
  { label: "Leads", path: "/app/leads", keywords: ["lead", "crm", "contact"] },
  { label: "Pipeline", path: "/app/pipeline", keywords: ["pipeline", "deal", "kanban"] },
  { label: "Analytics", path: "/app/analytics", keywords: ["analytics", "report", "metric"] },
  { label: "Recommendations", path: "/app/recommendations", keywords: ["recommendation", "suggestion", "advice"] },
  { label: "Automation", path: "/app/automation", keywords: ["automation", "trigger", "workflow"] },
  { label: "Governance", path: "/app/governance", keywords: ["governance", "approval", "audit"] },
  { label: "Daily Brief", path: "/app/brief", keywords: ["brief", "daily", "summary"] },
  { label: "Settings", path: "/app/settings", keywords: ["settings", "config", "integration"] },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role || "viewer";
  const accessibleModules = getAccessibleModules(userRole);
  const accessiblePaths = new Set(accessibleModules.map((m) => m.path));

  const filtered = useMemo(() => {
    if (!query) return SEARCH_ITEMS.filter((item) => accessiblePaths.has(item.path));
    const q = query.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        accessiblePaths.has(item.path) &&
        (item.label.toLowerCase().includes(q) || item.keywords.some((k) => k.includes(q)))
    );
  }, [query, accessiblePaths]);

  const handleSelect = (path) => {
    navigate(path);
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-navy/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -10 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari halaman, fitur, atau aksi..."
                className="flex-1 text-sm bg-transparent outline-none text-navy placeholder:text-muted-foreground"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered.length > 0) handleSelect(filtered[0].path);
                  if (e.key === "Escape") onClose();
                }}
              />
              <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-slate-100 text-muted-foreground">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">Tidak ada hasil untuk "{query}"</div>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="text-sm text-navy">{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                ))
              )}
            </div>
            <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <CornerDownLeft className="w-3 h-3" /> Pilih
              </span>
              <span>Navigasi cepat ke modul Evolis</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}