# Analog AI implementation and review notes

Review date: 2026-09-05. Branch: `analog-ai-implementation`, created from the confirmed `analog-ai-foundation` branch.

## Structure and behavior

- `src/content/analog-ai/*.md`: thirteen English project entries, each with a stable filename, independent metadata, and authored technical details. Version-dependent evidence links use reviewed repository revisions where available.
- `src/lib/analog-ai/`: dedicated schema, deterministic ordering, search/URL functions, and browser controller. No imports from Golden data, Articles, or their viewer state.
- `src/pages/analog-ai/index.astro` and `src/styles/analog-ai.css`: one static project list, progressive search, one category selector, counts, clean permalinks, and independent native disclosures. The common shell adds only a normal navigation link; its header wraps on narrow screens.
- `src/data/analog-ai-updates.json`: three addition notes for NetlistBench, vcli, and ATLAS. Only explicit catalog additions or substantive changes belong here; at most three records are allowed.
- `tools/validate-analog-ai.mjs`, `tests/analog-ai/`, and `tests/smoke/analog-ai.spec.ts`: validation, deterministic behavior tests, and production-preview browser coverage. Existing check stages remain in place. No dependencies were added.

Search indexes only catalog-owned display text and aliases. NFKC, case folding, and whitespace-token AND matching apply before the single-role AND filter. Source URLs and metadata keys are not indexed. Matching a limitation does not imply support for that feature.

Search makes one history entry per edit session and replaces that entry on subsequent keystrokes. Blur, submission, category changes, and reset end the session. Back/forward restores URL state. A known project or existing namespaced descendant hash opens its owning project and scrolls to the actual target, preserving the complete hash and its scroll margin. Incompatible filters are cleared and the URL is synchronized; unknown descendants do not resolve by prefix alone. A new control action removes the old hash. No catalog state is written to storage.

Static HTML includes all details and sources with disclosures open. JavaScript closes them on initial load and enables the search controls; without JavaScript the full reference remains readable and native disclosures still work. Repeated Markdown heading IDs and local source links are namespaced by project slug.

Each collapsed entry shows `Reviewed YYYY-MM-DD`; catalog registration remains in details. Routine qualifications moved out of prominent notices where the summary, environment, or detail section already explains them. Notices remain for structural-only scores, incomplete releases, track boundaries, and planned/synthetic results. The existing page title remains accurate for the expanded selection and is unchanged.

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

## Maintaining an entry

1. Re-read current primary material and check narrowing evidence before editing public prose. Keep all public text English, including update notes.
2. Add or edit one Markdown file under `src/content/analog-ai/`. Keep its lowercase hyphenated filename stable; put former names in `aliases`.
3. Use only the four documented role IDs. Summarize purpose, distinction, access requirements, and material limitations before the disclosure.
4. Maintain one `sources` array with unique local IDs. Assign a quick-link purpose at most once per project. Put URLs there and cite them in prose with `[Source label](#source-id)`; a source whose ID is `code` is referenced as `#source-code`. Raw HTML and external URLs in the body are rejected.
5. Record actual catalog registration and source-review dates. Research can precede registration. A routine no-change review changes `reviewedAt` without creating an update note or altering order.
6. Run `npm run check` and `npm run test:smoke`. Browser setup is documented in the root README. Browser inventory, counts, dates, and category expectations come from catalog frontmatter; adding an entry should not require changing unrelated tests. A few named projects remain behavioral fixtures. AND matching is checked through result intersections and representative inclusions/exclusions; pure tests independently cover the matching and sorting rules.

## Verification record

All final checks passed on Node.js 24.20.0 with Astro 7.2.9 and Playwright 1.62.1 (Chromium).

| Check | Result |
| --- | --- |
| `npm run check` | Passed all original stages plus catalog validation and ten deterministic catalog tests. Validated 185 Events, 59 Companies, 28 People, thirteen catalog projects, and three update notes; no likely duplicate Events. Built 284 HTML pages and checked 2,702 internal anchors. |
| `npm run test:smoke` | 66 passed: all 43 existing smoke tests and 23 catalog tests. Only the three existing navigation expectations changed to account for the added link. |
| Browser acceptance | Search/role AND matching, aliases/NFKC, composition events, zero results, query history, project and descendant hash conflicts, permalinks, unknown/special URL inputs, independent disclosures, unique anchors, keyboard operation, no-JS content, visible review dates, and state isolation passed. Source/detail descendant anchors passed direct load and reload, target positioning, filter restoration, and history checks. |
| Test maintainability | The same 23 catalog browser tests passed with the original ten entries / empty updates and again with thirteen entries / three additions, without changing expectations between those runs. Inventory and role checks derive expectations from authored data. |
| Visual review | Inspected collapsed and expanded screenshots at 1440, 390, and 320 CSS pixels, plus the three new entries individually at 1440 and 390. Review dates are legible and restrained; no page-level horizontal overflow; long names wrap. |
| Catalog independence exercise | Temporarily added an eleventh project and a valid update note, built, then removed both and rebuilt. Original source files and export stayed byte-identical. A stale update reference was rejected by validation; empty update data hid the section again. Temporary content was removed. |
| Existing-content regression | All 281 original data/Article files stayed byte-identical. All 283 original HTML pages matched after removing the intentional Analog AI nav link and normalizing generated asset filenames and inter-tag whitespace. Existing viewer JavaScript stayed byte-identical. |
| Factual export | Byte-identical before/after. SHA-256: `67586997053b77e6215c53ce12188a5013d0bb6b1e0411370570c67a94bd1aeb`. |
| Source links | Initial review checked 36 distinct URLs: 35 HTTP 200, one IEEE HTTP 202. This pass checked all eleven added source URLs: eleven HTTP 200. Reachability does not establish reproducibility. |
| Diff hygiene | `git diff --check` passed. No merge or deployment performed. |

Self-review corrected malformed-URL handling and removed an unnecessary date-order restriction: a source review may precede catalog registration. Two initial browser failures were test-driver issues: native anchor scrolling had not settled before a no-JS click, and an extra Enter opened the native select popup. Both operations passed after correcting the test sequence. Chromium initially needed missing system libraries in this environment; no project dependency was added for that repair.

The focused review reproduced the descendant-source-anchor bug with a failing production-preview browser test before changing the resolver. The fix recognizes only actual descendants, opens their owning details, and scrolls the named element after expansion; the regression now passes. Full review against `analog-ai-foundation` includes the initial implementation, language correction, source content, and these fixes. No change to existing factual validation, data, Article bodies, viewer state, or export logic was needed.

The browser suite covers Chromium; Firefox, WebKit, and a physical OS IME session were not exercised. No live external-source polling or experiment reproduction is implemented. The secondary candidates above remain a future content review, and a normal re-review must revisit version-sensitive claims. Test logs, screenshots, and temporary source-check material stay outside tracked repository content.
