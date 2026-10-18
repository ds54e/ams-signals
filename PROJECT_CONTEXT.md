# AMS Signals — Product Context

AMS Signals helps engineers, verification leads, analog designers, architects and technical managers inspect public AMS verification, analog/behavioral circuit modeling and AI-assisted analog circuit design activity, compare trajectories and decide what evidence to investigate next. [AGENTS.md](AGENTS.md) owns working guidance; [docs/README.md](docs/README.md) routes implementation and operating contracts.

## Home dashboard

Home (`/`) presents a build-time view of the latest four Events and three projects per catalog in existing activity-date order, with complete authored project descriptions. It links to the complete Events, Analog and Digital indexes. Timeline lives at `/timeline/`.

Activity Trend covers twelve UTC calendar months ending in the build month. Each Event counts once at its supported start month; year-only dates are excluded. Repository buckets count distinct projects with activity in that captured month, and reviewed point evidence activates only its dated month. Three straight connected lines with faint matching gradient areas show blue Events, green Analog projects and orange Digital projects. Each series scales independently to its own largest real count in the displayed window at 100%; an all-zero series stays at 0%. The vertical axis runs from 0% to 100% in 25% steps, and visible month labels omit years. Percentages show within-series trends, not count comparisons between series. The chart has no markers, hover content, interaction or animation; a hidden explanation and accessible table retain normalization context, raw counts and full month/year labels. Captured month keys are preserved when a build window moves; missing months are never extrapolated. The current month is partial, and missing reviewed activity does not prove inactivity. This presentation does not change Golden records, catalog snapshots or the factual export. `src/lib/dashboard.ts` owns aggregation.

## Factual timeline

Time is the Golden corpus's organizing dimension. Timeline supports pattern discovery; Events provides complete chronological factual reading. Event, Company and Person pages expose context and representative sources. Juxtaposing trajectories does not establish causation, company-wide adoption, private internal capability, methodology transfer or maturity.

A Golden Event records a dated publicly observable occurrence, its participants and what its sources establish. Preserve source modality: a company posts a role, a paper reports a result, a patent describes an invention. Hiring and student postings can reveal named projects or tools, but establish a posting rather than deployed practice. Missing public evidence proves neither inactivity nor secrecy.

Research can form hypotheses, compare organizations and follow people. Use those ideas to find evidence that supports, narrows or contradicts a narrative. Inference guides discovery; it is not published as a Golden fact. Do not add unsupported rankings, scores or a permanent technology-tag taxonomy. Phrase search supplies a flexible lens over descriptive factual records.

## Bounded, source-grounded research

Golden coverage spans three overlapping areas: AMS verification, analog/behavioral models of circuits or functional blocks, and AI-assisted analog/mixed-signal circuit design. For verification and modeling, relevant languages include Verilog-A, Verilog-AMS, SystemVerilog analog models (including RNM, wreal and user-defined nets/types), SystemC-AMS and VHDL-AMS. SystemVerilog DPI-C model reuse belongs when its concrete use connects to those AMS models or verification. AI analog-design coverage includes circuit or schematic generation, topology and architecture exploration, circuit-level design-space search, and agents or CAD methods that perform or enable concrete analog IC design workflows. Agent orchestration, evaluation and design infrastructure qualify when explicitly tied to analog circuit design rather than generic AI/EDA claims. AI-guided sizing or parameter optimization can support a qualifying broader circuit-design task, but does not qualify on its own. Prioritize blocks such as PLLs, ADCs, DACs, LDOs, PMICs, sensor interfaces, C2V, gate drivers and RFIC circuits. Establish what is modeled, verified or designed and the role of AI; language or AI keywords alone are insufficient. An AI analog-design Event does not require a particular HDL modeling language.

Standalone MOS/MOSFET device and compact models remain outside this scope. Distinguish them from qualifying circuit verification, behavioral modeling or AI analog design that uses MOS devices; MOS physics in hiring requirements alone is insufficient. MRAM is not MOS: judge memory behavioral models and their control-IP verification on their actual use. Pure SPICE/statistical verification, simulation acceleration, layout-only automation, sizing-only optimization, Simulink-only modeling, lab-only measurement and general digital UVM/PSS/AI debugging are insufficient by themselves. SPICE may serve as a reference or execution engine for a qualifying HDL circuit model, or as the simulator/evaluator within a qualifying AI analog circuit-design workflow; that workflow need not use HDL. RTL/UPF connections to analog circuits can support boundary-verification Events. Public implementation code is a catalog requirement, not a requirement for every paper, patent, talk or hiring Event.

Begin with the checked-in corpus and its public view. Strengthen an existing milestone when new evidence supports the same occurrence. Reposts, regional variants and repeated hiring do not each require an Event. Keep meaningful signals without proportional growth in maintenance or a second research inventory.

Prefer primary sources and retain their position: a program lists a presentation, a patent publication describes its claims, a paper or vendor/customer report describes its reported results, and a job advertisement states requirements. Proposals, previews and roadmaps are not issued standards or released features. A job's desired experience is not necessarily its assigned work, and recruitment is not proof of internal adoption. Hold candidates without enough evidence of the qualifying language and use; do not publish speculative candidates or add a pending state to Golden.

Use the first verified public date at its supported precision. When unknown, use the actual observation date and explicitly identify it in the fact or source summary. Distinguish presentation, patent publication, thesis defense, upload and job-posting dates; a version label or planned employment start does not establish publication. Rechecking does not change an Event date. `checkedAt` is the actual source-check date. Explain unavailable full text or access restrictions rather than implying a complete review.

Source records contain URL, check date, short factual summary and optional availability/archive metadata. The repository is not a source-document archive. A verified Event may remain when its original URL disappears, with availability explicit; add a responsibly verified replacement or archive when available. Schemas own record shape.

People are technical signals, not an employee directory. Include their own material public technical activity or movement; authorship alone does not require a new Person. Prefer existing canonical Company/Person IDs and preserve affiliation at the Event date rather than inferring it from a current employer. A move does not establish a causal link to a company's later milestone.

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
