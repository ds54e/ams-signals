# Catalog refresh review — 2026-09-22

## Decision

Reviewed all 95 existing entries (45 Analog, 50 Digital) against their canonical public sources. The rolling cutoff is 2025-09-22 inclusive. No existing entry is archived, disabled, identity-mismatched or outside the meaningful-activity window, so this refresh removes **zero** projects.

The catalog adds AnalogXpert, nextpnr, Chisel and Calyx. Spade's canonical identity moves from GitLab project 20965359 to Codeberg project 2600806; it remains one continuous project rather than a deletion and re-addition.

## Audit coverage

- 87 GitHub repositories: metadata, archive/disable state, canonical identity, default branch, current head and new first-parent commits.
- 3 non-GitHub repositories: PyOPUS on Codeberg, Surfer on GitLab and Spade's completed move to Codeberg.
- 5 point sources: ATLAS, ngspice, ViraStack, PyUCIS and UVM 2020-3.2.
- 30 GitHub heads changed after the September 18 snapshot. Meaningful activity advanced where implementation, correctness, tests or technical maintenance justified it. Razavi-Bench, Amaranth and PyUVM had only documentation, dependency or service-configuration changes, so their meaningful dates remain unchanged.

## Additions and holds

| Project | Decision | Boundary |
| --- | --- | --- |
| AnalogXpert | Add | Public topology agent, checker, prompts, subcircuits and datasets; AI Design only. |
| nextpnr | Add | FPGA packing/place-and-route and timing; conventional Layout. |
| Chisel | Add | RTL generator language plus integrated simulation control; conventional Design and Verification. |
| Calyx | Add | Accelerator IR, optimization and RTL lowering; conventional Design and Synthesis. |
| eda-agents | Hold | The reviewed revision is unchanged from the earlier focused review; generic analog-role dry-run paths still do not justify broader catalog claims. |
| ORACLE | Hold | The paper points to an anonymous review repository, not a stable canonical implementation identity. |

## Transfers and manual repositories

- **Spade:** canonical URL and activity provenance moved to https://codeberg.org/spade-lang/spade; the former GitLab tip records the move.
- **Surfer:** head advanced to September 13; September 12's gray-code translator is the latest meaningful change.
- **PyOPUS:** head and meaningful activity advanced to the September 16 equal-index XatIrange correction.

## Inactivity watch list

These entries still pass the cutoff, but are nearest to aging out if no new meaningful public work appears:

| Project | Last meaningful activity | First review date after expiry |
| --- | --- | --- |
| PeakRDL | 2025-09-28 | 2026-09-29 |
| MCY | 2025-10-15 | 2026-10-16 |
| EEschematic | 2025-10-19 | 2026-10-20 |
| ASTRA | 2025-10-28 | 2026-10-29 |
| AnalogGym | 2025-10-29 | 2026-10-30 |
| AMS-IO-Agent | 2025-12-25 | 2026-12-26 |

## Activity method

Monthly counts use first-parent committer dates in UTC for the fixed October 2025–September 2026 window. Mechanical latest-head fields and separately reviewed meaningful dates remain independent. Repository transfers preserve project continuity and never combine mirror activity.
