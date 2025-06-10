
-- Create insurers table to store insurer information
CREATE TABLE public.insurers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  rating DECIMAL(2,1) CHECK (rating >= 1.0 AND rating <= 5.0),
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create insurance_products table to store product configurations per insurer
CREATE TABLE public.insurance_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  insurer_id UUID REFERENCES public.insurers(id) ON DELETE CASCADE NOT NULL,
  insurance_type TEXT NOT NULL CHECK (insurance_type IN ('professional-indemnity', 'contractors-all-risk', 'public-liability', 'event-liability')),
  product_name TEXT NOT NULL,
  base_premium DECIMAL(10,2) NOT NULL,
  min_coverage DECIMAL(15,2) NOT NULL,
  max_coverage DECIMAL(15,2) NOT NULL,
  default_coverage DECIMAL(15,2) NOT NULL,
  min_deductible DECIMAL(10,2) NOT NULL,
  max_deductible DECIMAL(10,2) NOT NULL,
  default_deductible DECIMAL(10,2) NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_recommended BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(insurer_id, insurance_type)
);

-- Create rating_factors table to store factors that affect pricing
CREATE TABLE public.rating_factors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  insurance_type TEXT NOT NULL CHECK (insurance_type IN ('professional-indemnity', 'contractors-all-risk', 'public-liability', 'event-liability')),
  factor_name TEXT NOT NULL,
  factor_type TEXT NOT NULL CHECK (factor_type IN ('multiplier', 'addition', 'percentage')),
  factor_value DECIMAL(10,4) NOT NULL,
  condition_field TEXT NOT NULL,
  condition_operator TEXT NOT NULL CHECK (condition_operator IN ('equals', 'greater_than', 'less_than', 'contains', 'range')),
  condition_value JSONB NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create quotes table to store generated quotes
CREATE TABLE public.quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id TEXT NOT NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE NOT NULL,
  insurance_type TEXT NOT NULL CHECK (insurance_type IN ('professional-indemnity', 'contractors-all-risk', 'public-liability', 'event-liability')),
  insurer_id UUID REFERENCES public.insurers(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.insurance_products(id) ON DELETE CASCADE NOT NULL,
  monthly_premium DECIMAL(10,2) NOT NULL,
  annual_premium DECIMAL(10,2) NOT NULL,
  coverage_amount DECIMAL(15,2) NOT NULL,
  deductible DECIMAL(10,2) NOT NULL,
  business_details JSONB NOT NULL,
  underwriting_answers JSONB NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  is_selected BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add indexes for better performance
CREATE INDEX idx_insurance_products_insurer_type ON public.insurance_products(insurer_id, insurance_type);
CREATE INDEX idx_rating_factors_type ON public.rating_factors(insurance_type);
CREATE INDEX idx_quotes_request_id ON public.quotes(request_id);
CREATE INDEX idx_quotes_contact_insurance ON public.quotes(contact_id, insurance_type);

-- Enable Row Level Security on all tables
ALTER TABLE public.insurers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rating_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Create policies for insurers (public read access)
CREATE POLICY "Allow public to view active insurers"
  ON public.insurers
  FOR SELECT
  TO public
  USING (is_active = true);

-- Create policies for insurance_products (public read access for active products)
CREATE POLICY "Allow public to view active insurance products"
  ON public.insurance_products
  FOR SELECT
  TO public
  USING (is_active = true);

-- Create policies for rating_factors (public read access for active factors)
CREATE POLICY "Allow public to view active rating factors"
  ON public.rating_factors
  FOR SELECT
  TO public
  USING (is_active = true);

-- Create policies for quotes (allow insertion and viewing own quotes)
CREATE POLICY "Allow public to insert quotes"
  ON public.quotes
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow viewing quotes by request_id"
  ON public.quotes
  FOR SELECT
  TO public
  USING (true);

-- Create update triggers for all tables
CREATE TRIGGER update_insurers_updated_at
  BEFORE UPDATE ON public.insurers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_insurance_products_updated_at
  BEFORE UPDATE ON public.insurance_products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_rating_factors_updated_at
  BEFORE UPDATE ON public.rating_factors
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample insurers
INSERT INTO public.insurers (name, rating, is_active) VALUES
('SafeGuard Insurance', 4.8, true),
('Premier Coverage', 4.5, true),
('Reliable Protect', 4.2, true);

-- Insert sample insurance products for event liability
INSERT INTO public.insurance_products (insurer_id, insurance_type, product_name, base_premium, min_coverage, max_coverage, default_coverage, min_deductible, max_deductible, default_deductible, features, is_recommended)
SELECT 
  i.id,
  'event-liability',
  CASE 
    WHEN i.name = 'SafeGuard Insurance' THEN 'Event Guard Pro'
    WHEN i.name = 'Premier Coverage' THEN 'Premier Event Shield'
    WHEN i.name = 'Reliable Protect' THEN 'Basic Event Cover'
  END,
  CASE 
    WHEN i.name = 'SafeGuard Insurance' THEN 420.00
    WHEN i.name = 'Premier Coverage' THEN 450.00
    WHEN i.name = 'Reliable Protect' THEN 385.00
  END,
  500000.00, -- min_coverage
  5000000.00, -- max_coverage
  CASE 
    WHEN i.name = 'SafeGuard Insurance' THEN 1000000.00
    WHEN i.name = 'Premier Coverage' THEN 1000000.00
    WHEN i.name = 'Reliable Protect' THEN 750000.00
  END, -- default_coverage
  2500.00, -- min_deductible
  10000.00, -- max_deductible
  CASE 
    WHEN i.name = 'SafeGuard Insurance' THEN 5000.00
    WHEN i.name = 'Premier Coverage' THEN 4000.00
    WHEN i.name = 'Reliable Protect' THEN 7500.00
  END, -- default_deductible
  CASE 
    WHEN i.name = 'SafeGuard Insurance' THEN '["No long-term contracts", "Immediate coverage", "Dedicated claims support", "24/7 helpline"]'::jsonb
    WHEN i.name = 'Premier Coverage' THEN '["Flexible payment options", "Digital policy management", "Quick claim processing", "Legal assistance included"]'::jsonb
    WHEN i.name = 'Reliable Protect' THEN '["Budget-friendly option", "Essential coverage", "Online support", "Basic claims service"]'::jsonb
  END,
  CASE WHEN i.name = 'SafeGuard Insurance' THEN true ELSE false END
FROM public.insurers i;

-- Insert sample rating factors for event liability (fixed JSON formatting)
INSERT INTO public.rating_factors (insurance_type, factor_name, factor_type, factor_value, condition_field, condition_operator, condition_value, description, is_active) VALUES
('event-liability', 'High Risk Event Type', 'multiplier', 1.5, 'event-type', 'contains', '["concert", "festival", "sports"]'::jsonb, 'Higher risk event types increase premium', true),
('event-liability', 'Large Attendance', 'multiplier', 1.3, 'event-attendees', 'greater_than', '1000'::jsonb, 'Events with more than 1000 attendees', true),
('event-liability', 'Alcohol Service', 'addition', 50.00, 'alcohol-served', 'equals', '"yes"'::jsonb, 'Additional premium for alcohol service', true),
('event-liability', 'Indoor Venue Discount', 'multiplier', 0.9, 'event-venue', 'equals', '"indoor"'::jsonb, 'Discount for indoor venues', true),
('event-liability', 'Multiple Days', 'multiplier', 1.2, 'event-duration', 'greater_than', '1'::jsonb, 'Multi-day events increase risk', true);
