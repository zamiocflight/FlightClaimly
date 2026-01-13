'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LOCALES = [
  { code: 'sv', label: 'SV' },
  { code: 'en', label: 'EN' },
  { code: 'da', label: 'DA' },
  { code: 'de', label: 'DE' },
  { code: 'pl', label: 'PL' },
  { code: 'fi', label: 'FI' },
] as const;

type LocaleCode = (typeof LOCALES)[number]['code'];

/**
 * We render flags as inline SVGs (no external CSS lib),
 * so it works одинаково in dev + production.
 */
function Flag({ locale }: { locale: LocaleCode }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block rounded-[2px] overflow-hidden"
      style={{ width: 18, height: 12, lineHeight: 0 }}
    >
      {locale === 'sv' && <FlagSE />}
      {locale === 'en' && <FlagGB />}
      {locale === 'da' && <FlagDK />}
      {locale === 'de' && <FlagDE />}
      {locale === 'pl' && <FlagPL />}
      {locale === 'fi' && <FlagFI />}
    </span>
  );
}

function FlagSE() {
  // Sweden
  return (
    <svg viewBox="0 0 22 14" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="14" fill="#006AA7" />
      <rect x="6" width="4" height="14" fill="#FECC00" />
      <rect y="5" width="22" height="4" fill="#FECC00" />
    </svg>
  );
}

function FlagDK() {
  // Denmark
  return (
    <svg viewBox="0 0 22 14" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="14" fill="#C60C30" />
      <rect x="6" width="2.6" height="14" fill="#FFFFFF" />
      <rect y="5.6" width="22" height="2.6" fill="#FFFFFF" />
    </svg>
  );
}

function FlagDE() {
  // Germany
  return (
    <svg viewBox="0 0 22 14" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="14" fill="#000000" />
      <rect y="4.6667" width="22" height="4.6667" fill="#DD0000" />
      <rect y="9.3334" width="22" height="4.6666" fill="#FFCE00" />
    </svg>
  );
}

function FlagPL() {
  // Poland
  return (
    <svg viewBox="0 0 22 14" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="7" fill="#FFFFFF" />
      <rect y="7" width="22" height="7" fill="#DC143C" />
    </svg>
  );
}

function FlagFI() {
  // Finland
  return (
    <svg viewBox="0 0 22 14" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="14" fill="#FFFFFF" />
      <rect x="6" width="3.5" height="14" fill="#003580" />
      <rect y="5.25" width="22" height="3.5" fill="#003580" />
    </svg>
  );
}

function FlagGB() {
  // UK (simplified but clean)
  return (
    <svg viewBox="0 0 22 14" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="14" fill="#012169" />
      {/* white diagonals */}
      <path d="M0 0 L2.2 0 L22 12.6 L22 14 L19.8 14 L0 1.4 Z" fill="#FFFFFF" opacity="0.95" />
      <path d="M22 0 L19.8 0 L0 12.6 L0 14 L2.2 14 L22 1.4 Z" fill="#FFFFFF" opacity="0.95" />
      {/* red diagonals */}
      <path d="M0 0 L1.4 0 L22 13.1 L22 14 L20.6 14 L0 0.9 Z" fill="#C8102E" />
      <path d="M22 0 L20.6 0 L0 13.1 L0 14 L1.4 14 L22 0.9 Z" fill="#C8102E" />
      {/* white cross */}
      <rect x="8.4" width="5.2" height="14" fill="#FFFFFF" />
      <rect y="4.4" width="22" height="5.2" fill="#FFFFFF" />
      {/* red cross */}
      <rect x="9.3" width="3.4" height="14" fill="#C8102E" />
      <rect y="5.3" width="22" height="3.4" fill="#C8102E" />
    </svg>
  );
}

function stripLocale(pathname: string) {
  const m = pathname.match(/^\/([^/]+)(\/.*)?$/);
  if (!m) return pathname;

  const maybeLocale = m[1];
  const rest = m[2] || '';

  if (LOCALES.some((l) => l.code === maybeLocale)) {
    return rest || '/';
  }
  return pathname;
}



export default function LanguageSwitcher({
  compact = false,
}: {
  compact?: boolean;
}) {
  const locale = (useLocale() as LocaleCode) ?? 'sv';
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const router = useRouter();

  const rest = stripLocale(pathname);
  const qs = searchParams?.toString();

  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  function go(next: LocaleCode) {
    const nextPath =
      `/${next}${rest === '/' ? '' : rest}` + (qs ? `?${qs}` : '');
    router.push(nextPath);
    setOpen(false);
  }

  const activeLabel =
    LOCALES.find((l) => l.code === locale)?.label ?? locale.toUpperCase();

  return (
    <div ref={ref} className="relative z-[60]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
      >
        <Flag locale={locale} />

        {/* 🔹 Visa text ENDAST om inte compact */}
        {!compact && <span>{activeLabel}</span>}

        <span className="text-slate-400">▾</span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg z-[70]"
          role="menu"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => go(l.code)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                l.code === locale
                  ? 'font-semibold text-slate-900'
                  : 'text-slate-700'
              }`}
              role="menuitem"
            >
              <span className="inline-flex items-center gap-2">
                <Flag locale={l.code} />
                <span>{l.label}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
