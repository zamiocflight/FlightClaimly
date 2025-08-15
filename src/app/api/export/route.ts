import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function convertToCSV(data: any[]) {
  const header = Object.keys(data[0]);
  const rows = data.map(obj =>
    header.map(field => `"${(obj[field] ?? '').toString().replace(/"/g, '""')}"`).join(',')
  );
  return [header.join(','), ...rows].join('\n');
}

export async function GET() {
  const filePath = path.join(process.cwd(), 'claims.json');

  try {
    const fileData = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf8')
      : '[]';

    const claims = JSON.parse(fileData);

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
    return NextResponse.json(
      { error: 'Failed to export CSV' },
      { status: 500 }
    );
  }
}
