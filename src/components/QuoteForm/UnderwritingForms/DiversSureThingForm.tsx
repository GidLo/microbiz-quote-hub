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

interface DiversSureThingFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const DiversSureThingForm = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors 
}: DiversSureThingFormProps) => {
  
  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({ [fieldName]: value });
    
    // Clear error when user starts typing/selecting
    if (errors[fieldName]) {
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  };

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
      {/* Business or Sole Proprietor */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="IstheinsuranceforabusinessSURETHING">
          Is the insurance for a business or covering you as a sole proprietor? <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.IstheinsuranceforabusinessSURETHING || ""}
          onValueChange={(value) => handleInputChange('IstheinsuranceforabusinessSURETHING', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Sole Proprietor">Sole Proprietor</SelectItem>
          </SelectContent>
        </Select>
        {errors.IstheinsuranceforabusinessSURETHING && (
          <p className="text-red-500 text-sm">{errors.IstheinsuranceforabusinessSURETHING}</p>
        )}
      </motion.div>

      {/* Is your business solvent? */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Is your business solvent? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoyouconfirmthaSURETHING_1?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoyouconfirmthaSURETHING_1', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="solvent-yes" />
            <Label htmlFor="solvent-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="solvent-no" />
            <Label htmlFor="solvent-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoyouconfirmthaSURETHING_1 && (
          <p className="text-red-500 text-sm">{errors.DoyouconfirmthaSURETHING_1}</p>
        )}
      </motion.div>

      {/* South Africa operations */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Is your business based in South Africa, and are you seeking insurance coverage for South African operations only, that consists of a single entity (no subsidiaries)? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoyouconfirmthaSURETHING_2?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoyouconfirmthaSURETHING_2', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="sa-yes" />
            <Label htmlFor="sa-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="sa-no" />
            <Label htmlFor="sa-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoyouconfirmthaSURETHING_2 && (
          <p className="text-red-500 text-sm">{errors.DoyouconfirmthaSURETHING_2}</p>
        )}
      </motion.div>

      {/* Directors/management inquiries */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Can you confirm that none of the directors or management have been involved in any past or ongoing regulatory inquiries, investigations, dismissals, or disqualifications? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoyouconfirmthaSURETHING_3?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoyouconfirmthaSURETHING_3', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="directors-yes" />
            <Label htmlFor="directors-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="directors-no" />
            <Label htmlFor="directors-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoyouconfirmthaSURETHING_3 && (
          <p className="text-red-500 text-sm">{errors.DoyouconfirmthaSURETHING_3}</p>
        )}
      </motion.div>

      {/* Employee policies */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Does your business have policies and processes in place for treating employees fairly and consistently? If you have no employees or only 1 employee, then this question can be answered yes. <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoyouconfirmthaSURETHING_4?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoyouconfirmthaSURETHING_4', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="policies-yes" />
            <Label htmlFor="policies-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="policies-no" />
            <Label htmlFor="policies-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoyouconfirmthaSURETHING_4 && (
          <p className="text-red-500 text-sm">{errors.DoyouconfirmthaSURETHING_4}</p>
        )}
      </motion.div>

      {/* Retrenchments */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Can you confirm that you are not planning any retrenchments within the next 12 months? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoyouconfirmthaSURETHING_5?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoyouconfirmthaSURETHING_5', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="retrench-yes" />
            <Label htmlFor="retrench-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="retrench-no" />
            <Label htmlFor="retrench-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoyouconfirmthaSURETHING_5 && (
          <p className="text-red-500 text-sm">{errors.DoyouconfirmthaSURETHING_5}</p>
        )}
      </motion.div>

      {/* Auditors concerns */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>It is not necessary that you be audited but if you have been audited, then can you please confirm that auditors have not raised any concerns or issues or made material findings concerning your financial statements? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoyouconfirmthaSURETHING_6?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoyouconfirmthaSURETHING_6', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="audit-yes" />
            <Label htmlFor="audit-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="audit-no" />
            <Label htmlFor="audit-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoyouconfirmthaSURETHING_6 && (
          <p className="text-red-500 text-sm">{errors.DoyouconfirmthaSURETHING_6}</p>
        )}
      </motion.div>

      {/* Claims or circumstances */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Can you confirm that there are no claims or circumstances in the last 5 years that have, or would have, led to the business having a legal liability claim from a third party? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoyouconfirmthaSURETHING_7?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoyouconfirmthaSURETHING_7', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="claims-yes" />
            <Label htmlFor="claims-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="claims-no" />
            <Label htmlFor="claims-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoyouconfirmthaSURETHING_7 && (
          <p className="text-red-500 text-sm">{errors.DoyouconfirmthaSURETHING_7}</p>
        )}
      </motion.div>

      {/* Students informed about dangers */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Are all prospective students/clients informed about the dangers of diving, and have they acknowledged this in writing? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.AreAllProspectiveSURETHING?.toString() || ""}
          onValueChange={(value) => handleInputChange('AreAllProspectiveSURETHING', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="informed-yes" />
            <Label htmlFor="informed-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="informed-no" />
            <Label htmlFor="informed-no">No</Label>
          </div>
        </RadioGroup>
        {errors.AreAllProspectiveSURETHING && (
          <p className="text-red-500 text-sm">{errors.AreAllProspectiveSURETHING}</p>
        )}
      </motion.div>

      {/* Liability release forms */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Do you ensure that every student/client signs a liability release and disclaimer form before diving? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoYouEnsureThatSURETHING?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoYouEnsureThatSURETHING', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="release-yes" />
            <Label htmlFor="release-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="release-no" />
            <Label htmlFor="release-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoYouEnsureThatSURETHING && (
          <p className="text-red-500 text-sm">{errors.DoYouEnsureThatSURETHING}</p>
        )}
      </motion.div>

      {/* Dive Master qualifications */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Is the Dive Master leading the activity fully qualified and certified for the diving location? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.IsTheDiveMasterSURETHING?.toString() || ""}
          onValueChange={(value) => handleInputChange('IsTheDiveMasterSURETHING', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="qualified-yes" />
            <Label htmlFor="qualified-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="qualified-no" />
            <Label htmlFor="qualified-no">No</Label>
          </div>
        </RadioGroup>
        {errors.IsTheDiveMasterSURETHING && (
          <p className="text-red-500 text-sm">{errors.IsTheDiveMasterSURETHING}</p>
        )}
      </motion.div>

      {/* Dive Master familiarity */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Can you confirm that the Dive Master is familiar with the specific dive site/sites where the activity will take place? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoyouconfirmthaSURETHING_9?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoyouconfirmthaSURETHING_9', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="familiar-yes" />
            <Label htmlFor="familiar-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="familiar-no" />
            <Label htmlFor="familiar-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoyouconfirmthaSURETHING_9 && (
          <p className="text-red-500 text-sm">{errors.DoyouconfirmthaSURETHING_9}</p>
        )}
      </motion.div>

      {/* Medical statement */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Do all prospective students/clients sign a medical statement prior to diving? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoAllProspectiveStudentsSURETHING?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoAllProspectiveStudentsSURETHING', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="medical-yes" />
            <Label htmlFor="medical-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="medical-no" />
            <Label htmlFor="medical-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoAllProspectiveStudentsSURETHING && (
          <p className="text-red-500 text-sm">{errors.DoAllProspectiveStudentsSURETHING}</p>
        )}
      </motion.div>

      {/* Emergency medical treatment */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Is emergency medical treatment available at or near the dive location? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.IsEmergencyMedicalSURETHING?.toString() || ""}
          onValueChange={(value) => handleInputChange('IsEmergencyMedicalSURETHING', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="emergency-yes" />
            <Label htmlFor="emergency-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="emergency-no" />
            <Label htmlFor="emergency-no">No</Label>
          </div>
        </RadioGroup>
        {errors.IsEmergencyMedicalSURETHING && (
          <p className="text-red-500 text-sm">{errors.IsEmergencyMedicalSURETHING}</p>
        )}
      </motion.div>

      {/* Medical evacuation procedures */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Do you have procedures in place for medical evacuation in case of an emergency? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoYouHaveProceduresInSURETHING?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoYouHaveProceduresInSURETHING', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="evacuation-yes" />
            <Label htmlFor="evacuation-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="evacuation-no" />
            <Label htmlFor="evacuation-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoYouHaveProceduresInSURETHING && (
          <p className="text-red-500 text-sm">{errors.DoYouHaveProceduresInSURETHING}</p>
        )}
      </motion.div>

      {/* DAN SA membership */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Do you have an active membership with DAN SA? <span className="text-red-500">*</span></Label>
        <RadioGroup
          value={formData.DoyouconfirmthaSURETHING_8?.toString() || ""}
          onValueChange={(value) => handleInputChange('DoyouconfirmthaSURETHING_8', value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="dan-yes" />
            <Label htmlFor="dan-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="dan-no" />
            <Label htmlFor="dan-no">No</Label>
          </div>
        </RadioGroup>
        {errors.DoyouconfirmthaSURETHING_8 && (
          <p className="text-red-500 text-sm">{errors.DoyouconfirmthaSURETHING_8}</p>
        )}
      </motion.div>

      {/* DAN SA membership number - only show if user has active membership */}
      {formData.DoyouconfirmthaSURETHING_8 === true && (
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="PleaseEnterDANSAmemebershipSURETHING_9">
            Please enter DAN SA membership number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="PleaseEnterDANSAmemebershipSURETHING_9"
            value={formData.PleaseEnterDANSAmemebershipSURETHING_9 || ''}
            onChange={(e) => handleInputChange('PleaseEnterDANSAmemebershipSURETHING_9', e.target.value)}
            placeholder="Enter DAN SA membership number"
          />
          {errors.PleaseEnterDANSAmemebershipSURETHING_9 && (
            <p className="text-red-500 text-sm">{errors.PleaseEnterDANSAmemebershipSURETHING_9}</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DiversSureThingForm;