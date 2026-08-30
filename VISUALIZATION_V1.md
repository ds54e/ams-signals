# AMS Signals v1 — Visualization / UX Pass

Temporary implementation brief. Remove after the visualization PR is merged and durable UI principles, if any, are folded into `PROJECT_CONTEXT.md` or `AGENTS.md`.

Read `PROJECT_CONTEXT.md` and `AGENTS.md` first.

## Goal

Turn the current factual corpus into a useful, enjoyable technology-intelligence viewer without changing the research model.

The repository now contains roughly 37 Golden events across 17 companies plus one People record. Use the real data to drive design decisions.

The core question is not “can we render the events?” It is:

> Can a technically sophisticated reader quickly notice temporal patterns, compare companies, inspect evidence, and form their own questions without the UI implying rankings or unsupported conclusions?

## Hard boundary

This is primarily a presentation-layer pass.

Do not redesign the Golden Event model, introduce technology tags, maturity scores, company rankings, semantic classification, a database, or runtime AI summaries.

Do not modify factual Event content merely to make the visualization easier, except to correct a genuine factual/data defect discovered during implementation.

Preserve the current lightweight stack: Astro, plain CSS, and small client-side JavaScript/TypeScript.

Avoid introducing React, a dashboard framework, or a large visualization dependency unless the existing approach demonstrably cannot meet the v1 requirements.

## Use the actual corpus

Evaluate the interface with the current data, including:

- Apple’s relatively dense 2018–2026 record;
- Analog Devices and Texas Instruments historical publication-heavy records;
- recent hiring-heavy Skyworks / Renesas / SiTime records;
- sparse companies such as Sony Semiconductor Solutions and OMNIVISION;
- ecosystem/vendor events involving Cadence, Siemens EDA, and Synopsys;
- the shared UVM-MS standards event;
- the single current People timeline.

Do not hide sparse companies just to make the interface look balanced.

## Primary user workflows

The v1 UI should make these workflows straightforward.

### 1. Browse the landscape

A user opens AMS Signals and should be able to see that different companies have public events at different times without first understanding the data model.

The timeline remains the primary view.

### 2. Focus on a company

A user should be able to focus on one or several companies without losing temporal context.

Examples:

- Apple vs SiTime vs Skyworks
- Analog Devices vs Texas Instruments
- Renesas vs SiTime around the timing-business transition

Do not turn selection into a ranking UI.

### 3. Search as a lens

Search remains the substitute for permanent technology tags.

Queries such as:

- `model validation`
- `RNM`
- `PLL`
- `UVM`
- `EEnet`
- `full-chip`
- `AI`

should visibly reduce the timeline to matching factual events and make the surviving pattern easy to inspect.

Keep search lexical/simple for v1. Do not silently introduce semantic expansion.

### 4. Inspect a factual event

From a timeline mark, the user should quickly see:

- date / date precision;
- event kind;
- company/person context;
- headline;
- factual description;
- source title(s);
- source availability status;
- link to the stable Event permalink;
- link to the original source when available.

The reader should not need to navigate away just to understand why a point exists.

### 5. Move from company to evidence

Company pages should feel like factual chronological records, not generic company profiles.

The user should be able to scan the company’s events and open any source easily.

### 6. People timeline

Keep People first-class even though the current dataset is sparse.

The UI should degrade gracefully with only one People record today and scale to many later.

A future `Companies + People` view should remain understandable without implying causation between a person move and company events.

## Timeline design

Use the existing horizontal desktop timeline as a starting point, not a constraint.

Evaluate it critically with all 17 companies.

### Desktop

The final v1 experience should:

- preserve a real horizontal time axis;
- keep company labels readable;
- support many company lanes without becoming a wall of dots;
- clearly show selected / filtered events;
- make the active event visually obvious;
- avoid encoding unsupported “strength” or “maturity” through size or position;
- allow the user to focus on a subset of companies when needed;
- avoid accidental overlap when several events occur near the same date;
- remain usable over the current 2014–2026 span.

A vertically scrollable set of company lanes is acceptable. Do not compress the display so aggressively that dates become meaningless.

Consider lightweight controls for company focus/selection if the full 17-company view is too noisy. Prefer explicit user selection over hidden algorithmic prioritization.

### Mobile

Keep a chronological vertical representation rather than forcing a horizontal chart onto a narrow screen.

The mobile view should preserve search and company filtering and make source access easy.

## Company selection

The current data volume is large enough that company focus is likely necessary.

Implement a simple, understandable company-selection mechanism if testing confirms this.

Requirements:

- no “top companies” ranking;
- no maturity-based ordering;
- alphabetical ordering is a safe default;
- selection state should be reflected in the URL so a comparison can be shared;
- “all companies” should remain possible;
- a company with zero Golden events should not create a meaningless empty lane in the global timeline, but its Company page may still exist as a researched sparse record.

Do not create permanent company-group taxonomies merely for the selector.

## Date range

The current corpus spans more than a decade.

If the full range harms readability, add a lightweight explicit date-range control or simple presets such as recent years / all history.

The chosen range should be represented in the URL.

Do not automatically discard old events by default if doing so hides the historical story. Choose defaults based on actual usability and document the decision in the PR.

## Search behavior

Retain a transparent lexical search over descriptive Event fields.

At minimum search:

- headline;
- fact;
- source title;
- source summary;
- company/person names.

Normalize case, Unicode, punctuation, and whitespace sensibly.

The UI should make it clear how many unique events remain after filtering.

Search filtering should work consistently in desktop and mobile views.

## Event detail interaction

The current single detail panel is a reasonable starting point.

Improve it so that selected events are easy to inspect and compare with nearby events.

Possible approaches include a persistent detail panel, inline expanded event, or other restrained interaction.

Do not build a modal-heavy application unless it materially improves the workflow.

Source availability (`available` / `unavailable`) must be displayed honestly. Do not present an unavailable original URL as though it is live.

## Shared events

Some Golden events reference several companies, notably the UVM-MS standard and the SiTime/Renesas acquisition.

The visualization must handle these without duplicating the factual record or misleadingly implying separate independent events.

It is acceptable for one Event to appear on multiple relevant lanes, but the detail view must make clear that they refer to the same stable Event permalink.

## Date semantics

The corpus contains different kinds of dated facts:

- publication/conference dates;
- job-posting dates;
- acquisition dates;
- affiliation-start dates derived from public profiles;
- occasionally an observation/check date when a source does not expose a better historical date.

Do not redesign the schema in this pass unless a concrete UI failure makes a minimal date-provenance field necessary.

If the existing timeline visually overstates what a date means, solve it first through copy and event-kind context. If a schema change is truly necessary, keep it minimal and explain why in the PR.

## Sparse evidence

A zero-event researched company is meaningful context but should not occupy a blank global timeline lane.

Company pages for sparse records should state, neutrally, that no Golden events are currently indexed and show the last-researched date.

Do not say this means the company has no RNM/AMS activity.

## EDA / ecosystem companies

Cadence, Siemens EDA, and Synopsys are in the same factual corpus but are not direct semiconductor-company competitors.

For v1, do not invent a broad taxonomy solely to separate them.

Evaluate whether the all-company timeline becomes confusing. If needed, use a very small factual company-role distinction only if it clearly improves the interface and can be justified independently of technology maturity. Prefer avoiding a schema change unless necessary.

## Visual direction

Aim for a modern technical research publication/tool rather than a KPI dashboard.

Desired qualities:

- strong typography;
- generous but efficient spacing;
- restrained color;
- visible chronology;
- high information density without clutter;
- excellent source readability;
- clear selected/filter states;
- calm light/dark behavior;
- desktop useful for comparison, mobile useful for reading.

Avoid:

- score cards;
- progress rings;
- maturity meters;
- decorative charts with no analytical purpose;
- large marketing hero sections;
- excessive card grids;
- visual encodings that imply certainty or superiority not present in the source data.

The user should reach the factual material immediately.

## Useful discovery aids

Implement only aids that improve actual use of the 37-event corpus.

Candidates include:

- company multi-select/focus;
- date-range control;
- clear active-event highlighting;
- chronological result list coordinated with the timeline;
- compact legend for event `kind` where useful;
- a reset/clear-filters action;
- URL-persisted search/filter state;
- keyboard-accessible event navigation if straightforward.

Do not add features merely because they are common dashboard components.

## Company pages

Improve company pages using the same factual data.

A useful company page should emphasize:

- company name;
- last researched date;
- chronological events;
- event kind/date;
- factual text;
- evidence/source access;
- search within that company if useful.

Do not add generated “company summary” prose that infers an overall strategy or maturity.

For zero-event companies, present the sparse state honestly and compactly.

## People pages

People pages should remain chronological and factual.

Do not add inferred expertise tags or biographies assembled from unrelated information.

Make affiliation-change events visually understandable when more People records are eventually added.

## Event pages

Keep stable Event permalinks.

Improve readability and source presentation if needed, but keep the page compact and factual.

A future Analysis article must be able to link to these permalinks as evidence references.

## Quality and testing

Use the local development site with the real corpus. Exercise at least:

- all-company desktop view;
- Apple-only view;
- Apple + SiTime + Skyworks comparison;
- Analog Devices + Texas Instruments comparison;
- search for `model validation`;
- search for `RNM`;
- search for `PLL`;
- a shared-event case;
- a zero-event company page;
- People view with the current single person;
- narrow/mobile viewport behavior.

Fix issues discovered through actual interaction rather than designing only from source code.

Preserve accessibility: keyboard-operable controls, visible focus, sufficient contrast, and non-hover-only access to details.

## Deliverable

Produce a reviewable v1 visualization/UX PR.

The PR should primarily modify viewer code/styles, not Golden research data.

In the PR description summarize:

- major UX changes;
- what was learned by testing the real 37-event / 17-company corpus;
- which design alternatives were tried or rejected;
- any minimal data/schema correction required and why;
- desktop workflows tested;
- mobile workflows tested;
- remaining v1 UX limitations;
- recommendations for the next step toward public release.

Run `npm run check` and ensure the production build succeeds before opening the PR.
