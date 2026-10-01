import { expect, test } from '@playwright/test';
import { catalogFixture, catalogIndexTests, catalogSearchRegression } from './catalog-index';

const fixture = await catalogFixture('digital');
catalogIndexTests(fixture, { design: 'Design', synthesis: 'Synthesis', verification: 'Verification', layout: 'Layout' },
  ['surfer', 'pono', 'xezim', 'verilator', 'iverilog-uvm', 'haven', 'coresmith', 'yosys', 'openroad', 'dr-rtl', 'veryl', 'xls',
    'spade', 'kanagawa', 'siliconcompiler', 'amaranth', 'dynamatic', 'rggen', 'pyucis', 'peakrdl']);

catalogSearchRegression(fixture, {
  Veryl: ['veryl'],
  SystemVerilog: ['verilator', 'icarus-verilog', 'veryl', 'xls', 'spade', 'kanagawa'],
  HDL: ['veryl', 'spade', 'amaranth'],
  RTL: ['veryl', 'spade', 'kanagawa', 'dynamatic'],
  simulator: ['verilator', 'icarus-verilog', 'veryl', 'amaranth'],
  cocotb: ['veryl'],
  UVM: ['haven', 'xezim', 'rggen', 'peakrdl'],
  formal: ['pono', 'symbiyosys', 'verifyrtl', 'siliconcompiler'],
  waveform: ['surfer', 'what', 'vitamin', 'amaranth'],
  Yosys: ['yosys', 'sv-elab', 'uhdm2rtlil', 'spade', 'siliconcompiler', 'amaranth'],
  OpenROAD: ['openroad', 'coresmith', 'siliconcompiler'],
  synthesis: ['yosys', 'sv-elab', 'uhdm2rtlil', 'dr-rtl', 'veryl', 'xls', 'siliconcompiler', 'amaranth'],
  XLS: ['xls'],
  HLS: ['xls', 'kanagawa', 'dynamatic'],
  DSLX: ['xls'],
  Spade: ['spade'],
  Kanagawa: ['kanagawa'],
  SiliconCompiler: ['siliconcompiler'],
  Amaranth: ['amaranth'],
  Python: ['amaranth', 'cocotb'],
  Dynamatic: ['dynamatic'],
  MLIR: ['circt', 'dynamatic'],
  dataflow: ['dynamatic'],
  AI: ['haven', 'ucagent'],
  RgGen: ['rggen'],
  register: ['rggen', 'peakrdl'],
  CSR: ['rggen', 'peakrdl'],
  RAL: ['rggen', 'peakrdl'],
  SystemRDL: ['rggen', 'peakrdl'],
  PeakRDL: ['peakrdl'],
  PyUCIS: ['pyucis'],
  UCIS: ['pyucis'],
  coverage: ['pyucis'],
  testplan: ['pyucis'],
});

test('Digital release points retain source provenance without fabricated repository history', async ({ page }) => {
  await page.goto('./digital/');
  const points = fixture.projects.filter((project) => fixture.activity.projects[project.id].kind === 'public-update');
  expect(points.length).toBeGreaterThan(0);
  for (const project of points) {
    const record = fixture.activity.projects[project.id];
    const row = fixture.row(page, project.id);
    const active = row.locator('.activity-strip .active');
    await expect(row.locator('.activity-strip > li')).toHaveCount(12);
    await expect(active).toHaveCount(fixture.activity.months.includes(record.lastPublicUpdateAt.slice(0, 7)) ? 1 : 0);
    await expect(row.locator('time')).toHaveAttribute('datetime', record.lastPublicUpdateAt);
    if (await active.count()) {
      await expect(active).toHaveAttribute('data-month', record.lastPublicUpdateAt.slice(0, 7));
      await expect(active).toHaveAttribute('data-signal', record.lastPublicUpdateType);
      await expect(active).toHaveAttribute('data-source', record.lastPublicUpdateSource);
    }
    await expect(row.locator('[data-commits], .activity-repository')).toHaveCount(0);
    for (const title of await row.locator('.activity-strip li:not(.active)').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('title')))) {
      expect(title).toContain('no reviewed public activity signal');
      expect(title).not.toContain('0 commits');
    }
  }
});

test('reviewed GitHub and GitLab histories share compact binary activity bands', async ({ page }) => {
  await page.goto('./digital/');
  const surfer = fixture.row(page, 'surfer').locator('.catalog-activity');
  const record = fixture.activity.projects.surfer;
  const months: string[] = fixture.activity.months;
  // Canonical repository identity is durable. Months, counts, active states and the reviewed
  // date are read from the current activity snapshot so a routine refresh needs no test edit.
  expect(record.kind).toBe('repository');
  expect(record.repository).toBe('https://gitlab.com/surfer-project/surfer');
  expect(record.commits).toHaveLength(months.length);

  const cells = surfer.locator('ul > li');
  await expect(cells).toHaveCount(months.length);
  const renderedCells = await cells.evaluateAll((nodes) => nodes.map((node) => ({
    month: node.getAttribute('data-month'),
    commits: node.getAttribute('data-commits'),
    active: node.classList.contains('active'),
  })));
  expect(renderedCells).toEqual(months.map((month, index) => ({
    month,
    commits: String(record.commits[index]),
    active: record.commits[index] > 0,
  })));

  await expect(surfer.locator('time')).toHaveAttribute('datetime', record.lastCommitAt);
  const dateText = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${record.lastCommitAt}T00:00:00Z`)).toUpperCase();
  expect(await surfer.locator('time').innerText()).toBe(dateText);
  await expect(surfer.locator('.activity-summary')).toHaveCount(0);
  // The compact activity display never exposes the raw repository URL.
  expect(await surfer.innerText()).not.toContain('gitlab.com');
});
