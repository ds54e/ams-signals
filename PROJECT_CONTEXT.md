# AMS Signals — Product Context

AMS Signals helps engineers, verification leads, architects and technical managers inspect public RNM/AMS and mixed-signal verification activity, compare trajectories and decide what evidence to investigate next. [AGENTS.md](AGENTS.md) owns working guidance; [docs/README.md](docs/README.md) routes implementation and operating contracts.

## Factual timeline

Time is the Golden corpus's organizing dimension. Timeline supports pattern discovery; Events provides complete chronological factual reading. Event, Company and Person pages expose context and representative sources. Juxtaposing trajectories does not establish causation, company-wide adoption, private internal capability, methodology transfer or maturity.

A Golden Event records a dated publicly observable occurrence, its participants and what its sources establish. Preserve source modality: a company posts a role, a paper reports a result, a patent describes an invention. Hiring and student postings can reveal named projects or tools, but establish a posting rather than deployed practice. Missing public evidence proves neither inactivity nor secrecy.

Research can form hypotheses, compare organizations and follow people. Use those ideas to find evidence that supports, narrows or contradicts a narrative. Inference guides discovery; it is not published as a Golden fact. Do not add unsupported rankings, scores or a permanent technology-tag taxonomy. Phrase search supplies a flexible lens over descriptive factual records.

## Bounded, source-grounded research

Begin with the checked-in corpus and its public view. Strengthen an existing milestone when new evidence supports the same occurrence. Reposts, regional variants and repeated hiring do not each require an Event. Keep meaningful signals without proportional growth in maintenance or a second research inventory.

Source records contain URL, check date, short factual summary and optional availability/archive metadata. The repository is not a source-document archive. A verified Event may remain when its original URL disappears, with availability explicit; add a responsibly verified replacement or archive when available. Schemas own record shape.

People are technical signals, not an employee directory. Include their own material public technical activity or movement; preserve affiliation at the Event date. A move does not establish a causal link to a company's later milestone.

Companies are current canonical corporate browsing groups. Associate acquired predecessors with their established successors while retaining source-grounded historical organizations in Event text and IDs. Aggregation does not rewrite affiliation or establish methodology transfer through acquisition.

## Factual export

One deterministic `/export.json` projects validated Company, People and Golden Event records, with explicit export exclusions and stable Event URLs. It contains source records, not catalogs, generated summaries, inference, scores or build-time timestamps. Do not maintain a second hand-edited factual dataset.

## Independent catalogs

Analog and Digital describe public technical projects separately from the Golden corpus. Domain selects the catalog; Scope describes meaningful user-facing design-stage coverage. Runtime AI involvement and software-development provenance are independent and do not measure quality, maturity, confidence or capability strength.

Entries require public implementation code, a canonical Code link and reviewed meaningful public activity. Papers, datasets and demonstrations may support an implementation but cannot replace it. Projects may require licensed EDA, PDKs, hardware or model access. Keep current metadata, primary sources, implementation/classification reasoning and limitations together in each project's frontmatter and Markdown notes; captures belong in activity JSON.

[Shared catalog rules](docs/catalog/CONTRACT.md), [Analog](docs/analog/README.md), [Digital](docs/digital/README.md) and [AI-development policy](docs/AI_DEVELOPMENT.md) own the domain contracts. Catalog work preserves Golden records, factual semantics, viewer state and export.

## User experience and engineering

Optimize for discovery and evidence inspection with readable hierarchy and the shared [visual system](docs/VISUAL_SYSTEM.md). Desktop is the reference for the horizontal Timeline; narrow screens retain usable evidence access with local visualization scrolling. Events owns textual chronological reading. Catalogs keep full descriptions and accessible links/disclosures at narrow widths.

Use portable JSON, Markdown, deterministic transforms, Astro static generation, plain CSS and small JS/TS modules. A new framework, backend or runtime AI integration needs a concrete unmet requirement. The factual timeline and source-grounded catalog knowledge are the durable product assets.
