# AMS Signals

AMS Signals is a technical research site for public RNM and mixed-signal verification activity, with independent Analog and Digital project catalogs.

[Visit the site](https://ams-signals.com/) or use the deterministic [factual export](https://ams-signals.com/export.json).

## Reading the site

**Timeline** compares dated Company and People trajectories. **Events** provides the complete chronological factual record, stable permalinks and representative public sources. Public disclosure establishes what was disclosed, not company-wide maturity or private capability.

**Analog** and **Digital** are English project indexes with primary links, design-stage Scope, reviewed public activity and optional AI-development provenance. They are independent from the Golden corpus and factual export. Runtime AI involvement and AI-assisted software construction are separate concepts.

Primary navigation is Timeline | Events | Analog | Digital. Event, Company and Person detail pages provide evidence and context.

## Development and verification

Use Node.js 24 and the locked dependencies:

```bash
npm ci
npm run dev
```

`npm run check` validates content, runs contract tests, builds the site and audits its links, indexing and analytics markup. Viewer/navigation changes also use the local browser suite:

```bash
npx playwright install chromium
npm run test:smoke
```

[Testing](docs/TESTING.md) owns check selection. [package.json](package.json) owns executable commands. Activity refreshes are manual networked operations, separate from builds and tests.

## Repository structure

- `src/data/events/`, `companies/`, `people/`: Golden factual records.
- `src/content/analog/`, `digital/`: catalog metadata and current source-backed implementation/classification notes.
- `src/data/*-activity.json`: reviewed catalog activity captures.
- `src/lib/`: factual transforms, catalog contracts and shared presentation helpers.
- `src/components/`, `pages/`, `scripts/`, `styles/`: Astro views and browser behavior.
- `tools/`: validation, build-output audits and manual refresh commands.
- `tests/`: deterministic contracts and Chromium interaction/visual tests.

[Product Context](PROJECT_CONTEXT.md) explains intent and research boundaries. [Agent guidance](AGENTS.md) routes task-specific instructions. [Documentation map](docs/README.md) identifies each current contract.

## Deployment and analytics

Production is `https://ams-signals.com/`, published through manual GitHub Pages Actions with `SITE=https://ams-signals.com` and `BASE_URL=/`. [RELEASING.md](RELEASING.md) owns the exact-SHA CI gate, target verification, deployment and live smoke checks.

`src/lib/site-deployment.mjs` resolves the build origin/base for Astro and audits. Its unset-variable fallback is `https://ds54e.github.io/ams-signals/`; invalid explicit values fail. Keep the same settings for a build and its audits:

```bash
SITE=https://ams-signals.com BASE_URL=/ npm run check
```

Cloudflare Web Analytics is emitted only for the production origin. The served site token is public, not an API credential. Markup verification, intercepted browser smoke and provider-side ingestion are separate checks. The repository analytics skill handles fresh readership/search metrics; account settings remain owner-controlled.

## Reuse policy

No code or content reuse license has been selected. Public visibility alone does not grant permission to reuse the software, Golden compilation or site content. Choosing or changing a license remains an owner decision.
