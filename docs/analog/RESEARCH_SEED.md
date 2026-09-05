# Analog catalog research seed

Date: 2026-09-05
Purpose: starting points for the first catalog population. This file is not the catalog and is not evidence by itself.

## Rules for using this file

- Re-open the primary sources before publishing any project entry.
- Treat names, URLs, task counts, supported circuits, scores, and capability claims as potentially stale until re-checked.
- Do not copy prose from earlier ChatGPT conversations into catalog content.
- Prefer the project's official repository/site and the authors' paper or official benchmark page.
- Secondary posts may help discovery but should not be the sole basis for a technical capability claim when a primary source exists.
- If a candidate cannot be verified well enough, omit it from the first release rather than filling gaps with inference.
- Do not create Events, Companies, or People as part of this research pass.

## Core starting set

These are the first projects to inspect because they cover materially different parts of the space.

### Analog Design Bench

Primary starting points:

- https://analog-design-bench.tokenzhang.com/
- https://github.com/Arcadia-1/analog-design-bench

Questions to answer:

- What constitutes one task and one successful run?
- Which tools are agents allowed to use?
- Which released tasks are actually public now?
- How are long-horizon failures and partial completion treated?

### Razavi-Bench

Primary starting point:

- https://github.com/Arcadia-1/razavi-bench

Questions to answer:

- Separate direct multimodal QA, agentic QA, and simulator-assisted modes.
- What is scored: final answer, tool trace, or both?
- Which netlists/simulator assets are evaluation aids versus official task inputs?

### CircuitRubric

Primary starting point:

- https://github.com/levantlabs/circuitrubric-bench

Questions to answer:

- Exactly what the graph-isomorphism grader accepts.
- What relative sizing information is graded.
- What is explicitly out of scope: bias, gain, stability, absolute performance, etc.
- How `short`, `verbose`, and `spec` prompts change what the benchmark measures.

### EvoLDO-Bench

Primary starting point:

- https://github.com/jialinlu/ldo_benchmark_for_agent

Questions to answer:

- Keep the no-tool reasoning benchmark separate from SKY130/ngspice tool-agent tracks.
- Identify what is public, what is a trusted verifier, and what is hidden/held-out.
- Do not summarize the whole project as always using SPICE.

### AnalogCoder-Pro

Primary starting point:

- https://github.com/laiyao1/AnalogCoderPro

Questions to answer:

- Which benchmark tasks and testbenches are public.
- Which stages cover topology generation, diagnosis/repair, and sizing optimization.
- Which optimization pieces are fully released versus still listed as work in progress.

### AnalogGym

Primary starting points:

- https://github.com/CODA-Team/AnalogGym
- https://coda-team.github.io/AnalogGym/

Questions to answer:

- Which of the 30 topologies have complete open ngspice/Sky130 execution support.
- Do not equate inclusion of PLLs in the suite with identical open execution support for PLLs.
- Capture the role of testbenches, design-variable files, and performance extraction.

### AMSbench

Primary starting point:

- https://amsbench.github.io/

Questions to answer:

- Separate perception, analysis, and design tasks.
- Identify the actual evaluation format and whether tooling/simulation is part of official evaluation.
- Determine what source artifacts and code are currently public.

### virtuoso-agent

Primary starting point:

- https://github.com/lixunqi12/virtuoso-agent

Questions to answer:

- Separate Maestro/Spectre and HSpice backends.
- Identify what the repository itself supplies versus what the user must supply: EDA installation, PDK, DUT, testbench, spec, remote host.
- Capture the role of the spec evaluator and closed-loop parameter updates without implying general autonomous circuit synthesis.

### virtuoso-bridge-lite / VirtuosoBridgeLite

Primary starting point:

- https://github.com/Arcadia-1/virtuoso-bridge-lite

Questions to answer:

- Treat it as agent/EDA infrastructure, not a design benchmark.
- What parts of schematic, layout, Maestro, Spectre, PSF, and remote/session control are currently exposed?
- Which capabilities are deterministic bridge primitives versus higher-level optimization workflows?

### AnalogForge Agent

Primary starting point:

- https://github.com/appleweiping/analog-forge-agent

Questions to answer:

- Keep preregistered targets separate from achieved results.
- Distinguish the default analytic fixture from native transistor-level simulation.
- Identify which PDK mappings, optimization methods, PVT/MC stages, and optional layout stages are currently runnable, pinned, or planned.

## Secondary candidates to verify

Do not include these just because they appeared in prior research. Locate current primary material and compare with the core set first.

- NetlistBench — netlist editing/equivalence reliability; determine whether it belongs as analog-specific or supporting infrastructure.
- AnalogXpert — topology synthesis; determine whether current artifacts and evaluation remain distinct enough from CircuitRubric/AnalogCoder.
- AMS-IO-Bench — narrow AMS I/O design/layout/silicon work; describe the actual task boundary if included.
- OCB / Open Circuit Benchmark — older topology/performance dataset; useful as background/environment rather than necessarily an LLM project.
- OSIRIS — dataset-generation environment; verify current public artifacts.
- ATLAS — candidate SAR ADC agentic design work; locate authors' current paper/code and verify release status.
- ORACLE — candidate optimization/RL+LLM work; locate primary paper/code and verify what the LLM actually controls.
- vcli / virtuoso-cli — candidate Virtuoso CLI/agent infrastructure; verify relationship to virtuoso-bridge-lite and whether it is a separate maintained project.
- eda-agents / analog design skill collections — verify whether there is a concrete executable framework, benchmark, or only agent instructions.

## Comparison questions for every project

Use these questions to ground catalog prose. The six-column reviewed-scope Landscape is defined in `IMPLEMENTATION_SPEC.md`; these historical research questions do not define additional classification fields or scores.

1. What problem is the project trying to solve?
2. What is the input to the model/agent?
3. What may the model/agent change or generate?
4. What external tools, simulators, PDKs, or EDA environments are involved?
5. What decides success?
6. What is public today: task set, code, grader, netlists, testbenches, result traces, model outputs?
7. What must the user provide separately?
8. What important thing is explicitly out of scope?
9. Is a reported result a target, synthetic/demo result, author-reported measured result, or independently reproduced result?
10. What makes this project meaningfully different from the other catalog entries?

## Initial writing standard

A catalog summary should be useful even to a reader who never opens the details.

Public catalog prose and UI are English only, as defined in `README.md` and `IMPLEMENTATION_SPEC.md`. The catalog is a technical reference surface, not an editorial Article.

Prefer concrete distinctions such as:

- `Grades generated SPICE netlists by connectivity and relative device sizing. Simulated circuit performance is outside the evaluation scope.`
- `An LLM proposes parameter changes for an existing circuit and receives specification checks from Maestro/Spectre results. Requires the user's Virtuoso environment and circuit assets.`

Avoid generic project-marketing language such as `revolutionary`, `end-to-end` without explaining what the endpoints actually are, or `silicon-ready` unless the cited evidence supports that exact claim.

## Stop condition for the first population

The first catalog does not need to be exhaustive.

Stop once there is a technically varied, well-sourced starting set whose entries are individually understandable and whose project boundaries are not misleading. A smaller verified catalog is preferable to a larger list built from unverified summaries.
