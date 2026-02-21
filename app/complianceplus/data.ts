// Types
export interface DemoWebinar {
  id: string
  title: string
  description: string
  presenter: string
  date: string
  time: string
  duration: string
  tier: 'all' | 'pro' | 'premium'
  type: 'upcoming' | 'recording'
}

export interface DemoReport {
  id: string
  title: string
  month: string
  summary: string
  tier: 'all' | 'pro' | 'premium'
}

export interface DemoResource {
  id: string
  title: string
  description: string
  category: 'templates' | 'checklists' | 'guides' | 'forms'
  tier: 'all' | 'pro' | 'premium'
  fileType: string
  fileSize: string
}

export interface ComplianceOverview {
  csaScore: number
  csaTrend: 'improving' | 'declining' | 'stable'
  recentViolations: { category: string; count: number; severity: 'low' | 'medium' | 'high' }[]
  actionItems: { text: string; priority: 'urgent' | 'normal'; dueDate: string }[]
}

export interface CSAScoreData {
  labels: string[]
  unsafe: number[]
  hos: number[]
  vehicleMaint: number[]
  controlledSubstances: number[]
  driverFitness: number[]
}

// Demo Data
export const COMPLIANCE_OVERVIEW: ComplianceOverview = {
  csaScore: 72,
  csaTrend: 'improving',
  recentViolations: [
    { category: 'Hours of Service', count: 3, severity: 'medium' },
    { category: 'Vehicle Maintenance', count: 2, severity: 'low' },
    { category: 'Unsafe Driving', count: 1, severity: 'high' },
    { category: 'Driver Fitness', count: 0, severity: 'low' },
  ],
  actionItems: [
    { text: 'Update Driver Qualification Files for 3 drivers', priority: 'urgent', dueDate: '2026-03-01' },
    { text: 'Schedule vehicle maintenance for unit #247', priority: 'normal', dueDate: '2026-03-15' },
    { text: 'Review updated HOS regulations', priority: 'normal', dueDate: '2026-03-31' },
  ],
}

export const CSA_SCORE_TREND: CSAScoreData = {
  labels: ['Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026'],
  unsafe: [45, 42, 38, 35, 32, 28],
  hos: [62, 58, 55, 52, 48, 44],
  vehicleMaint: [38, 40, 36, 34, 30, 28],
  controlledSubstances: [0, 0, 0, 0, 0, 0],
  driverFitness: [22, 20, 18, 15, 14, 12],
}

export const UPCOMING_WEBINARS: DemoWebinar[] = [
  {
    id: 'w1',
    title: 'New 2026 DOT Drug Testing Requirements',
    description: 'Deep dive into the updated oral fluid testing regulations effective this year and what carriers need to do to comply.',
    presenter: 'Brandon Wiseman',
    date: '2026-03-12',
    time: '2:00 PM EST',
    duration: '60 min',
    tier: 'all',
    type: 'upcoming',
  },
  {
    id: 'w2',
    title: 'CSA Score Improvement Strategies for Small Fleets',
    description: 'Practical tactics to reduce your BASIC percentiles and avoid interventions from FMCSA.',
    presenter: 'Brandon Wiseman',
    date: '2026-03-26',
    time: '1:00 PM EST',
    duration: '45 min',
    tier: 'pro',
    type: 'upcoming',
  },
  {
    id: 'w3',
    title: 'Advanced Driver Qualification File Management',
    description: 'Beyond the basics: electronic DQF systems, audit preparation, and common pitfalls.',
    presenter: 'Brandon Wiseman',
    date: '2026-04-09',
    time: '2:00 PM EST',
    duration: '60 min',
    tier: 'premium',
    type: 'upcoming',
  },
]

export const RECORDED_WEBINARS: DemoWebinar[] = [
  {
    id: 'r1',
    title: 'Hours of Service: Common Violations & How to Avoid Them',
    description: 'Review of the top 10 HOS violations found during roadside inspections and strategies to prevent them.',
    presenter: 'Brandon Wiseman',
    date: '2026-02-12',
    time: '',
    duration: '55 min',
    tier: 'all',
    type: 'recording',
  },
  {
    id: 'r2',
    title: 'ELD Compliance Deep Dive',
    description: 'Everything you need to know about ELD requirements, driver training, and data transfer procedures.',
    presenter: 'Brandon Wiseman',
    date: '2026-01-22',
    time: '',
    duration: '50 min',
    tier: 'all',
    type: 'recording',
  },
  {
    id: 'r3',
    title: 'Mastering DataQs: Challenge Incorrect Violations',
    description: 'Step-by-step guide to filing DataQs challenges for inaccurate CSA data.',
    presenter: 'Brandon Wiseman',
    date: '2026-01-08',
    time: '',
    duration: '40 min',
    tier: 'pro',
    type: 'recording',
  },
]

export const MONTHLY_REPORTS: DemoReport[] = [
  { id: 'rep1', title: 'February 2026 Compliance Report', month: 'February 2026', summary: 'CSA scores improved 4% across all BASICs. 2 new violations recorded, both low severity.', tier: 'all' },
  { id: 'rep2', title: 'January 2026 Compliance Report', month: 'January 2026', summary: 'HOS violations down 12% from December. Vehicle maintenance BASIC percentile decreased to 28th.', tier: 'all' },
  { id: 'rep3', title: 'December 2025 Compliance Report', month: 'December 2025', summary: 'Year-end summary: 18% overall improvement in CSA scores. 3 critical action items resolved.', tier: 'all' },
  { id: 'rep4', title: 'Q4 2025 Custom Fleet Analysis', month: 'Q4 2025', summary: 'Detailed breakdown of fleet performance by driver, unit, and route with recommendations.', tier: 'premium' },
]

export const RESOURCES: DemoResource[] = [
  // Templates
  { id: 'res1', title: 'Drug & Alcohol Testing Policy Template', description: 'FMCSA-compliant drug and alcohol policy template ready to customize for your company.', category: 'templates', tier: 'all', fileType: 'DOCX', fileSize: '245 KB' },
  { id: 'res2', title: 'Accident Register Template', description: 'DOT accident register for recording all accidents involving your CMVs.', category: 'templates', tier: 'all', fileType: 'XLSX', fileSize: '180 KB' },
  { id: 'res3', title: 'Safety Management Plan Template', description: 'Comprehensive safety management plan template with risk assessment framework.', category: 'templates', tier: 'pro', fileType: 'DOCX', fileSize: '520 KB' },
  // Checklists
  { id: 'res4', title: 'Driver Qualification File Checklist', description: 'Complete checklist of all required documents for a compliant DQF.', category: 'checklists', tier: 'all', fileType: 'PDF', fileSize: '120 KB' },
  { id: 'res5', title: 'Pre-Trip Inspection Checklist', description: 'Comprehensive DVIR checklist covering all required inspection points.', category: 'checklists', tier: 'all', fileType: 'PDF', fileSize: '95 KB' },
  { id: 'res6', title: 'DOT Audit Preparation Checklist', description: 'Step-by-step preparation guide for compliance reviews and investigations.', category: 'checklists', tier: 'pro', fileType: 'PDF', fileSize: '310 KB' },
  // Guides
  { id: 'res7', title: 'New Carrier Compliance Guide', description: 'Everything new carriers need to know about FMCSA compliance requirements.', category: 'guides', tier: 'all', fileType: 'PDF', fileSize: '1.8 MB' },
  { id: 'res8', title: 'CSA Score Improvement Playbook', description: 'Detailed strategies for reducing BASIC percentiles across all categories.', category: 'guides', tier: 'pro', fileType: 'PDF', fileSize: '2.4 MB' },
  { id: 'res9', title: 'Custom Compliance Roadmap Framework', description: 'Framework for building a tailored compliance improvement plan with KPIs.', category: 'guides', tier: 'premium', fileType: 'PDF', fileSize: '3.1 MB' },
  // Forms
  { id: 'res10', title: 'Driver Application for Employment', description: 'FMCSA-compliant employment application form for CMV drivers.', category: 'forms', tier: 'all', fileType: 'PDF', fileSize: '150 KB' },
  { id: 'res11', title: 'Previous Employer Verification Form', description: 'Form to request safety performance history from previous employers.', category: 'forms', tier: 'all', fileType: 'PDF', fileSize: '85 KB' },
  { id: 'res12', title: 'Reasonable Suspicion Documentation Form', description: 'Form for documenting reasonable suspicion observations for drug/alcohol testing.', category: 'forms', tier: 'pro', fileType: 'PDF', fileSize: '110 KB' },
]

export const RESOURCE_CATEGORIES = [
  { key: 'all', label: 'All Resources' },
  { key: 'templates', label: 'Policy Templates' },
  { key: 'checklists', label: 'Checklists' },
  { key: 'guides', label: 'Guides' },
  { key: 'forms', label: 'Forms' },
] as const

// Helper: can user access content at a given tier level
export function canAccessTier(
  userTier: 'basic' | 'pro' | 'premium' | undefined,
  requiredTier: 'all' | 'pro' | 'premium'
): boolean {
  if (requiredTier === 'all') return true
  if (!userTier) return false
  const tierRank = { basic: 1, pro: 2, premium: 3 }
  const requiredRank = { pro: 2, premium: 3 }
  return tierRank[userTier] >= requiredRank[requiredTier]
}
