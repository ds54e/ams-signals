---
name: "SV-Gap"
aliases: [svgap]
description: "Evaluation harness for AI-generated Verilog/SystemVerilog that keeps functional results alongside CDC/RDC, power-on, temporal and reference-equivalence evidence. Its command harness supports generation, diagnosis and repair studies, while configurable structural and bounded-formal backends keep findings and missing evidence visible."
scope:
  design:
    ai: true
  verification:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Fable is co-credited with capturing Naja frontend diagnostics in temporary storage and exposing warning findings. The current backend retains that diagnostic capture and reporting path."
  sources: [development-credit, development-retained, development-disclosure]
  reviewedAt: "2026-11-24"
access: "Public Python evaluator; supplied HDL tasks use Yosys and Icarus Verilog, optional backends need their own tools, and model studies require a user-configured external generator command."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: Canonical SV-Gap implementation
    url: https://github.com/shsridhar-beep/svgap
    purpose: code
  - id: overview
    title: Evaluation workflows, backend dependencies and research boundaries
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/README.md
  - id: campaign
    title: Resumable generation and evidence-feedback repair execution
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/src/svgap/campaign.py
  - id: challenge-runner
    title: Executable model diagnosis and RTL repair harness
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/src/svgap/challenge_runner.py
  - id: diagnosis-contract
    title: Model task interpreting functional, reset-rule and missing evidence
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/challenges/v0.1/diagnosis/prompt.md
  - id: repair-contract
    title: Model task repairing asynchronous-assert/synchronous-release reset behavior
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/challenges/v0.1/repair/prompt.md
  - id: formal-backend
    title: Bounded Yosys property checks and reachability evidence
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/src/svgap/backends/formal_yosys.py
  - id: equivalence-backend
    title: Bounded synthesized-reference equivalence backend
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/src/svgap/backends/equivalence_yosys.py
  - id: limitations
    title: Structural coverage, initialization, bound and protocol limitations
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/docs/limitations.md
  - id: development-credit
    title: Claude Fable co-credited Naja warning-capture implementation
    url: https://github.com/shsridhar-beep/svgap/commit/e83d1dca26ef450d697c019a30f9172420c301fa
  - id: development-retained
    title: Retained frontend diagnostic capture and warning findings
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/src/svgap/backends/reference_naja.py
  - id: development-disclosure
    title: Maintainer disclosure of implementation assistance
    url: https://github.com/shsridhar-beep/svgap/blob/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df/CONTRIBUTORS.md
  - id: activity
    title: September 2026 campaign execution, repair loops and formal coverage changes
    url: https://github.com/shsridhar-beep/svgap/commit/856c5832b2b5f2dfbeac58a6e4961ecc0550e4df
---

### Implemented workflow and scope

SV-Gap evaluates generated or existing digital RTL against a manifest's functional tests and declared design intent. Structural reference backends, bounded temporal checking, reference equivalence and optional lint backends contribute separate evidence. The command-based campaign runner sends task prompts to a configured generator, materializes returned RTL, evaluates it and can return findings to the generator for another repair attempt; it records attempts and supports replay/resumption. [Workflow overview](#source-overview) · [Campaign implementation](#source-campaign).

Design is AI-backed for the implemented generation and RTL-repair studies. Verification is AI-backed for the released diagnosis task: a model interprets functional-pass, reset-rule-failure and incomplete-production-evidence records, and its structured answers are scored by the challenge harness. These flags identify the evaluated model's operations and the optional model workflows; the structural/formal graders themselves are conventional. Evaluating existing RTL does not require a model service. Running model studies requires a user-supplied external command and any model access that command needs. [Diagnosis/repair runner](#source-challenge-runner) · [Diagnosis contract](#source-diagnosis-contract) · [Reset repair contract](#source-repair-contract).

Yosys preparation and normalization are internal to the checking backends and do not establish a separate user-facing synthesis operation here. The optional Naja, Verilator and Verible paths require their corresponding packages/tools; merely installing the Python evaluator does not supply every backend. [Backend setup](#source-overview) · [Formal implementation](#source-formal-backend) · [Equivalence implementation](#source-equivalence-backend).

### Evidence boundaries and selection

Configured structural rules do not prove CDC protocols, analog metastability or MTBF. The formal and equivalence backends use explicit finite bounds and zero-initialized models; the formal path lowers clocked logic and honors supplied assumptions. Narrow structural recognition, unsupported intent and missing evidence must remain visible in interpreting a result. The project explicitly excludes analog/mixed-signal design and does not establish silicon signoff. [Documented boundaries](#source-limitations) · [Formal implementation](#source-formal-backend) · [Equivalence implementation](#source-equivalence-backend).

July's Naja frontend diagnostic implementation and September's resumable campaigns, feedback repair and formal reachability work demonstrate substantive changes in separate periods. The September 28 implementation commit is on the canonical default branch's first-parent history and is the meaningful checkpoint: `856c5832b2b5f2dfbeac58a6e4961ecc0550e4df`, `2026-09-28T21:43:21Z`. The reviewed sources include implementations and regression logic; no hosted model study, HDL simulation or formal job was rerun. [July implementation](#source-development-credit) · [September implementation](#source-activity).

### Development provenance

The integrated July commit explicitly co-credits Claude Fable for moving Naja diagnostics into temporary storage and preserving frontend warnings as structured findings. The reviewed canonical backend retains the temporary report, warning parser and finding-conversion path, and the maintainer separately discloses implementation assistance. This supports AI-ASSISTED for that retained executable contribution, independently of the benchmark's runtime-AI classifications. [Credited diff](#source-development-credit) · [Retained implementation](#source-development-retained) · [Maintainer disclosure](#source-development-disclosure).
