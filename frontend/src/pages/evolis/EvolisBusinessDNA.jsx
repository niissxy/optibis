import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dna, Save, AlertCircle, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useWorkspace } from "@/lib/evolis/WorkspaceContext";
import Breadcrumb from "@/components/evolis/shared/Breadcrumb";
import ScoreGauge from "@/components/evolis/shared/ScoreGauge";
import EmptyState from "@/components/evolis/shared/EmptyState";
import { Button } from "@/components/ui/button";

const DNA_SECTIONS = [
  { id: "business_profile", label: "Business Profile", fields: ["business_name", "legal_name", "business_description", "industry", "business_model", "market_scope", "target_region", "website"] },
  { id: "brand_dna", label: "Brand DNA", fields: ["brand_positioning", "value_proposition", "brand_promise", "tone_of_voice", "personality", "preferred_words", "prohibited_words", "visual_identity_notes", "cta_philosophy", "communication_style"] },
  { id: "growth_dna", label: "Growth DNA", fields: ["primary_objective", "secondary_objectives", "target_kpi", "priority_products", "priority_audiences", "priority_regions", "priority_channels", "growth_intensity", "supervision_mode"] },
  { id: "governance_dna", label: "Governance DNA", fields: ["publishing_limit", "excluded_topics", "restricted_claims", "compliance_notes", "forbidden_channels", "automation_threshold"] },
];

const ARRAY_FIELDS = ["personality", "preferred_words", "prohibited_words", "secondary_objectives", "priority_products", "priority_audiences", "priority_regions", "priority_channels", "contact_channels", "excluded_topics", "restricted_claims", "forbidden_channels"];

export default function EvolisBusinessDNA() {
  const { workspaceId, userRole } = useWorkspace();
  const [dna, setDna] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadDNA() {
      if (!workspaceId) { setLoading(false); return; }
      try {
        const list = await base44.entities.BusinessDNA.filter({ workspace_id: workspaceId }, "-created_date", 1);
        if (list[0]) {
          setDna(list[0]);
          setForm(list[0]);
        }
      } catch (err) {} finally { setLoading(false); }
    }
    loadDNA();
  }, [workspaceId]);

  const calculateCompleteness = () => {
    const allFields = DNA_SECTIONS.flatMap((s) => s.fields);
    const filled = allFields.filter((f) => {
      const val = form[f];
      if (Array.isArray(val)) return val.length > 0;
      return val && String(val).trim().length > 0;
    });
    return Math.round((filled.length / allFields.length) * 100);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleArrayChange = (field, value) => {
    const arr = value.split(",").map((s) => s.trim()).filter(Boolean);
    handleChange(field, arr);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const score = calculateCompleteness();
      const payload = { ...form, workspace_id: workspaceId, completeness_score: score, state: score >= 80 ? "active" : "draft" };
      if (dna?.id) {
        const updated = await base44.entities.BusinessDNA.update(dna.id, payload);
        setDna(updated);
        setForm(updated);
      } else {
        const created = await base44.entities.BusinessDNA.create(payload);
        setDna(created);
        setForm(created);
      }
      setSaved(true);
    } catch (err) {
      setError(err.message || "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-muted-foreground p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Business DNA" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy">Business DNA</h1>
          <p className="text-sm text-muted-foreground">Identitas dan aturan inti organisme digital bisnis Anda</p>
        </div>
        <div className="flex items-center gap-3">
          <ScoreGauge score={calculateCompleteness()} label="Completeness" size={80} />
          <Button onClick={handleSave} disabled={saving} className="bg-magenta hover:bg-magenta-500 text-white rounded-full">
            <Save className="w-4 h-4" /> {saving ? "Menyimpan..." : "Simpan DNA"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <p className="text-xs text-green-600">Business DNA berhasil disimpan!</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        {DNA_SECTIONS.map((section, si) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Dna className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-navy">{section.label}</h3>
            </div>
            <div className="space-y-3">
              {section.fields.map((field) => (
                <div key={field}>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                    {field.replace(/_/g, " ")}
                  </label>
                  {ARRAY_FIELDS.includes(field) ? (
                    <input
                      type="text"
                      value={Array.isArray(form[field]) ? form[field].join(", ") : ""}
                      onChange={(e) => handleArrayChange(field, e.target.value)}
                      placeholder="Pisahkan dengan koma"
                      className="w-full h-8 px-3 rounded-lg border border-gray-200 text-sm text-navy outline-none focus:border-magenta"
                    />
                  ) : field === "business_description" || field === "brand_positioning" || field === "value_proposition" || field === "brand_promise" || field === "compliance_notes" || field === "visual_identity_notes" || field === "cta_philosophy" || field === "communication_style" ? (
                    <textarea
                      value={form[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-navy outline-none focus:border-magenta resize-none"
                    />
                  ) : field === "market_scope" || field === "growth_intensity" || field === "supervision_mode" || field === "publishing_limit" || field === "automation_threshold" ? (
                    <select
                      value={form[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full h-8 px-3 rounded-lg border border-gray-200 text-sm text-navy bg-white outline-none focus:border-magenta"
                    >
                      <option value="">Pilih...</option>
                      {field === "market_scope" && ["local", "regional", "national", "international"].map((o) => <option key={o} value={o}>{o}</option>)}
                      {field === "growth_intensity" && ["conservative", "balanced", "aggressive"].map((o) => <option key={o} value={o}>{o}</option>)}
                      {field === "supervision_mode" && ["assisted", "approval_based", "guarded_automation", "full_auto"].map((o) => <option key={o} value={o}>{o}</option>)}
                      {field === "publishing_limit" && ["unlimited", "daily", "weekly", "monthly"].map((o) => <option key={o} value={o}>{o}</option>)}
                      {field === "automation_threshold" && ["low", "medium", "high"].map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={form[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full h-8 px-3 rounded-lg border border-gray-200 text-sm text-navy outline-none focus:border-magenta"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}