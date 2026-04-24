"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type StepDef = {
  id: number;
  title: string;
  paths: string[];
};

const STEPS: StepDef[] = [
  {
    id: 1,
    title: "Eligibility",
    paths: [
      "direct-or-layover",
      "direct",
      "itinerary",
      "missed-connection",
      "missed-connection-hours",
      "what-happened",
      "verify",
    ],
  },
  { id: 2, title: "Passenger details", paths: ["claim"] },
  { id: 3, title: "Documents", paths: ["thanks"] },
  { id: 4, title: "Finish", paths: [] },
];

function getActiveStep(pathname: string): number {
  for (const step of STEPS) {
    if (step.paths.some((p) => pathname.includes(p))) return step.id;
  }
  return 1;
}

function ensureLegsInQuery(sp: URLSearchParams): URLSearchParams {
  const qs = new URLSearchParams(sp.toString());

  if (!qs.get("legs")) {
    const segmentsJson = qs.get("segments");
    const layoversJson = qs.get("layovers");

    if (segmentsJson) {
      try {
        const segments = JSON.parse(segmentsJson);
        const layovers: string[] = layoversJson ? JSON.parse(layoversJson) : [];

        const fromLabel = qs.get("from"); // "Copenhagen (CPH) — Copenhagen Kastrup Airport"
        const toLabel = qs.get("to");     // "Warsaw (WAW) — Warsaw Chopin Airport"

        const parseCityAndCode = (label: string | null) => {
          if (!label) return { city: "Unknown", code: "UNK" };
          const match = label.match(/^(.+?)\s*\((\w{3})\)/);
          if (match) {
            return { city: match[1].trim(), code: match[2].trim() };
          }
          return { city: label, code: "UNK" };
        };

        const fromParsed = parseCityAndCode(fromLabel);
        const toParsed = parseCityAndCode(toLabel);

        if (Array.isArray(segments) && segments.length > 0) {
          const points: { city: string; code: string }[] = [];

          // Start
          points.push(fromParsed);

          // Layovers
          for (const stop of layovers) {
            const p = parseCityAndCode(stop);
            points.push(p);
          }

          // End
          points.push(toParsed);

          const legs = points.slice(0, -1).map((p, idx) => ({
            id: String(idx),
            from: p.city,
            fromCode: p.code,
            to: points[idx + 1].city,
            toCode: points[idx + 1].code,
          }));

          qs.set("legs", JSON.stringify(legs));
          return qs;
        }
      } catch {
        // fallthrough
      }
    }

    // Fallback för direct
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

export default function CheckLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const activeStep = getActiveStep(pathname);
  const router = useRouter();

  const choice = (sp.get("choice") || "direct") as "direct" | "itinerary";

  const passengerDetailsValid = sp.get("passengerDetailsValid") === "1";

  // ✅ ADD: authorization valid flag
  const authorizationValid = sp.get("authorizationValid") === "1";

  // base: /{locale}/check
  const parts = pathname.split("/").filter(Boolean); // ["sv","check","direct-or-layover", ...]
  const base = parts.length >= 2 ? `/${parts[0]}/${parts[1]}` : "/check";

  // --- page detection ---
  const isDirectOrLayover = pathname.endsWith("/direct-or-layover");
  const isDirect = pathname.endsWith("/direct");

  const isItinerary = pathname.endsWith("/itinerary");
  const isMissedConnection = pathname.endsWith("/itinerary/missed-connection");
  const isMissedConnectionHours = pathname.endsWith(
    "/itinerary/missed-connection-hours"
  );
  const isWhatHappened = pathname.endsWith("/itinerary/what-happened");

  const isVerify = pathname.endsWith("/verify");
  const isClaimOwner = pathname.endsWith("/claim-owner");
  const isPassengers = pathname.endsWith("/passengers");
  const isPassengerDetails = pathname.endsWith("/passenger-details");

  const isBookingReference = pathname.endsWith("/booking-reference");

  const isSignature = pathname.endsWith("/signature");
  const signatureValid = sp.get("signatureValid") === "1";

  const isUploads = pathname.endsWith("/uploads");

  // ✅ ADD: authorization page detection
  const isAuthorization = pathname.endsWith("/authorization");

  const isUploadsId = pathname.endsWith("/uploads-id");
  const isAdditional = pathname.endsWith("/additional");
  const isFinish = pathname.endsWith("/finish");

  const primaryCtaLabel = "Continue";
  

  // Verify flags (from VerifyClient)
  const verifyMatched = sp.get("verifyMatched") === "1";
  const verifyEligible = sp.get("verifyEligible") === "1";
  const verifyConfirm = sp.get("verifyConfirm"); // "yes" | null

  const verifyValid = verifyMatched && verifyEligible && verifyConfirm === "yes";

  // --- validity flags from pages (querystring) ---
  const layoversValid = sp.get("layoversValid") === "1";
  const segmentsValid = sp.get("segmentsValid") === "1";
  const directValid = sp.get("directValid") === "1";

  const bookingRefValid = sp.get("bookingRefValid") === "1";

  // Missed connection step (we treat presence of yes/no as valid)
  const missedConnection = sp.get("missedConnection"); // "yes" | "no" | null
  const missedConnectionValid =
    missedConnection === "yes" || missedConnection === "no";

  // Missed connection hours
  const missedConnectionDelayValid =
    sp.get("missedConnectionDelayValid") === "1" ||
    Boolean(sp.get("missedConnectionDelay"));

  // What happened (minimal wiring via query params)
  const disruptionType = sp.get("disruptionType"); // "delayed" | "cancelled" | "denied"
  const affectedLegId = sp.get("affectedLegId");
  const outcome = sp.get("outcome"); // "gte3" | "lt3" | "never"

  // Extra follow-ups (optional – only required for certain disruptions)
  const cancelNotice = sp.get("cancelNotice"); // "lt14" | "gte14"
  const volunteer = sp.get("volunteer"); // "yes" | "no"

  const baseWhatHappenedValid =
    Boolean(disruptionType) && Boolean(affectedLegId) && Boolean(outcome);

  const cancelledOk =
    disruptionType !== "cancelled" ||
    (cancelNotice === "lt14" || cancelNotice === "gte14");

  const deniedOk =
    disruptionType !== "denied" || (volunteer === "yes" || volunteer === "no");

  const whatHappenedValid = baseWhatHappenedValid && cancelledOk && deniedOk;

  // --- nextHref mapping ---
  const nextHref = (() => {
    // Step 0
    if (isDirectOrLayover) {
      return `${base}/${choice}?${sp.toString()}`;
    }

    // Direct path
    if (isDirect) {
      const qs = ensureLegsInQuery(new URLSearchParams(sp.toString()));
      return `${base}/verify?${qs.toString()}`;
    }

    // Itinerary path
    if (isItinerary) {
      // after segments -> missed connection question
      return `${base}/itinerary/missed-connection?${sp.toString()}`;
    }

    if (isMissedConnection) {
      if (missedConnection === "yes") {
        return `${base}/itinerary/missed-connection-hours?${sp.toString()}`;
      }
      if (missedConnection === "no") {
        const qs = ensureLegsInQuery(new URLSearchParams(sp.toString()));
        return `${base}/itinerary/what-happened?${qs.toString()}`;
      }
      return null;
    }

    if (isMissedConnectionHours) {
      const qs = ensureLegsInQuery(new URLSearchParams(sp.toString()));
      return `${base}/itinerary/what-happened?${qs.toString()}`;
    }

    if (isWhatHappened) {
      return `${base}/verify?${sp.toString()}`;
    }

    // verify -> claim owner
    if (isVerify) {
      return `${base}/claim-owner?${sp.toString()}`;
    }

    // claim owner -> passengers
    if (isClaimOwner) {
      return `${base}/passengers?${sp.toString()}`;
    }
    if (isPassengers) {
      return `${base}/passenger-details?${sp.toString()}`;
    }

    if (isPassengerDetails) {
      return `${base}/booking-reference?${sp.toString()}`;
    }

    // ✅ CHANGE: booking-reference -> authorization (instead of uploads)
    if (isBookingReference) {
      return `${base}/authorization?${sp.toString()}`;
    }


 // authorization -> ticket uploads
if (isAuthorization) {
  return `${base}/uploads?${sp.toString()}`;
}

// ticket uploads -> ID uploads
if (isUploads) {
  return `${base}/uploads-id?${sp.toString()}`;
}


// ID uploads -> additional info
if (isUploadsId) {
  return `${base}/additional?${sp.toString()}`;
}

// additional -> finish (review)
if (isAdditional) {
  return `${base}/finish?${sp.toString()}`;
}

// finish -> thanks (confirmation)
if (isFinish) {
  return `${base}/thanks?${sp.toString()}`;
}

    return null;
  })();

  // --- canContinue mapping (requires nextHref) ---
  const canContinue = Boolean(nextHref) && (() => {
    if (isDirectOrLayover) {
      return choice === "direct" || (choice === "itinerary" && layoversValid);
    }
    if (isItinerary) return layoversValid && segmentsValid;
    if (isDirect) return directValid;

    if (isMissedConnection) return missedConnectionValid;
    if (isMissedConnectionHours) return missedConnectionDelayValid;
    if (isWhatHappened) return whatHappenedValid;

    if (isVerify) return verifyValid;
    if (isBookingReference) return bookingRefValid;

    if (isUploads) return sp.get("uploadsValid") === "1";

    if (isUploadsId) return sp.get("uploadsIdValid") === "1";

    if (isAdditional) return true;

    // ✅ ADD: authorization validity
    if (isAuthorization) return authorizationValid;

    if (isPassengerDetails) return passengerDetailsValid;

 if (isClaimOwner) {
  const firstName = sp.get("firstName");
  const lastName = sp.get("lastName");
  const email = sp.get("email");

  const isValidEmail =
    email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return Boolean(
    firstName && firstName.trim() &&
    lastName && lastName.trim() &&
    isValidEmail
  );
}
    if (isPassengers) {
      const solo = sp.get("solo") === "1";
      if (solo) return true;

      const paxJson = sp.get("pax");
      if (!paxJson) return false;

      try {
        const pax = JSON.parse(paxJson) as Array<{
          firstName: string;
          lastName: string;
          email?: string;
          under18?: boolean;
        }>;

        if (!Array.isArray(pax) || pax.length === 0) return false;

        return pax.every((p) => {
          if (!p.firstName?.trim() || !p.lastName?.trim()) return false;
          if (p.under18) return true; // email optional
          return Boolean(p.email && p.email.trim());
        });
      } catch {
        return false;
      }
    }

    return false;
  })();

  return (
  <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#F4F5F7] via-[#F1F3F6] to-[#ECEFF3]">
      <div className="relative flex min-h-screen">
        {/* LEFT PANEL */}
<aside className="hidden md:flex w-[380px] flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-sky-900 px-10 py-10 sticky top-0 h-screen">          <div>
            <div className="text-white text-lg font-semibold tracking-wide">
              FLIGHT<span className="text-emerald-400">CLAIMLY</span>
            </div>
            <div className="mt-2 text-xs text-white/60">Your claim progress</div>
          </div>

          <div className="relative mt-20 pl-4">
            <div className="absolute left-[6px] top-1 bottom-1 w-px bg-white/15" />
            <div className="space-y-8">
              {STEPS.map((step) => {
                const done = step.id < activeStep;
                const active = step.id === activeStep;

                return (
                  <div key={step.id} className="relative flex items-center gap-4">
                    <div
                      className={[
                        "relative z-10 h-3 w-3 rounded-full transition",
                        active || done ? "bg-emerald-400" : "bg-white/30",
                      ].join(" ")}
                    />
                    <div
                      className={[
                        "text-sm font-medium transition",
                        active || done ? "text-white" : "text-white/50",
                      ].join(" ")}
                    >
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-16 text-xs text-white/40" />
        </aside>

        {/* RIGHT CONTENT */}
            <main className="flex-1 px-4 py-10 md:px-10 pb-28">
            <div className="mx-auto w-full max-w-[680px]">
            {/* WHITE CARD */}
            <div className="overflow-visible rounded-2xl bg-white/90 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.18)] backdrop-blur-[2px]">
              <div className="px-4 py-6 md:px-10 md:py-8">{children}</div>
            </div>

            {/* OBS ROW – ONLY ON ITINERARY */}
            {isItinerary && (
              <div className="mx-auto mt-6 w-full max-w-4xl px-2">
                <div className="flex items-start gap-3 rounded-lg bg-emerald-50 px-4 py-3 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                    !
                  </span>
                  <p className="text-sm leading-relaxed">
                    Please provide details for your <strong>original flight</strong>{" "}
                    itinerary (not a rebooked or replacement flight).
                  </p>
                </div>
              </div>
            )}

            {/* FOOTER – OWNED BY LAYOUT */}
            <div className="mt-6 hidden md:flex justify-end gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="
                  w-44 px-5 py-4
                  text-sm font-semibold
                  text-sky-600
                  rounded-lg
                  hover:bg-sky-50
                  hover:text-sky-700
                  transition
                "
              >
                Back
              </button>

              <button
                type="button"
                disabled={!canContinue}
onClick={async () => {
  if (isAuthorization) {
    window.dispatchEvent(new Event("flightclaimly-submit-authorization"));
    return;
  }

if ((window as any).fc_uploadAndContinue) {
  await (window as any).fc_uploadAndContinue();
  return;
}

  if (nextHref) router.push(nextHref);
}}
                className={[
                  "w-44 rounded-lg px-5 py-4 text-sm font-semibold transition",
                  canContinue
                    ? "bg-sky-500 text-white hover:bg-sky-600 cursor-pointer shadow-md shadow-sky-500/30 hover:shadow-lg hover:shadow-sky-500/40 transform hover:-translate-y-[1px] active:translate-y-0"
                    : "bg-slate-300 text-sky-600 cursor-not-allowed opacity-60",
                ].join(" ")}
              >
                {primaryCtaLabel}
              </button>
            </div>

<div className="md:hidden mt-2 sticky bottom-0 z-50 bg-white backdrop-blur-sm rounded-2xl p-4">
      <div className="flex items-center gap-3">
    <button
      type="button"
      onClick={() => window.history.back()}
      className="
        shrink-0 rounded-xl px-4 py-3
        text-sm font-semibold text-sky-600
        transition hover:bg-sky-50 hover:text-sky-700
      "
    >
      Back
    </button>

    <button
      type="button"
      disabled={!canContinue}
      onClick={async () => {
        if (isAuthorization) {
          window.dispatchEvent(new Event("flightclaimly-submit-authorization"));
          return;
        }

        if ((window as any).fc_uploadAndContinue) {
          await (window as any).fc_uploadAndContinue();
          return;
        }

        if (nextHref) router.push(nextHref);
      }}
      className={[
        "flex-1 rounded-xl px-6 py-3 text-base font-semibold transition-all duration-200",
        canContinue
  ? "bg-sky-600 text-white shadow-[0_10px_25px_rgba(2,132,199,0.35)] hover:scale-[1.01] active:scale-[0.98] active:bg-sky-700 animate-[pulse_0.6s_ease-in-out_1]"
          : "bg-slate-200 text-slate-400 cursor-not-allowed",
      ].join(" ")}
    >
      {primaryCtaLabel}
    </button>
  </div>
</div>

            <div className="mt-10 border-t border-slate-200 pt-6 flex items-center justify-between text-xs text-slate-500">
  <div className="flex items-center gap-8">
    <a
      href={`/${parts[0]}/contact`}
      className="hover:text-slate-700 transition"
    >
      Help
    </a>
    <a
      href={`/${parts[0]}/terms`}
      className="hover:text-slate-700 transition"
      target="_blank"
      rel="noreferrer"
    >
      Terms & Conditions
    </a>
    <a
      href={`/${parts[0]}/privacy`}
      className="hover:text-slate-700 transition"
      target="_blank"
      rel="noreferrer"
    >
      Privacy
    </a>
  </div>

  <div className="text-slate-400">
    © 2026 FLIGHTCLAIMLY
  </div>
</div>
          </div>
        </main>
      </div>
    </div>
  );
}
