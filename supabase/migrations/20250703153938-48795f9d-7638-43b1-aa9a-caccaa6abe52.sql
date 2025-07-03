
-- Create industries table
CREATE TABLE public.industries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  insurance_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create occupations table
CREATE TABLE public.occupations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  industry_id UUID REFERENCES public.industries(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.occupations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to industries and occupations
CREATE POLICY "Allow public to view industries" 
  ON public.industries 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public to view occupations" 
  ON public.occupations 
  FOR SELECT 
  USING (true);

-- Insert sample data for professional indemnity industries
INSERT INTO public.industries (name, insurance_type) VALUES
  ('Accounting and Consulting', 'professional-indemnity'),
  ('Built & Design', 'professional-indemnity'),
  ('Doctors', 'professional-indemnity'),
  ('Health & Fitness', 'professional-indemnity'),
  ('Legal Practitioners', 'professional-indemnity'),
  ('Marketing & Multimedia', 'professional-indemnity'),
  ('Miscellaneous', 'professional-indemnity');

-- Insert sample occupations for each industry
INSERT INTO public.occupations (name, industry_id) VALUES
  -- Accounting and Consulting
  ('Accountant', (SELECT id FROM public.industries WHERE name = 'Accounting and Consulting' AND insurance_type = 'professional-indemnity')),
  ('Auditor', (SELECT id FROM public.industries WHERE name = 'Accounting and Consulting' AND insurance_type = 'professional-indemnity')),
  ('Financial Advisor', (SELECT id FROM public.industries WHERE name = 'Accounting and Consulting' AND insurance_type = 'professional-indemnity')),
  ('Tax Consultant', (SELECT id FROM public.industries WHERE name = 'Accounting and Consulting' AND insurance_type = 'professional-indemnity')),
  ('Management Consultant', (SELECT id FROM public.industries WHERE name = 'Accounting and Consulting' AND insurance_type = 'professional-indemnity')),
  
  -- Built & Design
  ('Architect', (SELECT id FROM public.industries WHERE name = 'Built & Design' AND insurance_type = 'professional-indemnity')),
  ('Engineer', (SELECT id FROM public.industries WHERE name = 'Built & Design' AND insurance_type = 'professional-indemnity')),
  ('Interior Designer', (SELECT id FROM public.industries WHERE name = 'Built & Design' AND insurance_type = 'professional-indemnity')),
  ('Town Planner', (SELECT id FROM public.industries WHERE name = 'Built & Design' AND insurance_type = 'professional-indemnity')),
  ('Quantity Surveyor', (SELECT id FROM public.industries WHERE name = 'Built & Design' AND insurance_type = 'professional-indemnity')),
  
  -- Doctors
  ('General Practitioner', (SELECT id FROM public.industries WHERE name = 'Doctors' AND insurance_type = 'professional-indemnity')),
  ('Specialist', (SELECT id FROM public.industries WHERE name = 'Doctors' AND insurance_type = 'professional-indemnity')),
  ('Surgeon', (SELECT id FROM public.industries WHERE name = 'Doctors' AND insurance_type = 'professional-indemnity')),
  ('Dentist', (SELECT id FROM public.industries WHERE name = 'Doctors' AND insurance_type = 'professional-indemnity')),
  ('Psychiatrist', (SELECT id FROM public.industries WHERE name = 'Doctors' AND insurance_type = 'professional-indemnity')),
  
  -- Health & Fitness
  ('Physiotherapist', (SELECT id FROM public.industries WHERE name = 'Health & Fitness' AND insurance_type = 'professional-indemnity')),
  ('Personal Trainer', (SELECT id FROM public.industries WHERE name = 'Health & Fitness' AND insurance_type = 'professional-indemnity')),
  ('Nutritionist', (SELECT id FROM public.industries WHERE name = 'Health & Fitness' AND insurance_type = 'professional-indemnity')),
  ('Chiropractor', (SELECT id FROM public.industries WHERE name = 'Health & Fitness' AND insurance_type = 'professional-indemnity')),
  ('Massage Therapist', (SELECT id FROM public.industries WHERE name = 'Health & Fitness' AND insurance_type = 'professional-indemnity')),
  
  -- Legal Practitioners
  ('Attorney', (SELECT id FROM public.industries WHERE name = 'Legal Practitioners' AND insurance_type = 'professional-indemnity')),
  ('Advocate', (SELECT id FROM public.industries WHERE name = 'Legal Practitioners' AND insurance_type = 'professional-indemnity')),
  ('Conveyancer', (SELECT id FROM public.industries WHERE name = 'Legal Practitioners' AND insurance_type = 'professional-indemnity')),
  ('Notary', (SELECT id FROM public.industries WHERE name = 'Legal Practitioners' AND insurance_type = 'professional-indemnity')),
  ('Legal Advisor', (SELECT id FROM public.industries WHERE name = 'Legal Practitioners' AND insurance_type = 'professional-indemnity')),
  
  -- Marketing & Multimedia
  ('Marketing Manager', (SELECT id FROM public.industries WHERE name = 'Marketing & Multimedia' AND insurance_type = 'professional-indemnity')),
  ('Graphic Designer', (SELECT id FROM public.industries WHERE name = 'Marketing & Multimedia' AND insurance_type = 'professional-indemnity')),
  ('Web Developer', (SELECT id FROM public.industries WHERE name = 'Marketing & Multimedia' AND insurance_type = 'professional-indemnity')),
  ('Content Creator', (SELECT id FROM public.industries WHERE name = 'Marketing & Multimedia' AND insurance_type = 'professional-indemnity')),
  ('Social Media Manager', (SELECT id FROM public.industries WHERE name = 'Marketing & Multimedia' AND insurance_type = 'professional-indemnity')),
  
  -- Miscellaneous
  ('Business Owner', (SELECT id FROM public.industries WHERE name = 'Miscellaneous' AND insurance_type = 'professional-indemnity')),
  ('Freelancer', (SELECT id FROM public.industries WHERE name = 'Miscellaneous' AND insurance_type = 'professional-indemnity')),
  ('Consultant', (SELECT id FROM public.industries WHERE name = 'Miscellaneous' AND insurance_type = 'professional-indemnity')),
  ('Other', (SELECT id FROM public.industries WHERE name = 'Miscellaneous' AND insurance_type = 'professional-indemnity'));

-- Update contacts table to replace position with industry_id and add occupation_id
ALTER TABLE public.contacts 
DROP COLUMN position,
ADD COLUMN industry_id UUID REFERENCES public.industries(id),
ADD COLUMN occupation_id UUID REFERENCES public.occupations(id);
