import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,       // safe to reuse the URL
  process.env.SUPABASE_SERVICE_ROLE!,          // DO NOT expose this key to client
  { auth: { persistSession: false } }
);
