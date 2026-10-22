---
name: "CodeV-SVA"
aliases: []
description: "Research implementation for language-model generation of SystemVerilog assertions, including RTL-grounded data synthesis and generation/evaluation clients. Its public workflow connects model inference to a JasperGold-backed service; licensed formal tools, model access and the selected experimental branch remain execution requirements."
scope:
  verification:
    ai: true
access: "Public Python implementation; selected model/API access and Cadence JasperGold are required by the evaluation workflow."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/wyt2000/CodeV-SVA"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/wyt2000/CodeV-SVA/blob/80a9585b761d3a08f2f2b7ca7150e1a48f21aa28/README.md"
  - id: "implementation-1"
    title: "Reviewed source: SVAClient/src/SVAClient/Agent_Design2SVA.py"
    url: "https://github.com/wyt2000/CodeV-SVA/blob/80a9585b761d3a08f2f2b7ca7150e1a48f21aa28/SVAClient/src/SVAClient/Agent_Design2SVA.py"
  - id: "activity"
    title: "Reviewed meaningful change: update code."
    url: "https://github.com/wyt2000/CodeV-SVA/commit/99acfc521b583a5569573b4c477de5b7454631ed"
---

### Implemented operations and boundaries

The actual default branch is wave2sva. Generation clients and a JasperGold-backed evaluation service are public implementations, but model/API access and licensed tools remain required. AI Verification describes assertion generation, not the conventional grader or a claim of completely open execution.

[Project overview](#source-readme); [Source 1](#source-implementation-1).

### Scope and activity review

The exposed operations support Verification. The AI prefix describes the optional implemented model-hosted workflow or the explicitly evaluated AI task. It does not classify the conventional checker or numerical engine as AI.

The meaningful checkpoint is 2026-10-14T08:24:30Z (`99acfc521b583a5569573b4c477de5b7454631ed`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
