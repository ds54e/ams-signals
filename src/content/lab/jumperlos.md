---
name: "JumperlOS"
aliases: ["Jumperless V5"]
description: "Firmware for Jumperless prototyping hardware with programmable interconnections, GPIO, DAC and ADC functions. It manages routing and saved setups for bench fixtures where low-frequency circuits need repeatable electrical connections and basic measurements."
scope:
  board: { ai: false }
  control: { ai: false }
  acquisition: { ai: false }
access: "MIT firmware; Jumperless V5 hardware and documentation have separate licenses."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/Architeuthis-Flux/JumperlOS"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/Architeuthis-Flux/JumperlOS/commit/a0736901096e0440e7a05cb7ceafc77e49d07b2c"
  - id: hardware
    title: "Jumperless V5 hardware and its separate terms"
    url: "https://github.com/Architeuthis-Flux/JumperlessV5"
---

## Scope and limits

The reviewed routing repair refuses an invalid power-net join. Routing resistance, loading and bandwidth matter; this is not a calibrated fast-clock or phase-noise fixture. The published V5 hardware-in-loop instructions are not a result of our own hardware test.

[Reviewed upstream implementation](#source-activity).

Additional context: [Jumperless V5 hardware and its separate terms](#source-hardware).
