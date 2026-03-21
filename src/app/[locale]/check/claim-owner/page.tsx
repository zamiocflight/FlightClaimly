"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ClaimOwnerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-sky-900">
        Your name as on your ID or passport
      </h1>

      <div className="mt-8 space-y-8">
        <div>
          <label className="block text-sm font-medium text-sky-900">
            First name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => updateParam("firstName", e.target.value)}
className="
  mt-1 w-2/3
  h-[48px]
  rounded-md
  border border-slate-300
  px-3
  text-slate-900
  placeholder:text-slate-300
  hover:border-sky-400
  focus:border-sky-500 focus:ring-1 focus:ring-sky-200
  outline-none
  leading-[38px]
"


            placeholder="First name"
          />
          <p className="mt-2 text-xs text-slate-400">
            Please enter your first name exactly as it appears on your ID or passport.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-sky-900">
            Last name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => updateParam("lastName", e.target.value)}
className="
  mt-1 w-2/3
  h-[48px]
  rounded-md
  border border-slate-300
  px-3
  text-slate-900
  placeholder:text-slate-300
  hover:border-sky-400
  focus:border-sky-500 focus:ring-1 focus:ring-sky-200
  outline-none
  leading-[38px]
"

            placeholder="Last name"
          />
          <p className="mt-2 text-xs text-slate-400">
            Please enter all your last name exactly as it appears on your ID or passport.
          </p>
        </div>
      </div>
    </div>
  );
}
