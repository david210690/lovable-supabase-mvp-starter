import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const { data, error } = await supabaseAdmin
      .from("enquiries")
      .insert([{ name, email, message }]);

    if (error) throw error;

    return Response.json({ ok: true, data });
  } catch (err: any) {
    return Response.json({ ok: false, error: err.message }, { status: 400 });
  }
}

