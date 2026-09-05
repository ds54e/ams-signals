# Analog implementation and review notes

## Upright activity segments (2026-09-05)

The follow-up to `14c77c2c7836b73302af35bc63473420ffdbb141` corrects the intended shape: **5px wide × 12px high** upright segments, **2px gaps**, and an **82px-wide** twelve-month band (previously 118px). The Activity column is **108px** to fit existing year-bearing dates; the grid remains **2.8fr / 1.15fr / 108px**. Month summaries are left-aligned below the band. No cell stretches, and monthly fill still uses the same binary reviewed signals.

`npm run check` passed, including **20 Analog / 21 Digital unit tests**; the complete Chromium production-preview smoke suite passed **73/73**. Shared assertions require upright geometry, short intrinsic width, date/summary containment and unchanged signal/hover/accessibility semantics. Both pages were visually checked at **1440, 390 and 320px**, including sparse point signals, continuous repository activity and year-bearing dates, with no overflow. All **352 content/data files**, **283 other HTML pages** and `/export.json` are byte-identical. Catalog HTML changes only its stylesheet asset reference. No membership, activity data, source, permalink or deployment changes; delivery is a normal commit/push to `main`, **without Pages deployment**.

## Unified public activity band and title links (2026-09-05)

Starting from `c61e917f50c96c6e0528985517cbe4709b11c3a5`, all **35 Analog / 33 Digital** rows show an unprefixed date, twelve binary cells and `N/12 months`. The shared catalog-only rendering view preserves separate repository history and source-backed point records; it neither fetches data nor changes sorting or freshness.

- Repository records retain their genuine monthly first-parent counts. Surfer keeps its already reviewed canonical GitLab `main` history, **12/12 months**, latest/meaningful date **2026-09-04** and existing head SHA. The entire Digital activity snapshot is byte-identical to the baseline; no repository activity is refreshed.
- Point records explicitly declare `lastPublicUpdateType` (`paper`, `release` or `public-update`). ATLAS maps its existing **2026-07-15** paper date to July; ngspice maps its existing **2026-08-11** release to August. Each shows **1/12 months**, with no fabricated commit fields. Inactive point cells say “no reviewed public activity signal”; source type/title remain in tooltips, accessible text and metadata. An event outside the displayed window is not clamped or moved.
- Both grids use `minmax(0, 2.8fr) minmax(0, 1.15fr) 118px`. At 1440px the columns measure about **804 / 330 / 118px**, versus **783 / 327 / 142px** before. Cells are **8 × 5px with 2px gaps**, a natural 118px-wide band, with identical binary strength regardless of count. The compact block stays left-aligned on mobile.
- Primary links follow the name with a **16px flex gap**, left alignment and wrapping. Website/Paper/Code/Results ordering and every URL stay unchanged. The visible `#` is removed; the project-name link retains its native permalink, accessible name, focus and hash/history behavior.
- `npm run check`, explicit Analog **20/20** and Digital **21/21** unit tests, and the complete Chromium production-preview smoke suite **73/73** passed. Tests cover all-row bands, source-specific metadata, point-window boundaries, exact repository buckets, date/band/summary order, link placement, compact geometry, no-JS, hashes/history/reload, forced colors, viewer isolation and unchanged matrices.
- Visual inspection at **1440, 390 and 320px** covered both matrices, first/middle/last rows and ATLAS, ngspice, Surfer, Pono, xezim, Verilator, PANDA, Xschem and iverilog-uvm. Bands remain legible without stretching; links wrap without overlap; only the matrices scroll horizontally. Descriptions gain desktop width.
- All **68 project Markdown files**, both matrix HTML blocks, catalog IDs/links/order and **283 non-catalog HTML pages** are byte-identical. Of **352 content/data files**, only the Analog activity snapshot changes: the two point-source type fields and ngspice's internal activity note. Existing dates, identities, SHAs and buckets are unchanged. `/export.json` remains byte-identical, SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`. Browser automation remains Chromium-only. Delivery is a normal commit/push to `main`, **without Pages deployment**.

## Repository-band refinement (2026-09-05)

Starting from `ad91816ac49ac4dcf9558663045ed515cde7c2cb`, both catalogs render a twelve-month band for explicitly reviewed repository history, including non-GitHub `kind: repository` records. A small catalog-only helper shares the rendering guard and canonical-source checks; GitHub identity, freshness and first-parent rules are unchanged. Non-GitHub monthly snapshots remain manually reviewed and cannot inherit a shifted month window through the GitHub refresh tools.

- Surfer is the only converted record, on Digital; see its [canonical GitLab review](../digital/IMPLEMENTATION_NOTES.md#repository-band-refinement-2026-09-05). No Analog activity data changed. ngspice and ATLAS remain source-backed dates without a synthetic band or count.
- Both grids use `minmax(0, 2.75fr) minmax(0, 1.15fr) 142px`. At 1440px the columns are approximately **783 / 327 / 142px**, compared with **754 / 321 / 177px** before. Cells are **10 × 6px with 2px gaps**, retaining date / band / `N/12 months`, binary fill and accessible month/count details. Mobile keeps the compact Activity block left-aligned.
- `npm run check`, `npm run test:analog` (**18/18**), `npm run test:digital` (**20/20**) and the complete Chromium production-preview smoke suite (**73/73**) passed. Coverage includes generic repository identity/provenance, unchanged source-update handling, native hashes/history/reload, no-JS access, forced colors, matrix behavior and the narrower geometry.
- Visual review at **1440, 390 and 320px** covered both matrices and dense/sparse rows, including Surfer, ngspice, xezim, Verilator, PANDA and Xschem. The slimmer bands remain readable; descriptions gain desktop width, with no page overflow or title/link overlap.
- All **68 project frontmatters**, both matrix HTML blocks, catalog IDs/order/links, and **283 non-catalog HTML pages** match the baseline. Of **352 content/data files**, only Surfer's internal activity sentence and its activity record changed. `/export.json` is byte-identical, SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`. Delivery is a normal commit/push to `main`, **without Pages deployment**.

## Complete catalog naming update (2026-09-05)

Starting from `f27a98fb37df14f25fa33bd7c6d8243f6c8fa73f`, the public names, hidden H1s and browser-title prefixes are exactly **Analog** and **Digital**. Their only catalog routes are `/analog/` and `/digital/`; removed routes have no redirects, aliases or compatibility behavior.

- Pages, content collections, libraries, styles, documentation, unit/smoke tests and maintenance commands now use `analog` and `digital` consistently. Activity snapshots and the Analog update log were relocated without refreshing them. The shared role module remains generic.
- All **35 Analog / 33 Digital** Markdown files, source arrays and project hashes are preserved. Every one of the **352 content/data files** is byte-identical after accounting for relocation, including both activity snapshots and authored Articles. No catalog membership, classification, activity or layout decision changed.
- `npm run check`, `npm run test:analog` (**17/17**) and `npm run test:digital` (**18/18**) passed. The full Chromium production-preview smoke suite passed **73/73**, including canonical navigation URLs, hashes/history/reload, no-JS access, activity semantics and responsive geometry. Visual inspection at **1440, 390 and 320px** confirmed the existing matrix and compact three-column presentation, including ngspice without a monthly band.
- Build output contains `dist/analog/index.html` and `dist/digital/index.html`, with no removed catalog routes or links. Catalog HTML is unchanged after normalizing the intended names, paths, CSS namespaces and asset filenames. All **283 non-catalog HTML pages** differ only in the two navigation URLs. `/export.json` remains byte-identical: SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`.
- No obsolete catalog names remain in active repository references. Four search matches are retained as valid technical terminology in one project description and three factual records; those are not catalog names. Delivery is a normal commit/push to `main`, **without Pages deployment**.

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

Previous active-catalog expansion: 2026-09-05, based on `main` commit `d3b6a4d5bb40bf20ad631adb307c88f9c2f9b4a5`. The compact-row presentation is preserved. The original landscape/source review below was completed from `4fa73e4650d7512d236004297aeb8be9a5cf4296`.

## Previous domain organization review (2026-09-05)

The domain review starting from `75a5ec4fd494785fcbb54f0fa89e94b9f3e85f83` separated Analog and Digital by technical domain. The matrix describes scope and authored roles describe project kind. The current canonical routes and directories are documented above.

The active Analog population is **35**: all 27 existing entries, one transferred enhancement project, and all seven verified baseline candidates. Existing Analog content files, roles, workflow marks and activity records are unchanged. Public `Design Agent` wording becomes `Agent`. Both catalogs render one or two authored roles joined by ` + `, followed by ` · AI-built` only where explicitly supported. The only Analog opt-in is the transferred enhancement project; normal AI-oriented research and incidental coding assistance do not earn that label. No new visible explanation, control or disclosure is introduced.

**Ngspice + OpenVAF Enhancements** moves once from Digital to Analog, retaining slug, source IDs, canonical repository, numeric identity, captured head, all twelve buckets and manually reviewed meaningful date/SHA. It now has core Simulate / Measure and EDA Integration scope, with `EDA Tool · AI-built` as its public type. Its compiler/simulator enhancements are not automatically upstream ngspice or OpenVAF features. Its current permalink uses `/analog/#ngspice-openvaf-enhancements`; there is no duplicate Digital record or URL redirect. All projects remaining on their original surface retain their hashes.

### Baseline verification and activity

All seven candidates pass the inclusive **2025-09-05** meaningful-activity cutoff. Current README/docs, author-owned source identity and substantive implementation or release changes were inspected before authoring entries. Six public, non-fork GitHub repositories were fetched as bare blob-filtered default branches; no external project code was executed. First-parent UTC committer dates produce the October 2025–September 2026 buckets. Numeric repository IDs and meaningful commit SHAs are stored for these six and preserved for the transferred project. The refresh helper verifies those optional stronger fields without changing the existing 27 records or advancing meaningful dates automatically.

| Added baseline | Canonical source / current default branch | Latest UTC public activity | Reviewed meaningful activity | Scope decision |
| --- | --- | --- | --- | --- |
| ngspice | [Official SourceForge project](https://ngspice.sourceforge.io/) / upstream `master` | 2026-08-11 release 47 | [Release 47](https://ngspice.sourceforge.io/news.html) adds device-model, code-model noise and PSS functionality | Simulate / Measure core |
| Xyce | [Xyce/Xyce](https://github.com/Xyce/Xyce) / `master` | 2026-08-10 | [24e13434](https://github.com/Xyce/Xyce/commit/24e13434180c40f32f16101f4e236819c9809f62): CMake/static-MKL and regression infrastructure; removes Autotools | Simulate / Measure core |
| Xschem | [StefanSchippers/xschem](https://github.com/StefanSchippers/xschem) / `master` | 2026-09-05 | [ecbcb21e](https://github.com/StefanSchippers/xschem/commit/ecbcb21eb765b5069c9d72b976fcaab0db2a6a33), 2026-09-04: parent-property resolution fix | Generate / Edit core; EDA Integration supporting |
| OpenVAF-Reloaded | [OpenVAF/OpenVAF-Reloaded](https://github.com/OpenVAF/OpenVAF-Reloaded) / `mob` | 2026-08-25 | [fdf2522b](https://github.com/OpenVAF/OpenVAF-Reloaded/commit/fdf2522b70f42793f64b1c72f0195c96dea0cc19): LLVM 18 feature selection and release build changes | EDA Integration core; Simulate / Measure supporting |
| KLayout | [KLayout/klayout](https://github.com/KLayout/klayout) / `master` | 2026-08-26 | [e71272c3](https://github.com/KLayout/klayout/commit/e71272c3b178105bd2a2f25af54673a7af7ed60d): reconnects PCell editor events | Physical core; EDA Integration supporting |
| Magic | [RTimothyEdwards/magic](https://github.com/RTimothyEdwards/magic) / `master` | 2026-09-01 | [f63e7dad](https://github.com/RTimothyEdwards/magic/commit/f63e7dad5ab60a443f5710c408cbf3c4b03bbb3c), 2026-09-01: fixes select-command options without the layout cursor | Physical core |
| ALIGN | [ALIGN-analoglayout/ALIGN-public](https://github.com/ALIGN-analoglayout/ALIGN-public) / `master` | 2026-07-05 | [e392ae47](https://github.com/ALIGN-analoglayout/ALIGN-public/commit/e392ae4789eb49193a4865244d8cc31dbe1744b7): substantive OTA testbench/model update | Generate / Edit and Physical core; generated artifacts are layouts |

- ngspice uses official SourceForge distribution/release history. The legacy `no-public-repo` record means no GitHub strip, not absence of public source code. Its sourced August 11 update and Code link are shown without fabricated GitHub history.
- Xyce's README documents rerooting after release 7.9. Count only the captured current first-parent history; do not graft or add the archived history.
- Xschem's author documents a transition toward Codeberg while the official project site still lists the active author-owned GitHub development source. The requested GitHub repository remains the reviewed activity source for this snapshot. Codeberg is a secondary source, not an additional counted history; reassess hosting at the next refresh. The cosmetic September 5 tip is not the meaningful date.
- OpenVAF-Reloaded's actual default branch is `mob`, despite older `master` text. Its maintained OSDI 0.4 compiler feeds a simulator; it does not itself perform circuit simulation. The original OpenVAF repository and unmaintained OSDI 0.3 branch are not substituted.
- Magic's latest version-number commit remains the mechanical sort date, but the immediately preceding implementation fix supplies meaningful freshness. Occasional AI co-authorship does not change the baseline's public type.
- The Analog snapshot capture time advances for this review, while the original 27 histories and the transferred history remain pinned to their existing reviewed heads. This is a bounded baseline addition, not a claim that every old repository was fetched again.

## Previous domain review validation record

- `npm run check`: passed, including Golden validation/fact lint/duplicate checks, **35 Analog / 33 Digital** validation, **16 Analog / 17 Digital unit tests**, the **285-page build** and **3,112 internal-anchor checks**. Both catalog unit commands were also run directly.
- `npm run test:smoke`: **71/71 Chromium production-preview tests passed**. Coverage explicitly checks domain navigation/titles, reviewed membership, shared role types, only the approved AI-built set, unchanged matrix axes/marks and activity order, ngspice without a GitHub strip, independent viewer state, native hashes, no-JS access and responsive geometry.
- Digital native history coverage waits for the browser's smooth scroll to settle before recording the restoration position. The exact back-position assertion remains; no production script or history behavior changed. The focused hash/direct-load/reload/back/forward case also passed **6/6 repeated runs**.
- Visual inspection at **1440, 390 and 320px** covered both matrices, sticky names on narrow screens, first/middle/last rows, multi-role text, the moved entry, source links and ngspice's sourced public date. Existing four-column density remains; neither page introduces page-level horizontal overflow or additional visible prose/controls.
- Regression comparison: all **27 existing Analog content files** are byte-identical; all **33 retained Digital content files** differ only by their authored role field. All **61 pre-existing activity records** are preserved, including the transferred record's identity, head, buckets and meaningful SHA/date; its source array is also unchanged. All six new GitHub baseline identities, branch tips, pinned source paths, twelve buckets and meaningful commits were cross-checked against the reviewed primary histories.
- All **283 non-catalog HTML `<main>` bodies** are byte-identical to the starting build. Golden data, Article bodies, Timeline/Events behavior and deployment configuration are unchanged. `/export.json` is byte-identical, SHA-256 **`67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`**.
- `git diff --check` passed. No dependency, catalog runtime request, redirect or deployment change was added. Delivery is a normal commit/push to `main`; **no Pages deployment in this pass**.

Browser automation remains Chromium-only. External simulation/benchmark results were not independently reproduced; existing repository snapshots remain pinned rather than implicitly re-reviewed.

## Current structure and behavior

- `src/content/analog/*.md`: 35 independent English entries, unchanged by this presentation pass. The existing bounded `description` supplies each row's one use-case/capability paragraph. The shorter summary, complete source arrays and research remain stored but are not repeated in the UI. Reviewed source and freshness evidence remain pinned; no activity refresh or reclassification occurred.
- `src/pages/analog/index.astro` and `src/styles/analog.css`: the semantic six-column workflow matrix appears first, immediately followed by its compact legend. `Project`, `Keywords`, `Activity` headers begin the index directly. No visible Landscape/Projects headings or shortcut. Rows use flexible 2.7fr/1.15fr columns and a fixed 177px Activity column: title/primary links and description, role/AI/keyword tags, then the compact activity band. Mobile stacks those three areas; only the matrix scrolls horizontally and its project column stays sticky.
- `src/lib/analog/catalog.ts`: unchanged immutable sort uses GitHub `lastCommitAt` or no-repository `lastPublicUpdateAt`, descending. Ties use NFKC-normalized lower-case name then slug; missing dates sort last. The obsolete catalog `browser.ts` is removed: native links/history now reach always-visible content without client code.
- Search, filters, q/type state, IME handling, resets and custom history are removed. Old query strings have no effect. No browser storage, runtime fetch, database, or dependency was added.
- There are no disclosures, separate description panels or Primary sources bibliography in the DOM. Website/Paper/Code/Results links stay directly visible, with original source IDs. Old Markdown heading, bibliography and non-primary source IDs survive as empty aliases beside the project description. All descriptions and native anchors work without JavaScript, including direct navigation and reload. Project rows use `tabindex="-1"` to receive native fragment-navigation focus without adding Tab stops.
- `src/data/analog-activity.json`: volatile repository activity is separate from durable project research and the three bounded catalog addition notes. The page validates and renders the checked-in snapshot at build time.
- Schema, unit tests and browser expectations use authored project IDs. Golden content, Article bodies, viewer code/state and factual export are independent and untouched.

## Previous Analog expansion review (2026-09-05)

The inclusive rolling cutoff is **2025-09-05**. Removal means no recent verifiable meaningful public activity, not that historical research lacks technical value. Every repository-backed entry has a manually inspected substantive commit at or after the cutoff; this evidence is separate from the latest raw commit used by the unchanged UI. Build validation enforces the rule relative to the checked-in review date, so a normal static build does not depend on the wall clock or GitHub.

- **Removed AMSBench:** `Why0912/AMSBench` remains at `4f9867ca0`, last public default-branch commit 2025-06-18. No newer qualifying repository activity was verified.
- **Withheld PPAAS:** the [2025-11-09 commit](https://github.com/SeunggeunKimkr/PPAAS/commit/cdd74aae4a9823f04908fec46d22c23a0f6fb8e5) only turns an author name into a homepage link. The latest code refactor is [2025-07-22 UTC](https://github.com/SeunggeunKimkr/PPAAS/commit/b8e5ac8ff1fb2d3d4e7ba2d82d3b670dc95293e1); remaining intervening README changes are also before the cutoff. A fresh cosmetic timestamp does not satisfy this pass's meaningful-activity rule.
- **Withheld NetGen:** the [authors' release](https://github.com/getnen/NetGen-Failure-Aware-Orchestrator-Agents-for-Analog-Netlist-Generation) explicitly describes an archival results repository. Outside `runs/` it contains README and `problem_set.tsv`; thirty selected run archives expose generated netlists, prompts, traces and evaluation artifacts, not the runnable orchestrator implementation. Fresh results alone do not meet the requested implementation criterion. This is not a statement that the research or artifacts lack value.
- All other existing entries pass. ATLAS stays under the existing no-repository/public-update mechanism. No additional paper-only project is introduced. The user's held candidates were not added merely to increase inventory.

### New scope decisions

Each entry links its pinned implementation evidence and complete source provenance. Default descriptions remain one concrete English paragraph; only the existing primary-purpose links appear in the UI.

| Added project | Distinct scope and conservative classification decision |
| --- | --- |
| ASTRA | Retrieved design knowledge and gm/ID initialize staged Bayesian sizing. Simulation is supporting because the public adapter depends on external KATO, netlists and tables. |
| ZeroSim | Learned amplifier performance surrogate; supporting evaluation scope, with no generated circuit, optimizer or model-accessible SPICE inference claim. |
| AnalogToBi | Device-net bipartite topology generation and grammar checks. ERC is structural; no simulation/optimization mark for the captured generator path. |
| ARCS | Autoregressive connectivity/component generation and actual ngspice rewards. Evaluator templates constrain the circuit families; inspect current `src/arcs`, not only the legacy tree. |
| AnalogSAGE | Reasoning, topology exploration and numerical sizing with design memory. Use the author's original upstream, not the older paper-linked lab fork; simulation integration remains supporting. |
| AutoSizer / AMS-SizingBench | One agent/benchmark entry, with 24 YAML circuit configurations. Optional missing ALIGN/Magic adapters do not justify a Physical mark. |
| PANDA | Staged topology, EDA and physical flow; external generic sizing is supporting. Core layout scope does not imply every source-netlist LVS/signoff path is complete. |
| LOADBench | 101 testbenches verified in the small Zenodo archive, plus public metric code and institutional paper abstract. Simulation supports dataset/evaluator tasks, not assumed agent tools. |
| G-DiffPS | RF phase-shifter selection/sizing across six templates; constrained generation, core simulation/optimization. Retained results are a GNN ablation, not all paper experiments. |
| EEschematic | Netlist to editable schematic via visual reasoning. Schematic symbol placement is not physical IC layout. |
| vaBench | Current r53: 400 families / 1,200 model-generation, bugfix and testbench tasks. The agent-accessible EVAS runtime establishes simulation scope; old 300-row dashboard results are not relabeled as r53. |
| EVAS | Independent versioned simulator/package used by vaBench. Event-driven behavioral execution and linting, not SPICE-equivalent circuit solving. |
| gmoverid-skill | Executable characterization, device sizing and corner/Monte Carlo tools for agents. Lookup-based sizing is supporting optimization, not an autonomous circuit optimizer. |
| AMS-IO-Agent / AMS-IO-Bench | One project with public schematic/layout/verification tooling and companion cases. Core physical scope is I/O-ring design; the paper's human-designed AMS core is not agent output. |
| Masala-CHAI | Image-to-SPICE direction complements EEschematic. V2 simulation feedback is implemented but optional; the missing-ngspice success fallback earns only supporting scope. |

### Evidence limits

LOADBench's Paper link is the author institution's publication/abstract record; no full manuscript was retrieved. Its Zenodo metadata and 101 small `.cir` files were inspected without downloading multi-gigabyte simulation archives. G-DiffPS removed its manuscript and some tables in the latest code-only release, so broken README links are not surfaced. No current public vaBench website or r53 model leaderboard was verified; the checked-in legacy dashboard represents a different release and is not exposed as current Results. Author-reported results, proprietary EDA prerequisites, partial adapters and the Masala-CHAI refreshed-dataset release gap remain in research files, not added as dashboard methodology prose. No external model training, paid model call, commercial EDA run or benchmark reproduction was performed.

## Retained Landscape classifications

The twelve retained entries keep their previous source-reviewed classifications and prose. Their default-branch histories were rechecked for freshness. ATLAS v1 (2026-07-15) remains the sourced no-repository update; the new-implementation requirement applies to additions, not automatic removal of this existing fresh paper entry.

Marks express reviewed scope, not scores or reproduced success. Core means a central reviewed task/interface; supporting includes a constrained task/track, auxiliary primitive, or incompletely released research path. A blank is not evidence of inability. Simulator use alone does not establish EDA session integration. Generation does not automatically imply an independently evaluated reasoning deliverable. PVT/Monte Carlo evaluation is not layout or silicon work.

| Project | Deliberate classification and ambiguity resolution |
| --- | --- |
| Analog Design Bench | Editing, simulator iteration and specification closure core. The bandgap task explicitly supplies model-accessible development benches and a separate evaluator; it grades electrical measurements, not topology. Reasoning not separately graded; no EDA-session or physical mark. |
| AnalogCoder-Pro | Generation and simulation-backed repair core; waveform diagnosis supports the loop. Optimization supporting because BO is described in the research but the reviewed public checklist remains unfinished. Rechecked `run.py` and released tasks, not predecessor results. |
| AnalogForge Agent | Supporting marks for proposal contracts, constrained templates, separate native simulation adapter and proxy/analytic optimization. The default is an analytic fixture; planned physical/PVT/MC studies do not earn marks. The all-supporting row reflects these particular contracts, not a maturity rating. |
| AnalogGym | Simulation/optimization core; parameter-file editing supporting. The reviewed AMP/LDO open examples are not a promise of complete open support for all thirty topologies. No LLM reasoning, free-form generation, or layout claim. |
| ATLAS | Expert-grounded planning and template modification supporting; simulation core to the paper's validation; external BO sizing supporting. Paper-centric evidence is allowed, with human testbench correction retained. No released implementation or physical completion implied. |
| CircuitRubric | Generated netlist core. No optimization mark: relative W/L/M/value ratios are structural grading, not measured tuning. No simulation or independently graded reasoning trace. |
| EvoLDO-Bench | Reasoning core; circuit editing, controlled simulation and closure supporting **only in the separate tool tracks**. The v0.7 reasoning track still has zero model tools. Tool preflight is not generalized to commercial EDA session control. |
| NetlistBench | Existing-netlist interpretation/recognition and requested transformations core. Rechecked v2 manifest and canonical-IR grader; no electrical-equivalence, simulation or design-success claim. |
| Razavi-Bench | Reasoning core; scratch-deck generation and ngspice supporting only in the experimental treatment. Final answer remains the graded artifact; curated reference-assisted decks are excluded from official inputs. |
| vcli | Schematic edit, Spectre/PSF and EDA session control core. Physical supporting: inspected Rust `LayoutOps` geometry/stream-out SKILL builders, not a dedicated autonomous layout flow. No optimizer mark for general control primitives. |
| virtuoso-agent | Simulation, tuning and EDA backend control core; diagnosis/proposals and existing-circuit parameter editing supporting. Rechecked loop implementation and backend contract; no unrestricted topology or layout claim. |
| virtuoso-bridge-lite | Schematic, simulation and EDA primitives core; layout geometry/stream-out supporting. Rechecked editor implementation and README. External optimizer guides do not make optimization a built-in bridge capability. |

Each row's retained research Markdown cites the relevant primary material. The two layout implementation files inspected in the original redesign are in the source arrays; those bodies and existing IDs remain intact. The dashboard's concise descriptions do not repeat this classification audit.

## Public repository activity methodology

Snapshot date: **2026-09-05**, window **October 2025–September 2026**, with September partial. `capturedAt` records the UTC collection cutoff; `headSha` fixes each inspected default-branch history. All selected repositories were public and not GitHub forks when rechecked. Each is the entry's verified Code source; none is combined with upstream, website, result, or companion repositories.

The helper fetches repository metadata from public GitHub data using `gh`, reads the current default branch, and fetches that branch's Git history without checking out or executing project code. It walks **first-parent history**, counting one integration commit for a merge, and bins committer timestamps in UTC. This is a conservative default-branch integration-history count, not all commits on all reachable side branches. PR refs, stars, issues, fork counts and popularity are unused.

Git does not record a reliable historical push/landing time. Fast-forward merges, timestamp edits, imports, squashes and history rewrites can move apparent activity between months. The data represents a public-history snapshot, never total development effort; this explanation stays in maintenance documentation. The last date is the latest committer date in the captured first-parent history, even if older than the displayed window. It includes the year when different from the snapshot year. An empty window is twelve dots, not an inactive-project declaration; no-repository entries get no synthetic strip.

Repository-specific review found bulk publication in the short Analog Design Bench, CircuitRubric, NetlistBench and AnalogForge histories; this does not expose when earlier work occurred. vcli includes ten dependency-bot commits in September alongside other changes; the snapshot includes them and retains this in its data notes. The bridge also records automated traffic updates; they remain raw strip events, while its September 2 Maestro timeout/escaping fix establishes substantive freshness. Bot attribution and subjects are inspection aids, not a complete automated provenance classifier. New histories include one-shot source/data releases and generated benchmark material; these are publication patterns, not evidence of sustained effort. No public activity is interpreted as project quality.

| Project ID | Primary repository / default branch | Latest UTC commit or public update | Verified substantive commit date |
| --- | --- | --- | --- |
| ams-io-agent | [Arcadia-1/AMS-IO-Agent](https://github.com/Arcadia-1/AMS-IO-Agent) / `main` | 2025-12-25 | 2025-12-25 |
| analog-design-bench | [Arcadia-1/analog-design-bench](https://github.com/Arcadia-1/analog-design-bench) / `main` | 2026-08-12 | 2026-08-07 |
| analogcoder-pro | [laiyao1/AnalogCoderPro](https://github.com/laiyao1/AnalogCoderPro) / `master` | 2026-03-14 | 2026-02-22 |
| analogforge-agent | [appleweiping/analog-forge-agent](https://github.com/appleweiping/analog-forge-agent) / `main` | 2026-08-11 | 2026-08-11 |
| analoggym | [CODA-Team/AnalogGym](https://github.com/CODA-Team/AnalogGym) / `main` | 2025-10-29 | 2025-10-29 |
| analogsage | [wznmickey/AnalogSAGE](https://github.com/wznmickey/AnalogSAGE) / `main` | 2026-05-23 | 2026-05-23 |
| analogtobi | [Seungmin0825/AnalogToBi](https://github.com/Seungmin0825/AnalogToBi) / `main` | 2026-05-07 | 2026-05-06 |
| arcs | [tusharpathaknyu/ARCS](https://github.com/tusharpathaknyu/ARCS) / `main` | 2026-04-10 | 2026-03-27 |
| astra | [IceLab-X/ASTRA](https://github.com/IceLab-X/ASTRA) / `main` | 2025-10-28 | 2025-10-28 |
| atlas | No verified public repository | Paper 2026-07-15 | Sourced public update |
| autosizer | [yuxi120407/AutoSizer](https://github.com/yuxi120407/AutoSizer) / `main` | 2026-05-26 | 2026-05-26 |
| behavioral-veriloga-eval | [Arcadia-1/behavioral-veriloga-eval](https://github.com/Arcadia-1/behavioral-veriloga-eval) / `main` | 2026-07-28 | 2026-07-28 |
| circuitrubric | [levantlabs/circuitrubric-bench](https://github.com/levantlabs/circuitrubric-bench) / `main` | 2026-06-23 | 2026-06-23 |
| eeschematic | [eelab-dev/EEschematic](https://github.com/eelab-dev/EEschematic) / `main` | 2025-10-20 | 2025-10-19 |
| evas | [Arcadia-1/EVAS](https://github.com/Arcadia-1/EVAS) / `main` | 2026-07-28 | 2026-07-28 |
| evo-ldo-bench | [jialinlu/ldo_benchmark_for_agent](https://github.com/jialinlu/ldo_benchmark_for_agent) / `main` | 2026-09-03 | 2026-09-03 |
| g-diffps | [ACADLab/G-DiffPS](https://github.com/ACADLab/G-DiffPS) / `main` | 2026-08-21 | 2026-08-21 |
| gmoverid-skill | [Arcadia-1/gmoverid-skill](https://github.com/Arcadia-1/gmoverid-skill) / `main` | 2026-07-07 | 2026-07-07 |
| loadbench | [FilipeAz/LOADBench-Scripts](https://github.com/FilipeAz/LOADBench-Scripts) / `main` | 2026-08-03 | 2026-08-03 |
| masala-chai | [jitendra-bhandari/Masala-CHAI](https://github.com/jitendra-bhandari/Masala-CHAI) / `main` | 2026-08-09 | 2026-05-09 |
| netlistbench | [WoshiMayou/NetlistBench](https://github.com/WoshiMayou/NetlistBench) / `main` | 2026-08-04 | 2026-08-04 |
| panda | [PKU-IDEA/PANDA](https://github.com/PKU-IDEA/PANDA) / `main` | 2026-06-18 | 2026-06-18 |
| razavi-bench | [Arcadia-1/razavi-bench](https://github.com/Arcadia-1/razavi-bench) / `main` | 2026-08-17 | 2026-08-17 |
| vcli | [deanyou/virtuoso-cli](https://github.com/deanyou/virtuoso-cli) / `main` | 2026-09-04 | 2026-09-04 |
| virtuoso-agent | [lixunqi12/virtuoso-agent](https://github.com/lixunqi12/virtuoso-agent) / `main` | 2026-07-03 | 2026-07-03 |
| virtuoso-bridge-lite | [Arcadia-1/virtuoso-bridge-lite](https://github.com/Arcadia-1/virtuoso-bridge-lite) / `main` | 2026-09-04 | 2026-09-02 |
| zerosim | [xz-group/ZeroSim](https://github.com/xz-group/ZeroSim) / `main` | 2026-04-24 | 2026-04-24 |

The snapshot is authoritative for all twelve monthly counts, captured heads and reviewed substantive commit identities. Dates above use UTC; local August 20 for G-DiffPS becomes August 21, and local July 8 for gmoverid-skill becomes July 7. No paper publication date substitutes for repository activity.

## Maintenance and manual refresh

1. Review primary sources before changing prose or scope. Keep stable filenames, four passive roles, short keywords, and `core|supporting` only; omit unreviewed/future scope. Do not create Golden records.
2. Keep one source array with unique IDs/purposes. Cite local `#source-ID` references in research Markdown. Keep dashboard `description` focused on the actual use case and operations, with nuanced prerequisites and review evidence stored in the original metadata/body. A no-change review does not reorder the index or add a catalog update note; changes to the recorded latest public activity can reorder it.
3. For activity, manually review/choose one Code repository or a sourced no-public-repository entry. Run `npm run refresh:analog-activity` with Git and authenticated `gh`. It updates only the complete activity snapshot after all repositories succeed and validation passes; a failed request leaves the previous file intact. Temporary clones are removed. The helper is never part of check/build and is never shipped to the browser.
4. Review the snapshot diff and histories for changed ownership/default branches, automated or imported history. Manually verify a substantive first-parent commit, set `lastMeaningfulCommitAt` and record its hash in `notes`. The helper preserves that date; raw new commits never renew eligibility automatically. Validation rejects expired or missing evidence before replacing the snapshot. For additions/removals, curate the content and matching activity records together before invoking the refresh helper. Existing no-repository entries also need a fresh sourced public date. Do not treat the helper as a source/content review.
5. Run `npm run check`, `npm run test:smoke`, and `git diff --check`. Compare existing factual/export and Article content to the branch base. Inventory and activity expectations derive from authored files; only stable interaction fixtures are named explicitly.

## Retained initial project selection

The retained entries below came from the initial implementation and review pass. AMSBench has since been removed by the freshness rule; its research lead remains historical in RESEARCH_SEED.md. The active population covers different task contracts rather than ranking general design capability.

| Project | Reason for inclusion and important qualification |
| --- | --- |
| [Analog Design Bench](../../src/content/analog/analog-design-bench.md) | Agents editing circuits against electrical specifications. Website V2 lists 50 tasks; the reviewed public tree has 16 task directories. Task partial credit and the website aggregate are different measures. |
| [AnalogCoder-Pro](../../src/content/analog/analogcoder-pro.md) | Generation, waveform diagnosis/repair, and sizing research with public tasks and benches. BO updates and some ablation prompts remain unfinished in the reviewed checklist. Earlier AnalogCoder results are not reused as Pro results. |
| [AnalogForge Agent](../../src/content/analog/analogforge-agent.md) | Experimental workbench exposing the difference between a runnable fixture and a native evaluation path. Default runs are analytic, dashboard points synthetic, PDK mappings unpinned, and thresholds preregistered targets. |
| [AnalogGym](../../src/content/analog/analoggym.md) | Optimization benchmarks and an environment for methods beyond LLMs. The explicit open ngspice/Sky130 claim concerns amplifiers and LDOs; it is not generalized to every topology or PLL. |
| [ATLAS](../../src/content/analog/atlas.md) | Paper-centric SAR ADC generation using templates, expert intervention, and simulation. No verified public ATLAS code or layout claim. |
| [CircuitRubric](../../src/content/analog/circuitrubric.md) | Structural netlist and relative-sizing evaluation without SPICE. FULL and the relaxed functional aggregate do not establish circuit performance. |
| [EvoLDO-Bench](../../src/content/analog/evo-ldo-bench.md) | Separate tool-free reasoning and EDA task tracks. Developer reference replay is not an LLM result; official workspaces must exclude trusted evaluator artifacts. |
| [NetlistBench](../../src/content/analog/netlistbench.md) | Existing-netlist recognition, editing, and hierarchy. Released v2 manifest and physical case files agree on 2,342 cases / 24 families. The 100 equivalence judgments count under recognition despite their edit-directory location. |
| [Razavi-Bench](../../src/content/analog/razavi-bench.md) | Circuit reasoning with direct, agentic, and experimental simulator-assisted modes. Final answers are scored; reference-assisted netlists are not official model inputs. |
| [vcli](../../src/content/analog/vcli.md) | A separate Rust rewrite extending the bridge approach with multiple sessions, dynamic ports, JSON CLI behavior, and concurrent local broadcast. EDA interfaces do not establish analog-design success. |
| [virtuoso-agent](../../src/content/analog/virtuoso-agent.md) | Existing-circuit parameter optimization through Maestro/Spectre or HSpice. Licenses, PDK, DUT, bench, specification, host, and model remain user prerequisites. |
| [virtuoso-bridge-lite](../../src/content/analog/virtuoso-bridge-lite.md) | EDA bridge primitives for schematic, layout, and simulation work. Exposing an API is separate from demonstrating a successful optimization. |

No paid model runs, commercial EDA execution, large simulations, or independent benchmark reproduction were performed. Code inspection supports implementation descriptions, not claims of successful operation in arbitrary user environments. AnalogCoder-Pro's publisher URL returned HTTP 202 to the automated client; its paper-specific numerical claims were not used. Descriptions rely on accessible author-released material.

## Candidates left for a later review

These secondary leads remain outside the bounded initial population. Except for the focused eda-agents review below, they received primary-source screening rather than a full artifact and execution-contract review. Omission does not imply that no public code or useful results exist.

| Candidate and primary starting point | Next check before inclusion |
| --- | --- |
| [AnalogXpert](https://arxiv.org/abs/2412.19824) | Verify current official implementation and the block-selection/connection task contract. |
| [OCB / CktGNN](https://github.com/zehao-dong/CktGNN) | Review dataset and simulation setup before adding another learning/optimization environment. |
| [OSIRIS](https://huggingface.co/datasets/hardware-fab/osiris) | Public data and code archives are available; inspect their layout-generation and reproduction contract without treating archive presence as reproduction. |
| [ORACLE](https://arxiv.org/abs/2608.04999) | Inspect implementation and the LLM's action-filtering role within optimization. |
| [eda-agents](https://github.com/Mauricio-xx/eda-agents) | Concrete implementation and narrow native runs were verified. Withheld pending a clearer release-level mapping from advertised analog agent workflows to live execution contracts and results; details below. |

### Focused eda-agents decision

Reviewed revision `9e5dcb453fd5313d43aa2e6239d1ef108ab834d0`. The code has typed task inputs, grading, pre-simulation checks, and simulator adapters. Its [generic analog_roles adapter](https://github.com/Mauricio-xx/eda-agents/blob/9e5dcb453fd5313d43aa2e6239d1ef108ab834d0/src/eda_agents/bench/adapters.py) uses DryRunExecutor; the dry-run adapter supplies synthetic metrics and marks simulation successful without running a simulator. A [separate Miller-OTA artifact](https://github.com/Mauricio-xx/eda-agents/blob/9e5dcb453fd5313d43aa2e6239d1ef108ab834d0/bench/results/gap_closure_llm_proof/spec_llm_miller_ota_ihp.json) records an actual LLM+ngspice-OSDI path. It would be incorrect to describe the entire release as mocks or instructions only.

The [16-PASS summary](https://github.com/Mauricio-xx/eda-agents/blob/9e5dcb453fd5313d43aa2e6239d1ef108ab834d0/bench/results/gap_closure_final/summary.json) combines checks, dry runs, mock digital metrics, and native tool runs. The [runner](https://github.com/Mauricio-xx/eda-agents/blob/9e5dcb453fd5313d43aa2e6239d1ef108ab834d0/src/eda_agents/bench/runner.py) counts missing-backend FAIL_INFRA results as skipped and excludes them from its pass-rate denominator. These modes can be traced in code, but the aggregate and generic agent entry point are not a clear demonstration of a general live analog-design workflow. Keeping this candidate out is a bounded catalog-selection decision, not a claim that its implementation is absent. A future entry should name specific live paths and prerequisites, with dry-run and missing-backend outcomes separated.

## Active-catalog expansion verification (2026-09-05)

- `npm run check` passes: the existing factual validation/lint/duplicate checks, 27 catalog records and matching activity records, thirteen unit tests, 284 built pages and 2,740 internal anchors. The additional unit coverage exercises the inclusive rolling cutoff, leap-day handling, missing/future substantive dates, stale projects with fresh cosmetic commits, and sourced no-repository dates.
- All 60 production-preview Chromium smoke tests pass (17 catalog and 43 existing-site cases). Inventory-derived browser expectations cover the expanded matrix and rows, recent-activity order, workflow markers, roles/keywords/primary links, no-JS readability, keyboard access, native project/descendant anchors, reload/history and viewer-state isolation. No browser assertion was weakened to admit new data.
- The first CI run exposed a rapid-keyboard navigation failure, reproduced locally: Enter during the tall matrix's native focus scroll could update the fragment while leaving the project outside the viewport. Making each project row a native focus target with `tabindex="-1"` fixes the competing focus/fragment scrolls without JavaScript or a new Tab stop. The test still activates immediately and now also asserts the URL, row focus, fully visible heading/description and native Tab continuation; it no longer programmatically focuses the permalink to continue. Native focus may center a row; precise top-edge positioning remains tested separately for direct/reloaded descendant anchors. The strengthened keyboard case passes 24 consecutive runs, followed by the full 60-case suite using CI settings.
- Rendered inspection at 1440, 390 and 320px covers the full 27-row matrix, first/middle/last entries, repository and ATLAS no-repository activity, primary links and direct/reloaded source anchors. The desktop index still exposes about five complete rows per viewport; mobile has no page-level horizontal overflow, and only the matrix scrolls horizontally. No headings, disclosures or methodology prose were added. CSS and catalog sorting/anchor helpers are byte-identical to the starting main; the page template only adds native project-target focusability.
- All 54 pinned implementation/source paths for the additions exist in the inspected Git trees. Primary links were checked against author repositories, publications and released artifacts; LOADBench uses the valid `www.it.pt` institutional host. Activity records were checked against the captured default-branch first-parent histories. A simulated GitHub-access failure leaves the refresh helper's checked-in snapshot byte-identical and removes its temporary files.
- All twelve retained catalog files, Golden data, Article bodies, shared viewer code, dependencies and workflow configuration remain unchanged. All 283 non-catalog HTML pages and `/export.json` are byte-identical to the deployed `d3b6a4d` Pages artifact. Export SHA-256 remains `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`. `git diff --check` passes.
- The review does not independently reproduce external model/benchmark results. Browser automation is Chromium-only. This pass stops after push and CI; Pages deployment requires a later instruction.

## Previous compact-row refinement verification (`d3b6a4d`)

- `npm run check` passes: original factual checks, catalog/activity validation, twelve unit tests, 284 built pages and 2,712 internal anchors. The sort, content schema constraints and activity snapshot are unchanged.
- All 60 Chromium smoke tests pass (17 catalog cases and 43 existing-site cases). Expectations derive from authored entries. Tests cover the flat DOM, one visible description, roles/primary links in Links, absent disclosures/bibliography, matrix order/states, activity, keyboard traversal, native project and legacy hashes, reload/history, no-JS and viewer-state isolation. Anchor screenshots wait for native smooth scrolling to settle.
- Rendered review at 1440, 390 and 320 pixels covers the matrix, first/middle/last rows, repository/paper activity and project/source bookmarks. Desktop shows five complete rows; mobile places roles and links together with natural wrapping. No page-level horizontal overflow. The final reader pass finds no repeated summary, redundant section heading, disclosure control or bibliography in the rows.
- All catalog content, factual data, Article bodies, activity/update snapshots, shared viewer/layout code and dependencies are unchanged. All 283 non-catalog HTML pages and `/export.json` are byte-identical to the deployed `9a99184` artifact. Export SHA-256 remains `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`.
- Full diff self-review and `git diff --check` pass. Browser automation remains Chromium-only. Deployment configuration is unchanged; this pass only commits and pushes to `main`, with no Pages dispatch.

## Previous dashboard refinement verification (`9a99184`)

- `npm run check` passes: twelve catalog unit tests, 284 built pages and 2,712 internal links. Sorting tests cover repository and paper dates, missing dates, alphabetical/slug ties, immutable inputs and review-date independence.
- All 59 production-preview Chromium smoke tests pass. Both surfaces use the authored activity order; concise descriptions, existing sources, every legacy detail heading ID, independent disclosures, direct/reload/history links, no-JS, keyboard use and viewer-state isolation remain covered. Scroll-position assertions account for the natural document-bottom limit after reordering.
- Visual review at 1440, 390 and 320 pixels covers Landscape, first/middle/last projects, paper activity, expanded descriptions and source reload. Desktop retains five complete rows in the index; no page-level overflow. A final reader pass found only the small matrix legend, project information, activity and sources in the normal view, with concrete capability descriptions in disclosures.
- Existing Golden/Article content, activity/update snapshots, all prior catalog metadata and research Markdown remain unchanged. All 283 non-catalog HTML pages and `/export.json` are byte-identical to starting main. Export SHA-256 remains `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`.
- Full diff self-review and `git diff --check` pass. No viewer, factual schema, dependency or deployment configuration changes. The existing Pages workflow remains manual-only.

## Original landscape redesign verification and reader self-review

- `npm run check`: original factual validation/lint/duplicate checks, catalog/activity validation, eleven catalog unit tests, production build, and internal links pass. The build has 284 pages and 2,715 internal anchors.
- `npm run test:smoke`: 59 Chromium tests pass (43 unchanged existing-site tests and 16 redesigned catalog tests). Inventory, source metadata, scope marks, month states and dates derive from authored data. Search/filter/history-edit tests were removed with their product behavior; native hash history, unknown/descendant targets, repeat permalink activation, disclosure independence and keyboard access remain covered.
- Visual inspection at 1440, 390 and 320 pixels covers Landscape (including horizontal scroll), first/middle/last entries, repository/no-repository cases, expanded Notes, project links, source direct navigation and reload. Desktop shows five full compact entries when viewing the index. There is no page-level horizontal overflow. An initial narrow-width failure exposed absolutely positioned accessibility text escaping the table's scroll container; making that container its positioning context corrected the actual issue.
- Activity collection succeeded against all twelve repositories. An API/authentication failure exercise left the checked-in snapshot byte-identical. Normal check/build uses only that snapshot and does not contact GitHub.
- All 281 existing factual/Article source files and all 283 non-catalog HTML pages are byte-identical to the pre-redesign main build. Existing viewer assets are unchanged. All thirteen original catalog Markdown bodies remain intact before the added scope paragraphs. Only summaries and new catalog-owned metadata change their default presentation.
- `/export.json` remains byte-identical, SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`. No factual schema, data, Article, viewer or deployment configuration changes.
- Full branch diff review and `git diff --check` find no unrelated change. Browser automation remains Chromium-only; no external benchmark results were independently reproduced.

Reader self-review: the matrix exposes the different reasoning, artifact, simulator, optimization and EDA scopes before opening any project. All thirteen project names are available at the same compact scale, including the last entry, and link directly to their Notes. In the index, one sentence and a few keywords support quick skipping, sources are directly reachable, and binary monthly strips distinguish visible patterns without varying mark size by count. No project/column totals, maturity/autonomy ladder, ranking, popularity metric, or activity score is shown. Supporting marks and blank cells have explicit semantics; release/track nuance belongs in Notes. The defaults contain no article-length notices, redundant controls or decorative cards.
