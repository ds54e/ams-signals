---
name: "NetlistBench"
aliases: ["Netlist Bench","Netbench"]
roles: ["benchmark"]
summary: "Tests whether LLMs can recognize, edit, and compare existing circuit netlists, including subcircuit hierarchy. Deterministic graders check structured outputs and requested transformations against reference answers."
targets: "SPICE connectivity, device parameters, terminal roles, hierarchy, and structural equivalence"
access: "The v2 release supplies 2,342 cases across 24 task families, prompts, Python graders, runners, and sample model outputs. Structural scoring requires no simulator or PDK; new model runs require an endpoint."
notice: "Passing establishes the requested netlist operation, not analog performance or successful circuit design."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "NetlistBench paper v1"
    url: "https://arxiv.org/abs/2608.12197v1"
    purpose: "paper"
  - id: "code"
    title: "Public benchmark release"
    url: "https://github.com/WoshiMayou/NetlistBench"
    purpose: "code"
  - id: "release"
    title: "Reviewed release: artifacts, modality counts, and regeneration limits"
    url: "https://github.com/WoshiMayou/NetlistBench/blob/413c56f4fedd2c574d4be0ffcc66480504f8d364/README.md"
  - id: "manifest"
    title: "Canonical v2 manifest: included and disabled families"
    url: "https://github.com/WoshiMayou/NetlistBench/blob/413c56f4fedd2c574d4be0ffcc66480504f8d364/benchmark/Cases/netbench_v2/MANIFEST.json"
  - id: "grader"
    title: "Released canonical-IR comparison and edit grader"
    url: "https://github.com/WoshiMayou/NetlistBench/blob/413c56f4fedd2c574d4be0ffcc66480504f8d364/scripts/eval_ir_match.py"
---
### Tasks and outputs

The suite contains 1,542 manipulation cases in 16 families and 800 recognition cases in eight families. The latter includes 100 yes/no equivalence judgments stored in the edit directory; the other 700 require JSON answers. Recognition covers parameters, semantic and ordered terminals, node incidence, subcircuit ports, instance mappings, and terminal neighbors. [Grouping and output contracts](#source-manifest)

Edits cover connectivity, device addition/removal/replacement, parameters, propagated renaming, and compound operations. Hierarchy tasks include inlining, port swaps, and internal edits. Extraction and several interface-edit families are explicitly disabled. [Included families](#source-manifest)

### Evaluation

The edit grader compares canonical intermediate representations containing named devices, terminal bindings, parameters, directives, and subcircuits. Numeric normalization accepts equivalent literals; symmetric R/C/L terminals may reverse. Recognition uses structured reference answers, with a separate equivalence-label grader. These are bounded structural contracts, not electrical-equivalence proofs. [IR implementation](#source-grader) · [Scoring interfaces](#source-release)

CircuitRubric evaluates generated topology/netlists and relative sizing; NetlistBench starts from existing netlists and tests their interpretation or modification. Neither structural score establishes bias, stability, or specification closure.

### Released artifacts

The shipped suite is complete for local evaluation, with representative model outputs and verdicts available for inspection. Regenerating all cases requires upstream AnalogGenie and ALIGN corpora that are not redistributed. The example slice is not the full paper experiment. [Release boundaries](#source-release)
