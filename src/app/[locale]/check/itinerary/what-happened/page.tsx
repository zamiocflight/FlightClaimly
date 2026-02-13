"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PlaneIcon from "@/components/PlaneIcon";
import { useMemo } from "react";



type Disruption = "delayed" | "cancelled" | "denied" | null;
type Outcome = "gte3" | "lt3" | "never" | null;
type CancelNotice = "lt14" | "gte14" | null;
type Volunteer = "yes" | "no" | null;

type Leg = {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
};

function parseLegsFromSearchParams(sp: ReturnType<typeof useSearchParams>): Leg[] {
  // 1) Försök läsa JSON-serialiserade legs: ?legs=[{...}, {...}]
  const legsJson = sp.get("legs");
  if (legsJson) {
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
    } catch {
      // fallthrough till fallback
    }
  }

  // 2) Fallback: bygg en leg från enkla params (direct-flöde)
  const from = sp.get("from");
  const fromCode = sp.get("fromCode");
  const to = sp.get("to");
  const toCode = sp.get("toCode");

  if (from && fromCode && to && toCode) {
    return [
      {
        id: "0",
        from,
        fromCode,
        to,
        toCode,
      },
    ];
  }

  // 3) Inget hittades
  return [];
}


export default function WhatHappenedPage() {
  const router = useRouter();
  const sp = useSearchParams();

const legs = useMemo(() => parseLegsFromSearchParams(sp), [sp]);


  const current = sp.get("disruptionType");
  const [disruption, setDisruption] = useState<Disruption>(
    current === "delayed" || current === "cancelled" || current === "denied"
      ? current
      : null
  );

  const [affectedLegId, setAffectedLegId] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [cancelNotice, setCancelNotice] = useState<CancelNotice>(null);
  const [volunteer, setVolunteer] = useState<Volunteer>(null);


 // Sync disruption to querystring
useEffect(() => {
  const qs = new URLSearchParams(sp.toString());

  // always ensure itinerary flow
  qs.set("choice", "itinerary");

  if (disruption) {
    qs.set("disruptionType", disruption);
  } else {
    qs.delete("disruptionType");
  }

  router.replace(`?${qs.toString()}`, { scroll: false });
}, [disruption, router, sp]);


useEffect(() => {
  const d = sp.get("disruptionType") as Disruption | null;
  const leg = sp.get("affectedLegId");
  const o = sp.get("outcome") as Outcome | null;
  const cn = sp.get("cancelNotice") as CancelNotice | null;
  const v = sp.get("volunteer") as Volunteer | null;

  if (d === "delayed" || d === "cancelled" || d === "denied") setDisruption(d);
  if (leg) setAffectedLegId(leg);
  if (o) setOutcome(o);
  if (cn) setCancelNotice(cn);
  if (v) setVolunteer(v);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);



  // Reset deeper steps if top changes
  useEffect(() => {
    setAffectedLegId(null);
    setOutcome(null);
    setCancelNotice(null);
    setVolunteer(null);
  }, [disruption]);

  // Reset follow-up questions if outcome changes
useEffect(() => {
  setCancelNotice(null);
  setVolunteer(null);
}, [outcome]);


  useEffect(() => {
  const qs = new URLSearchParams(sp.toString());

  if (affectedLegId) qs.set("affectedLegId", affectedLegId);
  else qs.delete("affectedLegId");

  if (outcome) qs.set("outcome", outcome);
  else qs.delete("outcome");

  if (cancelNotice) qs.set("cancelNotice", cancelNotice);
  else qs.delete("cancelNotice");

  if (volunteer) qs.set("volunteer", volunteer);
  else qs.delete("volunteer");

  router.replace(`?${qs.toString()}`, { scroll: false });
}, [affectedLegId, outcome, cancelNotice, volunteer, router, sp]);


  function goNext() {
    if (!disruption || !affectedLegId || !outcome) return;

    if (disruption === "cancelled" && !cancelNotice) return;
    if (disruption === "denied" && !volunteer) return;

    // Kopplas senare i layout
  }

  const cardBase =
    "flex items-center gap-4 rounded-lg border px-5 py-4 text-left transition bg-white h-[56px] w-full";

  const optionClass = (active: boolean) =>
    [
      cardBase,
      active
        ? "border-sky-400"
        : "border-slate-300 hover:border-sky-300",
    ].join(" ");

  const whichFlightTitle =
    disruption === "delayed"
      ? "Which flight was delayed?"
      : disruption === "cancelled"
      ? "Which flight was cancelled?"
      : "Which flight were you denied boarding on?";

  return (
    <div className="space-y-6">
      {/* STEP 1 */}
      <div>
        <h2 className="text-lg font-semibold text-sky-900">What happened?</h2>
      </div>

      <div className="space-y-2 w-full max-w-[50%]">
        {/* DELAYED */}
        <button
          type="button"
          onClick={() => setDisruption("delayed")}
          className={optionClass(disruption === "delayed")}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              disruption === "delayed" ? "border-sky-500" : "border-slate-300"
            }`}
          >
            {disruption === "delayed" && (
              <div className="h-2 w-2 rounded-full bg-sky-500" />
            )}
          </div>
          <span className="font-normal text-slate-700">
            My flight was delayed
          </span>
        </button>

        {/* CANCELLED */}
        <button
          type="button"
          onClick={() => setDisruption("cancelled")}
          className={optionClass(disruption === "cancelled")}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              disruption === "cancelled" ? "border-sky-500" : "border-slate-300"
            }`}
          >
            {disruption === "cancelled" && (
              <div className="h-2 w-2 rounded-full bg-sky-500" />
            )}
          </div>
          <span className="font-normal text-slate-700">
            My flight was cancelled
          </span>
        </button>

        {/* DENIED */}
        <button
          type="button"
          onClick={() => setDisruption("denied")}
          className={optionClass(disruption === "denied")}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              disruption === "denied" ? "border-sky-500" : "border-slate-300"
            }`}
          >
            {disruption === "denied" && (
              <div className="h-2 w-2 rounded-full bg-sky-500" />
            )}
          </div>
          <span className="font-normal text-slate-700">
            I was denied boarding
          </span>
        </button>
      </div>

      {/* STEP 2 */}
      {disruption && (
        <div className="space-y-3 pt-4">
          <h2 className="text-lg font-semibold text-sky-900">
            {whichFlightTitle}
          </h2>

          <div className="space-y-2 w-full max-w-[50%]">
            {legs.map((leg) => {
              const selected = affectedLegId === leg.id;
              return (
                <button
                  key={leg.id}
                  type="button"
                  onClick={() => setAffectedLegId(leg.id)}
                  className={optionClass(selected)}
                >
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      selected ? "border-sky-500" : "border-slate-300"
                    }`}
                  >
                    {selected && (
                      <div className="h-2 w-2 rounded-full bg-sky-500" />
                    )}
                  </div>

                  <span className="font-normal text-slate-700 flex items-center gap-2">
  <span>
 {leg.fromCode ? `${leg.from} (${leg.fromCode})` : leg.from}  </span>
  <PlaneIcon />
  <span>
    {leg.toCode ? `${leg.to} (${leg.toCode})` : leg.to}
  </span>
</span>

                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {disruption && affectedLegId && (
        <div className="space-y-3 pt-4">
         <h2 className="text-lg font-semibold text-sky-900">
  {(() => {
    const leg = legs.find((l) => l.id === affectedLegId);
    const dest = leg ? `${leg.to} (${leg.toCode})` : "your destination";
    return `How many hours late did you arrive at ${dest}?`;
  })()}
</h2>


          <div className="space-y-2 w-full max-w-[50%]">
            <button
              type="button"
              onClick={() => setOutcome("gte3")}
              className={optionClass(outcome === "gte3")}
            >
              <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                outcome === "gte3" ? "border-sky-500" : "border-slate-300"
              }`}>
                {outcome === "gte3" && <div className="h-2 w-2 rounded-full bg-sky-500" />}
              </div>
              <span className="font-normal text-slate-700">3 hours or more</span>
            </button>

            <button
              type="button"
              onClick={() => setOutcome("lt3")}
              className={optionClass(outcome === "lt3")}
            >
              <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                outcome === "lt3" ? "border-sky-500" : "border-slate-300"
              }`}>
                {outcome === "lt3" && <div className="h-2 w-2 rounded-full bg-sky-500" />}
              </div>
              <span className="font-normal text-slate-700">Less than 3 hours</span>
            </button>

            <button
              type="button"
              onClick={() => setOutcome("never")}
              className={optionClass(outcome === "never")}
            >
              <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                outcome === "never" ? "border-sky-500" : "border-slate-300"
              }`}>
                {outcome === "never" && <div className="h-2 w-2 rounded-full bg-sky-500" />}
              </div>
              <span className="font-normal text-slate-700">Never arrived</span>
            </button>
          </div>
        </div>
      )}

      {/* EXTRA STEP: CANCELLED */}
      {disruption === "cancelled" && affectedLegId && outcome && (
        <div className="space-y-3 pt-4">
          <h2 className="text-lg font-semibold text-sky-900">
            How many days before the departure were you informed about the flight change?
          </h2>

          <div className="space-y-2 w-full max-w-[50%]">
 <button
  type="button"
  onClick={() => setCancelNotice("lt14")}
  className={optionClass(cancelNotice === "lt14")}
>
  <div
    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
      cancelNotice === "lt14" ? "border-sky-500" : "border-slate-300"
    }`}
  >
    {cancelNotice === "lt14" && (
      <div className="h-2 w-2 rounded-full bg-sky-500" />
    )}
  </div>

  <span className="font-normal text-slate-700">Less than 14 days</span>
</button>



 <button
  type="button"
  onClick={() => setCancelNotice("gte14")}
  className={optionClass(cancelNotice === "gte14")}
>
  <div
    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
      cancelNotice === "gte14" ? "border-sky-500" : "border-slate-300"
    }`}
  >
    {cancelNotice === "gte14" && (
      <div className="h-2 w-2 rounded-full bg-sky-500" />
    )}
  </div>

  <span className="font-normal text-slate-700">14 days or more</span>
</button>


          </div>
        </div>
      )}

      {/* EXTRA STEP: DENIED */}
      {disruption === "denied" && affectedLegId && outcome && (
        <div className="space-y-3 pt-4">
          <h2 className="text-lg font-semibold text-sky-900">
            Did you volunteer to give up your seat in exchange for other benefits from the airline?
          </h2>

          <div className="space-y-2 w-full max-w-[50%]">
<button
  type="button"
  onClick={() => setVolunteer("yes")}
className={optionClass(volunteer === "yes")}
>
  <div
    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
      volunteer === "yes" ? "border-sky-500" : "border-slate-300"
    }`}
  >
    {volunteer === "yes" && (
      <div className="h-2 w-2 rounded-full bg-sky-500" />
    )}
  </div>

  <span className="font-normal text-slate-700">Yes</span>
</button>



<button
  type="button"
 onClick={() => setVolunteer("no")}
className={optionClass(volunteer === "no")}

>
  <div
    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
      volunteer === "no" ? "border-sky-500" : "border-slate-300"
    }`}
  >
    {volunteer === "no" && (
      <div className="h-2 w-2 rounded-full bg-sky-500" />
    )}
  </div>

  <span className="font-normal text-slate-700">No</span>
</button>


          </div>
        </div>
      )}

      {/* Footer actions are handled by layout */}
      <div className="hidden">
        <button onClick={goNext} />
      </div>
    </div>
  );
}
