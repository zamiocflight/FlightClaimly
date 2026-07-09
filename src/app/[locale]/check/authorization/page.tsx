"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import SignatureCanvas from "react-signature-canvas";
import { BadgeCheck, Eraser, PenLine } from "lucide-react";

async function createClaim(searchParams: URLSearchParams, locale: string) {
  const existingId = searchParams.get("claimId");
  if (existingId) return existingId;

 const choice = searchParams.get("choice") || "direct";

const segmentsRaw = searchParams.get("segments");
const paxRaw = searchParams.get("pax");
const layoversRaw = searchParams.get("layovers");

let passengerCount = 1;

try {
  const pax = paxRaw ? JSON.parse(paxRaw) : [];
  if (Array.isArray(pax)) {
    passengerCount = 1 + pax.length;
  }
} catch {}
let firstSegment: any = null;

try {
  firstSegment = segmentsRaw ? JSON.parse(segmentsRaw)?.[0] : null;
} catch {}

const fallbackFlightNumber =
  searchParams.get("flightNumber") ||
  firstSegment?.flightNumber ||
  "ITINERARY";

const fallbackDate =
  searchParams.get("date") ||
  firstSegment?.date ||
  "";

  const res = await fetch("/api/claims", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
body: JSON.stringify({
  flightNumber: fallbackFlightNumber,
date: fallbackDate,
choice,
segments: segmentsRaw,
pax: paxRaw,
passengerCount,
layovers: layoversRaw,
  from: searchParams.get("from"),
  to: searchParams.get("to"),
  name: `${searchParams.get("firstName") || ""} ${searchParams.get("lastName") || ""}`.trim(),
  email: searchParams.get("email"),
  bookingNumber: searchParams.get("bookingRef"),
  phone: searchParams.get("phone"),
  compensationAmount: searchParams.get("amount")
  ? Number(searchParams.get("amount"))
  : undefined,

  // 🔥 DETTA VAR HELA BUGGEN
  address: searchParams.get("address"),
  address2: searchParams.get("address2"),
  city: searchParams.get("city"),
  postalCode: searchParams.get("postalCode"),
  country: searchParams.get("country"),

  locale,
}),
  });

  if (!res.ok) {
    throw new Error("Failed to create claim");
  }

  const data = await res.json();
  return data.id;
}

async function generateAuthorityAfterClaim(
  claimId: string,
  searchParams: URLSearchParams
) {
  const sig =
    sessionStorage.getItem(`fc_signature_png_${claimId}`) ||
    sessionStorage.getItem("fc_signature_png");

  if (!sig) {
    throw new Error("Missing signature");
  }

  const fullName = `${searchParams.get("firstName") || ""} ${
    searchParams.get("lastName") || ""
  }`.trim();

  const bookingReference =
    searchParams.get("bookingRef") ||
    searchParams.get("pnr") ||
    searchParams.get("bookingReference") ||
    "";

  if (!fullName || !bookingReference) {
    throw new Error("Missing authority data");
  }

  const res = await fetch("/api/authority/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      claimId,
      fullName,
      bookingReference,
      signatureDataUrl: sig,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate authority");
  }

  sessionStorage.setItem(`fc_authority_done_${claimId}`, "1");
}

export default function AuthorizationPage() {
  const t = useTranslations("check.authorization");
  const router = useRouter();
  const searchParams = useSearchParams();

  // locale from /sv/check/authorization
  const pathnameLocale =
    typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "sv";
  const locale = pathnameLocale || "sv";

  const sigRef = useRef<SignatureCanvas | null>(null);

  const continueRunningRef = useRef(false);

  const [hasSigned, setHasSigned] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const isValid = useMemo(() => {
    return hasSigned;
  }, [hasSigned]);

  useEffect(() => {
  const handler = () => {
    handleContinue();
  };

  window.addEventListener("flightclaimly-submit-authorization", handler);

  return () => {
    window.removeEventListener("flightclaimly-submit-authorization", handler);
  };
}, [handleContinue]);

  // Optional: show amount if already present in query
  const amountParam = searchParams.get("amount") || searchParams.get("compensation") || "";
  const amountLabel = amountParam ? `€${amountParam}` : t("amountFallback");

  function updateQuery(patch: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function handleBegin() {
    setIsDrawing(true);
  }

function handleEnd() {
  setIsDrawing(false);

  const signatureCanvas = sigRef.current;

  if (signatureCanvas && !signatureCanvas.isEmpty()) {
    setHasSigned(true);

    updateQuery({
      authorizationValid: "1",
    });

    const dataUrl = signatureCanvas.toDataURL("image/png");

try {
  // 🔥 alltid spara globalt först
sessionStorage.setItem("fc_signature_png", dataUrl);

const claimId = searchParams.get("claimId");

if (claimId) {
  sessionStorage.setItem(
    `fc_signature_png_${claimId}`,
    dataUrl
  );
}
} catch {}
  } else {
    setHasSigned(false);

    updateQuery({
      authorizationValid: "",
    });
  }
}

  function clearSignature() {
    sigRef.current?.clear();
    setHasSigned(false);
    setIsDrawing(false);
    updateQuery({
      authorizationValid: "",
    });
  }

async function handleContinue() {
  if (!isValid) return;

  if (continueRunningRef.current) return;
  continueRunningRef.current = true;

  try {
    const claimId = await createClaim(searchParams, locale);

    const params = new URLSearchParams(searchParams.toString());
    params.set("claimId", claimId);

    // Do not block the user while the authority PDF is generated.
    generateAuthorityAfterClaim(claimId, searchParams).catch((err) => {
      console.error("Background authority generation failed:", err);
    });

    router.push(`/${locale}/check/uploads?${params.toString()}`);
  } catch (err) {
    console.error("Claim creation failed:", err);
    alert(t("claimCreationError"));

    window.dispatchEvent(new Event("flightclaimly-submit-failed"));

    continueRunningRef.current = false;
  }
}

  // expose validity + handler to layout via query
useEffect(() => {
  if (isValid) {
    updateQuery({
      authorizationValid: "1",
    });
  }
}, [isValid]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-2 text-sky-900">

     {/* Headline + value */}
<div className="max-w-2xl">
<h1 className="text-1xl font-semibold tracking-tight text-sky-900">
  {t("titleBefore")}{" "}
<span className="text-emerald-700">{amountLabel}</span>{" "}
{t("titleAfterAmount")}
<br />
{t("titleSecondLine")}
</h1>
</div>


      {/* SIGNATURE CARD */}
      <div className="mt-6 max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Inner dashed area */}
          <div className="relative m-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/30">
            {/* Center placeholder (like AirHelp) */}
            {!hasSigned && !isDrawing && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <PenLine className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="text-4xl font-light italic tracking-tight text-slate-500">
                    {t("signaturePlaceholder")}
                  </div>
                </div>
              </div>
            )}

            {/* Canvas */}
            <SignatureCanvas
              ref={sigRef}
              penColor="#0f172a"
              onBegin={handleBegin}
              onEnd={handleEnd}
              canvasProps={{
                className: "w-full h-[240px] touch-none",
              }}
            />

          {/* Signature line inside box */}
<div className="pointer-events-none absolute bottom-6 left-8 right-8">
  <div className="h-px bg-slate-200" />
  <div className="mt-2 h-4" /> {/* Spacer to keep line position */}
</div>

            {/* Clear (inside box, bottom center) */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center">
              <button
                type="button"
                onClick={clearSignature}
                disabled={!hasSigned}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                  hasSigned
                    ? "text-sky-700 hover:bg-sky-50"
                    : "text-slate-300 cursor-not-allowed",
                ].join(" ")}
              >
                <Eraser className="h-4 w-4" />
                {t("clearSignature")}
              </button>
            </div>
          </div>
        </div>

       

{/* Legal / links */}
<div className="mt-4 max-w-2xl text-xs text-slate-700">
  {t("legal.before")}{" "}
<a
  className="font-normal text-sky-700 hover:underline"
  href={`/${locale}/terms`}
  target="_blank"
  rel="noreferrer"
>
  {t("legal.terms")}
</a>{" "}
{t("legal.and")}{" "}
<a
  className="font-normal text-sky-700 hover:underline"
  href={`/${locale}/price-list`}
  target="_blank"
  rel="noreferrer"
>
  {t("legal.priceList")}
</a>
{t("legal.middle")}{" "}
<a
  className="font-normal text-sky-700 hover:underline"
  href={`/${locale}/power-of-attorney?fullName=${encodeURIComponent(
    `${searchParams.get("firstName") || ""} ${searchParams.get("lastName") || ""}`
  )}&bookingReference=${encodeURIComponent(
    searchParams.get("bookingRef") || ""
  )}&claimId=${encodeURIComponent(
    searchParams.get("claimId") || ""
  )}`}
  target="_blank"
  rel="noreferrer"
>
  {t("legal.authorityDocument")}
  </a>
  .
</div>

{/* Signature guidance (AirHelp-style) */}
<div className="mt-8 max-w-2xl rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 flex items-start gap-3">
<span
  aria-hidden
  className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-white text-xs font-semibold"
  title={t("important")}
>
  !
</span>
  <span>
    {t("signatureGuidance")}
  </span>
</div>

<div className="mt-8 text-center">
  <div className="text-sm font-semibold text-emerald-700">
    {t("feeTitle")}
  </div>
  <div className="mt-1 text-xs text-slate-500">
    {t("feeSubtitle")}
  </div>
</div>

      </div>

      {/* keep isValid computed so layout can lock Continue */}
      <div className="mt-6 text-xs text-slate-400">{isValid ? "" : ""}</div>
    </div>
  );
}
