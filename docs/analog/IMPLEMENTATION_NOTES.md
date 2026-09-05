# Analog implementation and review notes

## Vertical Flow refinement (2026-09-06)

Starting commit: `cded7cf77df8c3d8caea927585025d0e794deab6`. The existing single-index migration was complete. This refinement keeps all **35 Analog / 33 Digital** entries, their reviewed Flow assignments, descriptions, source arrays and activity records. Rechecked every entry's description and cited Flow notes; the prior migration had already incorporated useful technical identifiers and documented per-project primary-source decisions.

The title now contains only a plain-text name immediately followed by external primary links. Role/AI fields had no independent consumer after removing their labels, so the frontmatter fields, schema plumbing and shared tag helper are removed. Useful sourced implementation and development evidence stays in research prose without an active classification enum.

Flow is vertical, one stage per line, with 3px gaps and 1.4 line height. The 1120px index uses **Project 798px / Flow 170px / Activity 108px**, with 22px column gaps, stacking below 900px. The Activity date uses normal weight **400**; the unchanged 5×12px upright cells, 2px gaps and 82px band retain the existing date / band / N/12 months structure. Primary links follow the name with a 12px flex gap. Articles-last navigation and noindex/nofollow remain unchanged.

## Vertical Flow refinement validation

`npm run check` passes, including both catalog validators, all deterministic tests, fact lint, duplicate checks, the **285-page** build and **2,976** internal-link checks. Explicit catalog unit commands pass **Analog 20/20** and **Digital 22/22**. The full production-preview Chromium suite passes **70/70**. The obsolete badge-only test was removed; shared tests now require title lines to contain exactly the project name and authored quick links, with no classification labels. They also enforce vertical Flow geometry and a normal-weight Activity date for every row.

Visually reviewed both pages at **1440, 1280, 1024, 390 and 320px**, including first/middle/last entries, multi-stage and multi-link rows, ATLAS, ngspice and Surfer. Project descriptions dominate, Flow stays compact and vertical, title links wrap naturally, and dates are not bold. No overlap or page-level overflow was found. Keyboard/no-JS access, forced colors, all-row activity provenance/counts, navigation order and noindex/nofollow pass the browser checks.

All **68** project IDs, descriptions, Flow values, source arrays and activity dates match the starting state. Only the unused role/AI frontmatter fields were removed; research edits remove obsolete classification-policy wording while retaining primary evidence. Both activity snapshots and **284** other content/data files are byte-identical. All **283** non-catalog generated HTML pages are byte-identical, including their navigation. `/export.json` retains SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`. Browser automation is Chromium-only. No deployment or workflow modification is included.

## Previous Flow migration (2026-09-05)

Starting commit: `48810ade612772d169f033da7569571fe03c304e`. That migration retained the 35 Analog / 33 Digital entries and their source/activity provenance, replaced the former taxonomy with `flow` and removed the overview, keyword fields and fragment-navigation infrastructure without a compatibility layer.

Every existing entry's description, technical identifiers and research/classification body were reviewed. Cited primary material was reopened for all 68 entries, including pinned repository READMEs, implementation files and the ATLAS paper. This is a scope migration, not an activity refresh or independent benchmark reproduction. Each authored file records its individual Flow decision and a source reference. Useful identifiers such as ngspice, SKY130, Spectre, SystemVerilog, Yosys and OpenROAD remain in natural descriptions; no hidden search vocabulary is retained.

## Flow migration validation

`npm run check` passed, including both catalog validators, fact lint, duplicate audit, all unit tests, the 285-page production build and 2,976 internal-link checks. The explicit Analog and Digital unit commands passed **20/20** and **22/22** respectively. The full production-preview Chromium suite passed **71/71** after updating the three shared navigation expectations for Articles-last ordering. No behavior checks were relaxed to accommodate data errors.

Visually inspected both indexes at **1440, 1280, 1024, 390 and 320px**, including first/middle/last, multi-link and multi-stage entries, ATLAS, ngspice and Surfer. The then-current descriptions, Flow and title links wrapped without overlap; no page-level overflow. Keyboard access, no-JS navigation, forced-colors shapes and all-row activity provenance/counts pass browser checks.

That migration preserved all 68 project identities, source arrays and retained non-Flow metadata. Both activity snapshots and 284 non-catalog content/data files are byte-identical. All 283 non-catalog HTML pages match after excluding the reordered primary navigation. `/export.json` retains SHA-256 `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`. The obsolete-taxonomy/keyword/permalink audit leaves only negative tests; `git diff --check` passes. Browser automation is Chromium-only; external benchmark results were not independently reproduced. This pass does not deploy or modify the manual Pages workflow.

## Flow classification decisions

- **Design** absorbs circuit reasoning, netlist/schematic generation and sizing/optimization. Structural benchmarks CircuitRubric and NetlistBench stay Design only; their oracle does not simulate electrical performance. EEschematic symbol placement is also Design, not IC layout.
- **ZeroSim** is core Simulation because learned performance estimation is its central user-facing purpose in this model; this does not claim SPICE execution. **OpenVAF-Reloaded** is supporting Simulation because it compiles OSDI models for another simulator. A sole supporting mark is deliberately allowed.
- **ALIGN** is core Layout with supporting Design for circuit annotation/hierarchy preparation. **ATLAS** is core Design and Simulation for the paper's template assembly and Spectre-validation task; neither templates nor paper-only release make the task secondary. Expert intervention and no-layout boundaries remain in its research notes.
- **AnalogSAGE**, **ASTRA**, **AnalogForge** and **Masala-CHAI** have supporting Simulation for their secondary/externally integrated/optional feedback paths. **AutoSizer** and **AnalogGym** have core Simulation because electrical evaluation is central to their sizing contracts. **gmoverid-skill** exposes both sizing quantities and characterization, hence core Design and Simulation without claiming autonomous optimization.
- **PANDA** covers all three stages. **AMS-IO-Agent** covers Design and Layout, with no simulation mark inferred from its physical checks. The paper's human-designed AMS core is not agent output.
- **virtuoso-agent** covers core Design and Simulation. **vcli** and **virtuoso-bridge-lite** additionally expose supporting Layout primitives. **Xschem** uses core Design with supporting simulator launch/back-annotation. EDA control is classified by these actual operations.
- **EvoLDO-Bench** and **Razavi-Bench** retain supporting Simulation because their simulator/tool treatments are separate from primary reasoning tasks. **vaBench** covers Design and Simulation; evaluator use does not imply tools are exposed to every model track.

ATLAS and ngspice keep their existing July 15 paper and August 11 release dates, each producing one active month without commit fields. No activity record is refreshed. Surfer's canonical GitLab review is preserved in the [Digital notes](../digital/IMPLEMENTATION_NOTES.md#surfer-history-review).

## Previous Analog expansion review (2026-09-05)

The inclusive rolling cutoff is **2025-09-05**. Removal means no recent verifiable meaningful public activity, not that historical research lacks technical value. Every repository-backed entry has a manually inspected substantive commit at or after the cutoff; this evidence is separate from the latest raw commit used by the unchanged UI. Build validation enforces the rule relative to the checked-in review date, so a normal static build does not depend on the wall clock or GitHub.

- **Removed AMSBench:** `Why0912/AMSBench` remains at `4f9867ca0`, last public default-branch commit 2025-06-18. No newer qualifying repository activity was verified.
- **Withheld PPAAS:** the [2025-11-09 commit](https://github.com/SeunggeunKimkr/PPAAS/commit/cdd74aae4a9823f04908fec46d22c23a0f6fb8e5) only turns an author name into a homepage link. The latest code refactor is [2025-07-22 UTC](https://github.com/SeunggeunKimkr/PPAAS/commit/b8e5ac8ff1fb2d3d4e7ba2d82d3b670dc95293e1); remaining intervening README changes are also before the cutoff. A fresh cosmetic timestamp does not satisfy this pass's meaningful-activity rule.
- **Withheld NetGen:** the [authors' release](https://github.com/getnen/NetGen-Failure-Aware-Orchestrator-Agents-for-Analog-Netlist-Generation) explicitly describes an archival results repository. Outside `runs/` it contains README and `problem_set.tsv`; thirty selected run archives expose generated netlists, prompts, traces and evaluation artifacts, not the runnable orchestrator implementation. Fresh results alone do not meet the requested implementation criterion. This is not a statement that the research or artifacts lack value.
- All other existing entries pass. ATLAS stays under the existing no-repository/public-update mechanism. No additional paper-only project is introduced. The user's held candidates were not added merely to increase inventory.

### Evidence limits

LOADBench's Paper link is the author institution's publication/abstract record; no full manuscript was retrieved. Its Zenodo metadata and 101 small `.cir` files were inspected without downloading multi-gigabyte simulation archives. G-DiffPS removed its manuscript and some tables in the latest code-only release, so broken README links are not surfaced. No current public vaBench website or r53 model leaderboard was verified; the checked-in legacy dashboard represents a different release and is not exposed as current Results. Author-reported results, proprietary EDA prerequisites, partial adapters and the Masala-CHAI refreshed-dataset release gap remain in research files, not added as dashboard methodology prose. No external model training, paid model call, commercial EDA run or benchmark reproduction was performed.

## Baseline source and meaningful-activity review

All seven candidates pass the inclusive **2025-09-05** meaningful-activity cutoff. Current README/docs, author-owned source identity and substantive implementation or release changes were inspected before authoring entries. Six public, non-fork GitHub repositories were fetched as bare blob-filtered default branches; no external project code was executed. First-parent UTC committer dates produce the October 2025–September 2026 buckets. Numeric repository IDs and meaningful commit SHAs are stored for these six and preserved for the transferred project. The refresh helper verifies those optional stronger fields without changing the existing 27 records or advancing meaningful dates automatically.

| Added baseline | Canonical source / current default branch | Latest UTC public activity | Reviewed meaningful activity  |
| --- | --- | --- | ---  |
| ngspice | [Official SourceForge project](https://ngspice.sourceforge.io/) / upstream `master` | 2026-08-11 release 47 | [Release 47](https://ngspice.sourceforge.io/news.html) adds device-model, code-model noise and PSS functionality  |
| Xyce | [Xyce/Xyce](https://github.com/Xyce/Xyce) / `master` | 2026-08-10 | [24e13434](https://github.com/Xyce/Xyce/commit/24e13434180c40f32f16101f4e236819c9809f62): CMake/static-MKL and regression infrastructure; removes Autotools  |
| Xschem | [StefanSchippers/xschem](https://github.com/StefanSchippers/xschem) / `master` | 2026-09-05 | [ecbcb21e](https://github.com/StefanSchippers/xschem/commit/ecbcb21eb765b5069c9d72b976fcaab0db2a6a33), 2026-09-04: parent-property resolution fix  |
| OpenVAF-Reloaded | [OpenVAF/OpenVAF-Reloaded](https://github.com/OpenVAF/OpenVAF-Reloaded) / `mob` | 2026-08-25 | [fdf2522b](https://github.com/OpenVAF/OpenVAF-Reloaded/commit/fdf2522b70f42793f64b1c72f0195c96dea0cc19): LLVM 18 feature selection and release build changes  |
| KLayout | [KLayout/klayout](https://github.com/KLayout/klayout) / `master` | 2026-08-26 | [e71272c3](https://github.com/KLayout/klayout/commit/e71272c3b178105bd2a2f25af54673a7af7ed60d): reconnects PCell editor events  |
| Magic | [RTimothyEdwards/magic](https://github.com/RTimothyEdwards/magic) / `master` | 2026-09-01 | [f63e7dad](https://github.com/RTimothyEdwards/magic/commit/f63e7dad5ab60a443f5710c408cbf3c4b03bbb3c), 2026-09-01: fixes select-command options without the layout cursor  |
| ALIGN | [ALIGN-analoglayout/ALIGN-public](https://github.com/ALIGN-analoglayout/ALIGN-public) / `master` | 2026-07-05 | [e392ae47](https://github.com/ALIGN-analoglayout/ALIGN-public/commit/e392ae4789eb49193a4865244d8cc31dbe1744b7): substantive OTA testbench/model update  |

- ngspice uses official SourceForge distribution/release history. The `no-public-repo` record maps the sourced August 11 release into its event month, without inventing repository history.
- Xyce's README documents rerooting after release 7.9. Count only the captured current first-parent history; do not graft or add the archived history.
- Xschem's author documents a transition toward Codeberg while the official project site still lists the active author-owned GitHub development source. The requested GitHub repository remains the reviewed activity source for this snapshot. Codeberg is a secondary source, not an additional counted history; reassess hosting at the next refresh. The cosmetic September 5 tip is not the meaningful date.
- OpenVAF-Reloaded's actual default branch is `mob`, despite older `master` text. Its maintained OSDI 0.4 compiler feeds a simulator; it does not itself perform circuit simulation. The original OpenVAF repository and unmaintained OSDI 0.3 branch are not substituted.
- Magic's latest version-number commit remains the mechanical sort date, but the immediately preceding implementation fix supplies meaningful freshness.


## Public repository activity methodology

Snapshot date: **2026-09-05**, window **October 2025–September 2026**, with September partial. `capturedAt` records the UTC collection cutoff; `headSha` fixes each inspected default-branch history. All selected repositories were public and not GitHub forks when rechecked. Each is the entry's verified Code source; none is combined with upstream, website, result, or companion repositories.

The helper fetches repository metadata from public GitHub data using `gh`, reads the current default branch, and fetches that branch's Git history without checking out or executing project code. It walks **first-parent history**, counting one integration commit for a merge, and bins committer timestamps in UTC. This is a conservative default-branch integration-history count, not all commits on all reachable side branches. PR refs, stars, issues, fork counts and popularity are unused.

Git does not record a reliable historical push/landing time. Fast-forward merges, timestamp edits, imports, squashes and history rewrites can move apparent activity between months. The data represents a public-history snapshot, never total development effort; this explanation stays in maintenance documentation. The last date is the latest committer date in the captured first-parent history, even if older than the displayed window. It includes the year when different from the snapshot year. An empty recorded window is twelve unfilled cells, not an inactivity claim. Sourced point events fill their actual month without invented commit counts.

Repository-specific review found bulk publication in the short Analog Design Bench, CircuitRubric, NetlistBench and AnalogForge histories; this does not expose when earlier work occurred. vcli includes ten dependency-bot commits in September alongside other changes; the snapshot includes them and retains this in its data notes. The bridge also records automated traffic updates; they remain raw strip events, while its September 2 Maestro timeout/escaping fix establishes substantive freshness. Bot attribution and subjects are inspection aids, not a complete automated provenance classifier. New histories include one-shot source/data releases and generated benchmark material; these are publication patterns, not evidence of sustained effort. No public activity is interpreted as project quality.

The snapshot is authoritative for all twelve monthly counts, captured heads and reviewed substantive commit identities. Dates above use UTC; local August 20 for G-DiffPS becomes August 21, and local July 8 for gmoverid-skill becomes July 7. No paper publication date substitutes for repository activity.

## Canonical activity sources

| Project | Canonical repository / branch or point source | Latest public date | Meaningful date |
| --- | --- | --- | --- |
| ALIGN | [ALIGN-analoglayout/ALIGN-public](https://github.com/ALIGN-analoglayout/ALIGN-public) / `master` | 2026-07-05 | 2026-07-05 |
| AMS-IO-Agent | [Arcadia-1/AMS-IO-Agent](https://github.com/Arcadia-1/AMS-IO-Agent) / `main` | 2025-12-25 | 2025-12-25 |
| Analog Design Bench | [Arcadia-1/analog-design-bench](https://github.com/Arcadia-1/analog-design-bench) / `main` | 2026-08-12 | 2026-08-07 |
| AnalogCoder-Pro | [laiyao1/AnalogCoderPro](https://github.com/laiyao1/AnalogCoderPro) / `master` | 2026-03-14 | 2026-02-22 |
| AnalogForge Agent | [appleweiping/analog-forge-agent](https://github.com/appleweiping/analog-forge-agent) / `main` | 2026-08-11 | 2026-08-11 |
| AnalogGym | [CODA-Team/AnalogGym](https://github.com/CODA-Team/AnalogGym) / `main` | 2025-10-29 | 2025-10-29 |
| AnalogSAGE | [wznmickey/AnalogSAGE](https://github.com/wznmickey/AnalogSAGE) / `main` | 2026-05-23 | 2026-05-23 |
| AnalogToBi | [Seungmin0825/AnalogToBi](https://github.com/Seungmin0825/AnalogToBi) / `main` | 2026-05-07 | 2026-05-06 |
| ARCS | [tusharpathaknyu/ARCS](https://github.com/tusharpathaknyu/ARCS) / `main` | 2026-04-10 | 2026-03-27 |
| ASTRA | [IceLab-X/ASTRA](https://github.com/IceLab-X/ASTRA) / `main` | 2025-10-28 | 2025-10-28 |
| ATLAS | [paper](https://arxiv.org/pdf/2607.14165v1) | 2026-07-15 | 2026-07-15 |
| AutoSizer | [yuxi120407/AutoSizer](https://github.com/yuxi120407/AutoSizer) / `main` | 2026-05-26 | 2026-05-26 |
| vaBench | [Arcadia-1/behavioral-veriloga-eval](https://github.com/Arcadia-1/behavioral-veriloga-eval) / `main` | 2026-07-28 | 2026-07-28 |
| CircuitRubric | [levantlabs/circuitrubric-bench](https://github.com/levantlabs/circuitrubric-bench) / `main` | 2026-06-23 | 2026-06-23 |
| EEschematic | [eelab-dev/EEschematic](https://github.com/eelab-dev/EEschematic) / `main` | 2025-10-20 | 2025-10-19 |
| EVAS | [Arcadia-1/EVAS](https://github.com/Arcadia-1/EVAS) / `main` | 2026-07-28 | 2026-07-28 |
| EvoLDO-Bench | [jialinlu/ldo_benchmark_for_agent](https://github.com/jialinlu/ldo_benchmark_for_agent) / `main` | 2026-09-03 | 2026-09-03 |
| G-DiffPS | [ACADLab/G-DiffPS](https://github.com/ACADLab/G-DiffPS) / `main` | 2026-08-21 | 2026-08-21 |
| gmoverid-skill | [Arcadia-1/gmoverid-skill](https://github.com/Arcadia-1/gmoverid-skill) / `main` | 2026-07-07 | 2026-07-07 |
| KLayout | [KLayout/klayout](https://github.com/KLayout/klayout) / `master` | 2026-08-26 | 2026-08-26 |
| LOADBench | [FilipeAz/LOADBench-Scripts](https://github.com/FilipeAz/LOADBench-Scripts) / `main` | 2026-08-03 | 2026-08-03 |
| Magic | [RTimothyEdwards/magic](https://github.com/RTimothyEdwards/magic) / `master` | 2026-09-01 | 2026-09-01 |
| Masala-CHAI | [jitendra-bhandari/Masala-CHAI](https://github.com/jitendra-bhandari/Masala-CHAI) / `main` | 2026-08-09 | 2026-05-09 |
| NetlistBench | [WoshiMayou/NetlistBench](https://github.com/WoshiMayou/NetlistBench) / `main` | 2026-08-04 | 2026-08-04 |
| Ngspice + OpenVAF Enhancements | [javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements](https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements) / `main` | 2026-09-05 | 2026-09-05 |
| ngspice | [release](https://ngspice.sourceforge.io/news.html) | 2026-08-11 | 2026-08-11 |
| OpenVAF-Reloaded | [OpenVAF/OpenVAF-Reloaded](https://github.com/OpenVAF/OpenVAF-Reloaded) / `mob` | 2026-08-25 | 2026-08-25 |
| PANDA | [PKU-IDEA/PANDA](https://github.com/PKU-IDEA/PANDA) / `main` | 2026-06-18 | 2026-06-18 |
| Razavi-Bench | [Arcadia-1/razavi-bench](https://github.com/Arcadia-1/razavi-bench) / `main` | 2026-08-17 | 2026-08-17 |
| vcli | [deanyou/virtuoso-cli](https://github.com/deanyou/virtuoso-cli) / `main` | 2026-09-04 | 2026-09-04 |
| virtuoso-agent | [lixunqi12/virtuoso-agent](https://github.com/lixunqi12/virtuoso-agent) / `main` | 2026-07-03 | 2026-07-03 |
| virtuoso-bridge-lite | [Arcadia-1/virtuoso-bridge-lite](https://github.com/Arcadia-1/virtuoso-bridge-lite) / `main` | 2026-09-04 | 2026-09-02 |
| Xschem | [StefanSchippers/xschem](https://github.com/StefanSchippers/xschem) / `master` | 2026-09-05 | 2026-09-04 |
| Xyce | [Xyce/Xyce](https://github.com/Xyce/Xyce) / `master` | 2026-08-10 | 2026-08-10 |
| ZeroSim | [xz-group/ZeroSim](https://github.com/xz-group/ZeroSim) / `main` | 2026-04-24 | 2026-04-24 |

## Maintenance and manual refresh

1. Review primary sources before changing prose or scope. Keep stable filenames, reviewed Flow stages, and `core|supporting` only; omit unreviewed/future scope. Do not create Golden records.
2. Keep one source array with unique IDs/purposes. Cite local `#source-ID` references in research Markdown. Keep dashboard `description` focused on the actual use case and operations, with nuanced prerequisites and review evidence stored in the original metadata/body. A no-change review does not reorder the index or add a catalog update note; changes to the recorded latest public activity can reorder it.
3. For activity, manually review/choose one Code repository or a sourced no-public-repository entry. Run `npm run refresh:analog-activity` with Git and authenticated `gh`. It updates only the complete activity snapshot after all repositories succeed and validation passes; a failed request leaves the previous file intact. Temporary clones are removed. The helper is never part of check/build and is never shipped to the browser.
4. Review the snapshot diff and histories for changed ownership/default branches, automated or imported history. Manually verify a substantive first-parent commit, set `lastMeaningfulCommitAt` and record its hash in `notes`. The helper preserves that date; raw new commits never renew eligibility automatically. Validation rejects expired or missing evidence before replacing the snapshot. For additions/removals, curate the content and matching activity records together before invoking the refresh helper. Existing no-repository entries also need a fresh sourced public date. Do not treat the helper as a source/content review.
5. Run `npm run check`, `npm run test:smoke`, and `git diff --check`. Compare existing factual/export and Article content to the branch base. Inventory and activity expectations derive from authored files; only stable scope/provenance fixtures are named explicitly.

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
