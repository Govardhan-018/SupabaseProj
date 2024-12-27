import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://wjqexiehpxciavbargmt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqcWV4aWVocHhjaWF2YmFyZ210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNDQ2NjQsImV4cCI6MjA1MDcyMDY2NH0.7U8sdeSfKfzVIvp4u-uDQNvazWvCfTPuTOe0IEeZwwc")