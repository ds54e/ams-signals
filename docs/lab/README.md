# Lab catalog

Lab catalogs public technical projects for evaluation boards and fixtures, instrument and DUT control, measurement acquisition and analysis, and test automation. Its hidden H1 is `Lab` and browser title `Lab · AMS Signals`. It is independent of the Golden Events corpus. See the [shared catalog contract](../catalog/CONTRACT.md) and [AI-development policy](../AI_DEVELOPMENT.md).

Classify by the primary operation and inputs/outputs. A network or EM field solver remains Analog even if it takes board files; an RTL or on-chip DFT tool remains Digital. A program that controls a DUT, acquires measurements or processes tester records belongs in Lab. A GUI and a separately usable API may each have an entry, but shared engines, parsers and instrument stacks are not independent evidence; record their relationships in notes and sources.

## Scope

Stages appear in this order. As in Analog and Digital, they describe distinct implemented operations; one project can cover several stages.

| Field | Label | Meaningful user-facing coverage |
| --- | --- | --- |
| `design` | Design | Creating, modifying or providing reusable board, fixture or measurement-hardware designs, including schematic, PCB, mechanical, fabrication and assembly outputs |
| `control` | Control | Configuring, stimulating, programming or steering an instrument, DUT, fixture, power, thermal or synchronization system |
| `acquisition` | Acquisition | Capturing, reading or subscribing to measured values, waveforms, events or timestamps from hardware or an active measurement-data path |
| `analysis` | Analysis | Reading saved measurement records, or inspecting, calibrating, decoding, fitting or transforming measured data and test results as a distinct user-facing operation |
| `test` | Test | Generating or executing repeatable measurement/test procedures, coordinating test resources and sequences, reporting outcomes or providing executable instrument fixtures for driver/system tests |

Design requires concrete hardware-design or fabrication/assembly artifacts; a reusable published board design qualifies alongside tools that generate such designs. Firmware, FPGA board definitions and instrument SDKs do not inherit that stage from the hardware they target. ERC/DRC preflight and fabrication-package checks remain part of Design. Experimental parameter selection or test-program generation alone is not hardware Design: classify the implemented analysis or test procedure instead.

Control and Acquisition remain separate. Flashing, resetting, switching and device configuration establish Control without necessarily retrieving measurements. Acquisition needs a live measured-data path; a configured stream or subscription must deliver measured payloads, not only metadata or update notifications. Reading a saved TDMS, WFM or STDF file is Analysis.

Analysis can operate on incoming or saved measurements. User-facing spectra, cross-spectra, decoding, calibration or fitted results can establish Analysis even within a live instrument workflow. Export, decompression or routine scaling that only exposes a capture does not add another stage, and internal calculations used solely for feedback remain part of Control. Distinguish an exposed measurement result from transport and implementation details.

Test does not require a pass/fail verdict: reusable characterization procedures can coordinate settings, parameter sweeps, acquisition and persisted results. Tester-program generation, a test harness, virtual instruments for driver regression, and reservation or coordination of shared test fixtures can also qualify. Generic scriptability, ordinary package unit tests, incidental acquisition loops and reading saved test results alone do not establish Test. A test runner does not inherit every Control or Acquisition capability of its device bindings.

Use the [strict Lab schema](../../src/lib/lab/schema.ts). Require at least one functional stage. Each stage records runtime AI separately from evidence-backed AI-ASSISTED development. Keep descriptions concise, in English, and distinguish public source from hardware, calibration, instrument specifications and third-party dependencies. Put limits and references in article notes; do not imply that simulation, source inspection or a synthetic check demonstrates hardware accuracy.

## Active-list eligibility

Apply the shared [selection and retention criteria](../catalog/CONTRACT.md#project-selection-and-retention), including [freshness and active-list eligibility](../catalog/CONTRACT.md#freshness-and-active-list-eligibility), to new and existing entries. For Lab, review a meaningful public implementation or test change.

Use the canonical implementation, not a mirror or companion repository. For a reviewed maintained fork used as the canonical implementation, bind the refresh allowance to its catalog slug, repository name and exact GitHub ID. Link the origin separately when it explains lineage, without adding its activity to the maintained fork's counts. The manual refresh entrypoint owns the exact exceptions.

Run `npm run validate:lab` for the content and snapshot contract and `npm run refresh:lab-activity` only when explicitly collecting activity. Use the [catalog refresh skill](../../.agents/skills/ams-signals-catalog-refresh/SKILL.md) for new registrations, captures and rollover. A failed new fetch remains marked unfetched without guessed counts; an existing good snapshot is not overwritten on failure. Build and tests work from checked-in records without contacting repository hosts.

The public surface is `/lab/`. Search, functional Scope filters, `#<id>--name` anchors and primary links follow the shared catalog index. No public ranking, status taxonomy, project detail route or JSON export is defined.
