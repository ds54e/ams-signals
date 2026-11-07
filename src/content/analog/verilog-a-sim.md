---
{
  "name": "verilog-a-sim",
  "aliases": [],
  "summary": "Pure-Rust Verilog-A compilation and circuit simulation with automatic differentiation.",
  "description": "Pure-Rust Verilog-A circuit simulator compiling models with automatic differentiation into an MNA/Newton solver for DC, transient, AC and noise analysis across multiple disciplines. Current main includes temperature propagation and additional noise grids; digital events, wreal and connectmodule are outside its supported language subset.",
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
  "access": "Apache-2.0 source; source builds require the documented Rust toolchain. Downloadable v2.0.0 binaries predate the reviewed November main-source features; regenerating QSPICE references requires QSPICE.",
  "addedAt": "2026-11-07",
  "reviewedAt": "2026-11-07",
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
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/f862694e1e5d95c0a691bcfdd67463ad2af58c84/README.md"
    },
    {
      "id": "language-boundaries",
      "title": "Construct-by-construct Verilog-A implementation reference",
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/f862694e1e5d95c0a691bcfdd67463ad2af58c84/docs/token-reference.md"
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
      "url": "https://github.com/philippevelha/verilog-a-sim/blob/f862694e1e5d95c0a691bcfdd67463ad2af58c84/docs/validation.md"
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
    }
  ]
}
---

### Implementation and scope

The frontend, automatically differentiated models and MNA/Newton execution support conventional Simulation, including electrical and other declared disciplines. Automatic differentiation is numerical compiler machinery, not runtime AI. This is not a full Verilog-AMS mixed-signal simulator: digital events, wreal and connectmodule are excluded, and absdelta remains refused rather than approximated. [Workflow](#source-readme) · [Language coverage](#source-language-boundaries).

### Selection and reviewed activity

Select for substantive implementation and validation iteration beyond an initial release. The November 3 main change implements oct/lin noise-card parsing and sweep execution, adds parser assertions, and extends the RC noise deck and QSPICE-reference harness; the preceding change propagates deck temperature to compiled models and thermal noise. These are concrete supported-analysis improvements, not cosmetic freshness. The activity capture uses the canonical main first-parent history. [Noise change](#source-activity) · [Temperature change](#source-temperature).

### Access, release and validation limits

Apache-2.0 source is public. The README's 1.4.0 heading, main's 2.53.0 change log and September v2.0.0 binary release are different checkpoints; November capabilities here describe reviewed main source, not the downloadable binary. Validation results are project-reported and use committed references with stated tolerances; the linear-grid integrated total is not itself the QSPICE-gated quantity. No independent QSPICE or electrical-accuracy experiment was run for this review. [License](#source-license) · [Binary release](#source-binary-release) · [Validation method](#source-validation).

### Development provenance

The reviewed change explicitly credits Claude Opus as coauthor of executable noise-grid parsing, sweep execution, parser regressions and validation-harness code. Inspection of the diff and retained main execution path supports AI-assisted development, without establishing that AI built most of the project. This attribution does not change the conventional Simulation Scope. [Credited implementation](#source-activity) · [Retained execution](#source-noise-implementation).
