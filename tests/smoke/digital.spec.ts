import { expect, test } from '@playwright/test';
import { catalogFixture, catalogIndexTests, catalogSearchRegression } from './catalog-index';

const fixture = await catalogFixture('digital');
catalogIndexTests(fixture, { design: 'Design', synthesis: 'Synthesis', verification: 'Verification', layout: 'Layout' },
  ['surfer', 'pono', 'xezim', 'verilator', 'iverilog-uvm', 'haven', 'coresmith', 'yosys', 'openroad', 'dr-rtl']);

catalogSearchRegression(fixture, {
  SystemVerilog: ['verilator', 'icarus-verilog'],
  UVM: ['haven', 'xezim'],
  formal: ['pono', 'symbiyosys', 'verifyrtl'],
  waveform: ['surfer', 'what', 'vitamin'],
  Yosys: ['yosys', 'sv-elab', 'uhdm2rtlil'],
  OpenROAD: ['openroad', 'coresmith'],
  AI: ['xezim', 'haven'],
});

test('reviewed GitHub and GitLab histories share compact binary activity bands', async ({ page }) => {
  await page.goto('./digital/');
  const surfer = fixture.row(page, 'surfer').locator('.catalog-activity');
  expect(fixture.activity.projects.surfer.kind).toBe('repository');
  expect(fixture.activity.projects.surfer.repository).toBe('https://gitlab.com/surfer-project/surfer');
  await expect(surfer.locator('ul > li')).toHaveCount(12);
  await expect(surfer.locator('ul > li').first()).toHaveAttribute('data-month', '2026-09');
  await expect(surfer.locator('ul > li').first()).toHaveAttribute('data-commits', '7');
  await expect(surfer.locator('ul > li').last()).toHaveAttribute('data-month', '2025-10');
  await expect(surfer.locator('ul > li').last()).toHaveAttribute('data-commits', '47');
  await expect(surfer.locator('time')).toHaveAttribute('datetime', '2026-09-04');
  await expect(surfer.locator('.activity-summary')).toHaveCount(0);
  expect(await surfer.innerText()).not.toContain('gitlab.com');
});
