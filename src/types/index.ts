export type InsuranceType = 
  | 'professional-indemnity'
  | 'contractors-all-risk'
  | 'public-liability'
  | 'event-liability'
  | 'medical-malpractice';

export interface InsuranceOption {
  id: InsuranceType;
  title: string;
  description: string;
  icon: string;
  coverPoints: string[];
}

export interface BusinessDetail {
  businessName: string;
  registrationNumber: string;
  industry: string;
  annualRevenue: string;
  numberOfEmployees: string;
  inceptionDate: Date | undefined;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

export interface ContactDetail {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  industryId: string;
  occupationId: string;
}

export interface QuoteStep {
  id: string;
  title: string;
  description: string;
}

export interface UnderwritingQuestion {
  id: string;
  questionText: string;
  type: 'text' | 'select' | 'number' | 'boolean' | 'date';
  options?: string[];
  required: boolean;
  insuranceTypes: InsuranceType[];
}

export interface InsurerQuote {
  insurerId: string;
  insurerName: string;
  insurerLogo?: string;
  monthlyPremium: string;
  annualPremium: string;
  coverageAmount: string;
  deductible: string;
  savingsWithAnnual: string;
  rating: number; // 1-5 stars
  features: string[];
  isRecommended?: boolean;
  productId?: string;
  insuranceType?: InsuranceType;
  businessDetails?: any;
  underwritingAnswers?: any;
}

export interface QuoteRequest {
  insuranceType: InsuranceType;
  contactDetails: ContactDetail;
  businessDetails: BusinessDetail;
  underwritingAnswers: Record<string, any>;
}

export interface QuoteResponse {
  insuranceType: InsuranceType;
  quotes: InsurerQuote[];
  requestId: string;
  validUntil: string;
}
