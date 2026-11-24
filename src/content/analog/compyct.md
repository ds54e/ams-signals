---
name: "Compyct"
aliases: []
description: "Python framework for fitting compact-device model parameters to electrical reference data. It runs templated ngspice or Spectre analyses and optimizes model parameters against selected metrics; supported analyses depend on the backend, and fitting agreement alone does not qualify a model outside the fitted conditions."
scope: {"simulation": {"ai": false}}
access: "Public Python source with inconsistent license metadata; model files and compatible simulators are separate, and Spectre requires licensed access."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
summary: "Calibrates compact-device models with simulator-backed electrical parameter fitting."
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/samueljamesbader/compyct"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/samueljamesbader/compyct/commit/524955efa60d48dab4297f21584ebe40c9654ae2"
  - id: optimizer
    title: "Reviewed numerical optimizer and session binding"
    url: "https://github.com/samueljamesbader/compyct/blob/eeb200596083045145fa2fa243912bdadf152a72/src/compyct/optimizer.py"
  - id: docs
    title: "Device simulation template example"
    url: "https://github.com/samueljamesbader/compyct/blob/eeb200596083045145fa2fa243912bdadf152a72/doc/trivial_xtor.md"
  - id: earlier
    title: "Separate model and instance parameter handling"
    url: "https://github.com/samueljamesbader/compyct/commit/6e6808dfdd58728f1c49466580340915486e6d3e"
  - id: license
    title: "Repository LICENSE at reviewed revision"
    url: https://github.com/samueljamesbader/compyct/blob/eeb200596083045145fa2fa243912bdadf152a72/LICENSE
  - id: packaging
    title: "Packaging metadata at reviewed revision"
    url: https://github.com/samueljamesbader/compyct/blob/eeb200596083045145fa2fa243912bdadf152a72/pyproject.toml
---

### Scope and maintenance

Simulation covers generating and calibrating a device model via electrical analysis; the fitted variables are model parameters, not a circuit sizing or topology design recommendation. Unlike PyOPUS circuit optimization, this workflow targets model extraction across chosen reference measurements or curves. It does not control lab instruments. [Optimizer](#source-optimizer) · [Example](#source-docs).

January separated model and instance parameters; September added a low-frequency current-drive noise path in the Spectre backend. Do not assume backend parity or independent validation of any extracted model. These reviewed features refer to repository source. [Earlier model handling](#source-earlier) · [Noise implementation](#source-activity).

The repository includes an MIT license file, but the reviewed packaging metadata describes licensing as not yet assigned. This listing describes publicly inspectable source without asserting redistribution or model access rights. [Repository license](#source-license) · [Package metadata](#source-packaging).
