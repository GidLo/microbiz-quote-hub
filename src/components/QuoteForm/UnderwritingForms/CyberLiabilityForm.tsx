import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CyberLiabilityFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const CyberLiabilityForm = ({ formData, setFormData, errors, setErrors }: CyberLiabilityFormProps) => {
  const handleInputChange = (field: string, value: any) => {
    setFormData({ [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="space-y-6">
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="annual-revenue">What is your annual revenue?</Label>
        <Select
          value={formData['annual-revenue'] || ''}
          onValueChange={(value) => handleInputChange('annual-revenue', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select annual revenue range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-500k">Under R500,000</SelectItem>
            <SelectItem value="500k-1m">R500,000 - R1,000,000</SelectItem>
            <SelectItem value="1m-5m">R1,000,000 - R5,000,000</SelectItem>
            <SelectItem value="5m-10m">R5,000,000 - R10,000,000</SelectItem>
            <SelectItem value="over-10m">Over R10,000,000</SelectItem>
          </SelectContent>
        </Select>
        {errors['annual-revenue'] && (
          <span className="text-sm text-red-500">{errors['annual-revenue']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Do you store sensitive customer data electronically?</Label>
        <RadioGroup
          value={formData['stores-data']?.toString() || ''}
          onValueChange={(value) => handleInputChange('stores-data', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="stores-data-yes" />
            <Label htmlFor="stores-data-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="stores-data-no" />
            <Label htmlFor="stores-data-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['stores-data'] && (
          <span className="text-sm text-red-500">{errors['stores-data']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Do you process online payments or credit card transactions?</Label>
        <RadioGroup
          value={formData['processes-payments']?.toString() || ''}
          onValueChange={(value) => handleInputChange('processes-payments', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="processes-payments-yes" />
            <Label htmlFor="processes-payments-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="processes-payments-no" />
            <Label htmlFor="processes-payments-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['processes-payments'] && (
          <span className="text-sm text-red-500">{errors['processes-payments']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Do you have cybersecurity measures in place (firewalls, antivirus, etc.)?</Label>
        <RadioGroup
          value={formData['cybersecurity-measures']?.toString() || ''}
          onValueChange={(value) => handleInputChange('cybersecurity-measures', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="cybersecurity-measures-yes" />
            <Label htmlFor="cybersecurity-measures-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="cybersecurity-measures-no" />
            <Label htmlFor="cybersecurity-measures-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['cybersecurity-measures'] && (
          <span className="text-sm text-red-500">{errors['cybersecurity-measures']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="number-of-employees">How many employees have access to your computer systems?</Label>
        <Input
          id="number-of-employees"
          type="number"
          value={formData['number-of-employees'] || ''}
          onChange={(e) => handleInputChange('number-of-employees', e.target.value)}
          placeholder="Enter number of employees"
        />
        {errors['number-of-employees'] && (
          <span className="text-sm text-red-500">{errors['number-of-employees']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Have you experienced any cyber incidents or data breaches in the past 5 years?</Label>
        <RadioGroup
          value={formData['previous-incidents']?.toString() || ''}
          onValueChange={(value) => handleInputChange('previous-incidents', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="previous-incidents-yes" />
            <Label htmlFor="previous-incidents-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="previous-incidents-no" />
            <Label htmlFor="previous-incidents-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['previous-incidents'] && (
          <span className="text-sm text-red-500">{errors['previous-incidents']}</span>
        )}
      </motion.div>
    </div>
  );
};

export default CyberLiabilityForm;