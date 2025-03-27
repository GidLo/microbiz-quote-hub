
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Shield, 
  Calendar, 
  HardHat,
  ArrowRight
} from 'lucide-react';
import { InsuranceOption } from '@/types';

interface InsuranceCardProps {
  insurance: InsuranceOption;
  index: number;
}

const InsuranceCard = ({ insurance, index }: InsuranceCardProps) => {
  const icons: Record<string, React.ReactNode> = {
    'briefcase': <Briefcase className="h-6 w-6" />,
    'shield': <Shield className="h-6 w-6" />,
    'calendar': <Calendar className="h-6 w-6" />,
    'hard-hat': <HardHat className="h-6 w-6" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 transition-all duration-300 hover:shadow-md hover:border-primary/20 h-full"
    >
      <div className="p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
          {icons[insurance.icon]}
        </div>
        <h3 className="text-xl font-semibold mb-2">{insurance.title}</h3>
        <p className="text-muted-foreground mb-4">{insurance.description}</p>
        
        <ul className="space-y-2 mb-6">
          {insurance.coverPoints.slice(0, 3).map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="mt-1 text-primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm">{point}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-between items-center">
          <Link to={`/coverage/${insurance.id}`}>
            <Button variant="outline" size="sm" className="group">
              Learn More
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <Link to={`/quote?type=${insurance.id}`}>
            <Button variant="link" size="sm" className="text-primary">
              Get Quote
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default InsuranceCard;
