"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  X,
  ArrowRight,
  SkipForward,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";


const ACCEPTED_EXT = ["pdf", "jpg", "jpeg", "png"];
const MAX_FILE_MB = 10; // per file
const MAX_TOTAL_MB = 25; // total

const HIGH_DOC_AIRLINES = ["FR", "W6"]; // Ryanair, Wizz (v1)
const MEDIUM_DOC_AIRLINES = ["LH", "LX", "OS", "SN", "U2"]; // Lufthansa group + easyJet (v1)

function getDocTier(code: string) {
  const c = (code || "").toUpperCase();
  if (HIGH_DOC_AIRLINES.includes(c)) return "high" as const;
  if (MEDIUM_DOC_AIRLINES.includes(c)) return "medium" as const;
  return "low" as const;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function getExt(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}


export default function ClientUploads() {
  const t = useTranslations("check.uploads");
  const router = useRouter();
  const sp = useSearchParams();

  const claimId = sp.get("claimId") || "";

    const airlineCode = sp.get("airlineCode") || "";
  const docTier = getDocTier(airlineCode);

  // locale from /sv/check/uploads
  const pathnameLocale =
    typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "sv";
  const locale = pathnameLocale || "sv";

  const finishHref = `/${locale}/check/thanks?${sp.toString()}`;

  function updateQuery(patch: Record<string, string>) {
  const params = new URLSearchParams(sp.toString());
  Object.entries(patch).forEach(([k, v]) => {
    if (v) params.set(k, v);
    else params.delete(k);
  });
  router.replace(`?${params.toString()}`, { scroll: false });
}

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [authorityReady, setAuthorityReady] = useState(false);
  const authorityRunningRef = useRef(false);
  const ensureAuthorityRanRef = useRef(false);

  const totalBytes = useMemo(
    () => files.reduce((sum, f) => sum + f.size, 0),
    [files]
  );

  const hasFiles = files.length > 0;

 useEffect(() => {
  async function ensureAuthority() {
  if (ensureAuthorityRanRef.current) return;

    console.log("🧪 DEBUG SIGNATURE", {
  claimId,
  claimKey: `fc_signature_png_${claimId}`,
  claimSig: sessionStorage.getItem(`fc_signature_png_${claimId}`),
  globalSig: sessionStorage.getItem("fc_signature_png"),
});

    if (authorityRunningRef.current) return;
    authorityRunningRef.current = true;
console.log("🧪 ensureAuthority TRIGGER");
    console.log("🚀 ensureAuthority RUN", claimId);

    if (!claimId) return;

    ensureAuthorityRanRef.current = true;

  // undvik att köra flera gånger
  if (sessionStorage.getItem(`fc_authority_done_${claimId}`) === "1") {
    console.log("🚀 ensureAuthority RUN", claimId);
    setAuthorityReady(true);
    return;
  }


  if (authorityReady) return;

   let sig =
  sessionStorage.getItem(`fc_signature_png_${claimId}`) ||
  sessionStorage.getItem("fc_signature_png");

// 🔥 OM fallback användes → migrera till rätt key
if (sig && !sessionStorage.getItem(`fc_signature_png_${claimId}`)) {
  sessionStorage.setItem(`fc_signature_png_${claimId}`, sig);
}

if (!sig) {
  setAuthorityReady(true);
  return;
}

    const fullName = `${sp.get("firstName") || ""} ${sp.get("lastName") || ""}`.trim();
    const bookingReference = sp.get("bookingRef") || sp.get("pnr") || sp.get("bookingReference") || "";

    if (!fullName || !bookingReference) {
      setAuthorityReady(true);
      return;
    }

   

    // 1) Generate PDF
    const pdfRes = await fetch("/api/authority/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        bookingReference,
        claimId,
        signatureDataUrl: sig,
      }),
    });

    if (!pdfRes.ok) {
      setAuthorityReady(true);
      return;
    }


    sessionStorage.setItem(`fc_authority_done_${claimId}`, "1");
    setAuthorityReady(true);
  }

  ensureAuthority();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [claimId]);

  useEffect(() => {
  updateQuery({ uploadsValid: hasFiles ? "1" : "" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [hasFiles]);

  const validation = useMemo(() => {
    if (files.length === 0) return { ok: true, msg: "" };

    // ext
    for (const f of files) {
      const ext = getExt(f.name);
      if (!ACCEPTED_EXT.includes(ext)) {
        return {
          ok: false,
          msg: t("errors.unsupportedFormat", { file: f.name })
        };
      }
    }

    // per-file size
    const maxFileBytes = MAX_FILE_MB * 1024 * 1024;
    for (const f of files) {
      if (f.size > maxFileBytes) {
        return {
          ok: false,
          msg: t("errors.fileTooLarge", {
  file: f.name,
  max: MAX_FILE_MB
})
        };
      }
    }

    // total size
    const maxTotalBytes = MAX_TOTAL_MB * 1024 * 1024;
    if (totalBytes > maxTotalBytes) {
      return {
        ok: false,
        msg: t("errors.totalTooLarge", {
  max: MAX_TOTAL_MB
})
      };
    }

    return { ok: true, msg: "" };
  }, [files, totalBytes]);

  function onBrowseClick() {
    inputRef.current?.click();
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;

    const incoming = Array.from(fileList);

    // clear previous error if user tries again
    setError("");

    setFiles((prev) => {
      // Prevent exact duplicates (same name + size)
      const key = (f: File) => `${f.name}:${f.size}`;
      const existing = new Set(prev.map(key));
      const next = [...prev];
      for (const f of incoming) {
        if (!existing.has(key(f))) next.push(f);
      }
      return next;
    });
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setError("");
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function onDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

function goNext() {
  router.push(`/${locale}/check/uploads-id?${sp.toString()}`);
}

function stopLayoutProcessing() {
  window.dispatchEvent(new Event("flightclaimly-submit-failed"));
}

async function uploadFileDirect(file: File) {
  const presignRes = await fetch(`/api/claims/${claimId}/attachments/presign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type || "application/octet-stream",
    }),
  });

  if (!presignRes.ok) {
    throw new Error("Presign failed");
  }

  const { url, path, contentType } = await presignRes.json();

  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": contentType || file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Direct upload failed");
  }

  return {
    path,
    filename: file.name,
    size: file.size,
    contentType: file.type || "application/octet-stream",
  };
}

async function uploadAndContinue() {
  if (!claimId) {
    setError(t("errors.missingClaim"));
    stopLayoutProcessing();
    return;
  }

  if (!hasFiles) {
    goNext();
    return;
  }

  if (!validation.ok) {
    setError(validation.msg);
    stopLayoutProcessing();
    return;
  }

  try {
    setLoading(true);
    setError("");

    const uploaded = [];

    for (const file of files) {
      const result = await uploadFileDirect(file);
      uploaded.push(result);
    }

    const metadataRes = await fetch(`/api/claims/${claimId}/attachments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: uploaded }),
    });

    if (!metadataRes.ok) {
      throw new Error("Metadata save failed");
    }

    goNext();
  } catch {
    setError(t("errors.uploadFailed"));

    stopLayoutProcessing();
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  (window as any).fc_uploadAndContinue = uploadAndContinue;

  return () => {
    delete (window as any).fc_uploadAndContinue;
  };
}, [uploadAndContinue]);

  // If user lands here without claimId, still render clean + helpful
  const claimMissing = !claimId;

useEffect(() => {
  (window as any).fc_uploadAndContinue = uploadAndContinue;
}, [uploadAndContinue]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-2 text-sky-900">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-sky-900">{t("title")}</h1>

        <p className="mt-2 text-slate-700">
          {t("description.before")}{" "}
<strong>{t("description.boardingPass")}</strong>,
{" "}
{t("description.middle")}
<strong>{t("description.faster")}</strong>.
{" "}
{t("description.expenses")}
<strong>{t("description.moreMoney")}</strong>
{t("description.after")}
        </p>

        {/* Drop zone */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={[
            "mt-6 rounded-2xl border-2 border-dashed p-6 md:p-8 transition",
            "bg-white shadow-sm",
            dragActive ? "border-sky-400 ring-2 ring-sky-100" : "border-slate-200",
          ].join(" ")}
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={[
                "flex h-12 w-12 items-center justify-center rounded-2xl transition",
                dragActive ? "bg-sky-50" : "bg-slate-50",
              ].join(" ")}
            >
              <UploadCloud className="h-6 w-6 text-sky-700" />
            </div>

            <div className="mt-4 text-base font-semibold text-sky-900">
  <span className="hidden sm:inline">
    {t("dropzone.dragDrop")}
  </span>

 <span className="sm:hidden">
  {t("dropzone.takePhoto")}
</span>
</div>

<div className="mt-1 text-sm text-slate-600">
  <span className="hidden sm:inline">{t("dropzone.or")}</span>

<span className="sm:hidden">
  {t("dropzone.camera")}
</span>
</div>

<button
  type="button"
  onClick={onBrowseClick}
  className="
    mt-4 inline-flex items-center justify-center
    rounded-xl border border-sky-500
    px-5 py-3
    text-sm font-semibold text-sky-700
    hover:bg-sky-50 transition
    sm:px-4 sm:py-2
  "
>
  <span className="hidden sm:inline">{t("dropzone.browse")}</span>
  <span className="sm:hidden">{t("dropzone.uploadPhoto")}</span>
</button>

            <div className="mt-3 text-xs text-slate-300">
              {t("dropzone.fileLimits", {
  perFile: MAX_FILE_MB,
  total: MAX_TOTAL_MB
})}
            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        {error && (
  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
    {error}
  </div>
)}

        {/* Files list */}
        {files.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">
                {t("attachedFiles")}
              </div>
              <div className="text-xs text-slate-500">
                {t("totalSize", { size: formatBytes(totalBytes) })}
              </div>
            </div>

            <ul className="mt-3 space-y-2">
              {files.map((f, idx) => (
                <li
                  key={`${f.name}-${idx}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
                      <FileText className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">
                        {f.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatBytes(f.size)}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition"
                    aria-label={t("removeFile")}
                    title={t("remove")}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}


      </div>
    </div>
  );
}