# Apple v1 Research Brief

> Temporary research brief for the Apple v1 deep-research pass. Remove this file after the Apple v1 research PR is merged and any durable lessons have been folded into `AGENTS.md`.

## Purpose

Deepen the Apple portion of AMS Signals into a compact, historically useful factual timeline of publicly observable RNM, AMS/DMS, behavioral-modeling, model-validation, and related verification activity.

This brief is Apple-specific. The durable project rules remain in `AGENTS.md`.

Research may be highly inferential. Golden events may not be.

Use hypotheses to decide what to investigate next, actively test alternatives, and commit only directly supportable factual milestones.

## Existing anchors

The current Apple Golden timeline is a seed, not a conclusion. Previous research has already identified several strong leads. Verify, deepen, connect, or narrow them rather than spending most of the work rediscovering them.

### Behavioral modeling / model validation

Public Apple material around 2024–2025 has described work involving combinations of:

- SystemVerilog behavioral models of custom mixed-signal circuits;
- analog non-idealities;
- behavioral-model versus circuit comparison;
- formal equivalence or targeted validation;
- assertions / functional coverage;
- Python or MATLAB fitting, profiling, and automation;
- PLLs, DLLs, SerDes, sensors, and data converters.

Separate Apple roles have exposed dedicated model-verification responsibilities such as self-checking model-versus-circuit comparison, specification validation, static/formal checks, and automation.

Investigate whether these represent one related modeling/validation organization, several independent organizations, or something else. Do not assume the answer.

### PMU DMS

A strong 2026 public Apple PMU role has described combinations of:

- SystemVerilog RNM;
- wreal / EEnet-related experience;
- DMS;
- model-versus-schematic simulation;
- standalone model validation;
- full-chip DMS integration;
- model reuse / model libraries;
- model accuracy metrics;
- regression;
- Python automation;
- transistor-level correlation;
- silicon bring-up / silicon correlation;
- power-management blocks including LDOs, converters, charge pumps, references, and related mixed-signal circuits.

Use this as an anchor and investigate how far back comparable PMU/DMS public activity can be traced.

### Wireless / radio

Public Apple verification roles have also exposed combinations of:

- SystemVerilog / UVM;
- analog behavioral, DMS, or real-number models;
- radio-control verification;
- PLL-control systems;
- analog/RF blocks.

Treat Wireless as a separate scope unless public evidence directly connects it to another methodology organization.

### SerDes / DDR / PLL / clocking

Previous research found public Apple-associated activity around:

- SerDes;
- DDR / memory interfaces;
- PLLs and mixed-signal clocking/control;
- behavioral modeling;
- model validation;
- data converters.

Investigate this as a distinct technical thread.

## Internships and named projects are high-value sources

Do not treat internship/student postings as low-value sources.

For this project, internships can expose project names, narrow technical experiments, future-facing methodology, internal team names, automation work, and AI/LLM usage that ordinary experienced-hire postings do not expose.

Search Apple internship and student roles explicitly.

### Aeon

Treat `Aeon` as a named high-priority lead.

Previous public Apple material includes an `Aeon Modeling Intern` role associated with AMS modeling and topics including:

- SerDes;
- PLL;
- memory interfaces;
- data converters;
- behavioral/electrical models;
- comparison with circuit simulation or measurements;
- modeling methodology and automation;
- accuracy versus simulation-performance tradeoffs;
- LLM-assisted model/software-framework development;
- an AMS modeling software team.

Later public material also contains an `ML Modeling Engineer - Aeon Team` role.

Investigate:

1. When does `Aeon` first appear in public Apple material?
2. Is Aeon consistently described as a team, project, software framework, or something else?
3. Are Munich and Cupertino Aeon roles visibly connected?
4. Are there additional Aeon roles, people, publications, patents, or technical materials?
5. Does direct public evidence connect Aeon to other Apple behavioral-modeling or model-validation activity?
6. Does direct public evidence connect it to PMU, SerDes, PLL, memory-interface, data-converter, or broader AMS methodology work?
7. Which apparent connections are only similarities and remain unestablished?

Do not resolve ambiguity by inference in Golden events. If a source only says `Aeon Team`, record exactly that.

Also inspect other Apple internship clusters for named projects or unusually detailed AMS/RNM methodology signals.

## People as discovery paths

People are valuable discovery paths, but not evidence of causal transfer by themselves.

Use people to discover:

- earlier publications;
- conference talks;
- standards activity;
- patents;
- prior employers;
- affiliation changes;
- Apple-era technical activity;
- related Apple teams/jobs.

Create a Person record/event only when that person's own public technical trajectory materially helps the factual timeline. Do not build an employee directory.

### Frank O'Mahony

Use Frank O'Mahony as a discovery lead. Previous public activity connects Apple recruiting around mixed-signal behavioral modeling/model validation with SerDes, DDR, PLL, data converters, and mixed-signal clocking/control.

Use those references to locate stronger primary evidence and related organizational threads. Do not infer ownership of an Apple-wide methodology from recruiting posts.

### Scott Little

Use Scott Little as another lead. His historical public activity includes substantial AMS/SystemVerilog methodology and standards work from previous employers, while later public activity is associated with Apple.

Investigate when Apple affiliation becomes publicly established and what Apple-era activity becomes visible after that point.

Do not turn pre-Apple work into Apple historical events.

### Alvaro Caicedo

Use Alvaro Caicedo as another lead. Earlier public work from his pre-Apple career includes RNM, EEnet/SystemVerilog UDN, DMS, UVM, power-regulation modeling, loading effects, and LDO/power-related models.

This is technically interesting in light of later Apple PMU public material, but similarity is only a reason to investigate.

Do not infer that he introduced these techniques at Apple. Verify affiliation timeline and look for Apple-era public activity.

## Critical affiliation rule

For every publication, conference contribution, patent, technical talk, or other person-related event, verify affiliation at the time of that event.

Never use a person's current employer to label an older event.

Work performed at Intel, Texas Instruments, Qualcomm, academia, or another employer remains an event for that person's timeline and that employer at the time.

If a later Apple affiliation is publicly established, record the affiliation change separately when it materially matters.

Possible transfer of expertise is an Analysis question, not a factual causal connection.

## CAD / mixed-signal simulation infrastructure

Do not limit the research to model-authoring roles.

Look for meaningful public evidence around infrastructure such as:

- Xcelium / AMS Designer / Verisium;
- VCS;
- Questa / Symphony;
- simulator integration;
- discipline resolution and binding;
- IE setup / connect modules;
- wreal;
- RNM;
- UDN;
- Verilog-A / Verilog-AMS;
- mixed-signal simulation speed/capacity/accuracy;
- regression infrastructure;
- CAD automation;
- LLM/AI-assisted CAD work.

A tool listed as a desired skill does not prove Apple-wide production deployment. Preserve source modality.

## Main historical questions

Use the current timeline to drive backward and sideways research.

1. When does explicit SystemVerilog behavioral modeling first become publicly visible at Apple?
2. When does explicit RNM / real-number modeling first become visible?
3. When does dedicated model validation or model verification become visible?
4. How far back can model-versus-circuit correlation or formal-equivalence-style checking be traced?
5. How far back can behavioral-model regression be traced?
6. How far back can reusable model libraries/model infrastructure be traced?
7. When does full-chip DMS become explicitly visible?
8. When does transistor/schematic correlation become visible?
9. When does silicon correlation become visible?
10. Can public material distinguish model authoring, model validation, design verification, and CAD/simulation infrastructure?
11. Which domains show independent public evidence: PMU, Wireless/RF, SerDes, DDR/memory, PLL/clocking, data converters, SoC-level verification?
12. Is there direct public evidence of shared methodology, infrastructure, modeling software, or model reuse across Apple organizations?

Do not add milestones merely to fill missing years.

## Falsification

Actively try to break attractive narratives.

Test at least these alternatives:

- substantially similar capability was already public much earlier;
- apparent 2024–2026 progression is mainly a change in recruiting visibility/wording;
- PMU, Wireless, SerDes, and other teams use independent methodologies;
- technical backgrounds of people who later joined Apple are unrelated to their Apple responsibilities;
- job descriptions describe desired future capability rather than deployed practice;
- Aeon is narrower than it initially appears;
- Aeon is a team/hiring name rather than a framework;
- apparent progression results from different organizations becoming visible at different times.

Evidence that narrows or breaks a hypothesis is useful research.

## Source strategy

Prefer, roughly:

1. Apple official jobs and technical material
2. Apple-authored / Apple-affiliated papers
3. conference proceedings and presentations
4. standards activity
5. technically relevant patents
6. EDA-vendor material with clear Apple involvement
7. public professional posts as discovery leads
8. secondary job mirrors when originals disappeared or as discovery aids

Search student/intern roles explicitly.
Search historical job titles and distinctive phrases explicitly.
Search named projects such as Aeon explicitly.
Follow people when doing so may reveal harder-to-discover primary evidence.

## Working loop

Do not perform one giant collection phase followed by one giant organization phase.

Iterate:

Current Golden -> inspect gaps -> working hypothesis -> search -> follow lead -> challenge -> cluster duplicates -> promote/revise factual milestone -> inspect revised timeline -> repeat.

Do not persist large raw research collections.
Do not attempt to exhaust the web.

## Golden promotion

A source does not automatically deserve an Event.

Promote only milestones that materially add new factual information to the Apple timeline.

Examples include:

- first clear public evidence of a distinct modeling activity;
- dedicated model-validation work becoming visible;
- a new product/organization scope becoming visible;
- a named project/team such as Aeon becoming visible;
- a distinct methodology or infrastructure activity;
- a meaningful verified affiliation change;
- an important public technical publication/conference activity.

Cluster reposts, regional variants, and repeated hiring signals. If a new source only strengthens an existing milestone, update representative sources instead of creating another event.

Keep 1–3 representative sources per event.

## Fact discipline

Golden events preserve only what the source establishes.

For a job posting, prefer:

`Apple posted a role whose description includes ...`

Do not write `Apple uses ...` unless another source directly establishes usage.

For a paper, prefer `Apple-affiliated authors reported ...`.
For a patent, prefer `An Apple patent describes ...`.

Interpretation belongs outside Golden events.

## Deliverable

Advance Apple toward the AMS Signals v1.0 factual timeline.

Deliver:

- a compact, historically useful Apple Golden Timeline;
- corrected/stronger representative sources where appropriate;
- meaningful events found through internships/named projects such as Aeon;
- relevant People records/events only where their own public technical trajectory matters;
- no permanent technology taxonomy;
- no maturity scoring;
- no unsupported Apple-wide claims;
- no accumulated raw research dump.

Run `npm run check` and ensure the Astro build succeeds.

In the final PR description, separately summarize:

- Golden events added/revised/merged;
- people added;
- important source discoveries;
- major investigated findings intentionally not promoted;
- unresolved questions;
- promising future Analysis-column hypotheses.

Do not put those hypotheses into factual Golden events.
