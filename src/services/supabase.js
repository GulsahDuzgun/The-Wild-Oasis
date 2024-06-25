import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gabbeqyyjjkdxvqxuqsn.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYmJlcXl5amprZHh2cXh1cXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwMDQ1NjYsImV4cCI6MjAzMzU4MDU2Nn0.YLZwRKP0FkMpUWues7cz9IlGRPRfr1ypjPaQtqirRyY";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
