export const RISK_LEVELS = {
  low: {
    label: "Low Risk",
    color: "bg-green-50 text-green-600 border-green-200",
    description: "Draft generation, internal recommendation, metadata suggestion",
    autoExecutable: true,
    requiresApproval: false,
  },
  medium: {
    label: "Medium Risk",
    color: "bg-amber-50 text-amber-600 border-amber-200",
    description: "Scheduling, updating approved copy, lead nurture preparation",
    autoExecutable: false,
    requiresApproval: true,
    approvalConfigurable: true,
  },
  high: {
    label: "High Risk",
    color: "bg-orange-50 text-orange-600 border-orange-200",
    description: "Publishing to external channel, changing campaign direction, changing live landing page, sending bulk communication",
    autoExecutable: false,
    requiresApproval: true,
    approvalConfigurable: false,
  },
  critical: {
    label: "Critical Risk",
    color: "bg-red-50 text-red-600 border-red-200",
    description: "Changing pricing, modifying legal terms, changing compliance rule, sending financial commitment, deleting major data",
    autoExecutable: false,
    requiresApproval: true,
    requiresOwnerApproval: true,
    approvalConfigurable: false,
  },
};

export function getRiskLevel(level) {
  return RISK_LEVELS[level] || RISK_LEVELS.low;
}

export function requiresApproval(level) {
  return RISK_LEVELS[level]?.requiresApproval || false;
}

export function canAutoExecute(level) {
  return RISK_LEVELS[level]?.autoExecutable || false;
}

export const APPROVAL_STATES = [
  { value: "not_required", label: "Not Required", color: "bg-gray-100 text-gray-500" },
  { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-600" },
  { value: "approved", label: "Approved", color: "bg-green-100 text-green-600" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-600" },
  { value: "revision_requested", label: "Revision Requested", color: "bg-orange-100 text-orange-600" },
  { value: "expired", label: "Expired", color: "bg-gray-100 text-gray-400" },
];