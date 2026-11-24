---
{
  "name": "verilog-a-sim",
  "aliases": [],
  "summary": "Pure-Rust Verilog-A compilation and circuit simulation with automatic differentiation.",
  "description": "Pure-Rust Verilog-A simulator with automatic differentiation and MNA/Newton execution for DC, transient, AC and noise analysis. Source builds include pseudo-transient DC recovery and diagnostic warnings; downloadable binaries lag the reviewed source, and digital events, wreal, connectmodule and periodic-noise analysis remain outside its supported scope.",
  "scope": {
    "simulation": {
      "ai": false
    },
    "aiDevelopment": "assisted"
  },
  "developmentEvidence": {
    "summary": "Claude Opus is explicitly coauthor-credited for implementing oct/lin noise-grid parsing and execution, with parser regressions and a validation-harness extension. These executable changes are retained at the reviewed canonical main revision.",
    "sources": [
      "activity",
      "noise-implementation"
    ],
    "reviewedAt": "2026-11-07"
  },
  "access": "Apache-2.0 source; builds require the documented Rust toolchain. Downloadable v2.0.0 binaries predate the reviewed 2.58.0 source. Committed QSPICE references support local comparisons; Spectre reference outputs are not distributed and require a separately licensed environment to regenerate.",
  "addedAt": "2026-11-07",
  "reviewedAt": "2026-11-24",
  "sources": [
    {
      "id": "code",
      "title": "Canonical verilog-a-sim repository",
      "url": "https://github.com/philippevelha/verilog-a-sim",
      "purpose": "code"
    },
    {
      "id": "readme",
      "title": "Reviewed simulator workflow and analysis boundaries",
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/048184d7d080d0e6d526a3d94a871741dac8443a/README.md"
    },
    {
      "id": "language-boundaries",
      "title": "Construct-by-construct Verilog-A implementation reference",
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/048184d7d080d0e6d526a3d94a871741dac8443a/docs/token-reference.md"
    },
    {
      "id": "activity",
      "title": "Implement oct/lin noise grids with parser tests and validation",
      "url": "https://github.com/philippevelha/verilog-a-sim/commit/f862694e1e5d95c0a691bcfdd67463ad2af58c84"
    },
    {
      "id": "noise-implementation",
      "title": "Retained noise-grid execution at reviewed main",
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/f862694e1e5d95c0a691bcfdd67463ad2af58c84/crates/va-cli/src/lib.rs"
    },
    {
      "id": "temperature",
      "title": "Propagate deck temperature into compiled models and thermal noise",
      "url": "https://github.com/philippevelha/verilog-a-sim/commit/19a69ec5a84ba205d39ab5633a9401c01acaedc1"
    },
    {
      "id": "validation",
      "title": "Reviewed reference-validation method and limitations",
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/048184d7d080d0e6d526a3d94a871741dac8443a/docs/validation.md"
    },
    {
      "id": "binary-release",
      "title": "September v2.0.0 binary release",
      "url": "https://github.com/philippevelha/verilog-a-sim/releases/tag/v2.0.0"
    },
    {
      "id": "license",
      "title": "Apache-2.0 license",
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/f862694e1e5d95c0a691bcfdd67463ad2af58c84/LICENSE"
    },
    {
      "id": "dc-recovery",
      "title": "Pseudo-transient DC recovery, diagnostic warnings and regressions",
      "url": "https://github.com/philippevelha/verilog-a-sim/commit/048184d7d080d0e6d526a3d94a871741dac8443a"
    },
    {
      "id": "dc-recovery-tests",
      "title": "Failed DC sweep preserves solved points and a failure exit",
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/048184d7d080d0e6d526a3d94a871741dac8443a/crates/va-cli/tests/dc_rescue.rs"
    },
    {
      "id": "spectre-reference-boundary",
      "title": "Published Spectre netlists and unavailable reference-output boundary",
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/048184d7d080d0e6d526a3d94a871741dac8443a/golden/spectre/mwp/README.md"
    },
    {
      "id": "spectre-gate",
      "title": "Comparison gate explicitly skips when Spectre outputs are absent",
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/048184d7d080d0e6d526a3d94a871741dac8443a/paper_writing/mwp/tests/t12_spectre_golden.py"
    }
  ]
}
---

### Implementation and scope

The frontend, automatically differentiated models and MNA/Newton execution support conventional Simulation, including electrical and other declared disciplines. Automatic differentiation is numerical compiler machinery, not runtime AI. Digital events, wreal and connectmodule are excluded, and absdelta remains refused. Periodic-noise analysis is also absent; comparisons of time-domain results with an external harmonic-balance result do not add that solver to this project. [Workflow](#source-readme) · [Language coverage](#source-language-boundaries) · [Periodic-noise boundary](#source-spectre-reference-boundary).

### Selection and reviewed activity

Select for substantive implementation and validation iteration beyond an initial release. The November 3 main change implements oct/lin noise-card parsing and sweep execution, adds parser assertions, and extends the RC noise deck and QSPICE-reference harness; the preceding change propagates deck temperature to compiled models and thermal noise. These are concrete supported-analysis improvements, not cosmetic freshness. The activity capture uses the canonical main first-parent history. [Noise change](#source-activity) · [Temperature change](#source-temperature).

### Access, release and validation limits

Apache-2.0 source is public. The September v2.0.0 binary release predates the reviewed 2.58.0 source; current-source features require a source build. The November 18 implementation adds pseudo-transient continuation after the DC gmin recovery tiers and reports method changes. Its CLI regression requires a failed sweep to keep completed points while retaining a failure exit, so partial output must not be read as a completed sweep. [License](#source-license) · [Binary release](#source-binary-release) · [DC recovery](#source-dc-recovery) · [Failure-path regression](#source-dc-recovery-tests).

Committed QSPICE references and closed-form tests remain distinct from project-reported Spectre comparisons. The Spectre reference outputs and logs are no longer distributed; only translated decks and documentation remain in the reviewed tree. The microwave-photonics comparison gate exits successfully with an explicit skipped record when those outputs are absent. That status does not establish a numerical comparison, and the oscillator phase-noise reference remains unresolved in the project's notes. No independent simulator-accuracy campaign was run for this catalog review. [Validation method](#source-validation) · [Reference availability](#source-spectre-reference-boundary) · [Skip implementation](#source-spectre-gate).

### Development provenance

The reviewed change explicitly credits Claude Opus as coauthor of executable noise-grid parsing, sweep execution, parser regressions and validation-harness code. Inspection of the diff and retained main execution path supports AI-assisted development. This attribution does not change the conventional Simulation Scope. [Credited implementation](#source-activity) · [Retained execution](#source-noise-implementation).
