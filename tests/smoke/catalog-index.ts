import { expect, test, type Page } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { expectScopeLabels, expectActivityBands, expectTitleAndIndexGeometry } from './catalog-presentation';

const linkLabels = { official: 'Website', paper: 'Paper', code: 'Code', results: 'Results' };
export async function catalogFixture(domain: 'analog' | 'digital') {
  const directory = new URL(`../../src/content/${domain}/`, import.meta.url);
  const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => ({
    id: file.slice(0, -3), ...parseFrontmatter(await readFile(new URL(file, directory), 'utf8')).frontmatter,
  })));
  const activity = JSON.parse(await readFile(new URL(`../../src/data/${domain}-activity.json`, import.meta.url), 'utf8'));
  const date = (id: string) => activity.projects[id].lastCommitAt ?? activity.projects[id].lastPublicUpdateAt;
  const key = (name: string) => name.normalize('NFKC').toLowerCase().trim();
  const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
  const ordered = [...projects].sort((a, b) => compare(date(b.id), date(a.id)) || compare(key(a.name), key(b.name)) || compare(a.id, b.id));
  const attribute = 'data-catalog-project';
  return { domain, attribute, projects, ordered, activity,
    rows: (page: Page) => page.locator(`[${attribute}]`),
    row: (page: Page, id: string) => page.locator(`[${attribute}="${id}"]`),
  };
}

export function catalogSearchRegression(fixture: Awaited<ReturnType<typeof catalogFixture>>, queries: Record<string, string[]>) {
  test(`${fixture.domain} descriptions keep identifying technical terms discoverable`, async ({ page }) => {
    await page.goto(`./${fixture.domain}/`);
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    for (const [query, ids] of Object.entries(queries)) {
      await test.step(query, async () => {
        await search.fill(query);
        for (const id of ids) await expect(fixture.row(page, id)).toBeVisible();
        const count = await fixture.rows(page).filter({ visible: true }).count();
        expect(count).toBeGreaterThanOrEqual(ids.length);
        expect(count).toBeLessThan(fixture.projects.length);
        await expect(page.getByRole('status')).toHaveText(`${count} of ${fixture.projects.length} projects`);
        // Filtering a later row into first position must not restore a top rule.
        await expect(fixture.rows(page).filter({ visible: true }).first()).toHaveCSS('border-top-width', '0px');
      });
    }
  });
}

export function catalogIndexTests(fixture: Awaited<ReturnType<typeof catalogFixture>>, scopeStageLabels: Record<string, string>, inspect: string[]) {
  const { domain, attribute, projects, ordered, activity, rows, row } = fixture;
  const label = domain === 'analog' ? 'Analog' : 'Digital';
  const open = (page: Page) => page.goto(`./${domain}/`);
  const noOverflow = async (page: Page) => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  test(`${label} starts with one sparse, activity-ordered project index`, async ({ page }) => {
    expect((await open(page))!.ok()).toBe(true);
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link')).toHaveText(['Timeline', 'Events', 'Analog', 'Digital', 'Articles']);
    await expect(nav.locator('[aria-current="page"]')).toHaveText(label);
    for (const [text, route] of [['Analog', 'analog'], ['Digital', 'digital']]) {
      await expect(nav.getByRole('link', { name: text, exact: true })).toHaveAttribute('href', `/ams-signals/${route}/`);
    }
    await expect(page).toHaveTitle(`${label} · AMS Signals`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveText(label); await expect(h1).toHaveClass('visually-hidden');
    expect((await h1.boundingBox())!.width).toBeLessThanOrEqual(1);
    const catalog = page.locator(`[data-catalog="${domain}"]`);
    expect(await catalog.evaluate((el) => [...el.children].map((x) => x.tagName))).toEqual(['H1', 'SECTION']);
    await expect(catalog.getByRole('search')).toBeVisible();
    await expect(catalog.getByRole('status')).toHaveText(`${projects.length} projects`);
    await expect(catalog.locator('table, [role="columnheader"], .catalog-columns')).toHaveCount(0);
    await expect(catalog.locator('form + [data-catalog-empty] + ol')).toHaveCount(1);
    await expect(catalog.locator('table, button:not([data-provenance-toggle]), details, summary, [role="region"], [tabindex]')).toHaveCount(0);
    await expect(catalog.locator('[data-provenance-toggle]')).toHaveCount(projects.filter((p) => p.scope.aiDevelopment).length);
    const text = await catalog.textContent();
    expect(text).not.toMatch(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
    const indexText = await catalog.evaluate((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('[data-provenance-panel]').forEach((panel) => panel.remove());
      return clone.textContent;
    });
    for (const forbidden of ['Flow', 'AI Build', 'AI Development', 'AI Runtime', 'AI-powered', 'Keywords', 'Type / Links', 'Traditional', 'AI-enabled', 'Design Agent', 'Landscape', 'Recent additions', 'Methodology', 'What it does', 'Primary sources', 'A–Z', '◐']) expect(indexText).not.toContain(forbidden);
    await expect(catalog.locator('[data-tag-kind], [data-level], .scope-mark, .activity-summary')).toHaveCount(0);
    const rendered = await rows(page).evaluateAll((nodes, attribute) => nodes.map((el) => ({
      id: el.getAttribute(attribute), rowId: el.id,
      name: el.querySelector('h2')!.textContent, nameLinks: el.querySelectorAll('h2 a').length,
      description: el.querySelector(`.catalog-description`)!.textContent,
      descriptions: el.querySelectorAll(`.catalog-description`).length,
      title: el.querySelector<HTMLElement>(`.catalog-title`)!.innerText.replace(/\s+/g, ' ').trim(),
      titleChildren: [...el.querySelector(`.catalog-title`)!.children].map((x) => x.tagName),
      links: [...el.querySelectorAll<HTMLAnchorElement>(`.catalog-title .catalog-quicklinks a`)].map((x) => ({ label: x.textContent, href: x.getAttribute('href') })),
      linkCount: el.querySelectorAll('a').length,
    })), attribute);
    expect(rendered).toEqual(ordered.map((p) => {
      const links = p.sources.filter((s: any) => s.purpose).sort((a: any, b: any) => Object.keys(linkLabels).indexOf(a.purpose) - Object.keys(linkLabels).indexOf(b.purpose))
        .map((s: any) => ({ label: linkLabels[s.purpose as keyof typeof linkLabels], href: s.url }));
      return { id: p.id, rowId: '', name: p.name, nameLinks: 0, description: p.description, descriptions: 1,
        title: [p.name, ...links.map((link: { label: string }) => link.label)].join(' '), titleChildren: ['H2', 'UL'],
        links, linkCount: links.length + (p.developmentEvidence?.sources.length ?? 0) };
    }));
    const ids = await page.locator('[id]').evaluateAll((nodes) => nodes.map((el) => el.id));
    expect(new Set(ids).size).toBe(ids.length);
    await expect(catalog.locator('a[href^="#"], a[href*="/analog/#"], a[href*="/digital/#"]')).toHaveCount(0);
    expect(await catalog.locator('ol, ul').evaluateAll((nodes) => nodes.every((el) => getComputedStyle(el).listStyleType === 'none'))).toBe(true);
  });

  test(`${label} Search uses visible project text with Unicode normalization`, async ({ page }) => {
    await open(page);
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    const visibleIds = () => rows(page).filter({ visible: true }).evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-catalog-project')));
    const publicText = (p: any) => [p.name, p.description,
      ...Object.entries(scopeStageLabels).filter(([id]) => p.scope[id]).map(([id, name]) => `${p.scope[id].ai ? 'AI ' : ''}${name}`),
      p.scope.aiDevelopment ? `AI-${p.scope.aiDevelopment.toUpperCase()}` : '',
    ].join(' ');
    const aiProjects = ordered.filter((p) => /\bAI\b/i.test(publicText(p))).map((p) => p.id);
    expect(aiProjects.length).toBeGreaterThan(0); expect(aiProjects.length).toBeLessThan(projects.length);
    await search.fill('  ＡＩ　');
    await expect.poll(visibleIds).toEqual(aiProjects);
    await expect(page.getByRole('status')).toHaveText(`${aiProjects.length} of ${projects.length} projects`);
    await expect(row(page, aiProjects[0])).toBeVisible();
    await expect(row(page, domain === 'analog' ? 'ngspice' : 'verilator')).toBeHidden();

    await search.fill('AI Design');
    const combinedWords = await visibleIds();
    expect(combinedWords.length).toBeGreaterThan(0);
    expect(combinedWords.every((id) => aiProjects.includes(id))).toBe(true);
    await search.fill('AI DESIGN'); // Match the rendered uppercase badge text too.
    await expect.poll(visibleIds).toEqual(combinedWords);
    await search.fill('ＡＩ　 ｄｅｓｉｇｎ');
    await expect.poll(visibleIds).toEqual(combinedWords);
    await search.press('Enter'); expect(new URL(page.url()).search).toBe('');

    // Name and description are searchable; hidden evidence are not.
    const target = ordered.find((p) => p.id === (domain === 'analog' ? 'ngspice' : 'surfer'))!;
    await search.fill(target.name); await expect(row(page, target.id)).toBeVisible();
    const word = domain === 'analog' ? 'device-model' : 'transaction';
    await search.fill(word); await expect(row(page, target.id)).toBeVisible();
    await search.fill('Defining AI development provenance');
    await expect(rows(page).filter({ visible: true })).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveText(`0 of ${projects.length} projects`);
    await expect(page.getByText('No projects match.', { exact: true })).toBeVisible();
    await search.fill('　 ');
    await expect.poll(visibleIds).toEqual(ordered.map((p) => p.id));
    await expect(page.getByRole('status')).toHaveText(`${projects.length} projects`);
    await expect(page.getByText('No projects match.', { exact: true })).toBeHidden();
  });

  test(`${label} Scope matches each stage with either AI label and combines with Search using AND`, async ({ page }) => {
    await open(page);
    const filter = page.getByRole('combobox', { name: 'Scope', exact: true });
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    const visibleIds = () => rows(page).filter({ visible: true }).evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-catalog-project')));
    await expect(filter.locator('option')).toHaveText(['All scopes', ...Object.values(scopeStageLabels)]);
    for (const stage of Object.keys(scopeStageLabels)) {
      await filter.selectOption(stage);
      const expected = ordered.filter((p) => p.scope[stage]).map((p) => p.id);
      await expect.poll(visibleIds).toEqual(expected);
      await expect(page.getByRole('status')).toHaveText(`${expected.length} of ${projects.length} projects`);
    }
    await filter.selectOption(''); await search.fill('AI');
    const ai = await visibleIds();
    await filter.selectOption('design');
    const expected = ordered.filter((p) => ai.includes(p.id) && p.scope.design).map((p) => p.id);
    expect(expected.length).toBeGreaterThan(0); expect(expected.length).toBeLessThan(ai.length);
    await expect.poll(visibleIds).toEqual(expected);
    await expect(row(page, expected[0])).toBeVisible();
    await expect(row(page, ai.find((id) => !expected.includes(id))!)).toBeHidden();
    await search.fill('no-matching-project-92741');
    await expect(page.getByText('No projects match.', { exact: true })).toBeVisible();
    await filter.selectOption(''); await search.fill('');
    await expect.poll(visibleIds).toEqual(ordered.map((p) => p.id));
  });

  test(`${label} search waits for composed text and keeps focus while updating`, async ({ page }) => {
    await open(page);
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    await search.focus();
    await search.evaluate((input: HTMLInputElement) => {
      input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
      input.value = 'ＡＩ';
      input.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true }));
    });
    await expect(rows(page).filter({ visible: true })).toHaveCount(projects.length);
    await search.dispatchEvent('compositionend');
    await expect(page.getByRole('status')).toContainText(`of ${projects.length} projects`);
    await expect(search).toBeFocused();
    await search.fill('');
    await expect(rows(page).filter({ visible: true })).toHaveCount(projects.length);
  });

  test(`${label} Scope labels preserve stage presence, AI composition and category order`, async ({ page }) => {
    await open(page);
    for (const p of projects) {
      const scope = row(page, p.id).getByRole('list', { name: `${p.name} Scope`, exact: true });
      const cells = await scope.locator('li').evaluateAll((nodes) => nodes.map((el) => ({
        stage: el.getAttribute('data-scope-item'), ai: el.getAttribute('data-ai'), text: el.textContent?.trim(),
      })));
      const expected: { stage: string; ai: string | null; text: string }[] = Object.entries(scopeStageLabels).filter(([stage]) => p.scope[stage]).map(([stage, label]) => {
        const { ai } = p.scope[stage];
        return { stage, ai: String(ai), text: `${ai ? 'AI ' : ''}${label}` };
      });
      if (p.scope.aiDevelopment) expected.push({ stage: 'aiDevelopment', ai: null, text: `AI-${p.scope.aiDevelopment.toUpperCase()}` });
      expect(cells).toEqual(expected);
      expect(new Set(cells.map((cell) => cell.stage)).size).toBe(cells.length);
      expect(cells.length).toBeGreaterThan(0);
    }
    await expectScopeLabels(page.locator(`.catalog-scope`));
  });

  test(`${label} every row preserves twelve month/value pairs from oldest left to newest right`, async ({ page }) => {
    await open(page); await expectActivityBands(rows(page), `.catalog-activity`, activity);
  });

  test(`${label} provenance badges disclose specific evidence with keyboard state and working source links`, async ({ page }, info) => {
    await open(page);
    const originalUrl = page.url();
    for (const project of ordered.filter((p) => p.scope.aiDevelopment)) {
      const item = row(page, project.id);
      await expect(item.locator('[data-ai-development]')).toHaveCount(1);
      await expect(item.locator('[data-provenance-panel]')).toBeHidden();
      await expect(item.locator('[data-provenance-toggle]')).toHaveAttribute('aria-expanded', 'false');
    }
    for (const level of ['assisted', 'built']) {
      const project = ordered.find((p) => p.scope.aiDevelopment === level)!;
      expect(project).toBeDefined();
      const item = row(page, project.id), button = item.locator('[data-provenance-toggle]');
      const panel = item.locator('[data-provenance-panel]');
      await expect(button).toHaveText(`AI-${level.toUpperCase()}`);
      await expect(button).toHaveAccessibleName(`AI-${level.toUpperCase()}: development provenance for ${project.name}`);
      await expect(button).toHaveAttribute('aria-controls', (await panel.getAttribute('id'))!);
      await button.focus();
      await expect(button).toBeFocused();
      await expect(button).toHaveCSS('outline-style', 'solid');
      await expect(button).toHaveCSS('outline-width', '3px');
      await button.press('Enter');
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await expect(panel).toBeVisible();
      await expect(panel.locator('.catalog-provenance-heading')).toHaveText('Development provenance');
      await expect(panel.locator('.catalog-provenance-summary')).toHaveText(project.developmentEvidence.summary);
      const sources = project.developmentEvidence.sources.map((id: string) => project.sources.find((s: any) => s.id === id));
      expect(await panel.locator('a').evaluateAll((links) => links.map((a) => ({ text: a.textContent, url: a.getAttribute('href') }))))
        .toEqual(sources.map((source: any) => ({ text: source.title, url: source.url })));
      await expect(button).toBeFocused();
      await expect(page).toHaveURL(originalUrl);
      await noOverflow(page);
      await item.scrollIntoViewIfNeeded();
      await page.screenshot({ path: info.outputPath(`${domain}-${level}-evidence-keyboard.png`) });
      await button.press('Space');
      await expect(button).toHaveAttribute('aria-expanded', 'false');
      await expect(panel).toBeHidden();
      await button.press('Enter');
      const sourceLink = panel.locator('a').first(), href = sources[0].url;
      await page.route(href, (route) => route.fulfill({ contentType: 'text/html', body: '<h1>Development evidence destination</h1>' }));
      await sourceLink.focus(); await page.keyboard.press('Enter');
      await expect(page).toHaveURL(href);
      await page.goBack();
      await expect(rows(page)).toHaveCount(projects.length);
    }
  });

  test(`${label} both provenance labels are searchable and remain independent of functional filters`, async ({ page }) => {
    await open(page);
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    const filter = page.getByRole('combobox', { name: 'Scope', exact: true });
    const visibleIds = () => rows(page).filter({ visible: true }).evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-catalog-project')));
    const publicText = (p: any) => [p.name, p.description,
      ...Object.entries(scopeStageLabels).filter(([id]) => p.scope[id]).map(([id, name]) => `${p.scope[id].ai ? 'AI ' : ''}${name}`),
      p.scope.aiDevelopment ? `AI-${p.scope.aiDevelopment}` : '',
    ].join(' ').normalize('NFKC').toLowerCase().replace(/[\p{P}\p{S}]+/gu, ' ');
    for (const level of ['assisted', 'built']) {
      const expected = ordered.filter((p) => /\bai\b/.test(publicText(p)) && publicText(p).includes(level));
      for (const query of [`AI-${level.toUpperCase()}`, `ai ${level}`]) {
        await search.fill(query);
        await expect.poll(visibleIds).toEqual(expected.map((p) => p.id));
      }
      const project = expected.find((p) => p.scope.aiDevelopment === level)!;
      const button = row(page, project.id).locator('[data-provenance-toggle]');
      await button.click();
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      for (const stage of Object.keys(scopeStageLabels)) {
        await filter.selectOption(stage);
        await expect.poll(visibleIds).toEqual(expected.filter((p) => p.scope[stage]).map((p) => p.id));
      }
      await filter.selectOption('');
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await button.click(); await expect(button).toHaveAttribute('aria-expanded', 'false');
      await expect.poll(visibleIds).toEqual(expected.map((p) => p.id));
    }
    await search.fill('Development provenance');
    await expect(rows(page).filter({ visible: true })).toHaveCount(0);
    await search.fill('');
    await expect.poll(visibleIds).toEqual(ordered.map((p) => p.id));
  });

  test(`${label} provenance disclosures work by touch at narrow widths`, async ({ browser, baseURL }, info) => {
    const context = await browser.newContext({ baseURL, hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await open(page);
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      for (const level of ['assisted', 'built']) {
        const project = ordered.find((p) => p.scope.aiDevelopment === level)!;
        const item = row(page, project.id), button = item.locator('[data-provenance-toggle]');
        const panel = item.locator('[data-provenance-panel]');
        await button.tap();
        await expect(button).toHaveAttribute('aria-expanded', 'true');
        await expect(panel).toBeVisible();
        const bounds = await item.evaluate((el) => {
          const panel = el.querySelector<HTMLElement>('[data-provenance-panel]')!, button = el.querySelector('button')!;
          const row = el.getBoundingClientRect(), box = panel.getBoundingClientRect(), target = button.getBoundingClientRect();
          const extension = getComputedStyle(button, '::after');
          return { left: box.left >= row.left, right: box.right <= row.right,
            width: box.width, targetHeight: target.height - parseFloat(extension.top) - parseFloat(extension.bottom) };
        });
        expect(bounds.left && bounds.right).toBe(true);
        expect(bounds.width).toBeGreaterThan(250);
        expect(bounds.targetHeight).toBeGreaterThanOrEqual(24);
        await noOverflow(page);
        await item.evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
        await page.screenshot({ path: info.outputPath(`${domain}-${level}-evidence-touch-${width}.png`) });
        await button.tap(); await expect(button).toHaveAttribute('aria-expanded', 'false');
        await expect(panel).toBeHidden();
      }
    }
    await context.close();
  });

  test(`${label} keyboard navigation reaches filters, provenance and useful external actions`, async ({ page }) => {
    await open(page);
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    for (let i = 0; i < 8 && !await search.evaluate((el) => el === document.activeElement); i++) await page.keyboard.press('Tab');
    await expect(search).toBeFocused();
    expect(await search.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
    await page.keyboard.press('Tab'); await expect(page.getByRole('combobox', { name: 'Scope', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    const actions = rows(page).locator('[data-provenance-toggle], .catalog-quicklinks a');
    await expect(actions.first()).toBeFocused();
    const first = rows(page).first().locator(`.catalog-quicklinks a`).first();
    // A provenance button precedes quick links when the first row has a label.
    if (ordered[0].scope.aiDevelopment) await page.keyboard.press('Tab');
    await expect(first).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(actions.nth(ordered[0].scope.aiDevelopment ? 2 : 1)).toBeFocused();
    await page.keyboard.press('Shift+Tab'); await expect(first).toBeFocused();
    const href = (await first.getAttribute('href'))!;
    await page.route(href, (route) => route.fulfill({ contentType: 'text/html', body: '<h1>Primary source destination</h1>' }));
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(href);
    await page.goBack(); await expect(rows(page)).toHaveCount(projects.length);
  });

  test(`${label} descriptions, Scope, activity and external links work without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage(); await open(page);
    await expect(page.getByRole('searchbox')).toHaveCount(0);
    await expect(page.locator('[data-catalog-filters]')).toBeHidden();
    await expect(rows(page).filter({ visible: true })).toHaveCount(projects.length);
    await expect(rows(page)).toHaveCount(projects.length);
    await expect(rows(page).locator(`.catalog-description`)).toHaveText(ordered.map((p) => p.description));
    await expectScopeLabels(page.locator(`.catalog-scope`));
    await expectActivityBands(rows(page), `.catalog-activity`, activity);
    await expect(rows(page).locator('[data-provenance-toggle]')).toHaveCount(0);
    const labeled = ordered.filter((p) => p.scope.aiDevelopment);
    await expect(rows(page).locator('[data-provenance-panel]')).toHaveCount(labeled.length);
    for (const project of labeled) {
      const panel = row(page, project.id).locator('[data-provenance-panel]');
      await expect(panel).toBeVisible();
      await expect(panel.locator('.catalog-provenance-summary')).toHaveText(project.developmentEvidence.summary);
      expect(await panel.locator('a').evaluateAll((links) => links.map((a) => a.getAttribute('href'))))
        .toEqual(project.developmentEvidence.sources.map((id: string) => project.sources.find((s: any) => s.id === id).url));
    }
    const last = rows(page).last().locator(`.catalog-quicklinks a`).first();
    await last.scrollIntoViewIfNeeded(); await expect(last).toBeInViewport();
    const href = (await last.getAttribute('href'))!;
    await page.route(href, (route) => route.fulfill({ contentType: 'text/html', body: '<h1>Primary source destination</h1>' }));
    await last.click(); await expect(page).toHaveURL(href);
    await page.goBack(); await page.reload(); await expect(rows(page)).toHaveCount(projects.length);
    await context.close();
  });

  for (const [width, height] of [[1440, 900], [1280, 800], [1024, 768], [390, 844], [320, 568]]) {
    test(`${label} compact index fits ${width}px without overflow or overlapping content`, async ({ page }, info) => {
      await page.setViewportSize({ width, height }); await open(page); await noOverflow(page);
      await expectTitleAndIndexGeometry(rows(page), width);
      await expectActivityBands(rows(page), `.catalog-activity`, activity);
      if (width >= 1024) {
        // Two-sentence descriptions can leave the fourth row partially visible at 768px high.
        const minimumCompleteRows = height >= 800 ? 4 : 3;
        expect(await rows(page).evaluateAll((nodes) => nodes.filter((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }).length)).toBeGreaterThanOrEqual(minimumCompleteRows);
      }
      await expect(page.locator('.catalog-columns')).toHaveCount(0);
      const toolbar = page.locator('[data-catalog-filters]');
      const geometry = await toolbar.evaluate((el) => {
        const s = getComputedStyle(el);
        const rect = (selector: string) => { const r = el.querySelector(selector)!.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width }; };
        return { borders: [s.borderTopWidth, s.borderBottomWidth], shadow: s.boxShadow,
          search: rect('input'), scope: rect('select'), count: rect('[role="status"]') };
      });
      expect(geometry.borders).toEqual(['0px', '0px']); expect(geometry.shadow).toBe('none');
      if (width >= 1024) {
        expect(geometry.search.width).toBe(300); expect(geometry.scope.width).toBe(150);
        expect(geometry.count.left - geometry.scope.right).toBeCloseTo(12, 1);
      } else {
        expect(geometry.search.bottom).toBeLessThan(geometry.scope.top);
        expect(geometry.search.left).toBe(geometry.scope.left);
        expect(geometry.scope.right).toBeLessThan(geometry.count.left);
        expect(geometry.count.left - geometry.scope.right).toBeCloseTo(12, 1);
      }
      await page.screenshot({ path: info.outputPath(`${domain}-index-${width}.png`) });
      if (width < 1024) {
        await page.getByRole('searchbox', { name: 'Search projects' }).fill('AI');
        await page.getByRole('combobox', { name: 'Scope', exact: true }).selectOption('design');
        await noOverflow(page);
        await expect(page.getByRole('status')).toHaveText(`${await rows(page).filter({ visible: true }).count()} of ${projects.length} projects`);
        await expect(page.getByRole('status')).toBeInViewport();
        await page.screenshot({ path: info.outputPath(`${domain}-filtered-${width}.png`) });
        await page.getByRole('searchbox', { name: 'Search projects' }).fill('');
        await page.getByRole('combobox', { name: 'Scope', exact: true }).selectOption('');
      }
      const selected = new Set([ordered[0].id, ordered[Math.floor(projects.length / 2)].id, ordered.at(-1)!.id, ...inspect]);
      for (const id of selected) {
        await row(page, id).evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
        await noOverflow(page);
        await page.screenshot({ path: info.outputPath(`${domain}-row-${width}-${id}.png`) });
      }
    });
  }

  test(`${label} introduces no storage or external requests and preserves viewer/navigation isolation`, async ({ page }) => {
    await page.goto('./events/?q=PLL&kind=organizational&companies=apple');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    const link = nav.getByRole('link', { name: label, exact: true });
    await expect(link).not.toHaveAttribute('data-filter-view-link');
    await expect(link).not.toHaveAttribute('data-filter-surface');
    const before = await page.evaluate(() => Object.entries(localStorage));
    const external: string[] = [];
    page.on('request', (request) => { if (new URL(request.url()).origin !== new URL(page.url()).origin) external.push(request.url()); });
    await link.click(); await expect(rows(page)).toHaveCount(projects.length);
    await page.getByRole('searchbox', { name: 'Search projects' }).fill('AI');
    await page.getByRole('combobox', { name: 'Scope', exact: true }).selectOption('design');
    expect(new URL(page.url()).search).toBe('');
    expect(await page.evaluate(() => Object.entries(localStorage))).toEqual(before);
    expect(external).toEqual([]);
    for (const name of ['Timeline', 'Events', 'Articles']) {
      await nav.getByRole('link', { name, exact: true }).click();
      await expect(nav.locator('[aria-current="page"]')).toHaveText(name);
      expect(new URL(page.url()).search).toBe('');
      if (name !== 'Articles') await expect(page.locator('[data-search]')).toHaveValue('');
      await page.goBack(); await expect(rows(page)).toHaveCount(projects.length);
    }
  });

  test(`${label} Scope and binary activity remain distinct in forced colors`, async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' }); await open(page);
    await expectScopeLabels(page.locator(`.catalog-scope`), true);
    await expectActivityBands(rows(page), `.catalog-activity`, activity);
  });
}
