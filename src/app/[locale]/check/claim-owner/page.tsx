"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ClaimOwnerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";
  const email = searchParams.get("email") || "";

  const [firstNameState, setFirstNameState] = useState(firstName);
  const [lastNameState, setLastNameState] = useState(lastName);
  const [emailState, setEmailState] = useState(email);

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
        {/* First name */}
        <div>
          <label className="block text-sm font-medium text-sky-900">
            First name
          </label>
          <input
            type="text"
            value={firstNameState}
            onChange={(e) => {
              const val = e.target.value;
              setFirstNameState(val);
              updateParam("firstName", val);
            }}
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

        {/* Last name */}
        <div>
          <label className="block text-sm font-medium text-sky-900">
            Last name
          </label>
          <input
            type="text"
            value={lastNameState}
            onChange={(e) => {
              const val = e.target.value;
              setLastNameState(val);
              updateParam("lastName", val);
            }}
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

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-sky-900">
            Email
          </label>
          <input
            type="email"
            value={emailState}
            onChange={(e) => {
              const val = e.target.value;
              setEmailState(val);
              updateParam("email", val);
            }}
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
            placeholder="name@example.com"
          />

          <p className="mt-2 text-xs text-slate-400">
            We’ll use your email to keep you updated about your claim.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-sky-600 hover:underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-sky-600 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}