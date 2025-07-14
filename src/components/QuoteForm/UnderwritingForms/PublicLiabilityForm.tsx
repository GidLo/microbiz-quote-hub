
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface PublicLiabilityFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const PublicLiabilityForm = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors 
}: PublicLiabilityFormProps) => {
  
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
      {/* Amount of cover (limit of indemnity) for Public Liability */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="SuminsuredforcySALIABILITY">
          Amount of cover (limit of indemnity) for Public Liability
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('SuminsuredforcySALIABILITY', value)}
          defaultValue={formData['SuminsuredforcySALIABILITY'] || ''}
        >
          <SelectTrigger className={errors['SuminsuredforcySALIABILITY'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select coverage amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1000000">R1,000,000</SelectItem>
            <SelectItem value="2000000">R2,000,000</SelectItem>
            <SelectItem value="3000000">R3,000,000</SelectItem>
            <SelectItem value="4000000">R4,000,000</SelectItem>
            <SelectItem value="5000000">R5,000,000</SelectItem>
            <SelectItem value="6000000">R6,000,000</SelectItem>
            <SelectItem value="7000000">R7,000,000</SelectItem>
            <SelectItem value="8000000">R8,000,000</SelectItem>
            <SelectItem value="9000000">R9,000,000</SelectItem>
            <SelectItem value="10000000">R10,000,000</SelectItem>
          </SelectContent>
        </Select>
        {errors['SuminsuredforcySALIABILITY'] && (
          <p className="text-sm text-red-500">{errors['SuminsuredforcySALIABILITY']}</p>
        )}
      </motion.div>

      {/* Are any of your branches based outside the borders of South Africa */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="AreanyofyourbraSALIABILITY">
          Are any of your branches based outside the borders of South Africa or do you conduct business outside of South Africa?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('AreanyofyourbraSALIABILITY', value === 'yes')}
          defaultValue={formData['AreanyofyourbraSALIABILITY'] === true ? 'yes' : 
                       formData['AreanyofyourbraSALIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['AreanyofyourbraSALIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="AreanyofyourbraSALIABILITY-yes" />
            <Label htmlFor="AreanyofyourbraSALIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="AreanyofyourbraSALIABILITY-no" />
            <Label htmlFor="AreanyofyourbraSALIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['AreanyofyourbraSALIABILITY'] && (
          <p className="text-sm text-red-500">{errors['AreanyofyourbraSALIABILITY']}</p>
        )}
      </motion.div>

      {/* Have you, during the last 5 years, been prosecuted for pollution */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="HaveyouduringtSALIABILITY">
          Have you, during the last 5 years, been prosecuted for contravention of any standard law relating to the release from the location of a substance into sewers, rivers, sea, and air or on the land, or had any claims or complaints made resulting from sudden and accidental pollution?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('HaveyouduringtSALIABILITY', value === 'yes')}
          defaultValue={formData['HaveyouduringtSALIABILITY'] === true ? 'yes' : 
                       formData['HaveyouduringtSALIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['HaveyouduringtSALIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="HaveyouduringtSALIABILITY-yes" />
            <Label htmlFor="HaveyouduringtSALIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="HaveyouduringtSALIABILITY-no" />
            <Label htmlFor="HaveyouduringtSALIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['HaveyouduringtSALIABILITY'] && (
          <p className="text-sm text-red-500">{errors['HaveyouduringtSALIABILITY']}</p>
        )}
      </motion.div>

      {/* Has any Insurer ever cancelled or refused to renew any insurance */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="HasanyInsurerevSALIABILITY">
          Has any Insurer ever cancelled or refused to renew any insurance, or imposed special restrictions or conditions?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('HasanyInsurerevSALIABILITY', value === 'yes')}
          defaultValue={formData['HasanyInsurerevSALIABILITY'] === true ? 'yes' : 
                       formData['HasanyInsurerevSALIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['HasanyInsurerevSALIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="HasanyInsurerevSALIABILITY-yes" />
            <Label htmlFor="HasanyInsurerevSALIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="HasanyInsurerevSALIABILITY-no" />
            <Label htmlFor="HasanyInsurerevSALIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['HasanyInsurerevSALIABILITY'] && (
          <p className="text-sm text-red-500">{errors['HasanyInsurerevSALIABILITY']}</p>
        )}
      </motion.div>

      {/* How many liability claims have been made against the insured */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="HowmanyliabilitSALIABILITY">
          How many liability claims have been made against the insured in the last 5 years?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('HowmanyliabilitSALIABILITY', value)}
          defaultValue={formData['HowmanyliabilitSALIABILITY'] || ''}
          className={`space-y-2 ${errors['HowmanyliabilitSALIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="HowmanyliabilitSALIABILITY-0" />
            <Label htmlFor="HowmanyliabilitSALIABILITY-0">0</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="HowmanyliabilitSALIABILITY-1" />
            <Label htmlFor="HowmanyliabilitSALIABILITY-1">1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="HowmanyliabilitSALIABILITY-2" />
            <Label htmlFor="HowmanyliabilitSALIABILITY-2">2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="HowmanyliabilitSALIABILITY-3" />
            <Label htmlFor="HowmanyliabilitSALIABILITY-3">3</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="HowmanyliabilitSALIABILITY-4" />
            <Label htmlFor="HowmanyliabilitSALIABILITY-4">4</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="HowmanyliabilitSALIABILITY-5" />
            <Label htmlFor="HowmanyliabilitSALIABILITY-5">5</Label>
          </div>
        </RadioGroup>
        {errors['HowmanyliabilitSALIABILITY'] && (
          <p className="text-sm text-red-500">{errors['HowmanyliabilitSALIABILITY']}</p>
        )}
      </motion.div>

      {/* Was the claim less than R500,000 */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="WastheclaimlessSALIABILITY">
          Was the claim less than R500,000?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('WastheclaimlessSALIABILITY', value === 'yes')}
          defaultValue={formData['WastheclaimlessSALIABILITY'] === true ? 'yes' : 
                       formData['WastheclaimlessSALIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['WastheclaimlessSALIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="WastheclaimlessSALIABILITY-yes" />
            <Label htmlFor="WastheclaimlessSALIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="WastheclaimlessSALIABILITY-no" />
            <Label htmlFor="WastheclaimlessSALIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['WastheclaimlessSALIABILITY'] && (
          <p className="text-sm text-red-500">{errors['WastheclaimlessSALIABILITY']}</p>
        )}
      </motion.div>

      {/* Do you confirm that you are currently not aware of any circumstances */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="IstheInsuredaf">
          Do you confirm that you are currently not aware of any circumstances that may give rise to a public liability claim?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('IstheInsuredaf', value === 'confirm')}
          defaultValue={formData['IstheInsuredaf'] === true ? 'confirm' : 
                       formData['IstheInsuredaf'] === false ? 'decline' : undefined}
          className={`flex space-x-4 ${errors['IstheInsuredaf'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="confirm" id="IstheInsuredaf-confirm" />
            <Label htmlFor="IstheInsuredaf-confirm">Confirm</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="decline" id="IstheInsuredaf-decline" />
            <Label htmlFor="IstheInsuredaf-decline">Decline</Label>
          </div>
        </RadioGroup>
        {errors['IstheInsuredaf'] && (
          <p className="text-sm text-red-500">{errors['IstheInsuredaf']}</p>
        )}
      </motion.div>

      {/* Do you accept that all employees outside SA will not be covered */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouacknowledgSALIABILITY">
          Do you accept that all employees outside SA will not be covered?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouacknowledgSALIABILITY', value === 'accept')}
          defaultValue={formData['DoyouacknowledgSALIABILITY'] === true ? 'accept' : 
                       formData['DoyouacknowledgSALIABILITY'] === false ? 'decline' : undefined}
          className={`flex space-x-4 ${errors['DoyouacknowledgSALIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="accept" id="DoyouacknowledgSALIABILITY-accept" />
            <Label htmlFor="DoyouacknowledgSALIABILITY-accept">Accept</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="decline" id="DoyouacknowledgSALIABILITY-decline" />
            <Label htmlFor="DoyouacknowledgSALIABILITY-decline">Decline</Label>
          </div>
        </RadioGroup>
        {errors['DoyouacknowledgSALIABILITY'] && (
          <p className="text-sm text-red-500">{errors['DoyouacknowledgSALIABILITY']}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PublicLiabilityForm;
