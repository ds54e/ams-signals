---
name: AnalogSAGE
summary: Analog topology and sizing agents with grounded memory and public circuit adapters.
description: Uses LLM agents for topology selection, refinement and transistor sizing in SKY130 op-amps, LDOs and bandgap references. Retrieved knowledge, accumulated experience and Bayesian/genetic search guide circuit proposals, while released adapters and testbenches execute ngspice measurements; the configured model and PDK remain external dependencies.
scope:
  design:
    ai: true
  simulation:
    ai: false
access: Public Python implementation; requires configured model/embedding endpoints, SKY130 and ngspice. Optional Pinecone knowledge retrieval has a separate setup.
addedAt: '2026-09-05'
reviewedAt: '2026-10-18'
sources:
- id: paper
  title: AnalogSAGE research paper
  url: https://arxiv.org/abs/2512.22435
  purpose: paper
- id: code
  title: Canonical author implementation
  url: https://github.com/wznmickey/AnalogSAGE
  purpose: code
- id: readme
  title: Revised public workflow and setup
  url: https://github.com/wznmickey/AnalogSAGE/blob/8fd72e235d2b331ee3ef2e3b633b4875bb9fa358/README.md
- id: topology
  title: Topology selection and retrieval
  url: https://github.com/wznmickey/AnalogSAGE/blob/8fd72e235d2b331ee3ef2e3b633b4875bb9fa358/tolology.py
- id: sizing
  title: Parameter optimization and simulator integration
  url: https://github.com/wznmickey/AnalogSAGE/blob/8fd72e235d2b331ee3ef2e3b633b4875bb9fa358/sizing_mix.py
- id: simulation
  title: Released ngspice execution adapter
  url: https://github.com/wznmickey/AnalogSAGE/blob/8fd72e235d2b331ee3ef2e3b633b4875bb9fa358/simulation/ngspice.py
- id: activity
  title: Replacement public implementation snapshot
  url: https://github.com/wznmickey/AnalogSAGE/commit/8fd72e235d2b331ee3ef2e3b633b4875bb9fa358
---

### Implementation and Scope

The current release implements topology selection/refinement, parameter search and memory-guided decisions, giving AI Design. Local circuit adapters and testbenches now connect sizing to an ngspice runner, giving conventional Simulation rather than AI Simulation. The model chooses circuits and parameters; numerical feedback alone is not a separate model-driven analysis stage. No paper performance result was reproduced. [Workflow](#source-readme) · [Topology](#source-topology) · [Sizing](#source-sizing) · [Execution adapter](#source-simulation).

### Repository and activity boundary

The canonical author repository retains its numeric identity, but the captured default branch has one October 17 root commit. The earlier May history must not be carried into its new monthly buckets. This snapshot includes circuit adapters and testbench files absent from the earlier reviewed release, so the implementation itself was re-reviewed rather than treating a history rewrite alone as new work. Its commit date describes the captured replacement release, not the first creation of the research method. [Implementation snapshot](#source-activity).
