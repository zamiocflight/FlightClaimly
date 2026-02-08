"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Result = {
  iata: string;
  label: string;
};

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onSelect: (value: string) => void;   // vi skickar HELA label-strängen
  onClear?: () => void;
  variant?: "default" | "unstyled";
  hidePreview?: boolean;
  attachDropdownToParent?: boolean;
};

export default function AirportInput({
  label,
  placeholder,
  value,
  onSelect,
  onClear,
  variant = "default",
  hidePreview = false,
  attachDropdownToParent = false,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(value);
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Synca in nytt värde
  useEffect(() => {
    setQ(value || "");
    setHasUserTyped(false);
    setOpen(false);
  }, [value]);

  useEffect(() => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/airports/search?q=${encodeURIComponent(q)}`,
          { signal: ac.signal }
        );
        const json = await res.json();
        setResults(json.results || []);

        if (!hidePreview || hasUserTyped) {
          setOpen(true);
        }
      } catch {
        /* ignore */
      }
    }, 200);

    return () => clearTimeout(t);
  }, [q, hidePreview, hasUserTyped]);

  const inputClass =
    variant === "unstyled"
      ? `
        w-full h-12
        bg-transparent
        border-0
        px-0 pr-8
        text-base text-slate-900
        placeholder:text-slate-400
        focus:outline-none
        focus:ring-0
      `
      : `
        w-full h-11
        rounded-lg
        border border-slate-300
        bg-white
        px-3 pr-10
        text-base text-slate-900
        placeholder:text-slate-400
        focus:outline-none
        focus:ring-0
        focus:border-slate-900
      `;

  return (
    <div className={attachDropdownToParent ? "w-full min-w-0" : "relative w-full min-w-0"}>
      {variant !== "unstyled" && label && (
        <label className="mb-1 block text-sm font-semibold tracking-tight text-slate-900">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          className={inputClass}
          placeholder={placeholder}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setHasUserTyped(true);
          }}
          onFocus={() => {
            if (!hidePreview && q.length >= 2) setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
        />

        {/* Clear-X */}
        {q && onClear && (
          <button
            type="button"
            aria-label="Clear"
            onMouseDown={(e) => {
              e.preventDefault();
              onClear();
              setQ("");
              setOpen(false);
              setHasUserTyped(false);

              // ta bort layover från URL
              const qs = new URLSearchParams(sp.toString());
              qs.delete("layover");
              router.replace(`?${qs.toString()}`, { scroll: false });
            }}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul
          className={[
            "z-20 mt-2 max-h-64 overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg text-slate-900",
            attachDropdownToParent
              ? "absolute left-0 right-0"
              : "absolute w-full",
          ].join(" ")}
        >
          {results.map((r) => (
            <li
              key={r.iata}
              className="cursor-pointer px-4 py-2.5 text-sm text-slate-900 hover:bg-slate-100"
              onMouseDown={() => {
                // 1) sätt värdet lokalt
                onSelect(r.label);
                setQ(r.label);
                setOpen(false);
                setHasUserTyped(false);

                // 2) skriv till URL -> layouten ser layover -> Continue blir grön
                const qs = new URLSearchParams(sp.toString());
                qs.set("choice", "itinerary");
                qs.delete("layover");
                qs.append("layover", r.label);

                router.replace(`?${qs.toString()}`, { scroll: false });
              }}
            >
              {r.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
