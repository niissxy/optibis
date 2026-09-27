import { EVOLIS_ROLES } from "@/data/evolis/roles";

export function hasPermission(userRole, permission) {
  const role = EVOLIS_ROLES.find((r) => r.id === userRole);
  if (!role) return false;
  if (role.permissions.includes("*")) return true;

  const [resource, action] = permission.split(".");
  if (role.permissions.includes(`${resource}.*`)) return true;
  if (role.permissions.includes(`${resource}.${action}`)) return true;
  if (role.permissions.includes("*.read") && action === "read") return true;
  return false;
}

export function canAccessDashboard(userRole) {
  return hasPermission(userRole, "workspace.read");
}

export function getAccessibleModules(userRole) {
  const modules = [
    { id: "overview", path: "/app", permission: "workspace.read" },
    { id: "business_dna", path: "/app/business-dna", permission: "dna.read" },
    { id: "products", path: "/app/products", permission: "products.read" },
    { id: "audiences", path: "/app/audiences", permission: "audiences.read" },
    { id: "objectives", path: "/app/objectives", permission: "objectives.read" },
    { id: "campaigns", path: "/app/campaigns", permission: "campaigns.read" },
    { id: "assets", path: "/app/assets", permission: "assets.read" },
    { id: "publishing", path: "/app/publishing", permission: "publishing.read" },
    { id: "leads", path: "/app/leads", permission: "leads.read" },
    { id: "pipeline", path: "/app/pipeline", permission: "pipeline.read" },
    { id: "analytics", path: "/app/analytics", permission: "analytics.read" },
    { id: "recommendations", path: "/app/recommendations", permission: "recommendations.read" },
    { id: "automation", path: "/app/automation", permission: "automation.read" },
    { id: "governance", path: "/app/governance", permission: "governance.read" },
    { id: "brief", path: "/app/brief", permission: "workspace.read" },
    { id: "settings", path: "/app/settings", permission: "settings.read" },
  ];
  return modules.filter((m) => hasPermission(userRole, m.permission));
}