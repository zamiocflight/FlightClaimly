import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { validAdminSession } from "@/lib/adminSession";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Admin-only, read-only integrity check. No customer document is modified.
export async function GET(req: NextRequest) {
  const session = (await cookies()).get("admin_session")?.value;
  if (!(await validAdminSession(session, process.env.ADMIN_PASSWORD))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const claimId = req.nextUrl.searchParams.get("claimId") || "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(claimId)) {
    return NextResponse.json({ error: "Invalid claim ID" }, { status: 400 });
  }
  const sb = supabaseAdmin();
  const path = `claims/${claimId}/authority.pdf`;
  const { data: evidence, error: evidenceError } = await sb
    .from("authority_signing_evidence")
    .select("pdf_sha256,signed_at_utc,signing_ip,signing_user_agent,recorded_at,pdf_size_bytes")
    .eq("claim_id", claimId)
    .eq("storage_path", path)
    .maybeSingle();
  if (evidenceError) return NextResponse.json({ error: "Evidence lookup failed" }, { status: 500 });
  if (!evidence) return NextResponse.json({ status: "unverified_legacy_or_missing_evidence" }, { status: 200, headers: { "Cache-Control": "no-store" } });

  const { data: storedPdf, error: storageError } = await sb.storage.from("attachments").download(path);
  if (storageError || !storedPdf) return NextResponse.json({ status: "missing_original", evidence }, { status: 409, headers: { "Cache-Control": "no-store" } });
  const bytes = Buffer.from(await storedPdf.arrayBuffer());
  const actualSha256 = crypto.createHash("sha256").update(bytes).digest("hex");
  const verified = actualSha256 === evidence.pdf_sha256 && bytes.byteLength === Number(evidence.pdf_size_bytes);
  return NextResponse.json({
    status: verified ? "verified" : "integrity_mismatch",
    claimId,
    storedSha256: evidence.pdf_sha256,
    actualSha256,
    signedAtUtc: evidence.signed_at_utc,
    recordedAtUtc: evidence.recorded_at,
    signingIp: evidence.signing_ip,
    signingUserAgent: evidence.signing_user_agent,
    pdfSizeBytes: bytes.byteLength,
  }, { status: verified ? 200 : 409, headers: { "Cache-Control": "no-store" } });
}
