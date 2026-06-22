"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PlaneIcon from "@/components/PlaneIcon";
import { useTranslations } from "next-intl";


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
  "Norwegian (DY/D8)",
  "Eurowings (EW)",
  "Transavia (HV)",
  "airBaltic (BT)",
  "Iberia Express (I2)",

];

// --- Shared layout constants (SINGLE SOURCE OF TRUTH) ---
const FIELD_WIDTH = "w-full md:max-w-[560px]";
const FIELD_ROW =
  "flex min-h-[64px] md:min-h-[56px] items-center justify-between rounded-xl border border-black/10 bg-white px-5 py-4 text-base text-slate-900 focus-within:outline-none focus-within:border-sky-400 focus-within:ring-1 focus-within:ring-sky-100 transition";

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
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (v: string) => void;
  placeholder: string;
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
        placeholder={placeholder}
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
  const t = useTranslations("check.direct");
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
  const [flights, setFlights] = useState<FlightItem[]>([]);
  const [flightsLoading, setFlightsLoading] = useState(false);
  const [flightsError, setFlightsError] = useState("");
  const [manualFlightNumber, setManualFlightNumber] = useState("");

  // Scroll target for flight list
  const flightsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (sp.get("choice") === "direct") return;

  const params = new URLSearchParams(sp.toString());
  params.set("choice", "direct");

  router.replace(`${pathname}?${params.toString()}`, {
    scroll: false,
  });
}, []);


  useEffect(() => {
    if (!selectedAirline) return;
    flightsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedAirline]);

useEffect(() => {
  if (!date || !selectedAirline) {
    setFlights([]);
    setFlightsError("");
    return;
  }

  let cancelled = false;

  async function loadFlights() {
    try {
      setFlightsLoading(true);
      setFlightsError("");
      setFlights([]);
      setSelectedFlightId(null);

      const qs = new URLSearchParams({
        from,
        to,
        date,
        airline: selectedAirline,
      });

      const res = await fetch(`/api/flight/search?${qs.toString()}`);

      if (!res.ok) {
        throw new Error(t("errors.searchFailed"));
      }

      const data = await res.json();

      if (!cancelled) {
        setFlights(Array.isArray(data.flights) ? data.flights : []);
      }
    } catch {
      if (!cancelled) {
        setFlightsError(t("errors.loadFailed"));
      }
    } finally {
      if (!cancelled) {
        setFlightsLoading(false);
      }
    }
  }

  loadFlights();

  return () => {
    cancelled = true;
  };
}, [from, to, date, selectedAirline]);

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
  if (selectedFlightId === MANUAL_ID) return normalizeFlightNumber(manualFlightNumber);
  return flights.find((f) => f.id === selectedFlightId)?.flightNumber || "";
}


  // ✅ NY: beräkna om direct-sidan är “klar”
  const directValid = Boolean(
  date &&
    selectedAirline &&
    selectedFlightId &&
    (selectedFlightId !== MANUAL_ID || manualFlightNumber.trim())
);

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
  const directValidNow = Boolean(
  date &&
    selectedAirline &&
    selectedFlightId &&
    (selectedFlightId !== MANUAL_ID || manualFlightNumber.trim())
);
  if (directValidNow) qs.set("directValid", "1");
  else qs.delete("directValid");

  router.replace(`${pathname}?${qs.toString()}`, { scroll: false });
}, [date, selectedAirline, selectedFlightId, manualFlightNumber, sp, pathname, router]);



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
          {t("departureDateTitle")}
        </h2>

        <div className={`space-y-1 ${FIELD_WIDTH}`}>
          <div className="text-sm font-semibold text-sky-900">{t("dateLabel")}</div>

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
            {t("airlineTitle")}
          </h2>

          <div className={`space-y-1 ${FIELD_WIDTH}`}>
            <div className="text-sm font-semibold text-sky-900">{t("airlineLabel")}</div>

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
  placeholder={t("airlinePlaceholder")}
/>

  {(airlineInput.trim().length > 0 || selectedAirline.trim().length > 0) && (
    <button
      type="button"
      aria-label={t("clearAirline")}
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
            {t("flightListTitle")}
          </h2>

          {/* HEADER ROW */}
          <div
            className={`${FIELD_WIDTH} flex justify-between text-sm text-slate-400 px-1 mb-1`}
          >
            <span>{t("scheduledTime")}</span>
            <span>{t("flightNumber")}</span>
          </div>

          {/* MOCK FLIGHTS */}
          <div className="space-y-2">
            {flightsLoading && (
  <div className={`${FIELD_WIDTH} rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500`}>
    {t("loadingFlights")}
  </div>
)}

{flightsError && (
  <div className={`${FIELD_WIDTH} rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800`}>
    {flightsError}
  </div>
)}

{!flightsLoading && !flightsError && flights.length === 0 && (
  <div className={`${FIELD_WIDTH} rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500`}>
    {t("noFlightsFound")}
  </div>
)}

{flights.map((f, index) => {
              const selected = selectedFlightId === f.id;

              return (
                <button
                  key={`${f.id}-${index}`}
                  type="button"
                  onClick={() => setSelectedFlightId(f.id)}
                  className={`${FIELD_ROW} ${FIELD_WIDTH} transition hover:border-sky-300 hover:bg-slate-50 ${
                    selected ? "border-sky-400 ring-2 ring-sky-200 bg-sky-50 shadow-sm" : ""
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
const manualLabel = flightsError
  ? t("manualEnterDetails")
  : t("manualCantFind");
              return (
                <button
                  type="button"
                  onClick={() => setSelectedFlightId(MANUAL_ID)}
                 className={`${FIELD_ROW} ${FIELD_WIDTH} transition hover:border-sky-300 hover:bg-slate-50 ${
  selected ? "border-sky-400 ring-2 ring-sky-200 bg-sky-50 shadow-sm" : ""
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
  {manualLabel}
</span>
                  </div>
                </button>
              );
            })()}
            {selectedFlightId === MANUAL_ID && (
  <div className={`${FIELD_WIDTH} mt-3`}>
    <label className="mb-1 block text-sm font-semibold text-sky-900">
      {t("manualFlightNumberLabel")}
    </label>
    <input
      value={manualFlightNumber}
      onChange={(e) => setManualFlightNumber(e.target.value.toUpperCase())}
      placeholder={t("manualFlightNumberPlaceholder")}
      className="w-full h-[56px] rounded-lg border border-black/10 bg-white px-5 text-base text-slate-900 placeholder:text-slate-400 hover:border-sky-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
    />
  </div>
)}
          </div>
        </div>
      )}
    </div>
  );
}
