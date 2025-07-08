import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LegalInformationData } from '@/types';

interface LegalInformationProps {
  onSubmit: (data: LegalInformationData) => void;
  onBack: () => void;
}

const LegalInformation = ({ onSubmit, onBack }: LegalInformationProps) => {
  const [formData, setFormData] = useState<LegalInformationData>({
    registeredWithCIPC: false,
    companyRegistrationNumber: '',
    passportOrIdNumber: '',
    legalEntityName: '',
    isDifferentTradingName: false,
    businessTradingName: '',
    registeredForVAT: false,
    vatNumber: '',
    policyPurchaserFirstName: '',
    policyPurchaserLastName: '',
    position: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);

  const handleChange = (field: keyof LegalInformationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
    
    // Hide warning when form is being filled
    if (showIncompleteWarning) {
      setShowIncompleteWarning(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.registeredWithCIPC && !formData.companyRegistrationNumber.trim()) {
      newErrors.companyRegistrationNumber = 'Company registration number is required';
    }
    
    if (!formData.registeredWithCIPC && !formData.passportOrIdNumber?.trim()) {
      newErrors.passportOrIdNumber = 'Passport or ID number is required';
    }
    
    if (!formData.legalEntityName.trim()) {
      newErrors.legalEntityName = 'Legal entity name is required';
    }
    
    if (formData.registeredWithCIPC && formData.isDifferentTradingName && !formData.businessTradingName?.trim()) {
      newErrors.businessTradingName = 'Business trading name is required';
    }
    
    if (formData.registeredWithCIPC && formData.registeredForVAT && !formData.vatNumber?.trim()) {
      newErrors.vatNumber = 'VAT number is required';
    }
    
    if (!formData.policyPurchaserFirstName.trim()) {
      newErrors.policyPurchaserFirstName = 'First name is required';
    }
    
    if (!formData.policyPurchaserLastName.trim()) {
      newErrors.policyPurchaserLastName = 'Last name is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms to continue';
    }
    
    setErrors(newErrors);
    
    // Show warning if form is incomplete
    if (Object.keys(newErrors).length > 0) {
      setShowIncompleteWarning(true);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    } else {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.text-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const containerVariants = {
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
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <p className="text-muted-foreground mb-6">
          We need a few legal details for your policy.
        </p>
      </motion.div>

      {/* Legal Entity Section */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-medium">LEGAL ENTITY</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="cipc-registered" className="text-base">
            Are you registered with the CIPC?
          </Label>
          <Switch
            id="cipc-registered"
            checked={formData.registeredWithCIPC}
            onCheckedChange={(checked) => handleChange('registeredWithCIPC', checked)}
          />
        </div>

        {formData.registeredWithCIPC && (
          <div className="space-y-2">
            <Label htmlFor="registration-number">
              Your company registration number
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="registration-number"
              placeholder="2021/123456/07"
              value={formData.companyRegistrationNumber}
              onChange={(e) => handleChange('companyRegistrationNumber', e.target.value)}
              className={errors.companyRegistrationNumber ? 'border-red-300' : ''}
            />
            {errors.companyRegistrationNumber && (
              <p className="text-sm text-red-500">{errors.companyRegistrationNumber}</p>
            )}
          </div>
        )}

        {!formData.registeredWithCIPC && (
          <div className="space-y-2">
            <Label htmlFor="passport-id-number">
              Your ID or passport number
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="passport-id-number"
              placeholder="6505031234088"
              value={formData.passportOrIdNumber || ''}
              onChange={(e) => handleChange('passportOrIdNumber', e.target.value)}
              className={errors.passportOrIdNumber ? 'border-red-300' : ''}
            />
            {errors.passportOrIdNumber && (
              <p className="text-sm text-red-500">{errors.passportOrIdNumber}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="legal-entity-name">
            Your legal entity name
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="legal-entity-name"
            placeholder="Jones Consulting Pty Ltd"
            value={formData.legalEntityName}
            onChange={(e) => handleChange('legalEntityName', e.target.value)}
            className={errors.legalEntityName ? 'border-red-300' : ''}
          />
          {errors.legalEntityName && (
            <p className="text-sm text-red-500">{errors.legalEntityName}</p>
          )}
        </div>

        {formData.registeredWithCIPC && (
          <>
            <div className="flex items-center justify-between">
              <Label htmlFor="different-trading-name" className="text-base">
                Is your legal name different to your trading name?
              </Label>
              <Switch
                id="different-trading-name"
                checked={formData.isDifferentTradingName}
                onCheckedChange={(checked) => handleChange('isDifferentTradingName', checked)}
              />
            </div>

            {formData.isDifferentTradingName && (
              <div className="space-y-2">
                <Label htmlFor="business-trading-name">
                  Your business trading name
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="business-trading-name"
                  placeholder="Jones Consulting Solutions"
                  value={formData.businessTradingName || ''}
                  onChange={(e) => handleChange('businessTradingName', e.target.value)}
                  className={errors.businessTradingName ? 'border-red-300' : ''}
                />
                {errors.businessTradingName && (
                  <p className="text-sm text-red-500">{errors.businessTradingName}</p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="vat-registered" className="text-base">
                Are you registered for VAT?
              </Label>
              <Switch
                id="vat-registered"
                checked={formData.registeredForVAT}
                onCheckedChange={(checked) => handleChange('registeredForVAT', checked)}
              />
            </div>

            {formData.registeredForVAT && (
              <div className="space-y-2">
                <Label htmlFor="vat-number">
                  Your VAT number
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="vat-number"
                  placeholder="123467891"
                  value={formData.vatNumber || ''}
                  onChange={(e) => handleChange('vatNumber', e.target.value)}
                  className={errors.vatNumber ? 'border-red-300' : ''}
                />
                {errors.vatNumber && (
                  <p className="text-sm text-red-500">{errors.vatNumber}</p>
                )}
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Terms of Business Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Acknowledgement of terms of business</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Read
          </Button>
        </div>
      </motion.div>

      {/* Policy Purchaser Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-medium">Name of policy purchaser</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">
              First name
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="first-name"
              placeholder="Alex"
              value={formData.policyPurchaserFirstName}
              onChange={(e) => handleChange('policyPurchaserFirstName', e.target.value)}
              className={errors.policyPurchaserFirstName ? 'border-red-300' : ''}
            />
            {errors.policyPurchaserFirstName && (
              <p className="text-sm text-red-500">{errors.policyPurchaserFirstName}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="last-name">
              Last name
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="last-name"
              placeholder="Brown"
              value={formData.policyPurchaserLastName}
              onChange={(e) => handleChange('policyPurchaserLastName', e.target.value)}
              className={errors.policyPurchaserLastName ? 'border-red-300' : ''}
            />
            {errors.policyPurchaserLastName && (
              <p className="text-sm text-red-500">{errors.policyPurchaserLastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">
            What is your position?
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="position"
            placeholder="Director"
            value={formData.position}
            onChange={(e) => handleChange('position', e.target.value)}
            className={errors.position ? 'border-red-300' : ''}
          />
          {errors.position && (
            <p className="text-sm text-red-500">{errors.position}</p>
          )}
        </div>
      </motion.div>

      {/* Terms Agreement */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agree-terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleChange('agreeToTerms', checked)}
            className={errors.agreeToTerms ? 'border-red-300' : ''}
          />
          <Label htmlFor="agree-terms" className="text-sm leading-5">
            I have read and agree to the terms of business, including my duty of disclosure
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
        )}
      </motion.div>

      {/* Warning Message */}
      {showIncompleteWarning && (
        <motion.div variants={itemVariants}>
          <Alert className="border-orange-200 bg-orange-50">
            <Info className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Please make sure the form is complete
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div className="flex justify-between pt-4" variants={itemVariants}>
        <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <Button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          CHECKOUT
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default LegalInformation;