---
name: "ORCA"
summary: "RFIC geometry-to-S-parameter surrogate training with parametric GDS generation and full-wave EM data."
description: "RFIC component modeling pipeline that generates parametric GDS layouts, runs full-wave EM simulations and trains neural surrogates to predict S-parameters from geometry and frequency. It exports ONNX models and evaluates held-out geometries; circuit optimization is delegated to the separate COBRA project."
scope:
  simulation:
    ai: true
  layout:
    ai: false
access: "Apache-2.0 source; Python 3.11–3.13 with gdsfactory, KLayout and gds2palace, plus an external Palace installation for EM. Training/export/testing require optional PyTorch, Optuna and ONNX dependencies. Users need suitable stackup, geometry and simulation data; reference presets target IHP SG13G2."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "code"
    title: "Canonical ORCA repository"
    url: "https://github.com/DI-PASSIONATE/ORCA"
    purpose: "code"
  - id: "readme"
    title: "Reviewed ORCA pipeline and COBRA boundary"
    url: "https://github.com/DI-PASSIONATE/ORCA/blob/4319761442897576b45b637729c4cca6ea3aa0b2/README.md"
  - id: "training"
    title: "Executable PyTorch training and validation loop"
    url: "https://github.com/DI-PASSIONATE/ORCA/blob/4319761442897576b45b637729c4cca6ea3aa0b2/src/orca/training/trainer.py"
  - id: "prediction"
    title: "Torch and ONNX geometry/frequency to electrical-network prediction"
    url: "https://github.com/DI-PASSIONATE/ORCA/blob/4319761442897576b45b637729c4cca6ea3aa0b2/src/orca/training/predictors.py"
  - id: "model-test"
    title: "Held-out S-parameter and electrical-parameter error evaluation"
    url: "https://github.com/DI-PASSIONATE/ORCA/blob/4319761442897576b45b637729c4cca6ea3aa0b2/src/orca/pipeline/test_model_stage.py"
  - id: "geometry"
    title: "Transformer parameter constraints and GDS generation"
    url: "https://github.com/DI-PASSIONATE/ORCA/blob/4319761442897576b45b637729c4cca6ea3aa0b2/src/orca/geometry/presets/transformer/tf_octa_c_ports.py"
  - id: "activity"
    title: "October 19 transformer geometry-range and pipeline-example changes"
    url: "https://github.com/DI-PASSIONATE/ORCA/commit/42123d6a1699c7dca47ee0ad135b838c5728b264"
  - id: "deembedding"
    title: "October 12 per-port de-embedding correction and two/three-port regression tests"
    url: "https://github.com/DI-PASSIONATE/ORCA/commit/03ae2f788e7c2bf7101ff7e6b9eacbbf807a2e6f"
  - id: "release"
    title: "ORCA v2.3.0, November 6, 2026"
    url: "https://github.com/DI-PASSIONATE/ORCA/releases/tag/v2.3.0"
  - id: "dependencies"
    title: "Package license, Python bounds and optional training dependencies"
    url: "https://github.com/DI-PASSIONATE/ORCA/blob/4319761442897576b45b637729c4cca6ea3aa0b2/pyproject.toml"
  - id: "license"
    title: "Apache License 2.0"
    url: "https://github.com/DI-PASSIONATE/ORCA/blob/4319761442897576b45b637729c4cca6ea3aa0b2/LICENSE"
---

### Implementation and selection

ORCA is a public implementation, not just a paper or dataset: its pipeline draws parameterized layouts, orchestrates EM simulation, fits models, exports ONNX and evaluates held-out networks. Its canonical repository differs from all existing catalog Code identities; using cataloged gdsfactory, Palace and scikit-rf as dependencies does not duplicate those tools. COBRA is a separate circuit optimizer and is not folded into ORCA's contribution. [Pipeline](#source-readme) · [Training loop](#source-training) · [Prediction](#source-prediction) · [Geometry](#source-geometry)

Distinct recent changes include the October 12 correction that removes each port's own parasitic inductance with two/three-port regression coverage, and the October 19 expansion of supported transformer diameters with updated pipeline examples. The latter is the meaningful first-parent checkpoint; the November 6 packaging fix supplies the later raw activity date. This is repeated implementation and validation, not a one-time paper release. Reviewed main and release v2.3.0 are identical. [De-embedding diff](#source-deembedding) · [Geometry change](#source-activity) · [Release](#source-release)

### Scope, provenance and limits

AI Simulation is established by actual electrical prediction: Torch inference normalizes geometry and frequency, evaluates the trained model and decodes an S-matrix; ONNX inference similarly returns a scikit-rf network. Held-out evaluation compares predicted S-parameters and derived electrical quantities against simulation. This is a distinct learned electrical-response estimator, rather than merely a model ranking design candidates. Conventional Palace solves remain conventional. [Prediction code](#source-prediction) · [Training](#source-training) · [Evaluation](#source-model-test)

Layout covers implemented parametric transformer/inductor GDS generation and associated DRC orchestration; it has no model-driven geometry decision in this reviewed pipeline. No Design stage is borrowed from COBRA. AI-assisted development is separately unestablished: model training, AI wording and assistant instruction files alone do not attribute a retained code contribution, so no development badge is assigned. [Geometry implementation](#source-geometry) · [Project boundary](#source-readme)

Apache-2.0 applies to ORCA's source, not automatically to every dependency, PDK or model. EM requires Palace and an appropriate stackup/configuration; training and ONNX paths require the optional training dependencies and relevant simulation data. Prediction accuracy is conditional on the trained geometry/frequency domain and held-out validation; no universal accuracy, fabrication signoff or independently reproduced result is claimed. [License](#source-license) · [Dependencies](#source-dependencies) · [Evaluation](#source-model-test)
