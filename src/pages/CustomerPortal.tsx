import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, LogOut, Settings, User, FileEdit } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AccountSettings from '@/components/AccountSettings';

interface Policy {
  id: string;
  title: string;
  policyNumber: string;
  status: 'Active' | 'Expired';
  expiresOn: string;
  logo: string;
  type: string;
}

const CustomerPortal = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'policies' | 'settings'>('policies');

  // Mock policy data - in real app this would come from API
  const policies: Policy[] = [
    {
      id: '1',
      title: 'iTOO Cyber Go New Business Policy',
      policyNumber: 'CYBER/00032/000/24/M',
      status: 'Active',
      expiresOn: '31 May 2026',
      logo: 'iTOO',
      type: 'Cyber'
    },
    {
      id: '2',
      title: 'iTOO Cyber Go New Business Policy',
      policyNumber: 'CYBER/00032/000/24/M',
      status: 'Expired',
      expiresOn: '31 May 2025',
      logo: 'iTOO',
      type: 'Cyber'
    }
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handlePolicyClick = (policyId: string) => {
    navigate(`/policy/${policyId}`);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Customer Portal</h2>
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveView('policies')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${
                activeView === 'policies' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <User className="h-4 w-4" />
              Your policies
            </button>
            <button 
              onClick={() => setActiveView('settings')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${
                activeView === 'settings' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Settings className="h-4 w-4" />
              Account settings
            </button>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeView === 'policies' ? (
            <>
              <h1 className="text-2xl font-bold mb-8">Your policies</h1>
              
              <div className="space-y-4">
                {policies.map((policy) => (
                  <Card 
                    key={policy.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handlePolicyClick(policy.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Policy Icon */}
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {policy.type.substring(0, 3)}
                            </span>
                          </div>
                          
                          {/* Policy Details */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={policy.status === 'Active' ? 'default' : 'secondary'}
                                className={policy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
                              >
                                {policy.status}
                              </Badge>
                            </div>
                            <h3 className="font-medium text-primary">
                              {policy.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Policy Number
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expires on
                            </p>
                          </div>
                        </div>
                        
                        {/* Right Side */}
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="font-bold text-lg">{policy.logo}</div>
                            <div className="text-sm font-medium">{policy.policyNumber}</div>
                            <div className="text-sm font-medium">{policy.expiresOn}</div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <AccountSettings />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerPortal;
