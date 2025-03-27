
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { InsuranceType, UnderwritingQuestion } from '@/types';
import { UNDERWRITING_QUESTIONS } from '@/utils/constants';

interface UnderwritingFormProps {
  selectedInsuranceType: InsuranceType;
  onSubmit: (data: Record<string, any>) => void;
  onBack: () => void;
}

const UnderwritingForm = ({ selectedInsuranceType, onSubmit, onBack }: UnderwritingFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Filter questions relevant to the selected insurance type
  const relevantQuestions = UNDERWRITING_QUESTIONS.filter(
    question => question.insuranceTypes.includes(selectedInsuranceType)
  );
  
  const handleChange = (questionId: string, value: any) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
    
    // Clear error when field is edited
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    relevantQuestions.forEach(question => {
      if (question.required && 
          (formData[question.id] === undefined || 
           formData[question.id] === null || 
           formData[question.id] === '')) {
        newErrors[question.id] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  const renderQuestionInput = (question: UnderwritingQuestion) => {
    switch (question.type) {
      case 'text':
        return (
          <Input 
            id={question.id}
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className={errors[question.id] ? 'border-red-300' : ''}
          />
        );
        
      case 'number':
        return (
          <Input 
            id={question.id}
            type="number"
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className={errors[question.id] ? 'border-red-300' : ''}
          />
        );
        
      case 'select':
        return (
          <Select
            onValueChange={(value) => handleChange(question.id, value)}
            defaultValue={formData[question.id] || ''}
          >
            <SelectTrigger className={errors[question.id] ? 'border-red-300' : ''}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id={question.id} 
              checked={formData[question.id] === true}
              onCheckedChange={(checked) => {
                handleChange(question.id, checked === true);
              }}
            />
            <label 
              htmlFor={question.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Yes
            </label>
          </div>
        );
        
      default:
        return <Input />;
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
      {relevantQuestions.map((question, index) => (
        <motion.div key={question.id} className="space-y-2" variants={itemVariants}>
          <Label htmlFor={question.id}>
            {question.questionText}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          {renderQuestionInput(question)}
          
          {errors[question.id] && (
            <p className="text-sm text-red-500">{errors[question.id]}</p>
          )}
        </motion.div>
      ))}
      
      <motion.div variants={itemVariants} className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Get Your Quote
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default UnderwritingForm;
