---
name: PyVSC
description: Python library for constrained-random verification stimulus and functional coverage. Pluggable solver backends support RTL testbench workflows, with backend-dependent reproducibility and constraint-handling limits; the library complements rather than replaces an HDL simulator.
scope:
  verification:
    ai: false
access: Public Python package; supported solver dependencies vary by platform and selected backend.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Maintainer-declared canonical source host
  url: https://git.dvkit.org/fvutils/pyvsc
  purpose: code
- id: documentation
  title: Official documentation
  url: https://dvkit.org/fvutils/pyvsc/
  purpose: official
- id: release
  title: Published PyVSC 1.1.0 distribution, November 3, 2026
  url: https://pypi.org/project/pyvsc/1.1.0/
- id: hosting
  title: Canonical host and GitHub mirror relationship
  url: https://github.com/fvutils/pyvsc/blob/40576bb4b451aa01ad1a4880c6f1ddeb4743774f/.forgejo/workflows/docs.yml
- id: implementation
  title: Reviewed seed-stream compatibility correction on the GitHub mirror
  url: https://github.com/fvutils/pyvsc/commit/2cda4ca02b3cd6fe27fc1a90ca54803f5170310a
- id: backends
  title: Solver semantics and reproducibility boundaries on the mirror
  url: https://github.com/fvutils/pyvsc/blob/40576bb4b451aa01ad1a4880c6f1ddeb4743774f/doc/source/solver_backends.rst
---

### Implementation and selection

Constraint-based stimulus generation and coverage-model authoring complement the separately cataloged PyUCIS storage and coverage-analysis library. October object-array solver correctness, sampler and seed-stream compatibility work establishes substantive development; the November package publication supplies the reviewed activity point. [Implementation](#source-implementation) · [Release](#source-release).

### Hosting and scope

The maintainer identifies git.dvkit.org as the publishing location and GitHub as a mirror. The activity record therefore uses the verified PyPI release, not borrowed GitHub monthly counts or an invented host repository ID. Mirror links are explicitly identified as implementation evidence. [Hosting](#source-hosting).

Verification is conventional stimulus and coverage logic. Switching solver backend or optimizations can change generated values for the same seed; greedy soft-constraint relaxation need not minimize discarded constraints. Code and documentation were reviewed, but downstream simulation and solver results were not independently reproduced. [Backend boundaries](#source-backends).
