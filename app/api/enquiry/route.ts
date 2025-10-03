// app/api/enquiry/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";

// --- CORS (so you can post from anywhere if you want) ------------------------
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// --- Optional email notification --------------------------------------------
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Simple email check (keep lightweight/no extra deps)
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type EnquiryPayload = {
  name: string;
  email: string;
  message: string;
};

// --- POST /api/enquiry -------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<EnquiryPayload>;
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields: name, email, message are required" },
        { status: 400, headers: corsHeaders }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400, headers: corsHeaders }
      );
    }
    if (message.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Message is too long" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Insert into DB using the server-only (service role) client
    const { data, error } = await supabaseAdmin
      .from("enquiries")
      .insert([{ name, email, message }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400, headers: corsHeaders }
      );
    }

    // Optional: notify you via email (safe to ignore errors here)
    if (resend) {
      try {
        await resend.emails.send({
          // Make sure this sender is verified in Resend; or use their test sender while developing
          from: "Kumar <notifications@your-domain.com>",
          to: ["k.davidimba@gmail.com"],
          subject: "New enquiry received",
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        });

        // Optional auto-reply to the sender:
        // await resend.emails.send({
        //   from: "Kumar <hello@your-domain.com>",
        //   to: [email],
        //   subject: "Thanks — we got your enquiry",
        //   text: `Hi ${name},\n\nThanks for reaching out. We'll get back to you shortly.\n\n— Kumar`,
        // });
      } catch (e) {
        console.error("Resend email error:", e);
      }
    }

    return NextResponse.json({ ok: true, data }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
