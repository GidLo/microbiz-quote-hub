
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InsuranceType, InsurerQuote } from '@/types';
import { INSURANCE_TYPES } from '@/utils/constants';
import { RatingService } from '@/services/ratingService';
import InsurerQuoteCard from './InsurerQuoteCard';
import { useQuery } from '@tanstack/react-query';

interface QuoteResultProps {
  insuranceType: InsuranceType;
  businessName: string;
  contactDetails: any;
  businessDetails: any;
  underwritingAnswers: any;
  onProceed: (selectedQuote: InsurerQuote) => void;
  onBack: () => void;
}

const QuoteResult = ({ 
  insuranceType, 
  businessName, 
  contactDetails,
  businessDetails,
  underwritingAnswers,
  onProceed, 
  onBack 
}: QuoteResultProps) => {
  const [selectedQuote, setSelectedQuote] = useState<InsurerQuote | null>(null);
  
  const insurance = INSURANCE_TYPES.find(i => i.id === insuranceType);
  
  // Fetch quotes from backend
  const { data: quotesResponse, isLoading, error } = useQuery({
    queryKey: ['quotes', insuranceType, contactDetails, businessDetails, underwritingAnswers],
    queryFn: async () => {
      return await RatingService.calculateRates({
        insuranceType,
        contactDetails,
        businessDetails,
        underwritingAnswers
      });
    },
    enabled: !!(contactDetails && businessDetails && underwritingAnswers)
  });
  
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

  if (isLoading) {
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
          <h2 className="text-2xl font-bold mb-2">Calculating Your Quotes...</h2>
          <p className="text-muted-foreground">
            Please wait while we get the best rates for your {insurance?.title}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-xl border p-6 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-secondary rounded w-24"></div>
                  <div className="h-3 bg-secondary rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-8 bg-secondary rounded w-20"></div>
                <div className="h-4 bg-secondary rounded w-full"></div>
                <div className="h-4 bg-secondary rounded w-3/4"></div>
                <div className="h-10 bg-secondary rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Quotes</h2>
          <p className="text-muted-foreground mb-4">
            There was an error calculating your quotes. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </motion.div>
      </motion.div>
    );
  }
  
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
        {quotesResponse?.quotes.map((quote) => (
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
