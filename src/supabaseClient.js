import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://isbzyaaylmmfxujggcpa.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzYnp5YWF5bG1tZnh1amdnY3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzkwMTksImV4cCI6MjA4ODUxNTAxOX0.0JRtKKMYONYZq-Msd62wtLWkco73NmB3uIIg4G8F1CQ";

export const supabase = createClient(supabaseUrl, supabaseKey);