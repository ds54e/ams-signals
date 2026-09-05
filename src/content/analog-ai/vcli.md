---
name: "vcli"
aliases: ["Virtuoso CLI","virtuoso-cli"]
roles: ["eda-tool"]
summary: "A Rust CLI and daemon for multi-session Virtuoso control, schematic operations, Maestro runs, and Spectre results."
keywords: ["Rust CLI", "Multi-session", "Cadence", "Spectre", "JSON"]
workflow:
  generate-edit: core
  simulate-measure: core
  eda-integration: core
  physical: supporting
targets: "SKILL, schematics, Maestro ADE, Spectre jobs, and PSF results"
access: "Rust implementation and setup guides are public. Users provide licensed Cadence tools, circuit assets, a PDK, and local or SSH access; Maestro commands target IC23.1+ Explorer views."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
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
---
### Implementation and lineage

The project credits virtuoso-bridge-lite as its basis but implements a separate Rust CLI/daemon. A registry tracks live sessions with OS-assigned ports; multiple sessions require explicit selection. JSON output, schema introspection, and exit codes support agent callers. [Architecture and CLI](#source-review) · [Listener implementation](#source-daemon)

Implemented commands read and edit schematics, execute SKILL, configure Maestro runs, launch synchronous or asynchronous Spectre jobs, and parse PSF results. [Interfaces](#source-review) · [Maestro implementation](#source-maestro)

### Concurrent operation and limits

Admin-enabled SKILL broadcast opens one connection per live local session using concurrent Rust threads. Callers must inspect per-session results: partial failure can still return a successful process exit. This is concurrency across sessions, not a promise of simultaneous execution inside one Virtuoso instance. [Broadcast implementation](#source-broadcast)

The exposed EDA infrastructure does not itself demonstrate autonomous analog design, optimization quality, or specification closure. Those require a separate workflow and circuit-specific evaluation.

### Landscape scope

Schematic edits, simulation/results, and EDA session control are reviewed implementation scope; no built-in optimization workflow is claimed. Physical is supporting: Rust helpers generate SKILL for layout geometry and stream-out, rather than demonstrating automatic physical design or signoff. [Interfaces](#source-review) · [Layout helpers](#source-layout)
