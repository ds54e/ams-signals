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
  const signalLabels: Record<string, string> = { paper: 'paper publication', release: 'release', 'public-update': 'public update' };
  // Which reviewed project carries which point-signal type is durable identity. The date, month,
  // window index and counts are read from the current activity snapshot, not pinned here.
  const reviewedTypes: Record<string, string> = { atlas: 'paper', ngspice: 'release' };
  const months: string[] = fixture.activity.months;
  const renderedDate = (date: string) => new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));

  const inWindow = Object.entries(reviewedTypes).filter(([id]) => (
    months.includes(fixture.activity.projects[id].lastPublicUpdateAt.slice(0, 7))
  ));
  expect(inWindow.length, 'reviewed point signals must render at least one active snapshot month').toBeGreaterThan(0);

  for (const [id, type] of Object.entries(reviewedTypes)) {
    const record = fixture.activity.projects[id];
    const date = record.lastPublicUpdateAt;
    const month = date.slice(0, 7);
    const monthIndex = months.indexOf(month);
    const activeCount = monthIndex >= 0 ? 1 : 0;
    const label = signalLabels[record.lastPublicUpdateType];

    expect(record.kind).toBe('no-public-repo');
    expect(record.lastPublicUpdateType).toBe(type);
    expect(Object.keys(signalLabels)).toContain(record.lastPublicUpdateType);

    const row = fixture.row(page, id);
    // The strip is exactly the snapshot window, dated from the reviewed record.
    await expect(row.locator('.activity-strip > li')).toHaveCount(months.length);
    await expect(row.locator('.activity-latest')).toHaveText(renderedDate(date));
    expect(await row.locator('.activity-latest time').innerText()).toBe(renderedDate(date).toUpperCase());
    await expect(row.locator('.activity-latest time')).toHaveAttribute('title', new RegExp(`^${label}:`));
    await expect(row.locator('.activity-latest a')).toHaveCount(0);
    await expect(row.locator('.activity-summary')).toHaveCount(0);

    // The reviewed month is the only active cell, and only while it lies inside the window.
    await expect(row.locator('.activity-strip .active')).toHaveCount(activeCount);
    expect(await row.locator('.activity-strip li.active').evaluateAll(
      (nodes) => nodes.map((node) => node.getAttribute('data-month')),
    )).toEqual(monthIndex >= 0 ? [month] : []);
    if (monthIndex >= 0) {
      const active = row.locator('.activity-strip .active');
      await expect(active).toHaveAttribute('data-month', month);
      await expect(active).toHaveAttribute('data-signal', record.lastPublicUpdateType);
      await expect(active).toHaveAttribute('title', new RegExp(`${label}$`));
      await expect(row.locator('.activity-strip > li').nth(monthIndex)).toHaveClass('active');
    }

    // Point signals never fabricate repository history.
    await expect(row.locator('[data-commits], .activity-repository')).toHaveCount(0);

    // Inactive cells still describe the absence of a reviewed public activity signal.
    await expect(row.locator('.activity-strip li:not(.active)')).toHaveCount(months.length - activeCount);
    const inactiveTitles = await row.locator('.activity-strip li:not(.active)').evaluateAll(
      (nodes) => nodes.map((node) => node.getAttribute('title')),
    );
    expect(inactiveTitles).toHaveLength(months.length - activeCount);
    for (const title of inactiveTitles) {
      expect(title).toContain('no reviewed public activity signal');
      expect(title).not.toContain('commits');
    }
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
