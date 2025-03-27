
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import InsuranceCard from '@/components/InsuranceCard';
import AIInsuranceAdvisor from '@/components/AIInsuranceAdvisor';
import { INSURANCE_TYPES } from '@/utils/constants';

const Index = () => {
  return (
    <Layout>
      <Hero 
        title="Insurance for South African Micro Businesses"
        subtitle="Affordable, specialized insurance coverage to protect what you've built"
        ctaComponent={
          <Link to="/quote">
            <Button size="lg" className="rounded-full px-8">
              Get My Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        }
      />
      
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Cover</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer specialized insurance solutions designed specifically for South African micro businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSURANCE_TYPES.map((insurance, index) => (
              <motion.div
                key={insurance.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <InsuranceCard
                  title={insurance.title}
                  description={insurance.description}
                  icon={insurance.icon}
                  href={`/coverage/${insurance.id}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Insurance Do I Need?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not sure which insurance is right for your business? Our AI assistant can help you determine the most appropriate coverage.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <AIInsuranceAdvisor />
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Micro Shield Insurance?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized insurance solutions designed for the unique needs of South African micro businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-card border border-border/40 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Affordable Premiums</h3>
              <p className="text-muted-foreground">Tailored coverage with premiums starting from just R250 per month.</p>
            </motion.div>
            
            <motion.div
              className="bg-card border border-border/40 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Local Expertise</h3>
              <p className="text-muted-foreground">Specialized in South African business risks and regulatory requirements.</p>
            </motion.div>
            
            <motion.div
              className="bg-card border border-border/40 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Quick Claims Process</h3>
              <p className="text-muted-foreground">Simplified claims with fast processing and responsive support.</p>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/quote">
              <Button size="lg" className="rounded-full px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary/5">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Protection Designed for Micro Businesses</h2>
              <p className="text-muted-foreground mb-6">
                Traditional insurance often overlooks the unique needs of micro businesses. We've created solutions specifically for businesses like yours.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Coverage tailored for businesses with 1-10 employees</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Flexible payment options designed for small business cash flow</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Simple, jargon-free policies you can actually understand</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary mb-2">1,500+</div>
                <p className="text-muted-foreground">South African micro businesses protected</p>
              </div>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">94%</div>
                  <p className="text-muted-foreground text-sm">Customer satisfaction</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">48 hrs</div>
                  <p className="text-muted-foreground text-sm">Average claim processing</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">R250</div>
                  <p className="text-muted-foreground text-sm">Starting monthly premium</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
                  <p className="text-muted-foreground text-sm">Customer rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
