import { NextResponse } from 'next/server';
import { getAllClaims } from '@/lib/claims'; // du har denna redan

export const runtime = 'nodejs';

function toCsvRow(values: (string | number | null | undefined)[]) {
  return values
    .map((v) => {
      if (v == null) return '';
      const s = String(v).replace(/"/g, '""'); // escape "
      return `"${s}"`;
    })
    .join(',');
}

export async function GET() {
  try {
    const claims = await getAllClaims();

    const headers = [
      'id',
      'name',
      'email',
      'flightNumber',
      'from',
      'to',
      'date',
      'bookingNumber',
      'status',
      'receivedAt',
      'viewerToken'
    ];

    const rows = [
      headers.join(','),
      ...claims.map((c) =>
        toCsvRow([
          c.id,
          c.name,
          c.email,
          c.flightNumber,
          c.from,
          c.to,
          c.date,
          c.bookingNumber,
          c.status,
          c.receivedAt,
          c.viewerToken
        ])
      )
    ];

    const csv = rows.join('\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="claims_export.csv"`
      }
    });
  } catch (e) {
    console.error('CSV EXPORT ERROR', e);
    return NextResponse.json({ error: 'SERVER_ERROR' }, { status: 500 });
  }
}
