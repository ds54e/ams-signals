---
name: "acm-fit"
aliases: ["ACM-5 fitting","ACM2 extraction"]
summary: "Extracts ACM-5 compact-model parameters and evaluates electrical responses against BSIM reference curves."
description: "Python pipeline fitting the ACM-5 Verilog-A MOSFET model to frozen BSIM or user-supplied Id–Vg curves using staged and numerical search strategies. It includes PTM scaling targets and separate DC, AC, noise, temperature and transient comparisons; the PTM references are simulated rather than measured silicon."
scope: {"simulation":{"ai":false}}
access: "CC BY 4.0 for the package; bundled model terms are separate. Python, ngspice and OpenVAF for the documented open simulator path; live PDK reference capture requires local model resources."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/SJTU-YONGFU-RESEARCH-GRP/acm-fit"
    purpose: code
  - id: activity
    title: "September 5 model-tier fit profile resolution repair"
    url: "https://github.com/SJTU-YONGFU-RESEARCH-GRP/acm-fit/commit/b4329b60cc0f964aee47616126f56994ce2239c0"
  - id: earlier
    title: "September 2 fit benchmark checkpoint and pipeline changes"
    url: "https://github.com/SJTU-YONGFU-RESEARCH-GRP/acm-fit/commit/42b50fb3a5c9052257a7e39333000f6827c1d6e1"
  - id: fit
    title: "DC model fitting implementation"
    url: "https://github.com/SJTU-YONGFU-RESEARCH-GRP/acm-fit/blob/9667c2db99f44762a4d39663e59dbeb900fcf978/src/acm/opt/fit.py"
  - id: strategies
    title: "Implemented staged and numerical fit strategies"
    url: "https://github.com/SJTU-YONGFU-RESEARCH-GRP/acm-fit/blob/9667c2db99f44762a4d39663e59dbeb900fcf978/src/acm/opt/strategies.py"
  - id: profile
    title: "Retained model-tier fit profile selection"
    url: "https://github.com/SJTU-YONGFU-RESEARCH-GRP/acm-fit/blob/9667c2db99f44762a4d39663e59dbeb900fcf978/src/acm/opt/profiles.py"
  - id: eval
    title: "Parallel electrical evaluation suite"
    url: "https://github.com/SJTU-YONGFU-RESEARCH-GRP/acm-fit/blob/9667c2db99f44762a4d39663e59dbeb900fcf978/src/acm/eval/suite.py"
  - id: ptm45
    title: "Frozen PTM 45 nm reference metadata"
    url: "https://github.com/SJTU-YONGFU-RESEARCH-GRP/acm-fit/blob/9667c2db99f44762a4d39663e59dbeb900fcf978/data/golden/ptm/ptm45/meta.json"
  - id: overview
    title: "Reviewed workflow and licensing boundaries"
    url: "https://github.com/SJTU-YONGFU-RESEARCH-GRP/acm-fit/blob/9667c2db99f44762a4d39663e59dbeb900fcf978/README.md"
---

## Scope and limits

The package provides an executable reference-to-model fitting and comparison pipeline, distinct from the ACM MOSFET Models listing, which distributes the ACM2 and ACM3 model implementations and their own extraction notebooks. acm-fit operates on frozen BSIM reference curves or user Id–Vg CSVs and compares the demonstrated ACM-5 model through separate electrical analyses. Staged fitting and numerical search are model calibration operations; no independently exposed learned electrical-response predictor was established in this review. [Fit](#source-fit) · [Strategies](#source-strategies) · [Evaluation](#source-eval).

The PTM45 NMOS reference metadata specifies L = 45 nm, W = 1 micrometre, VDD = 1.1 V and three drain biases. These are simulated reference curves, not foundry silicon characterization. DC fitting alone does not establish capacitance, noise, temperature, transient or process-variation accuracy. The reviewed release demonstrates ACM-5, not general support for every related model tier. [PTM45 metadata](#source-ptm45) · [Overview](#source-overview).

## Reviewed maintenance

September 2 added benchmark checkpoint reconstruction and pipeline handling for completed targets. September 5 changed staged-fit profile resolution to select a uniquely matching alternative model-tier profile and reject missing or ambiguous matches. September 7 changes figure generation and remains the raw activity date. The public history is concentrated in the August/September release period; longer-term maintenance is not established. No fit or simulator run was independently reproduced. No qualifying credited AI code contribution was established from the reviewed changes. [September 2 change](#source-earlier) · [September 5 change](#source-activity) · [Retained profile logic](#source-profile).
