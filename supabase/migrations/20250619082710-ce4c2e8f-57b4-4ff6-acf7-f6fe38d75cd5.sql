
-- Update the demo user to have confirmed email (fixed version)
UPDATE auth.users 
SET email_confirmed_at = now()
WHERE email = 'demo@microshield.com';
