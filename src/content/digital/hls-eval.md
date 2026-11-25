---
name: "HLS-Eval"
aliases: []
description: "Benchmark framework for LLM generation and optimization of C++ HLS and XLS DSLX designs. Vitis and LightningSim support C++ evaluation and dataflow optimization; a separate GEPA-driven DSLX evaluator uses protected original tests, code generation and estimated delay, with optional IR equivalence checks."
scope:
  design:
    ai: true
  synthesis:
    ai: true
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-credited implementation rejects empty generated C++ and timed-out compile, execution and synthesis results, with executable regression updates. The canonical project retains these checks."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Public source with a GNU AGPL v3 top-level license. Python 3.12+; the C++ paths require the selected Vitis/Vivado and container environments, with additional LightningSim/FIFOAdvisor/Pixi dependencies for dataflow. The DSLX path requires built XLS tools; GEPA search additionally requires model access. Imported materials may carry separate terms."
addedAt: "2026-10-11"
reviewedAt: "2026-11-25"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/sharc-lab/hls-eval"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/sharc-lab/hls-eval/blob/e373bc0a005f0a6030f77f27b3f0d71b16a35a0b/README.md"
  - id: "generation-edit-tasks"
    title: "Generation/edit tasks"
    url: "https://github.com/sharc-lab/hls-eval/blob/e373bc0a005f0a6030f77f27b3f0d71b16a35a0b/hls_eval/eval.py"
  - id: "dataflow-agent"
    title: "Dataflow agent"
    url: "https://github.com/sharc-lab/hls-eval/blob/e373bc0a005f0a6030f77f27b3f0d71b16a35a0b/hls_eval/eval_agent_pi/eval_agent_pi_paramaterized_dataflow.py"
  - id: "tool-environment-contract"
    title: "Tool/environment contract"
    url: "https://github.com/sharc-lab/hls-eval/blob/e373bc0a005f0a6030f77f27b3f0d71b16a35a0b/hls_eval/eval_agent_pi/PARAMETERIZATION.md"
  - id: "real-tool-sanity-checks"
    title: "Real-tool sanity checks"
    url: "https://github.com/sharc-lab/hls-eval/blob/e373bc0a005f0a6030f77f27b3f0d71b16a35a0b/tests/test_dataflow_tools_sanity.py"
  - id: "implementation-checkpoint"
    title: "Implementation checkpoint"
    url: "https://github.com/sharc-lab/hls-eval/commit/af9821608d9ee46a26edd8193b522628b731ac39"
  - id: "development-implementation-20261018"
    title: "AI-credited executable implementation"
    url: "https://github.com/sharc-lab/hls-eval/commit/238e8adea004f94d5aab863645a4baa998637d2c"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/sharc-lab/hls-eval/blob/238e8adea004f94d5aab863645a4baa998637d2c/hls_eval/eval_decomp/eval_decomp.py"
  - id: license-20261019
    title: "Top-level GNU Affero GPL version 3 license"
    url: "https://github.com/sharc-lab/hls-eval/blob/e31f731db6cf3cac2e1072ff13d6b889677b710d/LICENSE"
  - id: xls-gepa-integration
    title: "November 14 DSLX GEPA evaluator integration"
    url: "https://github.com/sharc-lab/hls-eval/commit/e31f731db6cf3cac2e1072ff13d6b889677b710d"
  - id: xls-gepa-evaluator
    title: "Retained protected-testbench evaluation and optional equivalence logic"
    url: "https://github.com/sharc-lab/hls-eval/blob/e31f731db6cf3cac2e1072ff13d6b889677b710d/hls_eval/eval_xls_gepa.py"
  - id: xls-gepa-contract
    title: "DSLX scoring, dependencies and correctness limits"
    url: "https://github.com/sharc-lab/hls-eval/blob/e31f731db6cf3cac2e1072ff13d6b889677b710d/hls_eval_experiments/xls_gepa_idct/README.md"
  - id: xls-gepa-tests
    title: "Retained evaluator regression tests"
    url: "https://github.com/sharc-lab/hls-eval/blob/e31f731db6cf3cac2e1072ff13d6b889677b710d/tests/test_eval_xls_gepa.py"
---

## Implementation and Scope

Model paths generate or edit C++ HLS designs. The optional iterative parameterized/dataflow agent chooses implementation parameters and pragmas from measured synthesis/resource and latency feedback. Fixed C simulation and co-simulation checks retain the reference testbench. The reviewed implementation is described in the [README](#source-readme) and [Generation/edit tasks](#source-generation-edit-tasks), [Dataflow agent](#source-dataflow-agent), [Tool/environment contract](#source-tool-environment-contract).

The dataflow path implements an actual optimization loop, not just generation followed by a synthesis score. Resource metrics come from Vitis HLS synthesis; the harness scores latency using LightningSim top-module cycles and feeds per-point failures and logs to the next model iteration.

## Evidence and operating boundaries

AI Synthesis applies to the implemented feedback-driven optimization agent, not every benchmark mode. Conventional grading does not become AI Verification. LightningSim latency is not a final placed-and-routed chip timing result. The testbench-evaluation entry point is empty and is not evidence of an assertion/testbench-generation feature. A measured frontier is not a globally optimal frontier.

The C++ paths require Python 3.12+, the selected Vitis/Vivado environment and, for dataflow, compatible LightningSim/FIFOAdvisor/Pixi. Imported benchmark material may carry separate terms. The current top-level license and separate DSLX dependencies are described below.

## Reviewed public activity

The earlier meaningful checkpoint was af9821608d9ee46a26edd8193b522628b731ac39 (2026-09-21 UTC), verified on the captured default branch's first-parent chain. The [implementation update](#source-implementation-checkpoint) supports the meaningful date; the latest head is separately retained for activity ordering.

### Development provenance

A Claude-credited implementation rejects empty generated C++ and timed-out compile, execution and synthesis results, with executable regression updates. The canonical project retains these checks. This supports AI-assisted development. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).

### Reviewed implementation and retention, November 25, 2026

October 19 adds a top-level GNU AGPL v3 license; earlier absence of a license no longer describes the current source. November 14 adds a separate DSLX source-editing evaluator with GEPA search, using the pinned IDCT example and original DSLX tests. Candidate-supplied tests are removed; passing the original bench, retaining the interface and completing code generation are required for scoring. The score uses an abstract XLS unit-delay estimate, not placed-and-routed timing. Optional IR equivalence rejects counterexamples; timeout or tool failure is inconclusive rather than proof. The evaluator includes tests for these outcomes, and the new path leaves the Vitis evaluator separate. Existing AI Design/Synthesis roles cover the released model-driven optimization paths; deterministic test and formal graders remain conventional Verification. [License](#source-license-20261019) · [Integration](#source-xls-gepa-integration) · [Evaluator](#source-xls-gepa-evaluator) · [Contract](#source-xls-gepa-contract) · [Tests](#source-xls-gepa-tests).

The selected meaningful checkpoint within the saved capture is 2026-11-14 UTC. Source inspection only; no EDA or model experiment was independently reproduced.
