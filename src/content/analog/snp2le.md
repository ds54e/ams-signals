---
name: "snp2le"
aliases: []
summary: "GUI and batch converter from Touchstone S-parameters to SPICE or VACASK circuit macromodels."
description: "GUI and batch converter from Touchstone S-parameters to ngspice, Xyce or VACASK circuit macromodels. Vector fitting, convex passivity refitting and structure-specific fitting support RF modeling; bandwidth, model identifiability, optional DC correction and thermal-noise conditions bound the approximation."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for correcting S-parameter plotting on PySide6 builds that return list-valued selector data. The canonical plot view retains handling of both tuples and lists."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python implementation; scikit-rf and numerical packages are required, with PySide6 for the GUI and Xschem/simulators for optional testbench runs."
addedAt: "2026-10-22"
reviewedAt: "2026-11-25"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/iic-jku/snp2le"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/iic-jku/snp2le/blob/07a8222d52f25080274168eeed2fe27d064a268c/README.md"
  - id: "implementation-1"
    title: "Reviewed source: snp2le/cli.py"
    url: "https://github.com/iic-jku/snp2le/blob/07a8222d52f25080274168eeed2fe27d064a268c/snp2le/cli.py"
  - id: "implementation-2"
    title: "Reviewed source: snp2le/core/universal.py"
    url: "https://github.com/iic-jku/snp2le/blob/07a8222d52f25080274168eeed2fe27d064a268c/snp2le/core/universal.py"
  - id: "implementation-3"
    title: "Reviewed source: snp2le/core/noise.py"
    url: "https://github.com/iic-jku/snp2le/blob/07a8222d52f25080274168eeed2fe27d064a268c/snp2le/core/noise.py"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #30 from iic-jku/fix/cli-batch-and-fit-spread"
    url: "https://github.com/iic-jku/snp2le/commit/446e2b3b5c2cdfea4b508455a4470b77557f543c"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/iic-jku/snp2le/commit/f055649a06bafa623547ed0928f252fb0b72c1c7
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/iic-jku/snp2le/blob/07a8222d52f25080274168eeed2fe27d064a268c/snp2le/gui/plot_view.py
  - id: convex-refit
    title: "Reviewed bounded-real convex refit"
    url: "https://github.com/iic-jku/snp2le/blob/95fe03dab6df86fdb7369a9d8daef6cc018714af/snp2le/core/passive_refit.py"
  - id: convex-tests
    title: "Convex refit tests including the constant term"
    url: "https://github.com/iic-jku/snp2le/blob/95fe03dab6df86fdb7369a9d8daef6cc018714af/tests/test_convex_passivity.py"
  - id: export-202611
    title: "Reviewed Xyce export options"
    url: "https://github.com/iic-jku/snp2le/blob/95fe03dab6df86fdb7369a9d8daef6cc018714af/snp2le/cli.py"
  - id: dc-pin-engine
    title: "Fit and noise construction before DC pinning"
    url: "https://github.com/iic-jku/snp2le/blob/95fe03dab6df86fdb7369a9d8daef6cc018714af/snp2le/core/engine.py"
  - id: dc-pin-check
    title: "Sampled DC pin acceptance checks"
    url: "https://github.com/iic-jku/snp2le/blob/95fe03dab6df86fdb7369a9d8daef6cc018714af/snp2le/core/dcpin.py"
  - id: convex-integration
    title: "November 18 integration of bounded-real convex passive refit"
    url: "https://github.com/iic-jku/snp2le/commit/b0db91d696fc81ce66d9d447550694558a9d1db9"
  - id: convex-review-fixes
    title: "Follow-up regression and diagnostic corrections"
    url: "https://github.com/iic-jku/snp2le/commit/95fe03dab6df86fdb7369a9d8daef6cc018714af"
---

### Implemented operations and boundaries

The batch CLI and GUI share fitting and netlist-generation logic. Fitting is approximate and bandwidth/order-dependent. Optional thermal noise requires strict passivity; passive enforcement settings, extrapolation and poorly identified physical elements need review. Optional testbench execution requires Xschem and a simulator.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

The November source adds Xyce export and a bounded-real convex refit of residues and the constant term with fixed stable poles. Tests include cases that residue-only perturbation cannot repair. The fit and optional thermal-noise generator are constructed before a later DC pin correction. The DC overlay is noiseless and is accepted through sampled passivity and fit-band checks; it is not followed by a new thermal-noise construction or an all-frequency passivity check. [Refit](#source-convex-refit) · [Tests](#source-convex-tests) · [Export](#source-export-202611) · [Engine](#source-dc-pin-engine) · [DC pin](#source-dc-pin-check).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The October 18 batch/fit correction remains earlier substantive evidence. The November 18 convex-refit merge supersedes it as the meaningful checkpoint in the existing capture. [Earlier implementation](#source-activity) · [Convex integration](#source-convex-integration).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for correcting S-parameter plotting on PySide6 builds that return list-valued selector data. The canonical plot view retains handling of both tuples and lists. This supports AI-ASSISTED. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).

### November maintenance

November 18 integrates the bounded-real convex refit of residues and the constant term, with further tests and CLI diagnostic corrections at the captured head. The default 100-state limit bounds use of this method; larger models use the alternative perturbation path. The refit does not establish passivity after the optional DC overlay or independent thermal-noise accuracy. [Integration](#source-convex-integration) · [Follow-up tests](#source-convex-review-fixes).
