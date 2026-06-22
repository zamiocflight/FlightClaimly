"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import AirportInput from "@/components/AirportInput";

export default function FromToInline() {
  const router = useRouter();
  const sp = useSearchParams();
  const t = useTranslations("check.directOrLayover");

  const from = sp.get("from") || "";
  const to = sp.get("to") || "";

  function update(param: "from" | "to", value: string) {
  const currentChoice = sp.get("choice") || "direct";

  const qs = new URLSearchParams(sp.toString());

  if (value) qs.set(param, value);
  else qs.delete(param);

  qs.set("choice", currentChoice);

  // Route changed, so old downstream validation should not survive
  qs.delete("directValid");
  qs.delete("verifyMatched");
  qs.delete("verifyEligible");
  qs.delete("verifyConfirm");
  qs.delete("legs");

  // Only clear itinerary-specific data if user is currently direct
  if (currentChoice === "direct") {
    qs.delete("layoversValid");
    qs.delete("layovers");
    qs.delete("segments");
    qs.delete("segmentsValid");
  }

  router.replace(`?${qs.toString()}`, { scroll: false });
}

  const cardBase =
    "relative flex items-center gap-4 rounded-lg border px-5 py-4 text-left transition bg-white border-black/10 hover:border-black/20 h-[56px]";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-sky-900">
        {t("routeTitle")}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-sky-900">
            {t("fromLabel")}
          </div>

          <div className={cardBase}>
            <AirportInput
              variant="unstyled"
              value={from}
              placeholder={t("airportOrCity")}
              onSelect={(label) => update("from", label)}
              onClear={() => update("from", "")}
              hidePreview
              attachDropdownToParent
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-semibold text-sky-900">
            {t("toLabel")}
          </div>

          <div className={cardBase}>
            <AirportInput
              variant="unstyled"
              value={to}
              placeholder={t("airportOrCity")}
              onSelect={(label) => update("to", label)}
              onClear={() => update("to", "")}
              hidePreview
              attachDropdownToParent
            />
          </div>
        </div>
      </div>
    </div>
  );
}