"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type StepDef = {
  id: number;
  title: string;
  paths: string[];
};

const STEPS: StepDef[] = [
  { id: 1, title: "Eligibility", paths: ["direct-or-layover", "direct", "itinerary", "verify"] },
  { id: 2, title: "Passenger details", paths: ["claim"] },
  { id: 3, title: "Documents", paths: ["thanks"] },
  { id: 4, title: "Finish", paths: [] },
];

function getActiveStep(pathname: string): number {
  for (const step of STEPS) {
    if (step.paths.some((p) => pathname.includes(p))) {
      return step.id;
    }
  }
  return 1;
}

export default function CheckLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const activeStep = getActiveStep(pathname);

  const router = useRouter();

  const choice = (sp.get("choice") || "direct") as "direct" | "itinerary";

  // base: /{locale}/check
  const parts = pathname.split("/").filter(Boolean); // ["sv","check","direct-or-layover"]
  const base = parts.length >= 2 ? `/${parts[0]}/${parts[1]}` : "/check";

  const isDirectOrLayover = pathname.endsWith("/direct-or-layover");
  const isDirect = pathname.endsWith("/direct");
  const isItinerary = pathname.endsWith("/itinerary");

  // validity flags from pages (set in querystring)
  const layoversValid = sp.get("layoversValid") === "1";
  const segmentsValid = sp.get("segmentsValid") === "1";
  const directValid = sp.get("directValid") === "1";

  const canContinue =
    (isDirectOrLayover &&
      (choice === "direct" || (choice === "itinerary" && layoversValid))) ||
    (isItinerary && layoversValid && segmentsValid) ||
    (isDirect && directValid);

  const nextHref = isDirectOrLayover
    ? `${base}/${choice}?${sp.toString()}`
    : isDirect || isItinerary
    ? `${base}/verify?${sp.toString()}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F5F7] via-[#F1F3F6] to-[#ECEFF3]">
      <div className="relative flex min-h-screen">
        {/* LEFT PANEL */}
        <aside className="hidden md:flex w-[380px] flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-sky-900 px-10 py-10">
          <div>
            <div className="text-white text-lg font-semibold tracking-wide">
              FLIGHT<span className="text-emerald-400">CLAIMLY</span>
            </div>
            <div className="mt-2 text-xs text-white/60">
              Your claim progress
            </div>
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
        <main className="flex-1 px-4 py-10 md:px-10">
          <div className="mx-auto max-w-4xl">
            {/* WHITE CARD */}
            <div className="overflow-visible rounded-2xl bg-white/90 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.18)] backdrop-blur-[2px]">
              <div className="px-10 py-8">{children}</div>
            </div>

            {/* OBS ROW – ONLY ON ITINERARY */}
            {isItinerary && (
              <div className="mx-auto mt-6 w-full max-w-4xl px-2">
                <div className="flex items-start gap-3 rounded-lg bg-emerald-50 px-4 py-3 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                    !
                  </span>
                  <p className="text-sm leading-relaxed">
                    Please provide details for your <strong>original flight</strong> itinerary (not a rebooked or replacement flight).
                  </p>
                </div>
              </div>
            )}

            {/* FOOTER – OWNED BY LAYOUT */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="
                  w-44 px-5 py-4
                  text-sm font-semibold
                  text-slate-600
                  rounded-lg
                  hover:bg-white/70
                  hover:text-slate-900
                  transition
                "
              >
                Back
              </button>

              <button
                type="button"
                disabled={!canContinue}
                onClick={() => {
                  if (nextHref) router.push(nextHref);
                }}
                className={[
                  "w-44 rounded-lg px-5 py-4 text-sm font-semibold transition",
                  canContinue
                    ? "bg-emerald-400 text-slate-950 hover:bg-emerald-500 cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed",
                ].join(" ")}
              >
                Continue
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
