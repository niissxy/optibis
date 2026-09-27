export function calculateLeadScore({ profileFit, behavior, intent }) {
  const profileScore = Math.min(40, profileFit || 0);
  const behaviorScore = Math.min(35, behavior || 0);
  const intentScore = Math.min(25, intent || 0);
  const total = profileScore + behaviorScore + intentScore;

  let category;
  if (total >= 85) category = "high_intent";
  else if (total >= 70) category = "qualified";
  else if (total >= 50) category = "warm";
  else if (total >= 30) category = "engaged";
  else category = "cold";

  return {
    profile_fit_score: profileScore,
    behavior_score: behaviorScore,
    intent_score: intentScore,
    total_score: total,
    category,
  };
}

export const SCORING_RULES = {
  profile_fit: [
    { rule: "target_industry_match", points: 15, description: "Lead industry matches target" },
    { rule: "target_location_match", points: 10, description: "Lead location matches target region" },
    { rule: "target_company_size", points: 10, description: "Company size matches target" },
    { rule: "target_role", points: 5, description: "Contact role matches target" },
  ],
  behavior: [
    { rule: "form_submission", points: 10, description: "Submitted consultation form" },
    { rule: "page_viewed", points: 3, description: "Viewed service page" },
    { rule: "brochure_downloaded", points: 8, description: "Downloaded a brochure" },
    { rule: "consultation_request", points: 12, description: "Requested consultation" },
    { rule: "repeat_visit", points: 2, description: "Returned to website" },
    { rule: "email_click", points: 5, description: "Clicked email link" },
    { rule: "whatsapp_entry", points: 10, description: "Contacted via WhatsApp" },
  ],
  intent: [
    { rule: "asks_price", points: 8, description: "Asked about pricing" },
    { rule: "asks_schedule", points: 7, description: "Asked about schedule/timeline" },
    { rule: "asks_availability", points: 5, description: "Asked about availability" },
    { rule: "requests_proposal", points: 10, description: "Requested a proposal" },
    { rule: "wants_meeting", points: 8, description: "Wants to schedule a meeting" },
  ],
};

export const SCORE_CATEGORIES = [
  { value: "cold", label: "Cold", range: "0-29", color: "bg-gray-100 text-gray-600" },
  { value: "engaged", label: "Engaged", range: "30-49", color: "bg-blue-100 text-blue-600" },
  { value: "warm", label: "Warm", range: "50-69", color: "bg-amber-100 text-amber-600" },
  { value: "qualified", label: "Qualified", range: "70-84", color: "bg-green-100 text-green-600" },
  { value: "high_intent", label: "High Intent", range: "85-100", color: "bg-magenta-50 text-magenta" },
];

export function getScoreCategory(score) {
  return SCORE_CATEGORIES.find((c) => {
    const [min, max] = c.range.split("-").map(Number);
    return score >= min && score <= max;
  });
}

export function calculateOpportunityScore({ demand, businessRelevance, conversionPotential, strategicFit, dataConfidence, risk, cost, saturation, executionComplexity }) {
  const positive = (demand || 0) * (businessRelevance || 0) * (conversionPotential || 0) * (strategicFit || 0) * (dataConfidence || 0);
  const negative = (risk || 0) + (cost || 0) + (saturation || 0) + (executionComplexity || 0);
  const raw = positive / 10000 - negative * 5;
  return Math.max(0, Math.min(100, Math.round(raw)));
}