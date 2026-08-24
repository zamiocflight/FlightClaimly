"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Eraser, PenLine } from "lucide-react";

type Props = {
  token: string;
  firstName: string;
  locale: string;
};

export default function PassengerAuthorityClient({
  token,
  firstName,
  locale,
}: Props) {
  const sigRef = useRef<SignatureCanvas | null>(null);

  const [hasSigned, setHasSigned] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  function handleBegin() {
    setIsDrawing(true);
  }

  function handleEnd() {
    setIsDrawing(false);

    const canvas = sigRef.current;

    if (canvas && !canvas.isEmpty()) {
      setHasSigned(true);
    } else {
      setHasSigned(false);
    }
  }

  function clearSignature() {
    sigRef.current?.clear();
    setHasSigned(false);
    setIsDrawing(false);
    setError("");
  }

  async function submitSignature() {
    if (!sigRef.current || sigRef.current.isEmpty()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const signatureDataUrl = sigRef.current.toDataURL("image/png");

      const res = await fetch(
        `/api/passenger-authority/${encodeURIComponent(token)}/sign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signatureDataUrl,
            locale,
          }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || "We could not save your authorisation."
        );
      }

      setCompleted(true);
    } catch (err) {
      console.error("Passenger authority signing failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "We could not save your authorisation."
      );

      setIsSubmitting(false);
    }
  }

  if (completed) {
    return (
      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-lg font-semibold text-emerald-900">
          Thank you, {firstName}.
        </h2>

        <p className="mt-2 text-sm leading-6 text-emerald-800">
          Your authorisation has been signed successfully. FlightClaimly can
          now represent you in this claim.
        </p>

        <p className="mt-3 text-sm leading-6 text-emerald-800">
          You do not need to do anything else right now.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-slate-900">
        Sign your authorisation
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Please sign below. Your signature should closely resemble the
        signature on your ID or passport.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative m-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/30">

          {!hasSigned && !isDrawing && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <PenLine className="h-5 w-5 text-slate-400" />
                </div>

                <div className="text-3xl font-light italic tracking-tight text-slate-500">
                  Click &amp; sign here
                </div>
              </div>
            </div>
          )}

          <SignatureCanvas
            ref={sigRef}
            penColor="#0f172a"
            onBegin={handleBegin}
            onEnd={handleEnd}
            canvasProps={{
              className: "w-full h-[240px] touch-none",
            }}
          />

          <div className="pointer-events-none absolute bottom-6 left-8 right-8">
            <div className="h-px bg-slate-200" />
            <div className="mt-2 h-4" />
          </div>

          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center">
            <button
              type="button"
              onClick={clearSignature}
              disabled={!hasSigned || isSubmitting}
              className={[
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                hasSigned && !isSubmitting
                  ? "text-sky-700 hover:bg-sky-50"
                  : "cursor-not-allowed text-slate-300",
              ].join(" ")}
            >
              <Eraser className="h-4 w-4" />
              Clear signature
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-600">
        By signing, you authorise FlightClaimly to represent you in this claim
        and confirm that you have reviewed the authority information above.
      </p>

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={submitSignature}
        disabled={!hasSigned || isSubmitting}
        className={[
          "mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold transition",
          hasSigned && !isSubmitting
            ? "bg-sky-700 text-white hover:bg-sky-800"
            : "cursor-not-allowed bg-slate-200 text-slate-400",
        ].join(" ")}
      >
        {isSubmitting ? "Saving authorisation..." : "Sign authorisation"}
      </button>
    </div>
  );
}