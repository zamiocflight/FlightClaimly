"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Disruption = "delayed" | "cancelled" | "denied" | null;

export default function WhatHappenedPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const current = sp.get("disruptionType"); // "delayed" | "cancelled" | "denied" | null
  const [value, setValue] = useState<Disruption>(
    current === "delayed" || current === "cancelled" || current === "denied"
      ? current
      : null
  );

  useEffect(() => {
    if (!value) return;

    const qs = new URLSearchParams(sp.toString());
    qs.set("disruptionType", value);

    router.replace(`?${qs.toString()}`, { scroll: false });
  }, [value, router, sp]);

  function goNext() {
    if (!value) return;
    // Nästa steg kopplas senare via layout
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-sky-900">
          What happened?
        </h2>
      </div>

      <div className="space-y-4 w-full max-w-[50%]">
        {/* DELAYED */}
        <button
          type="button"
          onClick={() => setValue("delayed")}
          className={optionClass(value === "delayed")}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              value === "delayed" ? "border-sky-500" : "border-slate-300"
            }`}
          >
            {value === "delayed" && (
              <div className="h-2 w-2 rounded-full bg-sky-500" />
            )}
          </div>

          <span className="font-semibold text-slate-900">
            My flight was delayed
          </span>
        </button>

        {/* CANCELLED */}
        <button
          type="button"
          onClick={() => setValue("cancelled")}
          className={optionClass(value === "cancelled")}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              value === "cancelled" ? "border-sky-500" : "border-slate-300"
            }`}
          >
            {value === "cancelled" && (
              <div className="h-2 w-2 rounded-full bg-sky-500" />
            )}
          </div>

          <span className="font-semibold text-slate-900">
            My flight was cancelled
          </span>
        </button>

        {/* DENIED BOARDING */}
        <button
          type="button"
          onClick={() => setValue("denied")}
          className={optionClass(value === "denied")}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              value === "denied" ? "border-sky-500" : "border-slate-300"
            }`}
          >
            {value === "denied" && (
              <div className="h-2 w-2 rounded-full bg-sky-500" />
            )}
          </div>

          <span className="font-semibold text-slate-900">
            I was denied boarding
          </span>
        </button>
      </div>

      {/* Footer actions are handled by layout */}
      <div className="hidden">
        <button onClick={goNext} />
      </div>
    </div>
  );
}
