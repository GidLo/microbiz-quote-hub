-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Allow public to insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow system to view contacts" ON public.contacts;

-- Create new policies that properly allow anonymous access
CREATE POLICY "Enable insert for anonymous users" 
ON public.contacts 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Enable select for anonymous users" 
ON public.contacts 
FOR SELECT 
TO anon, authenticated
USING (true);

-- Also update business_details policies to ensure they work with anonymous access
DROP POLICY IF EXISTS "Allow public to insert business details" ON public.business_details;
DROP POLICY IF EXISTS "Allow public to view business details" ON public.business_details;
DROP POLICY IF EXISTS "Allow public to update business details" ON public.business_details;

CREATE POLICY "Enable insert for anonymous users" 
ON public.business_details 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Enable select for anonymous users" 
ON public.business_details 
FOR SELECT 
TO anon, authenticated
USING (true);

CREATE POLICY "Enable update for anonymous users" 
ON public.business_details 
FOR UPDATE 
TO anon, authenticated
USING (true);