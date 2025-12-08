// src/app/api/admin/claims/route.ts
import { NextResponse } from 'next/server';
import { getClaims } from '@/lib/claims';

type ClaimRaw = {
  id?: string;
  receivedAt?: string;
  flightNumber: string;
  date?: string | null;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  status?: string;
  connections?: string[];
  attachments?: { filename: string }[];
};

type ClaimAdmin = {
  id: string;
  flightNumber: string;
  date: string;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  receivedAt: string;
  statusInternal: string; // new | processing | sent_to_airline | paid_out | rejected
  statusLabel: string;    // svensk label
  connections: string[];
  attachmentsCount: number;
};

export async function GET() {
  try {
    // 🔑 Läs alltid från samma källa som resten av systemet
    const claims = (await getClaims()) as ClaimRaw[];

    const mapped: ClaimAdmin[] = claims
      .slice()
      .sort((a, b) => {
        const da = a.receivedAt ?? a.id ?? '';
        const db = b.receivedAt ?? b.id ?? '';
        return Date.parse(db) - Date.parse(da);
      })
      .map((c) => {
        const internal = normalizeStatusFromStore(c.status ?? '');
        const id = c.id ?? c.receivedAt ?? '';
        return {
          id,
          flightNumber: c.flightNumber,
          date: c.date ?? '',
          from: c.from,
          to: c.to,
          name: c.name,
          email: c.email,
          bookingNumber: c.bookingNumber,
          receivedAt: c.receivedAt ?? '',
          statusInternal: internal,
          statusLabel: statusLabelSv(internal),
          connections: Array.isArray(c.connections) ? c.connections : [],
          attachmentsCount: Array.isArray(c.attachments)
            ? c.attachments.length
            : 0,
        };
      });

    return NextResponse.json(mapped);
  } catch (err) {
    console.error('Error in /api/admin/claims:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Samma logik som tidigare
function normalizeStatusFromStore(status: string): string {
  if (!status) return 'new';

  const s = status.toLowerCase().trim();

  if (
    s === 'new' ||
    s === 'processing' ||
    s === 'sent_to_airline' ||
    s === 'paid_out' ||
    s === 'rejected'
  ) {
    return s;
  }

  if (s.includes('klar') || s.includes('utbetald')) return 'paid_out';
  if (s.includes('under behandling')) return 'processing';
  if (s.includes('skickat')) return 'sent_to_airline';
  if (s.includes('avslag')) return 'rejected';
  if (s.includes('obehandlad')) return 'new';

  return 'new';
}

function statusLabelSv(status: string): string {
  switch (status) {
    case 'new':
      return 'Obehandlad';
    case 'processing':
      return 'Under behandling';
    case 'sent_to_airline':
      return 'Skickat till flygbolaget';
    case 'paid_out':
      return 'Ersättning utbetald';
    case 'rejected':
      return 'Avslaget';
    default:
      return status;
  }
}
