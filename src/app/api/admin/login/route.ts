// src/app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}));
  const ok = password && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 12, // 12h
  });
  return res;
}
