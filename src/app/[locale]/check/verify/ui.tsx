'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PlaneIcon from "@/components/PlaneIcon";
import { CalendarDays, Clock, Plane, Timer } from "lucide-react";

type VerifyResult = {
  matched: boolean;
  eligible: boolean;
  reasonCode?: string;
  source: 'mock' | 'provider';
};

type Leg = {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
};

function parseLegsFromSearchParams(sp: URLSearchParams): Leg[] {
  const legsJson = sp.get("legs");
  if (!legsJson) return [];
  try {
    const parsed = JSON.parse(legsJson);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (l) =>
          l &&
          typeof l.id === "string" &&
          typeof l.from === "string" &&
          typeof l.fromCode === "string" &&
          typeof l.to === "string" &&
          typeof l.toCode === "string"
      );
    }
  } catch {}
  return [];
}

// --- helpers ---
function formatDateParts(iso: string) {
  if (!iso) return { date: "—", time: "—" };

  const d = new Date(iso);
  const day = d.getDate();
  const month = d.toLocaleString(undefined, { month: "short" }).replace(".", "");
  const monthCap = month.charAt(0).toUpperCase() + month.slice(1);
  const year = d.getFullYear();

  const date = `${day} ${monthCap} ${year}`;
  const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  return { date, time };
}

function isDelayedOver3h(scheduledIso: string, actualIso: string) {
  if (!scheduledIso || !actualIso) return false;
  const s = new Date(scheduledIso).getTime();
  const a = new Date(actualIso).getTime();
  const diffHours = (a - s) / (1000 * 60 * 60);
  return diffHours >= 3;
}

function estimateCompensationEUR() {
  return 250; // v1 placeholder
}
function estimateDistanceKm() {
  return 357; // v1 placeholder
}
function estimateDelay() {
  return "3 hours 22 minutes"; // v1 placeholder
}

// 👉 Normaliserar "Copenhagen — Copenhagen Kastrup Airport" -> "Copenhagen (CPH)"
function normalizeCityLabel(name: string, code: string) {
  if (!name) return "—";
  const clean = name.split("—")[0].split("-")[0].trim();
  if (/\([A-Z]{3}\)/.test(clean)) return clean;
  if (code) return `${clean} (${code})`;
  return clean;
}

function extractAirlineCode(label: string) {
  // "Iberia (IB)" -> "IB"
  const m = label.match(/\(([A-Z0-9]{2,3})\)/i);
  return m ? m[1].toUpperCase() : "";
}

export function VerifyClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const choice = (searchParams.get("choice") || "direct") as "direct" | "itinerary";

  // ----- Direct fields -----
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const flightNumber = searchParams.get("flightNumber") || "";

  // Airline label can be stored as either "airline" or "airlineName" depending on your step
  const airlineLabel =
    searchParams.get("airline") ||
    searchParams.get("airlineName") ||
    "";

  const airlineCode = searchParams.get("airlineCode") || "";

  // ----- Itinerary fields -----
  const legs = useMemo(
    () => parseLegsFromSearchParams(new URLSearchParams(searchParams.toString())),
    [searchParams]
  );
  const legsKey = searchParams.get("legs") || "";

  const disruptionType = searchParams.get("disruptionType");
  const affectedLegId = searchParams.get("affectedLegId");
  const outcome = searchParams.get("outcome");
  const cancelNotice = searchParams.get("cancelNotice");
  const volunteer = searchParams.get("volunteer");

  const payload =
    choice === "direct"
      ? { from, to, date, flightNumber }
      : { legs, disruptionType, affectedLegId, outcome, cancelNotice, volunteer };

  const payloadKey =
    choice === "direct"
      ? `direct|${from}|${to}|${date}|${flightNumber}`
      : `itinerary|${legsKey}|${disruptionType}|${affectedLegId}|${outcome}|${cancelNotice}|${volunteer}`;

    useEffect(() => {
    // Set airlineCode once (no loops)
    if (airlineCode) return;

    const code = extractAirlineCode(airlineLabel);
    if (!code) return;

    const qs = new URLSearchParams(searchParams.toString());
    qs.set("airlineCode", code);
    router.replace(`?${qs.toString()}`, { scroll: false });
  }, [airlineCode, airlineLabel, router, searchParams]);

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [confirm, setConfirm] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      const res = await fetch("/api/flight/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setResult(json);
      setLoading(false);
    }
    run();
  }, [payloadKey]);

  useEffect(() => {
    const qs = new URLSearchParams(searchParams.toString());

    if (result) {
      qs.set("verifyMatched", result.matched ? "1" : "0");
      qs.set("verifyEligible", result.eligible ? "1" : "0");
    } else {
      qs.delete("verifyMatched");
      qs.delete("verifyEligible");
    }

    if (confirm) qs.set("verifyConfirm", confirm);
    else qs.delete("verifyConfirm");

    router.replace(`?${qs.toString()}`, { scroll: false });
  }, [result, confirm, router, searchParams]);

  const primaryLeg =
    choice === "itinerary"
      ? legs.find(l => l.id === affectedLegId) || legs[0]
      : null;

  const fromLabel =
    choice === "itinerary"
      ? primaryLeg
        ? normalizeCityLabel(primaryLeg.from, primaryLeg.fromCode)
        : "—"
      : normalizeCityLabel(from, "");

  const toLabel =
    choice === "itinerary"
      ? primaryLeg
        ? normalizeCityLabel(primaryLeg.to, primaryLeg.toCode)
        : "—"
      : normalizeCityLabel(to, "");

  const compEUR = estimateCompensationEUR();
  const distanceKm = estimateDistanceKm();
  const delayText = estimateDelay();

  const scheduledArrival = date ? `${date}T10:30:00` : "";
  const actualArrival = date ? `${date}T13:51:00` : "";

  const scheduledParts = formatDateParts(scheduledArrival);
  const actualParts = formatDateParts(actualArrival);
  const delayedOver3h = isDelayedOver3h(scheduledArrival, actualArrival);

  if (loading) {
    return <div className="p-8 text-sky-900">Checking flight status…</div>;
  }

  if (!result || !result.matched) {
    return (
      <div className="p-8 text-sky-900">
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          We couldn’t verify this flight. Please go back and check your details.
        </div>
      </div>
    );
  }

  const eligible = result.eligible;

  return (
    <div className="mx-auto max-w-3xl px-[16px] py-2 md:p-6 text-sky-900">
      {eligible ? (
        <h1 className="mb-6 text-2xl md:text-2xl font-semibold text-sky-900">
          Your flight appears eligible for compensation.
        </h1>
      ) : (
        <h1 className="mb-6 text-2xl md:text-2xl font-semibold text-sky-900">
          Not eligible for compensation under EU/UK 261.
        </h1>
      )}

      {/* FLIGHT CARD */}
<div className="mb-6 w-full rounded-xl border border-slate-200/80 bg-white p-4 md:p-6 shadow-sm">
<div className="flex min-w-0 items-center justify-between gap-3 text-sm text-slate-500">
  <span className="min-w-0 truncate">
            {flightNumber
              ? `${airlineLabel || "Airline"} · Flight ${flightNumber}`
              : "Flight details"}
          </span>

          {eligible ? (
            <span className="shrink-0 rounded-full px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700">
              ELIGIBLE
            </span>
          ) : (
        <span className="shrink-0 rounded-full px-3 py-1 text-xs font-medium bg-red-100 text-red-700">
  NOT ELIGIBLE
</span>
          )}
        </div>

        {/* ROUTE */}
        <div className="mt-4 flex min-w-0 items-center justify-between">
          <div className="min-w-0 flex-1 truncate text-lg font-semibold text-sky-900">
            {fromLabel}
          </div>

          <div className="mx-3 flex shrink-0 items-center justify-center">
            <PlaneIcon className="text-sky-500" />
          </div>

          <div className="min-w-0 flex-1 truncate text-right text-lg font-semibold text-sky-900">
            {toLabel}
          </div>
        </div>

        {/* COMPENSATION BANNER */}
<div
  className={[
    "mt-5 md:mt-4 rounded-lg px-5 py-5 bg-gradient-to-r shadow-[0_10px_30px_rgba(16,185,129,0.15)]",
    eligible ? "from-white to-emerald-50" : "from-white to-red-50",
  ].join(" ")}
>
  <div className="text-xs text-slate-500 mb-1">
    {eligible ? "Potential compensation" : "Compensation"}
  </div>
<div className="text-xs text-emerald-600 font-medium mb-1">
  You're entitled to compensation under EU law
</div>
  <div className="flex items-end gap-1">
    <span
      className={[
        "font-bold leading-none",
        "text-3xl md:text-2xl", // 👈 MOBILE större än desktop
        eligible ? "text-emerald-600" : "text-red-600",
      ].join(" ")}
    >
      €{eligible ? compEUR : 0}
    </span>

    <span className="text-sm text-slate-600">
      per passenger
    </span>
  </div>
</div>

        {/* INFO GRID */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Scheduled arrival time</div>
            <div className="mt-2 flex items-center gap-6">
              <div className="flex items-center gap-2 text-sky-900 font-medium">
                <CalendarDays className="h-5 w-5 text-slate-400" />
                <span>{scheduledParts.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sky-900 font-medium">
                <Clock className="h-5 w-5 text-slate-400" />
                <span>{scheduledParts.time}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Actual arrival time</div>
            <div className="mt-2 flex items-center gap-6">
              <div className="flex items-center gap-2 text-sky-900 font-medium">
                <CalendarDays className="h-5 w-5 text-slate-400" />
                <span>{actualParts.date}</span>
              </div>
              <div
                className={[
                  "flex items-center gap-2 font-medium",
                  delayedOver3h ? "text-red-500" : "text-sky-900",
                ].join(" ")}
              >
                <Clock
                  className={[
                    "h-5 w-5",
                    delayedOver3h ? "text-red-500" : "text-slate-400",
                  ].join(" ")}
                />
                <span>{actualParts.time}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Flight distance</div>
            <div className="mt-1 font-medium text-sky-900 flex items-center gap-2">
              <Plane className="h-5 w-5 text-slate-400" />
              <span>{distanceKm} km</span>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Total delay</div>
            <div className="mt-1 font-medium text-sky-900 flex items-center gap-2">
              <Timer className="h-5 w-5 text-slate-400" />
              <span>{delayText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM */}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-sky-900">
          Confirm your flight details
        </h2>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              setConfirm('yes');
              window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }}
            className={[
              "w-full rounded-lg border px-4 py-4 text-left transition",
              confirm === 'yes'
                ? "border-sky-500 bg-sky-50"
                : "border-slate-300 hover:border-sky-400"
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div className={[
                "h-4 w-4 rounded-full border flex items-center justify-center",
                confirm === 'yes' ? "border-sky-500" : "border-slate-300"
              ].join(" ")}>
                {confirm === 'yes' && <div className="h-2 w-2 rounded-full bg-sky-500" />}
              </div>
              <span className="font-medium text-sky-900">Yes, this is my flight</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setConfirm('no');
              window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }}
            className={[
              "w-full rounded-lg border px-4 py-4 text-left transition",
              confirm === 'no'
                ? "border-sky-500 bg-sky-50"
                : "border-slate-300 hover:border-sky-400"
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div className={[
                "h-4 w-4 rounded-full border flex items-center justify-center",
                confirm === 'no' ? "border-sky-500" : "border-slate-300"
              ].join(" ")}>
                {confirm === 'no' && <div className="h-2 w-2 rounded-full bg-sky-500" />}
              </div>
              <span className="font-medium text-sky-900">No, something is wrong</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
