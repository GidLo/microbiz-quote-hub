
-- Remove existing contractors all risk rating factors
DELETE FROM public.rating_factors WHERE insurance_type = 'contractors-all-risk';

-- Insert new rating factors for contractors all risk based on contract value ranges
INSERT INTO public.rating_factors (insurance_type, factor_name, factor_type, factor_value, condition_field, condition_operator, condition_value, description, is_active) VALUES

-- Contract value based rating using percentage of contract value
('contractors-all-risk', 'Contract Value R0-R5M', 'percentage', 0.115, 'equipment-value', 'range', '[0, 5000000]'::jsonb, 'Rate for contracts R0 - R5,000,000 at 0.115%', true),
('contractors-all-risk', 'Contract Value R5M-R10M', 'percentage', 0.110, 'equipment-value', 'range', '[5000001, 10000000]'::jsonb, 'Rate for contracts R5,000,001 - R10,000,000 at 0.110%', true),
('contractors-all-risk', 'Contract Value R10M-R15M', 'percentage', 0.100, 'equipment-value', 'range', '[10000001, 15000000]'::jsonb, 'Rate for contracts R10,000,001 - R15,000,000 at 0.100%', true),
('contractors-all-risk', 'Contract Value R15M-R20M', 'percentage', 0.095, 'equipment-value', 'range', '[15000001, 20000000]'::jsonb, 'Rate for contracts R15,000,001 - R20,000,000 at 0.095%', true),

-- Public liability add-on
('contractors-all-risk', 'Public Liability Add-on', 'addition', 150.00, 'public-liability-addon', 'equals', 'true'::jsonb, 'Additional premium for public liability coverage', true),

-- SASRIA coverage - percentage of contract value
('contractors-all-risk', 'SASRIA Coverage', 'percentage', 0.0011330, 'sasria-cover', 'equals', 'true'::jsonb, 'SASRIA coverage at 0.0011330% of contract value (up to R20M)', true);
