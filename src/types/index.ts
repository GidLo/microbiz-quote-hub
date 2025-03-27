
export type InsuranceType = 
  | 'professional-indemnity'
  | 'contractors-all-risk'
  | 'public-liability'
  | 'event-liability';

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
  yearEstablished: string;
  annualRevenue: string;
  numberOfEmployees: string;
}

export interface ContactDetail {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
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
