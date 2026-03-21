"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Pax = {
  firstName: string;
  lastName: string;
  email: string;
  under18: boolean;
};

const PER_PASSENGER = 250; // placeholder – byts till API senare

export default function PassengersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [travelingWithOthers, setTravelingWithOthers] = useState(true);
  const [passengers, setPassengers] = useState<Pax[]>([
    { firstName: "", lastName: "", email: "", under18: false },
  ]);

  // Init from query (if back/refresh)
  useEffect(() => {
    const solo = searchParams.get("solo") === "1";
    setTravelingWithOthers(!solo);

    const paxJson = searchParams.get("pax");
    if (paxJson) {
      try {
        const parsed = JSON.parse(paxJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPassengers(parsed);
        }
      } catch {
        // ignore
      }
    }
  }, [searchParams]);

  function updateQuery(next: { solo?: boolean; pax?: Pax[] }) {
    const params = new URLSearchParams(searchParams.toString());

    if (typeof next.solo === "boolean") {
      if (next.solo) {
        params.set("solo", "1");
        params.delete("pax");
      } else {
        params.delete("solo");
      }
    }

    if (next.pax) {
      params.set("pax", JSON.stringify(next.pax));
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function handleToggle(solo: boolean) {
    setTravelingWithOthers(!solo);
    if (solo) {
      updateQuery({ solo: true });
    } else {
      updateQuery({ solo: false, pax: passengers });
    }
  }

  function updatePassenger(idx: number, patch: Partial<Pax>) {
    const next = passengers.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    setPassengers(next);
    updateQuery({ pax: next });
  }

  function addPassenger() {
    const next = [
      ...passengers,
      { firstName: "", lastName: "", email: "", under18: false },
    ];
    setPassengers(next);
    updateQuery({ pax: next });
  }

  function removePassenger(idx: number) {
    const next = passengers.filter((_, i) => i !== idx);
    setPassengers(next);
    updateQuery({ pax: next });
  }

  const passengerCount = travelingWithOthers ? 1 + passengers.length : 1; // claim owner + extras
  const totalCompensation = PER_PASSENGER * passengerCount;

  return (
    <div className="mx-auto max-w-3xl px-4 py-2 text-sky-900">
      <h1 className="text-2xl font-semibold text-sky-900">Other passengers</h1>

      {/* Info banner */}
      <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-900">
        Passengers you traveled with may also be eligible for compensation.
      </div>

      {/* Radio cards */}
      <div className="mt-6 space-y-3">
        <label
          className={[
            "flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition text-sky-900",
            travelingWithOthers
              ? "border-sky-400 bg-sky-50"
              : "border-slate-300 hover:border-sky-300",
          ].join(" ")}
        >
          <input
            type="radio"
            checked={travelingWithOthers}
            onChange={() => handleToggle(false)}
          />
          <span className="font-medium">I was traveling with others</span>
        </label>

        <label
          className={[
            "flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition text-sky-900",
            !travelingWithOthers
              ? "border-sky-400 bg-sky-50"
              : "border-slate-300 hover:border-sky-300",
          ].join(" ")}
        >
          <input
            type="radio"
            checked={!travelingWithOthers}
            onChange={() => handleToggle(true)}
          />
          <span className="font-medium">I was traveling alone</span>
        </label>
      </div>

      {/* Passengers list */}
      {travelingWithOthers && (
        <div className="mt-8 space-y-6">
          {passengers.map((p, idx) => (
            <div key={idx} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-semibold text-sky-900">
                  Passenger {idx + 2}
                </div>

                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => removePassenger(idx)}
                    className="text-sm font-semibold text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-md px-2 py-1 transition"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Under 18 */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm text-sky-900">
                  <input
                    type="checkbox"
                    checked={p.under18}
                    onChange={(e) =>
                      updatePassenger(idx, { under18: e.target.checked })
                    }
                  />
                  This person is under 18
                </label>
              </div>

              {/* First name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-sky-900">
                  First name
                </label>
                <input
                  className="mt-1 w-full h-[48px] rounded-md border border-slate-300 px-3 text-slate-900 placeholder:text-slate-500 hover:border-sky-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none"
                  value={p.firstName}
                  onChange={(e) =>
                    updatePassenger(idx, { firstName: e.target.value })
                  }
                />
              </div>

              {/* Last name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-sky-900">
                  Last name
                </label>
                <input
                  className="mt-1 w-full h-[48px] rounded-md border border-slate-300 px-3 text-slate-900 placeholder:text-slate-500 hover:border-sky-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none"
                  value={p.lastName}
                  onChange={(e) =>
                    updatePassenger(idx, { lastName: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-sky-900">
                  Email{" "}
                  {p.under18 && (
                    <span className="text-xs text-slate-500">(optional)</span>
                  )}
                </label>
                <input
                  type="email"
                  className="mt-1 w-full h-[48px] rounded-md border border-slate-300 px-3 text-slate-900 placeholder:text-slate-500 hover:border-sky-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none"
                  value={p.email}
                  onChange={(e) =>
                    updatePassenger(idx, { email: e.target.value })
                  }
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addPassenger}
            className="rounded-md border border-sky-500 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-slate-100 hover:border-sky-600 hover:text-sky-800"
          >
            + Add passenger
          </button>

          {/* Compensation summary banner (Verify-style) */}
          <div className="mt-6 rounded-xl bg-emerald-50 px-6 py-5 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-600">Potential compensation</div>
              <div className="mt-1 text-3xl font-bold text-emerald-600">
                €{totalCompensation}
              </div>
              <div className="text-slate-600 text-sm">
                Total for {passengerCount} passenger
                {passengerCount > 1 ? "s" : ""}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-slate-600">Per passenger</div>
              <div className="text-xl font-semibold text-emerald-700">
                €{PER_PASSENGER}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
