
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CompletionScreen = () => {
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
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div variants={itemVariants}>
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        
        <h2 className="text-2xl font-bold mb-3">Your Policy is Active!</h2>
        <p className="text-muted-foreground mb-8">
          Thank you for choosing Bi-me. Your policy documents have been sent to your email address.
        </p>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="bg-card rounded-xl border border-border p-6 mb-8"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Policy Documents</h3>
              <p className="text-sm text-muted-foreground">Your policy details and coverage information</p>
            </div>
            <div className="ml-auto">
              <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                View your documents
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Confirmation Email</h3>
              <p className="text-sm text-muted-foreground">A copy has been sent to your email</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="font-medium mb-2">What happens next?</h3>
        <ol className="text-left space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-0.5 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
              1
            </div>
            <div>
              <p className="font-medium">Review Your Policy</p>
              <p className="text-sm text-muted-foreground">Check your policy details to ensure all information is correct.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-0.5 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
              2
            </div>
            <div>
              <p className="font-medium">Save Your Documents</p>
              <p className="text-sm text-muted-foreground">Store your policy documents in a safe place for future reference.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-0.5 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
              3
            </div>
            <div>
              <p className="font-medium">Contact Support if Needed</p>
              <p className="text-sm text-muted-foreground">Our team is available to help with any questions about your policy.</p>
            </div>
          </li>
        </ol>
      </motion.div>
      
      <motion.div variants={itemVariants} className="flex flex-col items-center mt-8 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="text-4xl font-bold">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
          </div>
          <Button 
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6"
            onClick={() => window.open('https://g.page/r/CbwB1WKRL3BHEAI/review', '_blank')}
          >
            Leave a Review
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompletionScreen;
