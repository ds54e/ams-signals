---
name: SerDesSystemCProject
summary: Behavioral SerDes link simulation in SystemC and SystemC-AMS, with transmitter, channel, equalizer and clock/data-recovery models.
description: Behavioral SerDes link simulation in SystemC and SystemC-AMS, with transmitter, channel, equalizer and clock/data-recovery models. Python analysis tools inspect eyes, jitter and error-related measurements; these system-level models support link exploration without claiming transistor-level accuracy or standards compliance.
scope:
  simulation:
    ai: false
access: Public C++/Python source; requires compatible SystemC/SystemC-AMS libraries and configured link parameters.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
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
---

### Implementation and boundaries

The CTLE and data-strobe latch are concrete AMS/DE behavioral implementations. The selected receive-data latch change improves the modeled output stream and includes tests. Conventional adaptation and numerical modeling do not establish AI. Protocol examples are not evidence of certified protocol conformance or electrical silicon correlation. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `751f125d46291eaaf1f3c67712c85266606564dd` (2026-10-17 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
