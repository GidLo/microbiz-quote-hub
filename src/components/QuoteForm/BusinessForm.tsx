
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { BusinessDetail } from '@/types';

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
    inceptionDate: undefined,
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
  
  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, inceptionDate: date }));
    
    // Clear error when date is selected
    if (errors.inceptionDate) {
      setErrors(prev => ({ ...prev, inceptionDate: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Inception date validation
    if (!formData.inceptionDate) {
      newErrors.inceptionDate = 'Policy start date is required';
    } else {
      const today = new Date();
      const maxFutureDate = new Date();
      maxFutureDate.setDate(today.getDate() + 30);
      
      // Reset time to start of day for comparison
      today.setHours(0, 0, 0, 0);
      maxFutureDate.setHours(23, 59, 59, 999);
      const selectedDate = new Date(formData.inceptionDate);
      selectedDate.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.inceptionDate = 'Policy start date cannot be in the past';
      } else if (selectedDate > maxFutureDate) {
        newErrors.inceptionDate = 'Policy start date cannot be more than 30 days in the future';
      }
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
      
      {/* Policy Start Date Section */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="inceptionDate">Your policy start date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="inceptionDate"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.inceptionDate && "text-muted-foreground",
                errors.inceptionDate ? 'border-red-300' : ''
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.inceptionDate ? format(formData.inceptionDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.inceptionDate}
              onSelect={handleDateChange}
              disabled={(date) => {
                const today = new Date();
                const maxFutureDate = new Date();
                maxFutureDate.setDate(today.getDate() + 30);
                
                // Reset time for comparison
                today.setHours(0, 0, 0, 0);
                maxFutureDate.setHours(23, 59, 59, 999);
                
                return date < today || date > maxFutureDate;
              }}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        {errors.inceptionDate && (
          <p className="text-sm text-red-500">{errors.inceptionDate}</p>
        )}
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
