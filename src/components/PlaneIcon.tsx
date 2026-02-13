import React from "react";

type PlaneIconProps = {
  className?: string;
};

export default function PlaneIcon({ className = "" }: PlaneIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 text-slate-400 rotate-90 ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21 16v-2l-8-5V3.5c0-.8-.7-1.5-1.5-1.5S10 2.7 10 3.5V9L2 14v2l8-1.5V20l-2 1.5V23l3.5-1 3.5 1v-1.5L13 20v-5.5L21 16z" />
    </svg>
  );
}
