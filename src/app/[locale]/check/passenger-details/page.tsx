"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { Combobox } from "@headlessui/react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";



type Country = {
  code: string;
  nameEn: string;
  nameLocal: string;
};

// Minimal country list (kan utökas senare)
const COUNTRIES: Country[] = [
  { code: "SE", nameEn: "Sweden", nameLocal: "Sverige" },
  { code: "DK", nameEn: "Denmark", nameLocal: "Danmark" },
  { code: "NO", nameEn: "Norway", nameLocal: "Norge" },
  { code: "FI", nameEn: "Finland", nameLocal: "Suomi" },
  { code: "DE", nameEn: "Germany", nameLocal: "Deutschland" },
  { code: "FR", nameEn: "France", nameLocal: "France" },
  { code: "ES", nameEn: "Spain", nameLocal: "España" },
  { code: "IT", nameEn: "Italy", nameLocal: "Italia" },
  { code: "NL", nameEn: "Netherlands", nameLocal: "Nederland" },
  { code: "GB", nameEn: "United Kingdom", nameLocal: "United Kingdom" },
];

export default function PassengerDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Pre-fill name from previous step
  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";

  const [address, setAddress] = useState(searchParams.get("address") || "");
  const [address2, setAddress2] = useState(searchParams.get("address2") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [postalCode, setPostalCode] = useState(searchParams.get("postalCode") || "");
  const [state, setState] = useState(searchParams.get("state") || "");
const [phone, setPhone] = useState<string>(searchParams.get("phone") || "");

const addressRef = useRef<HTMLInputElement>(null);
const cityRef = useRef<HTMLInputElement>(null);
const postalRef = useRef<HTMLInputElement>(null);
const countryRef = useRef<HTMLInputElement>(null);
const phoneRef = useRef<HTMLInputElement>(null);

  // Country combobox
  const locale = pathname.split("/")[1]; // ex: "sv", "da"
  const defaultCountry = useMemo<Country>(() => {
    if (locale === "sv") return COUNTRIES.find((c) => c.code === "SE")!;
    if (locale === "da") return COUNTRIES.find((c) => c.code === "DK")!;
    if (locale === "no") return COUNTRIES.find((c) => c.code === "NO")!;
    if (locale === "fi") return COUNTRIES.find((c) => c.code === "FI")!;
    return COUNTRIES.find((c) => c.code === "SE")!;
  }, [locale]);

  const [countryQuery, setCountryQuery] = useState("");
  const [country, setCountry] = useState<Country | null>(defaultCountry);

  function updateQuery(patch: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(patch).forEach(([key, value]) => {
      if (value && value.trim().length > 0) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
   const isValid =
  address.trim().length > 0 &&
  city.trim().length > 0 &&
  postalCode.trim().length > 0 &&
  country !== null &&
  phone.replace(/\D/g, "").length >= 8

updateQuery({
  address,
  address2,
  city,
  postalCode,
  state,
  country: country?.nameEn || "",
  phone,
  passengerDetailsValid: isValid ? "1" : "",
});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, address2, city, postalCode, state, country, phone]);

const inputBase =
  "mt-1 w-full md:w-2/3 h-[56px] md:h-[52px] rounded-lg border border-black/10 bg-white px-5 md:px-4 text-slate-900 placeholder:text-slate-400 hover:border-sky-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition";  
  const filteredCountries =
    countryQuery.trim() === ""
      ? COUNTRIES
      : COUNTRIES.filter((c) => {
          const q = countryQuery.toLowerCase();
          return (
            c.nameEn.toLowerCase().includes(q) ||
            c.nameLocal.toLowerCase().includes(q)
          );
        });

  return (
    <div className="mx-auto max-w-3xl px-4 py-2 text-sky-900">
      {/* Header row */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-sky-900">Your contact details</h1>

        {/* Claim owner inline */}
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sky-900">Claim owner</span>
          <span className="text-slate-900">
            {firstName} {lastName}
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-sky-900">Address</label>
        <input
  ref={addressRef}
  className={inputBase}
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      cityRef.current?.focus();
    }
  }}
  placeholder="Street and number"
/>
        </div>

        {/* Address line 2 */}
        <div>
          <label className="block text-sm font-semibold text-sky-900">
            Address line 2 <span className="text-xs text-slate-500">(optional)</span>
          </label>
          <input
            className={inputBase}
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Apartment, suite, etc."
          />
        </div>

        {/* City + Postal code */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full md:w-2/3">
          <div>
            <label className="block text-sm font-semibold text-sky-900">City</label>
            <input
  ref={cityRef}
  className={inputBase.replace("md:w-2/3", "w-full")}
  value={city}
  onChange={(e) => setCity(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      postalRef.current?.focus();
    }
  }}
  placeholder="City"
/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-900">Postal code</label>
          <input
  ref={postalRef}
  className={inputBase.replace("md:w-2/3", "w-full")}
  value={postalCode}
  onChange={(e) => setPostalCode(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      countryRef.current?.focus();
    }
  }}
  placeholder="Postal code"
/>
          </div>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold text-sky-900">
            State <span className="text-xs text-slate-500">(optional)</span>
          </label>
          <input
            className={inputBase}
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State / Region"
          />
        </div>

        {/* Country (Combobox) */}
        <div>
          <label className="block text-sm font-semibold text-sky-900">Country</label>
          <div className="mt-1 w-full md:w-2/3">
            <Combobox value={country} onChange={(c: Country | null) => c && setCountry(c)}>
              <div className="relative">
              <Combobox.Input
  ref={countryRef}
  className="w-full h-[48px] rounded-lg border border-black/10 px-3 pr-10 text-slate-900 hover:border-sky-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none"
  displayValue={(c: Country | null) => (c ? c.nameEn : "")}
  onChange={(e) => setCountryQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      phoneRef.current?.focus();
    }
  }}
  placeholder="Start typing country..."
/>

                {country && (
                  <button
                    type="button"
                    onClick={() => {
                      setCountry(null);
                      setCountryQuery("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Clear country"
                  >
                    ×
                  </button>
                )}

                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white py-1 text-sm shadow-lg">
                  {filteredCountries.map((c) => (
                    <Combobox.Option
                      key={c.code}
                      value={c}
                      className={({ active }) =>
                        `cursor-pointer px-3 py-2 ${
                          active ? "bg-sky-50 text-sky-900" : "text-slate-900"
                        }`
                      }
                    >
                      <span className="font-medium">{c.nameEn}</span>
                      <span className="ml-2 text-slate-500">({c.nameLocal})</span>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>
        </div>

{/* Phone */}
<div>
  <label className="block text-sm font-semibold text-sky-900">Phone number</label>

  <div className="mt-1 w-full md:w-2/3">
    <PhoneInput
      inputRef={phoneRef}
      defaultCountry={(country?.code || "SE").toLowerCase() as any}
      value={phone}
      onChange={(value) => setPhone(value)}
      forceDialCode
      disableDialCodePrefill={false}
      className="!w-full"
      inputClassName="!w-full !h-[48px] !text-slate-900"
    />
  </div>
</div>

      </div>

<style jsx global>{`
  .react-international-phone-input-container {
    height: 48px !important;
    width: 100% !important;
    border-radius: 0.5rem !important;
    border: 1px solid rgb(0 0 0 / 0.1) !important;
    overflow: hidden !important;
    background: white !important;
  }

  .react-international-phone-country-selector-button {
    height: 48px !important;
    border: none !important;
    border-right: 1px solid rgb(0 0 0 / 0.08) !important;
    background: transparent !important;
    color: #94a3b8 !important;
  }

  .react-international-phone-input {
    height: 48px !important;
    width: 100% !important;
    border: none !important;
    background: transparent !important;
    color: #0f172a !important;
  }
`}</style>


    </div>
  );
}
