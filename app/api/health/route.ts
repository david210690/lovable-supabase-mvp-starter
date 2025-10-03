export async function GET() {
  return Response.json({
    ok: true,
    serverTime: new Date().toISOString()
  });
}

