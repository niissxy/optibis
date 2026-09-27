import React, { createContext, useContext, useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const { user, isLoadingAuth } = useAuth();
  const [workspace, setWorkspace] = useState(null);
  const [workspaceMember, setWorkspaceMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkspace() {
      if (isLoadingAuth || !user) {
        setLoading(false);
        return;
      }

      try {
        const members = await base44.entities.WorkspaceMember.filter({
          user_id: user.id,
          status: "active",
        });

        if (members.length > 0) {
          const member = members[0];
          setWorkspaceMember(member);

          const ws = await base44.entities.Workspace.get(member.workspace_id);
          setWorkspace(ws);
        } else {
          // Auto-create default workspace for first-time users
          const slug = `ws-${user.id.substring(0, 8)}`;
          const ws = await base44.entities.Workspace.create({
            name: user.full_name ? `${user.full_name}'s Workspace` : "My Workspace",
            slug,
            plan: "free",
            status: "active",
            owner_id: user.id,
          });

          const member = await base44.entities.WorkspaceMember.create({
            workspace_id: ws.id,
            user_id: user.id,
            user_email: user.email,
            user_name: user.full_name || user.email,
            role: user.role === "admin" ? "workspace_owner" : "viewer",
            status: "active",
          });

          setWorkspace(ws);
          setWorkspaceMember(member);
        }
      } catch (err) {
        // Workspace not set up yet
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, [user, isLoadingAuth]);

  const value = {
    workspace,
    workspaceMember,
    workspaceId: workspace?.id,
    userRole: workspaceMember?.role || user?.role || "viewer",
    loading,
    setWorkspace,
    setWorkspaceMember,
  };

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    return { workspace: null, workspaceId: null, userRole: "viewer", loading: false };
  }
  return ctx;
}