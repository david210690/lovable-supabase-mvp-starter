// app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<string>('');

  // simple env check to show Supabase is wired
  const connected = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      message: String(form.get('message') || ''),
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setStatus(json.ok ? 'Thanks — sent!' : `Error: ${json.error ?? 'Unknown error'}`);
    } catch (err: any) {
      setStatus(`Error: ${err?.message ?? String(err)}`);
    }
  }

  return (
    <main className="p-6">
      <h1>Lovable + Supabase MVP Starter ✅</h1>

      <p>Deployed on Vercel. Env configured: {connected ? 'Yes' : 'No'}</p>

      <div className="mt-4 p-3 rounded" style={{ background: '#f6f6f6' }}>
        <strong>Supabase URL</strong>
        <div style={{ fontFamily: 'monospace' }}>
          {process.env.NEXT_PUBLIC_SUPABASE_URL}
        </div>
      </div>

      <p className="mt-4">
        Try the <code>/api/health</code> endpoint:{' '}
        <a href="/api/health" style={{ color: '#0070f3' }}>/api/health</a>
      </p>

      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        <input name="name" placeholder="Your name" required />
        <input type="email" name="email" placeholder="Your email" required />
        <textarea name="message" placeholder="Message" required />
        <button type="submit">Send enquiry</button>
      </form>

      <p>{status}</p>

      <p className="mt-4">
        Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'missing'} — try{' '}
        <a href="/api/health">/api/health</a>
      </p>
    </main>
  );
}
