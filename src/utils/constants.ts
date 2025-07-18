
import { InsuranceOption, QuoteStep, UnderwritingQuestion } from '@/types';

export const INSURANCE_TYPES: InsuranceOption[] = [
  {
    id: 'professional-indemnity',
    title: 'Professional Indemnity',
    description: 'Protection for professional advice and services provided to clients.',
    icon: 'briefcase',
    coverPoints: [
      'Protection against claims of negligence or breach of duty',
      'Legal defense costs coverage',
      'Coverage for errors and omissions',
      'Suitable for consultants, advisors, and service providers',
      'Customizable coverage limits based on your business needs'
    ]
  },
  {
    id: 'contractors-all-risk',
    title: 'Contractors All Risk',
    description: 'Comprehensive coverage for construction projects and contractors.',
    icon: 'hard-hat',
    coverPoints: [
      'Protection for physical damage to construction works',
      'Coverage for construction plant and equipment',
      'Third-party liability coverage on construction sites',
      'Material damage coverage during transit and storage',
      'Flexible terms for project-specific requirements'
    ]
  },
  {
    id: 'public-liability',
    title: 'Public Liability',
    description: 'Coverage for third-party bodily injury and property damage claims.',
    icon: 'shield',
    coverPoints: [
      'Protection against third-party injury or property damage claims',
      'Legal defense costs coverage',
      'Coverage for incidents on your premises or due to your operations',
      'Essential coverage for businesses with public interaction',
      'Scalable coverage based on risk exposure'
    ]
  },
  {
    id: 'event-liability',
    title: 'Event Liability',
    description: 'Specialized coverage for events and gatherings, protecting organizers from various liabilities.',
    icon: 'calendar',
    coverPoints: [
      'Coverage for third-party injuries or property damage at events',
      'Protection for event cancellation or postponement',
      'Vendor and venue liability coverage',
      'Alcohol-related liability protection',
      'Temporary structures and equipment coverage'
    ]
  },
  {
    id: 'medical-malpractice',
    title: 'Medical Malpractice',
    description: 'Professional liability coverage for healthcare providers and medical professionals.',
    icon: 'stethoscope',
    coverPoints: [
      'Protection against professional negligence claims',
      'Coverage for medical errors and omissions',
      'Legal defense costs for malpractice lawsuits',
      'Patient injury compensation coverage',
      'Regulatory investigation support'
    ]
  },
  {
    id: 'cyber-liability',
    title: 'Cyber Liability',
    description: 'Protection against cyber attacks, data breaches, and digital security incidents.',
    icon: 'shield',
    coverPoints: [
      'Coverage for data breach response and notification costs',
      'Protection against cyber extortion and ransomware',
      'Business interruption due to cyber incidents',
      'Third-party liability for data privacy violations',
      'Cyber crime investigation and forensic costs'
    ]
  },
  {
    id: 'divers-surething',
    title: 'Divers - SureThing',
    description: 'Specialized liability coverage for diving operations, instructors, and dive centers.',
    icon: 'waves',
    coverPoints: [
      'Professional liability for diving instructors and dive masters',
      'Coverage for student and client injuries during diving activities',
      'Equipment failure and safety protocol coverage',
      'Emergency medical evacuation coverage',
      'DAN SA membership integration and support'
    ]
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Custom insurance solutions for unique business requirements not covered by standard policies.',
    icon: 'layers',
    coverPoints: [
      'Tailored coverage for specific industry needs',
      'Custom policy terms and conditions',
      'Specialized risk assessment and pricing',
      'Flexible coverage limits and deductibles',
      'Expert consultation for unique business risks'
    ]
  }
];

export const QUOTE_STEPS: QuoteStep[] = [
  {
    id: 'contact',
    title: 'Contact Information',
    description: 'Tell us how we can reach you'
  },
  {
    id: 'business',
    title: 'Business Information',
    description: 'Share details about your business'
  },
  {
    id: 'underwriting',
    title: 'Insurance Questions',
    description: 'Help us understand your specific needs'
  },
  {
    id: 'quote',
    title: 'Your Quotes',
    description: 'Review your customized insurance quote'
  },
  {
    id: 'legal',
    title: 'Legal Information',
    description: 'Legal details for your policy'
  },
  {
    id: 'checkout',
    title: 'Checkout',
    description: 'Complete your purchase'
  }
];

export const UNDERWRITING_QUESTIONS: UnderwritingQuestion[] = [
  {
    id: 'previous-claims',
    questionText: 'Have you had any insurance claims in the last 5 years?',
    type: 'boolean',
    required: true,
    insuranceTypes: ['professional-indemnity', 'contractors-all-risk', 'public-liability', 'event-liability', 'medical-malpractice', 'cyber-liability']
  },
  {
    id: 'services-offered',
    questionText: 'Which professional services does your business provide?',
    type: 'text',
    required: true,
    insuranceTypes: ['professional-indemnity']
  },
  {
    id: 'project-value',
    questionText: 'What is the typical value of your construction projects?',
    type: 'select',
    options: ['Under R100,000', 'R100,000 - R500,000', 'R500,000 - R1,000,000', 'Over R1,000,000'],
    required: true,
    insuranceTypes: ['contractors-all-risk']
  },
  {
    id: 'public-visitors',
    questionText: 'How many visitors/customers do you have on your premises per month?',
    type: 'number',
    required: true,
    insuranceTypes: ['public-liability']
  },
  {
    id: 'event-attendees',
    questionText: 'What is the expected number of attendees at your event?',
    type: 'number',
    required: true,
    insuranceTypes: ['event-liability']
  },
  {
    id: 'risk-management',
    questionText: 'Do you have a documented risk management process?',
    type: 'boolean',
    required: true,
    insuranceTypes: ['professional-indemnity', 'contractors-all-risk', 'public-liability', 'event-liability', 'medical-malpractice', 'cyber-liability']
  }
];

export const BUSINESS_TYPES = [
  "Accounting & Bookkeeping",
  "Architecture & Design",
  "Beauty & Wellness",
  "Building & Construction",
  "Cleaning Services",
  "Consulting",
  "E-commerce",
  "Education & Training",
  "Event Management",
  "Financial Services",
  "Food & Beverage",
  "Healthcare",
  "Information Technology",
  "Legal Services",
  "Manufacturing",
  "Marketing & Advertising",
  "Real Estate",
  "Retail",
  "Transportation & Logistics",
  "Other"
];
