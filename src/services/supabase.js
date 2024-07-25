import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://sxjrblxebuuhivtoconi.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4anJibHhlYnV1aGl2dG9jb25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgwNzYsImV4cCI6MjAzMjAzNDA3Nn0.Aa1gbnRmnTWUsKUuJaC9_BSUUaK9pnEHiW8t-tsd7Tw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
