---
name: "gds2palace"
summary: "Builds electromagnetic simulation geometry, mesh, excitation ports and configuration from GDS layout and an XML process stack."
description: "Builds electromagnetic simulation geometry, mesh, excitation ports and configuration from GDS layout and an XML process stack. The Python workflow provides examples for IHP SG13G2 and chiplet/interposer structures, with Palace as an external FEM solver."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Fable is co-credited for implementing tube-shaped via ports. The reviewed mesh setup retains generation of the port walls."
  sources: [development-code, development-retained]
  reviewedAt: "2026-11-23"
access: "GPL-3.0-or-later Python workflow; the applicable process stack, meshing dependencies and an external Palace installation are needed for solver runs."
addedAt: "2026-11-23"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/VolkerMuehlhaus/gds2palace_ihp_sg13g2"
    purpose: "code"
  - id: "website"
    title: "Official project documentation"
    url: "https://muehlhaus.com/archives/4733"
    purpose: "official"
  - id: "activity"
    title: "Reviewed substantive implementation on the default branch"
    url: "https://github.com/VolkerMuehlhaus/gds2palace_ihp_sg13g2/commit/2e26c45d928d506667393ae6b84faa53fff63891"
  - id: "evidence"
    title: "Reviewed reference or implementation example"
    url: "https://github.com/VolkerMuehlhaus/gds2palace_ihp_sg13g2/blob/e841e0b2caadb6cd6e7034f4cc3ee235437e3070/more_examples/chiplet_split_at_pillars/README.md"
  - id: "development-code"
    title: "Attributed executable implementation"
    url: "https://github.com/VolkerMuehlhaus/gds2palace_ihp_sg13g2/commit/c588e2111a2efb4db5013e4d9dfec9eaa85913a4"
  - id: "development-retained"
    title: "Retained implementation at the reviewed revision"
    url: "https://github.com/VolkerMuehlhaus/gds2palace_ihp_sg13g2/blob/e841e0b2caadb6cd6e7034f4cc3ee235437e3070/workflow/gds2palace/util_simulation_setup.py"
  - id: inductor-v5
    title: "IHP SG13G2 measured-versus-simulated inductor study"
    url: "https://github.com/VolkerMuehlhaus/gds2palace_ihp_sg13g2/blob/e841e0b2caadb6cd6e7034f4cc3ee235437e3070/more_examples/measured_vs_simulated/more_accurate_models_L6n2_v5/README.md"
  - id: boundary-study
    title: "Absorbing-boundary sensitivity"
    url: "https://github.com/VolkerMuehlhaus/gds2palace_ihp_sg13g2/blob/e841e0b2caadb6cd6e7034f4cc3ee235437e3070/more_examples/simulation_boundary/README.md"
  - id: conductor-study
    title: "Conductor loss model sensitivity"
    url: "https://github.com/VolkerMuehlhaus/gds2palace_ihp_sg13g2/blob/e841e0b2caadb6cd6e7034f4cc3ee235437e3070/more_examples/conductor_models/README.md"
---

### Implemented operations and review

The September dielectric-loss correction, October multi-element ports and November tube ports show continuing work beyond an initial release. The chiplet example compares split and joined simulations with a monolithic simulation, not measured silicon. The committed two-port files agree within 0.0293 in complex S over the 52 published points through 100 GHz; a cut plane suppresses field coupling across it. This prepares electromagnetic simulations, rather than acting as a solver or general-purpose layout editor. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).

The upstream L6n2 v5 study compares 12 variants with a measured IHP SG13G2 inductor. Its most detailed conformal volume model is reported within 0.3% in differential inductance at 1 GHz, 0.7% in peak differential Q and 1.6% in differential self-resonant frequency for that structure. Conductor-volume meshing, conformal passivation, via merging corrections and boundary placement matter. The boundary study varies lateral and vertical clearance; a lateral-only convergence test can miss vertical truncation. These reported comparisons are setup-specific and do not establish single-ended accuracy or an independent solver rerun. [Inductor study](#source-inductor-v5) · [Boundary study](#source-boundary-study) · [Conductor study](#source-conductor-study).
