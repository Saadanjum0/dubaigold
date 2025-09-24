import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dexczdjoaszbhjawbbzn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRleGN6ZGpvYXN6YmhqYXdiYnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzEwODIsImV4cCI6MjA3NDMwNzA4Mn0.90-KHHt3YbJCjm8Ocm4n3Tw04BaBgOTbinUVMepsGHE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
