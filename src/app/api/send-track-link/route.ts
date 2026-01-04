// src/app/api/send-track-link/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Ogiltig e-postadress.' }, { status: 400 });
    }

    const sb = supabaseAdmin();

    // ✅ Hämta senaste claim för e-post direkt från Supabase
    const { data: latest, error } = await sb
      .from('claims')
      .select('received_at, viewer_token, updated_at')
      .eq('email', email.toLowerCase())
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    // Om inget hittas: neutral 200 (säkerhet)
    if (!latest || error) {
      console.log('Inga claims hittades för', email, 'error:', error?.message);
      return NextResponse.json({
        ok: true,
        message:
          'Om vi hittar ett ärende på den här e-postadressen skickar vi en länk inom någon minut.',
      });
    }

    const claimId = latest.received_at as string;          // ✅ TRACKING-ID (uuid)
    const viewerToken = (latest.viewer_token as string) || null;

    const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get('origin') ||
      'http://localhost:3000';

    // Just nu hardcode /en (sen gör vi locale dynamiskt när vi sparar locale per claim)
    const base = origin.replace(/\/$/, '');
    const trackUrl = viewerToken
      ? `${base}/en/track/${claimId}?t=${encodeURIComponent(viewerToken)}`
      : `${base}/en/track/${claimId}`;

    console.log('Skickar track-länk till', email, '=>', trackUrl);

    await resend.emails.send({
      from: 'FlightClaimly <onboarding@resend.dev>',
      to: email,
      subject: 'Följ ditt ärende hos FlightClaimly',
      html: `
        <p>Hej,</p>
        <p>Här är din direkta länk för att följa ditt ärende hos FlightClaimly:</p>
        <p><a href="${trackUrl}">${trackUrl}</a></p>
        <p>Om du inte har startat något ärende hos oss kan du ignorera detta meddelande.</p>
        <p>Vänliga hälsningar,<br/>FlightClaimly</p>
      `,
    });

    return NextResponse.json({
      ok: true,
      message:
        'Om vi hittar ett ärende på den här e-postadressen skickar vi en länk inom någon minut.',
    });
  } catch (err) {
    console.error('Fel i send-track-link:', err);
    return NextResponse.json(
      { error: 'Något gick fel när vi försökte skicka länken.' },
      { status: 500 }
    );
  }
}
