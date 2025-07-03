
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
    annualRevenue: '',
    numberOfEmployees: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: ''
    }
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessDetail | string, string>>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
    
    // Clear error when field is edited
    if (errors[`address.${name}`]) {
      setErrors(prev => ({ ...prev, [`address.${name}`]: '' }));
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
    const newErrors: Record<string, string> = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }
    
    if (!formData.annualRevenue.trim()) {
      newErrors.annualRevenue = 'Annual revenue is required';
    }
    
    if (!formData.numberOfEmployees.trim()) {
      newErrors.numberOfEmployees = 'Number of employees is required';
    } else if (!/^\d+$/.test(formData.numberOfEmployees)) {
      newErrors.numberOfEmployees = 'Please enter a valid number';
    }

    // Address validation
    if (!formData.address.street.trim()) {
      newErrors['address.street'] = 'Street address is required';
    }
    
    if (!formData.address.city.trim()) {
      newErrors['address.city'] = 'City is required';
    }
    
    if (!formData.address.province.trim()) {
      newErrors['address.province'] = 'Province is required';
    }
    
    if (!formData.address.postalCode.trim()) {
      newErrors['address.postalCode'] = 'Postal code is required';
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

      {/* Business Address Section */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <h3 className="text-lg font-semibold">Business Address</h3>
        
        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            name="street"
            placeholder="123 Main Street"
            value={formData.address.street}
            onChange={handleAddressChange}
            className={errors['address.street'] ? 'border-red-300' : ''}
          />
          {errors['address.street'] && (
            <p className="text-sm text-red-500">{errors['address.street']}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Cape Town"
              value={formData.address.city}
              onChange={handleAddressChange}
              className={errors['address.city'] ? 'border-red-300' : ''}
            />
            {errors['address.city'] && (
              <p className="text-sm text-red-500">{errors['address.city']}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Input
              id="province"
              name="province"
              placeholder="Western Cape"
              value={formData.address.province}
              onChange={handleAddressChange}
              className={errors['address.province'] ? 'border-red-300' : ''}
            />
            {errors['address.province'] && (
              <p className="text-sm text-red-500">{errors['address.province']}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            placeholder="8001"
            value={formData.address.postalCode}
            onChange={handleAddressChange}
            className={errors['address.postalCode'] ? 'border-red-300' : ''}
          />
          {errors['address.postalCode'] && (
            <p className="text-sm text-red-500">{errors['address.postalCode']}</p>
          )}
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
