import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssistedQuotePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="max-w-2xl mx-auto text-center space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          We'll Assist You Personally
        </h1>
        <p className="text-lg text-muted-foreground">
          Some insurance needs require a human touch.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6 text-left">
          <p className="text-foreground mb-6 leading-relaxed">
            Thanks for submitting your contact details. Based on the product you've selected, we're unable to generate an online quote at the moment. But no worries — a qualified insurance advisor will get in touch with you shortly to understand your needs and help find the right cover.
          </p>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">What Happens Next</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-muted-foreground">
                One of our agents will contact you within the next business day
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-muted-foreground">
                They'll help assess your needs and provide a personalised quote
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-muted-foreground">
                There's no obligation — just expert help when you need it
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center space-x-4 p-4 bg-muted/30 rounded-lg">
          <Phone className="w-8 h-8 text-primary" />
          <Mail className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-sm text-muted-foreground italic">
          We're committed to helping every business find the right insurance — even if it's a bit outside the box.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate('/')} variant="outline" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Button>
          <Button onClick={() => navigate('/coverage/public-liability')} variant="outline">
            Explore Other Products
          </Button>
        </div>
        
        <Button onClick={() => window.location.href = 'mailto:support@bi-me.com'} variant="secondary">
          Contact Support
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AssistedQuotePage;