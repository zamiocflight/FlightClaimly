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

    // 🔹 Hämta senaste claim inkl locale
    const { data: latest, error } = await sb
      .from('claims')
      .select('received_at, viewer_token, updated_at, locale')
      .eq('email', email.toLowerCase())
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!latest || error) {
      console.log('Inga claims hittades för', email, 'error:', error?.message);
      return NextResponse.json({
        ok: true,
        message:
          'Om vi hittar ett ärende på den här e-postadressen skickar vi en länk inom någon minut.',
      });
    }

    const claimId = latest.received_at as string;
    let viewerToken = (latest.viewer_token as string) || null;
    if (!viewerToken) {
      const generatedToken = crypto.randomUUID() + crypto.randomUUID();
      const { data: tokenRow, error: tokenError } = await sb
        .from('claims')
        .update({ viewer_token: generatedToken, viewer_token_created_at: new Date().toISOString() })
        .eq('received_at', claimId)
        .is('viewer_token', null)
        .select('viewer_token')
        .maybeSingle();
      if (tokenError) throw tokenError;
      // Concurrent recovery requests may have already created the token.
      if (tokenRow?.viewer_token) {
        viewerToken = tokenRow.viewer_token;
      } else {
        const { data: existingTokenRow, error: existingTokenError } = await sb
          .from('claims').select('viewer_token').eq('received_at', claimId).single();
        if (existingTokenError || !existingTokenRow?.viewer_token) throw existingTokenError || new Error('TRACK_TOKEN_MISSING');
        viewerToken = existingTokenRow.viewer_token;
      }
    }

    // 🔹 Locale: från claim → fallback en
    const locale = (latest.locale as string) || 'en';

    const origin = process.env.NEXT_PUBLIC_APP_URL || 'https://www.flightclaimly.com';

    const base = origin.replace(/\/$/, '');
    const trackUrl = viewerToken
      ? `${base}/${locale}/track/${claimId}?t=${encodeURIComponent(viewerToken)}`
      : `${base}/${locale}/track/${claimId}`;

    // Never log claim tokens or customer tracking URLs.

    const { error: sendError } = await resend.emails.send({
      from: 'FlightClaimly <info@flightclaimly.com>',
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

    if (sendError) {
      console.error('Track link email delivery failed:', sendError.message);
      return NextResponse.json({ error: 'EMAIL_DELIVERY_FAILED' }, { status: 502 });
    }

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
