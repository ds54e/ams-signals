# Digital implementation and review notes

## Seven-candidate expansion (2026-09-07)

After the provenance migration landed at `0760b732b328c05e0dbcd8ec2fe84f4ecb23579a`, the [focused review](../CATALOG_EXPANSION_REVIEW_2026-09-07.md) adds RgGen, PyUCIS and PeakRDL. The actual Digital collection grows from 40 to 43 entries: 11 AI-ASSISTED, 5 AI-BUILT and 27 unmarked. PyUCIS gains AI-ASSISTED for its directly attributed history/testplan/report implementation; all new runtime stages remain conventional. The preceding 75-project audit remains unchanged.

RgGen's optional SystemRDL integration is later than the stable release and preserves only its documented mapping, including hardware precedence. PeakRDL's root activity excludes component histories. PyUCIS separately verifies Git advertisement, declared mirror relationship, documentation and package authority; its unresolved host repository ID leads to the supported March 7 PyPI release point, without borrowed mirror buckets. The focused review records primary sources, the retained implementation/provenance boundary, exact dates and final validation results. Shared Scope fields, badge presentation and filters are unchanged.

## Two-label development provenance (2026-09-07)

Starting commit: `caf8f24a3626cdbe7cfdc8c5ac85742c6cb2d2cc`. The [complete new review](../AI_BUILT_REVIEW.md) was recorded before catalog classification changes and supersedes provenance rules and judgments in all historical sections below. At migration completion this domain had **10 AI-ASSISTED, 5 AI-BUILT and 25 unmarked projects**. Across the then-current 75 entries: 14 assisted, 6 built and 55 unmarked, from 7 previous built labels. CircuitRubric is deliberately unlabeled under the stronger evidence-scope requirement.

The shared model is optional `scope.aiDevelopment: assisted | built`, paired with `developmentEvidence` (factual summary, existing source IDs and independent review date). Legacy `aiBuilt` is rejected. Scope stages, runtime booleans, functional descriptions, activity snapshots and primary navigation remain unchanged. Shared outline/filled muted-red badges follow the stages with an 8px separation and open inline evidence through native buttons; static HTML includes the same explanation and links. Search uses only existing public project text plus the exact visible labels.

Validation: `npm run check` passed (27 Analog / 28 Digital unit tests), and all 104 production-preview smoke tests passed. Desktop/mobile light, dark and forced-color inspection confirmed badge fit, disclosure wrapping, visible focus and working links without overflow. Starting-inventory comparisons preserve all functional metadata and original source URLs; activity/Golden/Article files and the factual export are unchanged. The shared review records the full verification and historical boundary.

## AI-built provenance audit (2026-09-06)

Starting commit: `4345198dda42819bb099e3bb7c98e593254057c4`, after the Digital expansion. The [historical 75-project audit](../AI_BUILT_REVIEW_2026-09-06.md) was written before catalog data changed and governed that historical binary pass. Across both domains: **8 previous labels, 6 kept, 2 removed, 1 added, 7 final**, all Tier A. Digital now has five AI-built projects: iverilog-uvm, uhdm2rtlil, vivado_mcp, WHAT and xezim. Veryl and vitamin retain useful development notes with the project-level badge omitted.

The definition now requires substantial, directly evidenced development provenance of the project itself, independently of runtime AI. Earlier AI-built judgments below are historical and superseded by this audit. Functional descriptions, stage booleans, activity snapshots, visual design, Golden data and Articles are unchanged. Generic schema/rendering regressions replace hardcoded project-provenance lists.

Validation: `npm run check` passed, including both domain validators, 24 Analog and 25 Digital unit tests, fact lint, duplicate review, a 285-page build and 2,976 internal anchors. `npm run test:smoke` passed **98/98** after replacing an outdated hardcoded search expectation with inventory-derived matches. Manual before/after review at 1440px and 390px confirmed all three badge changes and retained styling; smoke coverage also passed at 320px. The 75-project matrix matches the final data. A 378-file baseline comparison found changes only in the three intended catalog entries; `/export.json` retained SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`.

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
3. Review the JSON diff, especially default-branch changes and raw latest dates. Re-review Surfer and Spade directly on canonical GitLab, pin each default-branch tip and capture time, and bucket each full first-parent committer history in UTC. Preserve manually chosen meaningful commits unless new source review justifies a change. These records are never replaced with mirrors; recapture both monthly histories before advancing the snapshot window.
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

## Spade, Kanagawa, SiliconCompiler, Amaranth and Dynamatic — 2026-09-06

Started from `main` after the Veryl/XLS addition (`9977a34`), read all 35 current entries and confirmed all five candidates were absent. All five satisfy the current-activity and technical-distinctiveness criteria, bringing Digital to **40 projects**. Their two-sentence descriptions contain 39–45 words. Revision-pinned implementation, release boundaries and Scope evidence are preserved in each new entry.

| Entry | Scope and reviewed boundary | Latest meaningful activity (UTC) |
| --- | --- | --- |
| [Spade](../../src/content/digital/spade.md) | Design: typed HDL and checked pipelines. Verification: integrated simulation/testbenches. Synthesis and Layout: Swim manages target configuration, Yosys netlists, pin constraints, routing/timing outputs and programming files. | [2026-09-05](https://gitlab.com/spade-lang/spade/-/commit/c48e232694966e52104498c4887ee6c860f17114): conditional propagation of non-`Data` values, with lowering, code generation and simulation tests. |
| [Microsoft Kanagawa](../../src/content/digital/kanagawa.md) | Design: imperative hardware authoring with Wavefront Threading. Synthesis: optimization, scheduling, pipelining and current CIRCT-to-SystemVerilog lowering. Compiler regressions do not establish a separate user-facing Verification stage; no Layout assignment. | [2026-09-02](https://github.com/microsoft/kanagawa/commit/98a2d8cbe16b74bf15a46c46a19b319c1a0bf78e): named CIRCT type aliases and ESI interfaces with tests. |
| [SiliconCompiler](../../src/content/digital/siliconcompiler.md) | Synthesis, Verification and Layout: first-class flow orchestration, including simulation, property/equivalence checking, ASIC/FPGA implementation and separate DRC/LVS. Source ingestion and its `Design` data object do not establish Design. | [2026-09-06](https://github.com/siliconcompiler/siliconcompiler/commit/d499d5bca16bd54d1390312a7c4de6c47ea646d2): per-tool prerequisites and container dependency handling with tests. |
| [Amaranth HDL](../../src/content/digital/amaranth.md) | Design: Python elaboration and reusable interfaces. Verification: native simulator, async testbenches and waveforms. Synthesis and Layout: platform specialization, generated synthesis/constraint files, placement/routing and bitstream products. | [2026-08-23](https://github.com/amaranth-lang/amaranth/commit/e3c9215e195443aefde6c9591409d74802bdd10f): iteration over hardware value bits with tests. Mechanical latest commit is September 4 documentation. |
| [Dynamatic](../../src/content/digital/dynamatic.md) | Design and Synthesis: C-kernel/MLIR transformations into dynamically scheduled dataflow RTL. Verification: user C–RTL co-simulation, traces and visualization. Layout: the current `synthesize` CLI generates clock constraints and runs fixed-target Vivado placement, physical optimization and routing, returning post-route timing/utilization measurements. | [2026-09-04](https://github.com/EPFL-LAP/dynamatic/commit/83bfa9897f9a1b37d695b2c29e2bef4d2df449e6): array partitioning and access-control generation with integration tests. |

Spade and Amaranth earn the implementation stages through managed inputs, constraints and delivered artifacts, beyond an incidental external-tool command. SiliconCompiler supplies the flowgraph/schema/provenance layer above tools; it does not claim their algorithms. Its 2026 releases add property checking, logical equivalence and a separate physical flow. Dynamatic's Layout scope is limited to an implemented out-of-context Kintex-7 evaluation flow, not general board/bitstream support; the assignment follows its current CLI connection and actual physical operations/measurements. Its co-simulation checks supplied executions; its invariant/model-checking facilities are not unrestricted C-to-RTL equivalence. The official Dynamatic **v2.0.0 was released March 3, 2024**; current claims use the reviewed 2026 branch, including the Clang/LLVM frontend and opt-in experimental XLS integration.

The descriptions cover different ecosystem layers. Veryl provides SystemVerilog-oriented authoring and native tool paths; Spade adds strongly typed, explicitly staged pipelines; Amaranth adds Python elaboration, a simulator and platform products. XLS's DSLX/IR optimization and scheduling differ from Kanagawa's programmer-visible threading/concurrency model and Dynamatic's dynamic handshakes and load-store queues. CIRCT remains reusable compiler/IR infrastructure used by these frontends, while Yosys, Verilator and OpenROAD remain the logic-synthesis, simulation and ASIC implementation engines coordinated by toolchains such as SiliconCompiler. Existing entries, including Veryl and XLS, are unchanged.

All five have conventional stage booleans and no AI-built assertion. Kanagawa's September type-alias commit credits Claude Opus 4.6 assistance; one bounded contribution does not establish defining project-wide development provenance. No runtime AI is inferred from contributor tooling or machine-learning models supplied as hardware inputs.

### Canonical activity capture

| Project | Canonical repository identity | Default branch |
| --- | --- | --- |
| Spade | GitLab `spade-lang/spade`, project **20965359** | `main` |
| Kanagawa | GitHub `microsoft/kanagawa`, **1054333720** | `main` |
| SiliconCompiler | GitHub `siliconcompiler/siliconcompiler`, **320398696** | `main` |
| Amaranth | GitHub `amaranth-lang/amaranth`, **236501540** | `main` |
| Dynamatic | GitHub `EPFL-LAP/dynamatic`, **571607607** | `main` |

Verified canonical metadata and branch tips, then counted complete, non-shallow first-parent committer histories through the existing helpers. Each meaningful SHA is present in that history and has a matching primary source. `npm run refresh:digital-activity` recaptured all **38 GitHub** records at **2026-09-06T11:09:11.164Z**. The existing 35 activity records are identical to the preceding snapshot; only the snapshot capture time and five additions change.

Spade uses the existing generic repository record, captured at **2026-09-06T10:52:22.561959Z**, with its canonical GitLab tip and independently checked branch API. No GitHub mirror is used. Swim separately migrated to Codeberg in August; its implementation citations follow that migration without changing the compiler's authority. Surfer retains its own September 5 capture. Both non-GitHub records keep their reviewed full-history buckets. All twelve months remain **2025-10 through 2026-09**, oldest on the left.

`npm run check` passes with 23 Analog and 24 Digital unit tests, 40 validated Digital records, a 285-page build and 2,976 internal-link checks. The final production-preview Chromium suite passes **98/98**, including all requested new and existing search terms, Scope/AI decisions, chronological activity, forced colors and no-JavaScript access. Visual review at **1440, 1280, 1024, 390 and 320px** found no content-induced overlap or horizontal overflow, including the three new four-stage rows and wrapped Kanagawa links. Baseline hashes preserve all 35 existing Digital entries, Analog content/activity, Golden data, Articles and styles. `/export.json` remains SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`.

### Next-candidate review, ranked but not added

This bounded review supports prioritization, not completed Scope/activity records for another batch. All five have current primary development evidence; none is rejected as inactive.

| Rank | Candidate / recommendation | Current activity and distinct gap | Overlap and decision |
| --- | --- | --- | --- |
| 1 | **nextpnr — add now in the next batch** | [August 27 router correctness/timing work](https://github.com/YosysHQ/nextpnr/commit/dec04b3b6494c8b14e8a91701dd9186c6e0ff7d9), following [0.11.1 on August 11](https://github.com/YosysHQ/nextpnr/releases/tag/nextpnr-0.11.1). The [canonical implementation](https://github.com/YosysHQ/nextpnr) supplies open, timing-driven FPGA placement and routing. | Open FPGA physical **engines** remain underrepresented: OpenROAD is ASIC-focused, Yosys provides logic synthesis, and Spade/Amaranth/SiliconCompiler expose integration. Filling this gap is more valuable than adding another authoring language first. |
| 2 | **Chisel — add now in the next batch** | [7.14.0 on August 13](https://github.com/chipsalliance/chisel/releases/tag/v7.14.0) adds domain APIs, LTL and explicit truncation; [7.15.0 followed September 1](https://github.com/chipsalliance/chisel/releases/tag/v7.15.0). The [Scala construction layer](https://github.com/chipsalliance/chisel) supports parameterized, reusable hardware generators. | **A: its absence is conspicuous.** CIRCT explains lowering infrastructure, not Scala elaboration and generator composition. Other HDL entries overlap in output, but do not explain this foundational authoring-to-FIRRTL/CIRCT path. This is a layer-coverage decision, not a popularity ranking. |
| 3 | **Calyx — add now in the next batch** | [July 24 profiler implementation](https://github.com/calyxir/calyx/commit/264c618e3db8bab3d110a0c03ff44df3611e8990), other July lowering/tool work and an August dependency compatibility fix demonstrate ongoing development despite the older published release. [Calyx](https://github.com/calyxir/calyx) combines structural datapaths with explicit control; [static timing constructs](https://docs.calyxir.org/lang/static.html) coexist with dynamic control. | Strong next-batch candidate: accelerator-generator IR with control composition and mixed timing promises adds a different perspective from CIRCT's general infrastructure, XLS's scheduling flow and Dynamatic's dynamic-dataflow execution. |
| 4 | **Bluespec Compiler / BSC — later** | [July 14 type-resolution/cache correctness work](https://github.com/B-Lang-org/bsc/commit/941eecfe1bf583ce717a10965a0bcb6f6b3b8773), after release [2026.01 was published May 1](https://github.com/B-Lang-org/bsc/releases/tag/2026.01). [BSC](https://github.com/B-Lang-org/bsc) provides guarded atomic rules, automatic scheduling, Verilog output and Bluesim. | Its rule-based execution model is distinct, but authoring/scheduling coverage overlaps more with this batch's Kanagawa and HDL toolchains. Defer behind the open-FPGA-engine and accelerator-IR gaps; August's 2026.07 release notes are not a published release. |
| 5 | **Clash — later** | [September 5 GHC 9.14 support](https://github.com/clash-lang/clash-compiler/commit/ba14e91b14d028a205e0f3df214103ac9f9fab1b), after [1.10.1 on August 27](https://github.com/clash-lang/clash-compiler/releases/tag/v1.10.1). The [functional Haskell toolchain](https://github.com/clash-lang/clash-compiler) adds typed signals/clock domains, interactive evaluation and multiple HDL backends. | Functional semantics are useful and not duplicated exactly, but modern authoring is already well represented after Spade and Amaranth. Prioritize a later language/execution-model batch alongside BSC. |

Recommended next content batch: **nextpnr, Chisel and Calyx**. No secondary candidate is automatically added by this review.
