'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState<any>(null)
  const [now, setNow] = useState<string>('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null))
  }, [])

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({ email })
    alert(error ? `Error: ${error.message}` : 'Magic link sent! Check your email.')
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  async function ping() {
    const res = await fetch('/api/health', { cache: 'no-store' })
    const j = await res.json()
    setNow(j.now)
  }

  return (
    <main style={{ maxWidth: 520, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h1>Lovable + Supabase MVP Starter</h1>

      {user ? (
        <>
          <p>Signed in as <b>{user.email}</b></p>
          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <>
          <label>Email (for magic link)</label><br/>
          <input
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 10, margin: '8px 0' }}
          />
          <button onClick={signIn}>Send magic link</button>
        </>
      )}

      <hr style={{ margin: '24px 0' }} />
      <button onClick={ping}>Ping /api/health</button>
      {now && <p>Server time: {now}</p>}
    </main>
  )
}
