// src/app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { signAdminSession } from '@/lib/adminSession';

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
  
if (!process.env.ADMIN_PASSWORD || !password || password.trim() !== process.env.ADMIN_PASSWORD.trim()) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}


  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', await signAdminSession(process.env.ADMIN_PASSWORD), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return res;
}
