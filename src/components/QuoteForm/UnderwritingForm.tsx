
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { InsuranceType } from '@/types';

// Import specialized forms
import ProfessionalIndemnityForm from './UnderwritingForms/ProfessionalIndemnityForm';
import ContractorsAllRiskForm from './UnderwritingForms/ContractorsAllRiskForm';
import PublicLiabilityForm from './UnderwritingForms/PublicLiabilityForm';
import EventLiabilityForm from './UnderwritingForms/EventLiabilityForm';
import MedicalMalpracticeForm from './UnderwritingForms/MedicalMalpracticeForm';
import CyberLiabilityForm from './UnderwritingForms/CyberLiabilityForm';

// Import shared additional questions component
import AdditionalQuestions from './UnderwritingForms/AdditionalQuestions';

interface UnderwritingFormProps {
  selectedInsuranceType: InsuranceType;
  onSubmit: (data: Record<string, any>) => void;
  onBack: () => void;
}

const UnderwritingForm = ({ selectedInsuranceType, onSubmit, onBack }: UnderwritingFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleFormDataChange = (newData: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields: Record<string, string[]> = {
      'professional-indemnity': [
        'services-offered', 
        'professional-qualifications', 
        'client-contracts', 
        'client-industry', 
        'largest-contract-value'
      ],
      'contractors-all-risk': [
        'project-value', 
        'construction-type', 
        'equipment-value', 
        'site-security', 
        'subcontractors'
      ],
      'public-liability': [
        'public-visitors', 
        'premises-type', 
        'safety-procedures', 
        'offsite-activities', 
        'hazardous-materials'
      ],
      'event-liability': [
        'event-attendees', 
        'event-type', 
        'event-venue', 
        'event-duration', 
        'alcohol-served', 
        'security-measures'
      ],
      'medical-malpractice': [
        'SuminsuredrequiMEDICALMALPRACTICE_10',
        'HPCSAAHPCSAregMEDICALMALPRACTICE',
        'HowmanypatientsMEDICALMALPRACTICE',
        'HowmanyproceduresMEDICALMALPRACTICE'
      ],
      'cyber-liability': [
        'annual-revenue',
        'stores-data',
        'processes-payments',
        'cybersecurity-measures',
        'number-of-employees',
        'previous-incidents'
      ]
    };
    
    // Shared additional fields that are required for all insurance types
    const sharedRequiredFields = [
      'business-outside-sa',
      'pollution-prosecution',
      'insurer-cancelled',
      'no-liability-circumstances',
      'employees-outside-sa'
    ];
    
    // Validate insurance type specific fields
    if (selectedInsuranceType in requiredFields) {
      requiredFields[selectedInsuranceType].forEach(field => {
        if (formData[field] === undefined || formData[field] === null || formData[field] === '') {
          newErrors[field] = 'This field is required';
        }
      });
    }
    
    // Validate shared fields
    sharedRequiredFields.forEach(field => {
      if (formData[field] === undefined) {
        newErrors[field] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
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
      
      {/* Additional Questions Section */}
      <AdditionalQuestions 
        formData={formData}
        setFormData={handleFormDataChange}
        errors={errors}
        setErrors={setErrors}
      />
      
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
