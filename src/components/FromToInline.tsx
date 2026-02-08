"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AirportInput from "@/components/AirportInput";

export default function FromToInline() {
  const router = useRouter();
  const sp = useSearchParams();

  const from = sp.get("from") || "";
  const to = sp.get("to") || "";

  function update(param: "from" | "to", value: string) {
    const qs = new URLSearchParams(sp.toString());
    if (value) qs.set(param, value);
    else qs.delete(param);

    router.replace(`?${qs.toString()}`, { scroll: false });
  }

  // 🔒 1:1 wrapper-klasser från Direct/Layover + låst höjd + relative (för dropdown)
  const cardBase =
    "relative flex items-center gap-4 rounded-lg border px-5 py-4 text-left transition bg-white border-black/10 hover:border-black/20 h-[56px]";

return (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-sky-900">
      Where did you fly?
    </h2>

    <div className="grid gap-4 md:grid-cols-2">
      {/* DEPARTURE */}
      <div className="space-y-1">
        <div className="text-sm font-semibold text-sky-900">
          Departure airport
        </div>

        <div className={cardBase}>
          <AirportInput
            variant="unstyled"
            value={from}
            placeholder="Airport or city"
            onSelect={(label) => update("from", label)}
            onClear={() => update("from", "")}   // ✅ X-knapp aktiverad
            hidePreview
            attachDropdownToParent
          />
        </div>
      </div>

      {/* DESTINATION */}
      <div className="space-y-1">
        <div className="text-sm font-semibold text-sky-900">
          Final destination
        </div>

        <div className={cardBase}>
          <AirportInput
            variant="unstyled"
            value={to}
            placeholder="Airport or city"
            onSelect={(label) => update("to", label)}
            onClear={() => update("to", "")}     // ✅ X-knapp aktiverad
            hidePreview
            attachDropdownToParent
          />
        </div>
      </div>
    </div>
  </div>
);
}
