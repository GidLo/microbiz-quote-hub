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

  if (insuranceType === 'contractors-all-risk') {
    // Check project duration exceeds 12 months
    if (underwritingAnswers?.['ProjectDuration']) {
      const duration = parseInt(underwritingAnswers['ProjectDuration']);
      if (duration > 12) {
        return {
          rejectedQuestion: "Project duration exceeds 12 months",
          rejectedAnswer: "true"
        };
      }
    }

    // Check residential construction classification
    if (underwritingAnswers?.['DoyouconfirmthaCAR'] === false) {
      return {
        rejectedQuestion: "Do you confirm that the construction can be classified as residential construction or small retail & commercial construction?",
        rejectedAnswer: "false"
      };
    }

    // Check civil works inclusion
    if (underwritingAnswers?.['DoyouconfirmthaCAR1'] === false) {
      return {
        rejectedQuestion: "Do you confirm that the contract will not include any civil works?",
        rejectedAnswer: "false"
      };
    }
  }

  if (insuranceType === 'public-liability') {
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

    // Check branches outside South Africa
    if (underwritingAnswers?.['AreanyofyourbraSALIABILITY'] === true) {
      return {
        rejectedQuestion: "Are any of your branches based outside the borders of South Africa or do you conduct business outside of South Africa?",
        rejectedAnswer: "true"
      };
    }

    // Check pollution prosecution
    if (underwritingAnswers?.['HaveyouduringtSALIABILITY'] === true) {
      return {
        rejectedQuestion: "Have you, during the last 5 years, been prosecuted for contravention of any standard law relating to the release from the location of a substance into sewers, rivers, sea, and air or on the land, or had any claims or complaints made resulting from sudden and accidental pollution?",
        rejectedAnswer: "true"
      };
    }

    // Check insurance cancellation/refusal
    if (underwritingAnswers?.['HasanyInsurerevSALIABILITY'] === true) {
      return {
        rejectedQuestion: "Has any Insurer ever cancelled or refused to renew any insurance, or imposed special restrictions or conditions?",
        rejectedAnswer: "true"
      };
    }

    // Check number of claims (2 or more)
    if (underwritingAnswers?.['HowmanyliabilitSALIABILITY']) {
      const claimsCount = parseInt(underwritingAnswers['HowmanyliabilitSALIABILITY']);
      if (claimsCount >= 2) {
        return {
          rejectedQuestion: "Number of liability claims exceeds 1",
          rejectedAnswer: "true"
        };
      }

      // Check if 1 claim and claim amount > R500,000
      if (claimsCount === 1 && underwritingAnswers?.['WastheclaimlessSALIABILITY'] === false) {
        return {
          rejectedQuestion: "Claim amount exceeds R500,000",
          rejectedAnswer: "true"
        };
      }
    }

    // Check awareness of circumstances
    if (underwritingAnswers?.['IstheInsuredaf'] === false) {
      return {
        rejectedQuestion: "Do you confirm that you are currently not aware of any circumstances that may give rise to a public liability claim?",
        rejectedAnswer: "false"
      };
    }

    // Check employee coverage acceptance
    if (underwritingAnswers?.['DoyouacknowledgSALIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you accept that all employees outside SA will not be covered?",
        rejectedAnswer: "false"
      };
    }
  }

  if (insuranceType === 'event-liability') {
    // Check venue capacity compliance
    if (underwritingAnswers?.['DoyouconfirmcapEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm that you will adhere to the venue capacity guidelines as set out by the venue or local authority?",
        rejectedAnswer: "false"
      };
    }

    // Check secondary suppliers liability coverage
    if (underwritingAnswers?.['DoyouacknowledgEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you acknowledge that all secondary suppliers must maintain their own public liability coverage?",
        rejectedAnswer: "false"
      };
    }

    // Check adventure activities (fireworks, bungee jumping, etc.)
    if (underwritingAnswers?.['DoyouconfirmfirEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm that no adventure activities (such as fireworks, bungee jumping, etc.) will take place at your event?",
        rejectedAnswer: "false"
      };
    }

    // Check motor/marine/aviation activities
    if (underwritingAnswers?.['DoyouconfirmactEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm that no motor, marine, or aviation activities will take place at your event?",
        rejectedAnswer: "false"
      };
    }

    // Check political activities
    if (underwritingAnswers?.['DoyouconfirmpolEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm that your event is not related to any political activities?",
        rejectedAnswer: "false"
      };
    }

    // Check attendee limit (won't exceed 2000 attendees)
    if (underwritingAnswers?.['DoyouconfirmpolnotexceedEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm that your event will not exceed 2000 attendees?",
        rejectedAnswer: "false"
      };
    }

    // Check event duration (reject if 5-7 days or more than 7 days)
    if (underwritingAnswers?.['EventDuration'] === '5-7-days' || 
        underwritingAnswers?.['EventDuration'] === 'more-than-7-days') {
      return {
        rejectedQuestion: "Event duration exceeds 4 days",
        rejectedAnswer: underwritingAnswers['EventDuration']
      };
    }
  }

  if (insuranceType === 'divers-surething') {
    // Check revenue exceeds R20,000,000
    if (businessDetails?.annualRevenue) {
      const revenue = businessDetails.annualRevenue;
      const revenueNumber = parseFloat(revenue.replace(/[R,\s]/g, ''));
      if (revenueNumber > 20000000) {
        return {
          rejectedQuestion: "Annual revenue exceeds R20,000,000",
          rejectedAnswer: "true"
        };
      }
    }

    // Check all boolean questions - reject if any are answered "No" (false)
    const booleanFields = [
      { field: 'DoyouconfirmthaSURETHING_1', question: 'Is your business solvent?' },
      { field: 'DoyouconfirmthaSURETHING_2', question: 'Is your business based in South Africa, and are you seeking insurance coverage for South African operations only, that consists of a single entity (no subsidiaries)?' },
      { field: 'DoyouconfirmthaSURETHING_3', question: 'Can you confirm that none of the directors or management have been involved in any past or ongoing regulatory inquiries, investigations, dismissals, or disqualifications?' },
      { field: 'DoyouconfirmthaSURETHING_4', question: 'Does your business have policies and processes in place for treating employees fairly and consistently?' },
      { field: 'DoyouconfirmthaSURETHING_5', question: 'Can you confirm that you are not planning any retrenchments within the next 12 months?' },
      { field: 'DoyouconfirmthaSURETHING_6', question: 'Can you confirm that auditors have not raised any concerns or issues or made material findings concerning your financial statements?' },
      { field: 'DoyouconfirmthaSURETHING_7', question: 'Can you confirm that there are no claims or circumstances in the last 5 years that have, or would have, led to the business having a legal liability claim from a third party?' },
      { field: 'AreAllProspectiveSURETHING', question: 'Are all prospective students/clients informed about the dangers of diving, and have they acknowledged this in writing?' },
      { field: 'DoYouEnsureThatSURETHING', question: 'Do you ensure that every student/client signs a liability release and disclaimer form before diving?' },
      { field: 'IsTheDiveMasterSURETHING', question: 'Is the Dive Master leading the activity fully qualified and certified for the diving location?' },
      { field: 'DoyouconfirmthaSURETHING_9', question: 'Can you confirm that the Dive Master is familiar with the specific dive site/sites where the activity will take place?' },
      { field: 'DoAllProspectiveStudentsSURETHING', question: 'Do all prospective students/clients sign a medical statement prior to diving?' },
      { field: 'IsEmergencyMedicalSURETHING', question: 'Is emergency medical treatment available at or near the dive location?' },
      { field: 'DoYouHaveProceduresInSURETHING', question: 'Do you have procedures in place for medical evacuation in case of an emergency?' },
      { field: 'DoyouconfirmthaSURETHING_8', question: 'Do you have an active membership with DAN SA?' }
    ];

    for (const { field, question } of booleanFields) {
      if (underwritingAnswers?.[field] === false) {
        return {
          rejectedQuestion: question,
          rejectedAnswer: "false"
        };
      }
    }
  }

  return null;
};