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

interface ContractorsAllRiskFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const ContractorsAllRiskForm = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors 
}: ContractorsAllRiskFormProps) => {
  
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
        <Label htmlFor="project-value">
          What is the typical value of your construction projects?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('project-value', value)}
          defaultValue={formData['project-value'] || ''}
        >
          <SelectTrigger className={errors['project-value'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select project value range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Under R100,000">Under R100,000</SelectItem>
            <SelectItem value="R100,000 - R500,000">R100,000 - R500,000</SelectItem>
            <SelectItem value="R500,000 - R1,000,000">R500,000 - R1,000,000</SelectItem>
            <SelectItem value="R1,000,000 - R5,000,000">R1,000,000 - R5,000,000</SelectItem>
            <SelectItem value="Over R5,000,000">Over R5,000,000</SelectItem>
          </SelectContent>
        </Select>
        {errors['project-value'] && (
          <p className="text-sm text-red-500">{errors['project-value']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="construction-type">
          What type of construction do you primarily undertake?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('construction-type', value)}
          defaultValue={formData['construction-type'] || ''}
        >
          <SelectTrigger className={errors['construction-type'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select construction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
            <SelectItem value="civil">Civil Engineering</SelectItem>
            <SelectItem value="roads">Roads & Highways</SelectItem>
            <SelectItem value="bridges">Bridges</SelectItem>
            <SelectItem value="electrical">Electrical Work</SelectItem>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="renovations">Renovations</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors['construction-type'] && (
          <p className="text-sm text-red-500">{errors['construction-type']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="equipment-value">
          What is the total value of your construction equipment?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="equipment-value"
          type="number"
          placeholder="Value in Rands"
          value={formData['equipment-value'] || ''}
          onChange={(e) => handleChange('equipment-value', e.target.value)}
          className={errors['equipment-value'] ? 'border-red-300' : ''}
        />
        {errors['equipment-value'] && (
          <p className="text-sm text-red-500">{errors['equipment-value']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="public-liability-addon">
          Do you require Public Liability coverage?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('public-liability-addon', value === 'yes')}
          defaultValue={formData['public-liability-addon'] === true ? 'yes' : 
                       formData['public-liability-addon'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['public-liability-addon'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="public-liability-addon-yes" />
            <Label htmlFor="public-liability-addon-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="public-liability-addon-no" />
            <Label htmlFor="public-liability-addon-no">No</Label>
          </div>
        </RadioGroup>
        {errors['public-liability-addon'] && (
          <p className="text-sm text-red-500">{errors['public-liability-addon']}</p>
        )}
      </motion.div>

      {formData['public-liability-addon'] === true && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="public-liability-amount">
            Public Liability Coverage Amount
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            onValueChange={(value) => handleChange('public-liability-amount', value)}
            defaultValue={formData['public-liability-amount'] || ''}
          >
            <SelectTrigger className={errors['public-liability-amount'] ? 'border-red-300' : ''}>
              <SelectValue placeholder="Select coverage amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000000">R1,000,000</SelectItem>
              <SelectItem value="2000000">R2,000,000</SelectItem>
              <SelectItem value="5000000">R5,000,000</SelectItem>
              <SelectItem value="10000000">R10,000,000</SelectItem>
              <SelectItem value="20000000">R20,000,000</SelectItem>
              <SelectItem value="50000000">R50,000,000</SelectItem>
            </SelectContent>
          </Select>
          {errors['public-liability-amount'] && (
            <p className="text-sm text-red-500">{errors['public-liability-amount']}</p>
          )}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="sasria-cover">
          Do you require SASRIA coverage?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('sasria-cover', value === 'yes')}
          defaultValue={formData['sasria-cover'] === true ? 'yes' : 
                       formData['sasria-cover'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['sasria-cover'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="sasria-cover-yes" />
            <Label htmlFor="sasria-cover-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="sasria-cover-no" />
            <Label htmlFor="sasria-cover-no">No</Label>
          </div>
        </RadioGroup>
        {errors['sasria-cover'] && (
          <p className="text-sm text-red-500">{errors['sasria-cover']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="site-security">
          Do you implement site security measures (e.g., fencing, security guards, CCTV)?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('site-security', value === 'yes')}
          defaultValue={formData['site-security'] === true ? 'yes' : 
                       formData['site-security'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['site-security'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="site-security-yes" />
            <Label htmlFor="site-security-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="site-security-no" />
            <Label htmlFor="site-security-no">No</Label>
          </div>
        </RadioGroup>
        {errors['site-security'] && (
          <p className="text-sm text-red-500">{errors['site-security']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="subcontractors">
          Do you use subcontractors?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('subcontractors', value === 'yes')}
          defaultValue={formData['subcontractors'] === true ? 'yes' : 
                       formData['subcontractors'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['subcontractors'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="subcontractors-yes" />
            <Label htmlFor="subcontractors-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="subcontractors-no" />
            <Label htmlFor="subcontractors-no">No</Label>
          </div>
        </RadioGroup>
        {errors['subcontractors'] && (
          <p className="text-sm text-red-500">{errors['subcontractors']}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContractorsAllRiskForm;
