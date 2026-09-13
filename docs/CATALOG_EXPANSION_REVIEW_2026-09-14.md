# Catalog expansion and activity refresh — 2026-09-14

This bounded review follows the September 7 catalog expansion. It adds three Analog and three Digital entries and refreshes repository-backed activity through the September 14 snapshot boundary. The catalogs remain current-landscape indexes rather than historical archives; inclusion still requires verified meaningful public activity within the rolling twelve-month curation window.

## Added projects

| Candidate | Decision / domain | Scope | Distinctive role |
| --- | --- | --- | --- |
| cocotbext-ams | Add / Analog | Simulation | Bridges cocotb-driven HDL simulation with ngspice/Xyce mixed-signal blocks and event conversion. |
| IHP SG13G2 AMS Chip Template | Add / Analog | Design + Simulation + Layout | End-to-end open-source mixed-signal chip template spanning schematics, verification, hardening, top assembly and physical checks. |
| gLayout | Add / Analog | AI Layout | PDK-aware analog layout framework with an implemented LLM-oriented Python PCell generation/repair path. |
| UVM 2020-3.2 Reference Implementation | Add / Digital | Verification | Current Accellera UVM reference release; the downloadable 3.2 state is kept distinct from the public GitHub repository's older release line. |
| pyuvm | Add / Digital | Verification | Python implementation of widely used UVM concepts on cocotb, including substantial but explicitly incomplete RAL coverage. |
| RTLScout | Add / Digital | AI Design + Synthesis + Verification | Agentic RTL generation/optimization with deterministic correctness and cost evaluation plus elite-pool/Pareto workflows. |

## Activity snapshot

Both activity datasets are reviewed at `2026-09-14` with capture time `2026-09-14T00:00:00.000Z`. Repository-backed rows are mechanically refreshed from each canonical default branch using first-parent committer timestamps. The refresh updates current branch identity, head SHA, twelve monthly commit buckets and mechanical latest-commit date while retaining previously reviewed meaningful-activity checkpoints unless separately reassessed.

The UVM 2020-3.2 entry is a public-update record rather than a GitHub activity record. Accellera gives month precision (`2026-08`) for the current 3.2 download while the public GitHub release line remains behind it. A dated August 23 public observation is used only as the bounded exact-date activity signal; no exact Accellera release day is invented.

## Razavi-Bench history boundary

Razavi-Bench required a separate reassessment. On September 13 its default branch was republished as a parentless root commit containing the current benchmark, evaluator, website and simulator assets. The September 14 snapshot therefore starts a new first-parent activity history at that root and records the root snapshot as the current meaningful checkpoint. Earlier activity is not fabricated into the rewritten branch history.

## Validation

The one-shot refresh used the repository's existing Analog and Digital activity refresh logic with a fixed September 14 capture timestamp. After refresh, the temporary workflow and seed files were removed. The final branch passed the repository's deterministic `npm run check` sequence before the refresh commit was pushed.
