-- Add industries for public liability insurance type
INSERT INTO public.industries (name, insurance_type) VALUES
('Accommodation Businesses', 'public-liability'),
('Service Based Businesses', 'public-liability'),
('Construction and Trade Services', 'public-liability'),
('Food and Beverage Services', 'public-liability'),
('Manufacturing', 'public-liability'),
('Motor Repairs', 'public-liability'),
('Professional Services', 'public-liability'),
('Wholesale and Retail', 'public-liability'),
('Education', 'public-liability');

-- Add occupations for Accommodation Businesses
INSERT INTO public.occupations (name, industry_id) 
SELECT 'BnBs', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'AirBnbs', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Guest houses', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Caravan parks & Camping', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Hotels', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Motels', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Lodges', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Hostels', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Boarding houses', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Long-Term Student Accommodation Residencies', id FROM public.industries WHERE name = 'Accommodation Businesses' AND insurance_type = 'public-liability';

-- Add occupations for Service Based Businesses
INSERT INTO public.occupations (name, industry_id) 
SELECT 'Beauty salons (make-up, nails, hair removal, etc.)', id FROM public.industries WHERE name = 'Service Based Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Buildings, Factories or Office cleaning', id FROM public.industries WHERE name = 'Service Based Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Garden services (no tree felling)', id FROM public.industries WHERE name = 'Service Based Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'General office administration', id FROM public.industries WHERE name = 'Service Based Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Hairdressing', id FROM public.industries WHERE name = 'Service Based Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Laundromats, Laundries & Dry cleaners', id FROM public.industries WHERE name = 'Service Based Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Photography and Editing', id FROM public.industries WHERE name = 'Service Based Businesses' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Travel agencies or Tour guides', id FROM public.industries WHERE name = 'Service Based Businesses' AND insurance_type = 'public-liability';

-- Add occupations for Construction and Trade Services
INSERT INTO public.occupations (name, industry_id) 
SELECT 'Builders', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Electrical installation of appliances & Household equipment', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Electricians', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Gas installations – geysers, fireplaces, piping, etc.', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Handymen', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Installation of fire alarms', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Installation of glass mirrors, etc.', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Installer of Fencing', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Locksmiths', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Painters', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Plumbers', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Sale, installations & repair of solar power systems (incl. geysers)', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Satellite dish installations', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Security system installation or repairs', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Shop fitting', id FROM public.industries WHERE name = 'Construction and Trade Services' AND insurance_type = 'public-liability';

-- Add occupations for Food and Beverage Services
INSERT INTO public.occupations (name, industry_id) 
SELECT 'Bakery or Deli', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Bars or clubs', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Canteen/cafeterias', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Catering', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Coffee shops', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Event catering', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Food preparation in market stalls', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Mobile food carts', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Restaurants', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Take-away foods', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Tea rooms or Tea gardens', id FROM public.industries WHERE name = 'Food and Beverage Services' AND insurance_type = 'public-liability';

-- Add occupations for Manufacturing
INSERT INTO public.occupations (name, industry_id) 
SELECT 'Alcohol manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Baked goods manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Beverage manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Canned fruit & veg manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Car parts manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Carpenter & Woodworking', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Clothing manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Dairy products manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Glass, Mirrors & Automotive glass manufacture and replacement', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Health & Infant food manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Packaging services', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Pharmaceutical products manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Processed food manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Sales, Repairs & Maintenance of mining machinery', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Snack manufacturing', id FROM public.industries WHERE name = 'Manufacturing' AND insurance_type = 'public-liability';

-- Add occupations for Motor Repairs
INSERT INTO public.occupations (name, industry_id) 
SELECT 'Car cleaning', id FROM public.industries WHERE name = 'Motor Repairs' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Motor (auto) electricians', id FROM public.industries WHERE name = 'Motor Repairs' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Motor vehicle repairs or Mechanics', id FROM public.industries WHERE name = 'Motor Repairs' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Motor vehicle spares dealer', id FROM public.industries WHERE name = 'Motor Repairs' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Servicing of motor vehicles', id FROM public.industries WHERE name = 'Motor Repairs' AND insurance_type = 'public-liability';

-- Add occupations for Professional Services
INSERT INTO public.occupations (name, industry_id) 
SELECT 'Accounting, Auditing or Bookkeeping', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Architects', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Attorneys, Advocates or Lawyers', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Computer programming services', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Consultants', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Conveyancers or Liquidators', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Draughtsmans', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Engineers', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Financial advisors', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Insurance agents: Brokers, Assessors, Inspectors, Surveyors', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Quantity surveyors', id FROM public.industries WHERE name = 'Professional Services' AND insurance_type = 'public-liability';

-- Add occupations for Wholesale and Retail
INSERT INTO public.occupations (name, industry_id) 
SELECT 'Art galleries or Studios', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Bakeries or delis', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Biltong shops', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Bookshops, Book sellers or Publishers', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Bottle stores', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Butcheries', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Clothing or footwear retail', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Convenience stores', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'General dealers/stores', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'General imports & exports', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Grocery stores', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Hardware stores', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Jewellery retail (excludes specialist high-end)', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Medical, dental & hospital equipment suppliers', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Motor vehicles dealer', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Petrol stations', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Pharmacies', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Sports clothes stores', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Sports equipment stores', id FROM public.industries WHERE name = 'Wholesale and Retail' AND insurance_type = 'public-liability';

-- Add occupations for Education
INSERT INTO public.occupations (name, industry_id) 
SELECT 'Adult training centres', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Art instructions', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Creche or day care centres', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Driving schools', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Flying instructions', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Horse riding & training', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Music instructions', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Primary or High Schools', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Sports coaches or Swimming instructors', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability'
UNION ALL
SELECT 'Technical & Vocational colleges', id FROM public.industries WHERE name = 'Education' AND insurance_type = 'public-liability';