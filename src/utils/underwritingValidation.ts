import { InsuranceType } from '@/types';

export interface UnderwritingRejection {
  rejectedQuestion: string;
  rejectedAnswer: string;
}

export const checkUnderwritingRejection = (
  insuranceType: InsuranceType,
  businessDetails: any,
  underwritingAnswers: any
): UnderwritingRejection | null => {
  
  if (insuranceType === 'professional-indemnity') {
    // Check revenue exceeds R10,000,000
    if (businessDetails?.annualRevenue) {
      const revenue = businessDetails.annualRevenue;
      const revenueNumber = parseFloat(revenue.replace(/[R,\s]/g, ''));
      if (revenueNumber > 10000000) {
        return {
          rejectedQuestion: "Annual revenue exceeds R10,000,000",
          rejectedAnswer: "true"
        };
      }
    }

    // Check South African clients question
    if (underwritingAnswers?.['Islessthan50ofPROFESSIONALINDEMNITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm that more than 50% of your professional fee income is from South African based clients?",
        rejectedAnswer: "false"
      };
    }

    // Check qualification question
    if (underwritingAnswers?.['DoYouConfirmThatYouPROFESSIONALINDEMNITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm that you are duly qualified (hold the minimum university qualification)?",
        rejectedAnswer: "false"
      };
    }

    // Check experience question
    if (underwritingAnswers?.['DoYouHave5YearsExpPROFESSIONALINDEMNITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm that you have a minimum of 3-5 years experience in the applicable field?",
        rejectedAnswer: "false"
      };
    }

    // Check claims question
    if (underwritingAnswers?.['HaveanyCLAIMSevPROFESSIONALINDEMNITY'] === true) {
      return {
        rejectedQuestion: "Have any claims ever been made, in the last 5 (five) years, against the Practice or against its predecessors in Practice or any of the present or former Principals or employees indemnifiable under the type of policy for which you are now applying?",
        rejectedAnswer: "true"
      };
    }

    // Check circumstances question
    if (underwritingAnswers?.['AreanyoftheprinPROFESSIONALINDEMNITY'] === true) {
      return {
        rejectedQuestion: "After verifying with all key individuals in your business, are you aware of existing CIRCUMSTANCES which may result in any claim being made against the Practice (in all its prior forms) or any present or past key individuals which would be claimed from this Professional Indemnity policy?",
        rejectedAnswer: "true"
      };
    }
  }

  return null;
};