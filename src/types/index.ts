export interface CompanyAddress {
  line1: string;
  line2: string;
  area: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
  fullAddress: string;
}

export interface CompanyContact {
  phone: string | null;
  phoneDisplay: string | null;
  whatsapp: string | null;
  whatsappDisplay: string | null;
  email: string | null;
  workingHours: string | null;
}

export interface CompanyLegal {
  cin: string | null;
  registrationNumber: string | null;
  registeredState: string | null;
  pan: string | null;
  gstin: string | null;
}

export interface CompanySocials {
  facebook: string | null;
  instagram: string | null;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  domain: string | null;
  address: CompanyAddress;
  contact: CompanyContact;
  legal: CompanyLegal;
  socials: CompanySocials;
  shortIntro?: string;
}

export interface NavItem {
  label: string;
  href: string;
  variant?: 'default' | 'quiet' | 'prominent';
}

export type ChitPlanStatus = 'open' | 'filling' | 'full' | 'upcoming';

export interface ChitPlan {
  id: string;
  name: string;
  chitValue: number;
  monthlyInstalment: number | null;
  durationMonths: number;
  members: number;
  location: string;
  status: ChitPlanStatus;
  notes?: string;
  isPlaceholder: boolean;
}

export interface EnquiryFormData {
  name: string;
  phone: string;
  chitPlanId?: string;
  chitPlanName?: string;
  message?: string;
  consent: boolean;
  honeypot?: string;
  formLocation?: string;
  pagePath?: string;
  // Attribution & campaign tracking
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
}

export interface EnquirySubmissionResult {
  success: boolean;
  message: string;
  error?: string;
}
