# AMS Signals — Product Context

This document owns durable product intent, not rollout status or implementation recipes. Operational guidance is in [AGENTS.md](AGENTS.md); [the documentation map](docs/README.md) routes to current contracts. Temporary research briefs can supplement, never override, these principles.

## Why this exists

Engineers, verification leads, architects and technical managers should be able to inspect public RNM/AMS and mixed-signal verification signals, notice patterns over time, compare organizations or people, and form or revise their own technical strategy. The product is not a company score or a definitive claim about private internal practice.

Useful questions are what became publicly visible, what changed, whether several organizations show similar signals, whose technical activity or affiliation changed, what remains unclear, and what evidence should be investigated next.

## Timeline first

Time is the primary organizing dimension of the Golden corpus. Adoption is not binary: public records may concern behavioral modeling, RNM, UVM integration, full-chip use, validation, automation or organization changes. Show trajectories rather than maturity scores. Juxtaposing Company and People trajectories never establishes causation.

Timeline supports pattern discovery; Events supports complete chronological factual reading. Search is a temporary lens, not a permanent technology taxonomy. The detailed [Timeline contract](docs/TIMELINE.md) owns current ordering, geometry, filters and terminology.

## Separate factual and editorial layers

The factual layer comprises Timeline, Events, Event pages, Company/Person factual views and `/export.json`. A Golden Event records what a public source establishes, with its date and source link. It must not label a company advanced, leading or mature, or turn public signals into inferred strategic direction, organization-wide adoption or methodology transfer.

Articles are independently authored editorial research. They may synthesize, compare, interpret and reason from public papers, standards, patents, job postings, documentation and other evidence beyond Golden Events. Article sources need not become Events. A source becomes a Golden Event only if it independently meets Golden inclusion criteria; an Article's interpretation is never promoted to Golden fact merely because it was published.

Keep source-derived statements and interpretation distinguishable in ordinary prose. Strong inference states material uncertainty or plausible alternatives where relevant. Articles can be revised when new evidence appears, but only with author authorization. Disclosure density does not establish company-wide adoption, and absence of public evidence proves neither inactivity nor secrecy. Articles do not relax those boundaries or justify unsupported rankings and maturity scores.

Author-supplied Article bodies must not be silently rewritten, normalized, shortened, expanded, summarized, translated, improved, reconciled or fact-corrected. Explicit mechanical work, such as required frontmatter, moving an author-supplied H1, adding author-selected related Event IDs or repairing a Markdown delimiter, is distinct from editorial rewriting. Article-to-Event links are one-way; factual Event pages do not advertise editorial interpretations. Article indexing/navigation choices do not change this authorship policy.

## Research should still reason aggressively

Fact-only Golden publication does not mean fact-only research. Form hypotheses, follow people, compare organizations and investigate missing areas. Use those ideas to choose searches, actively seeking evidence that narrows, contradicts or breaks an attractive narrative. Inference drives discovery and can support downstream interpretation; it is not Golden content.

## Search instead of taxonomy

Do not introduce a permanent Golden technology-tag taxonomy without a concrete need. Terms such as RNM, SV-RNM, DMS, PLL, EEnet, model validation and UVM overlap and change across organizations and time. Descriptive facts and phrase search let readers compare evidence without encoding a fixed classification into the corpus. This does not prohibit the separate catalogs' explicitly defined Scope model.

## Bounded growth is a product requirement

Repeated research should improve the compact Golden timeline without proportionally increasing maintenance. Keep meaningful milestones; compress duplicate jobs, reposts, regional variants and weak corroboration into existing Events or discard them. Begin each pass with the existing checked-in corpus and its public view, then ask what changed or remains unresolved. Do not rebuild the entire research history or retain raw search/download logs merely because they might be useful someday.

## Sources are deliberately lightweight

Source records contain URL, check date, short factual summary and optional availability/archive metadata. This is not a WARC/PDF/screenshot archive. A responsibly verified Event can remain when its original URL disappears, with availability explicit; a stronger replacement or archive link can be added. Current record shape and validation belong to the schema, not this rationale.

## People and Companies

People are technical signals, not an employee directory. Include a person only when their own public technical activity or movement materially improves the timeline. Never infer causation between their move and a later company Event, or relabel older work with their current employer. Affiliation at the Event date matters.

Companies are present canonical corporate browsing groups. Associate an acquired predecessor with its established canonical successor while preserving the historical organization in source-grounded headlines, facts, summaries and Event IDs. Do not add a separate predecessor Company when that group is already represented. Aggregation neither rewrites historical affiliation nor establishes methodology transfer through acquisition.

Internship and student postings can reveal named projects, experimental tools, team names and future-facing work; they are not low-value by default. A posting still establishes a posting, not deployed internal practice.

## Factual export

Generate one deterministic `/export.json` from validated Company, People and Golden Event data, honoring the existing explicit export exclusions. It contains source records and stable Event URLs, not Articles, catalogs, generated summaries, inference, scores or build-time timestamps. Do not maintain a second hand-edited factual dataset.

## Standalone technical catalogs

Analog and Digital are separately authored technical reference surfaces, not extensions of the Golden corpus. Domain chooses the catalog; Scope describes meaningful user-facing design-stage coverage. Runtime AI involvement and software-development provenance are independent, neither measures capability strength, confidence, quality or maturity. Catalog work stays local to those collections and never changes Golden semantics, Company/Person records, Article bodies, viewer state or export.

The catalogs help readers understand what a project does, what it covers and where to inspect primary materials. They center publicly inspectable projects: public source, released technical artifacts or a substantive research publication must expose enough of the claimed work for technical review. A closed commercial product supported only by product or demonstration material does not qualify, while a public project may still depend on licensed EDA, PDKs, hardware or model access. [Shared catalog rules](docs/catalog/CONTRACT.md), [Analog](docs/analog/README.md), [Digital](docs/digital/README.md) and [AI-development policy](docs/AI_DEVELOPMENT.md) own the current detail.

## User experience and engineering

Optimize for discovery and verification, not decorative dashboards or unsupported precision. Readers should find a pattern, inspect evidence and form their own interpretation. Use restrained styling, clear hierarchy, readable timelines and the shared [visual system](docs/VISUAL_SYSTEM.md).

Desktop is the reference experience for the horizontal Timeline. Narrow screens should remain usable without a separate mobile chronology or a requirement for desktop feature parity; Events owns textual chronological reading. Catalogs and Article prose follow their own responsive reading contracts.

Prefer portable, boring technology: JSON factual records and deterministic export, authored Markdown, Astro static generation, plain CSS, small JS/TS and Git history. A database/backend needs a concrete unmet requirement. Framework code is replaceable; the factual timeline and source-grounded knowledge are the durable assets.
