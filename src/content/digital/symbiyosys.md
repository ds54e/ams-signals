---
name: "SBY"
aliases: ["SymbiYosys"]
description: "Driver for Yosys-based formal verification flows, orchestrating bounded checks, inductive proofs and cover analysis. Task configurations select engines and solvers, while the driver manages their execution and collects proof status or counterexample traces for inspection."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Copilot is credited for correcting the executed rIC3 unsupported-mode diagnostic in the BTOR engine. The canonical project retains the diagnostic-code correction; this attribution does not claim implementation of the solver."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-11-25"
sources:
  - id: "code"
    title: "Canonical SymbiYosys repository"
    url: "https://github.com/YosysHQ/sby"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/YosysHQ/sby/blob/b1a1e98cba941ec8433f8dc27f416cd7bb7f14be/README.md"
  - id: "implementation"
    title: "Reviewed implementation: sbysrc/sby_mode_prove.py"
    url: "https://github.com/YosysHQ/sby/blob/b1a1e98cba941ec8433f8dc27f416cd7bb7f14be/sbysrc/sby_mode_prove.py"
  - id: "activity"
    title: "Merge pull request #367 from YosysHQ/ric3"
    url: "https://github.com/YosysHQ/sby/commit/6e3dc04d9279da257b29e336edf3b599cccd4907"
  - id: "website"
    title: "Official project documentation"
    url: "https://yosyshq.readthedocs.io/projects/sby/en/latest/"
    purpose: "official"
  - id: "development-implementation-20261018"
    title: "Copilot-credited runtime diagnostic correction"
    url: "https://github.com/YosysHQ/sby/commit/a8f3f4bba21dbc12787c168c3e259c21cbe9f5ba"
  - id: "development-retained-20261018"
    title: "Retained runtime diagnostic code"
    url: "https://github.com/YosysHQ/sby/blob/79fc9eddca5e33a28cc2f2cd19c9825efd9a7255/sbysrc/sby_engine_btor.py"
  - id: "review-20261022-itp"
    title: "Reviewed upstream ITP status adapter"
    url: "https://github.com/YosysHQ/sby/blob/79fc9eddca5e33a28cc2f2cd19c9825efd9a7255/sbysrc/sby_engine_itp.py"
  - id: "review-20261022-btor"
    title: "Reviewed BTOR/rIC3 engine adapter"
    url: "https://github.com/YosysHQ/sby/blob/79fc9eddca5e33a28cc2f2cd19c9825efd9a7255/sbysrc/sby_engine_btor.py"
  - id: "review-20261022-itp-core"
    title: "ITP bounded and fixpoint result paths"
    url: "https://github.com/inquisitour/itp-bmc/blob/bdd5342f0ec275b1de044d050505c483e7ee3737/src/model_checker.cpp"
  - id: lease-fix
    title: "October 14 canceled job-lease correction"
    url: "https://github.com/YosysHQ/sby/commit/f9954c52290b83aa5f3078b7ca1a28efa81262b9"
  - id: lease-regression
    title: "Retained timeout regression"
    url: "https://github.com/YosysHQ/sby/blob/b21f778333efc1e7c33fe22b56d43f87e4f759d4/tests/regression/jobserver_timeout.sh"
  - id: property-kind-tests
    title: "October 15 status database regression correction"
    url: "https://github.com/YosysHQ/sby/commit/79fc9eddca5e33a28cc2f2cd19c9825efd9a7255"
  - id: rename-sby
    title: "November 16 official rename to SBY"
    url: "https://github.com/YosysHQ/sby/commit/b21f778333efc1e7c33fe22b56d43f87e4f759d4"
---


### Implementation context

SymbiYosys reads task configurations, prepares formal models with Yosys and manages selected solver/engine processes for bounded checks, proofs and cover tasks. Results, logs and witness traces come from those configured engines; assertion-language support and licensing depend on the selected tool distribution. [Project overview](#source-readme); [proof driver](#source-implementation).

### Release boundary

Reviewed October 1, 2026 at `b1a1e98cba941ec8433f8dc27f416cd7bb7f14be`. The August 4 head is cleanup. The retained July 7 first-parent merge implements rIC3 support in the BTOR engine and repairs witness handling and subprocess-result checks. Later documentation and formatting do not replace that implementation evidence. [Current project source](#source-readme); [meaningful activity](#source-activity).

### Scope classification

Bounded checks, proofs and cover tasks are the user-facing operations. Synthesis-tool preparation is an implementation dependency of the proof driver. [Reviewed source](#source-readme).

Formal engine orchestration and proof/cover execution are conventional Verification. The preparation passes do not create an AI or independent synthesis stage. [AI/stage evidence](#source-readme).

### Development provenance

Copilot is credited for correcting the executed rIC3 unsupported-mode diagnostic in the BTOR engine. The canonical project retains the diagnostic-code correction; this attribution does not claim implementation of the solver. [Copilot-credited runtime diagnostic correction](#source-development-implementation-20261018) · [Retained runtime diagnostic code](#source-development-retained-20261018).

### Review of exposed operations and limits, October 22, 2026

Engine availability is not a uniform proof guarantee. The reviewed ITP adapter accepts prove/bmc but maps both Fixpoint reached and Safe up to bound to PASS; the standalone checker also returns OK for bounded-only outcomes. This static result-contract concern prevents treating every ITP PASS as an unbounded proof, and itp-bmc is held from the proposed additions. No independent failure reproduction was performed. rIC3 remains a separate BTOR engine with its own supported modes, and the RTL frontend still limits assertion support. [ITP adapter](#source-review-20261022-itp); [checker](#source-review-20261022-itp-core); [BTOR adapter](#source-review-20261022-btor).

This was a static source and documentation review. External EDA, numerical-accuracy and model/API experiments were not rerun. Development-provenance labels are preserved; the subsequent technical checkpoint is documented below.

### Reviewed implementation update, November 25, 2026

The project renamed SymbiYosys to SBY on November 16; retain the catalog ID, repository identity and former name. The rename is not meaningful implementation activity. October 14 corrects release of canceled queued or held job leases and adds a regression checking TIMEOUT with a fake sleeping solver. October 15 corrects the status database test to read explicit property kinds instead of inferring them from frontend-dependent names. The latter test maintenance supersedes July 7 within the saved capture. The earlier proof-result limitations remain. [Rename](#source-rename-sby) · [Runtime correction](#source-lease-fix) · [Regression](#source-lease-regression) · [Property-kind test](#source-property-kind-tests).

The reviewed meaningful checkpoint within the existing capture is 2026-10-15 UTC. The source and retained tests were inspected, not independently executed.
