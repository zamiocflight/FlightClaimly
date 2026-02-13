"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type DelayValue =
  | "0-1"
  | "1-2"
  | "2-3"
  | "3-4"
  | "4-5"
  | "5-6"
  | "6-7"
  | "7-8"
  | "8-9"
  | "9+"
  | "never";

const OPTIONS: { value: DelayValue; label: string }[] = [
  { value: "0-1", label: "0–1 hours" },
  { value: "1-2", label: "1–2 hours" },
  { value: "2-3", label: "2–3 hours" },
  { value: "3-4", label: "3–4 hours" },
  { value: "4-5", label: "4–5 hours" },
  { value: "5-6", label: "5–6 hours" },
  { value: "6-7", label: "6–7 hours" },
  { value: "7-8", label: "7–8 hours" },
  { value: "8-9", label: "8–9 hours" },
  { value: "9+", label: "9+ hours" },
];

function ensureLegsInQuery(sp: URLSearchParams): URLSearchParams {
  const qs = new URLSearchParams(sp.toString());

  if (!qs.get("legs")) {
    const from = qs.get("from");
    const fromCode = qs.get("fromCode");
    const to = qs.get("to");
    const toCode = qs.get("toCode");

    if (from && fromCode && to && toCode) {
      const legs = [{ id: "0", from, fromCode, to, toCode }];
      qs.set("legs", JSON.stringify(legs));
    }
  }

  return qs;
}


export default function MissedConnectionHoursPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const current = sp.get("missedConnectionDelay") as DelayValue | null;
  const [value, setValue] = useState<DelayValue | null>(current);
  const [open, setOpen] = useState(false);
  const [neverArrived, setNeverArrived] = useState(current === "never");

  const wrapRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const qs = new URLSearchParams(sp.toString());

  // always ensure itinerary flow
  qs.set("choice", "itinerary");

  if (value) {
    qs.set("missedConnectionDelay", value);
    qs.set("missedConnectionDelayValid", "1");
  } else {
    qs.delete("missedConnectionDelay");
    qs.delete("missedConnectionDelayValid");
  }

  router.replace(`?${qs.toString()}`, { scroll: false });
}, [value, router, sp]);


  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

// Init state from querystring (on refresh / back)
useEffect(() => {
  const v = sp.get("missedConnectionDelay") as DelayValue | null;
  if (v) {
    setValue(v);
    setNeverArrived(v === "never");
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


function goNext() {
  if (!value) return;
  const qs = ensureLegsInQuery(new URLSearchParams(sp.toString()));
  router.push(`../what-happened?${qs.toString()}`);
}


  const FIELD_WIDTH = "max-w-[50%] w-full";
  const FIELD_ROW =
    "flex items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none";

  const selectedLabel =
    OPTIONS.find((o) => o.value === value)?.label || "";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-sky-900">
          How long was the delay at your connection?
        </h2>
      </div>

      <div className={`space-y-2 ${FIELD_WIDTH}`} ref={wrapRef}>
        <div className="text-sm font-semibold text-sky-900">
          Select delay length
        </div>

        {/* Trigger / Input */}
        <button
          type="button"
          disabled={neverArrived}
          onClick={() => setOpen((v) => !v)}
          className={`${FIELD_ROW} w-full cursor-pointer hover:border-sky-300 ${
            neverArrived ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span
            className={`${
              value && value !== "never" ? "text-sky-900" : "text-sky-900"
            } font-medium`}
          >
            {value && value !== "never"
              ? selectedLabel
              : "Select delay length"}
          </span>

          {/* Chevron */}
          <svg
            className={`h-5 w-5 text-slate-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.41 8.58a1 1 0 0 1 1.42 0L12 11.76l3.17-3.18a1 1 0 1 1 1.42 1.42l-3.88 3.88a1 1 0 0 1-1.42 0L7.41 10a1 1 0 0 1 0-1.42Z" />
          </svg>
        </button>

        {/* Dropdown */}
        {open && !neverArrived && (
          <div className="relative">
            <div className="absolute z-50 mt-2 w-full overflow-y-auto max-h-56 rounded-lg border border-slate-200 bg-white shadow-lg scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {OPTIONS.map((opt) => {
                const active = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setValue(opt.value);
                      setNeverArrived(false);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      active
                        ? "bg-sky-50 text-sky-900 font-semibold"
                        : "text-sky-900 hover:bg-sky-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Checkbox: I never arrived */}
        <label className="flex items-center gap-2 pt-2 text-sm text-sky-900 cursor-pointer">
         <input
  type="checkbox"
  checked={value === "never"}
  onChange={(e) => {
    setValue(e.target.checked ? "never" : null);
    setOpen(false);
  }}
className="
  h-4 w-4 rounded
  appearance-none
  border border-slate-300 bg-white
  hover:border-sky-300
  focus:outline-none
  cursor-pointer
  relative

  checked:border-sky-600 checked:bg-sky-600
  checked:after:content-['']
  checked:after:absolute
  checked:after:left-1/2 checked:after:top-1/2
  checked:after:h-[9px] checked:after:w-[5px]
  checked:after:-translate-x-1/2 checked:after:-translate-y-[55%]
  checked:after:rotate-45
  checked:after:border-r-2 checked:after:border-b-2
  checked:after:border-white
"




/>
          <span>I never arrived</span>
        </label>
      </div>

      {/* Footer actions are handled by layout */}
      <div className="hidden">
        <button onClick={goNext} />
      </div>
    </div>
  );
}
