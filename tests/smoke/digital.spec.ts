import { expect, test } from '@playwright/test';
import { catalogFixture, catalogIndexTests } from './catalog-index';

const fixture = await catalogFixture('digital');
catalogIndexTests(fixture, { design: 'Design', synthesis: 'Synthesis', verification: 'Verification', layout: 'Layout' },
  ['surfer', 'pono', 'xezim', 'verilator', 'iverilog-uvm', 'haven', 'coresmith', 'yosys', 'openroad', 'dr-rtl']);

test('reviewed GitHub and GitLab histories share compact binary activity bands', async ({ page }) => {
  await page.goto('./digital/');
  const surfer = fixture.row(page, 'surfer').locator('.digital-activity');
  expect(fixture.activity.projects.surfer.kind).toBe('repository');
  expect(fixture.activity.projects.surfer.repository).toBe('https://gitlab.com/surfer-project/surfer');
  await expect(surfer.locator('ul > li')).toHaveCount(12);
  await expect(surfer.locator('ul > li').first()).toHaveAttribute('data-month', '2026-09');
  await expect(surfer.locator('ul > li').first()).toHaveAttribute('data-commits', '7');
  await expect(surfer.locator('ul > li').last()).toHaveAttribute('data-month', '2025-10');
  await expect(surfer.locator('ul > li').last()).toHaveAttribute('data-commits', '47');
  await expect(surfer.locator('time')).toHaveAttribute('datetime', '2026-09-04');
  await expect(surfer.locator('.digital-activity-summary')).toHaveText('12/12 months');
  expect(await surfer.innerText()).not.toContain('gitlab.com');
});
