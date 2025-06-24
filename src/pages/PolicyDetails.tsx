import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, FileText, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
const PolicyDetails = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();

  // Mock policy data - in real app this would be fetched based on ID
  const policy = {
    id: id,
    title: 'iTOO Cyber Go New Business Policy',
    policyNumber: 'CYBER/00032/000/24/M',
    status: 'Active',
    expiresOn: '31 May 2026',
    startDate: '1 June 2025',
    coverageAmount: 'R1,000,000',
    premium: 'R250/month',
    logo: 'iTOO',
    type: 'Cyber Liability Insurance',
    description: 'Comprehensive cyber liability coverage for your business, protecting against data breaches, cyber attacks, and digital risks.'
  };
  const coverageDetails = [{
    title: 'Data Breach Response',
    description: 'Coverage for notification costs and credit monitoring'
  }, {
    title: 'Cyber Extortion',
    description: 'Protection against ransomware and cyber extortion threats'
  }, {
    title: 'Business Interruption',
    description: 'Coverage for lost income due to cyber incidents'
  }, {
    title: 'Third Party Liability',
    description: 'Protection against claims from affected third parties'
  }];
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/customer-portal')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Policy Details</h1>
              <p className="text-sm text-muted-foreground">View your policy information and coverage details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-6 py-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="space-y-6">
          {/* Policy Overview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {policy.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{policy.title}</CardTitle>
                  <CardDescription>{policy.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="font-bold text-2xl">{policy.logo}</div>
                  <p className="text-sm text-muted-foreground mt-1">Insurer</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Policy Number</p>
                  <p className="font-medium">{policy.policyNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coverage Amount</p>
                  <p className="font-medium">{policy.coverageAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Premium</p>
                  <p className="font-medium">{policy.premium}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expires On</p>
                  <p className="font-medium">{policy.expiresOn}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Details */}
          <Card>
            
            
          </Card>

          {/* Policy Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Policy Documents
              </CardTitle>
              <CardDescription>
                Download your policy documents and certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Policy Certificate</p>
                      <p className="text-sm text-muted-foreground">PDF • 234 KB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Policy Schedule</p>
                      <p className="text-sm text-muted-foreground">PDF • 456 KB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>;
};
export default PolicyDetails;