// src/app/api/export/route.ts
import { NextResponse } from 'next/server';
import { getClaims } from '@/lib/claims';

export async function GET() {
  const rows = await getClaims();
  const header = ['id','date','flightNumber','from','to','name','email','bookingNumber','status','updatedAt'];
  const csv = [
    header.join(','),
    ...rows.map(r => [
      r.id,
      r.date ?? '',
      r.flightNumber,
      r.from,
      r.to,
      `"${r.name.replaceAll('"','""')}"`,
      r.email,
      r.bookingNumber,
      r.status,
      r.updatedAt,
    ].join(',')),
  ].join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="claims.csv"',
    },
  });
}
