-- Create business_details table
CREATE TABLE public.business_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL,
  insurance_type TEXT NOT NULL,
  business_name TEXT,
  registration_number TEXT,
  industry TEXT,
  annual_revenue TEXT,
  number_of_employees TEXT,
  inception_date DATE,
  street_address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.business_details ENABLE ROW LEVEL SECURITY;

-- Create policies for business_details access
CREATE POLICY "Allow public to insert business details" 
ON public.business_details 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public to view business details" 
ON public.business_details 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public to update business details" 
ON public.business_details 
FOR UPDATE 
USING (true);

-- Add foreign key constraint to contacts table
ALTER TABLE public.business_details 
ADD CONSTRAINT business_details_contact_id_fkey 
FOREIGN KEY (contact_id) REFERENCES public.contacts(id) ON DELETE CASCADE;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_business_details_updated_at
BEFORE UPDATE ON public.business_details
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();