import { base44 } from "@/api/base44Client";

const AI_MODELS = [
  { id: "automatic", label: "Automatic", provider: "base44" },
  { id: "gpt_5_mini", label: "GPT-5 Mini", provider: "openai" },
  { id: "gemini_3_flash", label: "Gemini 3 Flash", provider: "google" },
  { id: "gpt_5_4", label: "GPT-5.4", provider: "openai" },
  { id: "gpt_5_5", label: "GPT-5.5", provider: "openai" },
  { id: "gemini_3_1_pro", label: "Gemini 3.1 Pro", provider: "google" },
  { id: "claude_sonnet_4_6", label: "Claude Sonnet 4.6", provider: "anthropic" },
  { id: "claude_opus_4_6", label: "Claude Opus 4.6", provider: "anthropic" },
];

export function getAvailableModels() {
  return AI_MODELS;
}

export async function generateAsset({
  systemInstruction,
  businessDNA,
  product,
  audience,
  campaign,
  assetSpec,
  governanceRules,
  outputSchema,
  model = "automatic",
  workspaceId,
  userId,
}) {
  const fullPrompt = [
    systemInstruction || "You are Evolis, an autonomous growth operating system. Generate high-quality, brand-compliant digital assets.",
    businessDNA ? `\n\n## Business DNA\n${JSON.stringify(businessDNA, null, 2)}` : "",
    product ? `\n\n## Product Context\n${JSON.stringify(product, null, 2)}` : "",
    audience ? `\n\n## Audience Context\n${JSON.stringify(audience, null, 2)}` : "",
    campaign ? `\n\n## Campaign Context\n${JSON.stringify(campaign, null, 2)}` : "",
    assetSpec ? `\n\n## Asset Specification\n${JSON.stringify(assetSpec, null, 2)}` : "",
    governanceRules ? `\n\n## Governance Rules\n${JSON.stringify(governanceRules, null, 2)}` : "",
    `\n\n## Requested Output\nGenerate the asset content following all the above context and rules. Output in ${
      outputSchema ? "the specified JSON schema" : "clean, well-structured text"
    }.`,
  ].join("");

  const result = await base44.integrations.Core.InvokeLLM({
    prompt: fullPrompt,
    response_json_schema: outputSchema || null,
    model: model !== "automatic" ? model : undefined,
    add_context_from_internet: model === "gemini_3_flash" || model === "gemini_3_1_pro" ? false : undefined,
  });

  const generation = await base44.entities.AIGeneration.create({
    workspace_id: workspaceId,
    provider: AI_MODELS.find((m) => m.id === model)?.provider || "base44",
    model,
    prompt_version: "1.0",
    system_instruction: systemInstruction,
    business_dna_context: businessDNA,
    product_context: product,
    audience_context: audience,
    campaign_context: campaign,
    asset_specification: assetSpec,
    governance_rules: governanceRules,
    output_schema: outputSchema,
    output: typeof result === "string" ? result : null,
    output_json: typeof result === "object" ? result : null,
    generation_status: "success",
    requested_by_id: userId,
    asset_type: assetSpec?.type || null,
  });

  return { result, generation };
}

export async function generateRecommendation({ workspaceId, context, model = "automatic" }) {
  const result = await base44.integrations.Core.InvokeLLM({
    prompt: `Based on the following growth system context, generate actionable, data-driven recommendations.\n\n${JSON.stringify(context, null, 2)}\n\nReturn recommendations as JSON array with fields: type, title, problem, recommended_action, reason, expected_impact, urgency (low/medium/high/critical), confidence (0-100).`,
    response_json_schema: {
      type: "object",
      properties: {
        recommendations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              title: { type: "string" },
              problem: { type: "string" },
              recommended_action: { type: "string" },
              reason: { type: "string" },
              expected_impact: { type: "string" },
              urgency: { type: "string" },
              confidence: { type: "number" },
            },
          },
        },
      },
    },
    model: model !== "automatic" ? model : undefined,
  });

  return result;
}