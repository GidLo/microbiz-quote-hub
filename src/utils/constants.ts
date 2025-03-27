
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
  }
];

export const QUOTE_STEPS: QuoteStep[] = [
  {
    id: 'contact',
    title: 'Contact Details',
    description: 'Tell us how we can reach you'
  },
  {
    id: 'business',
    title: 'Business Information',
    description: 'Share details about your business'
  },
  {
    id: 'underwriting',
    title: 'Underwriting Questions',
    description: 'Help us understand your specific needs'
  },
  {
    id: 'quote',
    title: 'Your Quote',
    description: 'Review your customized insurance quote'
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
    insuranceTypes: ['professional-indemnity', 'contractors-all-risk', 'public-liability', 'event-liability']
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
    insuranceTypes: ['professional-indemnity', 'contractors-all-risk', 'public-liability', 'event-liability']
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
