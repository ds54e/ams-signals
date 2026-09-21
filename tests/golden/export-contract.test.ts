import { expect } from '@playwright/test';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import {
  buildExportPayload,
  EXPORT_EXCLUDED_EVENT_IDS,
  EXPORT_EXCLUDED_PERSON_IDS,
} from '../../src/lib/export.ts';

async function readEntries(relative: string) {
  const directory = new URL(`../../src/data/${relative}/`, import.meta.url);
  return Promise.all((await readdir(directory))
    .filter((file) => file.endsWith('.json'))
    .map(async (file) => ({ data: JSON.parse(await readFile(new URL(file, directory), 'utf8')) })));
}

const [companyEntries, peopleEntries, eventEntries] = await Promise.all([
  readEntries('companies'),
  readEntries('people'),
  readEntries('events'),
]);
const expectedPeopleEntries = peopleEntries.filter(({ data }) => !EXPORT_EXCLUDED_PERSON_IDS.has(data.id));
const expectedEventEntries = eventEntries.filter(({ data }) => !EXPORT_EXCLUDED_EVENT_IDS.has(data.id));

test('canonical export payload contains the complete factual corpus', () => {
  const payload = buildExportPayload(companyEntries, peopleEntries, eventEntries);
  expect(Object.keys(payload)).toEqual(['schemaVersion', 'project', 'companies', 'people', 'events']);
  expect(payload.schemaVersion).toBe(1);
  expect(payload.project).toEqual({
    name: 'AMS Signals',
    scope: 'Public factual signals in RNM and mixed-signal verification.',
    notes: expect.any(Array),
  });
  expect(payload.project.notes).toHaveLength(4);
  expect(payload).not.toHaveProperty('analysis');
  expect(payload.companies).toHaveLength(companyEntries.length);
  expect(payload.people).toHaveLength(expectedPeopleEntries.length);
  expect(payload.events).toHaveLength(expectedEventEntries.length);
  expect(payload.people.map(({ id }) => id)).not.toContain('lunlun');
  expect(payload.events.map(({ id }) => id)).not.toContain('lunlun-2024-initial-real-time-representation');
  expect(payload.events.map(({ id }) => id)).not.toContain('lunlun-2025-3-0-dynamic-behavior');

  expect(payload.companies.map(({ name }) => name)).toEqual(
    payload.companies.map(({ name }) => name).slice().sort((left, right) => left.localeCompare(right, 'en')),
  );
  expect(payload.people.map(({ name }) => name)).toEqual(
    payload.people.map(({ name }) => name).slice().sort((left, right) => left.localeCompare(right, 'en')),
  );
  expect(payload.events.map(({ id }) => id)).toEqual(payload.events.slice().sort((left, right) => (
    right.when.start.localeCompare(left.when.start) || left.id.localeCompare(right.id, 'en')
  )).map(({ id }) => id));

  expect(payload.events.filter(({ kind }) => kind === 'technical')).toHaveLength(expectedEventEntries.filter(({ data }) => data.kind === 'technical').length);
  expect(payload.events.filter(({ kind }) => kind === 'organizational')).toHaveLength(expectedEventEntries.filter(({ data }) => data.kind === 'organizational').length);
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.arrayContaining([
    'bosch-sensortec',
    'bosch',
    'cirrus-logic',
    'hitachi',
    'kioxia',
    'marvell',
    'qorvo',
    'rohm',
    'silicon-labs',
    'toppan',
  ]));
  expect(payload.people.map(({ id }) => id)).toEqual(expect.arrayContaining([
    'carsten-wegener',
    'felix-assmann',
    'gautham-sathyan',
    'keiichi-kajino',
    'selcuk-talay',
    'tomokatsu-mizukusa',
  ]));
  const japanWaveEventIds = [
    'sony-semiconductor-solutions-2022-cis-rnm-spec-verification',
    'sony-semiconductor-solutions-2024-automotive-cis-analog-fault-verification',
    'kioxia-2025-flash-memory-ams-cosim-verification',
    'toppan-2025-cis-full-chip-mixed-signal-verification',
    'hitachi-2015-rnm-full-chip-mixed-signal-verification',
    'renesas-2023-sv-udn-rnm-power-switched-capacitor-modeling',
    'rohm-2022-model-based-mixed-signal-ic-verification',
    'sitime-2023-keiichi-kajino-japan-verification-manager',
    'renesas-2011-2014-mizukusa-wreal-uvm-ams-verification',
  ];
  expect(payload.events.map(({ id }) => id)).toEqual(expect.arrayContaining(japanWaveEventIds));
  const overseasPeopleWaveEventIds = [
    'apple-2026-pmu-ams-design-verification-team-hiring',
    'bosch-sensortec-2015-uvm-wreal-full-chip-mixed-signal-verification',
    'bosch-sensortec-2026-agentic-ai-mixed-signal-verification-hiring',
    'cirrus-logic-2026-top-down-mixed-signal-verification',
    'dialog-semiconductor-2014-selcuk-talay-ams-top-level-dv-lead',
    'dialog-semiconductor-2016-mixed-signal-model-validation',
  ];
  expect(payload.events.map(({ id }) => id)).toEqual(expect.arrayContaining(overseasPeopleWaveEventIds));
  const overseasPeopleWaveEvents = new Map(payload.events
    .filter(({ id }) => overseasPeopleWaveEventIds.includes(id))
    .map((event) => [event.id, event]));
  expect(overseasPeopleWaveEvents.size).toBe(6);
  expect(overseasPeopleWaveEvents.get('cirrus-logic-2026-top-down-mixed-signal-verification')).toEqual(
    expect.objectContaining({ companies: ['cirrus-logic'], people: ['gautham-sathyan'] }),
  );
  expect(overseasPeopleWaveEvents.get('dialog-semiconductor-2014-selcuk-talay-ams-top-level-dv-lead')).toEqual(
    expect.objectContaining({ companies: ['renesas'], people: ['selcuk-talay'] }),
  );
  expect(overseasPeopleWaveEvents.get('apple-2026-pmu-ams-design-verification-team-hiring')).toEqual(
    expect.objectContaining({ companies: ['apple'], people: ['selcuk-talay'] }),
  );
  expect(overseasPeopleWaveEvents.get('bosch-sensortec-2015-uvm-wreal-full-chip-mixed-signal-verification')).toEqual(
    expect.objectContaining({ companies: ['bosch-sensortec', 'cadence'], people: ['felix-assmann'] }),
  );
  expect(overseasPeopleWaveEvents.get('bosch-sensortec-2026-agentic-ai-mixed-signal-verification-hiring')).toEqual(
    expect.objectContaining({ companies: ['bosch-sensortec'], people: [] }),
  );
  expect(overseasPeopleWaveEvents.get('dialog-semiconductor-2016-mixed-signal-model-validation')).toEqual(
    expect.objectContaining({ companies: ['renesas'], people: ['carsten-wegener'] }),
  );
  expect([...overseasPeopleWaveEvents.values()].every((event) => !Object.hasOwn(event, 'affiliationChange'))).toBe(true);
  expect(payload.events.filter(({ people }) => people.includes('felix-assmann')).map(({ id }) => id))
    .toEqual(['bosch-sensortec-2015-uvm-wreal-full-chip-mixed-signal-verification']);

  const globalWaveCompanyIds = [
    'ams-osram',
    'google',
    'hewlett-packard',
    'ibm',
    'infineon',
    'intel',
    'mathworks',
    'medtronic',
    'meta',
    'roche-sequencing-solutions',
    'samsung',
    'stmicroelectronics',
    'toshiba-electronic-devices-storage',
  ];
  const globalWavePeopleIds = [
    'neyaz-khan',
    'scott-little',
    'sebastian-simon',
    'vijay-kumar',
  ];
  const globalWaveEventIds = [
    'freescale-2010-trace-generated-ams-models',
    'freescale-2011-realtime-ams-assertions',
    'medtronic-2011-metric-driven-mixed-signal-verification',
    'lsi-2011-2012-hdd-preamplifier-rnm-verification',
    'maxim-2012-uvm-ms-mixed-signal-soc-verification',
    'ibm-2013-wreal-rnm-mixed-signal-verification',
    'infineon-2014-analog-uvm-model-validation',
    'stmicroelectronics-2014-analog-model-equivalence-validation',
    'texas-instruments-2014-specification-driven-ams-testbench-automation',
    'infineon-2014-upf-power-aware-mixed-signal-verification',
    'texas-instruments-2014-ams-interface-automation',
    'xilinx-2015-octave-rnm-uvm-verification',
    'hewlett-packard-2015-digital-centric-serdes-ams-verification',
    'analog-devices-2016-automatic-real-number-abstraction',
    'infineon-2016-automotive-uvm-ams-verification',
    'texas-instruments-2016-cpf-ams-power-verification',
    'infineon-2018-automated-rnm-generation-validation',
    'texas-instruments-2019-eenet-loading-verification',
    'roche-2019-complex-udn-mixed-signal-verification',
    'dialog-semiconductor-2020-chip-level-analog-regressions',
    'dialog-semiconductor-2020-unified-rtl-dms-ams-testbench',
    'analog-devices-2021-upf-dms-low-power-verification',
    'toshiba-2021-accu-rom-automotive-verification',
    'samsung-2022-ssd-pmic-sv-rnm-verification',
    'samsung-2023-oled-pmic-uvm-mixed-signal-verification',
    'meta-2024-dv-uvm-ams-co-simulation',
    'analog-devices-2024-ai-assisted-ams-verification',
    'samsung-2024-display-pmic-uvm-ams-spice-verification',
    'samsung-2024-sv-udt-eenet-pmic-verification',
    'ams-osram-2025-ams-dms-functional-coverage',
    'cirrus-logic-2025-system-model-reuse-mixed-signal-verification',
    'google-2026-high-speed-phy-rnm-verification-hiring',
    'nxp-2026-advanced-power-ams-verification-lead-hiring',
  ];
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.arrayContaining(globalWaveCompanyIds));
  expect(payload.people.map(({ id }) => id)).toEqual(expect.arrayContaining(globalWavePeopleIds));
  expect(payload.events.map(({ id }) => id)).toEqual(expect.arrayContaining(globalWaveEventIds));

  const globalWaveEvents = payload.events.filter(({ id }) => globalWaveEventIds.includes(id));
  expect(globalWaveEvents).toHaveLength(33);
  expect(globalWaveEvents.filter(({ kind }) => kind === 'technical')).toHaveLength(31);
  expect(globalWaveEvents.filter(({ kind }) => kind === 'organizational')).toHaveLength(2);
  expect(globalWaveEvents.every((event) => !Object.hasOwn(event, 'affiliationChange'))).toBe(true);
  expect(globalWaveEvents
    .filter(({ id }) => ![
    'google-2026-high-speed-phy-rnm-verification-hiring',
    'xilinx-2015-octave-rnm-uvm-verification',
  ].includes(id))
    .flatMap(({ sources }) => sources)
    .every(({ checkedAt }) => checkedAt === '2026-08-30')).toBe(true);
  expect(payload.events.find(({ id }) => id === 'google-2026-high-speed-phy-rnm-verification-hiring').sources
  .map(({ checkedAt }) => checkedAt)).toEqual(['2026-09-14']);
expect(payload.events.find(({ id }) => id === 'xilinx-2015-octave-rnm-uvm-verification').sources
    .map(({ checkedAt }) => checkedAt)).toEqual(['2026-09-02', '2026-09-02']);
  expect(payload.events.find(({ id }) => id === 'cadence-2012-real-valued-systemverilog-coverage')).toEqual(
    expect.objectContaining({
      companies: ['cadence', 'intel'],
      people: ['prabal-bhattacharya', 'scott-little'],
    }),
  );
  expect(new Set(payload.events.filter(({ people }) => people.includes('neyaz-khan')).map(({ id }) => id))).toEqual(
    new Set([
      'lsi-2011-2012-hdd-preamplifier-rnm-verification',
      'maxim-2012-uvm-ms-mixed-signal-soc-verification',
    ]),
  );
  expect(new Set(payload.events.filter(({ people }) => people.includes('sebastian-simon')).map(({ id }) => id))).toEqual(
    new Set([
      'infineon-2014-analog-uvm-model-validation',
      'infineon-2018-automated-rnm-generation-validation',
      'nxp-infineon-2018-uvm-ms-standardization-ideas',
    ]),
  );
  expect(new Set(payload.events.filter(({ people }) => people.includes('vijay-kumar')).map(({ id }) => id))).toEqual(
    new Set([
      'samsung-2022-ssd-pmic-sv-rnm-verification',
      'samsung-2023-oled-pmic-uvm-mixed-signal-verification',
      'samsung-2024-sv-udt-eenet-pmic-verification',
    ]),
  );

  const leadingSignalsCompanyIds = [
    'amd',
    'coseda-technologies',
    'designers-guide-consulting',
    'innophase',
    'micron',
    'microsoft',
    'thine-electronics',
    'ulkasemi',
  ];
  const leadingSignalsPeopleIds = [
    'aadhar-sharma',
    'guha-lakshmanan',
    'henry-chang',
    'simul-barua',
    'stijn-ringeling',
    'thilo-voertler',
    'venkateswaran-padmanabhan',
  ];
  const leadingSignalsEventIds = [
    'amd-2026-pll-ams-verification-lead-hiring',
    'ams-osram-2025-early-power-dms-modeling',
    'analog-devices-2026-ai-ml-ams-verification-hiring',
    'apple-2026-london-ams-dv-team-hiring',
    'cadence-2026-generative-ai-rnm-internship',
    'cadence-2026-metamorphic-testing-rnm',
    'coseda-2022-systemc-ams-abv-library',
    'coseda-2025-systemc-ams-assertion-library',
    'innophase-2024-uvm-testbench-automation-ams',
    'microchip-2026-selective-spice-digital-top-verification',
    'micron-2026-ams-verification-ai-assisted-coding-hiring',
    'microsoft-2025-additive-ai-bandgap-verification',
    'nxp-2025-gyroscope-uvm-ms-modeling',
    'nxp-2025-sigma-delta-model-evaluation-acceleration',
    'nxp-2026-ai-high-sigma-analog-verification',
    'samsung-2026-ams-verification-hiring',
    'stijn-ringeling-2026-ml-sigma-delta-evaluation',
    'stmicroelectronics-2025-ai-high-sigma-analog-verification',
    'stmicroelectronics-2025-full-chip-spice-verification',
    'stmicroelectronics-2025-upf-rnm-sram-verification',
    'synopsys-2026-serdes-ams-verification-manager-hiring',
    'texas-instruments-2023-ml-waveform-prediction',
    'texas-instruments-2024-adaptive-ams-glitch-checkers',
    'texas-instruments-2025-analog-assertion-coverage-toolbox',
    'texas-instruments-2025-eenet-analog-test-bus',
    'texas-instruments-2025-patent-ml-rnm-generation',
    'texas-instruments-2026-ana-modelgen-ams-model-generation',
    'texas-instruments-2026-uvm-ms-analog-vip',
    'thine-electronics-2025-ai-phase-interpolator-verification',
    'ulkasemi-2024-full-chip-uvm-analog-verification',
    'ulkasemi-2025-amsv-uvm-utility',
  ];
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.arrayContaining(leadingSignalsCompanyIds));
  expect(payload.people.map(({ id }) => id)).toEqual(expect.arrayContaining(leadingSignalsPeopleIds));
  expect(payload.events.map(({ id }) => id)).toEqual(expect.arrayContaining(leadingSignalsEventIds));
  const leadingSignalsEvents = payload.events.filter(({ id }) => leadingSignalsEventIds.includes(id));
  expect(leadingSignalsEvents).toHaveLength(31);
  expect(leadingSignalsEvents.filter(({ kind }) => kind === 'technical')).toHaveLength(24);
  expect(leadingSignalsEvents.filter(({ kind }) => kind === 'organizational')).toHaveLength(7);
  expect(leadingSignalsEvents.every((event) => !Object.hasOwn(event, 'affiliationChange'))).toBe(true);
  expect(leadingSignalsEvents.flatMap(({ sources }) => sources)
    .every(({ checkedAt }) => checkedAt === '2026-08-31')).toBe(true);
  expect(payload.events.find(({ id }) => id === 'stijn-ringeling-2026-ml-sigma-delta-evaluation')).toEqual(
    expect.objectContaining({ companies: [], people: ['stijn-ringeling'] }),
  );

  const recentSignalsExpansionEventIds = [
    'amd-2024-mixed-signal-sdf-gatesim-automation',
    'ams-osram-2026-ams-dms-methodology-lead-hiring',
    'analog-devices-2023-sip-connectivity-test-automation',
    'bosch-2025-cross-level-mixed-signal-verification',
    'broadcom-2026-clocking-msv-rnm-hiring',
    'cirrus-logic-2025-mixed-signal-modeling-verification-hiring',
    'eliyan-2026-serdes-rnm-verification-hiring',
    'infineon-2024-ams-rnm-verification-hiring',
    'infineon-2024-analog-verification-automation-hiring',
    'infineon-2025-ai-sv-rnm-modeling',
    'marvell-2026-serdes-ams-ip-verification-hiring',
    'micron-2026-ddr-onfi-uvm-ams-verification-hiring',
    'monolithic-power-systems-2026-mixed-signal-verification-framework-hiring',
    'mythic-2025-analog-compute-rnm-verification-hiring',
    'neurophos-2026-photonic-ai-ams-model-verification-hiring',
    'nxp-2026-serdes-ams-verification-hiring',
    'olix-2026-high-speed-io-ams-verification-hiring',
    'onsemi-2026-power-management-ams-methodology-hiring',
    'onsemi-2026-treo-analog-ip-mixed-signal-verification-hiring',
    'qorvo-2026-power-management-mixed-signal-verification-hiring',
    'renesas-2025-top-down-ams-verification-automation-hiring',
    'samsung-2021-ddr4-3ds-channel-model-verification',
    'samsung-2022-embedded-nvm-esp-verification',
    'samsung-2024-mram-variation-aware-systemverilog-modeling',
    'semtech-2026-mixed-signal-ic-verification-hiring',
    'silicon-labs-2025-rnm-ams-verification-hiring',
    'sony-semiconductor-solutions-2023-lidar-analog-model-system-simulation',
    'sony-semiconductor-solutions-2023-pixel-analog-timing-assertions',
    'synopsys-2023-power-aware-rnm-patent',
    'texas-instruments-2021-eenet-charge-pump-modeling',
  ];
  const recentSignalsExpansionCompanyIds = [
    'bosch',
    'eliyan',
    'marvell',
    'monolithic-power-systems',
    'mythic',
    'neurophos',
    'olix',
    'onsemi',
    'qorvo',
    'semtech',
    'silicon-labs',
  ];
  const recentSignalsExpansionEvents = payload.events
    .filter(({ id }) => recentSignalsExpansionEventIds.includes(id));
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.arrayContaining(recentSignalsExpansionCompanyIds));
  expect(payload.events.map(({ id }) => id)).toEqual(expect.arrayContaining(recentSignalsExpansionEventIds));
  expect(recentSignalsExpansionEvents).toHaveLength(30);
  expect(recentSignalsExpansionEvents.filter(({ kind }) => kind === 'technical')).toHaveLength(11);
  expect(recentSignalsExpansionEvents.filter(({ kind }) => kind === 'organizational')).toHaveLength(19);
  expect(recentSignalsExpansionEvents.every((event) => !Object.hasOwn(event, 'affiliationChange'))).toBe(true);
  for (const event of recentSignalsExpansionEvents) {
    const expectedCheckDate = event.id === 'qorvo-2026-power-management-mixed-signal-verification-hiring'
      ? '2026-09-09'
      : '2026-08-31';
    expect(event.sources.every(({ checkedAt }) => checkedAt === expectedCheckDate), event.id).toBe(true);
  }

  const canonicalCompanyIds = [
    'siemens-eda', 'nxp', 'renesas', 'analog-devices', 'amd', 'broadcom',
  ];
  const payloadCompanyCounts = new Map(payload.companies.map(({ id }) => [
    id,
    payload.events.filter((event) => event.companies.includes(id)).length,
  ]));
  const sourceCompanyCounts = new Map(companyEntries.map(({ data: { id } }) => [
    id,
    expectedEventEntries.filter(({ data }) => data.companies.includes(id)).length,
  ]));
  expect(Object.fromEntries(canonicalCompanyIds.map((id) => [id, payloadCompanyCounts.get(id)])))
    .toEqual(Object.fromEntries(canonicalCompanyIds.map((id) => [id, sourceCompanyCounts.get(id)])));
  const legacyCompanyIds = [
    'mentor-graphics',
    'freescale-semiconductor',
    'dialog-semiconductor',
    'maxim-integrated',
    'xilinx',
    'lsi',
  ];
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.not.arrayContaining(legacyCompanyIds));
  expect(payload.events.flatMap(({ companies }) => companies)).toEqual(expect.not.arrayContaining(legacyCompanyIds));
  expect(Object.fromEntries(payload.companies
    .filter(({ id }) => [
      'analog-devices', 'cadence', 'coseda-technologies', 'designers-guide-consulting',
      'hewlett-packard', 'infineon', 'microchip', 'micron', 'nxp', 'renesas',
      'roche-sequencing-solutions', 'skyworks', 'sony-semiconductor-solutions',
      'stmicroelectronics', 'texas-instruments', 'thine-electronics',
      'toshiba-electronic-devices-storage',
    ].includes(id))
    .map(({ id, name }) => [id, name]))).toEqual({
    'analog-devices': 'Analog Devices',
    cadence: 'Cadence',
    'coseda-technologies': 'COSEDA',
    'designers-guide-consulting': "Designer's Guide",
    'hewlett-packard': 'HP',
    infineon: 'Infineon',
    microchip: 'Microchip',
    micron: 'Micron',
    nxp: 'NXP',
    renesas: 'Renesas',
    'roche-sequencing-solutions': 'Roche Sequencing',
    skyworks: 'Skyworks',
    'sony-semiconductor-solutions': 'Sony Semiconductor',
    stmicroelectronics: 'STMicroelectronics',
    'texas-instruments': 'Texas Instruments',
    'thine-electronics': 'THine',
    'toshiba-electronic-devices-storage': 'Toshiba',
  });

  expect(payload.events.map(({ id }) => id)).not.toContain('sitime-2026-07-renesas-timing-acquisition');
  for (const event of payload.events) {
    expect(event).toEqual(expect.objectContaining({
      id: expect.any(String),
      when: expect.any(Object),
      kind: expect.stringMatching(/^(technical|organizational)$/),
      companies: expect.any(Array),
      people: expect.any(Array),
      headline: expect.any(String),
      fact: expect.any(String),
      sources: expect.any(Array),
      recordUrl: `https://ds54e.github.io${basePath}events/${event.id}/`,
    }));
    expect(event.sources.length).toBeGreaterThan(0);
    for (const source of event.sources) {
      expect(source).toEqual(expect.objectContaining({
        title: expect.any(String),
        url: expect.stringMatching(/^https?:\/\//),
        checkedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        summary: expect.any(String),
        status: expect.stringMatching(/^(available|unavailable)$/),
      }));
      expect(Object.hasOwn(source, 'archiveUrl')).toBe(true);
      expect(source.archiveUrl === null || /^https?:\/\//.test(source.archiveUrl)).toBe(true);
    }
  }
});

