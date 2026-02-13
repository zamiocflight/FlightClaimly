"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PlaneIcon from "@/components/PlaneIcon";


type FlightItem = {
  id: string;
  flightNumber: string;
  depTime: string;
  arrTime: string;
};

// --- Airline list ---
const AIRLINES = [
  "Scandinavian Airlines (SAS)",
  "Lufthansa (LH)",
  "Swiss International Air Lines (LX)",
  "Austrian Airlines (OS)",
  "British Airways (BA)",
  "Brussels Airlines (SN)",
  "Air France (AF)",
  "KLM (KL)",
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
  "Virgin Atlantic (VS)",
  "Jet2.com (LS)",
  "Norwegian Air Shuttle (DY)",
  "Eurowings (EW)",
  "Transavia (HV)",
  "airBaltic (BT)",
  "Iberia Express (I2)",

];

// --- Shared layout constants (SINGLE SOURCE OF TRUTH) ---
const FIELD_WIDTH = "max-w-[50%] w-full";
const FIELD_ROW =
  "flex items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus-within:outline-none focus-within:border-sky-300";

// "Copenhagen (CPH) — ..." -> "Copenhagen (CPH)"
function formatAirport(label: string) {
  const match = label.match(/^(.*?)\s*\((\w{3})\)/);
  if (!match) return label;
  const city = match[1].trim();
  const code = match[2].trim();
  return `${city} (${code})`;
}

function normalizeFlightNumber(raw: string) {
  // "BA 812" -> "BA812"
  return raw.replace(/\s+/g, "").trim();
}



// --- Airline Autocomplete ---
function AirlineAutocomplete({
  value,
  onChange,
  onSelect,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (v: string) => void;
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
    <div className="relative w-full z-50">
      <input
        className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 pr-10"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setTimeout(() => setOpen(false), 120);
        }}
        placeholder="e.g. British Airways"
      />

      {open && matches.length > 0 && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {matches.map((a) => (
            <div
              key={a}
              onMouseDown={() => {
                onChange(a);
                onSelect(a);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-2 text-sm text-slate-900 hover:bg-sky-50"
            >
              {a}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DirectClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname(); // ✅ NY
  const dateRef = useRef<HTMLInputElement>(null);

  const from = sp.get("from") || "";
  const to = sp.get("to") || "";

  const [date, setDate] = useState("");
  const [airlineInput, setAirlineInput] = useState("");
  const [selectedAirline, setSelectedAirline] = useState("");

  // Selected flight (radio)
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const MANUAL_ID = "MANUAL";

  // Scroll target for flight list
  const flightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const params = new URLSearchParams(sp.toString());
  params.set("choice", "direct");

  const qs = params.toString();
  router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
}, [sp, pathname, router]);


  useEffect(() => {
    if (!selectedAirline) return;
    flightsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedAirline]);

  // --- MOCK FLIGHTS ---
  const mockFlights: FlightItem[] = [
    { id: "1", depTime: "06:30", arrTime: "09:10", flightNumber: "BA 812" },
    { id: "2", depTime: "10:15", arrTime: "12:55", flightNumber: "BA 814" },
    { id: "3", depTime: "13:40", arrTime: "16:20", flightNumber: "BA 816" },
    { id: "4", depTime: "17:05", arrTime: "19:45", flightNumber: "BA 818" },
    { id: "5", depTime: "20:30", arrTime: "23:10", flightNumber: "BA 820" },
  ];

  function getSelectedFlightNumber() {
  if (!selectedFlightId) return "";
  if (selectedFlightId === MANUAL_ID) return "MANUAL";
  return mockFlights.find((f) => f.id === selectedFlightId)?.flightNumber || "";
}


  // ✅ NY: beräkna om direct-sidan är “klar”
  const directValid = Boolean(date && selectedAirline && selectedFlightId);

useEffect(() => {
  const qs = new URLSearchParams(sp.toString());

  // Always ensure direct flow
  qs.set("choice", "direct");

  // Persist direct selections so Verify + Layout can work
  if (date) qs.set("date", date);
  else qs.delete("date");

  if (selectedAirline) qs.set("airline", selectedAirline);
  else qs.delete("airline");

  const flightNumber = getSelectedFlightNumber();
  if (flightNumber) qs.set("flightNumber", flightNumber);
  else qs.delete("flightNumber");

  // Layout gate
  const directValidNow = Boolean(date && selectedAirline && selectedFlightId);
  if (directValidNow) qs.set("directValid", "1");
  else qs.delete("directValid");

  router.replace(`${pathname}?${qs.toString()}`, { scroll: false });
}, [date, selectedAirline, selectedFlightId, sp, pathname, router]);



  return (
    <div className="space-y-10">
      {/* ROUTE HEADER */}
      <div className="flex flex-wrap items-center gap-2 text-sm font-normal text-sky-900">
        <span>{formatAirport(from)}</span>
        <PlaneIcon />
        <span>{formatAirport(to)}</span>
      </div>

      {/* DATE */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-sky-900">
          What was your scheduled departure date?
        </h2>

        <div className={`space-y-1 ${FIELD_WIDTH}`}>
          <div className="text-sm font-semibold text-sky-900">Date</div>

          <div
            onClick={() => dateRef.current?.showPicker()}
            className={`${FIELD_ROW} cursor-pointer gap-3 hover:border-sky-300`}
          >
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
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setSelectedAirline("");
                setAirlineInput("");
                setSelectedFlightId(null);
              }}
              className="w-full bg-transparent outline-none cursor-pointer text-slate-900 placeholder:text-slate-400
                         appearance-none
                         [&::-webkit-calendar-picker-indicator]:hidden
                         [&::-webkit-clear-button]:hidden
                         [&::-ms-clear]:hidden"
            />
          </div>
        </div>
      </div>

      {/* SEPARATOR AFTER DATE */}
      {date && <div className="h-px w-full bg-slate-200" />}

      {/* AIRLINE */}
      {date && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-sky-900">
            Which airline did you fly with?
          </h2>

          <div className={`space-y-1 ${FIELD_WIDTH}`}>
            <div className="text-sm font-semibold text-sky-900">Airline</div>

            <div className={`${FIELD_ROW} relative hover:border-sky-300`}>
  <AirlineAutocomplete
    value={airlineInput}
    onChange={(v) => {
      setAirlineInput(v);
      setSelectedAirline("");
    }}
    onSelect={(v) => {
      setSelectedAirline(v);
    }}
  />

  {(airlineInput.trim().length > 0 || selectedAirline.trim().length > 0) && (
    <button
      type="button"
      aria-label="Clear airline"
      onClick={() => {
        setAirlineInput("");
        setSelectedAirline("");
        setSelectedFlightId(null); // valfritt men rekommenderat
      }}
className="
  absolute right-2 top-1/2 -translate-y-1/2
  h-20 w-20
  flex items-center justify-center
  text-slate-400 hover:text-slate-600
"


    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z" />
      </svg>
    </button>
  )}
</div>

          </div>
        </div>
      )}

      {/* SEPARATOR AFTER AIRLINE */}
      {date && selectedAirline && <div className="h-px w-full bg-slate-200" />}

      {/* FLIGHT LIST */}
      {date && selectedAirline && (
        <div ref={flightsRef} className="space-y-6">
          <h2 className="text-lg font-semibold text-sky-900">
            Next up, please select your flight from the list below:
          </h2>

          {/* HEADER ROW */}
          <div
            className={`${FIELD_WIDTH} flex justify-between text-sm text-slate-400 px-1 mb-1`}
          >
            <span>Scheduled time</span>
            <span>Flight number</span>
          </div>

          {/* MOCK FLIGHTS */}
          <div className="space-y-2">
            {mockFlights.map((f) => {
              const selected = selectedFlightId === f.id;

              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFlightId(f.id)}
                  className={`${FIELD_ROW} ${FIELD_WIDTH} transition hover:border-sky-300 ${
                    selected ? "border-sky-400" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio */}
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        selected ? "border-sky-500" : "border-slate-300"
                      }`}
                    >
                      {selected && (
                        <div className="h-2 w-2 rounded-full bg-sky-500" />
                      )}
                    </div>

                    {/* Time + plane */}
                    <span className="text-slate-700 flex items-center gap-2">
                      {f.depTime}
                      <PlaneIcon />
                      {f.arrTime}
                    </span>
                  </div>

                  <span className="font-semibold text-slate-900">
                    {f.flightNumber}
                  </span>
                </button>
              );
            })}

            {/* I CAN'T FIND MY FLIGHT */}
            {(() => {
              const selected = selectedFlightId === MANUAL_ID;
              return (
                <button
                  type="button"
                  onClick={() => setSelectedFlightId(MANUAL_ID)}
                  className={`${FIELD_ROW} ${FIELD_WIDTH} transition hover:border-sky-300 ${
                    selected ? "border-sky-400" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio */}
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        selected ? "border-sky-500" : "border-slate-300"
                      }`}
                    >
                      {selected && (
                        <div className="h-2 w-2 rounded-full bg-sky-500" />
                      )}
                    </div>

                    <span className="font-normal text-slate-900">
                      I can’t find my flight
                    </span>
                  </div>
                </button>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
