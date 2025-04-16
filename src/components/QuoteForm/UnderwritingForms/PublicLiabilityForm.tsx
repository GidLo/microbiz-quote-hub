
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
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="public-visitors">
          How many visitors/customers do you have on your premises per month?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="public-visitors"
          type="number"
          placeholder="Number of visitors"
          value={formData['public-visitors'] || ''}
          onChange={(e) => handleChange('public-visitors', e.target.value)}
          className={errors['public-visitors'] ? 'border-red-300' : ''}
        />
        {errors['public-visitors'] && (
          <p className="text-sm text-red-500">{errors['public-visitors']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="premises-type">
          What type of premises do you operate from?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('premises-type', value)}
          defaultValue={formData['premises-type'] || ''}
        >
          <SelectTrigger className={errors['premises-type'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select premises type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="office">Office Building</SelectItem>
            <SelectItem value="retail">Retail Store</SelectItem>
            <SelectItem value="warehouse">Warehouse</SelectItem>
            <SelectItem value="factory">Factory/Manufacturing</SelectItem>
            <SelectItem value="restaurant">Restaurant/Café</SelectItem>
            <SelectItem value="hotel">Hotel/Accommodation</SelectItem>
            <SelectItem value="medical">Medical Facility</SelectItem>
            <SelectItem value="outdoor">Outdoor Space</SelectItem>
            <SelectItem value="mixed">Mixed Use</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors['premises-type'] && (
          <p className="text-sm text-red-500">{errors['premises-type']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="safety-procedures">
          Do you have documented safety procedures in place?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('safety-procedures', value === 'yes')}
          defaultValue={formData['safety-procedures'] === true ? 'yes' : 
                       formData['safety-procedures'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['safety-procedures'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="safety-procedures-yes" />
            <Label htmlFor="safety-procedures-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="safety-procedures-no" />
            <Label htmlFor="safety-procedures-no">No</Label>
          </div>
        </RadioGroup>
        {errors['safety-procedures'] && (
          <p className="text-sm text-red-500">{errors['safety-procedures']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="offsite-activities">
          Do you conduct activities off-site or at client locations?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('offsite-activities', value === 'yes')}
          defaultValue={formData['offsite-activities'] === true ? 'yes' : 
                       formData['offsite-activities'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['offsite-activities'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="offsite-activities-yes" />
            <Label htmlFor="offsite-activities-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="offsite-activities-no" />
            <Label htmlFor="offsite-activities-no">No</Label>
          </div>
        </RadioGroup>
        {errors['offsite-activities'] && (
          <p className="text-sm text-red-500">{errors['offsite-activities']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="hazardous-materials">
          Do you handle any hazardous materials or substances?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('hazardous-materials', value === 'yes')}
          defaultValue={formData['hazardous-materials'] === true ? 'yes' : 
                       formData['hazardous-materials'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['hazardous-materials'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="hazardous-materials-yes" />
            <Label htmlFor="hazardous-materials-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="hazardous-materials-no" />
            <Label htmlFor="hazardous-materials-no">No</Label>
          </div>
        </RadioGroup>
        {errors['hazardous-materials'] && (
          <p className="text-sm text-red-500">{errors['hazardous-materials']}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PublicLiabilityForm;
