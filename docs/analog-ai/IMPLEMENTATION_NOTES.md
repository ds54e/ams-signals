# Analog AI implementation and review notes

Current presentation refinement: 2026-09-05, based on `main` commit `9a99184`. The original landscape/source review below was completed on `analog-ai-landscape-redesign` from `4fa73e4650d7512d236004297aeb8be9a5cf4296`.

## Current structure and behavior

- `src/content/analog-ai/*.md`: thirteen independent English entries, byte-unchanged in this pass. The existing bounded `description` supplies each row's one use-case/capability paragraph. The shorter summary, complete source arrays and research remain stored but are not repeated in the UI. No project claims, classifications, activity counts, repositories or review dates were re-researched or changed.
- `src/pages/analog-ai/index.astro` and `src/styles/analog-ai.css`: the semantic six-column workflow matrix appears first, immediately followed by its compact legend. Project/Keywords/Activity/Links headers begin the index directly. No visible Landscape/Projects headings or shortcut. Rows use approximately 2.2/1.05/1.2/0.55 proportions: name and description, keywords, existing activity, then passive roles and primary-purpose links. Mobile stacks those four areas; only the matrix scrolls horizontally and its project column stays sticky.
- `src/lib/analog-ai/catalog.ts`: unchanged immutable sort uses GitHub `lastCommitAt` or no-repository `lastPublicUpdateAt`, descending. Ties use NFKC-normalized lower-case name then slug; missing dates sort last. The obsolete catalog `browser.ts` is removed: native links/history now reach always-visible content without client code.
- Search, filters, q/type state, IME handling, resets and custom history are removed. Old query strings have no effect. No browser storage, runtime fetch, database, or dependency was added.
- There are no disclosures, separate description panels or Primary sources bibliography in the DOM. Website/Paper/Code/Results links stay directly visible, with original source IDs. Old Markdown heading, bibliography and non-primary source IDs survive as empty aliases beside the project description. All descriptions and native anchors work without JavaScript, including direct navigation and reload.
- `src/data/analog-ai-activity.json`: volatile repository activity is separate from durable project research and the three bounded catalog addition notes. The page validates and renders the checked-in snapshot at build time.
- Schema, unit tests and browser expectations use authored project IDs. Golden content, Article bodies, viewer code/state and factual export are independent and untouched.

## Landscape classification review

Re-opened all twelve primary repositories, their current default branches/READMEs and targeted implementation or task files, plus the AMSbench/ATLAS papers and official project sites. All twelve repository heads still match the revisions cited in the prior review; the activity snapshot pins those heads. ATLAS paper v1 remains the identified primary release; no official public ATLAS repository was verified by checking paper links and a targeted author/title search.

Marks express reviewed scope, not scores or reproduced success. Core means a central reviewed task/interface; supporting includes a constrained task/track, auxiliary primitive, or incompletely released research path. A blank is not evidence of inability. Simulator use alone does not establish EDA session integration. Generation does not automatically imply an independently evaluated reasoning deliverable. PVT/Monte Carlo evaluation is not layout or silicon work.

| Project | Deliberate classification and ambiguity resolution |
| --- | --- |
| AMSbench | Reasoning and generation core; simulation supporting **on the evaluator side**, not permission for the model to invoke a simulator. Future sizing/layout blank. Rechecked paper evaluation/future work and `CKT_design.py`. |
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

Repository-specific review found bulk publication in the short Analog Design Bench, CircuitRubric, NetlistBench and AnalogForge histories; this does not expose when earlier work occurred. vcli includes ten dependency-bot commits in September alongside other changes; the snapshot includes them and retains this in its data notes. No selected month was classified as active solely by detected bot authors. Bot attribution and subjects are only inspection aids, not a complete automated provenance classifier. No public activity is interpreted as project quality.

| Project ID | Primary repository / default branch | Monthly counts (Oct 2025 → Sep 2026) | Latest UTC commit |
| --- | --- | --- | --- |
| amsbench | [Why0912/AMSBench](https://github.com/Why0912/AMSBench) / `main` | 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 | 2025-06-18 |
| analog-design-bench | [Arcadia-1/analog-design-bench](https://github.com/Arcadia-1/analog-design-bench) / `main` | 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0 | 2026-08-12 |
| analogcoder-pro | [laiyao1/AnalogCoderPro](https://github.com/laiyao1/AnalogCoderPro) / `master` | 0, 0, 0, 0, 4, 1, 0, 0, 0, 0, 0, 0 | 2026-03-14 |
| analogforge-agent | [appleweiping/analog-forge-agent](https://github.com/appleweiping/analog-forge-agent) / `main` | 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0 | 2026-08-11 |
| analoggym | [CODA-Team/AnalogGym](https://github.com/CODA-Team/AnalogGym) / `main` | 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 | 2025-10-29 |
| atlas | No verified public repository | No activity buckets | Paper 2026-07-15 |
| circuitrubric | [levantlabs/circuitrubric-bench](https://github.com/levantlabs/circuitrubric-bench) / `main` | 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0 | 2026-06-23 |
| evo-ldo-bench | [jialinlu/ldo_benchmark_for_agent](https://github.com/jialinlu/ldo_benchmark_for_agent) / `main` | 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 4 | 2026-09-03 |
| netlistbench | [WoshiMayou/NetlistBench](https://github.com/WoshiMayou/NetlistBench) / `main` | 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0 | 2026-08-04 |
| razavi-bench | [Arcadia-1/razavi-bench](https://github.com/Arcadia-1/razavi-bench) / `main` | 0, 0, 0, 0, 0, 0, 0, 0, 51, 39, 45, 0 | 2026-08-17 |
| vcli | [deanyou/virtuoso-cli](https://github.com/deanyou/virtuoso-cli) / `main` | 0, 0, 0, 0, 0, 0, 62, 0, 0, 22, 74, 134 | 2026-09-04 |
| virtuoso-agent | [lixunqi12/virtuoso-agent](https://github.com/lixunqi12/virtuoso-agent) / `main` | 0, 0, 0, 0, 0, 0, 12, 11, 10, 1, 0, 0 | 2026-07-03 |
| virtuoso-bridge-lite | [Arcadia-1/virtuoso-bridge-lite](https://github.com/Arcadia-1/virtuoso-bridge-lite) / `main` | 0, 0, 0, 0, 0, 0, 459, 71, 12, 36, 23, 4 | 2026-09-04 |

The snapshot is authoritative for counts; this table records the redesign review. Future refreshes should update this review table or label it historical.

## Maintenance and manual refresh

1. Review primary sources before changing prose or scope. Keep stable filenames, four passive roles, short keywords, and `core|supporting` only; omit unreviewed/future scope. Do not create Golden records.
2. Keep one source array with unique IDs/purposes. Cite local `#source-ID` references in research Markdown. Keep dashboard `description` focused on the actual use case and operations, with nuanced prerequisites and review evidence stored in the original metadata/body. A no-change review does not reorder the index or add a catalog update note; changes to the recorded latest public activity can reorder it.
3. For activity, manually review/choose one Code repository or a sourced no-public-repository entry. Run `npm run refresh:analog-ai-activity` with Git and authenticated `gh`. It updates only the complete activity snapshot after all repositories succeed and validation passes; a failed request leaves the previous file intact. Temporary clones are removed. The helper is never part of check/build and is never shipped to the browser.
4. Review the snapshot diff and captured histories for new default branches, bot-only months, bulk/imported history or changed ownership. The helper deliberately retains research notes and no-repository decisions; it cannot re-review them. Update those notes and independently revisit paper-only projects before committing. Do not treat running the helper as a source/content re-review.
5. Run `npm run check`, `npm run test:smoke`, and `git diff --check`. Compare existing factual/export and Article content to the branch base. Inventory and activity expectations derive from authored files; only stable interaction fixtures are named explicitly.

## Initial project selection

The original ten candidates were retained and three further projects added after primary-source and artifact review. They cover different task contracts rather than a ranking of general design capability. The entries themselves contain the supporting source links.

| Project | Reason for inclusion and important qualification |
| --- | --- |
| [AMSbench](../../src/content/analog-ai/amsbench.md) | Perception, analysis, and design evaluation; public scripts need additional inputs. The paper's pass@k definition is a fraction of generated answers passing simulation. |
| [Analog Design Bench](../../src/content/analog-ai/analog-design-bench.md) | Agents editing circuits against electrical specifications. Website V2 lists 50 tasks; the reviewed public tree has 16 task directories. Task partial credit and the website aggregate are different measures. |
| [AnalogCoder-Pro](../../src/content/analog-ai/analogcoder-pro.md) | Generation, waveform diagnosis/repair, and sizing research with public tasks and benches. BO updates and some ablation prompts remain unfinished in the reviewed checklist. Earlier AnalogCoder results are not reused as Pro results. |
| [AnalogForge Agent](../../src/content/analog-ai/analogforge-agent.md) | Experimental workbench exposing the difference between a runnable fixture and a native evaluation path. Default runs are analytic, dashboard points synthetic, PDK mappings unpinned, and thresholds preregistered targets. |
| [AnalogGym](../../src/content/analog-ai/analoggym.md) | Optimization benchmarks and an environment for methods beyond LLMs. The explicit open ngspice/Sky130 claim concerns amplifiers and LDOs; it is not generalized to every topology or PLL. |
| [ATLAS](../../src/content/analog-ai/atlas.md) | Paper-centric SAR ADC generation using templates, expert intervention, and simulation. No verified public ATLAS code or layout claim. |
| [CircuitRubric](../../src/content/analog-ai/circuitrubric.md) | Structural netlist and relative-sizing evaluation without SPICE. FULL and the relaxed functional aggregate do not establish circuit performance. |
| [EvoLDO-Bench](../../src/content/analog-ai/evo-ldo-bench.md) | Separate tool-free reasoning and EDA task tracks. Developer reference replay is not an LLM result; official workspaces must exclude trusted evaluator artifacts. |
| [NetlistBench](../../src/content/analog-ai/netlistbench.md) | Existing-netlist recognition, editing, and hierarchy. Released v2 manifest and physical case files agree on 2,342 cases / 24 families. The 100 equivalence judgments count under recognition despite their edit-directory location. |
| [Razavi-Bench](../../src/content/analog-ai/razavi-bench.md) | Circuit reasoning with direct, agentic, and experimental simulator-assisted modes. Final answers are scored; reference-assisted netlists are not official model inputs. |
| [vcli](../../src/content/analog-ai/vcli.md) | A separate Rust rewrite extending the bridge approach with multiple sessions, dynamic ports, JSON CLI behavior, and concurrent local broadcast. EDA interfaces do not establish analog-design success. |
| [virtuoso-agent](../../src/content/analog-ai/virtuoso-agent.md) | Existing-circuit parameter optimization through Maestro/Spectre or HSpice. Licenses, PDK, DUT, bench, specification, host, and model remain user prerequisites. |
| [virtuoso-bridge-lite](../../src/content/analog-ai/virtuoso-bridge-lite.md) | EDA bridge primitives for schematic, layout, and simulation work. Exposing an API is separate from demonstrating a successful optimization. |

No paid model runs, commercial EDA execution, large simulations, or independent benchmark reproduction were performed. Code inspection supports implementation descriptions, not claims of successful operation in arbitrary user environments. AnalogCoder-Pro's publisher URL returned HTTP 202 to the automated client; its paper-specific numerical claims were not used. Descriptions rely on accessible author-released material.

## Candidates left for a later review

These secondary leads remain outside the bounded initial population. Except for the focused eda-agents review below, they received primary-source screening rather than a full artifact and execution-contract review. Omission does not imply that no public code or useful results exist.

| Candidate and primary starting point | Next check before inclusion |
| --- | --- |
| [AnalogXpert](https://arxiv.org/abs/2412.19824) | Verify current official implementation and the block-selection/connection task contract. |
| [AMS-IO-Bench / AMS-IO-Agent](https://arxiv.org/html/2512.21613v1) | Inspect linked code and EDA requirements. The authors' I/O-ring silicon report has a narrow task scope. |
| [OCB / CktGNN](https://github.com/zehao-dong/CktGNN) | Review dataset and simulation setup before adding another learning/optimization environment. |
| [OSIRIS](https://huggingface.co/datasets/hardware-fab/osiris) | Public data and code archives are available; inspect their layout-generation and reproduction contract without treating archive presence as reproduction. |
| [ORACLE](https://arxiv.org/abs/2608.04999) | Inspect implementation and the LLM's action-filtering role within optimization. |
| [eda-agents](https://github.com/Mauricio-xx/eda-agents) | Concrete implementation and narrow native runs were verified. Withheld pending a clearer release-level mapping from advertised analog agent workflows to live execution contracts and results; details below. |

### Focused eda-agents decision

Reviewed revision `9e5dcb453fd5313d43aa2e6239d1ef108ab834d0`. The code has typed task inputs, grading, pre-simulation checks, and simulator adapters. Its [generic analog_roles adapter](https://github.com/Mauricio-xx/eda-agents/blob/9e5dcb453fd5313d43aa2e6239d1ef108ab834d0/src/eda_agents/bench/adapters.py) uses DryRunExecutor; the dry-run adapter supplies synthetic metrics and marks simulation successful without running a simulator. A [separate Miller-OTA artifact](https://github.com/Mauricio-xx/eda-agents/blob/9e5dcb453fd5313d43aa2e6239d1ef108ab834d0/bench/results/gap_closure_llm_proof/spec_llm_miller_ota_ihp.json) records an actual LLM+ngspice-OSDI path. It would be incorrect to describe the entire release as mocks or instructions only.

The [16-PASS summary](https://github.com/Mauricio-xx/eda-agents/blob/9e5dcb453fd5313d43aa2e6239d1ef108ab834d0/bench/results/gap_closure_final/summary.json) combines checks, dry runs, mock digital metrics, and native tool runs. The [runner](https://github.com/Mauricio-xx/eda-agents/blob/9e5dcb453fd5313d43aa2e6239d1ef108ab834d0/src/eda_agents/bench/runner.py) counts missing-backend FAIL_INFRA results as skipped and excludes them from its pass-rate denominator. These modes can be traced in code, but the aggregate and generic agent entry point are not a clear demonstration of a general live analog-design workflow. Keeping this candidate out is a bounded catalog-selection decision, not a claim that its implementation is absent. A future entry should name specific live paths and prerequisites, with dry-run and missing-backend outcomes separated.

## Compact-row refinement verification

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
