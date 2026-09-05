---
name: "vcli"
aliases: ["Virtuoso CLI","virtuoso-cli"]
summary: "A Rust CLI and daemon for multi-session Virtuoso control, schematic operations, Maestro runs, and Spectre results."
description: "Rust CLI for concurrent Virtuoso sessions, exposing schematic edits, Maestro/Spectre runs, PSF results and SKILL layout helpers through structured agent commands."
flow: {"design":"core","simulation":"core","layout":"supporting"}
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

### Flow scope

Exposed schematic editing and Maestro/Spectre/PSF operations justify central design and simulation scope. SKILL geometry and stream-out helpers support layout without establishing autonomous placement or signoff. [Reviewed source](#source-review).
