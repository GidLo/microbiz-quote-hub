
-- Update the public liability rating factor for contractors all risk
UPDATE public.rating_factors 
SET 
  factor_type = 'percentage',
  factor_value = 0.015,
  condition_field = 'public-liability-amount',
  condition_operator = 'greater_than',
  condition_value = '0'::jsonb,
  description = 'Public liability premium at 0.015% of selected coverage amount'
WHERE 
  insurance_type = 'contractors-all-risk' 
  AND factor_name = 'Public Liability Add-on';
