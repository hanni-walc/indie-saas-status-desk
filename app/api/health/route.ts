export async function GET() {
  return Response.json({ ok: true, service: "health", timestamp: new Date().toISOString() });
}
