# Digital implementation and review notes

## Chronological activity and shared dates (2026-09-06)

Starting commit: `e99ab67abe2c3831a9660fd536a71c24586fce92`. Activity now reads oldest on the left to newest/current on the right. Removing the render-only reversal preserves all twelve month/value pairs, counts, signals, provenance, dates and project order. Hover text, hidden descriptions and `data-month` stay paired; the accessible window label says “oldest to newest”. Catalog and Events share a calendar formatter and uppercase `.index-date` styling (`SEP 5, 2026`), retaining normal-weight monospace typography. The date → activity → Scope rail and its dimensions are unchanged.

## Shared categorical palette (2026-09-06)

Starting commit: `d677b9a93147aa3c3798966749063ea99dfea1a0`. A further chroma reduction moves all five category colors into `foundation.css`. Catalog Scope, Events badges and Timeline glyphs/legends now share the same blue and rust through the existing Technical/Organizational aliases; AI-built remains a separate muted red. The shared label primitive owns foreground and forced-colors styling as well as its unchanged typography and dimensions. The [visual system](../VISUAL_SYSTEM.md) records both palettes, mappings and measured contrast.

This cleanup leaves every authored content/data file, description, Scope assignment, activity value, layout and filter unchanged. Browser coverage changes the foundation tokens to verify that all surfaces inherit them, alongside light/dark contrast and forced-colors checks.

## Palette and description refinement (2026-09-06)

Starting commit: `1abb5e4e476684d2b0dbf084ce7b39b8a82df32e`. Both catalogs now use the same **122px rail / 12px gap / 786px body** at the unchanged 920px listing width. A coordinated teal, blue, yellow-olive, copper and crimson palette replaces the closely spaced hues; dark mode uses the same identities with separately chosen fills. The [visual system](../VISUAL_SYSTEM.md) records exact values and measured contrast. Uppercase Events badge typography, 10px Activity-to-Scope spacing and 5×10px ticks remain unchanged.

All **33 Digital descriptions** were reread and expanded using the existing source references and classification notes, reopening pinned READMEs and implementation files. The additional sentence identifies the execution model, downstream artifact, tool integration or important workflow boundary. This is a description review, not an activity refresh or Scope reassessment.

Examples include cocotb's simulator-event scheduling, Verilator's generated-model harness, EQY's partition/proof outcomes, and CoreSmith's explicit human-review paths. Surfer's native/client-server and browser distinction comes from its canonical GitLab README, not a mirror. Sentinel replay still produces commands rather than running simulations. The experimental Icarus-derived UVM project and eevee-rs do not claim complete language conformance. After screenshot review, iverilog-uvm was tightened and uhdm2rtlil's second sentence focused on the Surelog-to-Yosys synthesis path.

Membership, Scope/AI booleans, source arrays, Markdown research bodies and every activity snapshot value are unchanged. Search regressions cover SystemVerilog, UVM, Yosys, OpenROAD, formal, waveform, synthesis and AI using only visible content.

## Compact Scope labels (2026-09-06)

Starting commit: `47b6bc9a4abab7a365fed2b7becf450cb717b4f8`. This change introduced the paired metadata-rail/project-body index at the shared 920px listing width. Date → twelve activity ticks → filled category labels form one compact block. The month total is non-visible. The common component, filter and style path remains authoritative; no compatibility schema or second taxonomy is retained.

The [explicit per-project Scope review](../CATALOG_SCOPE_REVIEW.md) records all 20 reassessed assignments, retained/removed decisions, primary evidence and the full 68-description review. Membership stays **35 Analog / 33 Digital**. Source arrays, review/activity dates, repository identities, SHAs and buckets are unchanged. Scope AI booleans remain unchanged for retained stages. AI-built is now optional true, with the same seven evidenced projects across both domains.

The [visual system](../VISUAL_SYSTEM.md) records final dimensions, colors, responsive behavior and the screenshot refinement. Search and stage filtering still combine with AND using public text only. Without JavaScript every project remains readable. Events badges, Articles count, left-grouped toolbars and Timeline glyphs are preserved.

## AI classification judgments

- **CoreSmith** has AI on all four stages for specific implemented operations: RTL/testbench generation, synthesizability repair, and backend agents that adapt/run tool scripts with fix loops. The reviewed pipeline and linked backend graph distinguish this from merely launching Yosys/OpenROAD. No independent signoff result is implied.
- **Dr. RTL** has AI Design. Its README calls the synthesis/SEC evaluator execution-only, and the pinned orchestrator chooses RTL attempts from tool-derived results. Synthesis and Verification remain unprefixed; no routed Layout or AI proof engine is inferred. This deliberately narrows the illustrative all-agent interpretation to the checked implementation.
- **HAVEN**, **UCAgent**, **Spec2Cov** and **VerifyRTL** have AI Verification for implemented test/property generation, diagnosis or coverage decision loops. Those are not DUT Design stages.
- **wave-mcp**, **Sentinel DV**, **OpenROAD-MCP**, **OpenADA** and **vivado_mcp** expose tools/evidence to outside agents. Their MCP/CLI boundary alone does not prove AI behavior inside a stage.
- AI-built is retained from direct development evidence for **xezim, vitamin, iverilog-uvm, uhdm2rtlil, WHAT and vivado_mcp**. Their executed simulator/compiler/debug/tool operations remain conventional. **Pono**, upstream **CIRCT** and other established tools do not gain this signal from occasional AI commits. No additional AI-built claim is introduced in the simplification.

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
- **Ngspice + OpenVAF Enhancements** stays one combined source tree, now in Analog. Its Scope is Simulation on Analog. Its changes are not represented as already upstream in either independent project.
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

## Veryl and XLS expansion — 2026-09-06

Read all 33 existing entries and confirmed neither project was present. Added [Veryl](../../src/content/digital/veryl.md) and [Google XLS](../../src/content/digital/xls.md), bringing the collection-derived inventory to 35. Their descriptions contain 39 and 35 words respectively. Current implementation, release boundaries, stage decisions and primary references are recorded in the entries; this pass does not change the Scope vocabulary or presentation.

Both entries have conventional Design, Synthesis and Verification. Veryl's native simulation belongs to the existing Verification stage; its native synthesis is an early gate/PPA estimation flow. XLS earns Verification through user-facing DSLX property proving and IR/netlist equivalence commands, with bounded proc checking explicitly distinguished from unrestricted proof. Downstream physical tools do not establish Layout for either entry.

Veryl receives AI-built under the existing meaningful-development-provenance rule because the maintainer describes substantial assistance to the shipped native simulator, beyond incidental commits. The entry limits that assessment to the subsystem, separates pre-existing architecture from assisted language support, and corroborates continuity through the engine landing, retained benchmark and current CLI. A crate within `veryl test` does not justify a second product row. No runtime AI stage is inferred. XLS has no AI-built assertion.

The canonical identities are `veryl-lang/veryl` (**575770340**, `master`) and `google/xls` (**262163993**, `main`). Complete, non-shallow first-parent histories were counted through the existing `countActivity` helper, then `npm run refresh:digital-activity` recaptured all 34 GitHub records at **2026-09-06T10:27:19.856Z**. The window remains **2025-10 through 2026-09**, in chronological order. Veryl's captured tip is `10c4d89a548dcab2d395384de6cc0c4e266863aa`; its latest and meaningful dates are September 4, with meaningful fix `a889bf2cbe003b1c8438d18f92f88deb4940351d`. XLS's latest and meaningful tip is `1b53da61b4ada47576818851dc6a4018d81d1dcb`, September 5 UTC; the September 6 binary publication is not substituted for its commit date.

The refresh mechanically advances head/count/latest fields for ten existing projects. Their manually reviewed meaningful commits, authored descriptions and source arrays are retained. Surfer retains its own September 5 capture and identical monthly history; it is not relabeled as newly captured. No Analog activity, Golden records, Articles or export data are changed.

`npm run check` passed with 23 Analog and 24 Digital unit tests, a 285-page build and 2,976 internal-link checks. Existing tests now check domain separation without a fixed project count and derive invalid future dates from the snapshot. The production-preview Chromium suite passed **98/98**, including the requested search terms, both new Scope/provenance decisions and chronological activity. Reviewed first, middle, last and new rows at **1440, 1280, 1024, 390 and 320px**; descriptions and stacked labels fit without overflow. Forced-color, no-JS, filter and state-isolation checks pass. Baseline hashes confirm all 33 existing Digital entries, Analog content/activity, Golden data, Articles and styles are unchanged; `/export.json` remains SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`.

### Ranked next candidates, not additions

1. **Amaranth** — Python hardware construction, reusable interfaces, its own simulator and FPGA build integration fill an authoring-to-test gap; [0.5.9](https://github.com/amaranth-lang/amaranth/releases/tag/v0.5.9) shipped July 16, 2026, and [August implementation activity](https://github.com/amaranth-lang/amaranth/commit/e3c9215e195443aefde6c9591409d74802bdd10f) supports further review of the [documented toolchain](https://amaranth-lang.org/docs/amaranth/latest/intro.html).
2. **Spade** — Explicit pipeline abstractions offer a distinct RTL authoring model alongside Veryl, while [0.20.0](https://blog.spade-lang.org/v0-20-0/) on August 20, 2026 adds associated functions and version-aware editor support to the [language and Swim workflow](https://spade-lang.org/).
3. **Chisel** — Scala hardware generators would explain the frontend side of the existing CIRCT entry; [7.14.0](https://github.com/chipsalliance/chisel/releases/tag/v7.14.0) adds domain APIs, LTL and explicit truncation in August, with [7.15.0](https://github.com/chipsalliance/chisel/releases/tag/v7.15.0) following September 1, 2026.
4. **Clash** — Haskell-based hardware compilation adds a functional, typed workflow, and [1.10.1](https://github.com/clash-lang/clash-compiler/releases/tag/v1.10.1) on August 27, 2026 introduces checked literals and compiler performance work after the [1.10 language/toolchain update](https://clash-lang.org/blog/2026-04-28-clash110/).
