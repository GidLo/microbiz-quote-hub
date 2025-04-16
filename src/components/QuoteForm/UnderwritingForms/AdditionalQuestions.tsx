
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface AdditionalQuestionsProps {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const AdditionalQuestions = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors 
}: AdditionalQuestionsProps) => {
  
  const handleChange = (questionId: string, value: any) => {
    setFormData({ ...formData, [questionId]: value });
    
    // Clear error when field is edited
    if (errors[questionId]) {
      const newErrors = { ...errors };
      delete newErrors[questionId];
      setErrors(newErrors);
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
  
  // Additional yes/no questions that apply to all insurance types
  const additionalQuestions = [
    {
      id: 'business-outside-sa',
      questionText: 'Are any of your branches based outside the borders of South Africa or do you conduct business outside of South Africa?',
      required: true
    },
    {
      id: 'pollution-prosecution',
      questionText: 'Have you, during the last 5 years, been prosecuted for contravention of any standard law relating to the release from the location of a substance into sewers, rivers, sea, and air or on the land, or had any claims or complaints made resulting from sudden and accidental pollution?',
      required: true
    },
    {
      id: 'insurer-cancelled',
      questionText: 'Has any Insurer ever cancelled or refused to renew any insurance, or imposed special restrictions or conditions?',
      required: true
    },
    {
      id: 'no-liability-circumstances',
      questionText: 'Do you confirm that you are currently not aware of any circumstances that may give rise to a public liability claim?',
      required: true
    },
    {
      id: 'employees-outside-sa',
      questionText: 'Do you accept that all employees outside SA will not be covered?',
      required: true
    }
  ];
  
  return (
    <motion.div className="pt-2">
      <h3 className="text-lg font-medium mb-4 pt-2 border-t border-border">Additional Information</h3>
      
      {additionalQuestions.map((question) => (
        <motion.div key={question.id} className="space-y-2 mb-6" variants={itemVariants}>
          <Label htmlFor={question.id}>
            {question.questionText}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          <RadioGroup
            onValueChange={(value) => handleChange(question.id, value === 'yes')}
            defaultValue={formData[question.id] === true ? 'yes' : 
                         formData[question.id] === false ? 'no' : undefined}
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
          
          {errors[question.id] && (
            <p className="text-sm text-red-500">{errors[question.id]}</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AdditionalQuestions;
