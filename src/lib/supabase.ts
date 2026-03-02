import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://aiprelewesqvajtynwmn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcHJlbGV3ZXNxdmFqdHlud21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MzA4MDUsImV4cCI6MjA4ODAwNjgwNX0._d-3B8or9JpUSvPXkAbL-0gRGSugAfx2uztsQqCJ57E";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
