"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("check.finish");
  const router = useRouter();
  const sp = useSearchParams();

  const hasRunRef = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function finalizeClaim() {
      if (hasRunRef.current) return;
      hasRunRef.current = true;

      const claimId = sp.get("claimId");

      const locale =
        typeof window !== "undefined"
          ? window.location.pathname.split("/")[1]
          : "sv";

      if (!claimId) {
        setError(t("errors.missingClaimId"));
        return;
      }

      try {
        if (sessionStorage.getItem(`fc_finish_email_sent_${claimId}`) !== "1") {
          const res = await fetch(`/api/claims/${claimId}/finish`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ locale }),
          });

          if (!res.ok) {
            throw new Error("Finish email failed");
          }

          sessionStorage.setItem(`fc_finish_email_sent_${claimId}`, "1");
        }

        router.replace(`/${locale}/check/thanks?${sp.toString()}`);
      } catch (e) {
        console.error("Finish failed:", e);
        setError(t("errors.finalizeFailed"));
        hasRunRef.current = false;
      }
    }

    finalizeClaim();
  }, [router, sp, t]);

  return (
    <div className="p-8 text-sky-900">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : (
        <div>{t("finalizing")}</div>
      )}
    </div>
  );
}