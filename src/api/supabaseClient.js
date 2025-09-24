import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dexczdjoaszbhjawbbzn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRleGN6ZGpvYXN6YmhqYXdiYnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzEwODIsImV4cCI6MjA3NDMwNzA4Mn0.90-KHHt3YbJCjm8Ocm4n3Tw04BaBgOTbinUVMepsGHE';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey?.substring(0, 20) + '...');

// Test basic connectivity
fetch(supabaseUrl + '/rest/v1/', {
  headers: { 'apikey': supabaseAnonKey }
}).then(response => {
  console.log('Supabase connection test:', response.status, response.statusText);
}).catch(error => {
  console.error('Supabase connection failed:', error);
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
