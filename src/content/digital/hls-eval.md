---
name: "HLS-Eval"
aliases: []
description: "Benchmark framework for LLM generation and editing of C++ HLS designs, with Vitis HLS simulation, synthesis and co-simulation checks. Optional agents optimize parameterized dataflow implementations and FIFO settings using resource reports and LightningSim latency, retaining tool evidence and trajectories; users provide the selected EDA and model environment."
scope:
  design:
    ai: true
  synthesis:
    ai: true
  verification:
    ai: false
access: "Public source; no top-level license found in the reviewed tree. Do not label the framework permissively licensed from its dependencies. Python 3.12+, Docker, selected Vitis/Vivado installations and model-provider access are separate requirements; the dataflow path additionally needs the compatible LightningSim/FIFOAdvisor/Pixi environment. Imported benchmark material can have separate terms."
addedAt: "2026-10-11"
reviewedAt: "2026-10-11"
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
---

## Implementation and Scope

Model paths generate or edit C++ HLS designs. The optional iterative parameterized/dataflow agent chooses implementation parameters and pragmas from measured synthesis/resource and latency feedback. Fixed C simulation and co-simulation checks retain the reference testbench. The reviewed implementation is described in the [README](#source-readme) and [Generation/edit tasks](#source-generation-edit-tasks), [Dataflow agent](#source-dataflow-agent), [Tool/environment contract](#source-tool-environment-contract).

The dataflow path implements an actual optimization loop, not just generation followed by a synthesis score. Resource metrics come from Vitis HLS synthesis; the harness scores latency using LightningSim top-module cycles and feeds per-point failures and logs to the next model iteration.

## Evidence and operating boundaries

AI Synthesis applies to the implemented feedback-driven optimization agent, not every benchmark mode. Conventional grading does not become AI Verification. LightningSim latency is not a final placed-and-routed chip timing result. The testbench-evaluation placeholder is empty and is not evidence of an assertion/testbench-generation feature. A measured frontier is not a globally optimal frontier.

Public source; no top-level license found in the reviewed tree. Do not label the framework permissively licensed from its dependencies. Python 3.12+, Docker, selected Vitis/Vivado installations and model-provider access are separate requirements; the dataflow path additionally needs the compatible LightningSim/FIFOAdvisor/Pixi environment. Imported benchmark material can have separate terms. See the [README](#source-readme) for setup and the linked source materials for their own terms.

## Reviewed public activity

The meaningful checkpoint is af9821608d9ee46a26edd8193b522628b731ac39 (2026-09-21 UTC), verified on the captured default branch's first-parent chain. The [implementation update](#source-implementation-checkpoint) supports the meaningful date; the latest head is separately retained for activity ordering.
