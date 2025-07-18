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

interface ContractorsAllRiskFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const ContractorsAllRiskForm = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors 
}: ContractorsAllRiskFormProps) => {
  
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
        <Label htmlFor="SiteLocationSelection">
          The site location
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">This is the location where the project will be taking place.</p>
        <Input 
          id="SiteLocationSelection"
          type="text"
          placeholder="Enter site location"
          value={formData['SiteLocationSelection'] || ''}
          onChange={(e) => handleChange('SiteLocationSelection', e.target.value)}
          className={errors['SiteLocationSelection'] ? 'border-red-300' : ''}
        />
        {errors['SiteLocationSelection'] && (
          <p className="text-sm text-red-500">{errors['SiteLocationSelection']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="ContractValue">
          Estimated contract value
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">This is the Estimated value of the works and must include the value of all materials and labour charges together with any "free issue materials" and VAT (Free Issue Materials are those materials/items, purchased by the Client prior to the commencement of the Contract, which are to be incorporated or built into the Contract Works).</p>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">R</span>
          <Input 
            id="ContractValue"
            type="text"
            placeholder="222,222"
            value={formData['ContractValue'] ? Number(formData['ContractValue']).toLocaleString() : ''}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '');
              handleChange('ContractValue', value);
            }}
            className={`pl-8 ${errors['ContractValue'] ? 'border-red-300' : ''}`}
          />
        </div>
        {errors['ContractValue'] && (
          <p className="text-sm text-red-500">{errors['ContractValue']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="ProjectInceptionDate">
          Your project start date
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">The period starting with the establishment of the site and ending at Practical Completion and handover to the Client.</p>
        <Input 
          id="ProjectInceptionDate"
          type="date"
          value={formData['ProjectInceptionDate'] || ''}
          onChange={(e) => handleChange('ProjectInceptionDate', e.target.value)}
          className={errors['ProjectInceptionDate'] ? 'border-red-300' : ''}
        />
        {errors['ProjectInceptionDate'] && (
          <p className="text-sm text-red-500">{errors['ProjectInceptionDate']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="ProjectDuration">
          What is the duration of the project (in months)
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">The period starting with the establishment of the site and ending at Practical Completion and handover to the Client. Max period of 12 months allowed on the platform.</p>
        <Input 
          id="ProjectDuration"
          type="number"
          placeholder="Enter duration in months"
          value={formData['ProjectDuration'] || ''}
          onChange={(e) => handleChange('ProjectDuration', e.target.value)}
          className={errors['ProjectDuration'] ? 'border-red-300' : ''}
        />
        {errors['ProjectDuration'] && (
          <p className="text-sm text-red-500">{errors['ProjectDuration']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="AreyoutheprinciCAR">
          Are you the principal or contractor?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('AreyoutheprinciCAR', value)}
          defaultValue={formData['AreyoutheprinciCAR'] || ''}
          className={`flex space-x-4 ${errors['AreyoutheprinciCAR'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Principal" id="principal" />
            <Label htmlFor="principal">Principal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Contractor" id="contractor" />
            <Label htmlFor="contractor">Contractor</Label>
          </div>
        </RadioGroup>
        {errors['AreyoutheprinciCAR'] && (
          <p className="text-sm text-red-500">{errors['AreyoutheprinciCAR']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="SelecttheoptionCAR">
          Select the option that best describes the nature of the contract
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('SelecttheoptionCAR', value)}
          defaultValue={formData['SelecttheoptionCAR'] || ''}
        >
          <SelectTrigger className={errors['SelecttheoptionCAR'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select contract nature" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Standard residential construction">Standard residential construction</SelectItem>
            <SelectItem value="Standard commercial construction">Standard commercial construction</SelectItem>
            <SelectItem value="Plumbing">Plumbing</SelectItem>
            <SelectItem value="Mechanical and electrical work">Mechanical and electrical work</SelectItem>
          </SelectContent>
        </Select>
        {errors['SelecttheoptionCAR'] && (
          <p className="text-sm text-red-500">{errors['SelecttheoptionCAR']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouconfirmthaCAR">
          Do you confirm that the construction can be classified as residential construction or small retail & commercial construction?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouconfirmthaCAR', value === 'Yes')}
          defaultValue={formData['DoyouconfirmthaCAR'] === true ? 'Yes' : 
                       formData['DoyouconfirmthaCAR'] === false ? 'No' : undefined}
          className={`flex space-x-4 ${errors['DoyouconfirmthaCAR'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="confirm-classification-yes" />
            <Label htmlFor="confirm-classification-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="confirm-classification-no" />
            <Label htmlFor="confirm-classification-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmthaCAR'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaCAR']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouconfirmthaCAR1">
          Do you confirm that the contract will not include any civil works?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">Civils is engineering works such as roads, bridges, canals, dams, airports, sewerage systems, pipelines, structural components of buildings, and railways.</p>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouconfirmthaCAR1', value === 'Yes')}
          defaultValue={formData['DoyouconfirmthaCAR1'] === true ? 'Yes' : 
                       formData['DoyouconfirmthaCAR1'] === false ? 'No' : undefined}
          className={`flex space-x-4 ${errors['DoyouconfirmthaCAR1'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="confirm-civil-works-yes" />
            <Label htmlFor="confirm-civil-works-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="confirm-civil-works-no" />
            <Label htmlFor="confirm-civil-works-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmthaCAR1'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmthaCAR1']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="WhatissoiltypeCAR">
          What is the soil type of contract area:
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('WhatissoiltypeCAR', value)}
          defaultValue={formData['WhatissoiltypeCAR'] || ''}
        >
          <SelectTrigger className={errors['WhatissoiltypeCAR'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select soil type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Clay">Clay</SelectItem>
            <SelectItem value="Dolomite">Dolomite</SelectItem>
            <SelectItem value="Rocky">Rocky</SelectItem>
            <SelectItem value="Sandy">Sandy</SelectItem>
            <SelectItem value="Other">Other (specify)</SelectItem>
          </SelectContent>
        </Select>
        {errors['WhatissoiltypeCAR'] && (
          <p className="text-sm text-red-500">{errors['WhatissoiltypeCAR']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="IsconstructionnearbyordoesitrelateCAR">
          Is the construction nearby or does it relate to construction at any of the following? Airport, Rivers, Dams, Mountains?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">When considering nearby locations, we consider construction to be nearby if it is within 100m.</p>
        <RadioGroup
          onValueChange={(value) => handleChange('IsconstructionnearbyordoesitrelateCAR', value === 'Yes')}
          defaultValue={formData['IsconstructionnearbyordoesitrelateCAR'] === true ? 'Yes' : 
                       formData['IsconstructionnearbyordoesitrelateCAR'] === false ? 'No' : undefined}
          className={`flex space-x-4 ${errors['IsconstructionnearbyordoesitrelateCAR'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="construction-nearby-yes" />
            <Label htmlFor="construction-nearby-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="construction-nearby-no" />
            <Label htmlFor="construction-nearby-no">No</Label>
          </div>
        </RadioGroup>
        {errors['IsconstructionnearbyordoesitrelateCAR'] && (
          <p className="text-sm text-red-500">{errors['IsconstructionnearbyordoesitrelateCAR']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="AreanyprocessingusedCAR">
          Are any of the following processes used? Blasting, Excavations
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('AreanyprocessingusedCAR', value === 'Yes')}
          defaultValue={formData['AreanyprocessingusedCAR'] === true ? 'Yes' : 
                       formData['AreanyprocessingusedCAR'] === false ? 'No' : undefined}
          className={`flex space-x-4 ${errors['AreanyprocessingusedCAR'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="processing-used-yes" />
            <Label htmlFor="processing-used-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="processing-used-no" />
            <Label htmlFor="processing-used-no">No</Label>
          </div>
        </RadioGroup>
        {errors['AreanyprocessingusedCAR'] && (
          <p className="text-sm text-red-500">{errors['AreanyprocessingusedCAR']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyourequirecovCARPI-PL66">
          Public liability cover of R2,500,000 is automatically included at no additional cost. One of our underwriters offers an increased amount at an additional premium. Do you wish to increase the amount of Public Liability Cover?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyourequirecovCARPI-PL66', value === 'Yes')}
          defaultValue={formData['DoyourequirecovCARPI-PL66'] === true ? 'Yes' : 
                       formData['DoyourequirecovCARPI-PL66'] === false ? 'No' : undefined}
          className={`flex space-x-4 ${errors['DoyourequirecovCARPI-PL66'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="increase-cover-yes" />
            <Label htmlFor="increase-cover-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="increase-cover-no" />
            <Label htmlFor="increase-cover-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyourequirecovCARPI-PL66'] && (
          <p className="text-sm text-red-500">{errors['DoyourequirecovCARPI-PL66']}</p>
        )}
      </motion.div>

      {formData['DoyourequirecovCARPI-PL66'] === true && (
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="SuminsuredreplaPI-PL67CAR">
            Additional cover required
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            onValueChange={(value) => handleChange('SuminsuredreplaPI-PL67CAR', value)}
            defaultValue={formData['SuminsuredreplaPI-PL67CAR'] || ''}
          >
            <SelectTrigger className={errors['SuminsuredreplaPI-PL67CAR'] ? 'border-red-300' : ''}>
              <SelectValue placeholder="Select additional cover amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="R500 000">R500 000</SelectItem>
              <SelectItem value="R1 000 000">R1 000 000</SelectItem>
              <SelectItem value="R1 500 000">R1 500 000</SelectItem>
              <SelectItem value="R2 000 000">R2 000 000</SelectItem>
              <SelectItem value="R2 500 000">R2 500 000</SelectItem>
            </SelectContent>
          </Select>
          {errors['SuminsuredreplaPI-PL67CAR'] && (
            <p className="text-sm text-red-500">{errors['SuminsuredreplaPI-PL67CAR']}</p>
          )}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouwishtoaddSCAR">
          Do you wish to add SASRIA cover?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">SASRIA insurance covers you against risks such as civil commotion, labour and public disorder, strikes, riots and terrorism.</p>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouwishtoaddSCAR', value === 'Yes')}
          defaultValue={formData['DoyouwishtoaddSCAR'] === true ? 'Yes' : 
                       formData['DoyouwishtoaddSCAR'] === false ? 'No' : undefined}
          className={`flex space-x-4 ${errors['DoyouwishtoaddSCAR'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="sasria-cover-yes" />
            <Label htmlFor="sasria-cover-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="sasria-cover-no" />
            <Label htmlFor="sasria-cover-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouwishtoaddSCAR'] && (
          <p className="text-sm text-red-500">{errors['DoyouwishtoaddSCAR']}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContractorsAllRiskForm;
