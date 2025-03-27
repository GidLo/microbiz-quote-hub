
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  cta?: ReactNode;
  showStats?: boolean;
}

const Hero = ({ 
  title, 
  subtitle, 
  ctaText = "Get Your Free Quote", 
  ctaLink = "/quote",
  cta,
  showStats = true 
}: HeroProps) => {
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
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/30 z-0"></div>
      <div className="absolute w-96 h-96 bg-primary/20 rounded-full filter blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
      
      <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
          
          <motion.div variants={itemVariants}>
            {cta ? (
              cta
            ) : (
              <Link to={ctaLink}>
                <Button size="lg" className="rounded-full font-medium px-8 py-6 text-base">
                  {ctaText}
                </Button>
              </Link>
            )}
          </motion.div>
          
          {showStats && (
            <motion.div 
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
              variants={itemVariants}
            >
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Micro Businesses Protected</div>
              </div>
              
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction Rate</div>
              </div>
              
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">R5M+</div>
                <div className="text-sm text-muted-foreground">Claims Paid in 2023</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
