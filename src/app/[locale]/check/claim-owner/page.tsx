"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function ClaimOwnerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const firstName = searchParams.get("firstName") || "";
  const lastName = searchParams.get("lastName") || "";
  const email = searchParams.get("email") || "";

  const [firstNameState, setFirstNameState] = useState(firstName);
  const [lastNameState, setLastNameState] = useState(lastName);
  const [emailState, setEmailState] = useState(email);
  const [emailValid, setEmailValid] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function syncClaimOwnerFields() {
    const first = firstNameRef.current?.value || "";
    const last = lastNameRef.current?.value || "";
    const mail = emailRef.current?.value || "";

    setFirstNameState(first);
    setLastNameState(last);
    setEmailState(mail);

    const params = new URLSearchParams(searchParams.toString());

    if (first.trim()) {
      params.set("firstName", first);
    } else {
      params.delete("firstName");
    }

    if (last.trim()) {
      params.set("lastName", last);
    } else {
      params.delete("lastName");
    }

    if (mail.trim()) {
      params.set("email", mail);
    } else {
      params.delete("email");
    }

    router.replace(`?${params.toString()}`, { scroll: false });

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    setEmailValid(isValid);
  }

  useEffect(() => {
    const el = emailRef.current;
    if (!el) return;

    const handle = () => {
      syncClaimOwnerFields();
    };

    el.addEventListener("change", handle);
    el.addEventListener("blur", handle);

    return () => {
      el.removeEventListener("change", handle);
      el.removeEventListener("blur", handle);
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-sky-900">
        Who should receive the compensation?
      </h1>

      <div className="text-sm text-emerald-600 font-medium mt-2">
        You're just one step away from claiming your compensation
      </div>

      <div className="mt-8 space-y-8">
        {/* First name */}
        <div>
          <label className="block text-sm font-medium text-sky-900">
            First name
          </label>

          <input
            ref={firstNameRef}
            type="text"
            value={firstNameState}
            onChange={(e) => {
              const val = e.target.value;
              setFirstNameState(val);
              updateParam("firstName", val);
            }}
            onBlur={syncClaimOwnerFields}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                lastNameRef.current?.focus();
                lastNameRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }}
            className="
              mt-1 w-full md:w-2/3
              h-[56px]
              rounded-md
              border border-slate-300
              px-3
              text-[16px]
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
            Must match your ID
          </p>
        </div>

        {/* Last name */}
        <div>
          <label className="block text-sm font-medium text-sky-900">
            Last name
          </label>

          <input
            ref={lastNameRef}
            type="text"
            value={lastNameState}
            onChange={(e) => {
              const val = e.target.value;
              setLastNameState(val);
              updateParam("lastName", val);
            }}
            onBlur={syncClaimOwnerFields}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                emailRef.current?.focus();
                emailRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }}
            className="
              mt-1 w-full md:w-2/3
              h-[56px]
              rounded-md
              border border-slate-300
              px-3
              text-[16px]
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
            Please enter all your last name exactly as it appears on your ID or
            passport.
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-sky-900">
            Email
          </label>

          <div className="text-xs text-emerald-600 font-medium mb-1">
            We'll send your claim updates and payout here
          </div>

          <div className="relative w-full md:w-2/3">
            <input
              ref={emailRef}
              type="email"
              value={emailState}
              onChange={(e) => {
                const val = e.target.value;

                setEmailState(val);
                updateParam("email", val);

                const isValid =
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

                setEmailValid(isValid);
              }}
              onBlur={syncClaimOwnerFields}
              className={`
                mt-1 w-full
                h-[56px]
                rounded-md
                border ${emailValid ? "border-emerald-400" : "border-slate-300"}
                px-3 pr-10
                text-[16px]
                text-slate-900
                placeholder:text-slate-300
                hover:border-sky-400
                focus:border-sky-500 focus:ring-1 focus:ring-sky-200
                outline-none
              `}
              placeholder="name@example.com"
            />

            {emailValid && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                ✓
              </div>
            )}
          </div>

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