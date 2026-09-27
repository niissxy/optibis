import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Dna, Package, Users, Target, Megaphone, FileText,
  CalendarClock, UserPlus, KanbanSquare, BarChart3, Lightbulb, Zap,
  ShieldCheck, FileClock, Settings, ChevronDown, X, Sparkles
} from "lucide-react";
import { getAccessibleModules } from "@/lib/evolis/permissions";
import { useAuth } from "@/lib/AuthContext";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", path: "/app", icon: LayoutDashboard, group: "Utama" },
  { id: "brief", label: "Daily Brief", path: "/app/brief", icon: FileClock, group: "Utama" },
  { id: "business_dna", label: "Business DNA", path: "/app/business-dna", icon: Dna, group: "Strategi" },
  { id: "products", label: "Products", path: "/app/products", icon: Package, group: "Strategi" },
  { id: "audiences", label: "Audiences", path: "/app/audiences", icon: Users, group: "Strategi" },
  { id: "objectives", label: "Objectives", path: "/app/objectives", icon: Target, group: "Strategi" },
  { id: "campaigns", label: "Campaigns", path: "/app/campaigns", icon: Megaphone, group: "Strategi" },
  { id: "assets", label: "Assets", path: "/app/assets", icon: FileText, group: "Eksekusi" },
  { id: "publishing", label: "Publishing", path: "/app/publishing", icon: CalendarClock, group: "Eksekusi" },
  { id: "leads", label: "Leads", path: "/app/leads", icon: UserPlus, group: "CRM" },
  { id: "pipeline", label: "Pipeline", path: "/app/pipeline", icon: KanbanSquare, group: "CRM" },
  { id: "analytics", label: "Analytics", path: "/app/analytics", icon: BarChart3, group: "Intelligence" },
  { id: "recommendations", label: "Recommendations", path: "/app/recommendations", icon: Lightbulb, group: "Intelligence" },
  { id: "automation", label: "Automation", path: "/app/automation", icon: Zap, group: "Intelligence" },
  { id: "governance", label: "Governance", path: "/app/governance", icon: ShieldCheck, group: "Sistem" },
  { id: "settings", label: "Settings", path: "/app/settings", icon: Settings, group: "Sistem" },
];

const GROUPS = ["Utama", "Strategi", "Eksekusi", "CRM", "Intelligence", "Sistem"];

export default function EvolisSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const { user } = useAuth();
  const userRole = user?.role || "viewer";
  const accessibleModules = getAccessibleModules(userRole);
  const accessibleIds = new Set(accessibleModules.map((m) => m.id));

  const visibleItems = NAV_ITEMS.filter((item) => accessibleIds.has(item.id));

  const toggleGroup = (group) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-navy text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-magenta to-amethyst flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight">EVOLIS</span>
              <p className="text-[9px] text-white/40 uppercase tracking-wider">Growth OS</p>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100vh-4rem)] py-4 px-3 scrollbar-thin">
          {GROUPS.map((group) => {
            const groupItems = visibleItems.filter((item) => item.group === group);
            if (groupItems.length === 0) return null;
            const isCollapsed = collapsedGroups[group];

            return (
              <div key={group} className="mb-4">
                <button
                  onClick={() => toggleGroup(group)}
                  className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-white/60 transition-colors"
                >
                  {group}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isCollapsed ? "-rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {groupItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.id}
                            to={item.path}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                              isActive
                                ? "bg-white/10 text-white font-medium"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="mt-6 px-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Kembali ke Website
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}