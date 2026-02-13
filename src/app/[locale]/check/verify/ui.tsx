'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PlaneIcon from "@/components/PlaneIcon";

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
function formatDateTime(iso: string) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
    const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  } catch {
    return iso;
  }
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

  if (/\([A-Z]{3}\)/.test(clean)) {
    return clean;
  }

  if (code) {
    return `${clean} (${code})`;
  }

  return clean;
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

    if (confirm) {
      qs.set("verifyConfirm", confirm);
    } else {
      qs.delete("verifyConfirm");
    }

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

  if (loading) {
    // ändrat: text-slate-700 -> text-sky-900
    return <div className="p-8 text-sky-900">Checking flight status…</div>;
  }

  if (!result || !result.matched) {
    return (
      // ändrat: text-slate-700 -> text-sky-900
      <div className="p-8 text-sky-900">
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          We couldn’t verify this flight. Please go back and check your details.
        </div>
      </div>
    );
  }

  const eligible = result.eligible;

  return (
    // ändrat: text-slate-800 -> text-sky-900
    <div className="mx-auto max-w-3xl p-2 md:p-6 text-sky-900">
      {eligible && (
        // ändrat: text-slate-900 -> text-sky-900
        <h1 className="mb-6 text-2xl md:text-3xl font-semibold text-sky-900">
          Your flight appears eligible for compensation.
        </h1>
      )}

      {/* FLIGHT CARD */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* ändrat: text-slate-500 -> text-sky-600 */}
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{flightNumber ? `Flight ${flightNumber}` : "Flight details"}</span>
          <span className="rounded-full px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700">
            ELIGIBLE
          </span>
        </div>

        {/* ROUTE */}
        <div className="mt-4 flex items-center justify-between">
          {/* ändrat: text-slate-900 -> text-sky-900 */}
          <div className="text-lg font-semibold text-sky-900 truncate">
            {fromLabel}
          </div>

          <div className="mx-4 flex shrink-0 items-center justify-center">
            {/* ändrat: text-slate-400 -> text-sky-500 */}
            <PlaneIcon className="text-sky-500" />
          </div>

          {/* ändrat: text-slate-900 -> text-sky-900 */}
          <div className="text-lg font-semibold text-sky-900 truncate text-right">
            {toLabel}
          </div>
        </div>

        {/* COMPENSATION BANNER */}
        <div className="mt-4 rounded-lg bg-gradient-to-r from-white to-emerald-50 px-5 py-4">
          {/* ändrat: text-slate-500 -> text-sky-600 */}
          <div className="text-xs text-slate-500">Potential compensation</div>
          <div className="text-2xl font-semibold text-emerald-600">
            {/* ändrat: text-slate-600 -> text-sky-700 */}
            €{compEUR} <span className="text-sm font-medium text-slate-600">per passenger</span>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-50 p-4">
            {/* ändrat: text-slate-500 -> text-sky-600 */}
            <div className="text-xs text-slate-500">Scheduled arrival time</div>
            {/* ändrat: text-slate-900 -> text-sky-900 */}
            <div className="mt-1 font-medium text-sky-900">
              {formatDateTime(scheduledArrival)}
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Actual arrival time</div>
            <div className="mt-1 font-medium text-sky-900">
              {formatDateTime(actualArrival)}
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Flight distance</div>
            <div className="mt-1 font-medium text-sky-900">
              {distanceKm} km
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-xs text-slate-500">Total delay</div>
            <div className="mt-1 font-medium text-sky-900">
              {delayText}
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM */}
      <div className="mt-8">
        {/* ändrat: text-slate-900 -> text-sky-900 */}
        <h2 className="mb-3 text-lg font-semibold text-sky-900">
          Are these details correct?
        </h2>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setConfirm('yes')}
            className={[
              "w-full rounded-lg border px-4 py-4 text-left transition",
              confirm === 'yes'
                ? "border-sky-500"
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
              {/* ändrat: text-slate-800 -> text-sky-900 */}
              <span className="font-medium text-sky-900">Yes, this is my flight</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setConfirm('no')}
            className={[
              "w-full rounded-lg border px-4 py-4 text-left transition",
              confirm === 'no'
                ? "border-sky-500"
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
              {/* ändrat: text-slate-800 -> text-sky-900 */}
              <span className="font-medium text-sky-900">No, something is wrong</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
