import { expect, test } from '@playwright/test';
import { catalogFixture, catalogIndexTests, catalogSearchRegression } from './catalog-index';

const fixture = await catalogFixture('analog');
catalogIndexTests(fixture, { design: 'Design', simulation: 'Simulation', layout: 'Layout' },
  ['atlas', 'ngspice', 'panda', 'autosizer', 'ngspice-openvaf-enhancements', 'xschem', 'zerosim', 'analogsage', 'klayout',
    'klayout-pex', 'pyopus', 'scikit-rf', 'qucs-s']);

catalogSearchRegression(fixture, {
  ngspice: ['ngspice', 'analoggym', 'autosizer'],
  Virtuoso: ['virtuoso-agent', 'virtuoso-bridge-lite', 'vcli'],
  Spectre: ['panda', 'atlas', 'vcli', 'virtuoso-agent'],
  'Verilog-A': ['evas', 'openvaf-reloaded'],
  SKY130: ['analoggym', 'gmoverid-skill'],
  AI: ['analogsage', 'zerosim'],
  layout: ['klayout', 'magic'],
  sizing: ['autosizer', 'astra', 'analogsage', 'gmoverid-skill', 'pyopus'],
  'KLayout-PEX': ['klayout-pex'],
  parasitic: ['klayout-pex'],
  PEX: ['klayout-pex'],
  PyOPUS: ['pyopus'],
  corner: ['pyopus'],
  'scikit-rf': ['scikit-rf'],
  'S-parameter': ['scikit-rf'],
  SPICE: ['ngspice', 'scikit-rf', 'qucs-s'],
  'Qucs-S': ['qucs-s'],
  Xyce: ['xyce', 'qucs-s'],
});

test('ATLAS and ngspice map reviewed point signals to their month without fabricated repository history', async ({ page }) => {
  await page.goto('./analog/');
  const signalLabels = { paper: 'paper publication', release: 'release', 'public-update': 'public update' };
  for (const id of ['atlas', 'ngspice']) {
    const record = fixture.activity.projects[id];
    const date = record.lastPublicUpdateAt;
    const month = date.slice(0, 7);
    const monthIndex = fixture.activity.months.indexOf(month);
    const activeCount = monthIndex >= 0 ? 1 : 0;
    const label = signalLabels[record.lastPublicUpdateType];
    const dateText = new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
    const row = fixture.row(page, id);
    await expect(row.locator('.activity-strip > li')).toHaveCount(fixture.activity.months.length);
    await expect(row.locator('.activity-latest')).toHaveText(dateText);
    expect(await row.locator('.activity-latest time').innerText()).toBe(dateText.toUpperCase());
    await expect(row.locator('.activity-summary')).toHaveCount(0);
    await expect(row.locator('.activity-strip .active')).toHaveCount(activeCount);
    if (monthIndex >= 0) {
      await expect(row.locator('.activity-strip .active')).toHaveAttribute('data-month', month);
      await expect(row.locator('.activity-strip > li').nth(monthIndex)).toHaveClass('active');
      await expect(row.locator('.activity-strip .active')).toHaveAttribute('data-signal', record.lastPublicUpdateType);
      await expect(row.locator('.activity-strip .active')).toHaveAttribute('title', new RegExp(label + '
test('Analog retains the moved enhancement project exactly once with its primary Code link', async ({ page }) => {
  await page.goto('./analog/');
  await expect(fixture.rows(page)).toHaveCount(fixture.projects.length);
  const moved = fixture.row(page, 'ngspice-openvaf-enhancements');
  await expect(moved).toHaveCount(1);
  await expect(moved.getByRole('link', { name: 'Code', exact: true })).toHaveAttribute('href', 'https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Digital', exact: true }).click();
  await expect(page.locator('[data-catalog-project="ngspice-openvaf-enhancements"]')).toHaveCount(0);
});
));
    }
    await expect(row.locator('[data-commits], .activity-repository')).toHaveCount(0);
    await expect(row.locator('.activity-strip li:not(.active)')).toHaveCount(fixture.activity.months.length - activeCount);
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
  await expect(page.locator('[data-catalog-project="ngspice-openvaf-enhancements"]')).toHaveCount(0);
});
