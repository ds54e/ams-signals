import assert from 'node:assert/strict';
import { expect, test, type Page } from '@playwright/test';

const scopeColors = { design: 'green', simulation: 'blue', verification: 'blue', synthesis: 'gold', layout: 'rust', aiDevelopment: 'purple' };
const kindColors = { technical: 'blue', organizational: 'rust' };
const timelineColors = { technical: 'rgb(96, 137, 173)', organizational: 'rgb(177, 122, 68)' };

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
    const tokens = Object.fromEntries(['green', 'blue', 'gold', 'rust', 'purple', 'green-soft', 'blue-soft', 'gold-soft', 'rust-soft'].map((name) => [name, resolve(`category-${name}`)]));
    tokens['provenance-border'] = resolve('provenance-border');
    const semantics = { technical: resolve('technical'), organizational: resolve('organizational') };
    const surfaces = [resolve('bg'), resolve('surface')];
    const explorer = document.querySelector('.event-explorer');
    if (explorer) {
      explorer.append(probe);
      surfaces.push(resolve('timeline-row-alt'), resolve('timeline-row-hover'));
    }
    probe.remove();
    const badges = [...document.querySelectorAll<HTMLElement>('.category-label')].map((el) => {
      const style = getComputedStyle(el);
      return { scope: el.dataset.scopeItem, development: el.dataset.aiDevelopment, kind: el.dataset.signalType, label: el.textContent!.trim(),
        fill: style.backgroundColor, ink: style.color, shadow: style.boxShadow, opacity: style.opacity, border: style.borderColor, borderWidth: style.borderWidth };
    });
    const glyphs = [...document.querySelectorAll('.timeline-glyph, .legend-mark')].map((el) => {
      const style = getComputedStyle(el);
      return { kind: el.closest('.event-kind-technical') ? 'technical' : 'organizational',
        fill: style.backgroundColor, shape: style.borderRadius };
    });
    return { tokens, semantics, surfaces, badges, glyphs, pageBackground: getComputedStyle(document.documentElement).backgroundColor };
  });
}

function expectMapping(colors: Awaited<ReturnType<typeof readColors>>, checkContrast: boolean) {
  const { tokens, badges, glyphs, semantics, pageBackground, surfaces } = colors;
  assert.deepEqual(semantics, { technical: tokens.blue, organizational: tokens.rust });
  assert.equal(new Set(['green', 'blue', 'gold', 'rust', 'purple'].map((key) => tokens[key])).size, 5);
  for (const badge of badges) {
    const color = badge.scope ? scopeColors[badge.scope as keyof typeof scopeColors] : kindColors[badge.kind as keyof typeof kindColors];
    assert.notEqual(color, undefined, badge.label);
    if (badge.development) {
      assert.deepEqual([badge.fill, badge.ink, badge.shadow, badge.border, badge.borderWidth],
        ['rgba(0, 0, 0, 0)', tokens.purple, 'none', tokens['provenance-border'], '1px'], badge.label);
    } else {
      assert.deepEqual([badge.fill, badge.ink], [tokens[`${color}-soft`], tokens[color]], badge.label);
    }
    assert.equal(badge.opacity, '1', badge.label);
    if (checkContrast) assert(contrast(badge.ink, badge.development ? pageBackground : badge.fill) >= 4.5, badge.label);
  }
  for (const glyph of glyphs) {
    assert.equal(glyph.fill, timelineColors[glyph.kind as keyof typeof timelineColors], glyph.kind);
    assert.equal(glyph.shape, glyph.kind === 'technical' ? '50%' : '0px', glyph.kind);
    if (checkContrast) for (const surface of surfaces) assert(contrast(glyph.fill, surface) >= 3, `${glyph.kind}: Timeline glyph contrast`);
  }
}

for (const colorScheme of ['light', 'dark'] as const) {
  test(`category labels and the fixed Timeline palette agree across views in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
    let foundation: Record<string, string> | undefined;
    for (const route of ['analog/', 'digital/', 'events/', 'timeline/', 'companies/apple/', 'people/toshi-kawashima/']) {
      await page.goto(`./${route}`);
      const catalog = route === 'analog/' || route === 'digital/';
      if (!catalog) await expect(page.locator('[data-status]')).toHaveText(/\d+ of \d+ events?$/);
      const actual = await readColors(page);
      if (foundation) expect(actual.tokens).toEqual(foundation);
      else foundation = actual.tokens;
      expectMapping(actual, true);
      if (catalog || route === 'events/') expect(actual.badges.length).toBeGreaterThan(0);
      else expect(actual.glyphs.length).toBeGreaterThan(0);

      // Label tokens propagate while every Timeline retains the fixed Timeline fills.
      const replacements = { green: 'rgb(61, 83, 70)', blue: 'rgb(56, 74, 96)', gold: 'rgb(100, 93, 56)',
        rust: 'rgb(112, 79, 61)', purple: 'rgb(110, 66, 129)', 'green-soft': 'rgb(228, 239, 232)', 'blue-soft': 'rgb(228, 235, 243)',
        'gold-soft': 'rgb(240, 237, 219)', 'rust-soft': 'rgb(240, 230, 224)', 'provenance-border': 'rgb(170, 145, 185)' };
      await page.evaluate((values) => {
        for (const [name, value] of Object.entries(values)) document.documentElement.style.setProperty(name === 'provenance-border' ? '--provenance-border' : `--category-${name}`, value);
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
