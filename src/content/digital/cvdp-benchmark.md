---
name: "CVDP Benchmark"
aliases: ["CVDP", "Comprehensive Verilog Design Problems"]
description: "Benchmark and evaluation harness for LLMs and agents tackling RTL generation, repair, testbench and assertion tasks. Direct-model and repository-based agent workflows run open-source or licensed EDA checks, with separate comprehension scoring and task-specific tool requirements."
scope:
  design:
    ai: true
  verification:
    ai: true
access: "Public benchmark framework and dataset; Docker and model access are required for the documented workflows. Commercial rows require licensed EDA. The full public dataset omits reference solutions."
addedAt: "2026-10-01"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical CVDP Benchmark repository"
    url: "https://github.com/NVlabs/cvdp_benchmark"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/NVlabs/cvdp_benchmark/blob/8e894cf74414ab1eaea1e2b4e80a02f123df07b6/README.md"
  - id: "implementation"
    title: "Reviewed implementation"
    url: "https://github.com/NVlabs/cvdp_benchmark/blob/8e894cf74414ab1eaea1e2b4e80a02f123df07b6/run_benchmark.py"
  - id: "activity"
    title: "Update Claude Code agent workflow"
    url: "https://github.com/NVlabs/cvdp_benchmark/commit/657184d386b55a5253544d90e1ea1d48051db9ae"
  - id: "paper"
    title: "CVDP benchmark paper"
    url: "https://arxiv.org/abs/2506.14074"
    purpose: "paper"
  - id: "dataset"
    title: "Released CVDP dataset"
    url: "https://huggingface.co/datasets/nvidia/cvdp-benchmark-dataset"
---

### Benchmark and implementation

CVDP offers non-agentic prompt-based and agentic repository tasks. The reviewed runner selects these modes, invokes models and task harnesses, and produces reports. The v1.1.0 documentation adds a dedicated open-source simulation image and heavyweight repository-context agent workflows. [Reviewed README](#source-readme); [Runner](#source-implementation).

### Scope classification

AI Design identifies evaluated model RTL generation, completion and repair; AI Verification identifies evaluated testbench/assertion and debugging tasks, rather than claiming that every simulator or grader uses AI. Comprehension scoring separately includes model-based judging. The task contract and paper substantiate these roles. [Paper](#source-paper); [Reviewed README](#source-readme).

### Access and review boundary

The paper's problem total is not presented as the current public dataset count: the repository notes omitted tasks and withheld full reference solutions. Some rows need commercial tools and licenses. Model and EDA results were not reproduced for this catalog review. The June 2026 agent-workflow merge is meaningful implementation activity; later heavy-context README instructions are the captured head. [Dataset](#source-dataset); [Reviewed README](#source-readme); [Activity](#source-activity).
