---
name: "ACM MOSFET Models"
aliases: ["ACM2", "ACM3", "Advanced Compact MOSFET"]
summary: "Design-oriented charge-based MOSFET models with parameter extraction and circuit examples."
description: "Charge-based ACM2 and ACM3 Verilog-A MOSFET models with five and eight DC parameters respectively, companion I-V fitting notebooks, and IHP SG13G2 model cards. Device and circuit examples exercise the models in ngspice; the supplied temperature, flicker-noise and mismatch coefficients have not been extracted."
scope:
  simulation: { ai: false }
access: "Educational Community License 2.0 (ECL-2.0). The ngspice examples require compiled OpenVAF/OSDI models; other technologies require appropriate parameter extraction and validation data."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public model implementation and extraction notebooks"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models"
    purpose: code
  - id: activity
    title: "October 5 integration of ACM2 2.0.0 and ACM3 3.0.0"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models/commit/f1daa8225cc9ae66c0eae13f70cd1b98c2d5e22e"
  - id: earlier
    title: "May 28 ACM2 executable LNA notebook update"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models/commit/99b081bc0460690714c9a9c670d5d77d07a31d17"
  - id: acm2
    title: "ACM2 charge and noise implementation"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models/blob/494cdf011158859aa887079c010decedd0ccf0cb/models/acm2.va"
  - id: acm3
    title: "ACM3 charge and noise implementation"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models/blob/494cdf011158859aa887079c010decedd0ccf0cb/models/acm3.va"
  - id: fit
    title: "ACM3 executable parameter extraction and model-card generation"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models/blob/494cdf011158859aa887079c010decedd0ccf0cb/colab/ACM3_Parameter_Extraction.ipynb"
  - id: cards
    title: "IHP SG13G2 fit conditions, provenance and unextracted coefficients"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models/blob/494cdf011158859aa887079c010decedd0ccf0cb/cards/README.md"
  - id: oscillator
    title: "ACM3 cross-coupled LC oscillator example"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models/blob/494cdf011158859aa887079c010decedd0ccf0cb/examples/ngspice/lc_vco/lc_vco_acm3.cir"
  - id: license
    title: "Reviewed Educational Community License 2.0"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models/blob/494cdf011158859aa887079c010decedd0ccf0cb/LICENSE"
  - id: release
    title: "ACM2 2.0.0 and ACM3 3.0.0 release"
    url: "https://github.com/ACMmodel/ACM-MOSFET-models/releases/tag/v2.0.0"
---

## Scope and limits

This is a dedicated model family rather than a multi-model distribution such as VA-Models or a simulator-backed general extraction framework such as Compyct. The retained models implement terminal charge, junction and overlap currents, thermal and flicker-noise terms, and optional gate-resistance noise. ACM3 extends the DC formulation with body-effect, mobility and inversion-dependent DIBL parameters. The extraction notebook provides conventional numerical optimization of I-V curves and derivatives using differential evolution and least-squares refinement, and exports a model card. It does not independently establish model accuracy outside the extraction domain. [ACM2 implementation](#source-acm2) · [ACM3 implementation](#source-acm3) · [Extraction notebook](#source-fit).

The supplied IHP cards use public measured DC curves at 27 C and zero body/source bias. Junction and capacitance parameters are fitted to the IHP PSP103 reference card, not independent capacitance measurements. Temperature, flicker-noise and mismatch coefficients remain model defaults; gate resistance is provided separately by the user. ACM3 body-effect parameters are effective values at the extraction bias. These are not qualified cards for a different process node. The included LC-VCO deck measures frequency and amplitude in transient analysis, not autonomous phase noise or integrated jitter. [Card boundaries](#source-cards) · [Oscillator example](#source-oscillator).

## Reviewed maintenance

May 28 updates an executable ACM2 LNA-design notebook. October 5 integrates the unified ACM2 and new ACM3 models, fit notebooks, IHP cards and circuit examples. The later October 7 model-page integration remains the raw activity checkpoint; release v2.0.0 distributes ACM2 2.0.0 and ACM3 3.0.0. The new model interface is not interchangeable with legacy ACM2 2V0 cards. No model fit, simulator run or numerical agreement was independently reproduced. [May update](#source-earlier) · [October integration](#source-activity) · [Release](#source-release) · [License](#source-license).
