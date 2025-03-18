import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svjpdlkwyboljjtvqivc.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2anBkbGt3eWJvbGpqdHZxaXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMDg1NTksImV4cCI6MjA1Nzg4NDU1OX0.P9tShtVo9hnuKVE2IycZ5QkVWiZuPsBR5El1YXnq-D4-key';

export const supabase = createClient(supabaseUrl, supabaseKey);