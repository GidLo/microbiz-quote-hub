
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <footer className="border-t border-border/40 py-8 px-6 md:px-8 mt-12">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium text-lg mb-4">Micro Shield Insurance</h3>
              <p className="text-muted-foreground text-sm">
                Specialized insurance solutions for micro businesses in South Africa.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Insurance</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/coverage/professional-indemnity" className="text-muted-foreground hover:text-primary transition-colors">Professional Indemnity</a></li>
                <li><a href="/coverage/contractors-all-risk" className="text-muted-foreground hover:text-primary transition-colors">Contractors All Risk</a></li>
                <li><a href="/coverage/public-liability" className="text-muted-foreground hover:text-primary transition-colors">Public Liability</a></li>
                <li><a href="/coverage/event-liability" className="text-muted-foreground hover:text-primary transition-colors">Event Liability</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-sm text-muted-foreground flex flex-col md:flex-row md:justify-between items-center">
            <p>© 2023 Micro Shield Insurance. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
