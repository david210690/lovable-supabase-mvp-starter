import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// POST /api/enquiry
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "name and email are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("enquiries")
      .insert([{ name, email, message }])
      .select();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
