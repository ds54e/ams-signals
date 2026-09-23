# AMS Signals

AMS Signals combines a factual timeline of publicly observable RNM and mixed-signal verification activity with a separate layer of researched editorial Articles. It helps technical readers compare dated signals, inspect representative public sources, and form or examine technical interpretations without turning Golden Events into company rankings or maturity scores.

## Factual evidence layer

The Golden Timeline is factual. Every Event has a stable record with the date, source modality, linked companies or people, and one to three representative source summaries. Available originals are linked directly; retired originals remain visibly labeled as unavailable when the Event was responsibly verified.

Timeline, Events, factual context pages, and the machine-readable export form the evidence layer. Readers or external tools can interpret that record and ask custom questions; inference is not committed into Golden Event facts.

An absent Golden Event means only that the current public-source review did not produce a timeline milestone. It is not evidence that a company lacks internal RNM or AMS activity.

## Researched Articles

Articles are authored Markdown documents kept separately under `src/content/articles/`. They may synthesize and interpret public research beyond the Golden corpus and may point readers to directly useful Golden Events. That relationship is intentionally one-way: factual Event pages do not reference editorial Articles. Article-specific sources remain Article references, and neither those sources nor the Article's interpretations automatically become Golden facts.

## Analog and Digital catalogs

The independent English catalogs at `/analog/` and `/digital/` cover analog/RF/AMS projects and RTL/digital projects respectively. Each provides activity-sorted Project / Scope / Activity rows in the same 920px listing width as Articles and Events, without visible column headers. A small Search and Scope filter enhances the list without adding stored or URL state. Plain-text project names are followed directly by external primary links. Vertically stacked Scope stages and the reviewed twelve-month activity band work without JavaScript. Optional AI-ASSISTED / AI-BUILT badges describe software-development contribution scope independently of runtime AI; opening a badge reveals its factual explanation and primary sources. The [complete review and shared policy](docs/AI_BUILT_REVIEW.md) define both labels. The catalogs do not depend on Golden records or Articles and do not enter the factual export. Main navigation is Timeline | Events | Analog | Digital.

The `analog` and `digital` Astro collections have their own `src/content/`, `src/lib/`, `src/pages/`, `tests/` and `docs/` directories. Activity snapshots are `src/data/analog-activity.json` and `src/data/digital-activity.json`; both pages render through `src/components/CatalogIndex.astro` and `src/styles/catalog.css`. Shared typography and layout ownership are documented in [the visual system](docs/VISUAL_SYSTEM.md). See the [Analog contract](docs/analog/README.md) and [Digital contract](docs/digital/README.md). Only the two canonical routes are supported; there are no compatibility pages or redirects.

Use `npm run validate:analog`, `npm run test:analog`, `npm run validate:digital` and `npm run test:digital`; all are included in `npm run check`. Repository-history refreshes are separate manual commands: `npm run refresh:analog-activity` and `npm run refresh:digital-activity`. They never run during a normal build or in the browser.

## Maintaining the record

Golden Events live in `src/data/events/*.json`. Research starts from the existing timeline, follows public evidence, challenges attractive hypotheses, clusters duplicate or repeated signals, and promotes only compact milestones that add factual information. `AGENTS.md` contains the durable research, source-modality, and factual-content rules.

Source availability is intentionally lightweight. URLs can disappear, redirect, require login, or block automated clients after an Event is published. The repository records the last responsible check and availability state, but it is not an evidence archive or a real-time external-link monitor.

## Machine-readable export

The validated factual corpus is generated at [`https://ams-signals.com/export.json`](https://ams-signals.com/export.json). It contains the Company and People catalogs, every Golden Event and source record, and stable Event URLs in deterministic order.

The URL can be supplied to ChatGPT or another external analysis tool for custom questions. The export contains no Articles, generated interpretation, scores, or build timestamp.

## Local development and checks

CI uses Node.js 24. Install the locked dependency tree and start Astro with:

```bash
npm ci
npm run dev
```

Run deterministic content, schema, duplicate, build, and built-link checks with:

```bash
npm run check
```

Browser smoke tests are deliberately separate from the fast content check. They build the site and exercise the preview at the configured deployment target — the legacy fallback base path `/ams-signals/` unless `SITE` and `BASE_URL` say otherwise:

```bash
npx playwright install chromium
npm run test:smoke
```

## Deployment target overrides

The code-level fallback target is `https://ds54e.github.io` with the base path `/ams-signals`. Both are resolved from the environment (`SITE` and `BASE_URL`) with validation, so an alternate target — for example the root-based production domain — can be exercised locally:

```bash
SITE=https://example.com BASE_URL=/ npm run check
SITE=https://example.com BASE_URL=/ npm run test:smoke
```

Unsetting both variables restores the fallback target. Explicitly set but invalid values fail with an explanation instead of falling back. The internal-link audit (`npm run check:internal-links`) audits whichever target the build was configured for; pass the same `SITE` / `BASE_URL` when auditing a non-default `dist/`.

The manual Pages workflow reads optional repository **Actions Variables** named `SITE` and `BASE_URL`. Production currently overrides the fallback through those variables, selecting `SITE=https://ams-signals.com` and `BASE_URL=/`, so the deployed site is served from the domain root. If the variables are ever unset, the build falls back to `https://ds54e.github.io/ams-signals/` and no workflow change is needed to move between the two. Independently of the configured target, CI continuously rebuilds and audits the root-domain shape against `https://migration-test.invalid/` with `BASE_URL=/`, so path regressions are caught without depending on the production deployment.

## Publication policy

Publication is intentionally owner-controlled. The checked-in GitHub Pages workflow runs only by manual dispatch; repository visibility, Pages configuration, deployment, and the v1.0 tag/release are separate actions.

The generated site is indexable by default. `/`, `/events/`, `/events/<id>/`, `/analog/`, `/digital/`, `/companies/<id>/` and `/people/<id>/` emit `<meta name="robots" content="index, follow">`, carry one self-referential canonical URL derived from the configured deployment target, and are advertised in `/sitemap.xml`. The researched Articles are deliberately excluded from indexing: `/articles/` and `/articles/<slug>/` stay live and reachable by direct URL — existing shared links keep working — but emit `noindex, follow` and never appear in the sitemap. `robots.txt` allows crawling and advertises the sitemap; it does not disallow `/articles/`, so crawlers can fetch those pages and read the directive for themselves. Indexing policy is not access control: it does not make a public repository, its files, commits, or pull requests undiscoverable.

See `RELEASING.md` for the short human publication sequence and post-deployment verification.

## Analytics

Production uses **Cloudflare Web Analytics**, emitted as a single beacon script from `src/layouts/BaseLayout.astro` on every built HTML page. The site token is public — it is served inside page HTML and is not a Cloudflare API credential — and the emission rule lives in `src/lib/analytics.mjs`.

The beacon is emitted **only** when the configured deployment origin is `ams-signals.com`. The code-level fallback (`https://ds54e.github.io/ams-signals/`) and the CI root-shape target (`https://migration-test.invalid/`) build uninstrumented. `tools/check-analytics.mjs` enforces this per page and is part of `npm run check`. No Google Analytics (GA4), Google Tag Manager, cookies, or other analytics provider is installed.

Verification has four levels, because an instrumented build behaves differently from an uninstrumented one:

1. **Fallback/local smoke** — `npm run test:smoke` runs against the uninstrumented fallback build; the normal suite must pass with zero beacons.
2. **Production-shaped deterministic contract** — `SITE=https://ams-signals.com BASE_URL=/ npm run check` must pass and prove every production HTML page contains exactly one correct beacon (currently 327/327). This is the authoritative statement about production markup.
3. **Deployed production browser suite** — `SITE=https://ams-signals.com BASE_URL=/ PLAYWRIGHT_BASE_URL=https://ams-signals.com/ npx playwright test` runs against the real deployed application. Playwright narrowly intercepts the exact Cloudflare analytics origins, so this suite validates the deployed application and the served beacon markup — **not** Cloudflare ingestion. The interception is deliberate: tests must not generate fake analytics traffic or depend on collector availability, and it leaves every other browser-error guard intact.
4. **Live analytics ingestion confirmation** — after deployment, open `https://ams-signals.com/` normally in a real browser with no Playwright interception, and confirm Page views and Visits begin appearing in the Cloudflare Web Analytics dashboard. This is the actual end-to-end ingestion check.

Because interception answers only those exact origins, `tests/smoke/catalog-index.ts` still observes the analytics requests and recognises them through `isAnalyticsRequest()`, while continuing to reject every other cross-origin request and every unrelated browser error.

## License

No code or content reuse license has been selected. Public visibility alone does not grant permission to reuse the software, Golden compilation, or site content.
