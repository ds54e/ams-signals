---
name: "pdn-toolkit"
aliases: ["PDN Toolkit"]
summary: "Analyzes lumped PDN impedance and selects cost-aware decoupling banks with derating and frequency-band checks."
description: "Python lumped-element PDN analysis and decoupling selection with capacitor ESR, ESL, mounting inductance, DC-bias derating and plane spreading inductance. A deterministic greedy and pruning search selects a cost-aware capacitor bank against a sampled target-impedance mask and reports infeasible results; global optimality is not established."
scope: {"design":{"ai":false},"simulation":{"ai":false}}
access: "MIT. Python and NumPy; component values, derating and mounting or plane inductance must reflect the intended design."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/Tomer-Harari/pdn-toolkit"
    purpose: code
  - id: activity
    title: "August 19 infeasible design-band rejection and regression"
    url: "https://github.com/Tomer-Harari/pdn-toolkit/commit/c398f0d81b4c531a54eb7df903c11a51bd92da6b"
  - id: earlier
    title: "August 19 DC-bias derating and cached-admittance optimization"
    url: "https://github.com/Tomer-Harari/pdn-toolkit/commit/022ff2cfe3d4a83bea51cd61be82b2b2f65dcfb3"
  - id: model
    title: "Retained lumped impedance and crossover implementation"
    url: "https://github.com/Tomer-Harari/pdn-toolkit/blob/c398f0d81b4c531a54eb7df903c11a51bd92da6b/pdn/models.py"
  - id: optimizer
    title: "Retained cost-aware greedy, prune and merge search"
    url: "https://github.com/Tomer-Harari/pdn-toolkit/blob/c398f0d81b4c531a54eb7df903c11a51bd92da6b/pdn/optimize.py"
  - id: tests
    title: "Retained optimizer validation cases"
    url: "https://github.com/Tomer-Harari/pdn-toolkit/blob/c398f0d81b4c531a54eb7df903c11a51bd92da6b/tests/test_optimize.py"
  - id: overview
    title: "Workflow and limitations"
    url: "https://github.com/Tomer-Harari/pdn-toolkit/blob/c398f0d81b4c531a54eb7df903c11a51bd92da6b/README.md"
---

## Scope and limits

This project is a compact parameterized PDN sizing and electrical evaluation library rather than a board geometry extractor. It calculates complex impedances from an assumed regulator, capacitor bank and spreading inductance, checks sampled antiresonance peaks, and searches a part library by cost effectiveness before pruning components and merging part numbers. The returned solution is checked over its sampled frequency mask; neither continuous-band compliance nor global minimum cost is proven. [Model](#source-model) · [Optimizer](#source-optimizer) · [Tests](#source-tests).

The frequency crossover and rejection rule use the project's lumped inductance model; they do not establish a general bound for all physical PDNs. Actual capacitor bias derating, mounting and package/die parasitics require appropriate inputs. Unlike KiPI, this library does not extract the physical board network. [Overview](#source-overview).

## Reviewed maintenance

The August 5 initial implementation is followed by August 19 effective-capacitance derating, a cached-admittance search, and a regression-backed correction preventing an invalid reversed sweep from falsely passing an infeasible target. Public development evidence is limited to these dates. No numerical results were independently reproduced, and no qualifying AI-development attribution was established. [Search and derating change](#source-earlier) · [Frequency-band correction](#source-activity).
