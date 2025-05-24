import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dcehtalnrdjoupiawdzx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZWh0YWxucmRqb3VwaWF3ZHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NzM5NjQsImV4cCI6MjA2MjA0OTk2NH0.r40Fk5WccvBSgzBTbn-pOBBoUmxhlrDN13ThwJT0wIk";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
