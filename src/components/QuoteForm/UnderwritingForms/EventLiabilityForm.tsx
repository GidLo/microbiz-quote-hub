
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
        <Label htmlFor="event-attendees">
          What is the expected number of attendees at your event?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="event-attendees"
          type="number"
          placeholder="Number of attendees"
          value={formData['event-attendees'] || ''}
          onChange={(e) => handleChange('event-attendees', e.target.value)}
          className={errors['event-attendees'] ? 'border-red-300' : ''}
        />
        {errors['event-attendees'] && (
          <p className="text-sm text-red-500">{errors['event-attendees']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="event-type">
          What type of event are you organizing?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('event-type', value)}
          defaultValue={formData['event-type'] || ''}
        >
          <SelectTrigger className={errors['event-type'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="conference">Conference/Seminar</SelectItem>
            <SelectItem value="concert">Concert/Performance</SelectItem>
            <SelectItem value="wedding">Wedding</SelectItem>
            <SelectItem value="exhibition">Exhibition/Trade Show</SelectItem>
            <SelectItem value="sports">Sporting Event</SelectItem>
            <SelectItem value="festival">Festival</SelectItem>
            <SelectItem value="party">Private Party</SelectItem>
            <SelectItem value="corporate">Corporate Event</SelectItem>
            <SelectItem value="charity">Charity Event</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors['event-type'] && (
          <p className="text-sm text-red-500">{errors['event-type']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="event-venue">
          Where will the event be held?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('event-venue', value)}
          defaultValue={formData['event-venue'] || ''}
        >
          <SelectTrigger className={errors['event-venue'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select venue type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hotel">Hotel/Conference Center</SelectItem>
            <SelectItem value="outdoor">Outdoor Space/Park</SelectItem>
            <SelectItem value="stadium">Stadium/Arena</SelectItem>
            <SelectItem value="theater">Theater/Concert Hall</SelectItem>
            <SelectItem value="restaurant">Restaurant/Banquet Hall</SelectItem>
            <SelectItem value="municipal">Municipal/Community Center</SelectItem>
            <SelectItem value="private">Private Residence</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors['event-venue'] && (
          <p className="text-sm text-red-500">{errors['event-venue']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="event-duration">
          How long will the event last?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          onValueChange={(value) => handleChange('event-duration', value)}
          defaultValue={formData['event-duration'] || ''}
        >
          <SelectTrigger className={errors['event-duration'] ? 'border-red-300' : ''}>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="few-hours">Few Hours</SelectItem>
            <SelectItem value="one-day">One Day</SelectItem>
            <SelectItem value="two-days">Two Days</SelectItem>
            <SelectItem value="three-days">Three Days</SelectItem>
            <SelectItem value="week">One Week</SelectItem>
            <SelectItem value="longer">Longer than One Week</SelectItem>
          </SelectContent>
        </Select>
        {errors['event-duration'] && (
          <p className="text-sm text-red-500">{errors['event-duration']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="alcohol-served">
          Will alcohol be served at the event?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          onValueChange={(value) => handleChange('alcohol-served', value === 'yes')}
          defaultValue={formData['alcohol-served'] === true ? 'yes' : 
                       formData['alcohol-served'] === false ? 'no' : undefined}
          className={`flex space-x-4 ${errors['alcohol-served'] ? 'border-red-300' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="alcohol-served-yes" />
            <Label htmlFor="alcohol-served-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="alcohol-served-no" />
            <Label htmlFor="alcohol-served-no">No</Label>
          </div>
        </RadioGroup>
        {errors['alcohol-served'] && (
          <p className="text-sm text-red-500">{errors['alcohol-served']}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="security-measures">
          What security measures will be in place?
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Textarea 
          id="security-measures"
          placeholder="Describe your security plans"
          value={formData['security-measures'] || ''}
          onChange={(e) => handleChange('security-measures', e.target.value)}
          className={errors['security-measures'] ? 'border-red-300' : ''}
        />
        {errors['security-measures'] && (
          <p className="text-sm text-red-500">{errors['security-measures']}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EventLiabilityForm;
