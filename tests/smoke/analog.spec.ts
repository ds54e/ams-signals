import { expect, test } from '@playwright/test';
import { catalogFixture, catalogIndexTests } from './catalog-index';

const fixture = await catalogFixture('analog');
catalogIndexTests(fixture, { design: 'Design', simulation: 'Simulation', layout: 'Layout' },
  ['atlas', 'ngspice', 'panda', 'autosizer', 'ngspice-openvaf-enhancements', 'xschem']);

test('ATLAS and ngspice map reviewed point signals to their month without fabricated repository history', async ({ page }) => {
  await page.goto('./analog/');
  for (const [id, date, month, type, label] of [
    ['atlas', 'Jul 15', '2026-07', 'paper', 'paper publication'],
    ['ngspice', 'Aug 11', '2026-08', 'release', 'release'],
  ]) {
    const row = fixture.row(page, id);
    await expect(row.locator('.activity-strip > li')).toHaveCount(12);
    await expect(row.locator('.activity-latest')).toHaveText(date);
    await expect(row.locator('.activity-summary')).toHaveText('1/12 months');
    await expect(row.locator('.activity-strip .active')).toHaveCount(1);
    await expect(row.locator('.activity-strip .active')).toHaveAttribute('data-month', month);
    await expect(row.locator('.activity-strip .active')).toHaveAttribute('data-signal', type);
    await expect(row.locator('.activity-strip .active')).toHaveAttribute('title', new RegExp(label + '$'));
    await expect(row.locator('[data-commits], .activity-repository')).toHaveCount(0);
    await expect(row.locator('.activity-strip li:not(.active)')).toHaveCount(11);
    expect(await row.locator('.activity-strip li:not(.active)').first().getAttribute('title')).toContain('no reviewed public activity signal');
    await expect(row.locator('.activity-latest time')).toHaveAttribute('title', new RegExp('^' + label + ':'));
    await expect(row.locator('.activity-latest a')).toHaveCount(0);
    await expect(row.locator('.catalog-quicklinks a')).not.toHaveCount(0);
  }
});

test('Analog retains the moved enhancement project exactly once with its primary Code link', async ({ page }) => {
  await page.goto('./analog/');
  await expect(fixture.rows(page)).toHaveCount(fixture.projects.length);
  const moved = fixture.row(page, 'ngspice-openvaf-enhancements');
  await expect(moved).toHaveCount(1);
  await expect(moved.getByRole('link', { name: 'Code', exact: true })).toHaveAttribute('href', 'https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Digital', exact: true }).click();
  await expect(page.locator('[data-digital-project="ngspice-openvaf-enhancements"]')).toHaveCount(0);
});
