"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import FromToInline from "@/components/FromToInline";
import AirportInput from "@/components/AirportInput";

type Choice = "direct" | "itinerary" | null;

export default function DirectOrLayoverUI() {
  const router = useRouter();
  const sp = useSearchParams();

  const from = sp.get("from") || "";
  const to = sp.get("to") || "";

  const [choice, setChoice] = useState<Choice>("direct");

  // Layovers state
  const [layovers, setLayovers] = useState<string[]>([""]);

  const allLayoversFilled = useMemo(() => {
    if (choice !== "itinerary") return true;
    return layovers.length > 0 && layovers.every((v) => v.trim().length > 0);
  }, [choice, layovers]);

  // Sync validity to URL so layout can enable Continue
  useEffect(() => {
    if (choice !== "itinerary") return;

    const hasAtLeastOne = layovers.some((v) => v.trim().length > 0);

    const qs = new URLSearchParams(sp.toString());
    qs.set("choice", "itinerary");
    qs.set("layoversValid", hasAtLeastOne ? "1" : "0");
    qs.set("layovers", JSON.stringify(layovers.filter(Boolean)));

    router.replace(`?${qs.toString()}`, { scroll: false });
  }, [choice, layovers, router, sp]);

  function setLayoverAt(i: number, value: string) {
    setLayovers((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  function addLayover() {
    setLayovers((prev) => [...prev, ""]);
  }

  function removeLayover(i: number) {
    setLayovers((prev) => {
      const next = prev.filter((_, idx) => idx !== i);
      return next.length === 0 ? [""] : next;
    });
  }

  function clearLayover(i: number) {
    setLayovers((prev) => {
      const next = [...prev];
      next[i] = "";
      return next;
    });
  }

  function goNext(next: Choice) {
  if (!next) return;

  const qs = new URLSearchParams(sp.toString());
  if (from) qs.set("from", from);
  if (to) qs.set("to", to);

  if (next === "itinerary") {
    qs.set("choice", "itinerary");
    qs.set("layoversValid", allLayoversFilled ? "1" : "0");
    qs.set("layovers", JSON.stringify(layovers.filter(Boolean)));
  } else {
    qs.set("choice", "direct");   // 👈 LÄGG TILL DENNA RAD
    qs.delete("layoversValid");
    qs.delete("layovers");
  }

  router.push(`/check/${next}?${qs.toString()}`);
}


  const cardBase =
    "flex items-center gap-4 rounded-lg border px-5 py-4 text-left transition bg-white border-black/10 hover:border-sky-400 h-[56px]";

  return (
    <div className="space-y-8">
      <FromToInline />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

    

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-sky-900">
          Was this a direct flight?
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              setChoice("direct");
              goNext("direct");
            }}
            className={[
              "flex items-center gap-4 rounded-lg border px-5 py-4 text-left transition",
              choice === "direct"
                ? "border-sky-400 ring-2 ring-sky-200"
                : "border-black/10 bg-white hover:border-sky-400",
            ].join(" ")}
          >
            <div
              className={[
                "flex h-4 w-4 items-center justify-center rounded-full border",
                choice === "direct"
                  ? "border-sky-500"
                  : "border-black/30",
              ].join(" ")}
            >
              {choice === "direct" && (
                <div className="h-2 w-2 rounded-full bg-sky-500" />
              )}
            </div>
            <div className="font-semibold text-slate-950">Direct flight</div>
          </button>

          <button
            type="button"
            onClick={() => {
              setChoice("itinerary");
            }}
            className={[
              "flex items-center gap-4 rounded-lg border px-5 py-4 text-left transition",
              choice === "itinerary"
                ? "border-sky-400 ring-2 ring-sky-200"
                : "border-black/10 bg-white hover:border-sky-400",
            ].join(" ")}
          >
            <div
              className={[
                "flex h-4 w-4 items-center justify-center rounded-full border",
                choice === "itinerary"
                  ? "border-sky-500"
                  : "border-black/30",
              ].join(" ")}
            >
              {choice === "itinerary" && (
                <div className="h-2 w-2 rounded-full bg-sky-500" />
              )}
            </div>
            <div className="font-semibold text-slate-950">With layovers</div>
          </button>
        </div>

        {/* LAYOVERS */}
        {choice === "itinerary" && (
          <div className="mt-6 grid gap-4 md:grid-cols-1">
            <div>
              <h3 className="text-lg font-semibold text-sky-900">
                Where did you have a connection?
              </h3>
            </div>

            {layovers.map((value, idx) => (
              <div key={idx}>
                <div className="mb-1 text-sm font-semibold text-sky-900">
                  {idx + 1}. City or airport name
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={
                      cardBase +
                      " w-full relative md:max-w-[calc(50%-0.5rem)]"
                    }
                  >
                    <AirportInput
                      variant="unstyled"
                      value={value}
                      placeholder="e.g. London or LHR"
                      hidePreview={false}
                      attachDropdownToParent={true}
                      onSelect={(fullLabel) => {
                        setLayoverAt(idx, fullLabel);
                      }}
                      onClear={() => clearLayover(idx)}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeLayover(idx)}
                    className="text-slate-500 hover:text-slate-900 text-xl leading-none px-2"
                    aria-label="Remove layover"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div>
              <button
                type="button"
                onClick={addLayover}
                className="text-emerald-600 font-semibold hover:underline"
              >
                + Add another airport
              </button>

              {!allLayoversFilled && (
                <div className="mt-2 text-sm text-slate-500">
                  Add at least one connection airport to continue.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
