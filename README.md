# AMS Signals

AMS Signals is a technical research site for publicly observable RNM and mixed-signal verification activity, with independent Analog/Digital project catalogs and separately authored Articles.

[Visit the site](https://ams-signals.com/) or use the deterministic [factual export](https://ams-signals.com/export.json).

## Reading the site

**Timeline** helps compare dated Company and People trajectories. **Events** is the complete chronological factual record with stable permalinks and representative public sources. Public disclosure is evidence of what was disclosed, not a company-wide maturity score; missing evidence does not establish missing internal capability.

**Analog** and **Digital** are English project indexes with primary links, design-stage Scope, reviewed public activity and optional AI-development provenance. They are independent from the Golden corpus and factual export. Runtime AI involvement and AI-assisted software construction are separate concepts.

**Articles** may interpret public research beyond Golden Events. Their bodies are author-controlled, and interpretations do not become Golden facts. They remain reachable by direct URL, but are outside primary navigation and search indexing. Main navigation is Timeline | Events | Analog | Digital.

## Local development

The checked-in CI uses Node.js 24. Install the locked dependencies and start Astro:

```bash
npm ci
npm run dev
```

The deterministic gate is `npm run check`. For local browser verification, install Chromium once and run the smoke command:

```bash
npx playwright install chromium
npm run test:smoke
```

[Testing](docs/TESTING.md) explains impact-based check selection and test ownership. [package.json](package.json) is the source of truth for component commands; manual repository-history refreshes are separate from build/check/browser work.

## Find the current source of truth

- [Product Context](PROJECT_CONTEXT.md): enduring purpose and factual/editorial boundaries.
- [Agent guidance](AGENTS.md): scoped routes, verification and authorized work boundaries.
- [Documentation map](docs/README.md): viewer, catalog, visual and testing contracts.
- [Release checklist](RELEASING.md): owner-controlled publication and production verification.

Golden data lives under `src/data/events/`, `companies/` and `people/`. Articles and catalog projects are Markdown under their respective `src/content/` collections. Catalog frontmatter and Markdown notes retain current metadata, primary evidence and reasoning; activity JSON under `src/data/` holds volatile captures. Framework code is a replaceable viewer of this knowledge.

## Deployment and analytics

`SITE` and `BASE_URL` select the build origin and base path through `src/lib/site-deployment.mjs`. The code fallback is `https://ds54e.github.io` plus `/ams-signals`; the documented production target is `https://ams-signals.com` plus `/`, selected by repository Actions Variables. Invalid explicit values fail rather than silently falling back. Use the same target for a build and its audits, for example:

```bash
SITE=https://example.com BASE_URL=/ npm run check
```

Publishing is manual, not a consequence of normal CI or merging a documentation change. The release checklist owns target checks, indexing, redirects and external production smoke tests.

Cloudflare Web Analytics is emitted only for the configured production origin. The site token served in HTML is not a Cloudflare API credential. No GA4, Google Tag Manager or additional analytics provider is installed. Production-shaped markup checks, intercepted browser smoke and live provider ingestion are distinct checks; see the release checklist. The repository analytics skill handles fresh traffic/search questions without changing tracking configuration.

## Reuse policy

No code or content reuse license has been selected. Public visibility alone does not grant permission to reuse the software, Golden compilation or site content. Choosing or changing a license remains an owner decision.
