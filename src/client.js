import { createClient } from '@supabase/supabase-js';

const URL = 'https://kcfraoblbzbrllgtzfdm.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjZnJhb2JsYnpicmxsZ3R6ZmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0MzgxMDksImV4cCI6MjAzOTAxNDEwOX0.sHW5KZZO4jsZoCUWQZPK1qyNaXA0Zq5nJrViAOEjvqY';

export const supabase = createClient(URL, API_KEY);
