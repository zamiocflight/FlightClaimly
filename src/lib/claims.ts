// src/lib/claims.ts
import { supabaseAdmin } from './supabase';

export type Attachment = {
  filename: string;
  size: number;
  path: string;
  uploadedAt: string;      // ISO
  contentType?: string;
};

export type Claim = {
  // Primärnyckel i Supabase
  id: string;                            // DB: id (uuid)

  // Ärende-ID som kunden får – tidigare från JSON, nu i DB
  receivedAt: string;                     // DB: received_at (uuid)

  // Flygdata
  flightNumber: string;                   // DB: flight_number
  date?: string | null;                   // DB: date (ISO YYYY-MM-DD)
  from: string;                           // DB: from_code
  to: string;                             // DB: to_code

  // Kundinfo
  name: string;
  email: string;
  phone?: string | null;                  // DB: phone

  // Bokning
  bookingNumber: string;                  // DB: booking_number

  // Status
  status: string;                         // DB: status
  updatedAt: string;                      // DB: updated_at (ISO)

  // Bilagor
  attachments?: Attachment[];             // DB: attachments (jsonb)

  // Publik tracking-token (för /track/[id])
  viewerToken?: string | null;            // DB: viewer_token
  viewerTokenCreatedAt?: string | null;   // DB: viewer_token_created_at

  // ✈️ NEW — När ärendet skickades till flygbolaget (för timeline steg 3)
  sentToAirlineAt?: string | null;        // DB: sent_to_airline_at (timestamptz)
};

// ---------- DB row shape ----------
type ClaimRow = {
  received_at: string;
  flight_number: string;
  date: string | null;
  from_code: string;
  to_code: string;
  name: string;
  email: string;
  booking_number: string;
  status: string;
  updated_at: string;
  attachments: Attachment[] | null;

  viewer_token: string | null;
  viewer_token_created_at: string | null;

  phone: string | null;
  sent_to_airline_at: string | null;
};

// ---------- mappers ----------
function fromRow(r: ClaimRow): Claim {
  return {
    id: r.received_at,                 // 👈 FIX – detta är ditt riktiga ID
    receivedAt: r.received_at,
    flightNumber: r.flight_number,
    date: r.date,
    from: r.from_code,
    to: r.to_code,
    name: r.name,
    email: r.email,
    bookingNumber: r.booking_number,
    status: r.status,
    updatedAt: r.updated_at,
    attachments: r.attachments ?? [],
    viewerToken: r.viewer_token,
    viewerTokenCreatedAt: r.viewer_token_created_at,
    phone: r.phone,
    sentToAirlineAt: r.sent_to_airline_at,
  };
}


function toInsert(input: {
  flightNumber: string;
  date?: string | null;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  status?: string;

  viewerToken?: string;
  viewerTokenCreatedAt?: string;

  phone?: string | null;
  id?: string; // 👈 lägg till så vi kan använda det här också
}) {
  return {
    received_at: input.id ?? undefined, // 👈 låter addClaim sätta default senare
    flight_number: input.flightNumber,
    date: input.date ?? null,
    from_code: input.from,
    to_code: input.to,
    name: input.name,
    email: input.email,
    booking_number: input.bookingNumber,
    status: input.status ?? 'new',

    viewer_token: input.viewerToken ?? null,
    viewer_token_created_at: input.viewerTokenCreatedAt ?? null,

    phone: input.phone ?? null,
  };
}


// ---------- public API ----------

/**
 * Lista alla claims, senast uppdaterade först.
 */
export async function getClaims(): Promise<Claim[]> {
  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from('claims')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return ((data as ClaimRow[] | null) ?? []).map(fromRow);
}

/**
 * Hämta claim på received_at (uuid).
 */
export async function getClaimById(id: string): Promise<Claim | null> {
  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from('claims')
    .select('*')
    .eq('received_at', id)
    .maybeSingle<ClaimRow>();

  if (error) throw error;
  return data ? fromRow(data) : null;
}

/**
 * Skapa ett claim.
 * Om du redan har ett id (uuid) från API-routen – skicka in det så att
 * frontend/thanks sida och DB använder exakt samma id.
 */
export async function addClaim(input: {
  id?: string;                     // valfritt: received_at (tracking-id)
  flightNumber: string;
  date?: string | null;
  from: string;
  to: string;
  name: string;
  email: string;
  bookingNumber: string;
  status?: string;
  viewerToken?: string;
  viewerTokenCreatedAt?: string;
  phone?: string | null;
}): Promise<Claim> {
  const sb = supabaseAdmin();

  const nowIso = new Date().toISOString();
  const baseStatus = input.status ?? 'new';

  const row = toInsert({
    ...input,
    status: baseStatus,
  }) as Partial<ClaimRow> & { received_at?: string; updated_at?: string };

  row.updated_at = row.updated_at ?? nowIso;

  if (!input.id) {
  // Skapa ID själv
  row.received_at = crypto.randomUUID();
} else {
  row.received_at = input.id;
}


  console.log('🟦 addClaim – ska insertas i Supabase:', row);

  const { data, error } = await sb
    .from('claims')
    .insert(row)
    .select('*')
    .single<ClaimRow>();

  if (error) {
    console.error('❌ addClaim Supabase insert error:', error);
    throw error;
  }

  console.log('✅ addClaim – insert ok, rad från Supabase:', data);

  return fromRow(data);
}

/**
 * Uppdatera status (new/processing/sent_to_airline/paid_out/rejected …).
 */
export async function updateClaimStatus(
  id: string,
  newStatus: string
): Promise<Claim> {
  const sb = supabaseAdmin();

  // Grund-fälten vi ALLTID uppdaterar
  const update: Partial<ClaimRow> = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };

  // Sätt datum FÖRSTA gången vi går till sent_to_airline
  if (newStatus === 'sent_to_airline') {
    (update as any).sent_to_airline_at = new Date().toISOString();
  }

  const { data, error } = await sb
    .from('claims')
    .update(update)
    .eq('received_at', id)
    .select('*')
    .single<ClaimRow>();

  if (error) throw error;
  return fromRow(data);
}

/**
 * Lägg till en bilaga i attachments-arrayen (jsonb).
 */
export async function appendAttachment(id: string, att: Attachment): Promise<Claim> {
  const sb = supabaseAdmin();

  // 1) Hämta befintligt
  const current = await getClaimById(id);
  if (!current) {
    // Viktigt: NOT_FOUND betyder att ID:t inte finns i DB.
    // Kontrollera att du skickar rätt id (received_at) från /thanks vid upload.
    throw new Error('NOT_FOUND');
  }

  // 2) Ny lista
  const next = [...(current.attachments ?? []), att];

  // 3) Spara
  const { data, error } = await sb
    .from('claims')
    .update({ attachments: next, updated_at: new Date().toISOString() })
    .eq('received_at', id)
    .select('*')
    .single<ClaimRow>();

  if (error) throw error;
  return fromRow(data);
}
export async function getAllClaims() {
  try {
    const fs = await import('fs/promises');
    const path = `${process.cwd()}/data/claims.json`;

    const raw = await fs.readFile(path, 'utf8');
    const data = JSON.parse(raw);

    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('getAllClaims error:', e);
    return [];
  }
}
