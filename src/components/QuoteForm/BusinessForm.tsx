
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { BusinessDetail } from '@/types';
import { BUSINESS_TYPES } from '@/utils/constants';

interface BusinessFormProps {
  initialData?: BusinessDetail;
  onSubmit: (data: BusinessDetail) => void;
  onBack: () => void;
}

const BusinessForm = ({ initialData, onSubmit, onBack }: BusinessFormProps) => {
  const [formData, setFormData] = useState<BusinessDetail>(initialData || {
    businessName: '',
    registrationNumber: '',
    industry: '',
    yearEstablished: '',
    annualRevenue: '',
    numberOfEmployees: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessDetail, string>>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof BusinessDetail]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSelectChange = (name: keyof BusinessDetail, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof BusinessDetail, string>> = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }
    
    if (!formData.yearEstablished.trim()) {
      newErrors.yearEstablished = 'Year established is required';
    } else if (!/^\d{4}$/.test(formData.yearEstablished) || 
               parseInt(formData.yearEstablished) < 1900 || 
               parseInt(formData.yearEstablished) > new Date().getFullYear()) {
      newErrors.yearEstablished = 'Please enter a valid year (e.g., 2010)';
    }
    
    if (!formData.annualRevenue.trim()) {
      newErrors.annualRevenue = 'Annual revenue is required';
    }
    
    if (!formData.numberOfEmployees.trim()) {
      newErrors.numberOfEmployees = 'Number of employees is required';
    } else if (!/^\d+$/.test(formData.numberOfEmployees)) {
      newErrors.numberOfEmployees = 'Please enter a valid number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
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
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          name="businessName"
          placeholder="Your Business Name"
          value={formData.businessName}
          onChange={handleChange}
          className={errors.businessName ? 'border-red-300' : ''}
        />
        {errors.businessName && (
          <p className="text-sm text-red-500">{errors.businessName}</p>
        )}
      </motion.div>
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="registrationNumber">Registration Number (optional)</Label>
        <Input
          id="registrationNumber"
          name="registrationNumber"
          placeholder="Company Registration Number"
          value={formData.registrationNumber}
          onChange={handleChange}
        />
      </motion.div>
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="industry">Industry</Label>
        <Select 
          onValueChange={(value) => handleSelectChange('industry', value)}
          defaultValue={formData.industry}
        >
          <SelectTrigger className={errors.industry ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {BUSINESS_TYPES.map(industry => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.industry && (
          <p className="text-sm text-red-500">{errors.industry}</p>
        )}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="yearEstablished">Year Established</Label>
          <Input
            id="yearEstablished"
            name="yearEstablished"
            placeholder="2010"
            value={formData.yearEstablished}
            onChange={handleChange}
            className={errors.yearEstablished ? 'border-red-300' : ''}
          />
          {errors.yearEstablished && (
            <p className="text-sm text-red-500">{errors.yearEstablished}</p>
          )}
        </motion.div>
        
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="annualRevenue">Annual Revenue (R)</Label>
          <Input
            id="annualRevenue"
            name="annualRevenue"
            placeholder="Annual Revenue"
            value={formData.annualRevenue}
            onChange={handleChange}
            className={errors.annualRevenue ? 'border-red-300' : ''}
          />
          {errors.annualRevenue && (
            <p className="text-sm text-red-500">{errors.annualRevenue}</p>
          )}
        </motion.div>
        
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="numberOfEmployees">Number of Employees</Label>
          <Input
            id="numberOfEmployees"
            name="numberOfEmployees"
            placeholder="Number of employees"
            value={formData.numberOfEmployees}
            onChange={handleChange}
            className={errors.numberOfEmployees ? 'border-red-300' : ''}
          />
          {errors.numberOfEmployees && (
            <p className="text-sm text-red-500">{errors.numberOfEmployees}</p>
          )}
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants} className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default BusinessForm;
