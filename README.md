# AMS Signals

AMS Signals combines a factual timeline of publicly observable RNM and mixed-signal verification activity with a separate layer of researched editorial Articles. It helps technical readers compare dated signals, inspect representative public sources, and form or examine technical interpretations without turning Golden Events into company rankings or maturity scores.

## Factual evidence layer

The Golden Timeline is factual. Every Event has a stable record with the date, source modality, linked companies or people, and one to three representative source summaries. Available originals are linked directly; retired originals remain visibly labeled as unavailable when the Event was responsibly verified.

Timeline, Events, factual context pages, and the machine-readable export form the evidence layer. Readers or external tools can interpret that record and ask custom questions; inference is not committed into Golden Event facts.

An absent Golden Event means only that the current public-source review did not produce a timeline milestone. It is not evidence that a company lacks internal RNM or AMS activity.

## Researched Articles

Articles are authored Markdown documents kept separately under `src/content/articles/`. They may synthesize and interpret public research beyond the Golden corpus and may point readers to directly useful Golden Events. That relationship is intentionally one-way: factual Event pages do not reference editorial Articles. Article-specific sources remain Article references, and neither those sources nor the Article's interpretations automatically become Golden facts.

## Maintaining the record

Golden Events live in `src/data/events/*.json`. Research starts from the existing timeline, follows public evidence, challenges attractive hypotheses, clusters duplicate or repeated signals, and promotes only compact milestones that add factual information. `AGENTS.md` contains the durable research, source-modality, and factual-content rules.

Source availability is intentionally lightweight. URLs can disappear, redirect, require login, or block automated clients after an Event is published. The repository records the last responsible check and availability state, but it is not an evidence archive or a real-time external-link monitor.

## Machine-readable export

The validated factual corpus is generated at [`https://ds54e.github.io/ams-signals/export.json`](https://ds54e.github.io/ams-signals/export.json). It contains the Company and People catalogs, every Golden Event and source record, and stable Event URLs in deterministic order.

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

Browser smoke tests are deliberately separate from the fast content check. They build the production site and exercise the preview under `/ams-signals/`:

```bash
npx playwright install chromium
npm run test:smoke
```

## Publication policy

Publication is intentionally owner-controlled. The checked-in GitHub Pages workflow runs only by manual dispatch; repository visibility, Pages configuration, deployment, and the v1.0 tag/release are separate actions. The generated site retains `noindex, nofollow`: this limits intentional search-engine indexing, but it is not access control and does not make a public repository undiscoverable.

See `RELEASING.md` for the short human publication sequence and post-deployment verification.

## License

No code or content reuse license has been selected. Public visibility alone does not grant permission to reuse the software, Golden compilation, or site content.
