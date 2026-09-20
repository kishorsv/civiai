export type Language = 
  | 'English' 
  | 'Hindi' 
  | 'Kannada' 
  | 'Tamil' 
  | 'Telugu' 
  | 'Malayalam' 
  | 'Marathi' 
  | 'Bengali';

export type UserRole = 'citizen' | 'admin' | 'officer';

export type CivicCategory = 
  | 'All'
  | 'Documents' 
  | 'Education' 
  | 'Healthcare' 
  | 'Agriculture'
  | 'Transport' 
  | 'Employment' 
  | 'Housing' 
  | 'Utilities' 
  | 'Public Safety' 
  | 'Municipal Services'
  | 'Social Welfare';

export interface CitizenProfile {
  id: string;
  name: string;
  avatarUrl: string;
  occupation: string;
  state: string;
  district: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  annualIncome: number;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  isFarmer: boolean;
  isStudent: boolean;
  isSeniorCitizen: boolean;
  isBPL: boolean;
  isDisabled: boolean;
  isVerifiedCitizen: boolean;
  documentsInVault: string[];
}

export interface Scheme {
  id: string;
  title: string;
  shortCode: string;
  sponsoringBody: 'Central Government' | 'State Government';
  department: string;
  category: CivicCategory;
  stateApplicability: string[];
  simplifiedDescription: string;
  detailedOverview: string;
  financialAssistance?: string;
  status: 'Active' | 'Upcoming' | 'Expiring Soon';
  deadline?: string;
  eligibilityCriteria: {
    minAge?: number;
    maxAge?: number;
    maxIncome?: number;
    occupations?: string[];
    genders?: ('Male' | 'Female' | 'Other')[];
    bplOnly?: boolean;
    farmerOnly?: boolean;
    studentOnly?: boolean;
    customRules: string[];
  };
  requiredDocuments: string[];
  applicationSteps: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  officialPortalUrl: string;
  isPopular?: boolean;
}

export interface CivicService {
  id: string;
  title: string;
  category: CivicCategory;
  department: string;
  shortDescription: string;
  detailedDescription: string;
  onlineAvailability: 'Fully Online' | 'Hybrid (Apply Online / Biometrics in Center)' | 'In-Person';
  turnaroundTime: string;
  officialFee: string;
  requiredDocuments: string[];
  applicationSteps: string[];
  officialUrl: string;
  serviceCount?: number;
}

export interface GovOffice {
  id: string;
  name: string;
  category: 'Taluk Office' | 'Seva Kendra' | 'Hospital' | 'RTO' | 'Police Station' | 'Municipal Corporation';
  address: string;
  district: string;
  state: string;
  contactNumber: string;
  email: string;
  timings: string;
  workingDays: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  servicesProvided: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isVerified?: boolean;
  verifiedSource?: {
    portalName: string;
    url: string;
    lastUpdated: string;
  };
  suggestedSchemes?: Scheme[];
  suggestedServices?: CivicService[];
  checklist?: string[];
  steps?: string[];
}

export interface CitizenApplication {
  id: string;
  applicationNumber: string;
  schemeOrServiceName: string;
  category: CivicCategory;
  appliedDate: string;
  lastUpdated: string;
  currentStep: number;
  totalSteps: number;
  status: 'Submitted' | 'Under Verification' | 'Approved' | 'Disbursed' | 'Action Required';
  department: string;
  actionRequiredNote?: string;
  estimatedCompletion: string;
}

export interface NotificationItem {
  id: string;
  type: 'application_update' | 'scheme_deadline' | 'local_announcement' | 'service_update' | 'civiai_recommendation';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'high' | 'normal';
}

export interface AdminMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}
