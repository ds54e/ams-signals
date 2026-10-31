---
name: SerDesSystemCProject
summary: Behavioral SerDes link simulation in SystemC and SystemC-AMS, with transmitter, channel, equalizer and clock/data-recovery models.
description: "Behavioral SerDes link simulator in SystemC/SystemC-AMS, covering transmitter, channel, equalization and clock/data recovery. Recent work applies modeled channel transport delay and adds phase/noise BER exploration; per-input MIMO delay skew remains approximated, and numerical link studies do not establish transistor-level accuracy or protocol compliance."
scope:
  simulation:
    ai: false
access: Public C++/Python source; requires compatible SystemC/SystemC-AMS libraries and configured link parameters.
addedAt: '2026-10-18'
reviewedAt: "2026-10-31"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/LewisLiuLiuLiu/SerDesSystemCProject
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/LewisLiuLiuLiu/SerDesSystemCProject/blob/5aaf3e864e9eafe121a69f122c9bbbaf3393d654/README.md
- id: activity
  title: 'feat(rx): clean 1/UI data_out via data-strobe latch (approved)'
  url: https://github.com/LewisLiuLiuLiu/SerDesSystemCProject/commit/751f125d46291eaaf1f3c67712c85266606564dd
- id: implementation-1
  title: 'Released implementation: src/ams/rx_ctle.cpp'
  url: https://github.com/LewisLiuLiuLiu/SerDesSystemCProject/blob/5aaf3e864e9eafe121a69f122c9bbbaf3393d654/src/ams/rx_ctle.cpp
- id: implementation-2
  title: 'Released implementation: src/ams/data_strobe_latch.cpp'
  url: https://github.com/LewisLiuLiuLiu/SerDesSystemCProject/blob/5aaf3e864e9eafe121a69f122c9bbbaf3393d654/src/ams/data_strobe_latch.cpp
- id: review-20261031-delay
  title: Apply channel transport delay and correct S21 testbench excitation
  url: https://github.com/LewisLiuLiuLiu/SerDesSystemCProject/commit/13e66704854874f13ee30209a8650da18fd1fdba
- id: review-20261031-ber
  title: Phase/noise BER sweeps and zero-E refit option
  url: https://github.com/LewisLiuLiuLiu/SerDesSystemCProject/commit/3095b58badecf22a1ec0f64d0a7206881cea5e96
---

### Implementation and boundaries

The CTLE and data-strobe latch are concrete AMS/DE behavioral implementations. The selected receive-data latch change improves the modeled output stream and includes tests. Conventional adaptation and numerical modeling do not establish AI. Protocol examples are not evidence of certified protocol conformance or electrical silicon correlation. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `751f125d46291eaaf1f3c67712c85266606564dd` (2026-10-17 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Channel delay and phase-aware exploration

The October 18 correction applies the previously parsed full_model.delay_s through per-output delay buffers and isolates the S21 path in the channel testbench. The main driven input determines each output's delay; per-input delay skew within the shared MIMO state is explicitly not modeled. The same day's BER tools add phase/noise sweeps and a refit option forcing the E matrix to zero. Model-specific sample phase and fit quality remain material, so the reported BER and comparison results are not generalized accuracy claims. [Delay implementation and boundary](#source-review-20261031-delay) · [BER tools](#source-review-20261031-ber).

The meaningful checkpoint is the first-parent BER-tool implementation at October 18 UTC, separately from the later documentation commit. Existing canonical history was already captured through that latest commit and is recaptured for this review. No SystemC/AMS or channel comparison campaign was independently executed.
