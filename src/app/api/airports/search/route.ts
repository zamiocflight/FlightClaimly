import { NextResponse } from 'next/server';
import airports from '@/data/airports.min.json';

type Airport = {
  iata?: string;
  icao?: string;
  name?: string;
  city?: string;
  country?: string;
  type?: string;
  searchText?: string; // från din build
};

function norm(s: string) {
  return (s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // tar bort diakritiska tecken (ö->o etc)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Liten men hög-impact aliaslista (kan byggas på över tid)
const ALIASES: Record<string, string> = {
  // Nordics
  'kopenhamn': 'copenhagen',
  'koppenhamn': 'copenhagen',
  'goteborg': 'gothenburg',
  'oslo': 'oslo',
  'stockholm': 'stockholm',
  'helsingfors': 'helsinki',

  // Vanliga EU-namn på “lokalt språk”
  'munchen': 'munich',
  'koln': 'cologne',
  'wien': 'vienna',
  'prag': 'prague',
  'rom': 'rome',
  'milano': 'milan',
  'lissabon': 'lisbon',
  'aten': 'athens',
};

function expandQueries(q: string) {
  const out = new Set<string>();
  out.add(q);

  // Om query matchar alias-nyckel (helt eller som prefix), lägg till alias-target
  for (const [k, v] of Object.entries(ALIASES)) {
    if (q === k || k.startsWith(q) || q.startsWith(k)) out.add(v);
  }
  return Array.from(out);
}

function scoreAirport(a: Airport, q: string): number {
  const qlen = q.length;
  const iata = (a.iata || '').toUpperCase();
  const icao = (a.icao || '').toUpperCase();

  const cityN = norm(a.city || '');
  const nameN = norm(a.name || '');
  const textN = norm(a.searchText || `${a.city || ''} ${a.name || ''} ${a.iata || ''} ${a.icao || ''}`);

  const qU = q.toUpperCase();

  // 1) Om användaren skriver kort kod-lik query (<=3): prioritera kod-match hårt,
  // och undvik “contains” som ger Mcpherson för "cph".
  if (qlen <= 3) {
    if (iata === qU) return 1000;
    if (icao === qU) return 950;
    if (iata.startsWith(qU)) return 850;
    if (icao.startsWith(qU)) return 800;

    // För 1-2 bokstäver: tillåt bara prefix på city/name (inte contains)
    if (qlen <= 2) {
      if (cityN.startsWith(q)) return 350;
      if (nameN.startsWith(q)) return 250;
      return -Infinity;
    }

    // qlen==3 men ingen kod-match: fallback på prefix (fortfarande restriktiv)
    if (cityN.startsWith(q)) return 300;
    if (nameN.startsWith(q)) return 200;
    return -Infinity;
  }

  // 2) “normal” text-sök (>=4)
  // Exakt/prefix i city/name ger bäst UX
  if (cityN === q) return 600;
  if (cityN.startsWith(q)) return 520;
  if (nameN.startsWith(q)) return 420;

  // Contains är ok, men lägre
  if (cityN.includes(q)) return 260;
  if (nameN.includes(q)) return 220;

  // Sista fallback: searchText (bredare match)
  if (textN.includes(q)) return 120;

  return -Infinity;
}

// Extra boost för flygplatstyp (large > medium > small)
function typeBoost(type?: string) {
  if (type === 'large_airport') return 40;
  if (type === 'medium_airport') return 20;
  return 0;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = (searchParams.get('q') || '').trim();

  if (!raw) {
    return NextResponse.json({ results: [] });
  }

  const q = norm(raw);
  const queries = expandQueries(q);

  const scored = (airports as Airport[])
    .map((a) => {
      // bästa score över alla “expanded queries”
      let best = -Infinity;
      for (const qq of queries) {
        const s = scoreAirport(a, qq);
        if (s > best) best = s;
      }

      if (best === -Infinity) return null;

      return {
        ...a,
        _score: best + typeBoost(a.type),
      };
    })
    .filter(Boolean) as (Airport & { _score: number })[];

  scored.sort((a, b) => b._score - a._score);

  const top = scored.slice(0, 12).map((a) => {
  const city = a.city || '';
  const name = a.name || '';
  const iata = (a.iata || '').toUpperCase();

  return {
    iata,
    name,
    city,
    country: a.country,
    type: a.type,
    label: city
      ? `${city} (${iata}) — ${name}`
      : `${name} (${iata})`,
  };
});

  return NextResponse.json({ results: top });
}
