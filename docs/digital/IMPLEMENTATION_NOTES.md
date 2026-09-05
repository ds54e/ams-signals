# Digital implementation and review notes

## Vertical Flow refinement (2026-09-06)

Starting commit: `cded7cf77df8c3d8caea927585025d0e794deab6`. The existing single-index migration was complete. This refinement keeps all **35 Analog / 33 Digital** entries, their reviewed Flow assignments, descriptions, source arrays and activity records. Rechecked every entry's description and cited Flow notes; the prior migration had already incorporated useful technical identifiers and documented per-project primary-source decisions.

The title now contains only a plain-text name immediately followed by external primary links. Role/AI fields had no independent consumer after removing their labels, so the frontmatter fields, schema plumbing and shared tag helper are removed. Useful sourced implementation and development evidence stays in research prose without an active classification enum.

Flow is vertical, one stage per line, with 3px gaps and 1.4 line height. The 1120px index uses **Project 798px / Flow 170px / Activity 108px**, with 22px column gaps, stacking below 900px. The Activity date uses normal weight **400**; the unchanged 5×12px upright cells, 2px gaps and 82px band retain the existing date / band / N/12 months structure. Primary links follow the name with a 12px flex gap. Articles-last navigation and noindex/nofollow remain unchanged.

## Vertical Flow refinement validation

`npm run check`, explicit Analog **20/20** and Digital **22/22** unit tests, and the complete Chromium smoke suite **70/70** pass. Both pages were visually reviewed at **1440, 1280, 1024, 390 and 320px**, including multi-stage CoreSmith, single-stage simulators, Surfer and first/middle/last entries. Flow is vertical, title lines contain only names and source links, dates are normal-weight and no overlap/overflow occurs. Keyboard/no-JS behavior, forced colors and activity/source checks remain covered.

See the [paired data and HTML integrity checks](../analog/IMPLEMENTATION_NOTES.md#vertical-flow-refinement-validation): all 68 retained project fields and both activity snapshots match, as do all 283 non-catalog HTML pages and the factual export. Obsolete classification fields are rejected by both strict schemas. Browser automation remains Chromium-only. No deployment or workflow modification is included.

## Previous Flow migration (2026-09-05)

Starting commit: `48810ade612772d169f033da7569571fe03c304e`. That migration retained the 35 Analog / 33 Digital entries and their source/activity provenance, replaced the former taxonomy with `flow` and removed the overview, keyword fields and fragment-navigation infrastructure without a compatibility layer.

Every existing entry's description, technical identifiers and research/classification body were reviewed. Cited primary material was reopened for all 68 entries, including pinned repository READMEs, implementation files and the ATLAS paper. This is a scope migration, not an activity refresh or independent benchmark reproduction. Each authored file records its individual Flow decision and a source reference. Useful identifiers such as ngspice, SKY130, Spectre, SystemVerilog, Yosys and OpenROAD remain in natural descriptions; no hidden search vocabulary is retained.

## Flow migration validation

The paired-catalog review passed `npm run check`, Analog **20/20** unit tests, Digital **22/22** unit tests and the complete production-preview Chromium suite **71/71**. Both indexes were visually reviewed at **1440, 1280, 1024, 390 and 320px**, including first/middle/last and multi-link/multi-stage rows. No overflow or overlapping content was found; keyboard/no-JS operation, forced colors, source links, all activity bands, Articles-last navigation and viewer isolation pass.

Activity snapshots, source arrays, retained project metadata, Golden data, Article bodies and factual export are unchanged. The 283 non-catalog pages differ only in primary navigation order. See the [paired integrity and validation record](../analog/IMPLEMENTATION_NOTES.md#flow-migration-validation) for counts and the export hash. Browser automation remains Chromium-only, and no external EDA/benchmark result was independently reproduced. No deployment or workflow change is included.

## Flow classification decisions

- Standalone simulators (**Icarus**, **iverilog-uvm**, **eevee-rs**, **Verilator**, **vitamin**, **xezim**) have core Verification only. Their internal parsers/elaborators/compilers do not establish Design or Synthesis. Waveform/debug tools, formal drivers and testbench agents also serve Verification; generating tests is not generating the DUT.
- **slang** exposes reusable, round-trippable design representations/code tooling (Design), with supporting static diagnostics (Verification). **Surelog + UHDM** produces the elaborated design model (Design); downstream synthesis/simulation consumers are not automatically separate stages.
- **sv-elab** has core Synthesis with supporting Design for reusable word-level lowering. **uhdm2rtlil** is explicitly a synthesis frontend, with supporting verification campaigns; it does not gain Design simply for having an IR. **Verible** supports HDL authoring/formatting (Design) and secondary lint (Verification), not logic synthesis.
- **CIRCT** has core Design and Synthesis, plus supporting upstream LLHD/BMC/LEC Verification. The unavailable Normal fork supplies no evidence.
- **Dr. RTL** has core Design, Synthesis and Verification. Reopened README and existing execution evidence describe DC/Formality/Jasper runs and synthesis timing; Layout is omitted because no placement/routing flow is established. **CoreSmith** explicitly generates RTL, tests, Yosys synthesis and OpenROAD/Magic backend outputs, so all four stages are core.
- **OpenROAD** and **OpenROAD-MCP** are core Layout for their physical implementation operations. Do not inherit every surrounding flow dependency. **vivado_mcp** directly exposes synthesis and implementation, with supporting XSim Verification.
- **OpenADA** retains core Verification and Layout for native checks/tests and DRC/LVS; mapped synthesis is supporting in its broader tool contract. Synthesis-stage timing does not establish physical closure, and tool integration alone does not establish Design.

Each of the 33 authored files records its own Flow decision with cited evidence. No activity snapshot or source URL changes in this migration.

## Original Digital release review

Reviewed on **2026-09-05** against the inclusive **2025-09-05** meaningful-activity cutoff. Of the bounded 35 candidates, **34 are included**: 33 canonical GitHub repositories and one source-backed GitLab project (Surfer). SANGAM is omitted under the conservative meaningful-activity rule. No watch-list projects were added.

The review opened each canonical README/default branch, inspected implementation files and substantive first-parent changes, and pinned source references in each content file. Development evidence came from direct author statements or sustained core co-authorship; runtime-agent descriptions relied on implemented operating interfaces. No external simulator, commercial EDA flow or benchmark result was independently reproduced.

## Current canonical repositories and activity

Monthly buckets count first-parent commits reachable from each captured default-branch tip, by UTC committer date, from October 2025 through the partial September 2026 month. Related repositories, side-branch/PR commits, stars and issues are not summed. Numeric GitHub repository IDs detect identity replacement. The checked-in snapshot records capture time, head SHA and manually reviewed meaningful commit SHA/date. Source files retain the corresponding commit URL.

| Project | Primary repository / default branch | Latest public date | Meaningful date |
| --- | --- | --- | --- |
| CIRCT | [llvm/circt](https://github.com/llvm/circt) / `main` | 2026-09-04 | 2026-09-03 |
| cocotb | [cocotb/cocotb](https://github.com/cocotb/cocotb) / `master` | 2026-09-01 | 2026-09-01 |
| CoreSmith | [facebookexperimental/coresmith](https://github.com/facebookexperimental/coresmith) / `main` | 2026-08-27 | 2026-08-27 |
| Dr. RTL | [hkust-zhiyao/DR_RTL](https://github.com/hkust-zhiyao/DR_RTL) / `main` | 2026-09-04 | 2026-09-04 |
| eevee-rs | [dellerbr/eevee-rs](https://github.com/dellerbr/eevee-rs) / `main` | 2026-07-28 | 2026-07-28 |
| EQY | [YosysHQ/eqy](https://github.com/YosysHQ/eqy) / `main` | 2026-09-03 | 2026-09-03 |
| HAVEN | [mcc311/haven](https://github.com/mcc311/haven) / `main` | 2026-03-16 | 2026-03-16 |
| Icarus Verilog | [steveicarus/iverilog](https://github.com/steveicarus/iverilog) / `master` | 2026-09-04 | 2026-09-04 |
| iverilog-uvm | [dsellerbrock/iverilog-uvm](https://github.com/dsellerbrock/iverilog-uvm) / `main` | 2026-09-05 | 2026-09-05 |
| MCY | [YosysHQ/mcy](https://github.com/YosysHQ/mcy) / `main` | 2026-08-04 | 2025-10-15 |
| OpenADA | [simra-tech/OpenADA](https://github.com/simra-tech/OpenADA) / `main` | 2026-08-12 | 2026-08-12 |
| OpenROAD | [The-OpenROAD-Project/OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD) / `master` | 2026-09-04 | 2026-09-04 |
| OpenROAD-MCP | [The-OpenROAD-Project/OpenROAD-MCP](https://github.com/The-OpenROAD-Project/OpenROAD-MCP) / `main` | 2026-09-04 | 2026-08-24 |
| Pono | [stanford-centaur/pono](https://github.com/stanford-centaur/pono) / `main` | 2026-09-05 | 2026-09-05 |
| RTLDebugDBKit + RTLTracer | [neveltyc/RTLDebugDBKit](https://github.com/neveltyc/RTLDebugDBKit) / `main` | 2026-09-01 | 2026-08-30 |
| Sentinel DV | [kiranreddi/sentinel-dv](https://github.com/kiranreddi/sentinel-dv) / `main` | 2026-07-31 | 2026-07-31 |
| slang | [MikePopoloski/slang](https://github.com/MikePopoloski/slang) / `master` | 2026-09-05 | 2026-09-04 |
| Spec2Cov | [advent-lab/Spec2Cov](https://github.com/advent-lab/Spec2Cov) / `main` | 2026-01-20 | 2026-01-20 |
| Surelog + UHDM | [chipsalliance/Surelog](https://github.com/chipsalliance/Surelog) / `master` | 2026-09-04 | 2026-09-04 |
| Surfer | [surfer-project/surfer](https://gitlab.com/surfer-project/surfer) / `main` (GitLab) | 2026-09-04 | 2026-09-04 |
| sv-elab | [povik/sv-elab](https://github.com/povik/sv-elab) / `master` | 2026-08-31 | 2026-08-31 |
| SymbiYosys | [YosysHQ/sby](https://github.com/YosysHQ/sby) / `main` | 2026-08-04 | 2026-07-07 |
| UCAgent | [XS-MLVP/UCAgent](https://github.com/XS-MLVP/UCAgent) / `main` | 2026-08-31 | 2026-08-31 |
| uhdm2rtlil | [alainmarcel/uhdm2rtlil](https://github.com/alainmarcel/uhdm2rtlil) / `main` | 2026-09-05 | 2026-09-05 |
| Verible | [chipsalliance/verible](https://github.com/chipsalliance/verible) / `master` | 2026-09-02 | 2026-09-02 |
| VerifyRTL | [nimishadeepak10/verify-rtl](https://github.com/nimishadeepak10/verify-rtl) / `main` | 2026-09-03 | 2026-09-03 |
| Verilator | [verilator/verilator](https://github.com/verilator/verilator) / `master` | 2026-09-04 | 2026-09-04 |
| vitamin | [tjddnr0912/vitamin-rtl-simulator](https://github.com/tjddnr0912/vitamin-rtl-simulator) / `main` | 2026-09-05 | 2026-09-05 |
| vivado_mcp | [coreyhahn/vivado_mcp](https://github.com/coreyhahn/vivado_mcp) / `master` | 2026-02-05 | 2026-02-05 |
| wave-mcp | [Tencent/wave-mcp](https://github.com/Tencent/wave-mcp) / `main` | 2026-09-04 | 2026-09-04 |
| WHAT | [rain91508-cmd/what](https://github.com/rain91508-cmd/what) / `master` | 2026-07-24 | 2026-07-24 |
| xezim | [aionhw/xezim](https://github.com/aionhw/xezim) / `main` | 2026-09-05 | 2026-09-05 |
| Yosys | [YosysHQ/yosys](https://github.com/YosysHQ/yosys) / `main` | 2026-09-04 | 2026-09-04 |

## Combined entries and canonical corrections

- **Surelog + UHDM** stays one entry. Activity uses `chipsalliance/Surelog`; `chipsalliance/UHDM` is a secondary source. The reviewed Surelog commit integrates an enum-folding correctness fix through its UHDM submodule, rather than counting UHDM history separately. The proposed GitHub Pages website returned 404 and is not exposed; Code remains the canonical link.
- **Ngspice + OpenVAF Enhancements** stays one combined source tree, now in Analog. Its Flow scope is Simulation on Analog. Its changes are not represented as already upstream in either independent project.
- **RTLDebugDBKit + RTLTracer** stays one entry. The primary database generator documents its downstream tracer, and the tracer implements bit-window propagation over that schema. Only RTLDebugDBKit supplies activity.
- **sv-elab** is the current name; `yosys-slang` is retained only as an internal alias. Current Yosys integration replaces an obsolete plugin-only characterization.
- **iverilog-uvm** is Icarus-derived but its canonical GitHub repository reports `fork: false`; it has its own public verification implementation. Upstream Icarus remains a separate record.
- **Spec2Cov** is the verified canonical repository despite an old `llm-verif` clone example in its README.
- **OpenROAD-MCP** currently ships the TypeScript implementation. Its implemented ORFS flow actions and persistent sessions are described without attributing those agent interfaces to OpenROAD itself.

## Development and runtime evidence

| Project | Direct evidence used |
| --- | --- |
| xezim | Author README identifies AI agents as core implementation contributors; runtime changes corroborate this. |
| vitamin | Repeated Claude co-authorship across core parser, elaboration and runtime changes, including the pinned September parser commits; not one isolated commit. |
| iverilog-uvm | Author README credits Claude with the bulk of the verification-language/UVM extension under human review. |
| Ngspice + OpenVAF Enhancements (now Analog) | Explicit Claude-assisted development description plus AI-coauthored Verilog-A compiler fixes. |
| uhdm2rtlil | README describes Claude implementation of C++ UHDM-to-RTLIL handlers, corroborated by translation fixes. |
| WHAT | Author explicitly credits AI with the principal architecture/functions and implementation. This does not imply an AI runtime. |
| vivado_mcp | Author states the tool was created through Claude conversations; session-manager source corroborates it. Its implemented MCP tools are available to agents at runtime. |

Runtime verification/optimization agents or implemented agent interfaces are documented for Dr. RTL, VerifyRTL, HAVEN, UCAgent, Spec2Cov, wave-mcp, Sentinel DV, OpenROAD-MCP, OpenADA and CoreSmith. OpenADA is included for its implemented CLI/agent-skill contract, not for a future MCP binding. Occasional coding-agent commits, particularly in Pono and upstream CIRCT, do not by themselves establish distinctive project-wide development practices.

## Meaningful activity and snapshot limitations

Mechanical latest activity and curated eligibility deliberately differ. The strip includes all first-parent commits, including maintenance/bots, and remains binary. The record is not a quality or total-effort measure.

- MCY qualifies through the **2025-10-15 Qt 6 port**, not the August 2026 formatting cleanup. SymbiYosys uses its July rIC3 integration, not later formatting-only commits.
- Ngspice/OpenVAF binary-publication automation does not establish meaningful freshness; the preceding compiler constant-context fix does. OpenROAD-MCP uses the August implementation of flow/tool operations rather than later dependency/release traffic. RTLDebugDBKit uses its schema-v22 change rather than later source-path documentation.
- Pono's reviewed manual dependency pinning supports reproducible builds and is substantive maintenance, distinct from automated dependency churn.
- GitHub push times can reflect other branches. For example, vivado_mcp's captured default-branch latest date is **2026-02-05 UTC**, not its later repository push date. UTC normalization can also move a late local evening into the following day.
- HAVEN has a bulk initial release; the strip records that landing once. It does not reconstruct private development or the time taken to create the released benchmark.
- Snapshot SHAs record the reviewed public state, not a live browser feed. Upstream history can later change; refresh rejects lost meaningful commits and requires manual reassessment.

## Surfer history review

- Reopened the [official project site](https://surfer-project.org/), [canonical GitLab repository](https://gitlab.com/surfer-project/surfer), README and implementation history. The [GitLab project API](https://gitlab.com/api/v4/projects/surfer-project%2Fsurfer) identifies public project **42073614**, `surfer-project/surfer`, default branch **main**. Its branch API and a bare, blob-filtered, non-shallow clone agree on head `db1ca915a989860f11c440b0a932b1f5fbce71b2`.
- Recorded **2026-09-05T10:38:13.156Z** as this record's capture time, leaving the existing snapshot metadata and every other activity record untouched. Counted the complete first-parent committer history in UTC, using the existing **2025-10 through 2026-09** window. Monthly counts are **47, 51, 99, 35, 66, 28, 31, 40, 10, 32, 17, 7**: **463 commits / 12 active months**, independently cross-checked from the 1,471-entry first-parent history. Counts stay informational; a month with one commit has the same visible fill as a month with many.
- The latest and manually meaningful date remain **2026-09-04**. The same [previously cited commit](https://gitlab.com/surfer-project/surfer/-/commit/db1ca915a989860f11c440b0a932b1f5fbce71b2) opens the log window when an error is logged; inspection of `logs.rs` and `view.rs` confirmed substantive implementation. Its committer time is **2026-09-04T11:44:01Z**. The existing authored `activity` source and all visible primary links are preserved; no GitHub mirror is involved and sorting does not change.
- No other project changes from date-only to monthly history. ngspice and ATLAS retain source/paper dates. Generic records pin canonical Code URL, host-scoped repository ID, branch, head, capture time, twelve buckets, meaningful date/SHA and commit-source ID. Refresh scripts preserve these manually reviewed records; a new snapshot month requires reviewed recapture instead of silently relabeling their buckets.


## Omitted initial candidate

**SANGAM**: the canonical [CoolSunflower/SANGAM](https://github.com/CoolSunflower/SANGAM) repository exists and its simulation/formal-guided assertion workflow is relevant. However, the [2026-02-25 tip](https://github.com/CoolSunflower/SANGAM/commit/13c4ea0fb30236042f56f0a609750082c8a8ea54) changes setup documentation and the environment example; it does not update the implementation or released run/result artifacts. Those changes remain at [2025-05-15](https://github.com/CoolSunflower/SANGAM/commit/b3957c2a341d4fd28c8dc992a8d44ff11343d9b1), before the cutoff. Conservatively, a later setup write-up alone was not accepted as reactivation. Revisit when substantive implementation, execution infrastructure or result maintenance is public.

## Watch list (not public catalog entries)

- `jwd83/svsim`; WAVE/FORM / `owaveform`; `dau-dev/dau-sim`.
- ConfiBench; UVMarvel; Veri-Sure; CodeV-SVA; AssertionForge; HierSVA.
- WaveCrux; VaporView; `najaeda/naja-scope`; pyslang-mcp; fpga-mcp.
- OpenROAD Agent; Vibe-IC.
- nktkt's `svc`, `x4svsim`, `sv-lsp`, `svpm`, `sv-explore`, `svpp`.
- Synlig; FuseSoC; Edalize; NVC; GHDL.

## Explicit exclusions

- **Normal Computing CIRCT fork:** the requested review baseline could not reliably retain/verify its canonical public repository. Keep it as an Article/research lead, not an active entry, and do not transfer its claims to upstream CIRCT.
- **ORFS-Agent:** the supplied review baseline observes default-branch activity at **2025-08-05**, before the **2025-09-05** cutoff. It is not included, and the cutoff is not relaxed.

## Manual refresh procedure

1. Re-open the canonical source and inspect substantive default-branch changes. For accepted updates, change the manually curated meaningful date/SHA together with its content source URL; leave them unchanged for cosmetic/bot traffic.
2. Run `npm run refresh:digital-activity` with `gh` and Git available. It verifies identity and first-parent history, preserves manual records, validates the whole snapshot and replaces it atomically. Any failure leaves production data intact.
3. Review the JSON diff, especially default-branch changes and raw latest dates. Re-review Surfer directly on GitLab, pin its default-branch tip and capture time, and bucket the full first-parent committer history in UTC. Preserve its manually chosen meaningful commit unless new source review justifies a change. Its record is never replaced with a mirror; recapture monthly history before advancing the snapshot window.
4. Run `npm run check` and `npm run test:smoke`. Refresh is never part of those commands or a normal build.
