# 🚀 Lovable + Supabase MVP Starter

Production-style **Next.js (Lovable) + Supabase** starter to ship SaaS MVPs fast.  
Includes authentication, database schema, RLS policies, edge functions, and optional Stripe + Resend integrations.

---

## ✨ Features
- 🔑 **Supabase Auth** (email OTP + OAuth)  
- 🗄️ **Postgres schema + RLS policies**  
- ⚡ **Edge Functions (TypeScript)** + webhooks  
- 💳 **Stripe payments scaffold** (replace with your own keys if needed)  
- 📧 **Resend transactional emails**  
- 🎨 **Clean UI** with Tailwind + shadcn/ui  

---

## 📂 Structure
- `/app` → Next.js routes  
- `/lib` → Supabase client utilities  
- `/sql` → Database schema + seed data  
- `.env.example` → environment variables  

---

## 🚀 Quickstart
```bash
pnpm i
cp .env.example .env.local
pnpm dev

