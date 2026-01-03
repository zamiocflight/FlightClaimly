// src/app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let password: string | null = null;

  const contentType = req.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}));
    password = body.password;
  } else {
    const form = await req.formData();
    password = form.get('password') as string | null;
  }
  
if (!password || password.trim() !== (process.env.ADMIN_PASSWORD ?? "").trim()) {
  return NextResponse.json(
    {
      error: "Unauthorized",
      debug: {
        hasPassword: !!password,
        passwordLen: password?.length ?? 0,
        hasEnv: !!process.env.ADMIN_PASSWORD,
        envLen: process.env.ADMIN_PASSWORD?.length ?? 0,
      },
    },
    { status: 401 }
  );
}


  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // 👈 viktigt lokalt, se not nedan
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return res;
}
