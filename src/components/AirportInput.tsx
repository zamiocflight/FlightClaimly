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

       if (hasUserTyped) {
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
        px-0 pr-10
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

function highlight(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="font-semibold text-slate-900">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function getFlag(label: string) {
  if (label.includes("Stockholm")) return "🇸🇪";
  if (label.includes("Copenhagen")) return "🇩🇰";
  if (label.includes("London")) return "🇬🇧";
  if (label.includes("Oslo")) return "🇳🇴";
  if (label.includes("Helsinki")) return "🇫🇮";
  return "✈️";
}

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
{q && (
  <button
    type="button"
    aria-label="Clear"
    onMouseDown={(e) => {
      e.preventDefault();
      onClear?.();
      setQ("");
      setOpen(false);
      setHasUserTyped(false);

      const qs = new URLSearchParams(sp.toString());
      qs.delete("layover");
      router.replace(`?${qs.toString()}`, { scroll: false });
    }}
  className="
  absolute right-[-6px] top-1/2 -translate-y-1/2
  w-6 h-6 flex items-center justify-center
  rounded-full bg-slate-200 text-slate-600 text-xs
"
  >
    ×
  </button>
)}
      </div>

      {open && results.length > 0 && (
        <ul
          className={[
            "z-20 mt-3 max-h-64 overflow-auto rounded-lg border border-slate-200 bg-white shadow-xl text-slate-900",
            attachDropdownToParent
              ? "absolute left-0 right-0"
              : "absolute w-full",
          ].join(" ")}
        >
          {results.map((r) => (
<li
  key={r.iata}
  className="
    cursor-pointer
    px-4 py-3
    text-sm text-slate-900
    transition
    hover:bg-slate-100
    active:bg-slate-200
  "              onMouseDown={(e) => {
  e.preventDefault();
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
              <div className="flex items-center gap-2">
  <span className="text-base">{getFlag(r.label)}</span>
  <span className="truncate">
    {highlight(r.label, q)}
  </span>
</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
