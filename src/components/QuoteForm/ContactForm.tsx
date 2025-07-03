
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContactDetail } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ContactFormProps {
  initialData?: ContactDetail;
  onSubmit: (data: ContactDetail) => void;
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

const ContactForm = ({ initialData, onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactDetail>(initialData || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    industryId: '',
    occupationId: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDetail, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [filteredOccupations, setFilteredOccupations] = useState<Occupation[]>([]);
  const { toast } = useToast();
  
  // Fetch industries on component mount
  useEffect(() => {
    const fetchIndustries = async () => {
      const { data, error } = await supabase
        .from('industries')
        .select('*')
        .eq('insurance_type', 'professional-indemnity')
        .order('name');
      
      if (error) {
        console.error('Error fetching industries:', error);
        return;
      }
      
      setIndustries(data || []);
    };
    
    fetchIndustries();
  }, []);
  
  // Fetch occupations on component mount
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
      
      setOccupations(data || []);
    };
    
    fetchOccupations();
  }, []);
  
  // Filter occupations when industry changes
  useEffect(() => {
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
  }, [formData.industryId, occupations]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof ContactDetail]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSelectChange = (name: keyof ContactDetail, value: string) => {
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
    
    if (!formData.industryId) {
      newErrors.industryId = 'Industry is required';
    }
    
    if (!formData.occupationId) {
      newErrors.occupationId = 'Occupation is required';
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
            industry_id: formData.industryId,
            occupation_id: formData.occupationId
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
      
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="industry">Industry</Label>
        <Select 
          value={formData.industryId} 
          onValueChange={(value) => handleSelectChange('industryId', value)}
          disabled={isSubmitting}
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
          disabled={isSubmitting || !formData.industryId}
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
      
      <motion.div variants={itemVariants} className="pt-4">
        <Button 
          type="submit" 
          className="w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
