import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Calculator, User, Stethoscope, Dumbbell, Scale, Camera, Briefcase, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { INSURANCE_TYPES } from '@/utils/constants';
import { InsuranceOption } from '@/types';

const CoveragePage = () => {
  const { type } = useParams<{ type: string }>();
  const insurance = INSURANCE_TYPES.find(i => i.id === type) as InsuranceOption;
  
  useEffect(() => {
    if (!insurance) {
      window.location.href = '/';
    }
    
    window.scrollTo(0, 0);
  }, [insurance]);
  
  if (!insurance) {
    return null;
  }

  const professionalCategories = [
    {
      title: "Accounting & Consulting",
      description: "For accountants, tax professionals, management consultants and more",
      icon: Calculator,
      buttonText: "GET MY PRICE"
    },
    {
      title: "Built & Design",
      description: "For architects, draughtsman, engineers, designers, interior decorators and more",
      icon: User,
      buttonText: "GET MY PRICE"
    },
    {
      title: "Doctors",
      description: "For general practitioners, specialists, dentists, psychiatrists and more",
      icon: Stethoscope,
      buttonText: "GET MY PRICE"
    },
    {
      title: "Health & Fitness",
      description: "For health professionals including psychologist, physios and many more",
      icon: Dumbbell,
      buttonText: "GET MY PRICE"
    },
    {
      title: "Legal Practitioners",
      description: "For attorneys, advocates, conveyancers, liquidators and more",
      icon: Scale,
      buttonText: "GET MY PRICE"
    },
    {
      title: "Marketing & Multi-media",
      description: "For advertising, market research, graphic design and publishers",
      icon: Camera,
      buttonText: "GET MY PRICE"
    },
    {
      title: "Miscellaneous",
      description: "For assessors, loss adjusters, graphic designers and more",
      icon: Briefcase,
      buttonText: "GET MY PRICE"
    },
    {
      title: "Other Occupations",
      description: "Designed for professionals who's profession is not listed above",
      icon: Users,
      buttonText: "REQUEST QUOTE"
    }
  ];

  const isProfessionalIndemnity = insurance.id === 'professional-indemnity';
  
  const FAQs = [
    {
      question: `Who needs ${insurance.title}?`,
      answer: `${insurance.title} is essential for businesses that provide professional services or advice, protecting against claims of negligence, errors, or omissions in your work.`
    },
    {
      question: `What does ${insurance.title} typically cover?`,
      answer: `Our ${insurance.title} policies typically cover legal defense costs, settlements, and judgments from covered claims alleging professional negligence or failures.`
    },
    {
      question: `How much ${insurance.title} insurance do I need?`,
      answer: `The amount of coverage needed depends on your business size, industry, and risk exposure. Our specialists can help determine the right coverage level for your specific situation.`
    },
    {
      question: `How much does ${insurance.title} insurance cost?`,
      answer: `Premiums for ${insurance.title} insurance vary based on multiple factors including your industry, revenue, coverage limits, and claims history. Our micro business policies start from R250 per month.`
    }
  ];

  return (
    <Layout>
      {isProfessionalIndemnity ? (
        <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/30 z-0"></div>
          <div className="absolute w-96 h-96 bg-primary/20 rounded-full filter blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
          
          <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-4 h-4 rounded-full border-2 border-primary mr-2"></div>
                <span className="text-muted-foreground">Professional Indemnity Insurance | South Africa</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Professional Indemnity Insurance As Fast As You Can Click
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {professionalCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/50 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 mx-auto">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <Link to={`/quote?type=${insurance.id}`}>
                    <Button 
                      className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-medium rounded-full"
                      size="sm"
                    >
                      {category.buttonText}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Hero 
          title={insurance.title}
          subtitle={insurance.description}
          showStats={false}
        />
      )}
      
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Coverage Details</h2>
              <p className="text-muted-foreground mb-8">
                Our {insurance.title} insurance is specifically designed for South African micro businesses, providing comprehensive protection at affordable rates.
              </p>
              
              <div className="space-y-4 mb-8">
                {insurance.coverPoints.map((point, index) => (
                  <motion.div 
                    key={index}
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="mt-1 text-primary">
                      <Check className="h-5 w-5" />
                    </div>
                    <p>{point}</p>
                  </motion.div>
                ))}
              </div>
              
              <Link to={`/quote?type=${insurance.id}`}>
                <Button size="lg" className="rounded-full px-8">
                  Get Your {insurance.title} Quote <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/50 rounded-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Why South African Micro Businesses Need {insurance.title}</h3>
              <p className="text-muted-foreground mb-6">
                South African micro businesses face unique challenges and risks. Here's why {insurance.title} is essential for your business:
              </p>
              
              <ul className="space-y-4">
                <li className="bg-card rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium mb-2">Legal Protection</h4>
                  <p className="text-sm text-muted-foreground">Covers legal fees and damages if your business is sued for professional mistakes.</p>
                </li>
                <li className="bg-card rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium mb-2">Contract Requirements</h4>
                  <p className="text-sm text-muted-foreground">Many clients require proof of insurance before engaging your services.</p>
                </li>
                <li className="bg-card rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium mb-2">Business Credibility</h4>
                  <p className="text-sm text-muted-foreground">Having proper insurance demonstrates professionalism and reliability.</p>
                </li>
                <li className="bg-card rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium mb-2">Peace of Mind</h4>
                  <p className="text-sm text-muted-foreground">Focus on growing your business knowing you're protected against major risks.</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQs.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to protect your business with {insurance.title}?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get comprehensive coverage tailored for South African micro businesses at affordable rates.
            </p>
            <Link to={`/quote?type=${insurance.id}`}>
              <Button size="lg" className="rounded-full px-8">
                Get Your Quote Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CoveragePage;
