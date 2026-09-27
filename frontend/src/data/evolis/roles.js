export const EVOLIS_ROLES = [
  {
    id: "super_admin",
    label: "Super Admin",
    description: "Mengelola seluruh workspace, sistem, dan konfigurasi global",
    color: "bg-red-50 text-red-600 border-red-200",
    permissions: ["*"],
  },
  {
    id: "workspace_owner",
    label: "Workspace Owner",
    description: "Mengelola brand, user, produk, objective, dan memberi approval",
    color: "bg-purple-50 text-purple-600 border-purple-200",
    permissions: ["workspace.*", "dna.*", "products.*", "audiences.*", "objectives.*", "campaigns.*", "assets.*", "publishing.*", "leads.*", "pipeline.*", "analytics.*", "recommendations.*", "automation.*", "governance.*", "settings.*"],
  },
  {
    id: "strategist",
    label: "Strategist",
    description: "Membuat campaign, mengelola audience, dan mengatur content direction",
    color: "bg-blue-50 text-blue-600 border-blue-200",
    permissions: ["dna.read", "products.read", "audiences.*", "objectives.*", "campaigns.*", "assets.read", "publishing.read", "leads.read", "analytics.read", "recommendations.*", "automation.propose"],
  },
  {
    id: "content_manager",
    label: "Content Manager",
    description: "Membuat dan mengedit asset, mengelola publishing queue",
    color: "bg-teal-50 text-teal-600 border-teal-200",
    permissions: ["dna.read", "products.read", "audiences.read", "objectives.read", "campaigns.read", "assets.*", "publishing.*", "analytics.read"],
  },
  {
    id: "sales_crm",
    label: "Sales / CRM",
    description: "Mengelola lead, pipeline, dan follow-up",
    color: "bg-amber-50 text-amber-600 border-amber-200",
    permissions: ["leads.*", "pipeline.*", "analytics.read", "recommendations.read"],
  },
  {
    id: "reviewer",
    label: "Reviewer / Approver",
    description: "Menyetujui, menolak, meminta revisi, dan menghentikan automation",
    color: "bg-green-50 text-green-600 border-green-200",
    permissions: ["governance.*", "assets.read", "publishing.read", "automation.*"],
  },
  {
    id: "viewer",
    label: "Viewer",
    description: "Read-only dashboard dan report",
    color: "bg-gray-50 text-gray-600 border-gray-200",
    permissions: ["*.read"],
  },
];

export function getRoleById(id) {
  return EVOLIS_ROLES.find((r) => r.id === id) || EVOLIS_ROLES[6];
}

export function getRoleColor(id) {
  const role = getRoleById(id);
  return role?.color || "bg-gray-50 text-gray-600 border-gray-200";
}