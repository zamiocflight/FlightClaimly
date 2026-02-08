// src/app/[locale]/check/page.tsx
import { redirect } from "next/navigation";

export default async function CheckIndexPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const from = typeof sp.from === "string" ? sp.from : "";
  const to = typeof sp.to === "string" ? sp.to : "";

  const qs = new URLSearchParams();
  if (from) qs.set("from", from);
  if (to) qs.set("to", to);

  redirect(`/check/direct-or-layover?${qs.toString()}`);
}
