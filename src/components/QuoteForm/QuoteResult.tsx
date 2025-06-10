
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InsuranceType, InsurerQuote } from '@/types';
import { INSURANCE_TYPES } from '@/utils/constants';
import InsurerQuoteCard from './InsurerQuoteCard';

interface QuoteResultProps {
  insuranceType: InsuranceType;
  businessName: string;
  onProceed: (selectedQuote: InsurerQuote) => void;
  onBack: () => void;
}

const QuoteResult = ({ insuranceType, businessName, onProceed, onBack }: QuoteResultProps) => {
  const [selectedQuote, setSelectedQuote] = useState<InsurerQuote | null>(null);
  
  const insurance = INSURANCE_TYPES.find(i => i.id === insuranceType);
  
  // Mock quotes from different insurers - will be replaced with backend data
  const mockQuotes: InsurerQuote[] = [
    {
      insurerId: 'insurer-1',
      insurerName: 'SafeGuard Insurance',
      monthlyPremium: 'R 420',
      annualPremium: 'R 4,536',
      coverageAmount: 'R 1,000,000',
      deductible: 'R 5,000',
      savingsWithAnnual: 'R 504',
      rating: 4.8,
      features: [
        'No long-term contracts',
        'Immediate coverage',
        'Dedicated claims support',
        '24/7 helpline'
      ],
      isRecommended: true
    },
    {
      insurerId: 'insurer-2',
      insurerName: 'Premier Coverage',
      monthlyPremium: 'R 450',
      annualPremium: 'R 4,860',
      coverageAmount: 'R 1,000,000',
      deductible: 'R 4,000',
      savingsWithAnnual: 'R 540',
      rating: 4.5,
      features: [
        'Flexible payment options',
        'Digital policy management',
        'Quick claim processing',
        'Legal assistance included'
      ]
    },
    {
      insurerId: 'insurer-3',
      insurerName: 'Reliable Protect',
      monthlyPremium: 'R 385',
      annualPremium: 'R 4,158',
      coverageAmount: 'R 750,000',
      deductible: 'R 7,500',
      savingsWithAnnual: 'R 462',
      rating: 4.2,
      features: [
        'Budget-friendly option',
        'Essential coverage',
        'Online support',
        'Basic claims service'
      ]
    }
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
  
  const handleQuoteSelect = (quote: InsurerQuote) => {
    setSelectedQuote(quote);
  };
  
  const handleProceed = () => {
    if (selectedQuote) {
      onProceed(selectedQuote);
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
        <h2 className="text-2xl font-bold mb-2">Your Quotes are Ready!</h2>
        <p className="text-muted-foreground">
          Compare {insurance?.title} quotes for {businessName} from our trusted partners
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        {mockQuotes.map((quote) => (
          <InsurerQuoteCard
            key={quote.insurerId}
            quote={quote}
            onSelect={handleQuoteSelect}
            isSelected={selectedQuote?.insurerId === quote.insurerId}
          />
        ))}
      </motion.div>
      
      <motion.div className="flex justify-between items-center" variants={itemVariants}>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex items-center gap-4">
          {selectedQuote && (
            <p className="text-sm text-muted-foreground">
              Selected: {selectedQuote.insurerName} - {selectedQuote.monthlyPremium}/month
            </p>
          )}
          <Button 
            onClick={handleProceed}
            disabled={!selectedQuote}
          >
            Proceed to Checkout
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuoteResult;
