
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { InsuranceType } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Import specialized forms
import ProfessionalIndemnityForm from './UnderwritingForms/ProfessionalIndemnityForm';
import ContractorsAllRiskForm from './UnderwritingForms/ContractorsAllRiskForm';
import PublicLiabilityForm from './UnderwritingForms/PublicLiabilityForm';
import EventLiabilityForm from './UnderwritingForms/EventLiabilityForm';
import MedicalMalpracticeForm from './UnderwritingForms/MedicalMalpracticeForm';
import CyberLiabilityForm from './UnderwritingForms/CyberLiabilityForm';
import DiversSureThingForm from './UnderwritingForms/DiversSureThingForm';


interface UnderwritingFormProps {
  selectedInsuranceType: InsuranceType;
  onSubmit: (data: Record<string, any>) => void;
  onBack: () => void;
  contactId: string | null;
  contactDetails?: any;
}

const UnderwritingForm = ({ selectedInsuranceType, onSubmit, onBack, contactId, contactDetails }: UnderwritingFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const handleFormDataChange = (newData: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };
  
  const validateForm = async () => {
    const newErrors: Record<string, string> = {};
    
    // Get industry name for professional indemnity validation
    let industryName = '';
    if (selectedInsuranceType === 'professional-indemnity' && contactDetails?.industryId) {
      const { data } = await supabase
        .from('industries')
        .select('name')
        .eq('id', contactDetails.industryId)
        .single();
      if (data) {
        industryName = data.name;
      }
    }
    
    const isBuiltDesign = industryName === 'Built & Design';
    
    const requiredFields: Record<string, string[]> = {
      'professional-indemnity': [
        'DoyouhaveretroactivecoverPROFESSIONALINDEMNITY',
        'SuminsuredforcyPROFESSIONALINDEMNITY',
        'Islessthan50ofPROFESSIONALINDEMNITY',
        'DoYouConfirmThatYouPROFESSIONALINDEMNITY',
        'DoYouHave5YearsExpPROFESSIONALINDEMNITY',
        ...(isBuiltDesign ? [
          'DoYouUseSLAs/TermsOfEngagePROFESSIONALINDEMNITY',
          'DoYouUseLimitYourLiabilityPROFESSIONALINDEMNITY'
        ] : []),
        'HaveanyCLAIMSevPROFESSIONALINDEMNITY',
        'AreanyoftheprinPROFESSIONALINDEMNITY'
      ],
      'contractors-all-risk': [
        'SiteLocationSelection',
        'ContractValue',
        'ProjectInceptionDate',
        'ProjectDuration',
        'AreyoutheprinciCAR',
        'SelecttheoptionCAR',
        'DoyouconfirmthaCAR',
        'DoyouconfirmthaCAR1',
        'WhatissoiltypeCAR',
        'IsconstructionnearbyordoesitrelateCAR',
        'AreanyprocessingusedCAR',
        'DoyourequirecovCARPI-PL66',
        'DoyouwishtoaddSCAR'
      ],
      'public-liability': [
        'public-visitors', 
        'premises-type', 
        'safety-procedures', 
        'offsite-activities', 
        'hazardous-materials'
      ],
      'event-liability': [
        'EventInceptionDate', 
        'EventDuration', 
        'EventLocationSelection', 
        'LimitOfIndemnity', 
        'EventName', 
        'ProvideadescripEVENTLIABILITY',
        'DoyouconfirmcapEVENTLIABILITY',
        'DoyouacknowledgEVENTLIABILITY',
        'DoyouconfirmfirEVENTLIABILITY',
        'DoyouconfirmactEVENTLIABILITY',
        'DoyouconfirmpolEVENTLIABILITY',
        'DoyouconfirmpolnotexceedEVENTLIABILITY'
      ],
      'medical-malpractice': [
        'SuminsuredrequiMEDICALMALPRACTICE_10',
        'HPCSAAHPCSAregMEDICALMALPRACTICE',
        'HowmanypatientsMEDICALMALPRACTICE',
        'HowmanyproceduresMEDICALMALPRACTICE'
      ],
      'cyber-liability': [
        'SuminsuredforcyCYBER',
        'IsbasedinSouthACYBER',
        'CollectsstoresCYBER',
        'IsnotawareofanyCYBER',
        'OurITEnvironmenCYBER',
        'YoutheundersigCYBER',
        'InadditionyoucCYBER'
      ],
      'divers-surething': [
        'IstheinsuranceforabusinessSURETHING',
        'DoyouconfirmthaSURETHING_1',
        'DoyouconfirmthaSURETHING_2',
        'DoyouconfirmthaSURETHING_3',
        'DoyouconfirmthaSURETHING_4',
        'DoyouconfirmthaSURETHING_5',
        'DoyouconfirmthaSURETHING_6',
        'DoyouconfirmthaSURETHING_7',
        'AreAllProspectiveSURETHING',
        'DoYouEnsureThatSURETHING',
        'IsTheDiveMasterSURETHING',
        'DoyouconfirmthaSURETHING_9',
        'DoAllProspectiveStudentsSURETHING',
        'IsEmergencyMedicalSURETHING',
        'DoYouHaveProceduresInSURETHING',
        'DoyouconfirmthaSURETHING_8',
        'PleaseEnterDANSAmemebershipSURETHING_9'
      ]
    };
    
    // Validate insurance type specific fields
    if (selectedInsuranceType in requiredFields) {
      requiredFields[selectedInsuranceType].forEach(field => {
        if (formData[field] === undefined || formData[field] === null || formData[field] === '') {
          newErrors[field] = 'This field is required';
        }
      });
    }
    
    // Special validation for professional indemnity retroactive date
    if (selectedInsuranceType === 'professional-indemnity' && 
        formData['DoyouhaveretroactivecoverPROFESSIONALINDEMNITY'] === true) {
      if (!formData['InceptiondateretroactivecoverPROFESSIONALINDEMNITY']) {
        newErrors['InceptiondateretroactivecoverPROFESSIONALINDEMNITY'] = 'This field is required';
      }
    }
    
    // Special validation for contractors all risk additional cover
    if (selectedInsuranceType === 'contractors-all-risk' && 
        formData['DoyourequirecovCARPI-PL66'] === true) {
      if (!formData['SuminsuredreplaPI-PL67CAR']) {
        newErrors['SuminsuredreplaPI-PL67CAR'] = 'This field is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (await validateForm()) {
      try {
        // Save underwriting answers to database
        if (contactId) {
          const { error } = await supabase
            .from('underwriting_answers')
            .insert({
              contact_id: contactId,
              data: formData
            });

          if (error) {
            console.error('Error saving underwriting answers:', error);
            toast({
              title: "Error",
              description: "Failed to save underwriting answers. Please try again.",
              variant: "destructive"
            });
            return;
          }

          toast({
            title: "Success",
            description: "Underwriting answers saved successfully."
          });
        }

        onSubmit(formData);
      } catch (error) {
        console.error('Error saving underwriting answers:', error);
        toast({
          title: "Error",
          description: "Failed to save underwriting answers. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      // Scroll to the first error
      const firstErrorElement = document.querySelector('.text-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const renderInsuranceTypeForm = () => {
    switch (selectedInsuranceType) {
      case 'professional-indemnity':
        return (
          <ProfessionalIndemnityForm 
            formData={formData}
            setFormData={handleFormDataChange}
            errors={errors}
            setErrors={setErrors}
            contactDetails={contactDetails}
          />
        );
      case 'contractors-all-risk':
        return (
          <ContractorsAllRiskForm 
            formData={formData}
            setFormData={handleFormDataChange}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 'public-liability':
        return (
          <PublicLiabilityForm 
            formData={formData}
            setFormData={handleFormDataChange}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 'event-liability':
        return (
          <EventLiabilityForm 
            formData={formData}
            setFormData={handleFormDataChange}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 'medical-malpractice':
        return (
          <MedicalMalpracticeForm 
            formData={formData}
            setFormData={handleFormDataChange}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 'cyber-liability':
        return (
          <CyberLiabilityForm 
            formData={formData}
            setFormData={handleFormDataChange}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 'divers-surething':
        return (
          <DiversSureThingForm 
            formData={formData}
            setFormData={handleFormDataChange}
            errors={errors}
            setErrors={setErrors}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Insurance Type Specific Questions */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Insurance Specific Information</h3>
        {renderInsuranceTypeForm()}
      </div>
      
      <motion.div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Get Your Quote
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default UnderwritingForm;
