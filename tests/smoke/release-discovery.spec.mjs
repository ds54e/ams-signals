// Browser contracts for finding things: search lenses, Signal-type filtering, the Company
// picker, canonical predecessor resolution, and singleton suppression and discoverability.
//
// Surface rendering lives in release-surfaces.spec.mjs, Activity Matrix geometry in
// release-matrix.spec.mjs, and cross-surface navigation and inspector state in
// release-navigation.spec.mjs.

import { expect, test } from '@playwright/test';
import {
  countStatus,
  expectExplorerReady,
  installBrowserErrorGuards,
  viewerCorpus,
  visibleListedEventIds,
  visibleTimelineEventIds,
} from './release-helpers.mjs';

installBrowserErrorGuards(test);

test('historical predecessor searches resolve through canonical Company groups', async ({ page }) => {
  for (const migration of [
    { term: 'Mentor', legacy: 'mentor-graphics', target: 'siemens-eda', targetName: 'Siemens EDA' },
    { term: 'Freescale', legacy: 'freescale-semiconductor', target: 'nxp', targetName: 'NXP' },
  ]) {
    await page.goto(`./?q=${migration.term}`);
    await expectExplorerReady(page);
    await expect(page.locator(`[data-matrix-row][data-entity-type="company"][data-entity-id="${migration.legacy}"]`))
      .toHaveCount(0);
    const canonicalRow = page.locator(
      `[data-matrix-row][data-entity-type="company"][data-entity-id="${migration.target}"]`,
    );
    await expect(canonicalRow).toBeVisible();
    await expect(canonicalRow.locator('[data-matrix-mark]:visible').first()).toBeVisible();
    await page.locator('[data-company-picker] summary').click();
    await expect(page.locator(`[data-company-options] input[value="${migration.legacy}"]`)).toHaveCount(0);
    await expect(page.locator(`[data-company-options] input[value="${migration.target}"]`)).toBeAttached();

    await page.goto(`./events/?q=${migration.term}`);
    await expectExplorerReady(page, 'events');
    await expect(page.locator('[data-event-result]:visible').first()).toBeVisible();
    await expect(page.locator('[data-event-result]:visible .result-context').getByRole(
      'link', { name: migration.targetName, exact: true },
    ).first()).toBeVisible();
    expect((await page.request.get(`./companies/${migration.legacy}/`)).status()).toBe(404);
  }
});

test('People-only Events remain in the unfiltered corpus and obey narrowed Company filters', async ({ page }) => {
  const thesisEventId = 'stijn-ringeling-2026-ml-sigma-delta-evaluation';
  const nxpEventId = 'nxp-2025-sigma-delta-model-evaluation-acceleration';

  const payload = await (await page.request.get('./export.json')).json();
  expect(payload.events.find(({ id }) => id === thesisEventId)).toEqual(
    expect.objectContaining({ companies: [], people: ['stijn-ringeling'] }),
  );

  await page.goto('./');
  await expectExplorerReady(page);
  const stijnRow = page.locator(
    '[data-group="both"] [data-matrix-row][data-entity-type="person"][data-entity-id="stijn-ringeling"]',
  );
  const thesisMark = stijnRow.locator(`[data-matrix-mark][data-event-id="${thesisEventId}"]`);
  const nxpMark = stijnRow.locator(`[data-matrix-mark][data-event-id="${nxpEventId}"]`);
  await expect(stijnRow).toBeVisible();
  await expect(thesisMark).toBeVisible();

  await page.goto('./events/');
  await expectExplorerReady(page, 'events');
  const thesisResult = page.locator(`[data-event-result][data-event-id="${thesisEventId}"]`);
  const nxpResult = page.locator(`[data-event-result][data-event-id="${nxpEventId}"]`);
  await expect(thesisResult).toBeVisible();
  await expect(nxpResult).toBeVisible();

  await page.locator('[data-company-picker] summary').click();
  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await page.locator('[data-company-options] input[value="nxp"]').check();
  await expect.poll(() => new URL(page.url()).searchParams.get('companies')).toBe('nxp');
  await expect(thesisResult).toBeHidden();
  await expect(nxpResult).toBeVisible();

  await page.getByRole('button', { name: 'Select all', exact: true }).click();
  await expect(thesisResult).toBeVisible();
  expect(new URL(page.url()).searchParams.has('companies')).toBe(false);
  await page.locator('[data-search]').fill('transfer learning transistor-level');
  await expect(thesisResult).toBeVisible();

  await page.goto('./?companies=nxp');
  await expectExplorerReady(page);
  await expect(stijnRow).toBeVisible();
  await expect(thesisMark).toBeHidden();
  await expect(nxpMark).toBeVisible();
  await page.locator('[data-company-picker] summary').click();
  await page.getByRole('button', { name: 'Select all', exact: true }).click();
  await expect(thesisMark).toBeVisible();
});

test('explicit Search and Company Focus discovery preserve complete matching Event access', async ({ page }) => {
  const lenses = [
    '?q=Google',
    '?q=Gautham%20Sathyan',
    '?companies=google',
    '?companies=cirrus-logic',
  ];

  for (const lens of lenses) {
    await page.goto(`./${lens}`);
    await expectExplorerReady(page);
    const timelineIds = await visibleTimelineEventIds(page);

    await page.goto(`./events/${lens}`);
    await expectExplorerReady(page, 'events');
    const listedIds = await visibleListedEventIds(page);

    expect(timelineIds, `explicit Timeline set for ${lens}`).toEqual(listedIds);
    expect(timelineIds.length, `explicit non-empty set for ${lens}`).toBeGreaterThan(0);
  }
});

test('singleton Companies and People are browse-suppressed but deliberately discoverable', async ({ page }) => {
  const payload = await (await page.request.get('./export.json')).json();
  const companyTotals = new Map(payload.companies.map((company) => [
    company.id,
    payload.events.filter((event) => event.companies.includes(company.id)).length,
  ]));
  const peopleTotals = new Map(payload.people.map((person) => [
    person.id,
    payload.events.filter((event) => event.people.includes(person.id)).length,
  ]));
  // Singleton derivation semantics are owned by the Node contract layer. The browser
  // integration picks its own deterministic fixtures from whatever the corpus supplies.
  const singletonCompanyIds = [...companyTotals]
    .filter(([, total]) => total === 1)
    .map(([id]) => id)
    .sort((left, right) => left.localeCompare(right, 'en'));
  const singletonPersonIds = [...peopleTotals]
    .filter(([, total]) => total === 1)
    .map(([id]) => id)
    .sort((left, right) => left.localeCompare(right, 'en'));
  expect(singletonCompanyIds.length, 'the corpus must supply a singleton Company fixture').toBeGreaterThan(0);
  expect(singletonPersonIds.length, 'the corpus must supply a singleton Person fixture').toBeGreaterThan(0);

  const singletonCompany = payload.companies.find(({ id }) => id === singletonCompanyIds[0]);
  // The narrowed-Company-filter contract needs a singleton Person whose Event names a Company.
  const singletonPerson = payload.people.find(({ id }) => (
    singletonPersonIds.includes(id)
    && payload.events.some((event) => event.people.includes(id) && event.companies.length > 0)
  ));
  expect(
    singletonPerson,
    'the corpus must supply a singleton Person whose Event names a Company',
  ).toBeTruthy();
  expect(companyTotals.get(singletonCompany.id)).toBe(1);
  expect(peopleTotals.get(singletonPerson.id)).toBe(1);
  const companyEvent = payload.events.find((event) => event.companies.includes(singletonCompany.id));
  const personEvent = payload.events.find((event) => event.people.includes(singletonPerson.id));
  const personEventCompanyId = personEvent.companies[0];
  expect(personEventCompanyId, `${singletonPerson.id} must name a Company`).toBeTruthy();

  await page.goto('./events/');
  await expectExplorerReady(page, 'events');
  await expect(page.locator(`[data-event-result][data-event-id="${companyEvent.id}"]`)).toBeVisible();
  await expect(page.locator(`[data-event-result][data-event-id="${personEvent.id}"]`)).toBeVisible();
  expect((await page.request.get(`./companies/${singletonCompany.id}/`)).status()).toBe(200);
  expect((await page.request.get(`./people/${singletonPerson.id}/`)).status()).toBe(200);

  await page.goto('./');
  await expectExplorerReady(page);
  const combinedCompanyRow = page.locator(
    `[data-group="both"] [data-matrix-row][data-entity-type="company"][data-entity-id="${singletonCompany.id}"]`,
  );
  const combinedPersonRow = page.locator(
    `[data-group="both"] [data-matrix-row][data-entity-type="person"][data-entity-id="${singletonPerson.id}"]`,
  );
  await expect(combinedCompanyRow).toBeHidden();
  await expect(combinedPersonRow).toBeHidden();
  const singletonPickerOption = page.locator(`[data-company-options] input[value="${singletonCompany.id}"]`);
  await expect(singletonPickerOption).toBeAttached();
  await expect(singletonPickerOption.locator('xpath=..').locator('small')).toHaveText('1');

  await page.locator('[data-search]').fill(singletonCompany.name);
  await expect(combinedCompanyRow).toBeVisible();
  await expect(page.locator(`[data-matrix-mark][data-event-id="${companyEvent.id}"]:visible`).first()).toBeVisible();
  await page.locator('[data-search]').fill('');
  await expect(combinedCompanyRow).toBeHidden();

  await page.locator('[data-search]').fill(singletonPerson.name);
  await expect(combinedPersonRow).toBeVisible();
  await page.locator('[data-search]').fill('');
  await expect(combinedPersonRow).toBeHidden();

  await page.locator('[data-company-picker] summary').click();
  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await singletonPickerOption.check();
  await expect(combinedCompanyRow).toBeVisible();
  expect(new URL(page.url()).searchParams.get('companies')).toBe(singletonCompany.id);

  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await page.locator(`[data-company-options] input[value="${personEventCompanyId}"]`).check();
  await expect(combinedPersonRow).toBeVisible();

  await page.getByRole('button', { name: 'Select all', exact: true }).click();
  await expect(page.locator('[data-company-options] input:checked'))
    .toHaveCount(await page.locator('[data-company-options] input').count());
  await expect(combinedCompanyRow).toBeHidden();
  await expect(combinedPersonRow).toBeHidden();
});

test('Company picker is readable, searchable, and independently clearable', async ({ page }) => {
  for (const path of ['./', './events/']) {
    const surface = path.includes('events') ? 'events' : 'timeline';
    await page.goto(path);
    await expectExplorerReady(page, surface);

    await page.locator('[data-search]').fill('RNM');
    if (surface === 'events') await page.locator('[data-kind]').selectOption('technical');
    await page.locator('[data-company-picker] summary').click();

    const checks = page.locator('[data-company-options] input');
    const checked = page.locator('[data-company-options] input:checked');
    const totalCompanies = await checks.count();
    // The Company option population is itself the contract; it must not be pinned.
    expect(totalCompanies, 'the picker must offer Company options').toBeGreaterThan(0);
    await expect(page.getByRole('button', { name: 'Select all', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear all', exact: true })).toBeVisible();
    const pickerLayout = await page.locator('.company-picker-panel').evaluate((panel) => {
      const options = panel.querySelector('[data-company-options]');
      return {
        width: panel.getBoundingClientRect().width,
        height: panel.getBoundingClientRect().height,
        optionColumns: getComputedStyle(options).gridTemplateColumns,
        optionsClientHeight: options.clientHeight,
        optionsScrollHeight: options.scrollHeight,
      };
    });
    expect(pickerLayout.width).toBeGreaterThanOrEqual(340);
    expect(pickerLayout.width).toBeLessThanOrEqual(380);
    expect(pickerLayout.height).toBeGreaterThanOrEqual(400);
    expect(pickerLayout.height).toBeLessThanOrEqual(440);
    expect(pickerLayout.optionColumns).toMatch(/^\d+(?:\.\d+)?px$/);
    expect(pickerLayout.optionsScrollHeight).toBeGreaterThan(pickerLayout.optionsClientHeight);
    await expect(page.locator('[data-reset]')).toHaveCount(0);

    const optionNames = await page.locator('[data-company-option] > span').allTextContents();
    expect(optionNames).toEqual([...optionNames].sort((left, right) => left.localeCompare(right, 'en')));
    const eventFilterUrl = page.url();
    const checkedBeforePickerSearch = await checked.count();
    await page.locator('[data-company-search]').fill('sony');
    await expect(page.locator('[data-company-option]:visible')).toHaveCount(1);
    await expect(page.locator('[data-company-option]:visible > span')).toHaveText(['Sony Semiconductor']);
    expect(page.url()).toBe(eventFilterUrl);
    await expect(checked).toHaveCount(checkedBeforePickerSearch);
    await page.locator('[data-company-search]').fill('apple');
    await page.locator('[data-company-options] input[value="apple"]').uncheck();
    await page.locator('[data-company-search]').fill('sony');
    await page.locator('[data-company-search]').fill('apple');
    await expect(page.locator('[data-company-options] input[value="apple"]')).not.toBeChecked();
    await page.locator('[data-company-search]').fill('does-not-exist');
    await expect(page.locator('[data-company-options-empty]')).toBeVisible();
    await page.locator('[data-company-search]').fill('');
    await page.getByRole('button', { name: 'Select all', exact: true }).click();

    await page.getByRole('button', { name: 'Clear all', exact: true }).click();
    await expect(checked).toHaveCount(0);
    const corpus = await viewerCorpus(page);
    await expect(page.locator('[data-status]')).toHaveText(countStatus(0, corpus.total));
    expect(new URL(page.url()).searchParams.get('companies')).toBe('none');
    if (surface === 'timeline') {
      await expect(page.locator('[data-event-mark]:visible')).toHaveCount(0);
    } else {
      await expect(page.locator('[data-event-result]:visible')).toHaveCount(0);
      await expect(page.locator('[data-filtered-empty]')).toBeVisible();
    }

    await page.getByRole('button', { name: 'Select all', exact: true }).click();
    await expect(checked).toHaveCount(totalCompanies);
    await expect(page.locator('[data-status]')).not.toHaveText(countStatus(0, corpus.total));
    expect(new URL(page.url()).searchParams.has('companies')).toBe(false);

    await page.getByRole('button', { name: 'Clear all', exact: true }).click();
    await page.getByRole('button', { name: 'Select all', exact: true }).click();
    await expect(checked).toHaveCount(totalCompanies);
    await page.locator('[data-search]').fill('');
    if (surface === 'events') await page.locator('[data-kind]').selectOption('all');
    else await expect(page.locator('[data-kind]')).toHaveCount(0);
    expect(new URL(page.url()).search).toBe('');
  }
});

test('Timeline always shows both Signal types while Events retains kind filtering', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  await expect(page.getByText('fixed while filtering', { exact: true })).toHaveCount(0);
  await expect(page.locator('[data-kind]')).toHaveCount(0);
  const corpus = await viewerCorpus(page);
  const serializedKinds = corpus.events.map((event) => event.kind);
  expect(new Set(serializedKinds)).toEqual(new Set(['technical', 'organizational']));
  // Kind populations are derived from the current serialized corpus.
  expect(corpus.technical).toBe(serializedKinds.filter((kind) => kind === 'technical').length);
  expect(corpus.organizational).toBe(serializedKinds.filter((kind) => kind === 'organizational').length);
  expect(corpus.technical + corpus.organizational).toBe(corpus.total);

  const legend = page.locator('.kind-legend');
  await expect(legend.locator('span')).toHaveCount(2);
  expect(await legend.locator('span').allTextContents()).toEqual(['Technical', 'Organizational']);
  const shapes = await legend.locator('.legend-mark').evaluateAll((marks) => marks.map((mark) => ({
    kind: mark.classList.contains('event-kind-technical') ? 'technical' : 'organizational',
    borderRadius: getComputedStyle(mark).borderRadius,
    backgroundColor: getComputedStyle(mark).backgroundColor,
  })));
  expect(shapes[0].borderRadius).not.toBe(shapes[1].borderRadius);
  expect(shapes[0].backgroundColor).not.toBe(shapes[1].backgroundColor);

  for (const kindValue of ['technical', 'organizational']) {
    await page.goto(`./?kind=${kindValue}`);
    await expectExplorerReady(page);
    expect(new URL(page.url()).searchParams.has('kind')).toBe(false);
    await expect(page.locator('[data-kind]')).toHaveCount(0);
    const represented = await visibleTimelineEventIds(page);
    await expect(page.locator('[data-status]')).toHaveText(countStatus(represented.length, corpus.total));
    await expect(page.locator('[data-matrix-mark].event-kind-technical:visible').first()).toBeVisible();
    await expect(page.locator('[data-matrix-mark].event-kind-organizational:visible').first()).toBeVisible();
  }

  await page.goto('./events/');
  await expectExplorerReady(page, 'events');
  await expect(page.locator('[data-kind] option')).toHaveText(['All types', 'Technical', 'Organizational']);
  await page.locator('[data-kind]').selectOption('technical');
  await expect(page.locator('[data-status]')).toHaveText(countStatus(corpus.technical, corpus.total));
  expect(new URL(page.url()).searchParams.get('kind')).toBe('technical');
  await expect(page.locator('.signal-type[data-signal-type="organizational"]:visible')).toHaveCount(0);
  await page.locator('[data-kind]').selectOption('organizational');
  await expect(page.locator('[data-status]')).toHaveText(countStatus(corpus.organizational, corpus.total));
  expect(new URL(page.url()).searchParams.get('kind')).toBe('organizational');
  await expect(page.locator('[data-event-result]:visible .signal-type')).toHaveText(
    Array(corpus.organizational).fill('Organizational'),
  );

  const aliases = new Map([
    ['publication', 'technical'],
    ['conference', 'technical'],
    ['hiring', 'organizational'],
    ['affiliation_change', 'organizational'],
    ['organization', 'organizational'],
    ['business', 'organizational'],
  ]);
  for (const [legacy, canonical] of aliases) {
    await page.goto(`./events/?kind=${legacy}`);
    await expectExplorerReady(page, 'events');
    await expect(page.locator('[data-kind]')).toHaveValue(canonical);
    expect(new URL(page.url()).searchParams.get('kind')).toBe(canonical);
  }

  await page.goto('./events/?kind=other');
  await expectExplorerReady(page, 'events');
  await expect(page.locator('[data-kind]')).toHaveValue('all');
  expect(new URL(page.url()).searchParams.has('kind')).toBe(false);

  expect(new Set(await page.locator('.signal-type').allTextContents())).toEqual(new Set(['Technical', 'Organizational']));
  await page.goto('./events/ecosystem-2025-02-uvm-ms-1-standard/');
  await expect(page.locator('.event-meta')).toContainText('Technical');
  await page.goto('./events/sitime-2023-keiichi-kajino-japan-verification-manager/');
  await expect(page.locator('.event-meta')).toContainText('Organizational');
});
