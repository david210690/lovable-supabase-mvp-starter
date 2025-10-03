import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  // Optional: simple call to prove env is wired (no DB schema required)
  // just fetch the anon key length as a harmless check:
  const connected = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <main style={{ padding: 24 }}>
      <h1>Lovable + Supabase MVP Starter ✅</h1>
      <p>Deployed on Vercel. Env configured: {connected ? "Yes" : "No"}</p>

      <div style={{ marginTop: 16, padding: 12, background: "#f6f6f6", borderRadius: 8 }}>
        <strong>Supabase URL</strong>
        <div style={{ fontFamily: "monospace" }}>
          {process.env.NEXT_PUBLIC_SUPABASE_URL}
        </div>
      </div>

      <p style={{ marginTop: 16 }}>
        Try the <code>/api/health</code> endpoint:
        {" "}
        <a href="/api/health" style={{ color: "#0070f3" }}>/api/health</a>
      </p>
    </main>
  );
}

