# Digital implementation notes

## Upright activity segments (2026-09-05)

The follow-up to `14c77c2c7836b73302af35bc63473420ffdbb141` corrects the intended shape: **5px wide × 12px high** upright segments, **2px gaps**, and an **82px-wide** twelve-month band (previously 118px). The Activity column is **108px** to fit existing year-bearing dates; the grid remains **2.8fr / 1.15fr / 108px**. Month summaries are left-aligned below the band. No cell stretches, and monthly fill still uses the same binary reviewed signals.

`npm run check` passed, including **20 Analog / 21 Digital unit tests**; the complete Chromium production-preview smoke suite passed **73/73**. Shared assertions require upright geometry, short intrinsic width, date/summary containment and unchanged signal/hover/accessibility semantics. Both pages were visually checked at **1440, 390 and 320px**, including sparse point signals, continuous repository activity and year-bearing dates, with no overflow. All **352 content/data files**, **283 other HTML pages** and `/export.json` are byte-identical. Catalog HTML changes only its stylesheet asset reference. No membership, activity data, source, permalink or deployment changes; delivery is a normal commit/push to `main`, **without Pages deployment**.

## Unified public activity band and title links (2026-09-05)

Starting from `c61e917f50c96c6e0528985517cbe4709b11c3a5`, every row on both catalogs uses the **12-month reviewed public activity band**: date only, twelve binary cells, then `N/12 months`. Repository counts remain distinct from typed paper/release/public-update signals, which map their existing reviewed dates into event months without inventing commit history.

Surfer's canonical GitLab record, default branch, head SHA, twelve buckets, latest/meaningful date and source provenance are unchanged from the review below. It retains **12/12 months**. The complete Digital activity JSON is byte-identical. On Analog, ATLAS and ngspice each gain a one-active-month view from their existing July paper and August release dates. Provenance remains accessible and in tooltips; no source prefix or repository name appears in Activity.

The shared three-column geometry is **2.8fr / 1.15fr / 118px**, with **8 × 5px cells and 2px gaps**. Title links follow the project name using left-aligned, wrapping flex layout and a 16px gap. Visible `#` markers are removed while native permalinks remain. The only data additions are explicit point-event types on Analog; membership, classification, URLs, dates, buckets, sorting and eligibility stay unchanged.

`npm run check`, explicit Analog **20/20** and Digital **21/21** unit tests, and the complete Chromium production-preview smoke suite **73/73** passed. Visual review covered both catalogs at **1440, 390 and 320px**, including matrices, dense/sparse bands, point events, title links and first/middle/last rows. Existing hash/history/no-JS/forced-color tests remain green. All 68 project Markdown files, both matrices, IDs/order/links, 283 other HTML pages and factual export are preserved; see the [paired integrity record](../analog/IMPLEMENTATION_NOTES.md#unified-public-activity-band-and-title-links-2026-09-05). Delivery is commit/push to `main`, **without Pages deployment**.

## Repository-band refinement (2026-09-05)

Starting from `ad91816ac49ac4dcf9558663045ed515cde7c2cb`, reviewed non-GitHub monthly history can use `kind: repository` in either catalog. Source-backed point updates remain date-only. GitHub records and their refresh/identity checks are unchanged; the small shared module is catalog-only and performs no network fetching.

### Surfer history review

- Reopened the [official project site](https://surfer-project.org/), [canonical GitLab repository](https://gitlab.com/surfer-project/surfer), README and implementation history. The [GitLab project API](https://gitlab.com/api/v4/projects/surfer-project%2Fsurfer) identifies public project **42073614**, `surfer-project/surfer`, default branch **main**. Its branch API and a bare, blob-filtered, non-shallow clone agree on head `db1ca915a989860f11c440b0a932b1f5fbce71b2`.
- Recorded **2026-09-05T10:38:13.156Z** as this record's capture time, leaving the existing snapshot metadata and every other activity record untouched. Counted the complete first-parent committer history in UTC, using the existing **2025-10 through 2026-09** window. Monthly counts are **47, 51, 99, 35, 66, 28, 31, 40, 10, 32, 17, 7**: **463 commits / 12 active months**, independently cross-checked from the 1,471-entry first-parent history. Counts stay informational; a month with one commit has the same visible fill as a month with many.
- The latest and manually meaningful date remain **2026-09-04**. The same [previously cited commit](https://gitlab.com/surfer-project/surfer/-/commit/db1ca915a989860f11c440b0a932b1f5fbce71b2) opens the log window when an error is logged; inspection of `logs.rs` and `view.rs` confirmed substantive implementation. Its committer time is **2026-09-04T11:44:01Z**. The existing authored `activity` source and all visible primary links are preserved; no GitHub mirror is involved and sorting does not change.
- No other project changes from date-only to monthly history. ngspice and ATLAS retain source/paper dates. Generic records pin canonical Code URL, host-scoped repository ID, branch, head, capture time, twelve buckets, meaningful date/SHA and commit-source ID. Refresh scripts preserve these manually reviewed records; a new snapshot month requires reviewed recapture instead of silently relabeling their buckets.

### Presentation and verification

Both grids use `minmax(0, 2.75fr) minmax(0, 1.15fr) 142px`; cells are **10 × 6px with 2px gaps**. Date / band / `N/12 months` remains intact, without visible repository strings or header-month cues. Both catalogs were visually checked at **1440, 390 and 320px**, including Surfer, ngspice, xezim, Verilator, PANDA and Xschem, sparse/continuous bands, source links and sticky matrices. No page overflow or link overlap was found.

`npm run check`, explicit Analog **18/18** and Digital **20/20** unit tests, and the full Chromium smoke suite **73/73** passed. Tests cover Surfer's actual GitLab record, source-backed date-only cases, generic canonical/provenance validation, month-window preservation, narrower rectangle geometry, binary states, accessibility/forced colors, hashes/history and no-JS use. All **35 Analog / 33 Digital** frontmatters, both matrices, IDs/order/links, **283 other HTML pages** and factual export remain unchanged; see the [paired integrity record](../analog/IMPLEMENTATION_NOTES.md#repository-band-refinement-2026-09-05). Browser automation remains Chromium-only. Delivery is commit/push to `main`, **without Pages deployment**.

## Complete catalog naming update (2026-09-05)

Starting from `f27a98fb37df14f25fa33bd7c6d8243f6c8fa73f`, the public names and canonical routes are **Analog** at `/analog/` and **Digital** at `/digital/`. Hidden H1s and browser-title prefixes match those names. Collections, source directories, CSS namespaces, tools, npm commands and tests now use the same terminology; no removed-route or command aliases remain.

The **33 Digital / 35 Analog** projects retain their exact Markdown content, source URLs, slugs and activity snapshots. All **352 content/data files** are byte-identical after relocation. The three-column index, compact binary activity band, matrix scope marks and native hash behavior are unchanged.

`npm run check`, the explicit Analog (**17/17**) and Digital (**18/18**) unit commands, and all **73 Chromium smoke tests** passed. Both catalogs were visually inspected at **1440, 390 and 320px**, including sticky matrices, title links and source-backed activity. Only the two canonical catalog routes are built; no generated links use removed routes. All **283 other HTML pages** change only their catalog navigation URLs, and `/export.json` retains SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`. See the [paired integrity record](../analog/IMPLEMENTATION_NOTES.md#complete-catalog-naming-update-2026-09-05). Delivery is commit/push to `main`, **without Pages deployment**.

## Activity density refinement (2026-09-05)

Presentation-only follow-up to `e7f2cbabff576c239f162f3f9d8f8881db0666e2`:

- The header is only Activity. GitHub rows stack date, twelve-cell band, then right-aligned `N/12 months`; exact months and raw counts remain in tooltips, accessible text and data attributes.
- Both desktop grids use `minmax(0, 2.7fr) minmax(0, 1.15fr) 177px`. A fixed Activity column avoids unused space after the band. Cells are 12px square with 3px gaps, always binary. At 1440px the columns measure about **754 / 321 / 177px**; Project grows from 645px and the previous 260px band shrinks to 177px. On mobile Activity retains its natural width and left alignment.
- `npm run check`, both explicit unit commands (**17 Analog / 18 Digital**), and the full production-preview Chromium smoke suite (**73/73**) passed. Shared smoke assertions now verify the plain header, date/band/summary order, full month wording, compact dimensions and preserved month/count accessibility. Existing activity, matrix, hash/history, no-JS and navigation coverage stays intact.
- Visual review of both pages at **1440, 390 and 320px** covered dense and sparse activity, first/middle/last rows, multi-link titles and ngspice. No page overflow or link overlap; descriptions gain desktop width and activity no longer stretches. ngspice, ATLAS and Surfer have sourced dates with no fake band/count.
- All **352 content/data files**, both matrix HTML blocks, **283 non-catalog HTML pages** and `/export.json` are byte-identical to the baseline. All existing catalog IDs and navigable URLs are preserved. Export SHA-256: `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`. No membership, source, classification, activity eligibility/date/bucket, navigation or deployment changes. Browser automation remains Chromium-only; delivery is commit/push to `main`, **without Pages deployment**.

## Previous three-column presentation refinement (2026-09-05)

Starting at `7d86cd0c864747d7971d3d7337c6faa2b0be0794`, both catalogs keep their reviewed content, classifications, activity snapshot, eligibility and native URLs. The change is presentation only:

- Project / Keywords / Activity use approximately `2.5fr / 1.15fr / 1.2fr`; page width and base text sizes stay unchanged. Primary Website/Paper/Code/Results links wrap beside the title. There is no separate Type / Links area.
- Authored roles appear as individual tags before approved AI-built and technical keywords. The metadata fields and approved provenance set remain separate and unchanged.
- Both matrices use small filled/open CSS circles for core/supporting. Textual scope meanings and tooltips remain; the compact legend directly below is `● core   ○ supporting`.
- GitHub Activity uses a prominent date and `N/12 mo` above twelve equal binary cells. Positive counts share one fill; zero uses an outline. Raw counts are informational in titles/accessibility text, never visual strength. Repository identity stays accessible but is not visible in the Activity column. A snapshot-derived endpoint cue appears once in the desktop header. Source-backed updates have a date without a fake band or count.
- Browser expectations check authored inventory, primary links, tag order, binary states, uniform cell geometry/fill, circle semantics, wrapping links, native hashes/history, no-JS access and viewer isolation. The new shared geometry/activity assertions are test-only; catalog schemas and activity modules remain independent.

### Validation for the three-column refinement

- `npm run check` passed: Golden checks, 35 Analog / 33 Digital validation, **17 Analog / 18 Digital unit tests**, **285 built pages** and **3,112 internal anchors**. Both unit commands also passed directly.
- Full `npm run test:smoke`: **73/73 Chromium production-preview tests passed**. Existing hash/direct-load/reload/back/forward, no-JS, source links, activity ordering, viewer isolation and factual-export coverage remain. Two forced-color cases verify the new circle/band presentation; an active-cell border cascade issue found during self-review was fixed.
- Visual inspection covered both pages at **1440, 390 and 320px**, including first/middle/last rows, xezim, HAVEN, Verilator, PANDA, AutoSizer, ngspice and Ngspice + OpenVAF Enhancements. Titles and primary links wrap without overlap, descriptions have more desktop width, tags stay restrained and the twelve cells remain legible. Only the matrix scrolls horizontally with sticky project names. ngspice has a plain sourced date and no band. Filled/open scope shapes also remain distinct in forced-color mode.
- All **352 authored content/data files**, including both complete activity snapshots, are byte-identical to the starting commit. All **283 non-catalog HTML pages** are byte-identical. The **362 Analog / 69 Digital published IDs** and every primary URL are preserved; only duplicate commit-history links were removed from Activity.
- `/export.json` is byte-identical: SHA-256 **`67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`**. `git diff --check` passed. No dependency, schema, membership, classification, eligibility, meaningful date, activity bucket or deployment configuration changed.
- The requested grid proportions were retained. The optional month endpoint cue is shown only in desktop headers; activity bands are capped at 260px to remain compact. Browser automation remains Chromium-only. Delivery is a normal commit/push to `main`, with **no Pages deployment**.

Prior review sections retain their historical research and validation context.

## Previous domain organization review (2026-09-05)

The domain review separated Digital from Analog by technical domain while retaining the five matrix axes. It introduced navigation labels Timeline, Events, Articles, Analog, Digital. At that stage both pages used a hidden H1, matrix first, compact legend and four-column activity-sorted index; subsequent presentation and naming changes are recorded above.

There are **33 Digital entries**: the previous 34 minus **Ngspice + OpenVAF Enhancements**, transferred to Analog with its entire reviewed activity record. No other membership, descriptions, matrix marks, internal AI classifications or repository histories change. All remaining project hashes and quick links stay valid; the moved slug now belongs only to the Analog collection and page. No redirects are added.

The new required `roles` field uses the shared catalog vocabulary, with one or two distinct authored roles. **Dr. RTL, VerifyRTL, HAVEN, UCAgent, Spec2Cov and CoreSmith** are `Agent`; every other retained Digital entry is `EDA Tool`. Roles replace the primary-category display in Type / Links. `primary` remains internal and must still be core in the matrix. Internal `ai-enabled` and `traditional` values remain validated but are not rendered.

Only the previously approved **xezim, vitamin, iverilog-uvm, uhdm2rtlil, WHAT and vivado_mcp** expose `AI-built`. The moved enhancement project keeps its approved provenance on Analog. MCP integration alone does not confer AI-built development provenance, and incidental agent co-authorship does not reclassify Traditional tools. A small shared role-label formatter is the only shared implementation; schemas, activity snapshots, curation and matrices stay catalog-specific and independent of Golden data.

The original source review below remains the evidence for retained classification and freshness. Historical counts and validation results are explicitly labeled. The current pass does not broaden membership or repeat the 34-project external research campaign.

## Previous domain review validation record

- `npm run check`: passed, including Golden validation/fact lint/duplicate checks, **35 Analog / 33 Digital** validation, **16 Analog / 17 Digital unit tests**, the **285-page build** and **3,112 internal-anchor checks**. Both catalog unit commands were also run directly.
- `npm run test:smoke`: **71/71 Chromium production-preview tests passed**. Coverage explicitly checks domain navigation/titles, reviewed membership, shared role types, only the approved AI-built set, unchanged matrix axes/marks and activity order, ngspice without a GitHub strip, independent viewer state, native hashes, no-JS access and responsive geometry.
- Digital native history coverage waits for the browser's smooth scroll to settle before recording the restoration position. The exact back-position assertion remains; no production script or history behavior changed. The focused hash/direct-load/reload/back/forward case also passed **6/6 repeated runs**.
- Visual inspection at **1440, 390 and 320px** covered both matrices, sticky names on narrow screens, first/middle/last rows, multi-role text, the moved entry, source links and ngspice's sourced public date. Existing four-column density remains; neither page introduces page-level horizontal overflow or additional visible prose/controls.
- Regression comparison: all **27 existing Analog content files** are byte-identical; all **33 retained Digital content files** differ only by their authored role field. All **61 pre-existing activity records** are preserved, including the transferred record's identity, head, buckets and meaningful SHA/date; its source array is also unchanged. All six new GitHub baseline identities, branch tips, pinned source paths, twelve buckets and meaningful commits were cross-checked against the reviewed primary histories.
- All **283 non-catalog HTML `<main>` bodies** are byte-identical to the starting build. Golden data, Article bodies, Timeline/Events behavior and deployment configuration are unchanged. `/export.json` is byte-identical, SHA-256 **`67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`**.
- `git diff --check` passed. No dependency, catalog runtime request, redirect or deployment change was added. Delivery is a normal commit/push to `main`; **no Pages deployment in this pass**.

Browser automation remains Chromium-only. External simulation/benchmark results were not independently reproduced; existing repository snapshots remain pinned rather than implicitly re-reviewed.

## Original Digital release review

Reviewed on **2026-09-05** against the inclusive **2025-09-05** meaningful-activity cutoff. Of the bounded 35 candidates, **34 are included**: 33 canonical GitHub repositories and one source-backed GitLab project (Surfer). SANGAM is omitted under the conservative meaningful-activity rule. No watch-list projects were added.

The review opened each canonical README/default branch, inspected implementation files and substantive first-parent changes, and pinned source references in each content file. AI-built decisions use direct author statements or sustained core co-authorship; AI-enabled decisions use implemented operating interfaces/agents. No external simulator, commercial EDA flow or benchmark result was independently reproduced.

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
- **Ngspice + OpenVAF Enhancements** stays one combined source tree, now in Analog. The original Digital Simulation/Frontend classification is replaced by Analog Simulate / Measure and EDA Integration marks. Its changes are not represented as already upstream in either independent project.
- **RTLDebugDBKit + RTLTracer** stays one entry. The primary database generator documents its downstream tracer, and the tracer implements bit-window propagation over that schema. Only RTLDebugDBKit supplies activity.
- **sv-elab** is the current name; `yosys-slang` is retained only as an internal alias. Current Yosys integration replaces an obsolete plugin-only characterization.
- **iverilog-uvm** is Icarus-derived but its canonical GitHub repository reports `fork: false`; it has its own public verification implementation. Upstream Icarus remains a separate record.
- **Spec2Cov** is the verified canonical repository despite an old `llm-verif` clone example in its README.
- **OpenROAD-MCP** currently ships the TypeScript implementation. Its implemented ORFS flow actions and persistent sessions are described without attributing those agent interfaces to OpenROAD itself.

## AI classification decisions

| AI-built project | Direct evidence used |
| --- | --- |
| xezim | Author README identifies AI agents as core implementation contributors; runtime changes corroborate this. |
| vitamin | Repeated Claude co-authorship across core parser, elaboration and runtime changes, including the pinned September parser commits; not one isolated commit. |
| iverilog-uvm | Author README credits Claude with the bulk of the verification-language/UVM extension under human review. |
| Ngspice + OpenVAF Enhancements (now Analog) | Explicit Claude-assisted development description plus AI-coauthored Verilog-A compiler fixes. |
| uhdm2rtlil | README describes Claude implementation of C++ UHDM-to-RTLIL handlers, corroborated by translation fixes. |
| WHAT | Author explicitly credits AI with the principal architecture/functions and implementation. This does not imply an AI runtime. |
| vivado_mcp | Author states the tool was created through Claude conversations; session-manager source corroborates it. It also exposes runtime MCP tools, but only AI-built is shown publicly. |

The AI-enabled group has runtime verification/optimization agents or implemented agent interfaces: Dr. RTL, VerifyRTL, HAVEN, UCAgent, Spec2Cov, wave-mcp, Sentinel DV, OpenROAD-MCP, OpenADA and CoreSmith. OpenADA is included for its implemented CLI/agent-skill contract, not for a future MCP binding. Traditional projects, particularly Pono and upstream CIRCT, are not promoted to AI-built merely because some recent commits use coding agents.

## Scope decisions and release boundaries

- **UVM simulators:** Formal/Verify includes verification-language functionality, not just proof. The Icarus derivative and eevee-rs explicitly target UVM; eevee-rs is described as early runs, not unrestricted execution or complete IEEE compliance. xezim/vitamin verification tests remain supporting scope.
- **Frontend validation:** uhdm2rtlil equivalence/co-simulation and Yosys formal primitives are supporting scope, distinct from standalone proof drivers. Verible is a frontend/developer suite, not a synthesis engine.
- **CIRCT:** upstream LLHD event semantics and `circt-bmc`/LEC justify supporting Simulation/Formal. No claim from the unavailable Normal Computing fork is used.
- **Dr. RTL:** rewriting and sequential equivalence are core; synthesis timing/PPA feedback is supporting Flow/Physical, not proof of completed routed layouts. The latest meaningful update corrects the agent's timing-score normalization, an operating contract rather than cosmetic documentation.
- **Verification agents:** Spec2Cov coverage feedback is not proof. HAVEN formal feedback identifies unreachable coverage targets. VerifyRTL distinguishes simulation, bounded checks and proofs; its unsupported temporal-property paths are not silently converted into same-cycle checks.
- **Debug:** wave-mcp reads waveforms and static connectivity; it does not run the simulator. RTLDebugDBKit stores static dependencies. Sentinel DV indexes verification artifacts and returns dry-run replay commands rather than executing them. These distinctions remain in internal notes, while public descriptions state concrete operations.
- **OpenADA:** core Simulation is deliberately stronger than the initial suggested supporting mark: the released ngspice/Xyce execution, series extraction, deterministic measurements and testbench-plan implementation are primary scope. Flow/Physical is core for cross-tool operations and physical checks. Synthesis/verification drivers are supporting. The reverted knowledge-graph spike and planned MCP/remote adapters are excluded.
- **CoreSmith:** verification and physical-flow loops are core. The reported PPABench outcomes include waivers and a blocked design; no blanket signoff, fabrication or full autonomy claim is made.

## Meaningful activity and snapshot limitations

Mechanical latest activity and curated eligibility deliberately differ. The strip includes all first-parent commits, including maintenance/bots, and remains binary. The record is not a quality or total-effort measure.

- MCY qualifies through the **2025-10-15 Qt 6 port**, not the August 2026 formatting cleanup. SymbiYosys uses its July rIC3 integration, not later formatting-only commits.
- Ngspice/OpenVAF binary-publication automation does not establish meaningful freshness; the preceding compiler constant-context fix does. OpenROAD-MCP uses the August implementation of flow/tool operations rather than later dependency/release traffic. RTLDebugDBKit uses its schema-v22 change rather than later source-path documentation.
- Pono's reviewed manual dependency pinning supports reproducible builds and is substantive maintenance, distinct from automated dependency churn. Its AI relation remains Traditional.
- GitHub push times can reflect other branches. For example, vivado_mcp's captured default-branch latest date is **2026-02-05 UTC**, not its later repository push date. UTC normalization can also move a late local evening into the following day.
- HAVEN has a bulk initial release; the strip records that landing once. It does not reconstruct private development or the time taken to create the released benchmark.
- Snapshot SHAs record the reviewed public state, not a live browser feed. Upstream history can later change; refresh rejects lost meaningful commits and requires manual reassessment.

## Surfer: non-GitHub handling

The official site links to `gitlab.com/surfer-project/surfer`, whose public API confirms the canonical `main` branch. The source-backed update is [db1ca915](https://gitlab.com/surfer-project/surfer/-/commit/db1ca915a989860f11c440b0a932b1f5fbce71b2), committed **2026-09-04**, changing error logging/window behavior. The public record now uses its reviewed canonical GitLab monthly history, as recorded in the repository-band refinement above; it retains the same public date and Code/commit links. Native and web builds have differing feature availability.

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

## Original release validation record

- `npm run check`: passed, including Golden validation/fact lint/duplicate review, 27-project Analog validation, all 13 unchanged Analog unit tests, 34-project Digital validation, all 16 Digital unit tests, the 285-page build and 3,098 internal-anchor checks.
- `npm run test:smoke`: **70/70 Chromium tests passed**, including 10 new Digital cases and all existing Analog, Activity Matrix and release checks. Existing release assertions changed only to expect and verify the new navigation link.
- Source-history cross-check: all **33 GitHub repository IDs, captured tips, twelve first-parent buckets and manually reviewed meaningful commit dates** matched the captured primary histories. Visible external Website/Paper/Results destinations were checked; the invalid Surelog website was removed.
- Visual review at **1440, 390 and 320px** covered the matrix, horizontal scrolling/sticky names, first/middle/last projects, GitHub activity, Surfer's non-GitHub state and compact primary links. Desktop shows several complete rows; mobile has no page-level horizontal overflow. A default-list-marker styling defect found during review was fixed. Notes/bibliography, duplicate descriptions and explanatory controls remain absent.
- Analog desktop/mobile screenshots were inspected. Its implementation, content, activity data, styles and unit/smoke files are unchanged. Across the pre-change and final builds, **all 284 existing HTML `<main>` contents are byte-identical**; only the authorized global navigation gains a link.
- `/export.json` is byte-identical to the pre-change build. SHA-256: `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`.
- `git diff --check` passed. No new dependency or deployment configuration was introduced; this change is not deployed in this pass.

Browser automation remains Chromium-only. External benchmark/conformance results are not independently reproduced, and the activity snapshot does not measure private work, side branches or total development effort.
