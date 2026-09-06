import { expect, test, type Page } from '@playwright/test';

const scopeColors = { design: 'green', simulation: 'blue', verification: 'blue', synthesis: 'gold', layout: 'rust', aiBuilt: 'red' };
const kindColors = { technical: 'blue', organizational: 'rust' };

function contrast(first: string, second: string) {
  const luminance = (color: string) => color.match(/[\d.]+/g)!.slice(0, 3).map(Number)
    .map((n) => n / 255).map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)
    .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

async function readColors(page: Page) {
  return page.evaluate(() => {
    // Probe the foundation tokens outside any page-specific component.
    const probe = document.createElement('span');
    document.body.append(probe);
    const resolve = (name: string) => {
      probe.style.backgroundColor = `var(--${name})`;
      return getComputedStyle(probe).backgroundColor;
    };
    const tokens = Object.fromEntries(['green', 'blue', 'gold', 'rust', 'red', 'ink'].map((name) => [name, resolve(`category-${name}`)]));
    const semantics = { technical: resolve('technical'), organizational: resolve('organizational') };
    const surfaces = [resolve('bg'), resolve('surface')];
    probe.remove();
    const badges = [...document.querySelectorAll<HTMLElement>('.category-label')].map((el) => {
      const style = getComputedStyle(el);
      return { scope: el.dataset.scopeItem, kind: el.dataset.signalType, label: el.textContent!.trim(),
        fill: style.backgroundColor, ink: style.color, opacity: style.opacity };
    });
    const glyphs = [...document.querySelectorAll('.timeline-glyph, .legend-mark')].map((el) => {
      const style = getComputedStyle(el);
      return { kind: el.closest('.event-kind-technical') ? 'technical' : 'organizational',
        fill: style.backgroundColor, shape: style.borderRadius };
    });
    return { tokens, semantics, surfaces, badges, glyphs };
  });
}

function expectMapping(colors: Awaited<ReturnType<typeof readColors>>, checkContrast: boolean) {
  const { tokens, semantics, surfaces, badges, glyphs } = colors;
  expect(semantics).toEqual({ technical: tokens.blue, organizational: tokens.rust });
  expect(new Set(['green', 'blue', 'gold', 'rust', 'red'].map((key) => tokens[key])).size).toBe(5);
  for (const badge of badges) {
    const color = badge.scope ? scopeColors[badge.scope as keyof typeof scopeColors] : kindColors[badge.kind as keyof typeof kindColors];
    expect(color, badge.label).toBeDefined();
    expect(badge.fill, badge.label).toBe(tokens[color]);
    expect(badge.ink).toBe(tokens.ink);
    expect(badge.opacity).toBe('1');
    if (checkContrast) expect(contrast(badge.ink, badge.fill), badge.label).toBeGreaterThanOrEqual(4.5);
  }
  for (const glyph of glyphs) {
    expect(glyph.fill).toBe(tokens[kindColors[glyph.kind as keyof typeof kindColors]]);
    expect(glyph.shape).toBe(glyph.kind === 'technical' ? '50%' : '2px');
    if (checkContrast) for (const surface of surfaces) expect(contrast(glyph.fill, surface), 'Timeline glyph contrast').toBeGreaterThanOrEqual(3);
  }
}

for (const colorScheme of ['light', 'dark'] as const) {
  test(`one categorical palette reaches Catalog, Events and every Timeline view in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
    let foundation: Record<string, string> | undefined;
    for (const route of ['analog/', 'digital/', 'events/', '', 'companies/apple/', 'people/toshi-kawashima/']) {
      await page.goto(`./${route}`);
      const catalog = route === 'analog/' || route === 'digital/';
      if (!catalog) await expect(page.locator('[data-status]')).toHaveText(/\d+ of \d+ events?$/);
      const actual = await readColors(page);
      if (foundation) expect(actual.tokens).toEqual(foundation);
      else foundation = actual.tokens;
      expectMapping(actual, true);
      if (catalog || route === 'events/') expect(actual.badges.length).toBeGreaterThan(0);
      else expect(actual.glyphs.length).toBeGreaterThan(0);

      // A single token edit must propagate; identical hard-coded fills would fail this check.
      const replacements = { green: 'rgb(61, 83, 70)', blue: 'rgb(56, 74, 96)', gold: 'rgb(100, 93, 56)',
        rust: 'rgb(112, 79, 61)', red: 'rgb(110, 66, 79)', ink: 'rgb(239, 241, 236)' };
      await page.evaluate((values) => {
        for (const [name, value] of Object.entries(values)) document.documentElement.style.setProperty(`--category-${name}`, value);
      }, replacements);
      const updated = await readColors(page);
      expect(updated.tokens).toEqual(replacements);
      expectMapping(updated, false);
    }
  });
}

test('Catalog and Events category labels share readable forced-colors treatment', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  let appearance: unknown;
  for (const route of ['analog/', 'digital/', 'events/']) {
    await page.goto(`./${route}`);
    const labels = await page.locator('.category-label').evaluateAll((nodes) => nodes.map((el) => {
      const s = getComputedStyle(el);
      return { text: el.textContent!.trim(), ink: s.color, fill: s.backgroundColor, outline: s.outlineStyle,
        outlineColor: s.outlineColor, outlineWidth: s.outlineWidth, height: el.getBoundingClientRect().height };
    }));
    expect(labels.length).toBeGreaterThan(0);
    for (const { text, ...style } of labels) {
      expect(text).not.toBe('');
      expect(style.outline).toBe('solid'); expect(style.outlineWidth).toBe('1px');
      expect(style.outlineColor).toBe(style.ink);
      expect(contrast(style.ink, style.fill)).toBeGreaterThanOrEqual(4.5);
      if (appearance) expect(style).toEqual(appearance);
      else appearance = style;
    }
  }
});
