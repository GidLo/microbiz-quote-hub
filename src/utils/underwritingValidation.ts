import { InsuranceType, BusinessDetail, UnderwritingRejection } from '@/types';

export const checkUnderwritingRejection = (
  insuranceType: InsuranceType,
  businessDetails: BusinessDetail | null,
  underwritingAnswers: Record<string, any> | null
): UnderwritingRejection | null => {
  if (!underwritingAnswers) return null;

  // Professional Indemnity Rejections
  if (insuranceType === 'professional-indemnity') {
    if (underwritingAnswers['DoYouConfirmThatYouPROFESSIONALINDEMNITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm that you have not had any claims, incidents, circumstances or prosecutions made against you or any staff member in your professional capacity or any similar matter which may give rise to a claim under this policy?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['DoYouHave5YearsExpPROFESSIONALINDEMNITY'] === false) {
      return {
        rejectedQuestion: "Do you have 5+ years of experience in your chosen profession?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['HaveanyCLAIMSevPROFESSIONALINDEMNITY'] === true) {
      return {
        rejectedQuestion: "Have any CLAIMS ever been made against you or any business you've been associated with?",
        rejectedAnswer: "true"
      };
    }

    if (underwritingAnswers['AreanyoftheprinPROFESSIONALINDEMNITY'] === true) {
      return {
        rejectedQuestion: "Are any of the principals or professional staff aged over 65?",
        rejectedAnswer: "true"
      };
    }
  }

  // Contractors All Risk Rejections
  if (insuranceType === 'contractors-all-risk') {
    if (underwritingAnswers['DoyouconfirmthaCAR'] === false) {
      return {
        rejectedQuestion: "Do you confirm that you have the necessary qualifications and experience to carry out the contract works?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['DoyouconfirmthaCAR1'] === false) {
      return {
        rejectedQuestion: "Do you confirm that you have not had any insurance declined, cancelled or special terms imposed in the past 3 years?",
        rejectedAnswer: "false"
      };
    }

    const contractValue = parseFloat(underwritingAnswers['ContractValue']?.replace(/[^\d.-]/g, '') || '0');
    if (contractValue > 50000000) {
      return {
        rejectedQuestion: "Contract value exceeds R50,000,000",
        rejectedAnswer: underwritingAnswers['ContractValue']
      };
    }

    const projectDuration = parseInt(underwritingAnswers['ProjectDuration'] || '0');
    if (projectDuration > 24) {
      return {
        rejectedQuestion: "Project duration exceeds 24 months",
        rejectedAnswer: underwritingAnswers['ProjectDuration']
      };
    }
  }

  // Public Liability Rejections
  if (insuranceType === 'public-liability') {
    if (underwritingAnswers['AreanyofyourbraSALIABILITY'] === true) {
      return {
        rejectedQuestion: "Are any of your branches/subsidiaries overseas?",
        rejectedAnswer: "true"
      };
    }

    if (underwritingAnswers['HaveyouduringtSALIABILITY'] === true) {
      return {
        rejectedQuestion: "Have you during the past 3 years had any general liability insurance declined, cancelled or renewal refused or had special conditions imposed?",
        rejectedAnswer: "true"
      };
    }

    if (underwritingAnswers['HasanyInsurerevSALIABILITY'] === true) {
      return {
        rejectedQuestion: "Has any Insurer ever required an additional premium or imposed special conditions?",
        rejectedAnswer: "true"
      };
    }

    const claimsCount = parseInt(underwritingAnswers['HowmanyliabilitSALIABILITY'] || '0');
    if (claimsCount > 1) {
      return {
        rejectedQuestion: "More than 1 liability claim in the past 3 years",
        rejectedAnswer: underwritingAnswers['HowmanyliabilitSALIABILITY']
      };
    }

    if (claimsCount === 1) {
      const claimLessThan10k = underwritingAnswers['WastheclaimlessSALIABILITY'];
      if (claimLessThan10k === false) {
        return {
          rejectedQuestion: "Claim amount was R10,000 or more",
          rejectedAnswer: "false"
        };
      }
    }

    if (underwritingAnswers['IstheInsuredaf'] === true) {
      return {
        rejectedQuestion: "Is the Insured a financial services company?",
        rejectedAnswer: "true"
      };
    }

    if (underwritingAnswers['DoyouacknowledgSALIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you acknowledge that this policy excludes professional indemnity?",
        rejectedAnswer: "false"
      };
    }
  }

  // Event Liability Rejections
  if (insuranceType === 'event-liability') {
    if (underwritingAnswers['DoyouconfirmcapEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm the capacity will not exceed 5000 people?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['DoyouacknowledgEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you acknowledge that this is a non-alcohol event?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['DoyouconfirmfirEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm fireworks will not be used?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['DoyouconfirmactEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm activities are not extreme/dangerous sports?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['DoyouconfirmpolEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm policy covers public liability only?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['DoyouconfirmpolnotexceedEVENTLIABILITY'] === false) {
      return {
        rejectedQuestion: "Do you confirm policy will not exceed 4 days?",
        rejectedAnswer: "false"
      };
    }

    const eventDuration = parseInt(underwritingAnswers['EventDuration'] || '0');
    if (eventDuration > 4) {
      return {
        rejectedQuestion: "Event duration exceeds 4 days",
        rejectedAnswer: underwritingAnswers['EventDuration']
      };
    }
  }

  if (insuranceType === 'medical-malpractice') {
    // Check all universal boolean questions - reject if any are answered "No" (false)
    const universalBooleanFields = [
      { field: 'DoyouconfirmthaMEDICALMALPRACTICE_1', question: 'Are you registered with the relevant regulatory body and hold all necessary qualifications for your profession?' },
      { field: 'DoyouconfirmthaMEDICALMALPRACTICE_2', question: 'Are you domiciled in South Africa and solely operate within the country?' },
      { field: 'DoyouconfirmthaMEDICALMALPRACTICE_3', question: 'Do you acknowledge/confirm that under this policy, you will not have cover for any work you undertake in or on behalf of any state/government owned/run clinic/facility?' },
      { field: 'DoyouconfirmthaMEDICALMALPRACTICE_4', question: 'Do you confirm that: You have not been investigated, or are currently under investigation by the HPCSA / relevant professional regulatory body / medical scheme? You are not aware of any circumstances within the past 5 years that would have, may give or has given rise to a claim under the coverage provided by this insurance policy? You have not had any criminal claims/allegations of any nature made against you?' },
      { field: 'DoyouconfirmthaMEDICALMALPRACTICE_5', question: 'Do you require patients/third parties to complete consent forms in line with the HPCSA/relevant professional regulatory body guidelines?' },
      { field: 'DoyouconfirmyouMEDICALMALPRACTICE_6', question: 'Do you maintain accurate patient records as per the guidelines of the HPCSA/relevant professional regulatory body?' },
      { field: 'DoyouacknowledgepolicyMEDICALMALPRACTICE_1', question: 'Do you confirm that this policy is solely for covering you as a medical professional and acknowledge that it will not cover other medical professionals?' }
    ];

    for (const { field, question } of universalBooleanFields) {
      if (underwritingAnswers?.[field] === false) {
        return {
          rejectedQuestion: question,
          rejectedAnswer: "false"
        };
      }
    }

    // Check conditional boolean questions - only if they exist in the form data (meaning they were shown)
    const conditionalBooleanFields = [
      { field: 'BotoxFillersMEDICALMALPRACTICE_1', question: 'Can you confirm that your practice does not include botox, aesthetics, threading, and fillers?' },
      { field: 'Doyouconfirmlessthan60MEDICALMALPRACTICE', question: 'Do you confirm that you spend less than 60 hours per week in private consultations?' }
    ];

    for (const { field, question } of conditionalBooleanFields) {
      if (underwritingAnswers?.[field] === false) {
        return {
          rejectedQuestion: question,
          rejectedAnswer: "false"
        };
      }
    }
  }

  if (insuranceType === 'cyber-liability') {
    if (underwritingAnswers['IsbasedinSouthACYBER'] === false) {
      return {
        rejectedQuestion: "Are you based in South Africa and operate solely within South Africa?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['CollectsstoresCYBER'] === false) {
      return {
        rejectedQuestion: "Do you collect, store or process any third party personal or confidential data?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['IsnotawareofanyCYBER'] === false) {
      return {
        rejectedQuestion: "Are you not aware of any cyber security incidents or breaches in the past 5 years?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['OurITEnvironmenCYBER'] === false) {
      return {
        rejectedQuestion: "Is your IT environment managed by qualified IT professionals?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['YoutheundersigCYBER'] === false) {
      return {
        rejectedQuestion: "Do you have adequate cyber security measures in place?",
        rejectedAnswer: "false"
      };
    }

    if (underwritingAnswers['InadditionyoucCYBER'] === false) {
      return {
        rejectedQuestion: "Do you conduct regular backups and have incident response procedures?",
        rejectedAnswer: "false"
      };
    }
  }

  if (insuranceType === 'divers-surething') {
    const booleanFields = [
      { field: 'DoyouconfirmthaSURETHING_1', question: 'Do you confirm that all activities will be conducted under the direct supervision of qualified diving instructors?' },
      { field: 'DoyouconfirmthaSURETHING_2', question: 'Do you confirm that all diving activities will be conducted in accordance with PADI/SSI standards?' },
      { field: 'DoyouconfirmthaSURETHING_3', question: 'Do you confirm that all equipment used will be properly maintained and inspected?' },
      { field: 'DoyouconfirmthaSURETHING_4', question: 'Do you confirm that emergency procedures are in place and all staff are trained?' },
      { field: 'DoyouconfirmthaSURETHING_5', question: 'Do you confirm that medical forms will be completed by all participants?' },
      { field: 'DoyouconfirmthaSURETHING_6', question: 'Do you confirm that depth limits will not exceed recreational diving limits?' },
      { field: 'DoyouconfirmthaSURETHING_7', question: 'Do you confirm that technical diving or cave diving will not be conducted?' },
      { field: 'AreAllProspectiveSURETHING', question: 'Are all prospective students required to complete a medical questionnaire?' },
      { field: 'DoYouEnsureThatSURETHING', question: 'Do you ensure that student-to-instructor ratios comply with training standards?' },
      { field: 'IsTheDiveMasterSURETHING', question: 'Is the dive master/instructor certified and current with their training?' },
      { field: 'DoyouconfirmthaSURETHING_9', question: 'Do you confirm that night diving will not be conducted?' },
      { field: 'DoAllProspectiveStudentsSURETHING', question: 'Do all prospective students complete liability waivers?' },
      { field: 'IsEmergencyMedicalSURETHING', question: 'Is emergency medical equipment available at all dive sites?' },
      { field: 'DoYouHaveProceduresInSURETHING', question: 'Do you have procedures in place for emergency evacuation?' },
      { field: 'DoyouconfirmthaSURETHING_8', question: 'Do you confirm that all participants will be properly briefed on safety procedures?' }
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
