import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContactDetail, InsuranceType } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ContactFormProps {
  initialData?: ContactDetail;
  onSubmit: (data: ContactDetail) => void;
  selectedInsuranceType: InsuranceType;
}

interface Industry {
  id: string;
  name: string;
  insurance_type: string;
}

interface Occupation {
  id: string;
  name: string;
  industry_id: string;
}

const ContactForm = ({ initialData, onSubmit, selectedInsuranceType }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactDetail>(initialData || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    industryId: '',
    occupationId: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDetail, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [filteredOccupations, setFilteredOccupations] = useState<Occupation[]>([]);
  const { toast } = useToast();
  
  // Check if fields should be disabled based on insurance type
  const isFieldsDisabled = selectedInsuranceType === 'contractors-all-risk' || selectedInsuranceType === 'event-liability' || selectedInsuranceType === 'divers-surething' || selectedInsuranceType === 'other';
  
  // Fetch industries based on selected insurance type
  useEffect(() => {
    const fetchIndustries = async () => {
      const { data, error } = await supabase
        .from('industries')
        .select('*')
        .eq('insurance_type', selectedInsuranceType)
        .order('name');
      
      if (error) {
        console.error('Error fetching industries:', error);
        return;
      }
      
      console.log('Fetched industries:', data);
      setIndustries(data || []);
    };
    
    if (selectedInsuranceType) {
      fetchIndustries();
    }
  }, [selectedInsuranceType]);
  
  // Fetch all occupations
  useEffect(() => {
    const fetchOccupations = async () => {
      const { data, error } = await supabase
        .from('occupations')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching occupations:', error);
        return;
      }
      
      console.log('Fetched occupations:', data);
      setOccupations(data || []);
    };
    
    fetchOccupations();
  }, []);
  
  // Auto-populate fields for specific insurance types and update filtered occupations
  useEffect(() => {
    if (industries.length > 0 && occupations.length > 0) {
      console.log('Auto-populating for insurance type:', selectedInsuranceType);
      
      if (selectedInsuranceType === 'contractors-all-risk') {
        const constructionIndustry = industries.find(i => i.name === 'Construction and Trade');
        const contractorOccupation = occupations.find(o => o.name === 'Contractor' && o.industry_id === constructionIndustry?.id);
        
        console.log('Construction industry:', constructionIndustry);
        console.log('Contractor occupation:', contractorOccupation);
        
        if (constructionIndustry && contractorOccupation) {
          setFormData(prev => ({
            ...prev,
            industryId: constructionIndustry.id,
            occupationId: contractorOccupation.id
          }));
          
          // Immediately update filtered occupations for this industry
          const filtered = occupations.filter(occ => occ.industry_id === constructionIndustry.id);
          console.log('Filtered occupations for construction:', filtered);
          setFilteredOccupations(filtered);
        }
      } else if (selectedInsuranceType === 'event-liability') {
        const eventIndustry = industries.find(i => i.name === 'Event Organiser');
        const eventOccupation = occupations.find(o => o.name === 'Event organiser' && o.industry_id === eventIndustry?.id);
        
        console.log('Event industry:', eventIndustry);
        console.log('Event occupation:', eventOccupation);
        
        if (eventIndustry && eventOccupation) {
          setFormData(prev => ({
            ...prev,
            industryId: eventIndustry.id,
            occupationId: eventOccupation.id
          }));
          
          // Immediately update filtered occupations for this industry
          const filtered = occupations.filter(occ => occ.industry_id === eventIndustry.id);
          console.log('Filtered occupations for events:', filtered);
          setFilteredOccupations(filtered);
        }
      } else if (selectedInsuranceType === 'divers-surething') {
        const diversIndustry = industries.find(i => i.name === 'Divers');
        const diversOccupation = occupations.find(o => o.name === 'Divers' && o.industry_id === diversIndustry?.id);
        
        console.log('Divers industry:', diversIndustry);
        console.log('Divers occupation:', diversOccupation);
        
        if (diversIndustry && diversOccupation) {
          setFormData(prev => ({
            ...prev,
            industryId: diversIndustry.id,
            occupationId: diversOccupation.id
          }));
          
          // Immediately update filtered occupations for this industry
          const filtered = occupations.filter(occ => occ.industry_id === diversIndustry.id);
          console.log('Filtered occupations for divers:', filtered);
          setFilteredOccupations(filtered);
        }
      }
    }
  }, [industries, occupations, selectedInsuranceType]);
  
  // Filter occupations when industry changes (for non-disabled fields)
  useEffect(() => {
    // Skip this effect if fields are disabled and auto-population has already handled filtering
    if (isFieldsDisabled) {
      return;
    }
    
    if (formData.industryId) {
      const filtered = occupations.filter(occ => occ.industry_id === formData.industryId);
      setFilteredOccupations(filtered);
      
      // Reset occupation if it's not valid for the new industry
      if (formData.occupationId && !filtered.some(occ => occ.id === formData.occupationId)) {
        setFormData(prev => ({ ...prev, occupationId: '' }));
      }
    } else {
      setFilteredOccupations([]);
      setFormData(prev => ({ ...prev, occupationId: '' }));
    }
  }, [formData.industryId, occupations, isFieldsDisabled]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof ContactDetail]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSelectChange = (name: keyof ContactDetail, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof ContactDetail, string>> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    // Only require industry and occupation if not "other" insurance type
    if (selectedInsuranceType !== 'other') {
      if (!formData.industryId) {
        newErrors.industryId = 'Industry is required';
      }
      
      if (!formData.occupationId) {
        newErrors.occupationId = 'Occupation is required';
      }
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase
          .from('contacts')
          .insert({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            industry_id: selectedInsuranceType === 'other' ? null : formData.industryId,
            occupation_id: selectedInsuranceType === 'other' ? null : formData.occupationId
          });

        if (error) {
          console.error('Database error:', error);
          throw new Error('Failed to save contact information. Please try again.');
        }

        onSubmit(formData);
        toast({
          title: "Success",
          description: "Your contact information has been saved.",
        });
      } catch (error: any) {
        console.error('Error saving contact:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "There was a problem saving your contact information. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  // Debug logging
  console.log('Current form data:', formData);
  console.log('Filtered occupations:', filteredOccupations);
  console.log('Is fields disabled:', isFieldsDisabled);
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'border-red-300' : ''}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </motion.div>
        
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'border-red-300' : ''}
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </motion.div>
      </div>
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'border-red-300' : ''}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </motion.div>
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="073 123 4567"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'border-red-300' : ''}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </motion.div>
      
      {selectedInsuranceType !== 'other' && (
        <>
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="industry">Industry</Label>
            <Select 
              value={formData.industryId} 
              onValueChange={(value) => handleSelectChange('industryId', value)}
              disabled={isSubmitting || isFieldsDisabled}
            >
              <SelectTrigger id="industry" className={errors.industryId ? 'border-red-300' : ''}>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry.id} value={industry.id}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industryId && (
              <p className="text-sm text-red-500">{errors.industryId}</p>
            )}
          </motion.div>
          
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="occupation">Occupation</Label>
            <Select 
              value={formData.occupationId} 
              onValueChange={(value) => handleSelectChange('occupationId', value)}
              disabled={isSubmitting || isFieldsDisabled}
            >
              <SelectTrigger id="occupation" className={errors.occupationId ? 'border-red-300' : ''}>
                <SelectValue placeholder={formData.industryId ? "Select your occupation" : "Select an industry first"} />
              </SelectTrigger>
              <SelectContent>
                {filteredOccupations.map(occupation => (
                  <SelectItem key={occupation.id} value={occupation.id}>
                    {occupation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.occupationId && (
              <p className="text-sm text-red-500">{errors.occupationId}</p>
            )}
          </motion.div>
        </>
      )}
      
      <motion.div variants={itemVariants} className="pt-4 space-y-4">
        <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms || false}
            onCheckedChange={(checked) => handleSelectChange('agreeToTerms', checked as boolean)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              I understand that Bi-me only offers product information, and does not offer advice; and I agree to the{' '}
              <a href="#" className="text-primary underline hover:no-underline">
                privacy policy
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary underline hover:no-underline">
                terms of use
              </a>.
            </Label>
            <p className="text-xs text-muted-foreground mt-2">
              Bi-me is a technology company and digital broker. We try to provide as much information as possible for the products that are available on our platform. None of the information we provide is meant to be taken as advice.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              We collect (and respect) your personal information in line with our{' '}
              <a href="#" className="text-primary underline hover:no-underline">
                Privacy Policy
              </a>. By clicking the checkbox, you agree to Bi-me's{' '}
              <a href="#" className="text-primary underline hover:no-underline">
                Terms of Use
              </a>{' '}
              and for Bi-me to collect and store your personal information and to contact you about its services. Bi-me may pass your contact information to partners for business insurance matters.{' '}
              <a href="#" className="text-primary underline hover:no-underline">
                Learn more
              </a>
            </p>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || !formData.agreeToTerms}
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
