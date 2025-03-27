
import { motion } from 'framer-motion';
import { Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InsuranceType } from '@/types';
import { INSURANCE_TYPES } from '@/utils/constants';

interface QuoteResultProps {
  insuranceType: InsuranceType;
  businessName: string;
  onProceed: () => void;
  onBack: () => void;
}

const QuoteResult = ({ insuranceType, businessName, onProceed, onBack }: QuoteResultProps) => {
  const insurance = INSURANCE_TYPES.find(i => i.id === insuranceType);
  
  // Mock quote details - in a real application, this would come from the backend
  const quoteDetails = {
    monthlyPremium: 'R 450',
    annualPremium: 'R 4,860',
    coverageAmount: 'R 1,000,000',
    deductible: 'R 5,000',
    savingsWithAnnual: 'R 540'
  };
  
  const benefits = [
    'No long-term contracts - cancel anytime',
    'Immediate coverage after payment',
    'Dedicated claims support',
    'Digital policy documents',
    'Flexible payment options'
  ];
  
  const containerVariants = {
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div className="text-center" variants={itemVariants}>
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
          <Shield className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Quote is Ready!</h2>
        <p className="text-muted-foreground">
          Here's your personalized {insurance?.title} quote for {businessName}
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-card rounded-xl overflow-hidden border border-border shadow-sm"
        variants={itemVariants}
      >
        <div className="bg-primary text-white p-6 text-center">
          <h3 className="text-xl font-medium mb-4">{insurance?.title} Coverage</h3>
          <div className="text-3xl font-bold">{quoteDetails.monthlyPremium}<span className="text-sm font-normal"> / month</span></div>
          <p className="text-sm mt-2 text-white/80">or {quoteDetails.annualPremium} annually (save {quoteDetails.savingsWithAnnual})</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Coverage Amount</p>
              <p className="font-semibold">{quoteDetails.coverageAmount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Deductible</p>
              <p className="font-semibold">{quoteDetails.deductible}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Coverage Includes:</h4>
            <ul className="space-y-2">
              {insurance?.coverPoints.map((point, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <div className="text-primary mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <h3 className="font-medium mb-3">Additional Benefits:</h3>
        <ul className="space-y-2 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex gap-2 text-sm">
              <div className="text-primary mt-0.5">
                <Check className="h-4 w-4" />
              </div>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div className="flex justify-between" variants={itemVariants}>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onProceed}>
          Proceed to Checkout
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default QuoteResult;
