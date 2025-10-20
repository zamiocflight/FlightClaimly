// src/app/api/export/route.ts
import { NextResponse } from 'next/server';
import { readClaims } from '../../../lib/claims';
import { Claim } from '../../../types/claim';

const HEADERS: (keyof Claim)[] = [
  'flightNumber',
  'date',
  'from',
  'to',
  'name',
  'email',
  'bookingNumber',
  'receivedAt',
  'status',
];

function convertToCSV(data: Claim[]): string {
  if (data.length === 0) return '';
  const headerLine = HEADERS.join(',');

  const rows = data.map((obj) =>
    HEADERS.map((field) => {
      const raw = obj[field];
      const val = String(raw ?? '');
      return `"${val.replace(/"/g, '""')}"`;
    }).join(',')
  );

  return [headerLine, ...rows].join('\n');
}

export async function GET() {
  try {
    const claims = readClaims();

    if (claims.length === 0) {
      return new NextResponse('No data', { status: 204 });
    }

    const csv = convertToCSV(claims);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="claims.csv"',
      },
    });
  } catch (error) {
    console.error('💥 CSV export error:', error);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
