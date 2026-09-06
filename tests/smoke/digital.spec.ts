import { expect, test } from '@playwright/test';
import { catalogFixture, catalogIndexTests, catalogSearchRegression } from './catalog-index';

const fixture = await catalogFixture('digital');
catalogIndexTests(fixture, { design: 'Design', synthesis: 'Synthesis', verification: 'Verification', layout: 'Layout' },
  ['surfer', 'pono', 'xezim', 'verilator', 'iverilog-uvm', 'haven', 'coresmith', 'yosys', 'openroad', 'dr-rtl', 'veryl', 'xls']);

catalogSearchRegression(fixture, {
  Veryl: ['veryl'],
  SystemVerilog: ['verilator', 'icarus-verilog', 'veryl', 'xls'],
  HDL: ['veryl'],
  RTL: ['veryl'],
  simulator: ['verilator', 'icarus-verilog', 'veryl'],
  cocotb: ['veryl'],
  UVM: ['haven', 'xezim'],
  formal: ['pono', 'symbiyosys', 'verifyrtl'],
  waveform: ['surfer', 'what', 'vitamin'],
  Yosys: ['yosys', 'sv-elab', 'uhdm2rtlil'],
  OpenROAD: ['openroad', 'coresmith'],
  synthesis: ['yosys', 'sv-elab', 'uhdm2rtlil', 'dr-rtl', 'veryl', 'xls'],
  XLS: ['xls'],
  HLS: ['xls'],
  DSLX: ['xls'],
  AI: ['xezim', 'haven', 'veryl'],
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
