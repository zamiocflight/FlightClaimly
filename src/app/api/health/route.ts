// src/app/api/health/route.ts
export function GET() {
  return new Response(JSON.stringify({ ok: true, t: new Date().toISOString() }), {
    headers: { 'content-type': 'application/json' },
  });
}
