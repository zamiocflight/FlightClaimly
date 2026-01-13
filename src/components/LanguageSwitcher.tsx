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
  // { code: 'nl', label: 'NL' }, // aktivera när nl är live
] as const;

type LocaleCode = (typeof LOCALES)[number]['code'];

/**
 * Map locale -> flag-icons country code (ISO 3166-1 alpha-2)
 * EN = GB (UK) enligt ditt beslut.
 */
const FLAG_BY_LOCALE: Record<LocaleCode, string> = {
  sv: 'se',
  en: 'gb',
  da: 'dk',
  de: 'de',
  pl: 'pl',
  fi: 'fi',
};

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

function Flag({ locale }: { locale: LocaleCode }) {
  const cc = FLAG_BY_LOCALE[locale];

  // flag-icons använder .fi + .fi-xx
  return (
    <span
     className={`fi fi-${cc} rounded-[2px]`}

      aria-hidden="true"
      style={{
        width: 18,
        height: 12,
        display: 'inline-block',
        // gör att flaggan inte blir “kladdig” på retina
        backgroundSize: 'cover',
      }}
    />
  );
}

export default function LanguageSwitcher() {
  const locale = (useLocale() as LocaleCode) ?? 'sv';
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const router = useRouter();

  const rest = stripLocale(pathname);
  const qs = searchParams?.toString();

  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  // Close on outside click + ESC
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
    const nextPath = `/${next}${rest === '/' ? '' : rest}` + (qs ? `?${qs}` : '');
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
        <span>{activeLabel}</span>
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
                l.code === locale ? 'font-semibold text-slate-900' : 'text-slate-700'
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
