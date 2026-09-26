# Catalog focused expansion review — 2026-09-26

## Decision

This is a focused expansion four days after the full September 22 review. It does not re-open every existing project for editorial reclassification. Existing repository activity is mechanically recaptured after the additions, while meaningful-activity dates remain manual review decisions.

The catalog adds three Analog projects and four Digital projects. No existing entry is removed in this pass.

## Analog projects added

| Project | Scope | Distinctive role |
| --- | --- | --- |
| AgenticSizing | AI Design + Simulation | Topology-aware multi-agent sizing with role-specialized workers and Cadence-backed candidate evaluation. |
| vibe-analog | AI Design + Simulation | Agent-native editable schematic/SPICE workbench with ngspice execution and an explicit no-layout/no-signoff boundary. |
| analog-agents | AI Design + AI Simulation | Role-separated architecture/design/verifier skills with Spectre/Virtuoso integration, pre-simulation review and PVT sign-off workflow. |

## Digital projects added

| Project | Scope | Distinctive role |
| --- | --- | --- |
| VeriRL | AI Design + Synthesis + Verification | OpenEnv action loop where agents write RTL and request deterministic Icarus, Yosys and SymbiYosys feedback. |
| VeriBugBench | Verification | Frozen executable RTL-debugging corpus plus mutation, observability and coverage-construction framework. |
| ICRTL-Benchmark | Design + Synthesis + Verification | Ten larger RTL design challenges with open Icarus/Yosys and optional Synopsys PPA evaluation flows. |
| Vibe-IC | AI Design + AI Synthesis + AI Verification + AI Layout | Contract-driven Claude Code/MCP-EDA flow spanning RTL generation through OpenROAD/KLayout/Netgen backend work under deterministic gates. |

## Focused boundary decisions

- **Vibe-IC Analog listing — hold.** The repository implements an A1-A9 analog runner and mixed-signal reporting path, but this pass lists the project only on Digital. A separate Analog review should distinguish native analog evidence from allowed deterministic stubs/waivers and decide whether cross-catalog duplication improves the reader surface.
- **LLM-SPICEMixer — hold.** The August paper presents a distinct LLM-guided genetic topology-synthesis method with SPICE as ground truth, but a stable public implementation was not verified in this pass. Keep it as a strong paper-backed follow-up rather than adding another point-source row immediately.
- **Spec2GDS Agent — hold.** The public repository is explicitly pre-results and preregisters later physical-design targets. Its intended contract is interesting but currently overlaps CoreSmith more than its released native evidence differentiates it.
- **HLSFactory-Agent — hold.** The implementation is public and active, but its primary contribution is repository-to-HLS-dataset extraction and Vitis HLS preparation. Adding it would broaden the present Digital boundary toward HLS dataset construction rather than fill a clear gap in the current four-stage catalog.
- **HINT, SynAct, ORACLE and the earlier generic agent/skill candidates — unchanged holds** unless stable implementation evidence materially changes.

## Classification notes

Runtime AI and deterministic EDA remain separate. An agent using simulator, synthesis, formal or physical-design output to revise a design does not automatically make the underlying solver AI. AI-prefixed non-Design stages are assigned only where the released workflow gives the model a material stage-specific interpretation, generation or remediation role.

Development provenance is not inferred from runtime AI, coding-agent compatibility, commit messages or instruction files. None of the seven new entries receives AI-ASSISTED or AI-BUILT provenance without separate direct evidence satisfying the shared policy.

## Activity refresh

The initial records pin canonical repository identities, reviewed meaningful commits and schema-valid placeholder month presence. A temporary branch-only GitHub Actions workflow then runs the existing Analog and Digital refresh scripts, which clone canonical repositories and recompute first-parent monthly history, current heads and latest commit dates for the September 26 snapshot. The temporary workflow is removed before the pull request is finalized.

Fresh commits do not automatically advance meaningful activity. Existing meaningful dates remain unchanged unless their post-September-22 commits are separately reviewed as substantive implementation, correctness, tests, technical maintenance or result updates.

## Validation and delivery

After activity recapture, remove the temporary workflow and run the repository's normal pull-request CI: deterministic checks plus the Chromium production-preview smoke suite. Articles, Golden Events, Golden factual data, viewer state and /export.json are intentionally unchanged. No Pages deployment is part of this update.
