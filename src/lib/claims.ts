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

    // Payout (bank details)
  payoutAccountHolder?: string | null;        // DB: payout_account_holder
  payoutIban?: string | null;                  // DB: payout_iban
  payoutIbanLast4?: string | null;             // DB: payout_iban_last4
  payoutDetailsSubmittedAt?: string | null;    // DB: payout_details_submitted_at

  payoutToken?: string | null;
  payoutTokenCreatedAt?: string | null;
  payoutTokenExpiresAt?: string | null;

  

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

  payout_account_holder: string | null;
  payout_iban: string | null;
  payout_iban_last4: string | null;
  payout_details_submitted_at: string | null;
  payoutToken?: string | null;
  payoutTokenCreatedAt?: string | null;
  payoutTokenExpiresAt?: string | null;
  payout_token: string | null;
  payout_token_created_at: string | null;
  payout_token_expires_at: string | null;

  payoutAccountHolder?: string | null;
  payoutIbanLast4?: string | null;
  payoutDetailsSubmittedAt?: string | null;

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
    payoutAccountHolder: r.payout_account_holder,
    payoutIban: r.payout_iban,
    payoutIbanLast4: r.payout_iban_last4,
    payoutDetailsSubmittedAt: r.payout_details_submitted_at,
    payoutToken: r.payout_token,
payoutTokenCreatedAt: r.payout_token_created_at,
payoutTokenExpiresAt: r.payout_token_expires_at,

  

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
    .is('archived_at', null) // 👈 HÄR: visa bara ej arkiverade
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

export async function updateClaimPayoutDetails(
  id: string,
  input: { accountHolder: string; iban: string }
): Promise<Claim> {
  const sb = supabaseAdmin();

  const nowIso = new Date().toISOString();
  const cleanAccountHolder = input.accountHolder.trim();
  const cleanIban = input.iban.replace(/\s+/g, '').toUpperCase();
  const last4 = cleanIban.slice(-4);

  const { data, error } = await sb
    .from('claims')
    .update({
      payout_account_holder: cleanAccountHolder,
      payout_iban: cleanIban,
      payout_iban_last4: last4,
      payout_details_submitted_at: nowIso,
      updated_at: nowIso,
    })
    .eq('received_at', id)
    .select('*')
    .single<ClaimRow>();

  if (error) throw error;
  return fromRow(data);
}
export async function ensurePayoutToken(id: string): Promise<{ token: string; expiresAt: string }> {
  const sb = supabaseAdmin();

  // Hämta token-fält
  const { data, error } = await sb
    .from('claims')
    .select('payout_token, payout_token_expires_at')
    .eq('received_at', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('NOT_FOUND');

  // Om token finns och inte gått ut → returnera
  const existingToken = data.payout_token as string | null;
  const existingExpires = data.payout_token_expires_at as string | null;

  if (existingToken && existingExpires && new Date(existingExpires) > new Date()) {
    return { token: existingToken, expiresAt: existingExpires };
  }

  // Skapa ny token (MVP: uuid är OK)
  const token = crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30).toISOString(); // 30 dagar

  const { error: updErr } = await sb
    .from('claims')
    .update({
      payout_token: token,
      payout_token_created_at: now.toISOString(),
      payout_token_expires_at: expiresAt,
      updated_at: now.toISOString(),
    })
    .eq('received_at', id);

  if (updErr) throw updErr;

  return { token, expiresAt };
}

/**
 * Lägg till en bilaga i attachments-arrayen (jsonb).
 */
export async function appendAttachment(
  id: string,
  att: Attachment
): Promise<Claim> {
  const sb = supabaseAdmin();

  // 1) Hämta befintligt
  const current = await getClaimById(id);
  if (!current) {
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
