
import { NextResponse } from 'next/server';
import { precheckStub } from '@/lib/precheck';

type Verdict = 'eligible' | 'not_eligible' | 'uncertain';
type Confidence = 'high' | 'medium' | 'low';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      from,
      to,
      date,
      flightNumber,
      issueType,
      delayBucket,
      flightType, // 'direct' | 'connecting'
    } = body as {
      from?: string;
      to?: string;
      date?: string;
      flightNumber?: string;
      issueType?: 'cancelled' | 'delayed' | 'denied' | 'other';
      delayBucket?: 'lt_3h' | 'gte_3h' | 'never_arrived';
      flightType?: 'direct' | 'connecting';
    };

    if (!from || !to || !date || !flightNumber || !issueType) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Saknar fält',
          details: { required: ['from', 'to', 'date', 'flightNumber', 'issueType'] },
        },
        { status: 400 }
      );
    }

    // 🔹 locale (som innan)
    const referer = req.headers.get('referer') || '';
    const localeMatch = referer.match(/\/(sv|en|da|de|pl|fi)(\/|$)/);
    const locale = localeMatch?.[1] ?? 'en';

    // ===== MVP-LOGIK (deterministisk) =====
    let verdict: Verdict = 'uncertain';
    let reasonCode = 'UNCERTAIN_INSUFFICIENT_DATA';
    let reason = 'We need more information to assess eligibility.';
    let dataConfidence: Confidence = 'low';
    let amountHint: number | undefined;

    if (issueType === 'cancelled') {
      verdict = 'eligible';
      reasonCode = 'ELIGIBLE_CANCELLATION';
      reason = 'Cancelled flights are typically eligible under EU261.';
      dataConfidence = 'high';
      amountHint = 400;
    }

    if (issueType === 'denied') {
      verdict = 'eligible';
      reasonCode = 'ELIGIBLE_DENIED_BOARDING';
      reason = 'Denied boarding is typically eligible under EU261.';
      dataConfidence = 'high';
      amountHint = 400;
    }

    if (issueType === 'delayed') {
      if (delayBucket === 'lt_3h') {
        verdict = 'not_eligible';
        reasonCode = 'NOT_ELIGIBLE_SHORT_DELAY';
        reason = 'Delays under 3 hours are not eligible under EU261.';
        dataConfidence = 'high';
      } else if (delayBucket === 'gte_3h' || delayBucket === 'never_arrived') {
        verdict = 'eligible';
        reasonCode = 'ELIGIBLE_LONG_DELAY';
        reason = 'Delays of 3 hours or more may be eligible under EU261.';
        dataConfidence = 'high';
        amountHint = 400;
      }
    }

    if (flightType === 'connecting') {
      verdict = verdict === 'not_eligible' ? verdict : 'uncertain';
      reasonCode = 'UNCERTAIN_CONNECTION';
      reason = 'Connecting flights require additional assessment.';
      dataConfidence = 'medium';
    }

    return NextResponse.json({
      ok: true,
      verdict,
      reasonCode,
      reason,
      dataConfidence,
      amountHint,
      // bakåtkompatibelt (kan tas bort senare)
      eligible: verdict === 'eligible',
      locale,
    });
  } catch (e) {
    console.error('POST /precheck error', e);
    return NextResponse.json({ ok: false, error: 'Serverfel' }, { status: 500 });
  }
}
