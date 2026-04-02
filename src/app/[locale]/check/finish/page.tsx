"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const sp = useSearchParams();

  const claimId = sp.get("claimId");
  const locale =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1]
      : "sv";

  const [error, setError] = useState("");

  useEffect(() => {
    async function finalizeClaim() {
      if (!claimId) {
        setError("Missing claim ID.");
        return;
      }

      // 🔒 Skydd mot dubbelgenerering
      if (sessionStorage.getItem(`fc_authority_done_${claimId}`) === "1") {
        router.replace(`/${locale}/check/thanks?${sp.toString()}`);
        return;
      }

      try {
        // 1️⃣ Hämta signatur
        const sig =
          sessionStorage.getItem(`fc_signature_png_${claimId}`) ||
          sessionStorage.getItem("fc_signature_png");

        if (!sig) {
          throw new Error("Missing signature");
        }

        const fullName =
          `${sp.get("firstName") || ""} ${sp.get("lastName") || ""}`.trim();

        const bookingReference =
          sp.get("bookingRef") ||
          sp.get("pnr") ||
          sp.get("bookingReference") ||
          "";

        if (!fullName || !bookingReference) {
          throw new Error("Missing passenger data");
        }
        

        // 5️⃣ Redirect till thanks
        router.replace(`/${locale}/check/thanks?${sp.toString()}`);
      } catch (e) {
        setError("Something went wrong while finalizing your claim.");
      }
    }

    finalizeClaim();
  }, [claimId, router, sp, locale]);

  return (
    <div className="p-8 text-sky-900">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : (
        <div>Finalizing your claim…</div>
      )}
    </div>
  );
}