
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UnderwritingQuestion } from '@/types';
import { supabase } from '@/integrations/supabase/client';

interface ProfessionalIndemnityFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  contactDetails?: any;
}

const ProfessionalIndemnityForm = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors,
  contactDetails 
}: ProfessionalIndemnityFormProps) => {
  const [industryName, setIndustryName] = useState<string>('');
  
  // Fetch industry name based on contact details
  useEffect(() => {
    const fetchIndustryName = async () => {
      if (contactDetails?.industryId) {
        const { data, error } = await supabase
          .from('industries')
          .select('name')
          .eq('id', contactDetails.industryId)
          .single();
          
        if (data && !error) {
          setIndustryName(data.name);
        }
      }
    };
    
    fetchIndustryName();
  }, [contactDetails?.industryId]);
  
  // Check if user is in Built & Design industry to show conditional questions
  const shouldShowBuiltDesignQuestions = industryName === 'Built & Design';
  
  const handleChange = (questionId: string, value: any) => {
    setFormData({ ...formData, [questionId]: value });
    
    // Clear error when field is edited
    if (errors[questionId]) {
      const newErrors = { ...errors };
      delete newErrors[questionId];
      setErrors(newErrors);
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouhaveretroactivecoverPROFESSIONALINDEMNITY">
          Do you have an existing professional indemnity policy in place for your business?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouhaveretroactivecoverPROFESSIONALINDEMNITY', value === 'yes')}
          defaultValue={formData['DoyouhaveretroactivecoverPROFESSIONALINDEMNITY'] === true ? 'yes' : 
                       formData['DoyouhaveretroactivecoverPROFESSIONALINDEMNITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['DoyouhaveretroactivecoverPROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="retroactive-cover-yes" />
            <Label htmlFor="retroactive-cover-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="retroactive-cover-no" />
            <Label htmlFor="retroactive-cover-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouhaveretroactivecoverPROFESSIONALINDEMNITY'] && (
          <p className="text-sm text-red-500">{errors['DoyouhaveretroactivecoverPROFESSIONALINDEMNITY']}</p>
        )}
      </motion.div>

      {formData['DoyouhaveretroactivecoverPROFESSIONALINDEMNITY'] === true && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="InceptiondateretroactivecoverPROFESSIONALINDEMNITY">
            What is the retroactive date of your existing cover?
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input 
            id="InceptiondateretroactivecoverPROFESSIONALINDEMNITY"
            type="date"
            value={formData['InceptiondateretroactivecoverPROFESSIONALINDEMNITY'] || ''}
            onChange={(e) => handleChange('InceptiondateretroactivecoverPROFESSIONALINDEMNITY', e.target.value)}
            className={errors['InceptiondateretroactivecoverPROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}
          />
          {errors['InceptiondateretroactivecoverPROFESSIONALINDEMNITY'] && (
            <p className="text-sm text-red-500">{errors['InceptiondateretroactivecoverPROFESSIONALINDEMNITY']}</p>
          )}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="SuminsuredforcyPROFESSIONALINDEMNITY">
          Amount of cover (limit of indemnity) for Professional Indemnity
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('SuminsuredforcyPROFESSIONALINDEMNITY', value)}
          defaultValue={formData['SuminsuredforcyPROFESSIONALINDEMNITY'] || ''}
        >
          <SelectTrigger className={errors['SuminsuredforcyPROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select coverage amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="R1,000,000">R1,000,000</SelectItem>
            <SelectItem value="R2,000,000">R2,000,000</SelectItem>
            <SelectItem value="R3,000,000">R3,000,000</SelectItem>
            <SelectItem value="R4,000,000">R4,000,000</SelectItem>
            <SelectItem value="R5,000,000">R5,000,000</SelectItem>
            <SelectItem value="R6,000,000">R6,000,000</SelectItem>
            <SelectItem value="R7,000,000">R7,000,000</SelectItem>
            <SelectItem value="R8,000,000">R8,000,000</SelectItem>
            <SelectItem value="R9,000,000">R9,000,000</SelectItem>
            <SelectItem value="R10,000,000">R10,000,000</SelectItem>
          </SelectContent>
        </Select>
        {errors['SuminsuredforcyPROFESSIONALINDEMNITY'] && (
          <p className="text-sm text-red-500">{errors['SuminsuredforcyPROFESSIONALINDEMNITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="Islessthan50ofPROFESSIONALINDEMNITY">
          Do you confirm that more than 50% of your professional fee income is from South African based clients?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('Islessthan50ofPROFESSIONALINDEMNITY', value === 'yes')}
          defaultValue={formData['Islessthan50ofPROFESSIONALINDEMNITY'] === true ? 'yes' : 
                       formData['Islessthan50ofPROFESSIONALINDEMNITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['Islessthan50ofPROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="income-sa-yes" />
            <Label htmlFor="income-sa-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="income-sa-no" />
            <Label htmlFor="income-sa-no">No</Label>
          </div>
        </RadioGroup>
        {errors['Islessthan50ofPROFESSIONALINDEMNITY'] && (
          <p className="text-sm text-red-500">{errors['Islessthan50ofPROFESSIONALINDEMNITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoYouConfirmThatYouPROFESSIONALINDEMNITY">
          Do you confirm that you are duly qualified (hold the minimum university qualification)?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoYouConfirmThatYouPROFESSIONALINDEMNITY', value === 'yes')}
          defaultValue={formData['DoYouConfirmThatYouPROFESSIONALINDEMNITY'] === true ? 'yes' : 
                       formData['DoYouConfirmThatYouPROFESSIONALINDEMNITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['DoYouConfirmThatYouPROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="qualified-yes" />
            <Label htmlFor="qualified-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="qualified-no" />
            <Label htmlFor="qualified-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoYouConfirmThatYouPROFESSIONALINDEMNITY'] && (
          <p className="text-sm text-red-500">{errors['DoYouConfirmThatYouPROFESSIONALINDEMNITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoYouHave5YearsExpPROFESSIONALINDEMNITY">
          Do you confirm that you have a minimum of 3-5 years experience in the applicable field?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoYouHave5YearsExpPROFESSIONALINDEMNITY', value === 'yes')}
          defaultValue={formData['DoYouHave5YearsExpPROFESSIONALINDEMNITY'] === true ? 'yes' : 
                       formData['DoYouHave5YearsExpPROFESSIONALINDEMNITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['DoYouHave5YearsExpPROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="experience-yes" />
            <Label htmlFor="experience-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="experience-no" />
            <Label htmlFor="experience-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoYouHave5YearsExpPROFESSIONALINDEMNITY'] && (
          <p className="text-sm text-red-500">{errors['DoYouHave5YearsExpPROFESSIONALINDEMNITY']}</p>
        )}
      </motion.div>

      {shouldShowBuiltDesignQuestions && (
        <>
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="DoYouUseSLAs/TermsOfEngagePROFESSIONALINDEMNITY">
              Do you use SLAs/ Terms of Engagement/ or any other contract when engaging with your clients?
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <RadioGroup
              onValueChange={(value) => handleChange('DoYouUseSLAs/TermsOfEngagePROFESSIONALINDEMNITY', value === 'yes')}
              defaultValue={formData['DoYouUseSLAs/TermsOfEngagePROFESSIONALINDEMNITY'] === true ? 'yes' : 
                           formData['DoYouUseSLAs/TermsOfEngagePROFESSIONALINDEMNITY'] === false ? 'no' : undefined}
              className={`flex space-x-4 ${errors['DoYouUseSLAs/TermsOfEngagePROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="slas-yes" />
                <Label htmlFor="slas-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="slas-no" />
                <Label htmlFor="slas-no">No</Label>
              </div>
            </RadioGroup>
            {errors['DoYouUseSLAs/TermsOfEngagePROFESSIONALINDEMNITY'] && (
              <p className="text-sm text-red-500">{errors['DoYouUseSLAs/TermsOfEngagePROFESSIONALINDEMNITY']}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="DoYouUseLimitYourLiabilityPROFESSIONALINDEMNITY">
              Do you limit your liability when engaging with your clients?
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <RadioGroup
              onValueChange={(value) => handleChange('DoYouUseLimitYourLiabilityPROFESSIONALINDEMNITY', value === 'yes')}
              defaultValue={formData['DoYouUseLimitYourLiabilityPROFESSIONALINDEMNITY'] === true ? 'yes' : 
                           formData['DoYouUseLimitYourLiabilityPROFESSIONALINDEMNITY'] === false ? 'no' : undefined}
              className={`flex space-x-4 ${errors['DoYouUseLimitYourLiabilityPROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="limit-liability-yes" />
                <Label htmlFor="limit-liability-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="limit-liability-no" />
                <Label htmlFor="limit-liability-no">No</Label>
              </div>
            </RadioGroup>
            {errors['DoYouUseLimitYourLiabilityPROFESSIONALINDEMNITY'] && (
              <p className="text-sm text-red-500">{errors['DoYouUseLimitYourLiabilityPROFESSIONALINDEMNITY']}</p>
            )}
          </motion.div>
        </>
      )}

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="HaveanyCLAIMSevPROFESSIONALINDEMNITY">
          Have any claims ever been made, in the last 5 (five) years, against the Practice or against its predecessors in Practice or any of the present or former Principals or employees indemnifiable under the type of policy for which you are now applying?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('HaveanyCLAIMSevPROFESSIONALINDEMNITY', value === 'yes')}
          defaultValue={formData['HaveanyCLAIMSevPROFESSIONALINDEMNITY'] === true ? 'yes' : 
                       formData['HaveanyCLAIMSevPROFESSIONALINDEMNITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['HaveanyCLAIMSevPROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="claims-yes" />
            <Label htmlFor="claims-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="claims-no" />
            <Label htmlFor="claims-no">No</Label>
          </div>
        </RadioGroup>
        {errors['HaveanyCLAIMSevPROFESSIONALINDEMNITY'] && (
          <p className="text-sm text-red-500">{errors['HaveanyCLAIMSevPROFESSIONALINDEMNITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="AreanyoftheprinPROFESSIONALINDEMNITY">
          After verifying with all key individuals in your business, are you aware of existing CIRCUMSTANCES which may result in any claim being made against the Practice (in all its prior forms) or any present or past key individuals which would be claimed from this Professional Indemnity policy?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('AreanyoftheprinPROFESSIONALINDEMNITY', value === 'yes')}
          defaultValue={formData['AreanyoftheprinPROFESSIONALINDEMNITY'] === true ? 'yes' : 
                       formData['AreanyoftheprinPROFESSIONALINDEMNITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['AreanyoftheprinPROFESSIONALINDEMNITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="circumstances-yes" />
            <Label htmlFor="circumstances-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="circumstances-no" />
            <Label htmlFor="circumstances-no">No</Label>
          </div>
        </RadioGroup>
        {errors['AreanyoftheprinPROFESSIONALINDEMNITY'] && (
          <p className="text-sm text-red-500">{errors['AreanyoftheprinPROFESSIONALINDEMNITY']}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProfessionalIndemnityForm;
