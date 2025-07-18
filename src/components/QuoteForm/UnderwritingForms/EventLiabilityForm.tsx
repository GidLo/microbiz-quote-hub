
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface EventLiabilityFormProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const EventLiabilityForm = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors 
}: EventLiabilityFormProps) => {
  
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
        <Label htmlFor="EventInceptionDate">
          Your event start date
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="EventInceptionDate"
          type="date"
          value={formData['EventInceptionDate'] || ''}
          onChange={(e) => handleChange('EventInceptionDate', e.target.value)}
          className={errors['EventInceptionDate'] ? 'border-red-300' : ''}
        />
        {errors['EventInceptionDate'] && (
          <p className="text-sm text-red-500">{errors['EventInceptionDate']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="EventDuration">
          What is the duration of the event (in days)
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">
          This is the duration of the event, including the setup and breakdown.
        </p>
        <Select
          onValueChange={(value) => handleChange('EventDuration', value)}
          defaultValue={formData['EventDuration'] || ''}
        >
          <SelectTrigger className={errors['EventDuration'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-day">1 day</SelectItem>
            <SelectItem value="2-days">2 days</SelectItem>
            <SelectItem value="3-4-days">3-4 days</SelectItem>
            <SelectItem value="5-7-days">5-7 days</SelectItem>
            <SelectItem value="more-than-7-days">More than 7 days</SelectItem>
          </SelectContent>
        </Select>
        {errors['EventDuration'] && (
          <p className="text-sm text-red-500">{errors['EventDuration']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="EventLocationSelection">
          The Event location
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="EventLocationSelection"
          type="text"
          placeholder="Enter event location"
          value={formData['EventLocationSelection'] || ''}
          onChange={(e) => handleChange('EventLocationSelection', e.target.value)}
          className={errors['EventLocationSelection'] ? 'border-red-300' : ''}
        />
        {errors['EventLocationSelection'] && (
          <p className="text-sm text-red-500">{errors['EventLocationSelection']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="LimitOfIndemnity">
          Amount of liability cover required (sum insured) for the event
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('LimitOfIndemnity', value)}
          defaultValue={formData['LimitOfIndemnity'] || ''}
        >
          <SelectTrigger className={errors['LimitOfIndemnity'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select coverage amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1000000">R1,000,000</SelectItem>
            <SelectItem value="2000000">R2,000,000</SelectItem>
            <SelectItem value="3000000">R3,000,000</SelectItem>
            <SelectItem value="4000000">R4,000,000</SelectItem>
            <SelectItem value="5000000">R5,000,000</SelectItem>
            <SelectItem value="6000000">R6,000,000</SelectItem>
            <SelectItem value="7000000">R7,000,000</SelectItem>
            <SelectItem value="8000000">R8,000,000</SelectItem>
            <SelectItem value="9000000">R9,000,000</SelectItem>
            <SelectItem value="10000000">R10,000,000</SelectItem>
          </SelectContent>
        </Select>
        {errors['LimitOfIndemnity'] && (
          <p className="text-sm text-red-500">{errors['LimitOfIndemnity']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="EventName">
          What is the name of the event?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="EventName"
          type="text"
          placeholder="Enter event name"
          value={formData['EventName'] || ''}
          onChange={(e) => handleChange('EventName', e.target.value)}
          className={errors['EventName'] ? 'border-red-300' : ''}
        />
        {errors['EventName'] && (
          <p className="text-sm text-red-500">{errors['EventName']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="ProvideadescripEVENTLIABILITY">
          Provide a description of the event
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Textarea 
          id="ProvideadescripEVENTLIABILITY"
          placeholder="Describe your event"
          value={formData['ProvideadescripEVENTLIABILITY'] || ''}
          onChange={(e) => handleChange('ProvideadescripEVENTLIABILITY', e.target.value)}
          className={errors['ProvideadescripEVENTLIABILITY'] ? 'border-red-300' : ''}
        />
        {errors['ProvideadescripEVENTLIABILITY'] && (
          <p className="text-sm text-red-500">{errors['ProvideadescripEVENTLIABILITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouconfirmcapEVENTLIABILITY">
          Do you confirm that you will adhere to the venue capacity and seating guidelines as provided by the venue?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouconfirmcapEVENTLIABILITY', value === 'yes')}
          defaultValue={formData['DoyouconfirmcapEVENTLIABILITY'] === true ? 'yes' : 
                       formData['DoyouconfirmcapEVENTLIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['DoyouconfirmcapEVENTLIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmcapEVENTLIABILITY-yes" />
            <Label htmlFor="DoyouconfirmcapEVENTLIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmcapEVENTLIABILITY-no" />
            <Label htmlFor="DoyouconfirmcapEVENTLIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmcapEVENTLIABILITY'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmcapEVENTLIABILITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouacknowledgEVENTLIABILITY">
          Do you acknowledge that if you use any secondary suppliers, including suppliers responsible for temporary stages, lighting or setting up of tents, they will have their own public liability cover in place?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouacknowledgEVENTLIABILITY', value === 'yes')}
          defaultValue={formData['DoyouacknowledgEVENTLIABILITY'] === true ? 'yes' : 
                       formData['DoyouacknowledgEVENTLIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['DoyouacknowledgEVENTLIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouacknowledgEVENTLIABILITY-yes" />
            <Label htmlFor="DoyouacknowledgEVENTLIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouacknowledgEVENTLIABILITY-no" />
            <Label htmlFor="DoyouacknowledgEVENTLIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouacknowledgEVENTLIABILITY'] && (
          <p className="text-sm text-red-500">{errors['DoyouacknowledgEVENTLIABILITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouconfirmfirEVENTLIABILITY">
          Do you confirm that none of the following adventure activities will take place at the event?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="text-sm text-foreground ml-4 space-y-1">
          <p>• Fireworks, bonfires and/or pyrotechnical devices.</p>
          <p>• Shooting ranges for guns or archery;</p>
          <p>• Persons riding on animals;</p>
          <p>• Ballooning or flying of any description;</p>
          <p>• Fairground rides or mechanical or electrical rides of any kind;</p>
          <p>• Paintball</p>
          <p>• Rock climbing/ abseiling/ zip-lining/ bungee jumping</p>
        </div>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouconfirmfirEVENTLIABILITY', value === 'yes')}
          defaultValue={formData['DoyouconfirmfirEVENTLIABILITY'] === true ? 'yes' : 
                       formData['DoyouconfirmfirEVENTLIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['DoyouconfirmfirEVENTLIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmfirEVENTLIABILITY-yes" />
            <Label htmlFor="DoyouconfirmfirEVENTLIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmfirEVENTLIABILITY-no" />
            <Label htmlFor="DoyouconfirmfirEVENTLIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmfirEVENTLIABILITY'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmfirEVENTLIABILITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouconfirmactEVENTLIABILITY">
          Do you confirm that none of the following activities will take place at the event?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="text-sm text-foreground ml-4 space-y-1">
          <p>• Motor activities for example spinning/ drifting/ drag racing/ quad bike rides/ motor car or motorbike rallies</p>
          <p>• Marine/ water activities</p>
          <p>• Aviation activities / other than ground events at air shows, excluding any aviation activity</p>
        </div>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouconfirmactEVENTLIABILITY', value === 'yes')}
          defaultValue={formData['DoyouconfirmactEVENTLIABILITY'] === true ? 'yes' : 
                       formData['DoyouconfirmactEVENTLIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['DoyouconfirmactEVENTLIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmactEVENTLIABILITY-yes" />
            <Label htmlFor="DoyouconfirmactEVENTLIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmactEVENTLIABILITY-no" />
            <Label htmlFor="DoyouconfirmactEVENTLIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmactEVENTLIABILITY'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmactEVENTLIABILITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouconfirmpolEVENTLIABILITY">
          Do you confirm that the event does not relate to political activities such as rallies, union involvement, or government events?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouconfirmpolEVENTLIABILITY', value === 'yes')}
          defaultValue={formData['DoyouconfirmpolEVENTLIABILITY'] === true ? 'yes' : 
                       formData['DoyouconfirmpolEVENTLIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['DoyouconfirmpolEVENTLIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmpolEVENTLIABILITY-yes" />
            <Label htmlFor="DoyouconfirmpolEVENTLIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmpolEVENTLIABILITY-no" />
            <Label htmlFor="DoyouconfirmpolEVENTLIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmpolEVENTLIABILITY'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmpolEVENTLIABILITY']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="DoyouconfirmpolnotexceedEVENTLIABILITY">
          Do you confirm that the event will not exceed more than 2000 attendees at any one/particular time?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('DoyouconfirmpolnotexceedEVENTLIABILITY', value === 'yes')}
          defaultValue={formData['DoyouconfirmpolnotexceedEVENTLIABILITY'] === true ? 'yes' : 
                       formData['DoyouconfirmpolnotexceedEVENTLIABILITY'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['DoyouconfirmpolnotexceedEVENTLIABILITY'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="DoyouconfirmpolnotexceedEVENTLIABILITY-yes" />
            <Label htmlFor="DoyouconfirmpolnotexceedEVENTLIABILITY-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="DoyouconfirmpolnotexceedEVENTLIABILITY-no" />
            <Label htmlFor="DoyouconfirmpolnotexceedEVENTLIABILITY-no">No</Label>
          </div>
        </RadioGroup>
        {errors['DoyouconfirmpolnotexceedEVENTLIABILITY'] && (
          <p className="text-sm text-red-500">{errors['DoyouconfirmpolnotexceedEVENTLIABILITY']}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EventLiabilityForm;
