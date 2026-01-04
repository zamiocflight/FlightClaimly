// src/app/api/send-track-link/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Matchar din claims.json (vi behöver egentligen bara email + receivedAt)
type Claim = {
  email: string;
  receivedAt?: string;
  [key: string]: any;
};

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Ogiltig e-postadress.' },
        { status: 400 }
      );
    }

    // --- Läs claims.json i projektroten ---
    const filePath = path.join(process.cwd(), 'claims.json');
    if (!fs.existsSync(filePath)) {
      console.warn('claims.json hittades inte på', filePath);
      return NextResponse.json(
        { error: 'Inga ärenden hittades.' },
        { status: 404 }
      );
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const claims = JSON.parse(raw) as Claim[];

    // Filtrera på e-post
    const matches = claims.filter(
      (c) => c.email && c.email.toLowerCase() === email.toLowerCase()
    );

    if (matches.length === 0) {
      console.log('Inga claims hittades för', email);
      // 200 med neutral text, av säkerhetsskäl
      return NextResponse.json({
        ok: true,
        message:
          'Om vi hittar ett ärende på den här e-postadressen skickar vi en länk inom någon minut.',
      });
    }

    // Ta senaste ärendet baserat på receivedAt (som i din JSON)
    const latestClaim =
      matches
        .slice()
        .sort((a, b) => {
          const da = a.receivedAt ? Date.parse(a.receivedAt) : 0;
          const db = b.receivedAt ? Date.parse(b.receivedAt) : 0;
          return db - da;
        })[0] || matches[matches.length - 1];

    // I din data är receivedAt själva ärende-ID:t
    const latestClaimId = (latestClaim as any).id ?? (latestClaim as any).receivedAt;
    if (!latestClaimId) {
      console.error('Hittade inget receivedAt på claim:', latestClaim);
      return NextResponse.json(
        { error: 'Kunde inte hitta ett ärende-ID för denna e-post.' },
        { status: 500 }
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get('origin') ||
      'http://localhost:3000';

    const trackUrl = `${origin.replace(/\/$/, '')}/en/track/${latestClaimId}`;

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
