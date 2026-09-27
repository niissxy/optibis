export const ASSET_TYPES = [
  { value: "landing_page", label: "Landing Page", category: "owned", icon: "Layout" },
  { value: "product_page", label: "Product Page", category: "owned", icon: "Package" },
  { value: "service_page", label: "Service Page", category: "owned", icon: "Briefcase" },
  { value: "location_page", label: "Location Page", category: "owned", icon: "MapPin" },
  { value: "niche_page", label: "Niche Page", category: "owned", icon: "Target" },
  { value: "article", label: "Article", category: "owned", icon: "FileText" },
  { value: "pillar_page", label: "Pillar Page", category: "owned", icon: "Layers" },
  { value: "faq", label: "FAQ", category: "owned", icon: "HelpCircle" },
  { value: "comparison_page", label: "Comparison Page", category: "owned", icon: "GitCompare" },
  { value: "case_study", label: "Case Study", category: "owned", icon: "BookOpen" },
  { value: "testimonial_page", label: "Testimonial Page", category: "owned", icon: "Quote" },
  { value: "cta_block", label: "CTA Block", category: "conversion", icon: "MousePointerClick" },
  { value: "form", label: "Form", category: "conversion", icon: "ClipboardList" },
  { value: "lead_magnet", label: "Lead Magnet", category: "conversion", icon: "Magnet" },
  { value: "consultation_page", label: "Consultation Page", category: "conversion", icon: "Calendar" },
  { value: "offer_banner", label: "Offer Banner", category: "conversion", icon: "Banner" },
  { value: "booking_flow", label: "Booking Flow", category: "conversion", icon: "ShoppingCart" },
  { value: "email", label: "Email", category: "communication", icon: "Mail" },
  { value: "whatsapp_message", label: "WhatsApp Message", category: "communication", icon: "MessageCircle" },
  { value: "follow_up", label: "Follow-up", category: "communication", icon: "Reply" },
  { value: "nurture_sequence", label: "Nurture Sequence", category: "communication", icon: "ListOrdered" },
  { value: "objection_handler", label: "Objection Handler", category: "communication", icon: "Shield" },
  { value: "proposal_summary", label: "Proposal Summary", category: "communication", icon: "FileSignature" },
  { value: "caption", label: "Social Caption", category: "social", icon: "Type" },
  { value: "hook", label: "Hook", category: "social", icon: "Anchor" },
  { value: "carousel_outline", label: "Carousel Outline", category: "social", icon: "GalleryHorizontalEnd" },
  { value: "short_video_script", label: "Short Video Script", category: "social", icon: "Video" },
  { value: "campaign_snippet", label: "Campaign Snippet", category: "social", icon: "Zap" },
  { value: "offer_sheet", label: "Offer Sheet", category: "sales", icon: "FileSpreadsheet" },
  { value: "proposal_draft", label: "Proposal Draft", category: "sales", icon: "FileText" },
  { value: "quotation_intro", label: "Quotation Intro", category: "sales", icon: "Receipt" },
  { value: "package_comparison", label: "Package Comparison", category: "sales", icon: "Columns3" },
  { value: "sales_script", label: "Sales Script", category: "sales", icon: "ScrollText" },
];

export const ASSET_CATEGORIES = [
  { value: "owned", label: "Owned Assets", color: "bg-blue-50 text-blue-600" },
  { value: "conversion", label: "Conversion Assets", color: "bg-magenta-50 text-magenta" },
  { value: "communication", label: "Communication Assets", color: "bg-teal-50 text-teal-600" },
  { value: "social", label: "Social Assets", color: "bg-purple-50 text-purple-600" },
  { value: "sales", label: "Sales Assets", color: "bg-amber-50 text-amber-600" },
];

export const ASSET_LIFECYCLE = [
  { value: "draft", label: "Draft", color: "bg-gray-100 text-gray-600" },
  { value: "generated", label: "Generated", color: "bg-blue-100 text-blue-600" },
  { value: "reviewing", label: "Reviewing", color: "bg-amber-100 text-amber-600" },
  { value: "revision_requested", label: "Revision Requested", color: "bg-orange-100 text-orange-600" },
  { value: "approved", label: "Approved", color: "bg-green-100 text-green-600" },
  { value: "scheduled", label: "Scheduled", color: "bg-cyan-100 text-cyan-600" },
  { value: "published", label: "Published", color: "bg-emerald-100 text-emerald-600" },
  { value: "measuring", label: "Measuring", color: "bg-indigo-100 text-indigo-600" },
  { value: "optimizing", label: "Optimizing", color: "bg-purple-100 text-purple-600" },
  { value: "archived", label: "Archived", color: "bg-gray-100 text-gray-400" },
];

export function getAssetType(value) {
  return ASSET_TYPES.find((t) => t.value === value);
}

export function getAssetCategory(value) {
  const type = getAssetType(value);
  return ASSET_CATEGORIES.find((c) => c.value === type?.category);
}