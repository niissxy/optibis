import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { getRoleColor, getRoleById } from "@/data/evolis/roles";
import { base44 } from "@/api/base44Client";

export default function EvolisTopbar({ onMenuClick, onCommandOpen }) {
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const userRole = user?.role || "viewer";
  const role = getRoleById(userRole);
  const roleColor = getRoleColor(userRole);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3 flex-1">
        <button onClick={onMenuClick} className="lg:hidden text-navy">
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={onCommandOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-sm text-muted-foreground w-full max-w-xs"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Cari...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] rounded bg-white border border-gray-200">⌘K</kbd>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-navy transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-magenta" />
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-navy to-navy-400 flex items-center justify-center text-white text-xs font-bold">
              {user?.full_name?.charAt(0) || user?.email?.charAt(0) || <User className="w-3.5 h-3.5" />}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-navy truncate max-w-[120px]">{user?.full_name || user?.email || "User"}</p>
              <p className="text-[10px] text-muted-foreground">{role?.label}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                <div className="px-4 py-2 border-b border-gray-50">
                  <p className="text-sm font-semibold text-navy truncate">{user?.full_name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border ${roleColor}`}>
                    {role?.label}
                  </span>
                </div>
                <Link to="/app/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-slate-50 transition-colors">
                  <User className="w-3.5 h-3.5" /> Profile & Settings
                </Link>
                <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-slate-50 transition-colors">
                  <LogOut className="w-3.5 h-3.5" /> Kembali ke Website
                </Link>
                <button
                  onClick={() => base44.auth.logout("/")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}