"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plane } from "lucide-react";
import PlaneIcon from "@/components/PlaneIcon";


type Segment = {
  airline: string;
  flightNumber: string;
  date: string; // keep as string for MVP (YYYY-MM-DD from input[type=date])
};

function safeParseJSON<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

// "Copenhagen (CPH) — Copenhagen Kastrup Airport" -> "Copenhagen (CPH)"
function formatAirport(label: string) {
  const match = label.match(/^(.*?)\s*\((\w{3})\)/);
  if (!match) return label;
  const city = match[1].trim();
  const code = match[2].trim();
  return `${city} (${code})`;
}



// --- Airline list (~40 major EU + intercontinental carriers) ---
const AIRLINES = [
  "Scandinavian Airlines (SAS)",
  "Lufthansa (LH)",
  "Swiss International Air Lines (LX)",
  "Austrian Airlines (OS)",
  "Brussels Airlines (SN)",
  "Air France (AF)",
  "KLM (KL)",
  "British Airways (BA)",
  "Iberia (IB)",
  "TAP Air Portugal (TP)",
  "Finnair (AY)",
  "LOT Polish Airlines (LO)",
  "ITA Airways (AZ)",
  "Vueling (VY)",
  "easyJet (U2)",
  "Ryanair (FR)",
  "Wizz Air (W6)",
  "Turkish Airlines (TK)",
  "Aegean Airlines (A3)",
  "Air Europa (UX)",
  "Delta Air Lines (DL)",
  "American Airlines (AA)",
  "United Airlines (UA)",
  "Air Canada (AC)",
  "Emirates (EK)",
  "Qatar Airways (QR)",
  "Etihad Airways (EY)",
  "Singapore Airlines (SQ)",
  "Thai Airways (TG)",
  "ANA All Nippon Airways (NH)",
  "Japan Airlines (JL)",
  "Cathay Pacific (CX)",
  "Korean Air (KE)",
  "EVA Air (BR)",
  "China Airlines (CI)",
  "Hainan Airlines (HU)",
  "Icelandair (FI)",
  "Aer Lingus (EI)",
];

function AirlineAutocomplete({
  value,
  onChange,
  inputClassName,
}: {
  value: string;
  onChange: (v: string) => void;
  inputClassName: string;
}) {
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = value.toLowerCase().trim();
    if (q.length < 2) return [];

    const starts = AIRLINES.filter((a) => a.toLowerCase().startsWith(q));
    const contains = AIRLINES.filter(
      (a) => !a.toLowerCase().startsWith(q) && a.toLowerCase().includes(q)
    );

    return [...starts, ...contains].slice(0, 8);
  }, [value]);

  return (
    <div className="relative">
      <input
        className={inputClassName}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          if (value.trim().length >= 2) setOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => setOpen(false), 120);
        }}
        placeholder="e.g. British Airways"
      />

      {open && matches.length > 0 && (
<div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {matches.map((a) => (
            <div
              key={a}
              onMouseDown={() => {
                onChange(a);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-2 text-sm text-slate-900 hover:bg-sky-50 whitespace-nowrap"
            >
              {a}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function extractAirlineCode(label: string) {
  const m = label.match(/\(([^)]+)\)/);
  if (m) return m[1].toUpperCase();

  if (/^[A-Z0-9]{2,3}$/.test(label.trim().toUpperCase())) {
    return label.trim().toUpperCase();
  }

  return "";
}

export default function ItineraryClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const from = sp.get("from") || "";
  const to = sp.get("to") || "";

  const layovers = useMemo(() => {
    const parsed = safeParseJSON<string[]>(sp.get("layovers"));
    if (parsed && Array.isArray(parsed)) return parsed.filter(Boolean);
    return [];
  }, [sp]);

  const stops = useMemo(() => {
    return [from, ...layovers, to].filter((s) => (s || "").trim().length > 0);
  }, [from, layovers, to]);

  const segmentCount = Math.max(0, stops.length - 1);

  const [segments, setSegments] = useState<Segment[]>(() => {
    const parsed = safeParseJSON<Segment[]>(sp.get("segments"));
    if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;

    return Array.from({ length: segmentCount }, () => ({
      airline: "",
      flightNumber: "",
      date: "",
    }));
  });

  useEffect(() => {
    setSegments((prev) => {
      if (prev.length === segmentCount) return prev;

      const next = Array.from({ length: segmentCount }, (_, i) => {
        return (
          prev[i] || {
            airline: "",
            flightNumber: "",
            date: "",
          }
        );
      });

      return next;
    });
  }, [segmentCount]);

  const allFilled = useMemo(() => {
    if (segmentCount === 0) return false;
    return (
      segments.length === segmentCount &&
      segments.every(
        (s) =>
          s.airline.trim().length > 0 &&
          s.flightNumber.trim().length > 0 &&
          s.date.trim().length > 0
      )
    );
  }, [segments, segmentCount]);

  useEffect(() => {
  const qs = new URLSearchParams(sp.toString());
  qs.set("choice", "itinerary");
  router.replace(`?${qs.toString()}`, { scroll: false });
}, [sp, router]);


  useEffect(() => {
    const qs = new URLSearchParams(sp.toString());
    qs.set("segmentsValid", allFilled ? "1" : "0");
    qs.set("segments", JSON.stringify(segments));
    router.replace(`?${qs.toString()}`, { scroll: false });
  }, [allFilled, segments, router, sp]);

  function setSegment(i: number, patch: Partial<Segment>) {
    setSegments((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      return next;
    });
  }

const fieldRow =
  "relative flex items-center h-[50px] rounded-lg border border-slate-300 bg-white px-4 focus-within:border-sky-300 hover:border-sky-300";

  return (
    <div className="mx-auto max-w-[640px]">
      <div className="-ml-18 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-sky-900">
            OK, I’ll just need a few flight details so I can check your eligibility.
          </h1>
        </div>

        {/* FORM CONTENT */}
        <div className="space-y-10">
          {Array.from({ length: segmentCount }).map((_, i) => {
            const seg = segments[i] || { airline: "", flightNumber: "", date: "" };
            const fromStop = stops[i];
            const toStop = stops[i + 1];

            const dateRef = useRef<HTMLInputElement>(null);

            return (
              <div key={i}>
                {/* Segment route A -> B */}
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-normal text-sky-900">
                  <span>{formatAirport(fromStop)}</span>
                  <PlaneIcon />
                  <span>{formatAirport(toStop)}</span>
                </div>

{/* Airline = 50% width */}
<div className="mt-2 max-w-[50%]">
  <div className="mb-2 text-sm font-semibold text-sky-900">Airline</div>

<div className={fieldRow}>
  <div className="flex-1">
    <AirlineAutocomplete
      value={seg.airline}
      onChange={(v) => setSegment(i, { airline: v })}
      inputClassName="w-full h-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400 pr-12"
    />
  </div>

  {seg.airline && (
    <button
      type="button"
      aria-label="Clear airline"
      onClick={() => setSegment(i, { airline: "" })}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
    >
      ✕
    </button>
  )}
</div>
</div>




{/* Flight number (1/3) + Date (2/3) */}
<div className="mt-5 flex gap-4 max-w-[50%]">
  <div className="w-1/3">
    <div className="mb-2 text-sm font-semibold text-sky-900">
      Flight number
    </div>

{/* Flight number wrapper — force same height as Date */}
<div className="h-[50px] flex overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-sky-300 hover:border-sky-300">
  {/* Prefix – grey fills full height */}
  <div className="h-full flex w-1/3 items-center justify-center bg-slate-100 px-3 text-sm font-normal text-slate-500">
    {extractAirlineCode(seg.airline)}
  </div>

  {/* Input – white fills full height */}
  <input
    className="h-full w-2/3 bg-transparent px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
    value={seg.flightNumber}
    onChange={(e) => setSegment(i, { flightNumber: e.target.value })}
    placeholder="1234"
  />
</div>

  </div>

                  <div className="w-2/3">
                    <div className="mb-2 text-sm font-semibold text-sky-900">
                      Date
                    </div>

                    {/* CLICKABLE ROW WITH LEFT ICON */}
                    <div
                      onClick={() => dateRef.current?.showPicker()}
                      className="flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 focus-within:border-sky-300 hover:border-sky-300 cursor-pointer"
                    >
                      {/* Calendar icon */}
                      <svg
                        className="h-5 w-5 text-slate-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm12 8H5v9h14v-9ZM6 8h12V6H6v2Z" />
                      </svg>

                      <input
                        ref={dateRef}
                        type="date"
                        className="w-full bg-transparent outline-none cursor-pointer text-slate-900 placeholder:text-slate-400
                          appearance-none
                          [&::-webkit-calendar-picker-indicator]:hidden
                          [&::-webkit-clear-button]:hidden
                          [&::-ms-clear]:hidden"
                        value={seg.date}
                        onChange={(e) => setSegment(i, { date: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {i < segmentCount - 1 && (
                  <div className="mt-8 h-px w-full bg-slate-200" />
                )}
              </div>
            );
          })}
        </div>

        {!allFilled && (
          <div className="text-sm text-slate-500">
            Fill in airline, flight number and date for every segment to continue.
          </div>
        )}
      </div>
    </div>
  );
}
