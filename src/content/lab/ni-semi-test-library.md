---
name: "NI Semiconductor Test Library"
aliases: ["Semiconductor Test Library for .NET","NI STS"]
description: "C#/.NET library for NI Semiconductor Test System test-program development. Pin- and site-aware instrument sessions and results support DC power measurements, digital pattern execution, parallel instrument operations and reusable TestStand steps, including example SPI/I2C register access."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "MIT-style source license; requires compatible NI STS software, native instrument drivers and .NET Framework. Physical testing requires the corresponding instruments and tester configuration."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/ni/semi-test-library-dotnet"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/ni/semi-test-library-dotnet/commit/ac1de16ce8358129bc46f045aa689d97bda0788f"
  - id: pin-groups
    title: "August merged and ganged SMU pin handling and unit regressions"
    url: "https://github.com/ni/semi-test-library-dotnet/commit/4363262c607fba97449eda462dbdf079bee156e2"
  - id: register-io
    title: "Retained per-site register pattern and waveform example implementation"
    url: "https://github.com/ni/semi-test-library-dotnet/blob/361110d9019ee6f976ea78e22f4ef1d4d8854c94/Examples/source/Sequence/RegisterIO.SPI-I2C/Code%20Modules/DutControl/DigitalProtocol.cs"
  - id: dc-measure
    title: "Retained pin/site-aware DC measurement and compliance implementation"
    url: "https://github.com/ni/semi-test-library-dotnet/blob/361110d9019ee6f976ea78e22f4ef1d4d8854c94/SemiconductorTestLibrary.Extensions/source/InstrumentAbstraction/DCPower/Measure.cs"
  - id: nimi-python
    title: "Related modular instrument Python binding implementation"
    url: "https://github.com/ni/nimi-python/blob/56d2479f12043923eb29201a1d6dd975264f2aa8/generated/nidigital/nidigital/session.py"
---

## Scope and limits

The extension library expresses instrument settings and measured results using pin and site data, including merged or ganged source-measure channels. The register-I/O example writes source waveforms, executes patterns and retrieves per-site capture data. Test follows reusable test steps and sequence examples, not a standalone implementation of the proprietary TestStand execution environment. [DC measurement](#source-dc-measure) · [Register I/O](#source-register-io).

The source is useful for reviewing production test interface design, including site-dependent data and shared channels. Native drivers and STS software remain separate requirements; inspected examples and unit tests do not establish physical timing or measurement accuracy.

## Reviewed maintenance

August 2026 corrects how DC power getters return results for ganged and merged pins, with unit regressions. November masks register addresses and values to configured bit widths in the SPI/I2C example, including site-specific write data. The reviewed revision retains these operations. [Pin-group correction](#source-pin-groups) · [Register width correction](#source-activity).

## Related workflow

The separate nimi-python project generates direct modular-instrument Python bindings, including digital pattern and PPMU operations. This library instead provides a higher-level C# abstraction for pin/site results and STS test sequences. Both depend on NI native instrument drivers; they are not independent evidence of hardware behavior. [Python digital session](#source-nimi-python).
