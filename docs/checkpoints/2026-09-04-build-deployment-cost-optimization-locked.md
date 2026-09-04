# Build / Deployment Cost Optimization — LOCKED

Date: **2026-09-04**

Status: **LOCKED / GREEN**

## Decision

Keep **full SSG for production** and use **preview-only static sampling with on-demand fallback** for the high-volume Flight Number and Route detail cohorts.

Do not move production to ISR/on-demand at this checkpoint. Production SEO behavior remains full static generation while Preview deployments avoid prerendering the complete programmatic corpus.

## Implemented strategy

### Preview Flight Number detail

When `VERCEL_ENV=preview`, `generateStaticParams()` samples the first **24 publishable Flight Number entities**. With EN + SV publication this produces **48 sampled Flight Number detail paths**. `dynamicParams = true` allows valid unsampled Flight Number slugs to render on demand.

Non-preview builds continue to return the complete publishable Flight Number cohort.

### Preview Route detail

When `VERCEL_ENV=preview`, `generateStaticParams()` samples the first **24 Route entities**. `dynamicParams = true` allows valid unsampled Route slugs to render on demand.

Non-preview builds continue to return the complete Route cohort.

### Docs-only Vercel skip

Repository root contains executable `ignore-build-step.sh`.

Vercel Project Settings → Build and Deployment → Ignored Build Step is configured to:

```bash
bash ignore-build-step.sh
```

Behavior verified locally:

- application-affecting latest commit → `EXIT=1` → proceed with Vercel build
- documentation/Markdown-only latest commit → `EXIT=0` → skip Vercel build

## Verification

### Preview build

`VERCEL_ENV=preview npm run build` — **PASS**

- Next.js 15.5.7
- compile/type validation — PASS
- static generation — **691 / 691**
- Flight Number detail sample — 48 paths
- Route detail sample — 24 paths

Compared with the secured production baseline of 9,442 static pages, Preview prerender count is reduced by approximately **92.7%**. This is a prerender-count reduction, not a claim of identical percentage reduction in Vercel billing or CPU time.

### Unsampled Flight Number fallback

A valid Flight Number outside the preview sample, `A31124`, was rendered through the local production-preview server.

Verified:

- page renders successfully on demand
- Swedish title/meta/canonical/hreflang — PASS
- localized body labels including `Snabbfakta`, `Flygpassagerares rättigheter`, `Passagerarrättigheter för A31124`, `Varierar` — PASS

### Unsampled Route fallback

A guaranteed valid Route outside the first 24 preview samples was selected from canonical Route data:

`/en/routes/oslo-airport-to-porto-airport`

After removing the Route detail page's conflicting explicit `dynamic = "force-static"` and `revalidate = false` exports while retaining `dynamicParams = true`:

- HTTP status — **200**
- rendered title — `Oslo to Porto flight compensation`
- canonical generation — PASS

The local canonical host appeared as `http://localhost:3000` because `.env.local` explicitly sets `NEXT_PUBLIC_APP_URL` and `APP_URL` to that local base URL. This is expected local-environment behavior and not a Route regression.

### Vercel Preview

Optimization/fallback fix commit `66b2786938d3cd5ebb3064ee43cb4f446ef06c1f` received **Vercel success** status.

### Localization regression audit

`npm run audit:localization` — **PASS**

Audit confirmed canonical fallback isolation, quality gates, publishable-only hreflang, Swedish Flight Number localization, and EU261/UK261 compensation profiles.

### Final production-mode build

`npm run build` — **PASS**

- static generation — **9,442 / 9,442**
- Flight Number detail — **5,682 paths** = 2,841 EN + 2,841 SV
- Route detail — **3,141 paths**

Therefore preview sampling does **not** reduce or alter the secured production SSG corpus.

## Locked architecture

```text
Production
  → full publishable Flight Number SSG
  → full Route SSG
  → existing SEO HTML / metadata / canonical / hreflang / sitemap behavior preserved

Preview
  → small deterministic static sample
  → valid unsampled Flight Number and Route pages render on demand

Docs-only Git commit
  → Vercel Ignored Build Step returns 0
  → deployment build skipped
```

## Guardrails

- Do not change production to ISR/on-demand merely to chase build savings.
- Revisit production hybrid rendering only when production build duration/cost becomes materially problematic and after equivalent SEO/runtime proof.
- Keep preview sampling deterministic and sufficiently representative for QA.
- Preserve `dynamicParams = true` for sampled dynamic detail cohorts unless the rendering strategy is deliberately redesigned.
- Preserve publishable-locale quality gates for canonical/hreflang/sitemap exposure.
- Do not mix unrelated Claims/Reijo local work into SEO/deployment commits.

## Outcome

**Build / Deployment Cost Optimization is LOCKED.**

The secured Swedish SEO production baseline remains unchanged while routine Preview deployment work is substantially lighter and docs-only commits can avoid Vercel builds entirely.

## Exact next step

Begin **Danish Flight Number Localization v1** independently from canonical facts. Do not translate Danish from Swedish. Keep DA non-publishable until Danish market SEO copy, legal terminology, metadata, rendered QA, localization audit, canonical/hreflang/sitemap exposure, and final build gates pass.
