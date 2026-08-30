# AMS Signals v1 — Multi-Company Research Wave 1

Temporary brief. Remove after the Wave 1 PR is merged.

Read `PROJECT_CONTEXT.md` and `AGENTS.md` first. Apple is the reference implementation for event quality and compression, not a maturity benchmark.

## Goal

Expand the factual timeline across a broad first set of semiconductor companies in one coordinated pass.

Do not force equal coverage. Sparse but strong public evidence is acceptable. Do not create filler events to make timelines look symmetric.

## Core companies

Research these to a useful standalone factual timeline:

1. SiTime
2. Skyworks
3. Broadcom
4. Analog Devices (ADI)
5. Renesas
6. NXP
7. MediaTek
8. Microchip

## Scout companies

Establish a factual foothold and deepen only when the public record is promising:

9. Qualcomm
10. NVIDIA
11. Texas Instruments
12. Sony Semiconductor Solutions
13. OMNIVISION

## Ecosystem signal providers

Inspect these when they expose meaningful RNM/AMS methodology, standards, tooling, training, or customer evidence:

- Cadence
- Siemens EDA
- Synopsys

Do not rank EDA vendors against semiconductor companies.

## Common research lenses

Use these to guide search, not as permanent tags:

- behavioral modeling;
- RNM / SV-RNM / wreal / DMS;
- UVM / SVA / coverage / formal;
- digital-top / full-chip mixed-signal verification;
- model-versus-schematic / SPICE / silicon correlation;
- dedicated model validation / model verification;
- reusable model libraries / regression / sign-off / methodology ownership;
- central or enterprise AMS verification organizations;
- CAD/simulation infrastructure and automation;
- AI/LLM/agentic verification activity;
- internships and named projects;
- relevant people affiliation changes;
- M&A or organization changes that materially affect context.

These are research questions only. Do not add a technology taxonomy.

## Company-specific priorities

### SiTime

Highest priority direct timing comparison. Investigate the public verification-role family around SV-RNM, UVM, digital-top SystemVerilog verification, SVA, coverage, wreal/V-AMS, UVM-AMS, formal, and tape-out verification. Trace how far back it goes and whether model validation/correlation, reusable model infrastructure, or governance are publicly visible. Also record the 2026 Renesas Timing acquisition if useful, without inferring methodology transfer.

### Skyworks

Trace Verilog-A/SV-RNM, block-to-full-chip verification, schematic/model equivalence, PLL/ADC/DAC/LDO modeling, automation, and the 2026 public move toward a Central AMS Verification organization. Distinguish existing practice from responsibilities the new organization is supposed to build. Track AI/ML/agentic language factually.

### Broadcom

Trace large-SoC/SerDes/clocking activity around PLL/FLL/DLL control, MSV/RNM strategy, DMS, UVM, SVA, coverage, analog-boundary modeling, reusable verification environments, and AI-assisted generation/debug. Keep business-unit scope explicit.

### Analog Devices

Use original historical conference material where possible. Build a sparse methodology timeline covering verification planning, self-checking/constrained-random/coverage/regression, SystemVerilog RNM, UVM, AMS+DMS coexistence, UDN/EEnet/wreal, and model/RNM-to-SPICE validation. Preserve public evidence of team-to-team heterogeneity.

### Renesas

Trace PMIC/digital-power mixed-signal verification around RNM, Verilog-AMS, AMS/DMS, UVM, full-chip verification, schematic/model/silicon correlation, coverage closure, sign-off, and automation. Keep post-transfer Renesas evidence separate from the former Timing business unless directly linked.

### NXP

Trace SoC/full-chip AMS verification, SystemVerilog functional/real-number models, Verilog-AMS, UVM/coverage, and older conference or EDA-customer methodology evidence.

### MediaTek

Trace dedicated analog-modeling and mixed-signal verification activity across SoC domains, including RNM/SystemVerilog, oscillator/PLL, LDO/reference, ADC/DAC, RF, Python automation, full-chip integration, and any model-validation evidence.

### Microchip

Trace full-chip mixed-signal verification around PLL/ADC/DAC/power management, UVM/RNM/AMS, and public AI/LLM-assisted verification signals. Separate role expectations from deployed-practice claims.

## Scout guidance

### Qualcomm

High strategic value even if sparse. Search historical DVCon/DAC/EDA-vendor material, jobs, patents, and relevant people for RNM/DMS/UVM/full-chip methodology.

### NVIDIA

Look for AMS/RNM verification around SerDes, clocking, power, high-speed I/O, SoC integration, and simulation infrastructure.

### Texas Instruments

Look for historical/current RNM/DMS, EEnet/UDN, power-regulation modeling, UVM, analog verification, and model-validation methodology. TI is also useful for people/method lineage.

### Sony Semiconductor Solutions

Look for image-sensor and analog mixed-signal verification, behavioral modeling, SystemVerilog/UVM/AMS/RNM, clocking/power/interface verification, and Japan-specific public material.

### OMNIVISION

Look for image-sensor AMS verification, behavioral modeling, mixed-signal simulation, UVM/RNM/Verilog-AMS, interfaces, clocking, and power methodology.

## Research method

Work iteratively per company:

current Golden -> hypothesis -> search -> follow lead -> challenge -> cluster duplicates -> promote/revise factual milestone -> reassess.

Stop when additional searches mostly return duplicates or low-value material. Do not exhaust the web.

Search internships/student roles explicitly when they may expose named projects, experimental tooling, or future-facing methodology.

Follow people only when their own public technical history produces meaningful sources or affiliation milestones. Verify affiliation at the time of each event.

## Cross-company discipline

- Do not infer that similar terminology means identical methodology.
- Do not create maturity scores or rankings.
- Do not interpret missing public evidence as absence or secrecy.
- Do not infer company-wide practice from one team, role, or person.
- Cross-company hypotheses belong in the PR summary or future Analysis, never factual Golden events.

## Source priority

Prefer official company sources, company-affiliated papers, conference proceedings, standards activity, relevant patents, and EDA-customer material. Use professional posts and secondary job mirrors mainly as discovery or recovery aids.

## Golden promotion

A source is not automatically an Event. Promote only milestones that add new factual information to a timeline. Cluster repeated job families and regional variants. Keep 1–3 representative sources per event.

Preserve source modality: jobs describe what a company posted; papers describe what affiliated authors reported; patents describe what the filing says.

## Deliverable

Create/update company records and compact Golden timelines for the target set. Add People only when their own trajectory materially helps the record.

The PR description should summarize:

- companies researched;
- events added/revised/clustered per company;
- people added;
- strong source discoveries;
- major investigated items intentionally not promoted;
- companies where public evidence remained sparse;
- unresolved questions;
- cross-company patterns worth future Analysis.

Run `npm run check` and ensure the static build succeeds before opening the PR.
