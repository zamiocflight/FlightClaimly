"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MissedConnectionPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const current = sp.get("missedConnection"); // "yes" | "no" | null
  const [value, setValue] = useState<"yes" | "no" | null>(
    current === "yes" || current === "no" ? current : null
  );

  useEffect(() => {
    if (!value) return;

    const qs = new URLSearchParams(sp.toString());
    qs.set("missedConnection", value);

    router.replace(`?${qs.toString()}`, { scroll: false });
  }, [value, router, sp]);

  function goNext() {
    if (!value) return;

    if (value === "yes") {
      router.push(`./missed-connection-hours?${sp.toString()}`);
    } else {
      router.push(`./what-happened?${sp.toString()}`);
    }
  }

const cardBase =
  "w-full flex items-center gap-4 rounded-lg border px-5 py-4 text-left transition bg-white h-[56px]";


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
          Did you miss a connecting flight?
        </h2>
      </div>

<div className="space-y-4 w-full md:max-w-[50%]">
        {/* NO */}
        <button
          type="button"
          onClick={() => setValue("no")}
          className={optionClass(value === "no")}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              value === "no" ? "border-sky-500" : "border-slate-300"
            }`}
          >
            {value === "no" && (
              <div className="h-2 w-2 rounded-full bg-sky-500" />
            )}
          </div>

          <span className="font-normal text-slate-900">No</span>
        </button>

        {/* YES */}
        <button
          type="button"
          onClick={() => setValue("yes")}
          className={optionClass(value === "yes")}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              value === "yes" ? "border-sky-500" : "border-slate-300"
            }`}
          >
            {value === "yes" && (
              <div className="h-2 w-2 rounded-full bg-sky-500" />
            )}
          </div>

          <span className="font-normal text-slate-900">Yes</span>
        </button>
      </div>

      {/* Footer actions are handled by layout */}
      <div className="hidden">
        {/* This button is not visible – Continue is in layout */}
        <button onClick={goNext} />
      </div>
    </div>
  );
}
