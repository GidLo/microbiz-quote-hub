import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface QuoteLayoutProps {
  children: ReactNode;
}

const QuoteLayout = ({ children }: QuoteLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Simplified header for quote journey */}
      <header className="border-b border-border/40 py-4 px-6 md:px-8">
        <div className="container max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo - links to home */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">Bi</span>
            </div>
            <span className="font-semibold text-lg">Business Insurance</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">made easy</span>
          </Link>
          
          {/* Phone number */}
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <svg 
                className="w-3 h-3 text-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
            </div>
            <span className="font-medium">010 446 7750</span>
            <span className="text-muted-foreground text-xs hidden sm:inline">Mon-Fri 8:00-17:00</span>
          </div>
        </div>
      </header>
      
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default QuoteLayout;