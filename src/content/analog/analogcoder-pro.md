---
name: "AnalogCoder-Pro"
aliases: ["AnalogCoderPro"]
summary: "Combines multimodal circuit generation and diagnosis with implemented fixed-topology Optuna TPE device sizing."
description: "Uses multimodal LLMs to generate analog netlists and diagnose or repair candidates from ngspice results and waveform images. Its fixed-topology sizing stage uses Optuna TPE with PySpice/ngspice DC-bias and AC evaluation; standalone sizing needs no model API, while generation and multimodal diagnosis require a configured endpoint."
scope:
  design:
    ai: true
  simulation:
    ai: true
targets: "Amplifiers, mixers, comparators, oscillators, filters, and related circuits"
access: "Public code includes the sizing helper, 45nm models, parameterized examples and generation-to-sizing runner. Standalone sizing requires Python, Optuna, PySpice and shared-library ngspice on macOS/Linux, with no model API. Generation and multimodal diagnosis require a configured model endpoint; native Windows sizing is unsupported."
notice: "Short integration tests use scripted model replies and real ngspice for selected tasks, not live model generation or paper-performance reproduction. GBW uses the first downward unity-gain crossing, falling back to the final sampled frequency when none is found."
addedAt: "2026-09-05"
reviewedAt: "2026-11-07"
sources:
  - id: "code"
    title: "Public repository"
    url: "https://github.com/laiyao1/AnalogCoderPro"
    purpose: "code"
  - id: "paper"
    title: "AnalogCoder-Pro: TCAD paper"
    url: "https://ieeexplore.ieee.org/document/11432899"
    purpose: "paper"
  - id: "review"
    title: "Reviewed README: generation, feedback and released sizing workflow"
    url: "https://github.com/laiyao1/AnalogCoderPro/blob/5db764d33889c3ed7a25dfa73ab7db900d33f8e4/README.md"
  - id: "tasks"
    title: "Public task table: circuit requests and input/output ports"
    url: "https://github.com/laiyao1/AnalogCoderPro/blob/05542af46020e5c37d5a7e3ca79da9f24626e1c9/problem_set.tsv"
  - id: "activity"
    title: "Accept plain Python responses and expand generation-to-sizing tests"
    url: "https://github.com/laiyao1/AnalogCoderPro/commit/45364540b6d1feab8ba640e0ed471c9f4edcc38a"
  - id: "sizing-added"
    title: "Released sizing implementation, 45nm models and examples"
    url: "https://github.com/laiyao1/AnalogCoderPro/commit/cde29757711e8e183b09cdee0c478ab1c2af5674"
  - id: "runner-integration"
    title: "Automatic sizing runner and deterministic-model integration test"
    url: "https://github.com/laiyao1/AnalogCoderPro/commit/139090dda1ee4def9ae4ad5f7dda715258ddcf33"
  - id: "sizing-guide"
    title: "Sizing setup, objectives, outputs, platform and validation boundaries"
    url: "https://github.com/laiyao1/AnalogCoderPro/blob/5db764d33889c3ed7a25dfa73ab7db900d33f8e4/optimize/README.md"
  - id: "sizing-code"
    title: "Implemented Optuna TPE search and isolated DC/AC evaluation"
    url: "https://github.com/laiyao1/AnalogCoderPro/blob/5db764d33889c3ed7a25dfa73ab7db900d33f8e4/optimize/circuit_optimizer_helper.py"
---

### Inputs and implemented workflow

Tasks specify a circuit request and input/output ports. Multimodal generation, waveform-guided diagnosis and netlist repair remain the AI-facing workflow. The October 30 implementation additionally releases fixed-topology device sizing, 45nm models and two parameterized examples. Optuna's TPE sampler searches transistor widths, bias voltages, resistances and compensation capacitances; it is not a Gaussian-process optimizer. Each candidate receives DC bias search and AC evaluation through PySpice/ngspice. [Task table](#source-tasks) · [Released workflow](#source-review) · [Sizing implementation](#source-sizing-code) · [Models and examples](#source-sizing-added).

Standalone sizing runs without an LLM or API key. The generation-to-sizing runner requests a parameterized module after a generated optimization task passes its function check, then invokes the same optimizer. Generation and multimodal diagnosis still require a configured model endpoint. Trials use fork-based isolation on macOS/Linux, so native Windows is unsupported. [Guide and outputs](#source-sizing-guide) · [Runner integration](#source-runner-integration).

### Scope and evidence limits

AI Design covers model-generated and repaired netlists; the conventional TPE sizing path is an additional implemented Design mechanism. AI Simulation remains justified by separate model interpretation of waveform/simulation feedback, not by calling ngspice or by the optimizer alone. The released sizing stage supersedes the older unfinished-BO warning without establishing every research claim as reproducible. [Model-facing workflow](#source-review) · [Sizing path](#source-sizing-code).

Upstream integration tests supply scripted model replies and exercise real ngspice plus two-trial studies for tasks 51, 52, 55, 56, 59 and 60. They cover selected gain, GBW and FoM routes and orchestration, not live-provider access, model-generated circuit quality, all tasks or the paper's performance. Those tests were inspected, not rerun in this catalog review. GBW is the first downward unity-gain crossing in the sampled AC response, with the last sampled frequency used when no crossing exists; penalty scores also require checking before treating output as a valid circuit. [Validation and metric conventions](#source-sizing-guide) · [Plain-Python response handling](#source-activity).

This entry does not reuse the preceding AnalogCoder project's results as Pro results. Continued sizing implementation, runner fixes and regression work support retention. The meaningful checkpoint advances to the October 30 response-handling and test change, with canonical history and counts captured separately. [Implemented iteration](#source-sizing-added) · [Integration correction](#source-runner-integration) · [Meaningful checkpoint](#source-activity).
