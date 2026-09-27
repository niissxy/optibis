import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import EvolisSidebar from "@/components/evolis/EvolisSidebar";
import EvolisTopbar from "@/components/evolis/EvolisTopbar";
import CommandPalette from "@/components/evolis/CommandPalette";

export default function EvolisLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <EvolisSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <EvolisTopbar onMenuClick={() => setSidebarOpen(true)} onCommandOpen={() => setCommandOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}