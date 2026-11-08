# Golden evidence contract

This document owns selection, evidence, dates and entity attribution for Golden Events, Companies and People. [Product Context](../PROJECT_CONTEXT.md) owns product intent; [Timeline](TIMELINE.md) owns presentation and Signal type terminology. The [schema](../src/content.config.ts) owns record shape. Independent Analog/Digital catalogs follow the [catalog contract](catalog/CONTRACT.md).

## Qualifying activity

Golden coverage spans three overlapping areas: AMS verification, analog/behavioral models of circuits or functional blocks, and AI-assisted analog/mixed-signal circuit design. For verification and modeling, relevant languages include Verilog-A, Verilog-AMS, SystemVerilog analog models (including RNM, wreal and user-defined nets/types), SystemC-AMS and VHDL-AMS. SystemVerilog DPI-C model reuse belongs when its concrete use connects to those AMS models or verification. AI analog-design coverage includes circuit or schematic generation, topology and architecture exploration, circuit-level design-space search, and agents or CAD methods that perform or enable concrete analog IC design workflows. Agent orchestration, evaluation and design infrastructure qualify when explicitly tied to analog circuit design rather than generic AI/EDA claims. AI-guided sizing or parameter optimization can support a qualifying broader circuit-design task, but does not qualify on its own. Prioritize blocks such as PLLs, ADCs, DACs, LDOs, PMICs, sensor interfaces, C2V, gate drivers and RFIC circuits. Establish what is modeled, verified or designed and the role of AI; language or AI keywords alone are insufficient. An AI analog-design Event does not require a particular HDL modeling language.

Standalone MOS/MOSFET device and compact models remain outside this scope. Distinguish them from qualifying circuit verification, behavioral modeling or AI analog design that uses MOS devices; MOS physics in hiring requirements alone is insufficient. MRAM is not MOS: judge memory behavioral models and their control-IP verification on their actual use. Pure SPICE/statistical verification, simulation acceleration, layout-only automation, sizing-only optimization, Simulink-only modeling, lab-only measurement and general digital UVM/PSS/AI debugging are insufficient by themselves. SPICE may serve as a reference or execution engine for a qualifying HDL circuit model, or as the simulator/evaluator within a qualifying AI analog circuit-design workflow; that workflow need not use HDL. RTL/UPF connections to analog circuits can support boundary-verification Events. Public implementation code is a catalog requirement, not a requirement for every paper, patent, talk or hiring Event.

Select Golden Events using two evidence checks: a concrete connection to the AMS verification, behavioral circuit-modeling or AI analog-design scope above, and an observable corporate role or activity in the dated occurrence. A company can qualify through its own product, technical publication or demonstration, named customer use, research affiliation at the Event date, hiring mandate, patent or assignee, organizational development, or concrete participation in an AMS-specific standard. Preserve what the source actually establishes: a company tutorial or announcement is evidence of what that company presented or announced, not independent proof of adoption or results. Current design-review and architecture workflows can qualify when their analog circuit-design task is concrete; generating a new topology is not mandatory.

Mere use of a vendor tool or PDK, acknowledgments, reposting, or an author's present-day employer does not establish corporate participation. Academic or independent research does not qualify on technical relevance alone. A narrow exception permits an AMS-specific industry standard or ecosystem milestone without a named company when its industry relevance is concrete and source-grounded; this is not a general exception for independent software or research. Company associations must reflect the role supported at the Event date, not inferred participation or later adoption.

A corporate announcement needs a concrete qualifying circuit-design or AMS workflow. Funding, geographic expansion, a digital-twin label or a generic AI/EDA claim does not establish that connection. General digital or memory IP verification remains outside scope unless the source identifies the relevant analog model, circuit boundary or AMS verification work.

## Source modality and hiring

Prefer primary sources and retain their position: a program lists a presentation, a patent publication describes its claims, a paper or vendor/customer report describes its reported results, and a job advertisement states requirements. Proposals, previews and roadmaps are not issued standards or released features. A job's desired experience is not necessarily its assigned work, and recruitment is not proof of internal adoption. Hold candidates without enough evidence of the qualifying modeling, verification or analog-design use; do not publish speculative candidates or add a pending state to Golden.

For hiring, separate assigned work from desired qualifications. Require a concrete modeling, verification or AI analog-design responsibility; an AMS language or tool listed only as prior experience is insufficient by itself. Describe an advertisement as a posted role, an internship mandate as planned work and a completed internship as a reported accomplishment. Do not convert recruitment into proof of deployment, team-wide capability or completed results.

Read a personal technical report in its own terms. Identify the employer and period supported by that report; do not infer that a named team, manager or current employer participated. A recruiter or reposter is not automatically a technical participant. Prefer the original posting or author report over a copied description when available.

## Dates and recent research

Prioritize activity within the latest year for ongoing company research. Historical Events can still qualify when they add distinct evidence; recency does not relax the technical and corporate evidence checks.

Use the first verified public date at its supported precision. If the original date cannot be established, use the best source-supported substitute, such as a dated repost, publisher update or actual observation date. State what that date means in the fact or source summary and identify uncertainty; a repost or observation date must not be presented as the original posting date. Do not invent a date from an undated page or imply day-level precision from a month-only source.

Distinguish presentation, patent publication, thesis defense, upload, announcement, job posting, repost, page update and observation dates. A version label, crawl timestamp or planned employment start does not establish publication. A later check does not change the Event date. A planned course or internship remains planned, including when its scheduled date is in the future.

`checkedAt` is the actual source-check date, separate from the occurrence date and any substitute date. A search result, snippet or restricted page must be described at the level actually inspected; do not imply a complete review of unavailable full text.

## Existing Events and attribution

Begin with the checked-in corpus and its public view. Strengthen an existing milestone when new evidence supports the same occurrence. Reposts, regional variants and repeated hiring do not each require an Event. Keep meaningful signals without proportional growth in maintenance or a second research inventory.

For each candidate, check the current corpus for the same occurrence, role family and company before creating a record. Strengthen an existing Event when a new source adds detail or a better date for that occurrence. Keep distinct technical or organizational milestones separate when the sources support that distinction. Review existing records against the same evidence standard; corrections or removals need source-based reasons, not keyword matching.

People are technical signals, not an employee directory. Include their own material public technical activity or movement; authorship alone does not require a new Person. Prefer existing canonical Company/Person IDs and preserve affiliation at the Event date rather than inferring it from a current employer. A move does not establish a causal link to a company's later milestone.

Companies are current canonical corporate browsing groups. Associate acquired predecessors with their established successors while retaining source-grounded historical organizations in Event text and IDs. Aggregation does not rewrite affiliation or establish methodology transfer through acquisition.

## Source records and storage

Golden JSON records live directly in their Events, Companies or People directory; `npm run validate` rejects nested records so the deterministic gate covers the same corpus as the build. Event start/end dates use the stated precision (`YYYY`, `YYYY-MM` or `YYYY-MM-DD`), valid calendar values and an end not before start. Source check dates and Company review dates use valid `YYYY-MM-DD` values. Dates use four-digit years (0000–9999), without a current-year cutoff; validation never fills in a more precise factual date.

Source records contain URL, check date, short factual summary and optional availability/archive metadata. The repository is not a source-document archive. A verified Event may remain when its original URL disappears, with availability explicit; add a responsibly verified replacement or archive when available. Schemas own record shape.

Keep published facts in Golden records rather than a parallel candidate ledger. Do not add pending or speculative records to Golden. Run the content gates in [Testing](TESTING.md) and follow [Releasing](../RELEASING.md) for integration and publication; research or local editing does not authorize a new publication destination.
