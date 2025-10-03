import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic"; // don't cache this route

// TEMP: GET /api/enquiry?diagnostic=1 => check env visibility
export async function GET(req: Request) {
  const url = new URL(req.url);
  const diag = url.searchParams.get("diagnostic");

  if (diag) {
    return NextResponse.json({
      ok: true,
      usingAdmin: Boolean(process.env.SUPABASE_SERVICE_ROLE),
      hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      envPreview: {
        SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE ? "present" : "missing",
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "present" : "missing",
      },
    });
  }

  return NextResponse.json({ ok: true, message: "enquiry endpoint ready" });
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "name and email are required" },
        { status: 400 }
      );
    }

    // IMPORTANT: admin client bypasses RLS
    const { data, error } = await supabaseAdmin
      .from("enquiries")
      .insert([{ name, email, message }])
      .select();

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          usingAdmin: Boolean(process.env.SUPABASE_SERVICE_ROLE),
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        usingAdmin: Boolean(process.env.SUPABASE_SERVICE_ROLE),
        error: err.message,
      },
      { status: 500 }
    );
  }
}

