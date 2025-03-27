
import { Check } from 'lucide-react';
import { QuoteStep } from '@/types';

interface QuoteProgressProps {
  steps: QuoteStep[];
  currentStep: number;
}

const QuoteProgress = ({ steps, currentStep }: QuoteProgressProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div 
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-medium transition-all
                ${index < currentStep 
                  ? 'bg-primary border-primary text-white' 
                  : index === currentStep
                    ? 'bg-white border-primary text-primary'
                    : 'bg-white border-gray-300 text-gray-400'}`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <div className="mt-2 text-xs font-medium text-center hidden md:block">
              <span className={index === currentStep ? 'text-primary' : 'text-muted-foreground'}>{step.title}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative mt-4 hidden md:block">
        <div className="absolute top-0 left-0 h-0.5 bg-gray-200 w-full"></div>
        <div 
          className="absolute top-0 left-0 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuoteProgress;
