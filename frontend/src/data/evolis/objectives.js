export const OBJECTIVE_TYPES = [
  { value: "awareness", label: "Brand Awareness", icon: "Eye", focusMetric: "reach, impressions" },
  { value: "traffic", label: "Website Traffic", icon: "MousePointerClick", focusMetric: "page views, unique visitors" },
  { value: "authority", label: "Authority Building", icon: "Award", focusMetric: "backlinks, domain authority" },
  { value: "lead_generation", label: "Lead Generation", icon: "UserPlus", focusMetric: "qualified leads, CPL" },
  { value: "appointment", label: "Appointment Booking", icon: "Calendar", focusMetric: "appointments booked" },
  { value: "consultation", label: "Consultation Request", icon: "MessageSquare", focusMetric: "consultations requested" },
  { value: "booking", label: "Direct Booking", icon: "ShoppingCart", focusMetric: "bookings, conversion rate" },
  { value: "conversion", label: "Sales Conversion", icon: "TrendingUp", focusMetric: "conversion rate, deal value" },
  { value: "repeat_purchase", label: "Repeat Purchase", icon: "RefreshCw", focusMetric: "repeat rate, LTV" },
  { value: "retention", label: "Customer Retention", icon: "Heart", focusMetric: "churn rate, retention" },
  { value: "regional_expansion", label: "Regional Expansion", icon: "MapPin", focusMetric: "new markets, regional leads" },
  { value: "content_domination", label: "Content Domination", icon: "FileText", focusMetric: "keyword rankings, organic traffic" },
  { value: "operational_efficiency", label: "Operational Efficiency", icon: "Settings", focusMetric: "response time, automation rate" },
];

export const PRIORITY_METRICS = [
  "qualified_leads",
  "conversion_rate",
  "booking_rate",
  "deal_value",
  "pipeline_value",
  "revenue_influenced",
  "cost_per_qualified_lead",
  "lead_response_time",
];

export function getObjectiveType(value) {
  return OBJECTIVE_TYPES.find((t) => t.value === value);
}