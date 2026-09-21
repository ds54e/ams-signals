# CI test strategy

AMS Signals separates deterministic data/algorithm contracts from browser-only behavior so ordinary corpus growth does not require unrelated smoke-test maintenance.

## Layers

1. **Golden validation and factual policy** — `npm run validate`, `npm run lint:facts`, and duplicate review protect IDs, relationships, source shape, source modality, and factual wording.
2. **Pure contracts** — `npm run test:unit` covers reusable algorithms such as Activity Matrix banding and packing. `npm run test:golden` covers factual-export structure, exclusions, and Golden guardrails.
3. **Catalog contracts** — Analog and Digital Node tests validate catalog schema, activity snapshots, Scope, and provenance independently of rendering.
4. **Build integrity** — Astro build plus the internal-link audit verifies generated routes and cross-record relationships.
5. **Browser smoke** — Playwright verifies only behavior that needs a real rendered browser: client interaction, DOM/accessibility semantics, responsive geometry, scrolling, paint order, and visual control composition.

All blocking layers run for pull requests. Superseded runs for the same pull request are cancelled so an obsolete Chromium run does not consume the full serial smoke-test time.

## Mutable corpus values

The following are data-derived observations, not product contracts:

- total Event, Company, or Person counts;
- technical/organizational totals;
- the current number of active or singleton Companies;
- which entity currently occupies a particular recent-activity rank;
- exact Activity Matrix band widths produced by current density;
- which Company currently needs one, two, or more visual rows;
- monthly repository commit counts in a refreshed activity snapshot.

Tests should compute these values from the validated corpus or snapshot and compare rendered output with that derived expectation. They should not copy today’s values into Playwright assertions.

Exact values remain useful when they express a deliberate invariant: a named compatibility alias, an intentionally excluded fixture, a stable canonical repository identity, or a synthetic algorithm fixture.

## Content-refresh expectation

A routine Event or catalog refresh should normally change authored content and reviewed activity data only. It should pass CI without editing browser tests. A smoke-test change during a content refresh is a signal to determine whether the product contract really changed or whether the test owns a mutable snapshot by mistake.

## Regression strength

Stability does not mean weaker validation. Golden tests intentionally inject representative bad inputs into the real validators:

- an Event referring to an unknown Company;
- a hiring fact that erases job-posting source modality;
- inference wording in a factual Event.

Pure Activity Matrix tests use synthetic inputs to protect ordering, time projection, bundle formation, and collision packing. Browser tests retain the rendered interaction and layout checks that pure tests cannot replace.

## Performance policy

Do not parallelize browser smoke solely to reduce elapsed time until the tests are demonstrably independent. First keep browser coverage small and browser-specific. The GitHub Pages workflow continues to run `npm run check` against the exact `main` SHA used to create the deployment artifact.
