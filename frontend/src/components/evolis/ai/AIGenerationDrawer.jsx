import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2, CheckCircle2, AlertCircle, Copy } from "lucide-react";
import { getAvailableModels, generateAsset } from "@/lib/evolis/aiProvider";
import { runQualityChecks } from "@/lib/evolis/qualityEngine";

export default function AIGenerationDrawer({ isOpen, onClose, workspaceId, userId, businessDNA, product, audience, campaign, assetSpec, onGenerated }) {
  const [model, setModel] = useState("automatic");
  const [systemInstruction, setSystemInstruction] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [qualityResult, setQualityResult] = useState(null);
  const models = getAvailableModels();

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    setResult(null);
    setQualityResult(null);

    try {
      const { result: genResult, generation } = await generateAsset({
        systemInstruction,
        businessDNA,
        product,
        audience,
        campaign,
        assetSpec,
        governanceRules: businessDNA?.excluded_topics ? { excluded_topics: businessDNA.excluded_topics, prohibited_words: businessDNA.prohibited_words || [] } : null,
        model,
        workspaceId,
        userId,
      });

      setResult(genResult);
      const content = typeof genResult === "string" ? genResult : JSON.stringify(genResult);
      const qr = runQualityChecks(content, {
        prohibitedWords: businessDNA?.prohibited_words || [],
        preferredWords: businessDNA?.preferred_words || [],
      });
      setQualityResult(qr);

      onGenerated?.(genResult, generation, qr);
    } catch (err) {
      setError(err.message || "Gagal generate asset");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-magenta to-amethyst flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy">AI Generation</h3>
                  <p className="text-[10px] text-muted-foreground">Evolis Asset Engine</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">
                <X className="w-4 h-4 text-navy" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-navy mb-1.5 block">Model AI</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm text-navy bg-white outline-none focus:border-magenta"
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>{m.label} ({m.provider})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-navy mb-1.5 block">System Instruction (opsional)</label>
                <textarea
                  value={systemInstruction}
                  onChange={(e) => setSystemInstruction(e.target.value)}
                  rows={3}
                  placeholder="Contoh: You are a copywriter for a premium travel agency..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-navy bg-white outline-none focus:border-magenta resize-none"
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Context Summary</p>
                <div className="text-xs text-navy space-y-1">
                  <p>Business DNA: <span className="text-muted-foreground">{businessDNA?.business_name || "Not set"}</span></p>
                  <p>Product: <span className="text-muted-foreground">{product?.name || "Not set"}</span></p>
                  <p>Audience: <span className="text-muted-foreground">{audience?.persona_name || "Not set"}</span></p>
                  <p>Campaign: <span className="text-muted-foreground">{campaign?.name || "Not set"}</span></p>
                  <p>Asset Type: <span className="text-muted-foreground">{assetSpec?.type || "Not set"}</span></p>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full h-10 rounded-xl bg-gradient-to-r from-magenta to-amethyst text-white text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
              >
                {generating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate Asset</>
                )}
              </button>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              {result && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-semibold text-navy">Hasil Generated</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(typeof result === "string" ? result : JSON.stringify(result, null, 2))}
                      className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground hover:text-navy"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 max-h-64 overflow-y-auto">
                    <pre className="text-xs text-navy whitespace-pre-wrap break-words">
                      {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
                    </pre>
                  </div>

                  {qualityResult && (
                    <div className="bg-white border border-gray-100 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-navy">Quality Score</span>
                        <span className={`text-lg font-bold ${
                          qualityResult.score >= 90 ? "text-green-600" :
                          qualityResult.score >= 75 ? "text-blue-600" :
                          qualityResult.score >= 60 ? "text-amber-600" : "text-red-500"
                        }`}>{qualityResult.score}/100</span>
                      </div>
                      <div className="space-y-1">
                        {Object.entries(qualityResult.details).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between text-[10px]">
                            <span className={val.passed ? "text-green-600" : "text-red-500"}>{val.passed ? "✓" : "✗"} {val.label}</span>
                            <span className="text-muted-foreground">+{val.weight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}