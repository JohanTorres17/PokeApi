import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pplzbgethfweonzxpbbh.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbHpiZ2V0aGZ3ZW9uenhwYmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzYzOTcsImV4cCI6MjA2MjkxMjM5N30.31foSVvr1jGj-yiRDD-NTaMaV9L4VjNy7orxeMgFN2Y';
export const supabase = createClient(supabaseUrl, supabaseKey);