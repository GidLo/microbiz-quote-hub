-- Add industries for medical malpractice
INSERT INTO public.industries (name, insurance_type) VALUES
('Allied Health', 'medical-malpractice'),
('Dentist', 'medical-malpractice'),
('General Practitioners and Family Medicine', 'medical-malpractice'),
('Internal Medicine and Specialties', 'medical-malpractice'),
('Pharmacy Industry', 'medical-malpractice'),
('Specialized Medical Technology and Support', 'medical-malpractice'),
('Specialized Medical Fields', 'medical-malpractice');

-- Add occupations for Allied Health
INSERT INTO public.occupations (name, industry_id) VALUES
('Aromatherapist', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Biokineticists', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Chiropodists', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Chiropractor', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Dieticians', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Fitness Instructor', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Homeopath', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Occupational Therapist', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Occupational Nurse', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Physiotherapists', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Psychologist', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Registered Counsellor', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Skin Care Clinic', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice')),
('Prosthetist/Orthotist or Podiatrist', (SELECT id FROM industries WHERE name = 'Allied Health' AND insurance_type = 'medical-malpractice'));

-- Add occupations for Dentist
INSERT INTO public.occupations (name, industry_id) VALUES
('Dentist excluding Cosmetics and Aesthetics', (SELECT id FROM industries WHERE name = 'Dentist' AND insurance_type = 'medical-malpractice')),
('Orthodontics excluding Cosmetics and Aesthetics', (SELECT id FROM industries WHERE name = 'Dentist' AND insurance_type = 'medical-malpractice')),
('Oral Medicine / Periodontics', (SELECT id FROM industries WHERE name = 'Dentist' AND insurance_type = 'medical-malpractice'));

-- Add occupations for General Practitioners and Family Medicine
INSERT INTO public.occupations (name, industry_id) VALUES
('Clinical Associate', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice')),
('Clinical Neurophysiology', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice')),
('Clinical Technologist', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice')),
('Family Medicine', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice')),
('Family Physician', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice')),
('GP AE or Procedural', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice')),
('GP Anaesthetics', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice')),
('GP Minor Procedures', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice')),
('GP Non-Procedural', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice')),
('GP Procedural', (SELECT id FROM industries WHERE name = 'General Practitioners and Family Medicine' AND insurance_type = 'medical-malpractice'));

-- Add occupations for Internal Medicine and Specialties
INSERT INTO public.occupations (name, industry_id) VALUES
('Endocrinologist', (SELECT id FROM industries WHERE name = 'Internal Medicine and Specialties' AND insurance_type = 'medical-malpractice')),
('Haematology', (SELECT id FROM industries WHERE name = 'Internal Medicine and Specialties' AND insurance_type = 'medical-malpractice')),
('Internal Medicine', (SELECT id FROM industries WHERE name = 'Internal Medicine and Specialties' AND insurance_type = 'medical-malpractice')),
('Nephrology', (SELECT id FROM industries WHERE name = 'Internal Medicine and Specialties' AND insurance_type = 'medical-malpractice')),
('Nuclear Medicine', (SELECT id FROM industries WHERE name = 'Internal Medicine and Specialties' AND insurance_type = 'medical-malpractice')),
('Oncologist', (SELECT id FROM industries WHERE name = 'Internal Medicine and Specialties' AND insurance_type = 'medical-malpractice')),
('Pulmonologist', (SELECT id FROM industries WHERE name = 'Internal Medicine and Specialties' AND insurance_type = 'medical-malpractice')),
('Psychiatrist', (SELECT id FROM industries WHERE name = 'Internal Medicine and Specialties' AND insurance_type = 'medical-malpractice')),
('Rheumatology', (SELECT id FROM industries WHERE name = 'Internal Medicine and Specialties' AND insurance_type = 'medical-malpractice'));

-- Add occupations for Pharmacy Industry
INSERT INTO public.occupations (name, industry_id) VALUES
('Clinical Pharmacology', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Locum Pharmacist', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Medical Scheme Consultant', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Pharmacist Community Service', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Pharmacist Quality Assurance', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Pharmacist Wholesaler Distributor', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Pharmacist Academic', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Pharmacist Assistant', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Pharmacists Intern', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Pharmacy Student', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Pharmacy Technician', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice')),
('Retail/Hospital/Industrial Pharmacist', (SELECT id FROM industries WHERE name = 'Pharmacy Industry' AND insurance_type = 'medical-malpractice'));

-- Add occupations for Specialized Medical Technology and Support
INSERT INTO public.occupations (name, industry_id) VALUES
('Ambulance Emergency Assistant', (SELECT id FROM industries WHERE name = 'Specialized Medical Technology and Support' AND insurance_type = 'medical-malpractice')),
('Paramedic', (SELECT id FROM industries WHERE name = 'Specialized Medical Technology and Support' AND insurance_type = 'medical-malpractice')),
('Pathology', (SELECT id FROM industries WHERE name = 'Specialized Medical Technology and Support' AND insurance_type = 'medical-malpractice')),
('Radiographer', (SELECT id FROM industries WHERE name = 'Specialized Medical Technology and Support' AND insurance_type = 'medical-malpractice')),
('Paramedical Staff', (SELECT id FROM industries WHERE name = 'Specialized Medical Technology and Support' AND insurance_type = 'medical-malpractice'));

-- Add occupations for Specialized Medical Fields
INSERT INTO public.occupations (name, industry_id) VALUES
('Audiologist/Speech Therapist', (SELECT id FROM industries WHERE name = 'Specialized Medical Fields' AND insurance_type = 'medical-malpractice')),
('Doula', (SELECT id FROM industries WHERE name = 'Specialized Medical Fields' AND insurance_type = 'medical-malpractice')),
('Geriatrics Specialist', (SELECT id FROM industries WHERE name = 'Specialized Medical Fields' AND insurance_type = 'medical-malpractice'));

-- Note: Clinical Neurophysiology and Clinical Pharmacology appear in multiple categories, 
-- but we've already added them to their primary categories above