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

        // 2️⃣ Generera PDF
        const pdfRes = await fetch("/api/authority/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            bookingReference,
            claimId,
            signatureDataUrl: sig,
          }),
        });

        if (!pdfRes.ok) {
          throw new Error("Failed to generate PDF");
        }

        const pdfBlob = await pdfRes.blob();

        // 3️⃣ Ladda upp PDF som attachment
        const formData = new FormData();
        formData.append(
          "files",
          new File([pdfBlob], `authority-${claimId}.pdf`, {
            type: "application/pdf",
          })
        );

        await fetch(`/api/claims/${claimId}/attachments`, {
          method: "POST",
          body: formData,
        });

        // 🔒 Markera att Authority är genererad
        sessionStorage.setItem(`fc_authority_done_${claimId}`, "1");

        // 4️⃣ Rensa signatur ur sessionStorage
        sessionStorage.removeItem(`fc_signature_png_${claimId}`);
        sessionStorage.removeItem("fc_signature_png");

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