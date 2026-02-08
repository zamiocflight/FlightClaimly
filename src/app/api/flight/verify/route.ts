import { NextResponse } from 'next/server';
import { FlightVerifyInput } from '@/lib/flight/types';
import { verifyFlightMock } from '@/lib/flight/providers/mock';

export async function POST(req: Request) {
  let input: FlightVerifyInput;

  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Minimal validering (mer kan läggas senare)
  if (
    !input?.flightNumber ||
    !input?.date ||
    !input?.from ||
    !input?.to
  ) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Använd mock provider (byts senare)
  const result = await verifyFlightMock(input);

  return NextResponse.json(result);
}
