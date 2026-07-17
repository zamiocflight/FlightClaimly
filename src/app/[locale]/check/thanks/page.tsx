import Link from "next/link";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    claimId?: string;
  }>;
};

export default async function ThanksPage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const claimId = sp.claimId || "FC-XXXXXX";
  const t = await getTranslations({ locale, namespace: "check.thanks" });

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* Success icon */}
        <div className="mx-auto mb-6 flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
          <svg
            className="w-7 h-7 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-slate-900 mb-3">
          {t("title")}
        </h1>

        {/* Description */}
        <p className="text-slate-600 mb-6">
          {t("description")}
        </p>

        {/* Claim ID */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
          <p className="text-xs text-slate-500 mb-1">{t("claimId")}</p>
          <p className="text-lg font-semibold text-slate-900">
            {claimId}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/${claimId ? locale : "sv"}/track/${claimId}`}
          className="inline-block w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-3 rounded-lg"
        >
          {t("track")}
        </Link>

        {/* Secondary text */}
        <p className="text-xs text-slate-500 mt-5">
          {t("emailNotice")}
        </p>

        {/* Bottom reassurance */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
          {t("reassurance")}
        </div>

      </div>
    </div>
  );
}