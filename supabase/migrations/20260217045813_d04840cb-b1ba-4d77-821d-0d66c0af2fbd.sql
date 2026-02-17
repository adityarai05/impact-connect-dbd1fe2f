
-- Create gig_enrollments table
CREATE TABLE public.gig_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  gig_id INTEGER NOT NULL,
  gig_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  skills TEXT,
  availability TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gig_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own gig enrollments"
ON public.gig_enrollments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own gig enrollments"
ON public.gig_enrollments FOR SELECT
USING (auth.uid() = user_id);

-- Create event_enrollments table
CREATE TABLE public.event_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_id INTEGER NOT NULL,
  event_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.event_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own event enrollments"
ON public.event_enrollments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own event enrollments"
ON public.event_enrollments FOR SELECT
USING (auth.uid() = user_id);
