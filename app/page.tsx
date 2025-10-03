"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string>("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name")||""),
      email: String(form.get("email")||""),
      message: String(form.get("message")||""),
    };
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setStatus(json.ok ? "Thanks — sent!" : `Error: ${json.error}`);
  }

  return (
    <main className="p-6">
      <h1>Lovable + Supabase MVP Starter ✅</h1>
      <form onSubmit={submit} style={{display:"grid", gap:8, maxWidth:360}}>
        <input name="name" placeholder="Your name" required/>
        <input type="email" name="email" placeholder="Your email" required/>
        <textarea name="message" placeholder="Message" required/>
        <button type="submit">Send enquiry</button>
      </form>
      <p>{status}</p>
      <p style={{marginTop:16}}>
        Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "set" : "missing"} – try <a href="/api/health">/api/health</a>
      </p>
    </main>
  );
}
