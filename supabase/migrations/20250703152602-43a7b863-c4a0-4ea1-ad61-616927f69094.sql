
-- Remove the unique constraint on email to allow duplicate emails
ALTER TABLE public.contacts DROP CONSTRAINT IF EXISTS contacts_email_unique;

-- Also remove the unique index if it exists
DROP INDEX IF EXISTS contacts_email_unique;
