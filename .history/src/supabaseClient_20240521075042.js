// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibWpoaGV1cHhza3pqdXZncnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNzQwMTUsImV4cCI6MjAzMTg1MDAxNX0.zqV0mBFN31lBM8dks3chdmZnweLuYFhYRxQ4BCrGV0o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
