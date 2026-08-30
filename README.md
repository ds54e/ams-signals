# AMS Signals

AMS Signals is a factual timeline of publicly observable RNM and mixed-signal verification activity across companies and people.

The central design principle is simple: **research can be inferential; the Golden timeline is factual.** Users should be able to inspect dated public events and source links, compare trajectories, and draw their own conclusions. Interpretation belongs in a separate analysis layer.

## Current state

The repository is private while v1.0 is being built. Public deployment is intentionally deferred until the repository is ready to be made public.

## Stack

- Astro 7
- JSON Golden events
- Markdown Analysis columns
- plain CSS
- small client-side JavaScript for timeline/search interaction
- GitHub Actions for validation/build

## Content model

Golden events live in `src/data/events/*.json` and intentionally contain no technology tags, maturity scores, or inference fields.

Each event records:

- when
- company/person references
- event form (`kind`)
- a short factual headline
- a factual description
- 1-3 public source links with a short factual summary

Analysis columns live in `src/content/analysis/*.md`. They use minimal frontmatter and ordinary Markdown, remain visibly separate from the factual surfaces, and link important foundations to stable Golden Event permalinks. `npm run check:analysis-links` verifies that those references still resolve to current Event IDs.

See `AGENTS.md` for the research and Golden-update rules.

## Local development

```bash
npm install
npm run dev
```

Before committing content:

```bash
npm run check
```

## Deployment

Deployment is not enabled yet. When the repository is made public, add or enable a GitHub Pages workflow and select GitHub Actions as the Pages source. The Astro config is already prepared for the repository path `/ams-signals`.
