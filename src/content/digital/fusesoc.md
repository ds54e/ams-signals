---
name: FuseSoC
description: Manages reusable RTL cores, versioned dependencies, generators and build targets through CAPI metadata. Its configure/build/run commands use Edalize to drive simulation and FPGA synthesis/place-and-route flows, with required tools and device support supplied separately; it orchestrates these flows rather than providing a new simulator or implementation engine.
scope:
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
access: Public Python implementation. Core libraries, generators, Edalize backends and the chosen simulator or FPGA toolchain must be installed and configured for the selected target; the core manager alone does not supply them.
addedAt: '2026-11-07'
reviewedAt: "2026-11-25"
sources:
- id: "official"
  title: "Official project website"
  url: "https://fusesoc.readthedocs.io/en/stable/"
  purpose: "official"
- id: code
  title: Canonical public implementation
  url: https://github.com/olofk/fusesoc
  purpose: code
- id: readme
  title: Reusable IP cores and build-system workflow
  url: https://github.com/olofk/fusesoc/blob/e1a21701ad12bcb8136c13617ce7ed569a71c19f/README.md
- id: runner
  title: User-facing configure, build and run commands
  url: https://github.com/olofk/fusesoc/blob/e1a21701ad12bcb8136c13617ce7ed569a71c19f/fusesoc/main.py
- id: generator-tests
  title: Generator integration, cache invalidation and unique core-hook tests
  url: https://github.com/olofk/fusesoc/blob/e1a21701ad12bcb8136c13617ce7ed569a71c19f/tests/test_edalizer.py
- id: activity
  title: Exclude upper-bound prereleases from semantic version dependency ranges
  url: https://github.com/olofk/fusesoc/commit/213618ab43b686638865fdf687c59b410da1f28f
- id: sim-flow
  title: Edalize simulation flow and simulator execution
  url: https://github.com/olofk/edalize/blob/9a6f648c596bfe74224ae82f529075e565d4182b/edalize/flows/sim.py
- id: fpga-flow
  title: Edalize IceStorm flow connecting Yosys, nextpnr and bitstream generation
  url: https://github.com/olofk/edalize/blob/9a6f648c596bfe74224ae82f529075e565d4182b/edalize/flows/icestorm.py
- id: url-provider-fix
  title: "November 9 URL provider user-agent option correction"
  url: "https://github.com/olofk/fusesoc/commit/6d341dff1e261e26247d6245fcac8ae717ec4f86"
- id: url-provider-regression
  title: "Retained URL-provider regression test"
  url: "https://github.com/olofk/fusesoc/blob/7b7fa28c58d2825412080c62606e422022933fb8/tests/test_provider.py"
---

### Selection and implementation

CAPI core descriptions, dependency resolution, target selection and generators provide a reusable RTL composition/build workflow. The canonical project shows continued feature and correctness work, including semantic version ranges, generator-cache invalidation and hook-name collision handling, rather than only documentation or release-number updates. The October 23 fix excludes the next version's prereleases from caret/tilde dependency ranges and includes solver-facing regression cases. [Core workflow](#source-readme) · [Generator tests](#source-generator-tests) · [Version-range correction](#source-activity).

### Scope and dependencies

Dependency/source composition and invoking external generators do not by themselves establish a Design transformation. Synthesis, Verification and Layout refer to implemented, user-invoked configure/build/run flows through Edalize: the runner actually calls backend operations, the simulation flow invokes the chosen simulator, and the IceStorm graph connects Yosys synthesis to nextpnr placement/routing and bitstream generation. These are explicit project workflows rather than stages inferred from dependency names or emitted file lists. All stages are conventional; this review found no qualifying runtime AI or verified AI-development attribution. Edalize is a dependency, not a separate new catalog entry. [Runner](#source-runner) · [Simulation](#source-sim-flow) · [FPGA flow](#source-fpga-flow).

### Validation and activity limits

The reviewed tests exercise dependency ranges, generated EDAM configuration, generator caching and hook collisions. Configuration comparison is not evidence that a complete external simulator or FPGA toolchain was run successfully, and no upstream EDA execution was performed for this review. The October 23 version-range correctness change remains earlier implementation evidence; the November 9 provider correction supersedes it within the saved capture. Canonical first-parent counts and individual capture time are recorded in the activity snapshot. [Regression evidence](#source-generator-tests) · [Meaningful change](#source-activity).

### Reviewed implementation update, November 25, 2026

November 9 fixes provider configuration serialization so the configured user-agent reaches the URL download provider. The regression intercepts the download call and verifies its forwarded value, rather than contacting an external server. This is concrete source/IP acquisition compatibility maintenance after the October dependency-range fixes. Later test-discovery and CI cleanup remain raw activity. [Correction](#source-url-provider-fix) · [Regression](#source-url-provider-regression).

The selected meaningful checkpoint in the existing capture is 2026-11-09 UTC. Source and retained test code were inspected; no EDA, solver or regression run was independently performed.
