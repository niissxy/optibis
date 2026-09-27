import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Package, Trash2, Edit3, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import StatusChip from "@/components/evolis/shared/StatusChip";
import EmptyState from "@/components/evolis/shared/EmptyState";
import ProductTree from "@/components/evolis/tree/ProductTree";
import { Button } from "@/components/ui/button";

export default function EvolisProducts() {
  const { workspaceId } = useWorkspace();
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", description: "", customer_problem: "", solution: "", differentiation: "", price: "", status: "draft" });

  useEffect(() => { loadData(); }, [workspaceId]);

  async function loadData() {
    if (!workspaceId) { setLoading(false); return; }
    try {
      const [prods, brns] = await Promise.all([
        base44.entities.Product.filter({ workspace_id: workspaceId }, "-created_date"),
        base44.entities.ProductBranch.filter({ workspace_id: workspaceId }, "-created_date"),
      ]);
      setProducts(prods);
      setBranches(brns);
    } catch (err) {} finally { setLoading(false); }
  }

  const handleSave = async () => {
    try {
      if (editingProduct) {
        await base44.entities.Product.update(editingProduct.id, { ...form });
      } else {
        await base44.entities.Product.create({ ...form, workspace_id: workspaceId });
      }
      setShowForm(false);
      setEditingProduct(null);
      setForm({ name: "", category: "", description: "", customer_problem: "", solution: "", differentiation: "", price: "", status: "draft" });
      loadData();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus produk ini?")) return;
    await base44.entities.Product.delete(id);
    loadData();
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Products" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy">Products</h1>
          <p className="text-sm text-muted-foreground">Kelola produk dan branching strategy</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditingProduct(null); setForm({ name: "", category: "", description: "", customer_problem: "", solution: "", differentiation: "", price: "", status: "draft" }); }} className="bg-magenta hover:bg-magenta-500 text-white rounded-full">
          <Plus className="w-4 h-4" /> Tambah Produk
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : products.length === 0 ? (
        <EmptyState icon={Package} title="Belum ada produk" description="Tambahkan produk pertama untuk mulai membangun growth engine." action={<Button onClick={() => setShowForm(true)} className="bg-magenta text-white rounded-full"><Plus className="w-4 h-4" /> Tambah Produk</Button>} />
      ) : (
        <div className="space-y-4">
          {products.map((product, i) => {
            const productBranches = branches.filter((b) => b.product_id === product.id);
            return (
              <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ProductTree product={product} branches={productBranches} />
                <div className="flex items-center gap-2 mt-2 px-5">
                  <button onClick={() => { setEditingProduct(product); setForm(product); setShowForm(true); }} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="flex items-center gap-1 text-xs text-red-500 hover:underline">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                  <StatusChip label={product.status?.toUpperCase()} color={product.status === "active" ? "green" : "gray"} size="xs" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-navy">{editingProduct ? "Edit Produk" : "Tambah Produk"}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-navy" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Nama Produk" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Kategori" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta resize-none" />
              <input type="text" placeholder="Customer Problem" value={form.customer_problem} onChange={(e) => setForm({ ...form, customer_problem: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Solution" value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Differentiation" value={form.differentiation} onChange={(e) => setForm({ ...form, differentiation: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <input type="text" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-magenta">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="archived">Archived</option>
              </select>
              <Button onClick={handleSave} className="w-full bg-magenta hover:bg-magenta-500 text-white rounded-full">{editingProduct ? "Update" : "Simpan"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}