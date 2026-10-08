---
name: "vcli"
aliases: ["Virtuoso CLI","virtuoso-cli"]
summary: "A Rust CLI and daemon for multi-session Virtuoso control, schematic operations, Maestro runs, and Spectre results."
description: "Rust CLI for concurrent Virtuoso sessions, schematic edits, Maestro/Spectre runs, PSF results and SKILL layout helpers. Repository-shipped agent skills add model-guided sizing and schematic workflows; an Evidence Loop records human GUI corrections, verifies follow-up evidence and extracts reusable rule candidates for human review."
scope:
  design:
    ai: true
  simulation:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-credited campaign implemented OCEAN simulation automation and integrated setup, run, measurement, sweep and corner commands into the Rust CLI. The current simulation commands still use that OCEAN layer."
  sources: ["development-1", "development-2"]
  reviewedAt: "2026-09-07"
targets: "SKILL, schematics, Maestro ADE, Spectre jobs, and PSF results"
access: "Rust implementation and setup guides are public. Users provide licensed Cadence tools, circuit assets, a PDK, and local or SSH access; Maestro commands target IC23.1+ Explorer views."
addedAt: "2026-09-05"
reviewedAt: "2026-10-08"
sources:
  - id: "code"
    title: "Public virtuoso-cli repository"
    url: "https://github.com/deanyou/virtuoso-cli"
    purpose: "code"
  - id: "review"
    title: "Reviewed README: Rust rewrite, session registry, CLI, and prerequisites"
    url: "https://github.com/deanyou/virtuoso-cli/blob/1376468d05d1c4adc5dd3cdfdcf434421fb249ec/README.md"
  - id: "daemon"
    title: "Rust daemon: dynamic listener and SKILL dispatch"
    url: "https://github.com/deanyou/virtuoso-cli/blob/1376468d05d1c4adc5dd3cdfdcf434421fb249ec/src/daemon/main.rs"
  - id: "broadcast"
    title: "Concurrent SKILL broadcast and per-session results"
    url: "https://github.com/deanyou/virtuoso-cli/blob/1376468d05d1c4adc5dd3cdfdcf434421fb249ec/src/commands/skill.rs"
  - id: "maestro"
    title: "Implemented Maestro commands"
    url: "https://github.com/deanyou/virtuoso-cli/blob/1376468d05d1c4adc5dd3cdfdcf434421fb249ec/src/commands/maestro.rs"
  - id: "layout"
    title: "Reviewed layout geometry implementation"
    url: "https://github.com/deanyou/virtuoso-cli/blob/1376468d05d1c4adc5dd3cdfdcf434421fb249ec/src/client/layout_ops.rs"
  - id: "development-1"
    title: "CLI/simulation campaign"
    url: "https://github.com/deanyou/virtuoso-cli/commit/01876c67d7e485f3171e5d03f97def5fa1e5ec91"
  - id: "development-2"
    title: "Current implementation"
    url: "https://github.com/deanyou/virtuoso-cli/blob/609e060dc79d62897068244ab7be431854976829/src/commands/sim.rs"
  - id: "activity-refresh"
    title: "Headless schematic and Maestro workflow integration"
    url: "https://github.com/deanyou/virtuoso-cli/commit/45f34677599ebd969bd019d47816335df29781ec"
  - id: "pin-semantics"
    title: "Schematic pin orientation and signal-type forwarding"
    url: "https://github.com/deanyou/virtuoso-cli/commit/e9290339b0458cbcf1f81dacc4f92d8486522f41"
  - id: "runtime-optimizer"
    title: "Repository-shipped model-guided circuit optimization workflow"
    url: "https://github.com/deanyou/virtuoso-cli/blob/fb29298855eeaaab3732c1fcfc3bf60c3b058789/.claude/skills/circuit-optimizer/SKILL.md"
  - id: "runtime-design"
    title: "Agent specification decomposition and circuit design workflow"
    url: "https://github.com/deanyou/virtuoso-cli/blob/fb29298855eeaaab3732c1fcfc3bf60c3b058789/.claude/skills/spec-driven-circuit-design/SKILL.md"
  - id: "skill-packaging"
    title: "Rust package excludes repository agent skills"
    url: "https://github.com/deanyou/virtuoso-cli/blob/fb29298855eeaaab3732c1fcfc3bf60c3b058789/Cargo.toml"
  - id: "evidence-loop"
    title: "Implemented intervention records, evidence mining, and snapshot-bound decisions"
    url: "https://github.com/deanyou/virtuoso-cli/commit/f107754b628dd88623e2e7a0e6f9b53d14841a65"
  - id: "candidate-mining"
    title: "Deterministic candidate grouping and independent-evidence accounting"
    url: "https://github.com/deanyou/virtuoso-cli/blob/f107754b628dd88623e2e7a0e6f9b53d14841a65/.claude/skills/virtuoso-gui-debug/scripts/evidence/mine_candidates.py"
  - id: "intervention-review"
    title: "Intervention verification provenance and human candidate decisions"
    url: "https://github.com/deanyou/virtuoso-cli/blob/f107754b628dd88623e2e7a0e6f9b53d14841a65/.claude/skills/virtuoso-gui-debug/scripts/evidence/record_intervention.py"
  - id: "candidate-report"
    title: "Candidates review tab and snapshot-aware adoption reporting"
    url: "https://github.com/deanyou/virtuoso-cli/commit/234ba6a56f58e947401a29d43efd413fab8590d0"
  - id: "evidence-report-integration"
    title: "Default-branch integration of the Candidates review report"
    url: "https://github.com/deanyou/virtuoso-cli/commit/66119da2460b0b92534c7f89a2c9b1bb5993c72d"
---
### Implementation and lineage

The project credits virtuoso-bridge-lite as its basis but implements a separate Rust CLI/daemon. A registry tracks live sessions with OS-assigned ports; multiple sessions require explicit selection. JSON output, schema introspection, and exit codes support agent callers. [Architecture and CLI](#source-review) · [Listener implementation](#source-daemon)

Implemented commands read and edit schematics, execute SKILL, configure Maestro runs, launch synchronous or asynchronous Spectre jobs, and parse PSF results. [Interfaces](#source-review) · [Maestro implementation](#source-maestro)

The September 29 headless-design integration expands schematic/symbol operations, Maestro state handling and installed-library reference lookup. It also validates RPC parameters and makes open-cellview and save/discard behavior explicit. Pin orientation and signal-type forwarding are implemented in the follow-on correction. These interface changes remain conventional; the separate repository-shipped agent workflows supply the AI Design role. [Headless workflow](#source-activity-refresh) · [Pin semantics](#source-pin-semantics)

### Concurrent operation and limits

Admin-enabled SKILL broadcast opens one connection per live local session using concurrent Rust threads. Callers must inspect per-session results: partial failure can still return a successful process exit. This is concurrency across sessions, not a promise of simultaneous execution inside one Virtuoso instance. [Broadcast implementation](#source-broadcast)

The exposed EDA infrastructure does not itself demonstrate autonomous analog design, optimization quality, or specification closure. Those require a separate workflow and circuit-specific evaluation.

### Evidence Loop

The October 5 implementation records human GUI interventions with original-run and follow-up references, before/after evidence and verification provenance. It groups corrections by reason, action and context to extract deterministic rule candidates. Connected original/follow-up runs count as one evidence component, avoiding duplicate support from correlated retries. Verified, failed, conflicting, unknown and manual evidence remain distinct. [Implementation](#source-evidence-loop) · [Candidate mining](#source-candidate-mining) · [Verification provenance](#source-intervention-review)

Stable candidate IDs and snapshot hashes bind human adoption, rejection or deferral to specific evidence. The October 6 HTML Candidates tab exposes decision states and evidence references; adoption counts apply only to the current snapshot. Its default-branch integration supplies the reviewed activity signal. [Decision workflow](#source-intervention-review) · [Review report](#source-candidate-report) · [Integration](#source-evidence-report-integration)

Adoption records a review decision without changing runtime policy. This is implemented experience collection and rule-candidate review, not demonstrated autonomous self-improvement or direct learning of circuit topology/sizing knowledge. The new feature does not change the existing stage classifications, and no live Virtuoso evidence-loop run was reproduced for the catalog. [Implementation boundary](#source-evidence-loop) · [Candidate mining](#source-candidate-mining)

### Scope classification

The Rust CLI provides conventional schematic, simulation/result and layout primitives. The named project also ships agent workflows that select circuit-parameter candidates, reason over search history and decide when to stop or change phases. Those substantive runtime decisions support AI Design. [Circuit optimizer](#source-runtime-optimizer) · [Specification workflow](#source-runtime-design)

The skills require a source checkout and model host; they are excluded from the Cargo package, and some older examples use the prior binary spelling. No end-to-end agent/EDA run was reproduced. Sizing feedback does not separately establish AI Simulation, and geometry helpers do not establish AI Layout. [Packaging boundary](#source-skill-packaging) · [Conventional interfaces](#source-review)

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The credited campaign adds actual Rust OCEAN code generation and setup/run/measurement/sweep/corner commands, with current CLI calls. This is a substantial simulation subsystem, without assigning the whole Rust rewrite to AI. [CLI/simulation campaign](#source-development-1); [Current implementation](#source-development-2).
