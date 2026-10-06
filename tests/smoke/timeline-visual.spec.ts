import { expect, test } from '@playwright/test';
import { installBrowserErrorGuards } from './release-helpers.mjs';

installBrowserErrorGuards(test);

const selectionShadow = (scheme: 'light' | 'dark') => scheme === 'light'
  ? 'rgb(255, 254, 251) 0px 0px 0px 2px, rgb(36, 43, 48) 0px 0px 0px 4px'
  : 'rgb(23, 28, 24) 0px 0px 0px 2px, rgb(237, 242, 237) 0px 0px 0px 4px';

for (const colorScheme of ['light', 'dark'] as const) {
  test(`Events use compact, distinct semantic badges in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('./events/');
    const badges = [];
    for (const kind of ['technical', 'organizational']) {
      const badge = page.locator(`[data-event-result]:visible .signal-type-${kind}`).first();
      await expect(badge).toBeVisible();
      await expect(badge).toHaveAttribute('data-signal-type', kind);
      const result = await badge.evaluate((el, kind) => {
        const s = getComputedStyle(el), r = el.getBoundingClientRect();
        const probe = document.createElement('span');
        probe.style.background = `var(--${kind})`; el.append(probe);
        const semantic = getComputedStyle(probe).backgroundColor; probe.remove();
        const luminance = (rgb: string) => rgb.match(/[\d.]+/g)!.slice(0, 3).map(Number)
          .map((n) => n / 255).map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)
          .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
        const [light, dark] = [luminance(s.color), luminance(s.backgroundColor)].sort((a, b) => b - a);
        return { color: s.color, background: s.backgroundColor, semantic, transform: s.textTransform,
          radius: parseFloat(s.borderRadius), height: r.height, label: el.textContent, contrast: (light + 0.05) / (dark + 0.05) };
      }, kind);
      expect(result.label!.toLowerCase()).toBe(kind);
      expect(result.color).toBe(result.semantic); expect(result.background).not.toBe(result.color);
      expect(result.transform).toBe('none'); expect(result.radius).toBe(0);
      expect(result.height).toBeGreaterThanOrEqual(18); expect(result.height).toBeLessThanOrEqual(24);
      expect(result.contrast).toBeGreaterThanOrEqual(4.5);
      badges.push(result);
    }
    expect(badges[0].background).not.toBe(badges[1].background);
    await page.getByRole('combobox', { name: 'Signal type', exact: true }).selectOption('technical');
    await expect(page.locator('[data-event-result]:visible .signal-type-organizational')).toHaveCount(0);
    await expect(page.locator('[data-event-result]:visible .signal-type-technical').first()).toBeVisible();
  });
}

for (const colorScheme of ['light', 'dark'] as const) {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 568 }]) {
    test(`Timeline glyphs, selection and hit areas agree across global/company/person at ${viewport.width}px in ${colorScheme}`, async ({ page }, info) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
      const shapes = new Map<string, string>();
      const colors = new Map<string, string>();
      for (const route of ['', 'companies/apple/', 'companies/renesas/', 'people/toshi-kawashima/']) {
        await page.goto(`./${route}`);
        await page.mouse.move(0, 0);
        await expect(page.locator('[data-status]')).toHaveText(/\d+ of \d+ events?$/);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);
        const toolbar = page.locator('.filter-toolbar');
        expect(await toolbar.evaluate((el) => {
          const s = getComputedStyle(el); return [s.borderTopWidth, s.borderBottomWidth, s.boxShadow];
        })).toEqual(['0px', '0px', 'none']);
        const labels = page.locator('.matrix-entity-label, .timeline-lane > .lane-label');
        const labelColors = await labels.evaluateAll((nodes) => nodes.map((el) => ({
          type: el.closest<HTMLElement>('[data-lane-type]')!.dataset.laneType,
          color: getComputedStyle(el).color,
        })));
        expect(labelColors.length).toBeGreaterThan(0);
        for (const label of labelColors) {
          expect(['company', 'person']).toContain(label.type);
          expect(label.color).toBe(colorScheme === 'light'
            ? (label.type === 'company' ? 'rgb(36, 43, 48)' : 'rgb(75, 109, 137)')
            : (label.type === 'company' ? 'rgb(237, 242, 237)' : 'rgb(143, 169, 190)'));
        }
        const firstLabel = page.locator('.matrix-entity-label:visible, .timeline-lane > .lane-label:visible').first();
        const labelColor = await firstLabel.evaluate((el) => getComputedStyle(el).color);
        await firstLabel.hover();
        await expect(firstLabel).toHaveCSS('color', labelColor);
        await expect(firstLabel).toHaveCSS('text-decoration-line', 'underline');
        await page.mouse.move(0, 0);
        const marks = page.locator('[data-event-mark]:visible');
        const measured = await marks.evaluateAll((nodes) => nodes.map((el) => {
          const glyph = el.querySelector<HTMLElement>('.timeline-glyph')!;
          const s = getComputedStyle(glyph), box = el.getBoundingClientRect(), g = glyph.getBoundingClientRect();
          return { hit: [box.width, box.height], glyph: [s.width, s.height], renderedWidth: g.width, radius: s.borderRadius,
            active: el.classList.contains('is-active'), border: s.borderWidth, outline: s.outlineStyle, shadow: s.boxShadow,
            kind: el.classList.contains('event-kind-technical') ? 'technical' : 'organizational',
            background: s.backgroundColor, centered: [Math.abs(g.x + g.width / 2 - box.x - box.width / 2), Math.abs(g.y + g.height / 2 - box.y - box.height / 2)] };
        }));
        expect(measured.length).toBeGreaterThan(0);
        for (const mark of measured) {
          expect(mark.hit).toEqual([18, 18]); expect(mark.glyph).toEqual(['8px', '8px']);
          expect(mark.renderedWidth).toBeCloseTo(8, 1);
          expect(Math.max(...mark.centered)).toBeLessThan(0.1);
          expect(mark.radius).toBe(mark.kind === 'technical' ? '50%' : '0px');
          expect(mark.background).toBe(mark.kind === 'technical' ? 'rgb(75, 109, 137)' : 'rgb(136, 100, 84)');
          expect([mark.border, mark.outline, mark.shadow]).toEqual(['0px', 'none', mark.active ? selectionShadow(colorScheme) : 'none']);
          if (shapes.has(mark.kind)) expect(mark.radius).toBe(shapes.get(mark.kind));
          if (colors.has(mark.kind)) expect(mark.background).toBe(colors.get(mark.kind));
          shapes.set(mark.kind, mark.radius); colors.set(mark.kind, mark.background);
        }
        for (const kind of ['technical', 'organizational']) {
          const legend = page.locator(`.legend-mark.event-kind-${kind}`);
          await expect(legend).toHaveCSS('background-color', colors.get(kind)!);
          await expect(legend).toHaveCSS('border-radius', shapes.get(kind)!);
          await expect(legend).toHaveCSS('width', '8px');
          await expect(legend).toHaveCSS('height', '8px');
          await expect(legend).toHaveCSS('border-width', '0px');
          await expect(legend).toHaveCSS('outline-style', 'none');
          await expect(legend).toHaveCSS('box-shadow', 'none');
        }
        for (const kind of ['technical', 'organizational']) {
          const candidates = page.locator(`[data-event-mark].event-kind-${kind}:visible`);
          if (await candidates.count() === 0) continue;
          const mark = candidates.first();
          const id = await mark.getAttribute('data-event-id');
          const linked = page.locator(`[data-event-mark][data-event-id="${id}"]:visible`);
          if (!(await mark.evaluate((el) => el.classList.contains('is-active')))) {
            await mark.hover();
            expect((await mark.locator('.timeline-glyph').boundingBox())!.width).toBeCloseTo(9.2, 1);
          }
          await mark.click();
          await expect(mark).toHaveAttribute('aria-pressed', 'true');
          for (const active of await linked.all()) {
            await expect(active.locator('.timeline-glyph')).toHaveCSS('box-shadow', selectionShadow(colorScheme));
            await expect(active.locator('.timeline-glyph')).toHaveCSS('transform', 'none');
          }
          await mark.hover();
          await expect(mark.locator('.timeline-glyph')).toHaveCSS('box-shadow', selectionShadow(colorScheme));
          expect((await mark.locator('.timeline-glyph').boundingBox())!.width).toBeCloseTo(8, 1);
          await page.mouse.move(0, 0);
          await mark.focus(); await page.keyboard.press('Enter');
          expect(await mark.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
          await expect(mark.locator('.timeline-glyph')).toHaveCSS('box-shadow', selectionShadow(colorScheme));
          await expect(page.locator('[data-detail-title]')).toBeVisible();
          await page.screenshot({ path: info.outputPath(`timeline-${route.replaceAll('/', '-') || 'global'}-${viewport.width}-${colorScheme}-${kind}.png`) });

          const other = page.locator(`[data-event-mark]:visible:not([data-event-id="${id}"])`).first();
          if (await other.count()) {
            await other.focus(); await page.keyboard.press('Space');
            await expect(other).toHaveAttribute('aria-pressed', 'true');
            for (const deselected of await linked.all()) {
              await expect(deselected).toHaveAttribute('aria-pressed', 'false');
              await expect(deselected.locator('.timeline-glyph')).toHaveCSS('box-shadow', 'none');
            }
          }
        }
        await page.locator('[data-search]').fill('zzzz-no-matching-selection');
        await expect(page.locator('[data-event-mark].is-active')).toHaveCount(0);
        await page.locator('[data-search]').fill('');
        await expect(page.locator('[data-event-mark].is-active').first()).toHaveAttribute('aria-pressed', 'true');
      }
      expect(new Set(shapes.values()).size).toBe(2); expect(new Set(colors.values()).size).toBe(2);
    });
  }
}
test('Timeline category shapes and selection remain visible in forced colors', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  const selected = [];
  for (const route of ['', 'companies/apple/', 'people/toshi-kawashima/']) {
    await page.goto(`./${route}`);
    await expect(page.locator('[data-status]')).toHaveText(/\d+ of \d+ events?$/);
    const mark = page.locator('[data-event-mark]:visible').first();
    await mark.focus(); await page.keyboard.press('Enter');
    await expect(mark).toHaveAttribute('aria-pressed', 'true');
    const colors = await mark.locator('.timeline-glyph').evaluate((el) => {
      const s = getComputedStyle(el); return { background: s.backgroundColor, border: s.borderWidth, shadow: s.boxShadow,
        width: el.getBoundingClientRect().width, outline: s.outlineStyle, outlineWidth: s.outlineWidth, offset: s.outlineOffset };
    });
    expect(colors.border).toBe('0px'); expect(colors.shadow).toBe('none');
    expect(colors.width).toBeCloseTo(8, 1);
    expect([colors.outline, colors.outlineWidth, colors.offset]).toEqual(['solid', '2px', '2px']);
    expect(await mark.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
    const kind = await mark.evaluate((el) => el.classList.contains('event-kind-technical') ? 'technical' : 'organizational');
    await expect(page.locator(`.legend-mark.event-kind-${kind}`)).toHaveCSS('background-color', colors.background);
    selected.push(colors);
  }
  expect(selected[0]).toEqual(selected[1]); expect(selected[1]).toEqual(selected[2]);
});

for (const colorScheme of ['light', 'dark'] as const) {
  test(`Timeline selection rings fit dense marks, shared Events and scroll edges in ${colorScheme}`, async ({ page }, info) => {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('./?q=UVM-MS');
      const shared = page.locator('[data-event-mark][data-event-id="ecosystem-2025-02-uvm-ms-1-standard"]:visible');
      expect(await shared.count()).toBeGreaterThan(1);
      await shared.first().click();
      for (const mark of await shared.all()) {
        await expect(mark).toHaveAttribute('aria-pressed', 'true');
        await expect(mark.locator('.timeline-glyph')).toHaveCSS('box-shadow', selectionShadow(colorScheme));
      }
      await page.locator('[data-search]').fill('');
      const bundleIndex = await page.locator('.activity-bundle:visible').evaluateAll((nodes) =>
        nodes.reduce((best, el, i) => el.querySelectorAll('[data-event-mark]').length > nodes[best].querySelectorAll('[data-event-mark]').length ? i : best, 0));
      const dense = page.locator('.activity-bundle:visible').nth(bundleIndex);
      expect(await dense.locator('[data-event-mark]').count()).toBeGreaterThan(1);
      await dense.locator('[data-event-mark]').first().click();
      await expect(dense.locator('.is-active').first()).toHaveAttribute('aria-pressed', 'true');
      await page.mouse.move(0, 0);
      await page.screenshot({ path: info.outputPath(`dense-${width}-${colorScheme}.png`) });

      for (const route of ['', 'companies/apple/', 'people/toshi-kawashima/']) {
        await page.goto(`./${route}`);
        await expect(page.locator('[data-status]')).toHaveText(/\d+ of \d+ events?$/);
        const marks = page.locator('[data-event-mark]:visible');
        // A selected ring is 16px, so its whole painted extent remains inside
        // the original 18px target, row and track even at content boundaries.
        const issues = await marks.evaluateAll((nodes) => nodes.flatMap((el) => {
          const glyph = el.querySelector('.timeline-glyph')!.getBoundingClientRect();
          const hit = el.getBoundingClientRect();
          const row = el.closest('.activity-matrix-row, .timeline-lane')!.getBoundingClientRect();
          const track = el.closest('.activity-row-track, .lane-track')!.getBoundingClientRect();
          const painted = { left: glyph.left - 4, right: glyph.right + 4, top: glyph.top - 4, bottom: glyph.bottom + 4 };
          const inside = (outer: DOMRect) => painted.left >= outer.left - 0.1 && painted.right <= outer.right + 0.1
            && painted.top >= outer.top - 0.1 && painted.bottom <= outer.bottom + 0.1;
          return inside(hit) && inside(row) && inside(track) ? [] : [el.getAttribute('data-event-id')];
        }));
        expect(issues, `${route || 'global'} at ${width}px: unclipped ring bounds`).toEqual([]);
        const scroll = page.locator('.activity-matrix-scroll, .timeline-scroll').first();
        for (const edge of ['left', 'right']) {
          await scroll.evaluate((el, edge) => { el.scrollLeft = edge === 'left' ? 0 : el.scrollWidth; }, edge);
          const candidateIndex = await marks.evaluateAll((nodes, edge) => {
            const el = nodes[0].closest('.activity-matrix-scroll, .timeline-scroll')!;
            const viewport = el.getBoundingClientRect();
            const label = el.querySelector('.matrix-entity-label, .lane-label')!.getBoundingClientRect();
            const visible = nodes.map((node, i) => ({ i, box: node.getBoundingClientRect() }))
              .filter(({ box }) => box.left >= label.right && box.right <= viewport.right - 1);
            visible.sort((a, b) => edge === 'left' ? a.box.left - b.box.left : b.box.right - a.box.right);
            return visible[0]?.i ?? -1;
          }, edge);
          expect(candidateIndex, `${route || 'global'} ${width}px ${edge} edge`).toBeGreaterThanOrEqual(0);
          const mark = marks.nth(candidateIndex);
          await mark.click(); await page.mouse.move(0, 0);
          await expect(mark.locator('.timeline-glyph')).toHaveCSS('box-shadow', selectionShadow(colorScheme));
          await page.screenshot({ path: info.outputPath(`edge-${route.replaceAll('/', '-') || 'global'}-${width}-${colorScheme}-${edge}.png`) });
        }
      }
    }
  });
}
