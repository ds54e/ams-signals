# AMS Signals — Research Wave 2: Unresolved Questions + People Discovery

Temporary research brief. Remove after the Wave 2 research PR is merged and any durable lessons are folded into `PROJECT_CONTEXT.md` / `AGENTS.md` only if needed.

Read `PROJECT_CONTEXT.md` and `AGENTS.md` first. Read the current Golden Timeline before starting web research.

## Goal

Increase the information value of AMS Signals by investigating unresolved questions already visible in the current Timeline, with **People discovery as a first-class research axis**.

This is not a coverage-expansion exercise and not a target-count exercise.

Do not optimize for:

- number of companies;
- number of Events;
- number of People records;
- equal depth across companies.

Optimize for:

> new public evidence that changes, sharpens, contradicts, or materially contextualizes the current factual record.

The research loop remains:

`Existing Golden → question/hypothesis → targeted research → challenge hypothesis → compress into factual Events/People → stop`

## Primary research questions

Prioritize these in roughly this order, but follow stronger evidence if research reveals a better lead.

### 1. SiTime / Renesas timing-business transition

The current Golden record contains:

- Renesas technical AMS/RNM evidence before the transaction;
- the SiTime/Renesas timing-business acquisition;
- a sparse SiTime verification footprint.

Investigate whether public evidence after the transaction reveals continuity or movement of:

- AMS/RNM verification people;
- modeling methodology;
- verification architecture;
- model-validation practices;
- tool/automation ownership;
- job families or organizational labels;
- papers, talks, patents, or conference participation.

Do **not** infer methodology transfer merely because the business moved.

Useful outcomes include either:

- a factual continuity/movement Event or People trajectory; or
- a stronger conclusion that public evidence remains insufficient.

### 2. Apple organizational relationships

The current Apple record exposes multiple recent surfaces:

- behavioral model authoring;
- dedicated model verification;
- modeling software/platform work;
- PMU DMS;
- wireless DMS;
- CAD / AMS simulation methodology;
- Aeon.

Investigate whether public evidence can establish any actual relationship between these surfaces.

Look for:

- recurring people across roles, talks, patents, publications, or teams;
- explicit team names;
- managers / technical leads with public trajectories;
- shared platform/library names;
- common software/framework terminology that can be tied by stronger evidence than wording similarity;
- older public material showing the same organization or methodology before the recent hiring wave.

Do not merge separate Apple organizations merely because they use similar language.

A useful result may be that the organizational relationship remains unresolved.

### 3. Skyworks central AMS verification follow-through

The current Golden record includes a 2026 mandate to found Central AMS Verification plus related platform/automation hiring.

Investigate whether later or adjacent public evidence shows:

- the central team being staffed;
- named leadership or technical people;
- repeated postings that clarify scope;
- conference activity;
- reusable model/VIP/library ownership;
- deployment evidence rather than hiring intent;
- continuation, narrowing, or disappearance of the mandate.

Preserve the distinction between planned capability and reported practice.

### 4. Renesas continuity around model validation / architecture

The current record includes a detailed 2023 PLL model-testbench paper and 2026 architect/PMIC hiring.

Investigate whether public People or technical evidence connects these across time.

Potential evidence:

- recurring authors;
- team names;
- follow-on talks/papers;
- patents;
- later roles;
- internal methodology/tool names;
- cross-product reuse claims.

Do not infer continuity from company name alone.

### 5. Sparse-company selective re-check

Revisit only where new leads justify it:

- SiTime;
- Qualcomm;
- Sony Semiconductor Solutions;
- OMNIVISION;
- NVIDIA;
- Microchip.

Do not create filler Events.

Zero Events after a responsible re-check remains a valid outcome.

## People Discovery — priority track

People should receive significantly more research attention in this Wave.

The purpose is not to build a directory. The purpose is to make technical expertise and organizational continuity visible when public evidence supports it.

### Candidate generation

Start from strong existing Golden evidence rather than generic employee search.

Generate People candidates from:

1. authors/presenters of the strongest company-authored AMS/RNM papers already in Golden;
2. recurring authors across multiple papers or years;
3. named technical leaders / methodology owners visible in conference material;
4. named managers or architects tied to relevant public team or organization changes;
5. standards contributors only when their personal trajectory materially helps the company/technology history;
6. patents only when named inventors have a relevant recurring public AMS/RNM trajectory;
7. people whose affiliation changes plausibly create a useful research question about knowledge movement — while never treating the move itself as proof of methodology transfer.

Prioritize candidates connected to:

- model validation;
- RNM / DMS methodology;
- UVM mixed-signal methodology;
- AMS verification architecture;
- reusable model libraries / verification platforms;
- schematic/model/silicon correlation;
- central methodology / CAD ownership;
- PLL / timing AMS verification where it connects to the SiTime/Renesas question.

### Promotion threshold for a Person record

Create a Person record only when at least one of these is true:

- the person appears in multiple meaningful public technical milestones over time;
- an affiliation change materially improves interpretation of the AMS/RNM timeline;
- the person connects otherwise separate public technical records in a way that is directly supportable;
- the person's public trajectory generates a meaningful unresolved research question for the project.

A single coauthored paper is normally not enough.

A single job-posting mention is normally not enough.

Do not add people merely because they are senior, famous, or easy to find.

### People factual discipline

For every Person-related Event:

- verify affiliation **at the time of the event**;
- keep historical work attributed to the historical employer;
- never relabel old work using the person's current employer;
- distinguish publication authorship, employment, standards participation, patent inventorship, and conference presentation;
- never infer causal transfer of methods after a move.

If a current employer is public but the transition date is not supportable, do not fabricate an affiliation-change Event.

### People research workflow

For each promising candidate:

1. Establish identity carefully; avoid conflating people with similar names.
2. Build a temporary chronological scratch trajectory from public sources.
3. Verify employer/affiliation at each relevant date.
4. Identify which entries are genuinely AMS/RNM-relevant.
5. Ask whether the trajectory adds information beyond the existing company Events.
6. Promote only the minimal Person metadata and factual Events needed to preserve that information.
7. Discard the scratch trajectory after compression; do not build permanent biographies.

### People success criteria

There is **no numeric quota**.

A successful Wave could add only a few People if they are strong.

However, actively challenge the current state of only one Person record. The research should make a serious attempt to identify high-value People trajectories from the existing paper-heavy ADI, TI, Broadcom, NXP, Renesas, Apple, and ecosystem evidence.

In the PR summary, report:

- People candidates investigated;
- People promoted;
- candidates deliberately not promoted and why;
- any useful affiliation/continuity questions discovered even if they did not become Golden.

Do not preserve a large rejected-candidate file in the repository after the PR.

## Suggested evidence-first seed areas

Use the current Golden source set as a launch point.

Particularly useful historical sources are likely to include:

- Analog Devices 2014–2022 company-authored mixed-signal verification papers;
- Texas Instruments 2014–2017 papers;
- Broadcom 2019 full-chip DMS/AMS work;
- Renesas 2023 PLL model-testbench work;
- NXP 2016 / 2024 work;
- Accellera UVM-MS material;
- current Apple, Skyworks, Renesas, MediaTek, SiTime hiring and organization evidence.

Extract named authors/presenters from these sources and then research their trajectories independently.

Do not assume the most visible author is the methodology owner.

## Research tactics

Use a mixture of source types where useful:

- official company career pages;
- conference proceedings and agendas;
- IEEE / ACM / DVCon / DesignCon / Accellera material;
- patents;
- official company announcements;
- professional profiles when they provide dated affiliation evidence;
- university/author bios when needed for historical affiliation;
- vendor/customer material with modality clearly preserved;
- archived/recovery copies only when primary material is unavailable and the copy is sufficiently exact.

For a promising technical person, search both forward and backward in time.

Useful query patterns include combinations of:

- person name + RNM / real number / mixed-signal verification / AMS / DMS;
- person name + UVM / model validation / behavioral model;
- person name + PLL / PMIC / SerDes / ADC / DAC when relevant;
- person name + company transitions;
- exact paper titles / coauthors;
- conference speaker histories;
- patent inventor histories.

Research should be hypothesis-driven, not exhaustive.

## Event promotion rules for this Wave

Keep existing Golden discipline.

Promote a new Event only when it adds a meaningful factual milestone such as:

- new reported technical practice;
- explicit organization/team formation or change;
- a distinct model-validation/platform methodology milestone;
- a meaningful affiliation change for a high-value Person;
- a new public link between product organizations or methodology ownership;
- a post-acquisition organizational/technical continuity fact;
- a materially new conference/publication milestone.

Do not create Events for:

- every new job repost;
- every coauthor;
- generic verification roles;
- weakly related patents;
- repeated terminology without a new factual milestone;
- speculation about internal structure.

Prefer updating/clustering an existing Event when new evidence strengthens the same milestone.

## Hypotheses to challenge, not prove

The following are research hypotheses only:

- recent AMS/RNM methodology is becoming more explicitly centrally owned;
- Apple has shared modeling/verification infrastructure across several public role families;
- Renesas technical methodology survived into later product/architecture organizations;
- SiTime acquired not only timing products but identifiable verification expertise from Renesas;
- technical People movements help explain later company methodology visibility;
- People trajectories may reveal continuity that company-level job postings obscure.

Actively search for evidence that breaks each hypothesis.

## Stop conditions

Stop a research thread when:

- strong new Golden facts have been identified and verified;
- additional searches mostly produce duplicates/reposts;
- the remaining conclusion is genuinely "publicly unresolved";
- identity/affiliation cannot be established responsibly;
- the thread becomes generic employee research rather than AMS Signals research.

Do not exhaust the web.

## Deliverable

Open one reviewable Wave 2 research PR.

The PR should:

- start from the current Golden corpus;
- add/update only meaningful factual Events;
- add high-value People records where justified;
- preserve source modality and historical affiliation;
- keep Analysis hypotheses out of Golden;
- avoid permanent scratch research files;
- run `npm run check` successfully;
- run `npm run test:smoke` only if viewer behavior/data relationships make it relevant; ordinary factual additions should not require UI changes.

In the PR description summarize:

### Golden changes

- Events added;
- existing Events strengthened/clustered;
- companies affected;
- People added;
- shared or affiliation-change Events added.

### People research

- strongest new People trajectories;
- why each promoted Person materially improves the timeline;
- notable candidates investigated but not promoted.

### Questions reassessed

For each primary question above, state:

- strengthened;
- weakened;
- still unresolved;

with a concise explanation based on public evidence.

### Discipline / negative results

Explicitly mention important searches that did **not** justify Golden changes, especially sparse companies or attractive continuity hypotheses.

### Next questions

List only the few unresolved questions that now have the highest expected information value for a future Wave or Analysis column.

Do not turn the PR description into a permanent raw research archive.
