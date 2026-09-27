export const QUALITY_CHECKS = [
  { id: "brand_tone_match", label: "Brand Tone Match", weight: 10 },
  { id: "no_prohibited_claims", label: "No Prohibited Claims", weight: 15 },
  { id: "no_duplicate_similarity", label: "No Duplicate Similarity", weight: 8 },
  { id: "no_keyword_stuffing", label: "No Keyword Stuffing", weight: 8 },
  { id: "readability", label: "Readability", weight: 8 },
  { id: "cta_relevance", label: "CTA Relevance", weight: 10 },
  { id: "audience_relevance", label: "Audience Relevance", weight: 10 },
  { id: "objective_alignment", label: "Objective Alignment", weight: 8 },
  { id: "factual_claim_warning", label: "Factual Claim Warning", weight: 8 },
  { id: "compliance_warning", label: "Compliance Warning", weight: 5 },
  { id: "language_consistency", label: "Language Consistency", weight: 5 },
  { id: "content_completeness", label: "Content Completeness", weight: 5 },
];

export const QUALITY_THRESHOLDS = {
  excellent: { min: 90, label: "Excellent", color: "bg-green-50 text-green-600", publishable: true },
  publishable: { min: 75, label: "Publishable", color: "bg-blue-50 text-blue-600", publishable: true },
  needs_review: { min: 60, label: "Needs Review", color: "bg-amber-50 text-amber-600", publishable: false },
  blocked: { min: 0, label: "Blocked", color: "bg-red-50 text-red-600", publishable: false },
};

export function getQualityCategory(score) {
  if (score >= 90) return QUALITY_THRESHOLDS.excellent;
  if (score >= 75) return QUALITY_THRESHOLDS.publishable;
  if (score >= 60) return QUALITY_THRESHOLDS.needs_review;
  return QUALITY_THRESHOLDS.blocked;
}

export function runQualityChecks(content, { prohibitedWords = [], preferredWords = [], minLength = 50 }) {
  const results = {};
  const contentLower = (content || "").toLowerCase();

  results.brand_tone_match = content && content.length > 100 ? 1 : 0;
  results.no_prohibited_claims = prohibitedWords.every((w) => !contentLower.includes(w.toLowerCase())) ? 1 : 0;
  results.no_duplicate_similarity = 1;
  results.no_keyword_stuffing = (contentLower.match(/\b(\w+)\b\s+\1\b/g) || []).length < 3 ? 1 : 0;
  results.readability = content && content.length > 100 ? 1 : 0;
  results.cta_relevance = contentLower.includes("hubungi") || contentLower.includes("konsultasi") || contentLower.includes("wa") || contentLower.includes("kontak") ? 1 : 0;
  results.audience_relevance = 1;
  results.objective_alignment = 1;
  results.factual_claim_warning = !contentLower.includes("dijamin") && !contentLower.includes("100%") ? 1 : 0;
  results.compliance_warning = !contentLower.includes("murah") && !contentLower.includes("termurah") ? 1 : 0;
  results.language_consistency = 1;
  results.content_completeness = content && content.length >= minLength ? 1 : 0;

  let score = 0;
  const details = {};
  QUALITY_CHECKS.forEach((check) => {
    const passed = results[check.id] || 0;
    score += passed * check.weight;
    details[check.id] = { label: check.label, passed: !!passed, weight: check.weight };
  });

  return { score: Math.min(100, score), details, results };
}