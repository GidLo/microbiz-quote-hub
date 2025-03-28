
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-sm">MS</span>
          </div>
          <span className="font-semibold text-lg">Micro Shield</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'text-primary'
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Home
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname.includes('/coverage')
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-foreground'
              }`}>
                Coverage
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/coverage/professional-indemnity" className="w-full">
                  Professional Indemnity
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/coverage/contractors-all-risk" className="w-full">
                  Contractors All Risk
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/coverage/public-liability" className="w-full">
                  Public Liability
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/coverage/event-liability" className="w-full">
                  Event Liability
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link
            to="#"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            About Us
          </Link>
          <Link
            to="#"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center ml-4 space-x-2">
          <Link to="/quote">
            <Button variant="default" className="font-medium">
              Get Your Quote
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm" className="font-medium">
              <LogIn className="mr-1 h-4 w-4" /> Login
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden rounded-md p-2 text-foreground"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden h-screen w-full fixed inset-0 z-40 bg-background">
          <div className="p-4 pt-20 space-y-4">
            <Link
              to="/"
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                location.pathname === '/'
                  ? 'text-primary'
                  : 'text-foreground'
              }`}
            >
              Home
            </Link>
            
            <div className="space-y-2 border-b border-border/40 pb-2">
              <div className="px-3 py-3 text-base font-medium">Coverage</div>
              <Link
                to="/coverage/professional-indemnity"
                className="block px-6 py-2 rounded-md text-sm"
              >
                Professional Indemnity
              </Link>
              <Link
                to="/coverage/contractors-all-risk"
                className="block px-6 py-2 rounded-md text-sm"
              >
                Contractors All Risk
              </Link>
              <Link
                to="/coverage/public-liability"
                className="block px-6 py-2 rounded-md text-sm"
              >
                Public Liability
              </Link>
              <Link
                to="/coverage/event-liability"
                className="block px-6 py-2 rounded-md text-sm"
              >
                Event Liability
              </Link>
            </div>
            
            <Link
              to="#"
              className="block px-3 py-3 rounded-md text-base font-medium"
            >
              About Us
            </Link>
            <Link
              to="#"
              className="block px-3 py-3 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            
            <div className="mt-6 space-y-3">
              <Link to="/quote" className="block">
                <Button variant="default" className="w-full">
                  Get Your Quote
                </Button>
              </Link>
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full">
                  <LogIn className="mr-1 h-4 w-4" /> Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
