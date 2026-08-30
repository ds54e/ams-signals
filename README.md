# AMS Signals

AMS Signals is a factual timeline of publicly observable RNM and mixed-signal verification activity across companies and people. It helps technical readers compare dated signals, inspect representative public sources, and form their own conclusions without company rankings or maturity scores.

## Evidence and interpretation

The Golden Timeline is factual. Every Event has a stable record with the date, source modality, linked companies or people, and one to three representative source summaries. Available originals are linked directly; retired originals remain visibly labeled as unavailable when the Event was responsibly verified.

Analysis is a separate Markdown publication layer. Columns are explicitly inferential and link important foundations back to Golden Event permalinks so a reader can follow:

`Analysis claim → Golden Event → original evidence`

An absent Golden Event means only that the current public-source review did not produce a timeline milestone. It is not evidence that a company lacks internal RNM or AMS activity.

## Maintaining the record

Golden Events live in `src/data/events/*.json`; Analysis columns live in `src/content/analysis/*.md`. Research starts from the existing timeline, follows public evidence, challenges attractive hypotheses, clusters duplicate or repeated signals, and promotes only compact milestones that add factual information. `AGENTS.md` contains the durable research, source-modality, and fact-versus-Analysis rules.

Source availability is intentionally lightweight. URLs can disappear, redirect, require login, or block automated clients after an Event is published. The repository records the last responsible check and availability state, but it is not an evidence archive or a real-time external-link monitor.

## Local development and checks

CI uses Node.js 24. Install the locked dependency tree and start Astro with:

```bash
npm ci
npm run dev
```

Run deterministic content, schema, duplicate, Analysis-reference, build, and built-link checks with:

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

No code or content reuse license has been selected. If the repository is made public in this state, it is publicly viewable, but public visibility alone does not grant permission to reuse the software, Golden compilation, or Analysis writing.
