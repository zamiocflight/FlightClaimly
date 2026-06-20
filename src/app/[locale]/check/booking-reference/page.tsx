"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

export default function BookingReferencePage() {
  const t = useTranslations("check.bookingReference");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Prefill if coming back / refresh
  const initial = searchParams.get("bookingRef") || "";
  const [bookingRef, setBookingRef] = useState(initial);

  // simple normalization: uppercase + remove spaces
  const normalized = useMemo(() => {
    return bookingRef.toUpperCase().replace(/\s+/g, "");
  }, [bookingRef]);

  function updateParam(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    const clean = value.toUpperCase().replace(/\s+/g, "");
    const isValid = clean.length >= 5;

    if (clean.length > 0) {
      params.set("bookingRef", clean);
    } else {
      params.delete("bookingRef");
    }

    if (isValid) {
      params.set("bookingRefValid", "1");
    } else {
      params.delete("bookingRefValid");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-2 text-sky-900">
      <h1 className="text-2xl font-semibold text-sky-900">
        {t("title")}
      </h1>

      <div className="mt-5">
        <input
          value={normalized}
          onChange={(e) => {
            setBookingRef(e.target.value);
            updateParam(e.target.value);
          }}
          placeholder={t("placeholder")}
          className="mt-1 w-full md:w-2/3 h-[56px] rounded-md border border-slate-300 px-3 text-[16px] text-slate-900 placeholder:text-slate-300 hover:border-sky-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none"
        />
      </div>

      <details className="mt-4 w-full md:w-2/3">
        <summary className="cursor-pointer select-none flex items-center gap-2 font-semibold text-sky-900 hover:text-sky-700 transition">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-sky-500 text-sky-500 text-xs font-bold">
            ?
          </span>
          <span>{t("helpTitle")}</span>
        </summary>

        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <p>
            {t("helpText1")}
          </p>
          <p>
            {t("helpText2")}
          </p>
          <p className="text-slate-500">
           {t("examples")} <span className="font-medium">DS27K3</span>,{" "}
            <span className="font-medium">YLEHPW</span>
          </p>
        </div>
      </details>
    </div>
  );
}