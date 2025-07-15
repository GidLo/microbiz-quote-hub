import { motion } from 'framer-motion';
import { Check, Star, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InsurerQuote } from '@/types';
interface InsurerQuoteCardProps {
  quote: InsurerQuote;
  onSelect: (quote: InsurerQuote) => void;
  isSelected?: boolean;
}
const InsurerQuoteCard = ({
  quote,
  onSelect,
  isSelected
}: InsurerQuoteCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }).map((_, index) => <Star key={index} className={`h-4 w-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />);
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className={`relative bg-card rounded-xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}>
      {quote.isRecommended}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{quote.insurerName}</h3>
              
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-primary mb-2">
            {quote.monthlyPremium}
            <span className="text-sm font-normal text-muted-foreground"> / month</span>
          </div>
          <p className="text-sm text-muted-foreground">
            or {quote.annualPremium} annually (save {quote.savingsWithAnnual})
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Coverage</p>
            <p className="font-semibold">{quote.coverageAmount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Deductible</p>
            <p className="font-semibold">{quote.deductible}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          
          <ul className="space-y-2">
            {quote.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => onSelect(quote)} className="flex-1 text-xs py-2 px-3" variant="default">
            Add to Cart
          </Button>
          <Button onClick={() => {
          // TODO: Implement email quote functionality
          console.log('Email quote for:', quote.insurerName);
        }} className="flex-1 text-xs py-2 px-3" variant="outline">
            Email Quote
          </Button>
        </div>
      </div>
    </motion.div>;
};
export default InsurerQuoteCard;