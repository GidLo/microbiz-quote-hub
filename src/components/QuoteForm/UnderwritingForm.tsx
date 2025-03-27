
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  
  // Additional yes/no questions that apply to all insurance types
  const additionalQuestions = [
    {
      id: 'business-outside-sa',
      questionText: 'Are any of your branches based outside the borders of South Africa or do you conduct business outside of South Africa?',
      type: 'boolean' as const,
      required: true
    },
    {
      id: 'pollution-prosecution',
      questionText: 'Have you, during the last 5 years, been prosecuted for contravention of any standard law relating to the release from the location of a substance into sewers, rivers, sea, and air or on the land, or had any claims or complaints made resulting from sudden and accidental pollution?',
      type: 'boolean' as const,
      required: true
    },
    {
      id: 'insurer-cancelled',
      questionText: 'Has any Insurer ever cancelled or refused to renew any insurance, or imposed special restrictions or conditions?',
      type: 'boolean' as const,
      required: true
    },
    {
      id: 'no-liability-circumstances',
      questionText: 'Do you confirm that you are currently not aware of any circumstances that may give rise to a public liability claim?',
      type: 'boolean' as const,
      required: true
    },
    {
      id: 'employees-outside-sa',
      questionText: 'Do you accept that all employees outside SA will not be covered?',
      type: 'boolean' as const,
      required: true
    }
  ];
  
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
    
    // Validate relevant questions from constants
    relevantQuestions.forEach(question => {
      if (question.required && 
          (formData[question.id] === undefined || 
           formData[question.id] === null || 
           formData[question.id] === '')) {
        newErrors[question.id] = 'This field is required';
      }
    });
    
    // Validate additional questions
    additionalQuestions.forEach(question => {
      if (question.required && formData[question.id] === undefined) {
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
  
  const renderQuestionInput = (question: UnderwritingQuestion | typeof additionalQuestions[0]) => {
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
              {'options' in question && question.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'boolean':
        return (
          <div className="space-y-3">
            <RadioGroup
              onValueChange={(value) => handleChange(question.id, value === 'yes')}
              defaultValue={formData[question.id] === true ? 'yes' : formData[question.id] === false ? 'no' : undefined}
              className={`flex space-x-4 ${errors[question.id] ? 'border-red-300' : ''}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                <Label htmlFor={`${question.id}-yes`}>Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${question.id}-no`} />
                <Label htmlFor={`${question.id}-no`}>No</Label>
              </div>
            </RadioGroup>
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
      {/* Standard underwriting questions */}
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
      
      {/* Additional yes/no questions section */}
      {additionalQuestions.length > 0 && (
        <motion.div variants={itemVariants} className="pt-2">
          <h3 className="text-lg font-medium mb-4 pt-2 border-t border-border">Additional Information</h3>
          
          {additionalQuestions.map((question, index) => (
            <motion.div key={question.id} className="space-y-2 mb-6" variants={itemVariants}>
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
        </motion.div>
      )}
      
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
