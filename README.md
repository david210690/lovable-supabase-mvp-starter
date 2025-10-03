# Lovable + Supabase MVP Starter

Production-style starter to ship SaaS MVPs fast.

## Features
- Supabase Auth (email OTP + OAuth)
- Postgres schema + RLS policies
- Edge Functions (TypeScript) + webhooks
- Stripe payments (placeholder scaffold included) ✅
- Resend transactional emails
- Clean UI with Tailwind + shadcn/ui

## Notes
⚠️ Stripe integration is included only as a **scaffold**.  
You don’t need real Stripe keys to run the starter.  
If you want to enable payments, replace `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in `.env.local` with your actual Stripe keys.


## Quickstart
```bash
pnpm i
cp .env.example .env.local
pnpm dev

