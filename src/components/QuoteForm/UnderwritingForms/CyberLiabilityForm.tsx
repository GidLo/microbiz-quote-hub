import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
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
        <Label htmlFor="SuminsuredforcyCYBER">Sum insured for cyber liability</Label>
        <Select
          value={formData['SuminsuredforcyCYBER'] || ''}
          onValueChange={(value) => handleInputChange('SuminsuredforcyCYBER', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select sum insured amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="R1,000,000">R1,000,000</SelectItem>
            <SelectItem value="R2,500,000">R2,500,000</SelectItem>
            <SelectItem value="R5,000,000">R5,000,000</SelectItem>
            <SelectItem value="R7,500,000">R7,500,000</SelectItem>
            <SelectItem value="R10,000,000">R10,000,000</SelectItem>
            <SelectItem value="R15,000,000">R15,000,000</SelectItem>
          </SelectContent>
        </Select>
        {errors['SuminsuredforcyCYBER'] && (
          <span className="text-sm text-red-500">{errors['SuminsuredforcyCYBER']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Are you based in South Africa and looking to insure only your South African operations?</Label>
        <RadioGroup
          value={formData['IsbasedinSouthACYBER']?.toString() || ''}
          onValueChange={(value) => handleInputChange('IsbasedinSouthACYBER', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="IsbasedinSouthACYBER-yes" />
            <Label htmlFor="IsbasedinSouthACYBER-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="IsbasedinSouthACYBER-no" />
            <Label htmlFor="IsbasedinSouthACYBER-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['IsbasedinSouthACYBER'] && (
          <span className="text-sm text-red-500">{errors['IsbasedinSouthACYBER']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Do you collect, store or process less than all of the below:</Label>
        <div className="text-sm text-muted-foreground mb-2 pl-4">
          <p>- 100 000 personally identifiable records</p>
          <p>- 100 000 bank records</p>
          <p>- 100 000 unique payment cards</p>
          <p>- 50 000 medical records</p>
        </div>
        <RadioGroup
          value={formData['CollectsstoresCYBER']?.toString() || ''}
          onValueChange={(value) => handleInputChange('CollectsstoresCYBER', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="CollectsstoresCYBER-yes" />
            <Label htmlFor="CollectsstoresCYBER-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="CollectsstoresCYBER-no" />
            <Label htmlFor="CollectsstoresCYBER-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['CollectsstoresCYBER'] && (
          <span className="text-sm text-red-500">{errors['CollectsstoresCYBER']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Do you confirm that you use multi factor authentication to gain access to payment applications?</Label>
        <RadioGroup
          value={formData['IsnotawareofanyCYBER']?.toString() || ''}
          onValueChange={(value) => handleInputChange('IsnotawareofanyCYBER', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="IsnotawareofanyCYBER-yes" />
            <Label htmlFor="IsnotawareofanyCYBER-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="IsnotawareofanyCYBER-no" />
            <Label htmlFor="IsnotawareofanyCYBER-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['IsnotawareofanyCYBER'] && (
          <span className="text-sm text-red-500">{errors['IsnotawareofanyCYBER']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="OurITEnvironmenCYBER">Our IT Environment can be best described as:</Label>
        <Select
          value={formData['OurITEnvironmenCYBER'] || ''}
          onValueChange={(value) => handleInputChange('OurITEnvironmenCYBER', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select IT environment description" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company-network">A company network comprising of multiple on-site computers/servers and some potential cloud systems</SelectItem>
            <SelectItem value="cloud-environment">A cloud environment where all your systems are cloud resident from where they are accessed by users</SelectItem>
            <SelectItem value="individual-computers">Runs off individual computers with no network or cloud systems</SelectItem>
          </SelectContent>
        </Select>
        {errors['OurITEnvironmenCYBER'] && (
          <span className="text-sm text-red-500">{errors['OurITEnvironmenCYBER']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>You, the undersigned confirm that the Insured has implemented and complies fully with the following security requirements:</Label>
        <div className="text-sm text-muted-foreground mb-2 pl-4 space-y-1">
          <p>• Active, paid for Internet Security software on all Sensitive Systems e.g Anti-Virus / Anti-Malware</p>
          <p>• Apply patches and updates noted as being critical by the provider within 1 month of release and general security related patches and updates within 3 months of release</p>
          <p>• Password controls including: length of at least 8 characters; use of passwords which are not easy to guess; multi factor authentication or passwords changed at least quarterly (unless passwords of at least 14 characters are used) and accounts are locked out after at most 10 failed authentication attempts</p>
          <p>• Resiliency procedures for Sensitive Systems and Sensitive Data including weekly backup generation or replication, monitoring or testing to ensure successful generation, having a copy which at any point in time is disconnected, offline or cannot be overwritten from the production environment and test the ability to restore or read copies at least every 6 months</p>
        </div>
        <RadioGroup
          value={formData['YoutheundersigCYBER']?.toString() || ''}
          onValueChange={(value) => handleInputChange('YoutheundersigCYBER', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="YoutheundersigCYBER-yes" />
            <Label htmlFor="YoutheundersigCYBER-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="YoutheundersigCYBER-no" />
            <Label htmlFor="YoutheundersigCYBER-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['YoutheundersigCYBER'] && (
          <span className="text-sm text-red-500">{errors['YoutheundersigCYBER']}</span>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>In addition, can you confirm that you have implemented and comply fully with the following minimum security requirements:</Label>
        <div className="text-sm text-muted-foreground mb-2 pl-4">
          <p>- Firewalls</p>
          <p>- VPN</p>
          <p>- Activity logs retention</p>
        </div>
        <RadioGroup
          value={formData['InadditionyoucCYBER']?.toString() || ''}
          onValueChange={(value) => handleInputChange('InadditionyoucCYBER', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="InadditionyoucCYBER-yes" />
            <Label htmlFor="InadditionyoucCYBER-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="InadditionyoucCYBER-no" />
            <Label htmlFor="InadditionyoucCYBER-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['InadditionyoucCYBER'] && (
          <span className="text-sm text-red-500">{errors['InadditionyoucCYBER']}</span>
        )}
      </motion.div>
    </div>
  );
};

export default CyberLiabilityForm;