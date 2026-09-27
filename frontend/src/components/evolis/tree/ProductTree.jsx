import React from "react";
import { motion } from "framer-motion";
import { GitBranch, Plus, MoreHorizontal } from "lucide-react";
import StatusChip from "@/components/evolis/shared/StatusChip";

export default function ProductTree({ product, branches = [] }) {
  const rootBranches = branches.filter((b) => !b.parent_branch_id);
  const childBranches = branches.filter((b) => b.parent_branch_id);

  const renderBranch = (branch, depth = 0) => {
    const children = childBranches.filter((b) => b.parent_branch_id === branch.id);
    return (
      <div key={branch.id} style={{ marginLeft: depth * 20 }}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 py-1.5 group"
        >
          <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center">
            <GitBranch className="w-3 h-3 text-muted-foreground" />
          </div>
          <span className="text-sm text-navy font-medium">{branch.name}</span>
          <StatusChip label={branch.branch_type?.replace(/_/g, " ")} color="gray" size="xs" />
          {branch.opportunity_score > 0 && (
            <span className="text-[10px] text-amber-600 font-semibold">Score: {branch.opportunity_score}</span>
          )}
          <span className="text-[10px] text-muted-foreground">{branch.asset_count || 0} assets</span>
        </motion.div>
        {children.map((child) => renderBranch(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-navy">Product Branch Tree</h3>
        <button className="flex items-center gap-1 text-xs text-magenta hover:underline">
          <Plus className="w-3.5 h-3.5" /> Add Branch
        </button>
      </div>

      <div className="flex items-center gap-2 py-1.5 mb-2 border-b border-gray-50 pb-3">
        <div className="w-6 h-6 rounded-lg bg-navy text-white flex items-center justify-center text-xs font-bold">
          {product?.name?.charAt(0) || "P"}
        </div>
        <span className="text-sm font-bold text-navy">{product?.name || "Root Product"}</span>
        <StatusChip label={product?.status?.toUpperCase()} color="green" size="xs" />
      </div>

      {rootBranches.length === 0 ? (
        <p className="text-xs text-muted-foreground py-4 text-center">Belum ada branch. Tambahkan branch untuk mulai memecah produk.</p>
      ) : (
        <div className="pl-2">
          {rootBranches.map((branch) => renderBranch(branch, 0))}
        </div>
      )}
    </div>
  );
}