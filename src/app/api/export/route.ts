import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Typ för våra claims
type Claim = {
  flightNumber: string;
  date: string;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  receivedAt: string;
  status: string;
};

// Typad CSV-konverterare (utan explicit any)
function convertToCSV<T extends Record<string, unknown>>(data: T[]): string {
  if (data.length === 0) return '';

  const header = Object.keys(data[0] as Record<string, unknown>);
  const rows = data.map((obj) =>
    header
      .map((field) => {
        const raw = (obj as Record<string, unknown>)[field];
        let val = '';
        if (raw == null) {
          val = '';
        } else if (
          typeof raw === 'string' ||
          typeof raw === 'number' ||
          typeof raw === 'boolean'
        ) {
          val = String(raw);
        } else {
          try {
            val = JSON.stringify(raw);
          } catch {
            val = String(raw);
          }
        }
        return `"${val.replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  return [header.join(','), ...rows].join('\n');
}

export async function GET() {
  const filePath = path.join(process.cwd(), 'claims.json');

  try {
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';

    // Säg till TS att detta är en lista av Claim
    const claims: Claim[] = JSON.parse(fileData);

    if (claims.length === 0) {
      return new NextResponse('No data', { status: 204 });
    }

    const csv = convertToCSV<Claim>(claims);

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
