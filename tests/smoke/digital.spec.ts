import { expect, test } from '@playwright/test';
import { catalogFixture, catalogIndexTests, catalogSearchRegression } from './catalog-index';

const fixture = await catalogFixture('digital');
catalogIndexTests(fixture, { design: 'Design', synthesis: 'Synthesis', verification: 'Verification', layout: 'Layout' },
  ['surfer', 'pono', 'xezim', 'verilator', 'iverilog-uvm', 'haven', 'coresmith', 'yosys', 'openroad', 'dr-rtl', 'veryl', 'xls',
    'spade', 'kanagawa', 'siliconcompiler', 'amaranth', 'dynamatic']);

catalogSearchRegression(fixture, {
  Veryl: ['veryl'],
  SystemVerilog: ['verilator', 'icarus-verilog', 'veryl', 'xls', 'spade', 'kanagawa'],
  HDL: ['veryl', 'spade', 'amaranth'],
  RTL: ['veryl', 'spade', 'kanagawa', 'dynamatic'],
  simulator: ['verilator', 'icarus-verilog', 'veryl', 'amaranth'],
  cocotb: ['veryl'],
  UVM: ['haven', 'xezim'],
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
});

test('reviewed GitHub and GitLab histories share compact binary activity bands', async ({ page }) => {
  await page.goto('./digital/');
  const surfer = fixture.row(page, 'surfer').locator('.catalog-activity');
  expect(fixture.activity.projects.surfer.kind).toBe('repository');
  expect(fixture.activity.projects.surfer.repository).toBe('https://gitlab.com/surfer-project/surfer');
  await expect(surfer.locator('ul > li')).toHaveCount(12);
  await expect(surfer.locator('ul > li').first()).toHaveAttribute('data-month', '2025-10');
  await expect(surfer.locator('ul > li').first()).toHaveAttribute('data-commits', '47');
  await expect(surfer.locator('ul > li').last()).toHaveAttribute('data-month', '2026-09');
  await expect(surfer.locator('ul > li').last()).toHaveAttribute('data-commits', '7');
  await expect(surfer.locator('time')).toHaveAttribute('datetime', '2026-09-04');
  expect(await surfer.locator('time').innerText()).toBe('SEP 4, 2026');
  await expect(surfer.locator('.activity-summary')).toHaveCount(0);
  expect(await surfer.innerText()).not.toContain('gitlab.com');
});
