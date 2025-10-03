import { createClient } from "@supabase/supabase-js";

// Always keep the service role key server-only (never expose in client/browser!)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zyxdxdtqrykjqydqiepl.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE!,   // Add this in Vercel → Project Settings → Environment Variables
  {
    auth: { persistSession: false }
  }
);
