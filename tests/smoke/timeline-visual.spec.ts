import { expect, test } from '@playwright/test';

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
      expect(result.background).toBe(result.semantic); expect(result.background).not.toBe(result.color);
      expect(result.transform).toBe('uppercase'); expect(result.radius).toBeLessThanOrEqual(3);
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

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 568 }]) {
  test(`Timeline glyphs, selection and hit areas agree across global/company/person at ${viewport.width}px`, async ({ page }, info) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
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
        expect(label.color).toBe(label.type === 'company' ? 'rgb(36, 43, 48)' : 'rgb(75, 109, 137)');
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
        expect(mark.renderedWidth).toBeCloseTo(mark.active ? 9.2 : 8, 1);
        expect(Math.max(...mark.centered)).toBeLessThan(0.1);
        expect(mark.radius).toBe(mark.kind === 'technical' ? '50%' : '0px');
        expect(mark.background).toBe(mark.kind === 'technical' ? 'rgb(75, 109, 137)' : 'rgb(136, 100, 84)');
        expect([mark.border, mark.outline, mark.shadow]).toEqual(['0px', 'none', 'none']);
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
      const inactiveIndex = await marks.evaluateAll((nodes) => nodes.findIndex((el) => !el.classList.contains('is-active')));
      const mark = marks.nth(inactiveIndex);
      await mark.hover();
      expect((await mark.locator('.timeline-glyph').boundingBox())!.width).toBeCloseTo(9.2, 1);
      await mark.click(); await page.mouse.move(0, 0);
      await expect(mark).toHaveAttribute('aria-pressed', 'true');
      await expect(mark.locator('.timeline-glyph')).toHaveCSS('box-shadow', 'none');
      expect((await mark.locator('.timeline-glyph').boundingBox())!.width).toBeCloseTo(9.2, 1);
      await mark.focus(); await page.keyboard.press('Enter');
      expect(await mark.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
      await expect(page.locator('[data-detail-title]')).toBeVisible();
      await page.screenshot({ path: info.outputPath(`timeline-${route.replaceAll('/', '-') || 'global'}-${viewport.width}.png`) });
    }
    expect(new Set(shapes.values()).size).toBe(2); expect(new Set(colors.values()).size).toBe(2);
  });
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
        width: el.getBoundingClientRect().width };
    });
    expect(colors.border).toBe('0px'); expect(colors.shadow).toBe('none');
    expect(colors.width).toBeCloseTo(9.2, 1);
    expect(await mark.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
    const kind = await mark.evaluate((el) => el.classList.contains('event-kind-technical') ? 'technical' : 'organizational');
    await expect(page.locator(`.legend-mark.event-kind-${kind}`)).toHaveCSS('background-color', colors.background);
    selected.push(colors);
  }
  expect(selected[0]).toEqual(selected[1]); expect(selected[1]).toEqual(selected[2]);
});
