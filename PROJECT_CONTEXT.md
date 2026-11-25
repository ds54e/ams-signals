# AMS Signals — Product Context

AMS Signals helps engineers, verification leads, analog designers, architects and technical managers inspect public AMS verification, analog/behavioral circuit modeling and AI-assisted analog circuit design activity, compare trajectories and decide what evidence to investigate next. [AGENTS.md](AGENTS.md) owns working guidance; [docs/README.md](docs/README.md) routes implementation and operating contracts.

## Home dashboard

Home (`/`) presents a build-time view of the latest four Events and three projects per catalog in existing activity-date order, with complete authored project descriptions. It links to the complete Events, Analog, Digital and Lab indexes. Timeline lives at `/timeline/`.

Activity Trend covers twelve UTC calendar months ending in the build month. Each Event counts once at its supported start month; year-only dates are excluded. Repository buckets count distinct projects with activity in that captured month, and reviewed point evidence activates only its dated month. Four straight connected lines with faint matching gradient areas show blue Events, green Analog projects, orange Digital projects and purple Lab projects. Each series scales independently to its own largest real count in the displayed window at 100%; an all-zero series stays at 0%. The vertical axis runs from 0% to 100% in 25% steps, and visible month labels omit years. Percentages show within-series trends, not count comparisons between series. The chart has no markers, hover content, interaction or animation; a hidden explanation and accessible table retain normalization context, raw counts and full month/year labels. Captured month keys are preserved when a build window moves; missing months are never extrapolated. The current month is partial, and missing reviewed activity does not prove inactivity. This presentation does not change Golden records or catalog snapshots. `src/lib/dashboard.ts` owns aggregation.

## Factual timeline

Time is the Golden corpus's organizing dimension. Timeline supports pattern discovery; Events provides complete chronological reading within the selected Golden scope, primarily company-related developments in AMS verification, analog/behavioral circuit modeling and AI-assisted analog circuit design. Event, Company and Person pages expose context and representative sources. Juxtaposing trajectories does not establish causation, company-wide adoption, private internal capability, methodology transfer or maturity.

A Golden Event records a dated publicly observable occurrence, its participants and what its sources establish. Preserve source modality: a company posts a role, a paper reports a result, a patent describes an invention. Hiring and student postings can reveal named projects or tools, but establish a posting rather than deployed practice. Missing public evidence proves neither inactivity nor secrecy.

Research can form hypotheses, compare organizations and follow people. Use those ideas to find evidence that supports, narrows or contradicts a narrative. Inference guides discovery; it is not published as a Golden fact. Do not add unsupported rankings, scores or a permanent technology-tag taxonomy. Phrase search supplies a flexible lens over descriptive factual records.

## Bounded, source-grounded research

Golden selection requires both concrete AMS verification, behavioral circuit-modeling or AI analog-design activity and an observable corporate role at the Event date, with a narrow AMS-specific industry ecosystem exception. Sources establish dated public occurrences, not inferred company-wide adoption or private capability.

The [Golden evidence contract](docs/GOLDEN.md) owns qualifying activity, exclusions, hiring versus reported accomplishments, date evidence and substitutes, deduplication, sources and historical attribution. Begin with the current corpus and prioritize recent company activity within the user's requested scope. Independent catalogs use their own implementation and activity criteria below.

## Golden sources

The checked-in Company, People and Event records are the canonical factual corpus. The public pages retain stable Event URLs and source evidence. Do not maintain a second hand-edited factual dataset.

## Independent catalogs

Analog, Digital and Lab describe public technical projects separately from the Golden corpus. Domain selects the catalog; Scope describes meaningful user-facing functional coverage. Scope labels and filters represent functional stages, not runtime AI. Catalog search matches the project name, authored aliases, description and labels. Runtime AI classification is recorded separately from the public AI-ASSISTED development badge and does not measure quality, maturity, confidence or capability strength.

Entries require public implementation code, a canonical Code link and reviewed meaningful public activity, with the documented unfetched state for unresolved new captures. Each listing must add a distinct usable engineering operation and demonstrate substantive technical follow-through; recency or commit counts alone do not establish selection. Papers, datasets and demonstrations may support an implementation but cannot replace it. Projects may require licensed EDA, PDKs, hardware or model access. Keep current metadata, primary sources, implementation/classification reasoning and limitations together in each project's frontmatter and Markdown notes; captures belong in activity JSON.

[Shared catalog rules](docs/catalog/CONTRACT.md), [Analog](docs/analog/README.md), [Digital](docs/digital/README.md), [Lab](docs/lab/README.md) and [AI-development policy](docs/AI_DEVELOPMENT.md) own the domain contracts. Catalog work preserves Golden records, factual semantics, viewer state and the retired export route.

## User experience and engineering

Optimize for discovery and evidence inspection with readable hierarchy and the shared [visual system](docs/VISUAL_SYSTEM.md). Desktop is the reference for the horizontal Timeline; narrow screens retain usable evidence access with local visualization scrolling. Events owns textual chronological reading. Catalogs keep full descriptions and accessible links/disclosures at narrow widths.

Use portable JSON, Markdown, deterministic transforms, Astro static generation, plain CSS and small JS/TS modules. A new framework, backend or runtime AI integration needs a concrete unmet requirement. The factual timeline and source-grounded catalog knowledge are the durable product assets.
