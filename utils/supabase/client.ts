const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

import { createBrowserClient } from "@supabase/ssr";
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
