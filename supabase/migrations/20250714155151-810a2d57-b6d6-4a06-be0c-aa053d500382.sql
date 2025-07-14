-- Add Divers industry for divers-surething insurance type
INSERT INTO public.industries (name, insurance_type)
VALUES ('Divers', 'divers-surething');

-- Add Divers occupation linked to the Divers industry
INSERT INTO public.occupations (name, industry_id)
SELECT 'Divers', id FROM public.industries WHERE name = 'Divers' AND insurance_type = 'divers-surething';