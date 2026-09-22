import assert from 'node:assert/strict';
import test from 'node:test';
import { buildExportPayload, type ExportPayload } from '../../src/lib/export.ts';
import { loadGoldenCorpus } from './corpus.ts';

const BASE_PATH = '/ams-signals/';
const PUBLIC_ORIGIN = 'https://ds54e.github.io';

/**
 * Durable canonicalization regressions only.
 *
 * These fixtures assert intentional product identity: an acquired or predecessor
 * organization resolves to one canonical Company group, and named predecessor
 * Events keep the successor association their sources support. They are not import
 * receipts for a historical research wave, so they stay valid as the corpus grows.
 */

const buildPayload = async (): Promise<ExportPayload> => {
  const corpus = await loadGoldenCorpus();
  return buildExportPayload({ ...corpus, publicOrigin: PUBLIC_ORIGIN, basePath: BASE_PATH });
};

const eventById = (payload: ExportPayload, id: string) => {
  const event = payload.events.find((candidate) => candidate.id === id);
  assert.ok(event, `${id} must exist in the factual corpus`);
  return event;
};

// Acquired or renamed organizations must never reappear as canonical Companies.
const LEGACY_COMPANY_IDS = [
  'mentor-graphics',
  'freescale-semiconductor',
  'dialog-semiconductor',
  'maxim-integrated',
  'xilinx',
  'lsi',
];

// The canonical groups that replaced those legacy identities.
const CANONICAL_SUCCESSORS = ['siemens-eda', 'nxp', 'renesas', 'analog-devices', 'amd', 'broadcom'];

// Canonical public display names that are deliberate product naming, not raw source titles.
const CANONICAL_DISPLAY_NAMES: Record<string, string> = {
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
};

// Historical Event → canonical Company/Person associations whose identity is the contract.
const CANONICAL_ASSOCIATIONS: Array<[string, { companies: string[]; people: string[] }]> = [
  ['dialog-semiconductor-2014-selcuk-talay-ams-top-level-dv-lead', { companies: ['renesas'], people: ['selcuk-talay'] }],
  ['dialog-semiconductor-2016-mixed-signal-model-validation', { companies: ['renesas'], people: ['carsten-wegener'] }],
  ['dialog-semiconductor-2020-chip-level-analog-regressions', { companies: ['renesas'], people: [] }],
  ['freescale-2010-trace-generated-ams-models', { companies: ['nxp'], people: ['scott-little'] }],
  ['freescale-2011-realtime-ams-assertions', { companies: ['nxp'], people: ['scott-little'] }],
  ['maxim-2012-uvm-ms-mixed-signal-soc-verification', { companies: ['analog-devices', 'cadence'], people: ['neyaz-khan'] }],
  ['lsi-2011-2012-hdd-preamplifier-rnm-verification', { companies: ['broadcom', 'cadence'], people: ['neyaz-khan'] }],
  ['xilinx-2015-octave-rnm-uvm-verification', { companies: ['amd'], people: ['patrick-lynch'] }],
  ['infineon-2014-upf-power-aware-mixed-signal-verification', { companies: ['infineon', 'siemens-eda'], people: [] }],
  ['stmicroelectronics-2014-analog-model-equivalence-validation', { companies: ['stmicroelectronics', 'siemens-eda'], people: [] }],
  ['cadence-2012-real-valued-systemverilog-coverage', { companies: ['cadence', 'intel'], people: ['prabal-bhattacharya', 'scott-little'] }],
  ['cirrus-logic-2026-top-down-mixed-signal-verification', { companies: ['cirrus-logic'], people: ['gautham-sathyan'] }],
  ['bosch-sensortec-2015-uvm-wreal-full-chip-mixed-signal-verification', { companies: ['bosch-sensortec', 'cadence'], people: ['felix-assmann'] }],
  ['bosch-sensortec-2026-agentic-ai-mixed-signal-verification-hiring', { companies: ['bosch-sensortec'], people: [] }],
  ['apple-2026-pmu-ams-design-verification-team-hiring', { companies: ['apple'], people: ['selcuk-talay'] }],
  ['stijn-ringeling-2026-ml-sigma-delta-evaluation', { companies: [], people: ['stijn-ringeling'] }],
  ['hewlett-packard-2015-digital-centric-serdes-ams-verification', { companies: ['hewlett-packard'], people: [] }],
];

// Knowing rejected identity: researched, deliberately not published as a factual Event.
const REJECTED_EVENT_IDS = ['sitime-2026-07-renesas-timing-acquisition'];

test('retired legacy Company IDs stay absent from canonical records and Event references', async () => {
  const payload = await buildPayload();
  const companyIds = new Set(payload.companies.map(({ id }) => id));
  const referencedCompanyIds = new Set(payload.events.flatMap(({ companies }) => companies));

  for (const legacyId of LEGACY_COMPANY_IDS) {
    assert.equal(companyIds.has(legacyId), false, `${legacyId} must not be a canonical Company`);
    assert.equal(referencedCompanyIds.has(legacyId), false, `${legacyId} must not appear in Event company references`);
  }

  for (const successorId of CANONICAL_SUCCESSORS) {
    assert.ok(companyIds.has(successorId), `${successorId} must remain a canonical Company`);
  }
});

test('canonical public Company display names stay intentional', async () => {
  const payload = await buildPayload();
  const byId = new Map(payload.companies.map(({ id, name }) => [id, name]));

  for (const [id, name] of Object.entries(CANONICAL_DISPLAY_NAMES)) {
    assert.equal(byId.get(id), name, `${id} must keep its canonical public display name`);
  }
});

test('historical predecessor Events keep their canonical successor associations', async () => {
  const payload = await buildPayload();

  for (const [id, association] of CANONICAL_ASSOCIATIONS) {
    const event = eventById(payload, id);
    assert.deepEqual(event.companies, association.companies, `${id} company association`);
    assert.deepEqual(event.people, association.people, `${id} person association`);
  }
});

test('knowing rejected Event identities stay out of the factual corpus', async () => {
  const payload = await buildPayload();
  const ids = new Set(payload.events.map(({ id }) => id));

  for (const rejectedId of REJECTED_EVENT_IDS) {
    assert.equal(ids.has(rejectedId), false, `${rejectedId} must not be published as a factual Event`);
  }
});

test('every Event company reference resolves to a canonical Company', async () => {
  const payload = await buildPayload();
  const companyIds = new Set(payload.companies.map(({ id }) => id));

  for (const event of payload.events) {
    for (const companyId of event.companies) {
      assert.ok(companyIds.has(companyId), `${event.id} references unknown Company ${companyId}`);
    }
  }
});
