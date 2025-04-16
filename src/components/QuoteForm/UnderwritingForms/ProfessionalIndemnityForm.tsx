
import { useState } from 'react';
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

interface ProfessionalIndemnityFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const ProfessionalIndemnityForm = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors 
}: ProfessionalIndemnityFormProps) => {
  
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
        <Label htmlFor="services-offered">
          Which professional services does your business provide?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Textarea 
          id="services-offered"
          value={formData['services-offered'] || ''}
          onChange={(e) => handleChange('services-offered', e.target.value)}
          className={errors['services-offered'] ? 'border-red-300' : ''}
          placeholder="Describe the professional services you offer to clients"
        />
        {errors['services-offered'] && (
          <p className="text-sm text-red-500">{errors['services-offered']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="professional-qualifications">
          Do all relevant staff have appropriate professional qualifications?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('professional-qualifications', value === 'yes')}
          defaultValue={formData['professional-qualifications'] === true ? 'yes' : 
                       formData['professional-qualifications'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['professional-qualifications'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="professional-qualifications-yes" />
            <Label htmlFor="professional-qualifications-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="professional-qualifications-no" />
            <Label htmlFor="professional-qualifications-no">No</Label>
          </div>
        </RadioGroup>
        {errors['professional-qualifications'] && (
          <p className="text-sm text-red-500">{errors['professional-qualifications']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="client-contracts">
          Do you use written contracts with all clients?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('client-contracts', value === 'yes')}
          defaultValue={formData['client-contracts'] === true ? 'yes' : 
                       formData['client-contracts'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['client-contracts'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="client-contracts-yes" />
            <Label htmlFor="client-contracts-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="client-contracts-no" />
            <Label htmlFor="client-contracts-no">No</Label>
          </div>
        </RadioGroup>
        {errors['client-contracts'] && (
          <p className="text-sm text-red-500">{errors['client-contracts']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="client-industry">
          Which industry do you primarily service?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('client-industry', value)}
          defaultValue={formData['client-industry'] || ''}
        >
          <SelectTrigger className={errors['client-industry'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select primary industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="finance">Finance & Banking</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors['client-industry'] && (
          <p className="text-sm text-red-500">{errors['client-industry']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="largest-contract-value">
          What is the value of your largest contract in the past 12 months?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="largest-contract-value"
          type="number"
          placeholder="Value in Rands"
          value={formData['largest-contract-value'] || ''}
          onChange={(e) => handleChange('largest-contract-value', e.target.value)}
          className={errors['largest-contract-value'] ? 'border-red-300' : ''}
        />
        {errors['largest-contract-value'] && (
          <p className="text-sm text-red-500">{errors['largest-contract-value']}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProfessionalIndemnityForm;
