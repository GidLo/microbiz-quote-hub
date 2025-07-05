import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MedicalMalpracticeFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const MedicalMalpracticeForm = ({ formData, setFormData, errors, setErrors }: MedicalMalpracticeFormProps) => {
  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData({ [fieldName]: value });
    
    // Clear error when user starts typing/selecting
    if (errors[fieldName]) {
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  };

  const sumInsuredOptions = [
    'R1,000,000',
    'R2,000,000',
    'R3,000,000',
    'R4,000,000',
    'R5,000,000',
    'R10,000,000',
    'Other'
  ];

  const patientVolumeOptions = [
    'Less than 100',
    '100 - 500',
    '501 - 1,000',
    '1,001 - 2,000',
    '2,001 - 5,000',
    'More than 5,000'
  ];

  const procedureVolumeOptions = [
    'Less than 50',
    '50 - 200',
    '201 - 500',
    '501 - 1,000',
    '1,001 - 2,000',
    'More than 2,000'
  ];

  const percentageOptions = [
    '0%',
    '1-10%',
    '11-25%',
    '26-50%',
    '51-75%',
    '76-100%'
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Cover */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyoucurrentlyhaveMEDICALMALPRACTICE_1"
            checked={formData['DoyoucurrentlyhaveMEDICALMALPRACTICE_1'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyoucurrentlyhaveMEDICALMALPRACTICE_1', checked)
            }
          />
          <Label 
            htmlFor="DoyoucurrentlyhaveMEDICALMALPRACTICE_1"
            className={cn(errors['DoyoucurrentlyhaveMEDICALMALPRACTICE_1'] && "text-red-500")}
          >
            Do you currently have Medical Malpractice cover in place?
          </Label>
        </div>
        {errors['DoyoucurrentlyhaveMEDICALMALPRACTICE_1'] && (
          <p className="text-sm text-red-500">{errors['DoyoucurrentlyhaveMEDICALMALPRACTICE_1']}</p>
        )}
      </motion.div>

      {/* Inception Date for Existing Cover */}
      {formData['DoyoucurrentlyhaveMEDICALMALPRACTICE_1'] && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label className={cn(errors['InceptiondateforexistingcoverMEDICALMALPRACTICE_1'] && "text-red-500")}>
            What is the retroactive date of your existing cover? *
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData['InceptiondateforexistingcoverMEDICALMALPRACTICE_1'] && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData['InceptiondateforexistingcoverMEDICALMALPRACTICE_1'] ? (
                  format(formData['InceptiondateforexistingcoverMEDICALMALPRACTICE_1'], "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData['InceptiondateforexistingcoverMEDICALMALPRACTICE_1']}
                onSelect={(date) => handleFieldChange('InceptiondateforexistingcoverMEDICALMALPRACTICE_1', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors['InceptiondateforexistingcoverMEDICALMALPRACTICE_1'] && (
            <p className="text-sm text-red-500">{errors['InceptiondateforexistingcoverMEDICALMALPRACTICE_1']}</p>
          )}
        </motion.div>
      )}

      {/* Sum Insured Required */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['SuminsuredrequiMEDICALMALPRACTICE_10'] && "text-red-500")}>
          Sum insured required (Limit of indemnity) for Medical Malpractice *
        </Label>
        <Select
          value={formData['SuminsuredrequiMEDICALMALPRACTICE_10'] || ''}
          onValueChange={(value) => handleFieldChange('SuminsuredrequiMEDICALMALPRACTICE_10', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select sum insured amount" />
          </SelectTrigger>
          <SelectContent>
            {sumInsuredOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors['SuminsuredrequiMEDICALMALPRACTICE_10'] && (
          <p className="text-sm text-red-500">{errors['SuminsuredrequiMEDICALMALPRACTICE_10']}</p>
        )}
      </motion.div>

      {/* Registration Confirmation */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouconfirmthaMEDICALMALPRACTICE_1"
            checked={formData['DoyouconfirmthaMEDICALMALPRACTICE_1'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_1', checked)
            }
          />
          <Label 
            htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_1"
            className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_1'] && "text-red-500")}
          >
            Are you registered with the relevant regulatory body and hold all necessary qualifications for your profession?
          </Label>
        </div>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_1'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_1']}</p>
        )}
      </motion.div>

      {/* Registration Number */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['HPCSAAHPCSAregMEDICALMALPRACTICE'] && "text-red-500")}>
          Enter your (A/HPCSA, SANC, SAPC) registration number (If not applicable, simply note NA) *
        </Label>
        <Input
          value={formData['HPCSAAHPCSAregMEDICALMALPRACTICE'] || ''}
          onChange={(e) => handleFieldChange('HPCSAAHPCSAregMEDICALMALPRACTICE', e.target.value)}
          placeholder="Enter registration number or NA"
        />
        {errors['HPCSAAHPCSAregMEDICALMALPRACTICE'] && (
          <p className="text-sm text-red-500">{errors['HPCSAAHPCSAregMEDICALMALPRACTICE']}</p>
        )}
      </motion.div>

      {/* South Africa Domiciled */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouconfirmthaMEDICALMALPRACTICE_2"
            checked={formData['DoyouconfirmthaMEDICALMALPRACTICE_2'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_2', checked)
            }
          />
          <Label 
            htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_2"
            className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_2'] && "text-red-500")}
          >
            Are you domiciled in South Africa and solely operate within the country?
          </Label>
        </div>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_2'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_2']}</p>
        )}
      </motion.div>

      {/* State/Government Facility Exclusion */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouconfirmthaMEDICALMALPRACTICE_3"
            checked={formData['DoyouconfirmthaMEDICALMALPRACTICE_3'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_3', checked)
            }
          />
          <Label 
            htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_3"
            className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_3'] && "text-red-500")}
          >
            Do you acknowledge/confirm that under this policy, you will not have cover for any work you undertake in or on behalf of any state/government owned/ run clinic/ facility?
          </Label>
        </div>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_3'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_3']}</p>
        )}
      </motion.div>

      {/* Multiple Confirmations */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="DoyouconfirmthaMEDICALMALPRACTICE_4"
            checked={formData['DoyouconfirmthaMEDICALMALPRACTICE_4'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_4', checked)
            }
            className="mt-1"
          />
          <Label 
            htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_4"
            className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_4'] && "text-red-500", "leading-relaxed")}
          >
            Do you confirm that:
            <br />• You have not been investigated, or are currently under investigation by the HPCSA / relevant professional regulatory body / medical scheme?
            <br />• You are not aware of any circumstances within the past 5 years that would have, may give or has given rise to a claim under the coverage provided by this insurance policy?
            <br />• You have not had any criminal claims/allegations of any nature made against you?
          </Label>
        </div>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_4'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_4']}</p>
        )}
      </motion.div>

      {/* Consent Forms */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouconfirmthaMEDICALMALPRACTICE_5"
            checked={formData['DoyouconfirmthaMEDICALMALPRACTICE_5'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_5', checked)
            }
          />
          <Label 
            htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_5"
            className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_5'] && "text-red-500")}
          >
            Do you require patients/third parties to complete consent forms in line with the HPCSA/relevant professional regulatory body guidelines?
          </Label>
        </div>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_5'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_5']}</p>
        )}
      </motion.div>

      {/* Patient Records */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouconfirmyouMEDICALMALPRACTICE_6"
            checked={formData['DoyouconfirmyouMEDICALMALPRACTICE_6'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouconfirmyouMEDICALMALPRACTICE_6', checked)
            }
          />
          <Label 
            htmlFor="DoyouconfirmyouMEDICALMALPRACTICE_6"
            className={cn(errors['DoyouconfirmyouMEDICALMALPRACTICE_6'] && "text-red-500")}
          >
            Do you maintain accurate patient records as per the guidelines of the HPCSA/relevant professional regulatory body?
          </Label>
        </div>
        {errors['DoyouconfirmyouMEDICALMALPRACTICE_6'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmyouMEDICALMALPRACTICE_6']}</p>
        )}
      </motion.div>

      {/* Policy Coverage Acknowledgment */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouacknowledgepolicyMEDICALMALPRACTICE_1"
            checked={formData['DoyouacknowledgepolicyMEDICALMALPRACTICE_1'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouacknowledgepolicyMEDICALMALPRACTICE_1', checked)
            }
          />
          <Label 
            htmlFor="DoyouacknowledgepolicyMEDICALMALPRACTICE_1"
            className={cn(errors['DoyouacknowledgepolicyMEDICALMALPRACTICE_1'] && "text-red-500")}
          >
            Do you confirm that this policy is solely for covering you as a medical professional and acknowledge that it will not cover other medical professionals?
          </Label>
        </div>
        {errors['DoyouacknowledgepolicyMEDICALMALPRACTICE_1'] && (
          <p className="text-sm text-red-500">{errors['DoyouacknowledgepolicyMEDICALMALPRACTICE_1']}</p>
        )}
      </motion.div>

      {/* Botox/Aesthetics Exclusion */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="BotoxFillersMEDICALMALPRACTICE_1"
            checked={formData['BotoxFillersMEDICALMALPRACTICE_1'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('BotoxFillersMEDICALMALPRACTICE_1', checked)
            }
          />
          <Label 
            htmlFor="BotoxFillersMEDICALMALPRACTICE_1"
            className={cn(errors['BotoxFillersMEDICALMALPRACTICE_1'] && "text-red-500")}
          >
            Can you confirm that your practice does not include botox, aesthetics, threading, and fillers?
          </Label>
        </div>
        {errors['BotoxFillersMEDICALMALPRACTICE_1'] && (
          <p className="text-sm text-red-500">{errors['BotoxFillersMEDICALMALPRACTICE_1']}</p>
        )}
      </motion.div>

      {/* Hours per Week */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="Doyouconfirmlessthan60MEDICALMALPRACTICE"
            checked={formData['Doyouconfirmlessthan60MEDICALMALPRACTICE'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('Doyouconfirmlessthan60MEDICALMALPRACTICE', checked)
            }
          />
          <Label 
            htmlFor="Doyouconfirmlessthan60MEDICALMALPRACTICE"
            className={cn(errors['Doyouconfirmlessthan60MEDICALMALPRACTICE'] && "text-red-500")}
          >
            Do you confirm that you spend less than 60 hours per week in private consultations?
          </Label>
        </div>
        {errors['Doyouconfirmlessthan60MEDICALMALPRACTICE'] && (
          <p className="text-sm text-red-500">{errors['Doyouconfirmlessthan60MEDICALMALPRACTICE']}</p>
        )}
      </motion.div>

      {/* Number of Patients */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['HowmanypatientsMEDICALMALPRACTICE'] && "text-red-500")}>
          How many patients do you consult per annum? *
        </Label>
        <Select
          value={formData['HowmanypatientsMEDICALMALPRACTICE'] || ''}
          onValueChange={(value) => handleFieldChange('HowmanypatientsMEDICALMALPRACTICE', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select patient volume" />
          </SelectTrigger>
          <SelectContent>
            {patientVolumeOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors['HowmanypatientsMEDICALMALPRACTICE'] && (
          <p className="text-sm text-red-500">{errors['HowmanypatientsMEDICALMALPRACTICE']}</p>
        )}
      </motion.div>

      {/* Number of Procedures */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['HowmanyproceduresMEDICALMALPRACTICE'] && "text-red-500")}>
          How many procedures do you perform per annum? *
        </Label>
        <Select
          value={formData['HowmanyproceduresMEDICALMALPRACTICE'] || ''}
          onValueChange={(value) => handleFieldChange('HowmanyproceduresMEDICALMALPRACTICE', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select procedure volume" />
          </SelectTrigger>
          <SelectContent>
            {procedureVolumeOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors['HowmanyproceduresMEDICALMALPRACTICE'] && (
          <p className="text-sm text-red-500">{errors['HowmanyproceduresMEDICALMALPRACTICE']}</p>
        )}
      </motion.div>

      {/* Telehealth Services */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouperformteleMEDICALMALPRACTICE"
            checked={formData['DoyouperformteleMEDICALMALPRACTICE'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouperformteleMEDICALMALPRACTICE', checked)
            }
          />
          <Label 
            htmlFor="DoyouperformteleMEDICALMALPRACTICE"
            className={cn(errors['DoyouperformteleMEDICALMALPRACTICE'] && "text-red-500")}
          >
            Do you perform any telehealth services?
          </Label>
        </div>
        {errors['DoyouperformteleMEDICALMALPRACTICE'] && (
          <p className="text-sm text-red-500">{errors['DoyouperformteleMEDICALMALPRACTICE']}</p>
        )}
      </motion.div>

      {/* Telehealth Percentage */}
      {formData['DoyouperformteleMEDICALMALPRACTICE'] && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label className={cn(errors['PercentageofyourMEDICALMALPRACTICE'] && "text-red-500")}>
            What percentage of your work involves telehealth services? *
          </Label>
          <Select
            value={formData['PercentageofyourMEDICALMALPRACTICE'] || ''}
            onValueChange={(value) => handleFieldChange('PercentageofyourMEDICALMALPRACTICE', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select percentage" />
            </SelectTrigger>
            <SelectContent>
              {percentageOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors['PercentageofyourMEDICALMALPRACTICE'] && (
            <p className="text-sm text-red-500">{errors['PercentageofyourMEDICALMALPRACTICE']}</p>
          )}
        </motion.div>
      )}

      {/* Surgical Treatments */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouperformsurgiMEDICALMALPRACTICE"
            checked={formData['DoyouperformsurgiMEDICALMALPRACTICE'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouperformsurgiMEDICALMALPRACTICE', checked)
            }
          />
          <Label 
            htmlFor="DoyouperformsurgiMEDICALMALPRACTICE"
            className={cn(errors['DoyouperformsurgiMEDICALMALPRACTICE'] && "text-red-500")}
          >
            Do you perform any surgical treatments or aesthetics and cosmetic procedures?
          </Label>
        </div>
        {errors['DoyouperformsurgiMEDICALMALPRACTICE'] && (
          <p className="text-sm text-red-500">{errors['DoyouperformsurgiMEDICALMALPRACTICE']}</p>
        )}
      </motion.div>

      {/* Additional Coverage */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="AdditionalcoveragesMEDICALMALPRACTICE"
            checked={formData['AdditionalcoveragesMEDICALMALPRACTICE'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('AdditionalcoveragesMEDICALMALPRACTICE', checked)
            }
          />
          <Label 
            htmlFor="AdditionalcoveragesMEDICALMALPRACTICE"
            className={cn(errors['AdditionalcoveragesMEDICALMALPRACTICE'] && "text-red-500")}
          >
            One of our insurers offers an additional coverage at an increased premium. This includes fidelity guarantee. Do you wish to add this coverage?
          </Label>
        </div>
        {errors['AdditionalcoveragesMEDICALMALPRACTICE'] && (
          <p className="text-sm text-red-500">{errors['AdditionalcoveragesMEDICALMALPRACTICE']}</p>
        )}
      </motion.div>

      {/* Medico-Legal Work */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1"
            checked={formData['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1', checked)
            }
          />
          <Label 
            htmlFor="DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1"
            className={cn(errors['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1'] && "text-red-500")}
          >
            Do you undertake Medico-legal work?
          </Label>
        </div>
        {errors['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1'] && (
          <p className="text-sm text-red-500">{errors['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1']}</p>
        )}
      </motion.div>

      {/* Medico-Legal Work Percentage */}
      {formData['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1'] && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label className={cn(errors['DoesMedicoLegalWorkContributeMEDICALMALPRACTICE'] && "text-red-500")}>
            What percentage does medico-legal work contribute to your work? *
          </Label>
          <Select
            value={formData['DoesMedicoLegalWorkContributeMEDICALMALPRACTICE'] || ''}
            onValueChange={(value) => handleFieldChange('DoesMedicoLegalWorkContributeMEDICALMALPRACTICE', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select percentage" />
            </SelectTrigger>
            <SelectContent>
              {percentageOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors['DoesMedicoLegalWorkContributeMEDICALMALPRACTICE'] && (
            <p className="text-sm text-red-500">{errors['DoesMedicoLegalWorkContributeMEDICALMALPRACTICE']}</p>
          )}
        </motion.div>
      )}

      {/* Public Liability Addition */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="DoyouwishtoaddPMEDICALMALPRACTICE_11"
            checked={formData['DoyouwishtoaddPMEDICALMALPRACTICE_11'] || false}
            onCheckedChange={(checked) => 
              handleFieldChange('DoyouwishtoaddPMEDICALMALPRACTICE_11', checked)
            }
          />
          <Label 
            htmlFor="DoyouwishtoaddPMEDICALMALPRACTICE_11"
            className={cn(errors['DoyouwishtoaddPMEDICALMALPRACTICE_11'] && "text-red-500")}
          >
            Do you wish to add Public Liability cover to your policy for the same amount as the main limit?
          </Label>
        </div>
        {errors['DoyouwishtoaddPMEDICALMALPRACTICE_11'] && (
          <p className="text-sm text-red-500">{errors['DoyouwishtoaddPMEDICALMALPRACTICE_11']}</p>
        )}
      </motion.div>
    </div>
  );
};

export default MedicalMalpracticeForm;