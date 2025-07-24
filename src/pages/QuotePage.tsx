
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuoteLayout from '@/components/QuoteLayout';
import QuoteProgress from '@/components/QuoteForm/QuoteProgress';
import ContactForm from '@/components/QuoteForm/ContactForm';
import BusinessForm from '@/components/QuoteForm/BusinessForm';
import UnderwritingForm from '@/components/QuoteForm/UnderwritingForm';
import QuoteResult from '@/components/QuoteForm/QuoteResult';
import LegalInformation from '@/components/QuoteForm/LegalInformation';
import CheckoutForm from '@/components/QuoteForm/CheckoutForm';
import CompletionScreen from '@/components/QuoteForm/CompletionScreen';
import AssistedQuotePage from '@/components/QuoteForm/AssistedQuotePage';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { InsuranceType, ContactDetail, BusinessDetail, InsurerQuote, LegalInformationData } from '@/types';
import { QUOTE_STEPS, INSURANCE_TYPES } from '@/utils/constants';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { checkUnderwritingRejection } from '@/utils/underwritingValidation';

const QuotePage = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as InsuranceType | null;
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<InsuranceType | ''>('');
  const [contactDetails, setContactDetails] = useState<ContactDetail | null>(null);
  const [businessDetails, setBusinessDetails] = useState<BusinessDetail | null>(null);
  const [underwritingAnswers, setUnderwritingAnswers] = useState<Record<string, any> | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<InsurerQuote | null>(null);
  const [legalInformation, setLegalInformation] = useState<LegalInformationData | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  
  useEffect(() => {
    if (typeParam && INSURANCE_TYPES.some(i => i.id === typeParam)) {
      setSelectedInsuranceType(typeParam);
    }
    
    window.scrollTo(0, 0);
  }, [typeParam]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Load existing data when navigating back
  const loadExistingData = async (contactId: string) => {
    setIsLoadingData(true);
    try {
      // Load business details
      const { data: businessData } = await supabase
        .from('business_details')
        .select('*')
        .eq('contact_id', contactId)
        .eq('insurance_type', selectedInsuranceType)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (businessData) {
        const businessDetail: BusinessDetail = {
          businessName: businessData.business_name || '',
          registrationNumber: businessData.registration_number || '',
          industry: businessData.industry || '',
          annualRevenue: businessData.annual_revenue || '',
          numberOfEmployees: businessData.number_of_employees || '',
          inceptionDate: businessData.inception_date ? new Date(businessData.inception_date) : undefined,
          address: {
            street: businessData.street_address || '',
            city: businessData.city || '',
            province: businessData.province || '',
            postalCode: businessData.postal_code || ''
          }
        };
        setBusinessDetails(businessDetail);
      }

      // Load underwriting answers
      const { data: underwritingData } = await supabase
        .from('underwriting_answers')
        .select('*')
        .eq('contact_id', contactId)
        .order('datecreated', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (underwritingData?.data) {
        setUnderwritingAnswers(underwritingData.data as Record<string, any>);
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };
  
  const handleContactSubmit = async (data: ContactDetail) => {
    try {
      // Insert contact details and get the ID
      const { data: contactData, error } = await supabase
        .from('contacts')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          industry_id: data.industryId || null,
          occupation_id: data.occupationId || null
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving contact:', error);
        toast({
          title: "Error",
          description: "Failed to save contact information. Please try again.",
          variant: "destructive"
        });
        return;
      }

      setContactDetails(data);
      setContactId(contactData.id);
      
      // If insurance type is "other", go to assisted quote page
      if (selectedInsuranceType === 'other') {
        setCurrentStep(7);
      } else {
        setCurrentStep(1);
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      toast({
        title: "Error", 
        description: "Failed to save contact information. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleBusinessSubmit = async (data: BusinessDetail) => {
    try {
      if (!contactId) {
        toast({
          title: "Error",
          description: "Contact information is missing. Please go back and complete the contact form.",
          variant: "destructive"
        });
        return;
      }

      // Check if business details already exist for this contact and insurance type
      const { data: existingBusiness } = await supabase
        .from('business_details')
        .select('id')
        .eq('contact_id', contactId)
        .eq('insurance_type', selectedInsuranceType as string)
        .maybeSingle();

      const businessData = {
        contact_id: contactId,
        insurance_type: selectedInsuranceType as string,
        business_name: data.businessName || null,
        registration_number: data.registrationNumber || null,
        industry: data.industry || null,
        annual_revenue: data.annualRevenue || null,
        number_of_employees: data.numberOfEmployees || null,
        inception_date: data.inceptionDate?.toISOString().split('T')[0] || null,
        street_address: data.address.street || null,
        city: data.address.city || null,
        province: data.address.province || null,
        postal_code: data.address.postalCode || null
      };

      let error;
      if (existingBusiness) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('business_details')
          .update(businessData)
          .eq('id', existingBusiness.id);
        error = updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('business_details')
          .insert(businessData);
        error = insertError;
      }

      if (error) {
        console.error('Error saving business details:', error);
        toast({
          title: "Error",
          description: "Failed to save business information. Please try again.",
          variant: "destructive"
        });
        return;
      }

      setBusinessDetails(data);
      setCurrentStep(2);
      
      toast({
        title: "Success",
        description: "Business information saved successfully."
      });
    } catch (error) {
      console.error('Error saving business details:', error);
      toast({
        title: "Error",
        description: "Failed to save business information. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleUnderwritingSubmit = (data: Record<string, any>) => {
    console.log('Underwriting data:', data);
    setUnderwritingAnswers(data);
    setCurrentStep(3);
  };
  
  const handleQuoteSelect = (quote: InsurerQuote) => {
    console.log('Selected quote:', quote);
    setSelectedQuote(quote);
    setCurrentStep(4);
  };

  const handleLegalInformationSubmit = (data: LegalInformationData) => {
    console.log('Legal information data:', data);
    setLegalInformation(data);
    setCurrentStep(5);
  };
  
  const handleInsuranceTypeChange = (value: string) => {
    setSelectedInsuranceType(value as InsuranceType);
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <div className="mb-6">
              <Label htmlFor="insuranceType" className="mb-2 block">Select Insurance Type</Label>
              <Select 
                value={selectedInsuranceType} 
                onValueChange={handleInsuranceTypeChange}
              >
                <SelectTrigger id="insuranceType" className="w-full">
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent>
                  {INSURANCE_TYPES.map(insurance => (
                    <SelectItem key={insurance.id} value={insurance.id}>
                      {insurance.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedInsuranceType && (
              <ContactForm 
                initialData={contactDetails || undefined} 
                onSubmit={handleContactSubmit} 
                selectedInsuranceType={selectedInsuranceType as InsuranceType}
              />
            )}
          </div>
        );
        
      case 1:
        return (
          <BusinessForm 
            initialData={businessDetails || undefined} 
            onSubmit={handleBusinessSubmit}
            onBack={async () => {
              if (contactId) {
                await loadExistingData(contactId);
              }
              setCurrentStep(0);
            }}
            insuranceType={selectedInsuranceType as string}
          />
        );
        
      case 2:
        return (
          <UnderwritingForm 
            selectedInsuranceType={selectedInsuranceType as InsuranceType}
            onSubmit={handleUnderwritingSubmit}
            onBack={async () => {
              if (contactId) {
                await loadExistingData(contactId);
              }
              setCurrentStep(1);
            }}
            contactId={contactId}
            contactDetails={contactDetails}
            initialData={underwritingAnswers || undefined}
          />
        );
        
      case 3:
        const underwritingRejection = checkUnderwritingRejection(
          selectedInsuranceType as InsuranceType,
          businessDetails,
          underwritingAnswers
        );
        
        return (
          <QuoteResult 
            insuranceType={selectedInsuranceType as InsuranceType}
            businessName={businessDetails?.businessName || ''}
            contactDetails={contactDetails}
            businessDetails={businessDetails}
            underwritingAnswers={underwritingAnswers}
            onProceed={handleQuoteSelect}
            onBack={async () => {
              if (contactId) {
                await loadExistingData(contactId);
              }
              setCurrentStep(2);
            }}
            underwritingRejection={underwritingRejection}
          />
        );
        
      case 4:
        return (
          <LegalInformation 
            onSubmit={handleLegalInformationSubmit}
            onBack={() => setCurrentStep(3)}
          />
        );
        
      case 5:
        return (
          <CheckoutForm 
            insuranceType={selectedInsuranceType as InsuranceType}
            onComplete={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
          />
        );
        
      case 6:
        return <CompletionScreen />;
        
      case 7:
        return <AssistedQuotePage />;
        
      default:
        return null;
    }
  };
  
  return (
    <QuoteLayout>
      <div className="bg-secondary/50 py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-6 md:px-8">
          
          {currentStep < 6 && currentStep !== 7 && (
            <QuoteProgress steps={QUOTE_STEPS} currentStep={currentStep} />
          )}
          
          <div className="bg-background rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </QuoteLayout>
  );
};

export default QuotePage;
