
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, BookOpen, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import InsuranceCard from '@/components/InsuranceCard';
import { INSURANCE_TYPES } from '@/utils/constants';

const Index = () => {
  const featuresList = [
    { 
      icon: <BookOpen className="h-6 w-6" />,
      title: 'No-jargon policies', 
      description: 'Insurance designed specifically for your micro business needs with clear, simple language.' 
    },
    { 
      icon: <ShieldCheck className="h-6 w-6" />,
      title: 'Affordable premiums', 
      description: 'Competitive rates tailored to the size and needs of South African micro businesses.' 
    },
    { 
      icon: <Zap className="h-6 w-6" />,
      title: 'Simple claim process', 
      description: 'Quick and easy claims with dedicated support for when you need it most.' 
    }
  ];

  return (
    <Layout>
      <Hero 
        title="Insurance Made Simple for South African Micro Businesses" 
        subtitle="Get the protection you need with our affordable, tailored insurance solutions designed specifically for small businesses in South Africa."
      />
      
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What We Cover
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Specialized insurance solutions tailored for micro businesses in South Africa.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSURANCE_TYPES.map((insurance, index) => (
              <InsuranceCard key={insurance.id} insurance={insurance} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Made for South African Micro Businesses</h2>
              <p className="text-muted-foreground mb-8">
                We understand the unique challenges faced by micro businesses in South Africa. Our insurance solutions are designed with your specific needs and budget in mind.
              </p>
              
              <ul className="space-y-4 mb-8">
                {featuresList.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="mt-1 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
              
              <Link to="/quote">
                <Button className="rounded-full px-8">
                  Get Your Quote <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              className="bg-card rounded-xl overflow-hidden shadow-md border border-border/50 p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Why Choose Us?</h3>
                  <p className="text-sm text-muted-foreground">Benefits of our micro business insurance</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">South African Focused</h4>
                    <p className="text-xs text-muted-foreground">Designed for the local business environment and regulations</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Micro Business Specialists</h4>
                    <p className="text-xs text-muted-foreground">Focused solely on businesses with fewer than 10 employees</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Low Monthly Premiums</h4>
                    <p className="text-xs text-muted-foreground">Affordable coverage starting from R250 per month</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Fast Digital Process</h4>
                    <p className="text-xs text-muted-foreground">Get covered in minutes with our streamlined online system</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Local Support Team</h4>
                    <p className="text-xs text-muted-foreground">South African-based customer service and claims team</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-sm italic text-center">
                  "Micro Shield made getting insurance for my small business incredibly easy. The process was quick and the rates were much better than I expected."
                </p>
                <p className="text-xs text-center mt-2 font-medium">
                  — Thabo M., Johannesburg
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get the right coverage for your business in just a few simple steps.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                number: '01',
                title: 'Answer Basic Questions',
                description: 'Tell us about your business and the coverage you need.'
              },
              {
                number: '02',
                title: 'Get Instant Quotes',
                description: 'Receive tailored insurance quotes in less than 2 minutes.'
              },
              {
                number: '03',
                title: 'Secure Your Business',
                description: 'Choose your plan, make a payment, and get covered immediately.'
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/quote">
              <Button size="lg" className="rounded-full px-8">
                Start Your Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to protect your micro business?</h2>
            <p className="mb-8 text-white/80">
              Join hundreds of South African micro businesses already covered by our specialized insurance solutions.
            </p>
            <Link to="/quote">
              <Button variant="secondary" size="lg" className="rounded-full px-8">
                Get Your Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
