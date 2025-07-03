
-- Insert industries for contractors-all-risk and event-liability
INSERT INTO public.industries (name, insurance_type) VALUES
  ('Construction and Trade', 'contractors-all-risk'),
  ('Event Organiser', 'event-liability');

-- Insert occupations for the new industries
INSERT INTO public.occupations (name, industry_id) VALUES
  ('Contractor', (SELECT id FROM public.industries WHERE name = 'Construction and Trade' AND insurance_type = 'contractors-all-risk')),
  ('Event organiser', (SELECT id FROM public.industries WHERE name = 'Event Organiser' AND insurance_type = 'event-liability'));
