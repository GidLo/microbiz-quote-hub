import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface MedicalMalpracticeFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  contactDetails?: any;
}

const MedicalMalpracticeForm = ({ formData, setFormData, errors, setErrors, contactDetails }: MedicalMalpracticeFormProps) => {
  const [occupationName, setOccupationName] = useState<string>('');

  // Fetch occupation name when contactDetails change
  useEffect(() => {
    const fetchOccupationName = async () => {
      if (contactDetails?.occupationId) {
        const { data } = await supabase
          .from('occupations')
          .select('name')
          .eq('id', contactDetails.occupationId)
          .single();
        
        if (data) {
          setOccupationName(data.name);
        }
      }
    };

    fetchOccupationName();
  }, [contactDetails]);

  // Define occupation groups based on occupation codes
  const isAlliedHealth = [
    'Biokineticists',
    'Chiropractor',
    'Physiotherapists',
    'Activities_of_physiotherapists',
    'Homeopaths'
  ].some(code => occupationName.includes(code));

  const isDentist = [
    'Dentist_excluding_Cosmetics__Aesthetics',
    'Oral_Medicine__Periodontics',
    'Orthodontics__excluding_Cosmetics__Aesthetics'
  ].some(code => occupationName.includes(code));

  const isGP = [
    'GP_minor_procedures_in_rooms',
    'GP_NonProcedural',
    'GP_AE_or_procedural_excl_scans_excl_obstetrics',
    'GP_Procedural_incl_basic_scans_excl_deliveries',
    'GP_Anaesthetics',
    'Family_Medicine',
    'Family_Physician',
    'Geriatrics_Specialist_Family_Medicine'
  ].some(code => occupationName.includes(code));

  const isSpecialist = [
    'Internal_Medicine',
    'Physician_incl_int_medicine_or_nephrology_no_surgery',
    'Endocrinologist',
    'Nephrology',
    'Pulmonologist',
    'Rheumatology',
    'Oncologist',
    'Pathology',
    'Ophthalmology_excluding_laser_refractive_surgery'
  ].some(code => occupationName.includes(code));

  const isParamedical = [
    'Clinical_Associate',
    'Nurse_Practitioner',
    'Occupational_nurse_or_nurse_wound_care_only'
  ].some(code => occupationName.includes(code));

  // Specific occupations that should see the 60-hour question
  const shouldShow60HourQuestion = [
    'Biokineticists',
    'Chiropractor', 
    'Dentist_excluding_Cosmetics__Aesthetics',
    'Oral_Medicine__Periodontics',
    'Orthodontics__excluding_Cosmetics__Aesthetics',
    'GP_minor_procedures_in_rooms',
    'GP_NonProcedural',
    'GP_AE_or_procedural_excl_scans_excl_obstetrics',
    'GP_Procedural_incl_basic_scans_excl_deliveries',
    'GP_Anaesthetics',
    'Internal_Medicine',
    'Physician_incl_int_medicine_or_nephrology_no_surgery',
    'Endocrinologist',
    'Family_Medicine',
    'Family_Physician',
    'Geriatrics_Specialist_Family_Medicine',
    'Clinical_Associate',
    'Homeopaths',
    'Nurse_Practitioner',
    'Occupational_nurse_or_nurse_wound_care_only',
    'Physiotherapists',
    'Activities_of_physiotherapists',
    'Nephrology',
    'Pulmonologist',
    'Rheumatology',
    'Oncologist',
    'Pathology',
    'Ophthalmology_excluding_laser_refractive_surgery'
  ].some(code => occupationName.includes(code));

  // Specific occupations for Botox/Aesthetics question
  const shouldShowBotoxQuestion = [
    'Beauty_therapist_Facial_chemical_peels_<30%',
    'Skin_Care_Clinic'
  ].some(code => occupationName.includes(code));

  // Clinical practitioners include GPs, specialists, dentists, and paramedical
  const isClinicalPractitioner = isGP || isSpecialist || isDentist || isParamedical;
  
  // Procedural practitioners include GPs with procedures and specialists
  const isProceduralPractitioner = isGP || isSpecialist || isDentist;

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
    'R5,000,000'
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
      {/* Current Cover - Universal */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyoucurrentlyhaveMEDICALMALPRACTICE_1'] && "text-red-500")}>
          Do you currently have Medical Malpractice cover in place?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyoucurrentlyhaveMEDICALMALPRACTICE_1', value === 'yes')}
          defaultValue={formData['DoyoucurrentlyhaveMEDICALMALPRACTICE_1'] === true ? 'yes' : 
                       formData['DoyoucurrentlyhaveMEDICALMALPRACTICE_1'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyoucurrentlyhaveMEDICALMALPRACTICE_1-yes" />
            <Label htmlFor="DoyoucurrentlyhaveMEDICALMALPRACTICE_1-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyoucurrentlyhaveMEDICALMALPRACTICE_1-no" />
            <Label htmlFor="DoyoucurrentlyhaveMEDICALMALPRACTICE_1-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyoucurrentlyhaveMEDICALMALPRACTICE_1'] && (
          <p className="text-sm text-red-500">{errors['DoyoucurrentlyhaveMEDICALMALPRACTICE_1']}</p>
        )}
      </motion.div>

      {/* Inception Date for Existing Cover - Universal */}
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

      {/* Sum Insured Required - Universal */}
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

      {/* Registration Confirmation - Universal */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_1'] && "text-red-500")}>
          Are you registered with the relevant regulatory body and hold all necessary qualifications for your profession?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_1', value === 'yes')}
          defaultValue={formData['DoyouconfirmthaMEDICALMALPRACTICE_1'] === true ? 'yes' : 
                       formData['DoyouconfirmthaMEDICALMALPRACTICE_1'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmthaMEDICALMALPRACTICE_1-yes" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_1-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmthaMEDICALMALPRACTICE_1-no" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_1-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_1'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_1']}</p>
        )}
      </motion.div>

      {/* Registration Number - Universal */}
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

      {/* South Africa Domiciled - Universal */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_2'] && "text-red-500")}>
          Are you domiciled in South Africa and solely operate within the country?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_2', value === 'yes')}
          defaultValue={formData['DoyouconfirmthaMEDICALMALPRACTICE_2'] === true ? 'yes' : 
                       formData['DoyouconfirmthaMEDICALMALPRACTICE_2'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmthaMEDICALMALPRACTICE_2-yes" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_2-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmthaMEDICALMALPRACTICE_2-no" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_2-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_2'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_2']}</p>
        )}
      </motion.div>

      {/* State/Government Facility Exclusion - Universal */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_3'] && "text-red-500")}>
          Do you acknowledge/confirm that under this policy, you will not have cover for any work you undertake in or on behalf of any state/government owned/ run clinic/ facility?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_3', value === 'yes')}
          defaultValue={formData['DoyouconfirmthaMEDICALMALPRACTICE_3'] === true ? 'yes' : 
                       formData['DoyouconfirmthaMEDICALMALPRACTICE_3'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmthaMEDICALMALPRACTICE_3-yes" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_3-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmthaMEDICALMALPRACTICE_3-no" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_3-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_3'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_3']}</p>
        )}
      </motion.div>

      {/* Multiple Confirmations - Universal */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_4'] && "text-red-500", "leading-relaxed")}>
          Do you confirm that:
          <br />• You have not been investigated, or are currently under investigation by the HPCSA / relevant professional regulatory body / medical scheme?
          <br />• You are not aware of any circumstances within the past 5 years that would have, may give or has given rise to a claim under the coverage provided by this insurance policy?
          <br />• You have not had any criminal claims/allegations of any nature made against you?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_4', value === 'yes')}
          defaultValue={formData['DoyouconfirmthaMEDICALMALPRACTICE_4'] === true ? 'yes' : 
                       formData['DoyouconfirmthaMEDICALMALPRACTICE_4'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmthaMEDICALMALPRACTICE_4-yes" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_4-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmthaMEDICALMALPRACTICE_4-no" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_4-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_4'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_4']}</p>
        )}
      </motion.div>

      {/* Consent Forms - Universal */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyouconfirmthaMEDICALMALPRACTICE_5'] && "text-red-500")}>
          Do you require patients/third parties to complete consent forms in line with the HPCSA/relevant professional regulatory body guidelines?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyouconfirmthaMEDICALMALPRACTICE_5', value === 'yes')}
          defaultValue={formData['DoyouconfirmthaMEDICALMALPRACTICE_5'] === true ? 'yes' : 
                       formData['DoyouconfirmthaMEDICALMALPRACTICE_5'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmthaMEDICALMALPRACTICE_5-yes" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_5-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmthaMEDICALMALPRACTICE_5-no" />
            <Label htmlFor="DoyouconfirmthaMEDICALMALPRACTICE_5-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmthaMEDICALMALPRACTICE_5'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaMEDICALMALPRACTICE_5']}</p>
        )}
      </motion.div>

      {/* Patient Records - Universal */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyouconfirmyouMEDICALMALPRACTICE_6'] && "text-red-500")}>
          Do you maintain accurate patient records as per the guidelines of the HPCSA/relevant professional regulatory body?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyouconfirmyouMEDICALMALPRACTICE_6', value === 'yes')}
          defaultValue={formData['DoyouconfirmyouMEDICALMALPRACTICE_6'] === true ? 'yes' : 
                       formData['DoyouconfirmyouMEDICALMALPRACTICE_6'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmyouMEDICALMALPRACTICE_6-yes" />
            <Label htmlFor="DoyouconfirmyouMEDICALMALPRACTICE_6-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmyouMEDICALMALPRACTICE_6-no" />
            <Label htmlFor="DoyouconfirmyouMEDICALMALPRACTICE_6-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmyouMEDICALMALPRACTICE_6'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmyouMEDICALMALPRACTICE_6']}</p>
        )}
      </motion.div>

      {/* Policy Coverage Acknowledgment - Universal */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyouacknowledgepolicyMEDICALMALPRACTICE_1'] && "text-red-500")}>
          Do you confirm that this policy is solely for covering you as a medical professional and acknowledge that it will not cover other medical professionals?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyouacknowledgepolicyMEDICALMALPRACTICE_1', value === 'yes')}
          defaultValue={formData['DoyouacknowledgepolicyMEDICALMALPRACTICE_1'] === true ? 'yes' : 
                       formData['DoyouacknowledgepolicyMEDICALMALPRACTICE_1'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouacknowledgepolicyMEDICALMALPRACTICE_1-yes" />
            <Label htmlFor="DoyouacknowledgepolicyMEDICALMALPRACTICE_1-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouacknowledgepolicyMEDICALMALPRACTICE_1-no" />
            <Label htmlFor="DoyouacknowledgepolicyMEDICALMALPRACTICE_1-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyouacknowledgepolicyMEDICALMALPRACTICE_1'] && (
          <p className="text-sm text-red-500">{errors['DoyouacknowledgepolicyMEDICALMALPRACTICE_1']}</p>
        )}
      </motion.div>

      {/* Botox/Aesthetics Exclusion - Show for specific beauty/skincare occupations only */}
      {shouldShowBotoxQuestion && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label className={cn(errors['BotoxFillersMEDICALMALPRACTICE_1'] && "text-red-500")}>
            Can you confirm that your practice does not include botox, aesthetics, threading, and fillers?
          </Label>
          <RadioGroup
            onValueChange={(value) => handleFieldChange('BotoxFillersMEDICALMALPRACTICE_1', value === 'yes')}
            defaultValue={formData['BotoxFillersMEDICALMALPRACTICE_1'] === true ? 'yes' : 
                         formData['BotoxFillersMEDICALMALPRACTICE_1'] === false ? 'no' : undefined}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="BotoxFillersMEDICALMALPRACTICE_1-yes" />
              <Label htmlFor="BotoxFillersMEDICALMALPRACTICE_1-yes">YES</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="BotoxFillersMEDICALMALPRACTICE_1-no" />
              <Label htmlFor="BotoxFillersMEDICALMALPRACTICE_1-no">NO</Label>
            </div>
          </RadioGroup>
          {errors['BotoxFillersMEDICALMALPRACTICE_1'] && (
            <p className="text-sm text-red-500">{errors['BotoxFillersMEDICALMALPRACTICE_1']}</p>
          )}
        </motion.div>
      )}

      {/* Hours per Week - Show for specific occupations only */}
      {shouldShow60HourQuestion && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label className={cn(errors['Doyouconfirmlessthan60MEDICALMALPRACTICE'] && "text-red-500")}>
            Do you confirm that you spend less than 60 hours per week in private consultations?
          </Label>
          <RadioGroup
            onValueChange={(value) => handleFieldChange('Doyouconfirmlessthan60MEDICALMALPRACTICE', value === 'yes')}
            defaultValue={formData['Doyouconfirmlessthan60MEDICALMALPRACTICE'] === true ? 'yes' : 
                         formData['Doyouconfirmlessthan60MEDICALMALPRACTICE'] === false ? 'no' : undefined}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="Doyouconfirmlessthan60MEDICALMALPRACTICE-yes" />
              <Label htmlFor="Doyouconfirmlessthan60MEDICALMALPRACTICE-yes">YES</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="Doyouconfirmlessthan60MEDICALMALPRACTICE-no" />
              <Label htmlFor="Doyouconfirmlessthan60MEDICALMALPRACTICE-no">NO</Label>
            </div>
          </RadioGroup>
          {errors['Doyouconfirmlessthan60MEDICALMALPRACTICE'] && (
            <p className="text-sm text-red-500">{errors['Doyouconfirmlessthan60MEDICALMALPRACTICE']}</p>
          )}
        </motion.div>
      )}

      {/* Number of Patients - Show for specific occupations only */}
      {shouldShow60HourQuestion && (
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
      )}

      {/* Number of Procedures - Show for specific occupations only */}
      {shouldShow60HourQuestion && (
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
      )}

      {/* Telehealth Services - Show for all occupations */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyouperformteleMEDICALMALPRACTICE'] && "text-red-500")}>
          Do you perform any telehealth services?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyouperformteleMEDICALMALPRACTICE', value === 'yes')}
          defaultValue={formData['DoyouperformteleMEDICALMALPRACTICE'] === true ? 'yes' : 
                       formData['DoyouperformteleMEDICALMALPRACTICE'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouperformteleMEDICALMALPRACTICE-yes" />
            <Label htmlFor="DoyouperformteleMEDICALMALPRACTICE-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouperformteleMEDICALMALPRACTICE-no" />
            <Label htmlFor="DoyouperformteleMEDICALMALPRACTICE-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyouperformteleMEDICALMALPRACTICE'] && (
          <p className="text-sm text-red-500">{errors['DoyouperformteleMEDICALMALPRACTICE']}</p>
        )}
      </motion.div>

      {/* Telehealth Percentage - Show for all occupations who do telehealth */}
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

      {/* Surgical Treatments - Show for specific occupations only */}
      {shouldShow60HourQuestion && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label className={cn(errors['DoyouperformsurgiMEDICALMALPRACTICE'] && "text-red-500")}>
            Do you perform any surgical treatments or aesthetics and cosmetic procedures?
          </Label>
          <RadioGroup
            onValueChange={(value) => handleFieldChange('DoyouperformsurgiMEDICALMALPRACTICE', value === 'yes')}
            defaultValue={formData['DoyouperformsurgiMEDICALMALPRACTICE'] === true ? 'yes' : 
                         formData['DoyouperformsurgiMEDICALMALPRACTICE'] === false ? 'no' : undefined}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="DoyouperformsurgiMEDICALMALPRACTICE-yes" />
              <Label htmlFor="DoyouperformsurgiMEDICALMALPRACTICE-yes">YES</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="DoyouperformsurgiMEDICALMALPRACTICE-no" />
              <Label htmlFor="DoyouperformsurgiMEDICALMALPRACTICE-no">NO</Label>
            </div>
          </RadioGroup>
          {errors['DoyouperformsurgiMEDICALMALPRACTICE'] && (
            <p className="text-sm text-red-500">{errors['DoyouperformsurgiMEDICALMALPRACTICE']}</p>
          )}
        </motion.div>
      )}

      {/* Additional Coverage - Show for all occupations */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['AdditionalcoveragesMEDICALMALPRACTICE'] && "text-red-500")}>
          One of our insurers offers an additional coverage at an increased premium. This includes fidelity guarantee. Do you wish to add this coverage?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('AdditionalcoveragesMEDICALMALPRACTICE', value === 'yes')}
          defaultValue={formData['AdditionalcoveragesMEDICALMALPRACTICE'] === true ? 'yes' : 
                       formData['AdditionalcoveragesMEDICALMALPRACTICE'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="AdditionalcoveragesMEDICALMALPRACTICE-yes" />
            <Label htmlFor="AdditionalcoveragesMEDICALMALPRACTICE-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="AdditionalcoveragesMEDICALMALPRACTICE-no" />
            <Label htmlFor="AdditionalcoveragesMEDICALMALPRACTICE-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['AdditionalcoveragesMEDICALMALPRACTICE'] && (
          <p className="text-sm text-red-500">{errors['AdditionalcoveragesMEDICALMALPRACTICE']}</p>
        )}
      </motion.div>

      {/* Medico-Legal Work - Show for specialists and GPs */}
      {(isSpecialist || isGP) && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label className={cn(errors['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1'] && "text-red-500")}>
            Do you undertake Medico-legal work?
          </Label>
          <RadioGroup
            onValueChange={(value) => handleFieldChange('DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1', value === 'yes')}
            defaultValue={formData['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1'] === true ? 'yes' : 
                         formData['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1'] === false ? 'no' : undefined}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1-yes" />
              <Label htmlFor="DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1-yes">YES</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1-no" />
              <Label htmlFor="DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1-no">NO</Label>
            </div>
          </RadioGroup>
          {errors['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1'] && (
            <p className="text-sm text-red-500">{errors['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1']}</p>
          )}
        </motion.div>
      )}

      {/* Medico-Legal Work Percentage - Show for specialists and GPs who do medico-legal work */}
      {(isSpecialist || isGP) && formData['DoyouUndertakeMedicoLegalMEDICALMALPRACTICE_1'] && (
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

      {/* Public Liability Addition - Show for all occupations */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className={cn(errors['DoyouwishtoaddPMEDICALMALPRACTICE_11'] && "text-red-500")}>
          Do you wish to add Public Liability cover to your policy for the same amount as the main limit?
        </Label>
        <RadioGroup
          onValueChange={(value) => handleFieldChange('DoyouwishtoaddPMEDICALMALPRACTICE_11', value === 'yes')}
          defaultValue={formData['DoyouwishtoaddPMEDICALMALPRACTICE_11'] === true ? 'yes' : 
                       formData['DoyouwishtoaddPMEDICALMALPRACTICE_11'] === false ? 'no' : undefined}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouwishtoaddPMEDICALMALPRACTICE_11-yes" />
            <Label htmlFor="DoyouwishtoaddPMEDICALMALPRACTICE_11-yes">YES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouwishtoaddPMEDICALMALPRACTICE_11-no" />
            <Label htmlFor="DoyouwishtoaddPMEDICALMALPRACTICE_11-no">NO</Label>
          </div>
        </RadioGroup>
        {errors['DoyouwishtoaddPMEDICALMALPRACTICE_11'] && (
          <p className="text-sm text-red-500">{errors['DoyouwishtoaddPMEDICALMALPRACTICE_11']}</p>
        )}
      </motion.div>
    </div>
  );
};

export default MedicalMalpracticeForm;
