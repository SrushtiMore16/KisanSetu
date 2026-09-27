// utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // This will print to your terminal or browser console so you can see if they are empty
  if (!supabaseUrl || !supabaseKey) {
    console.error("⚠️ SUPABASE ENV VARIABLES MISSING!");
    console.error("URL:", supabaseUrl ? "Found" : "Missing");
    console.error("KEY:", supabaseKey ? "Found" : "Missing");
    throw new Error("Missing Supabase URL or Key. Check your .env.local file.");
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}