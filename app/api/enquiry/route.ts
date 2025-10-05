// app/api/enquiry/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Ensure Next never tries to statically analyze/prerender this route
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // ----- Supabase insert (only if envs exist) -----
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE;
    if (supabaseUrl && serviceRole) {
      const admin = createClient(supabaseUrl, serviceRole);
      await admin.from('enquiries').insert({ name, email, message });
    }

    // ----- Resend email (only if env exists) -----
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: 'enquiries@your-domain.dev',
        to: ['you@your-domain.dev'],
        subject: `New enquiry from ${name || 'Unknown'}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('enquiry POST error:', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
