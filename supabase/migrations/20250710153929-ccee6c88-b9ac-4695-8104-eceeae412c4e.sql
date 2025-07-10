-- Create underwriting_answers table to store form responses
CREATE TABLE public.underwriting_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  data JSONB NOT NULL,
  datecreated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE public.underwriting_answers ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (similar to contacts table)
CREATE POLICY "Enable insert for anonymous users" 
ON public.underwriting_answers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Enable select for anonymous users" 
ON public.underwriting_answers 
FOR SELECT 
USING (true);

-- Create index on contact_id for better performance
CREATE INDEX idx_underwriting_answers_contact_id ON public.underwriting_answers(contact_id);

-- Create index on datecreated for chronological queries
CREATE INDEX idx_underwriting_answers_datecreated ON public.underwriting_answers(datecreated DESC);