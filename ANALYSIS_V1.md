# AMS Signals v1 — First Analysis Column

Temporary implementation/editorial brief. Remove after the Analysis v1 PR is merged and durable lessons are folded into `PROJECT_CONTEXT.md` and/or `AGENTS.md`.

Read `PROJECT_CONTEXT.md` and `AGENTS.md` first.

## Goal

Implement the separate Analysis layer and publish the first substantial column using the existing Golden corpus.

This pass should demonstrate the intended product boundary:

- Golden Timeline = directly supportable public facts;
- Analysis = explicit interpretation built on those facts;
- every important analytical claim should make it easy for a reader to inspect the relevant Golden Event records and disagree.

Do not change Golden facts merely to support the article. If the current evidence cannot support an attractive claim, narrow the claim.

## First column

Working title:

> **From Behavioral Models to Managed Verification Assets?**

The question to investigate is whether the public record across several companies shows a shift from project- or block-level behavioral-model usage toward more explicit model validation, reusable verification assets, shared methodology/platform ownership, cross-domain correlation, and organization-scale AMS/DMS infrastructure.

The title intentionally remains a question. The article should not claim that every company follows the same progression or that public disclosure is a direct measure of internal maturity.

## Evidence already in Golden

Use the existing timeline as the primary evidence base. Important anchors include, but are not limited to:

### Historical project/methodology evidence

- Analog Devices 2014 metric-driven mixed-signal verification;
- Analog Devices 2016 SV-RNM model-to-netlist validation;
- Analog Devices 2017 RF SoC RNM/UVM verification;
- Analog Devices 2019 power-aware RNM with schematic validation;
- Analog Devices 2022 complementary AMS and DMS verification;
- Texas Instruments 2014 wreal/UVM mixed-signal SoC case studies;
- Texas Instruments 2016 analog functional coverage;
- Texas Instruments 2017 analog assertions / PVT exploration;
- Broadcom 2019 reusable full-chip UVM DMS/AMS methodology;
- NXP 2016 abstraction-level low-power verification;
- NXP 2024 pre-/post-silicon AMS test reuse.

### Explicit model-validation / reusable-asset evidence

- Renesas 2023 automated model-versus-schematic PLL testbenches;
- Apple 2024 Mixed-Signal Behavioral Modeling role;
- Apple 2025 dedicated Mixed-Signal Model Verification roles;
- Apple 2025 Aeon Modeling Intern;
- Apple 2026 PMU DMS role;
- Apple 2026 AMS Modeling Software role;
- Apple 2026 CAD / AMS simulation methodology role;
- Renesas 2026 PMIC AMS/DMS roles;
- Renesas 2026 Mixed Signal Verification Architect;
- MediaTek 2026 AMS modeling / verification methodology groups;
- Skyworks 2026 AMS verification roles;
- Skyworks 2026 Director, Central AMS Verification;
- Skyworks 2026 agentic AMS platform role.

### Ecosystem context

- UVM-MS 1.0 release and participant list;
- relevant Cadence / Siemens EDA / Synopsys methodology events.

Treat ecosystem material as context, not proof that a semiconductor company deployed a specific method.

## Analytical structure

Use a structure similar to the following. Exact headings may change if the article reads better, but preserve the reasoning functions.

### 1. Observed public record

Summarize the factual sequence without interpretation-heavy wording.

Show readers what is actually visible in the Golden record before offering a thesis.

### 2. Interpretation

Explain the strongest interpretation supported by the record.

A plausible thesis to test is:

> Public AMS/RNM evidence increasingly describes models not only as simulation substitutes, but as managed verification assets with explicit validation, regression, reuse, correlation, platform ownership, and organizational governance.

Do not assume this thesis is true. Narrow or modify it based on the evidence.

### 3. What seems to be changing

Possible dimensions to examine include:

- model creation -> model validation;
- individual/project models -> reusable model libraries/assets;
- block verification -> full-chip / system / chiplet use;
- simulation-only checks -> schematic / transistor / bench / silicon correlation;
- ad hoc flows -> regression / coverage / sign-off / measurable criteria;
- project teams -> methodology groups / platform teams / central ownership;
- manual integration -> automation and, recently, AI/agentic tooling.

These are analytical dimensions for the article, not permanent Golden tags or a maturity model.

### 4. Cross-company differences

Do not flatten the companies into one storyline.

For example:

- Analog Devices and TI have unusually strong historical publication records;
- Apple exposes multiple recent roles across model authoring, model verification, modeling software, PMU, wireless, and CAD methodology, but their organizational relationship remains unclear;
- Skyworks explicitly describes a new Central AMS Verification mandate, which may represent planned capacity rather than an already deployed enterprise platform;
- Renesas exposes both a detailed 2023 technical model-validation paper and recent architect/PMIC hiring;
- MediaTek currently exposes dedicated methodology groups mainly through hiring evidence;
- SiTime remains much sparser publicly.

Keep source modality visible in the reasoning.

### 5. Alternative explanations

This section is required.

Discuss at least:

- disclosure and recruiting language may have changed more than internal practice;
- job postings can describe desired future capability rather than deployed systems;
- conference-active companies may look historically richer simply because they publish more;
- separate product organizations may independently use similar language without sharing infrastructure;
- standards/vendor activity can influence terminology without proving internal adoption;
- recent AI/agentic wording may represent experimentation or hiring intent rather than established production flows.

### 6. Unknowns and falsification

Make the remaining uncertainty useful.

State what additional public evidence would materially strengthen, weaken, or overturn the article's interpretation.

Examples:

- direct descriptions of shared model libraries used across multiple product organizations;
- explicit ownership/governance documents;
- repeated papers or talks showing the same internal platform across years;
- post-silicon correlation results tied to the same model infrastructure;
- evidence that supposedly related Apple/Skyworks/Renesas roles belong to unrelated organizations;
- older evidence showing the same organization-scale behavior long before the apparent recent shift.

## Citation / linking discipline

The article should primarily cite stable AMS Signals Event permalinks, not bury readers in external URLs.

Each important factual foundation should link to one or more relevant Golden Events. The Event page then exposes the representative public sources.

A reader should be able to move:

Analysis claim -> Golden Event -> original evidence.

Do not fabricate footnote numbering manually if a simpler, durable inline-link or reference-list pattern works better.

Keep the Markdown readable in raw Git form.

## Visible separation from Golden

The site must make it unmistakable that Analysis is interpretive.

Add an `/analysis/` index and stable article permalink.

The article page should visibly state that:

- it contains interpretation/inference;
- linked Golden Events are the factual record;
- readers should inspect those events and may reach different conclusions.

Do not mix Analysis prose into Company pages, Event facts, or timeline marks.

## Analysis data model

Keep it small and Markdown-based.

Use ordinary Markdown, not MDX, unless a concrete requirement makes MDX unavoidable.

A minimal frontmatter model is sufficient, for example:

- title;
- date;
- short description/dek;
- optional status such as `published` if genuinely useful.

Do not create author databases, topic taxonomies, scoring fields, or CMS-style metadata.

## Navigation / UI

Add a restrained `Analysis` entry to the site navigation and an Analysis index.

The Analysis index should feel like a technical publication list, not a card-heavy blog homepage.

The article itself should optimize for long-form technical reading and evidence navigation.

Use the existing visual system. Do not redesign the whole site in this pass.

## Editorial requirements

The first article should be useful even to a skeptical expert.

Requirements:

- distinguish observed fact from interpretation in the prose;
- avoid maturity rankings;
- avoid claiming company-wide deployment from one role or paper;
- preserve historical affiliation/source modality;
- explicitly surface alternative explanations;
- explicitly surface unknowns;
- make strong claims proportional to the evidence;
- prefer a narrower defensible conclusion over a broad exciting one;
- keep the article concise enough to read in one sitting.

Do not write a generic essay about RNM. The article must be anchored in the current AMS Signals corpus.

## Implementation testing

Exercise at least:

1. Analysis index -> first article.
2. Article -> several Golden Event permalinks.
3. Event page -> original evidence.
4. Back navigation to Analysis / Timeline.
5. Mobile long-form reading.
6. Dark and light mode.
7. Broken-link check for every internal Event reference used by the article.

## Durable rules to fold back after this pass

If the first article works well, update `AGENTS.md` with the minimum durable Analysis-writing rules learned from this pass. Prefer a short permanent rule set such as:

- Analysis is explicitly inferential and separate from Golden;
- important claims link to Golden Event permalinks;
- alternative explanations and unknowns are first-class;
- job/paper/patent modality remains visible even in interpretation;
- no maturity scoring or hidden taxonomy.

Do not copy this entire temporary brief into `AGENTS.md`.

## Deliverable

Open a reviewable PR that:

- implements the Markdown Analysis section;
- publishes the first column;
- links claims back to existing Golden Event permalinks;
- keeps Golden research data unchanged unless a genuine factual defect is found;
- folds only durable Analysis rules into `AGENTS.md` if warranted;
- runs `npm run check` successfully.

In the PR description summarize:

- the article's final thesis in 2–4 sentences;
- Golden Events used as major evidence anchors;
- important alternative interpretations retained;
- claims deliberately narrowed or rejected;
- Analysis UI / content-model changes;
- remaining editorial or product limitations;
- recommended next step toward v1.0 public release.
