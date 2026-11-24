import assert from 'node:assert/strict';
import { expect, type Locator } from '@playwright/test';

// Use Node assertions on captured DOM snapshots. Playwright locators above the
// snapshots still retry; tracing each scalar comparison adds no browser evidence.

export async function expectScopeLabels(scope: Locator, forcedColors = false) {
  await expect(scope.locator('.scope-mark, [data-level], [aria-hidden="true"]')).toHaveCount(0);
  const items = await scope.locator('li[data-scope-item]').evaluateAll((nodes) => nodes.map((el) => {
    const style = getComputedStyle(el), box = el.getBoundingClientRect();
    return { project: el.closest('[data-catalog-project]')?.getAttribute('data-catalog-project'), id: el.getAttribute('data-scope-item'), ai: el.getAttribute('data-ai'), development: el.getAttribute('data-ai-development'),
      text: el.textContent!.trim(), renderedText: (el as HTMLElement).innerText.trim(), transform: style.textTransform,
      classes: [...el.classList], color: style.color, fill: style.backgroundColor,
      radius: parseFloat(style.borderRadius), font: parseFloat(style.fontSize), weight: Number(style.fontWeight),
      paddingX: parseFloat(style.paddingLeft), paddingY: parseFloat(style.paddingTop),
      width: box.width, height: box.height, outline: style.outlineStyle, shadow: style.boxShadow, border: style.borderColor, borderWidth: style.borderWidth,
    };
  }));
  expect(items.length).toBeGreaterThan(0);
  for (const item of items) {
    const context = [item.project, item.id].join(': ');
    if (item.development) assert.strictEqual(item.development, 'assisted', context + ': item.development');
    assert.deepStrictEqual(item.classes, ['category-label', 'scope-label', item.development ? `scope-ai-${item.development}` : `scope-${item.id}`], context + ': item.classes');
    if (item.development) assert.strictEqual(item.text, 'AI-ASSISTED', context + ': item.text');
    else assert.match(item.text, /^(?:Design|Simulation|Synthesis|Verification|Layout)$/, context + ': item.text');
    assert.strictEqual(item.transform, 'none', context + ': item.transform');
    assert.strictEqual(item.renderedText, item.text, context + ': item.renderedText');
    assert.doesNotMatch(item.text, /core|supporting|[●○◐]/i, context + ': item.text');
    assert.strictEqual(item.radius, 0, context + ': item.radius');
    assert.strictEqual(item.font, 11, context + ': item.font'); assert.strictEqual(item.weight, 500, context + ': item.weight');
    assert(item.paddingX >= 5, context + ': item.paddingX'); assert(item.paddingX <= 7, context + ': item.paddingX');
    assert(item.paddingY >= 2, context + ': item.paddingY'); assert(item.paddingY <= 3, context + ': item.paddingY');
    assert(item.width <= 120, context + ': item.width');
    assert(Math.abs(item.height - 21.4) < 0.05, context + ': item.height');
    if (item.development && !forcedColors) {
      assert.strictEqual(item.fill, 'rgba(0, 0, 0, 0)', context + ': item.fill');
      assert.strictEqual(item.shadow, 'none', context + ': item.shadow');
      assert.strictEqual(item.borderWidth, '1px', context + ': item.borderWidth');
      assert.notStrictEqual(item.border, item.fill, context + ': item.border');
    } else assert.notStrictEqual(item.fill, 'rgba(0, 0, 0, 0)', context + ': item.fill');
    assert.notStrictEqual(item.color, item.fill, context + ': item.color');
    if (forcedColors) assert.strictEqual(item.outline, 'solid', context + ': item.outline');
  }
  // AI-backed and conventional stages use the same stage color, while
  // development provenance has its own category; strength is not represented.
  const palette = (item: typeof items[number]) => item.development && !forcedColors ? item.color : item.fill;
  for (const id of new Set(items.map((item) => item.id))) {
    expect(new Set(items.filter((item) => item.id === id).map(palette)).size).toBe(1);
  }
  if (!forcedColors) expect(new Set(items.map(palette)).size).toBe(new Set(items.map((item) => item.id)).size);
}

type ActivityRecord = {
  kind: string; lastCommitAt?: string; lastPublicUpdateAt?: string;
  lastPublicUpdateType?: string; lastPublicUpdateSource?: string;
  repository?: string; defaultBranch?: string; commits?: number[];
};

type ActivitySnapshot = { months: string[]; reviewedAt: string; projects: Record<string, ActivityRecord> };

async function assertActivityBands(rows: Locator, activitySelector: string, snapshot: ActivitySnapshot, forcedColors: boolean, checkData: boolean) {
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
  const monthFormat = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const monthLabels = snapshot.months.map((month) => monthFormat.format(new Date(`${month}-01T00:00:00Z`)));
  const rendered = await rows.evaluateAll((nodes, selector) => nodes.map((el) => {
    const activity = el.querySelector<HTMLElement>(selector)!;
    const time = activity.querySelector<HTMLElement>('.index-date')!;
    const strip = activity.querySelector('ul');
    const stripBox = strip?.getBoundingClientRect();
    const visible = activity.cloneNode(true) as HTMLElement;
    visible.querySelectorAll('.visually-hidden').forEach((node) => node.remove());
    return {
      id: el.getAttribute('data-catalog-project'), kind: activity.getAttribute('data-activity-kind'), text: [...visible.childNodes].map((node) => node.textContent).join(' ').replace(/\s+/g, ' ').trim(),
      dateTag: time.tagName, date: time.getAttribute('datetime'), dateText: time.textContent!, dateRendered: time.innerText,
      dateTransform: getComputedStyle(time).textTransform, weight: Number(getComputedStyle(time).fontWeight),
      dateLine: time.parentElement!.innerText, provenance: time.title,
      dateBottom: time.getBoundingClientRect().bottom, dateRight: time.getBoundingClientRect().right,
      stripTop: stripBox?.top, stripBottom: stripBox?.bottom, stripWidth: stripBox?.width, stripRight: stripBox?.right, stripLeft: stripBox?.left,
      activityWidth: activity.getBoundingClientRect().width, activityRight: activity.getBoundingClientRect().right,
      label: strip?.getAttribute('aria-label') ?? null, links: activity.querySelectorAll('a').length,
      months: [...activity.querySelectorAll<HTMLElement>('ul > li')].map((li) => {
        const style = getComputedStyle(li); const box = li.getBoundingClientRect();
        const accessible = li.querySelector<HTMLElement>('.visually-hidden')!;
        const accessibleBox = accessible.getBoundingClientRect();
        return { month: li.dataset.month, count: li.dataset.commits, signal: li.dataset.signal, source: li.dataset.source, active: li.classList.contains('active'),
          title: li.title, accessible: accessible.textContent,
          accessibleWidth: accessibleBox.width, accessibleHeight: accessibleBox.height,
          width: box.width, height: box.height, left: box.left, fill: style.backgroundColor,
          border: style.borderColor, borderWidth: parseFloat(style.borderWidth), opacity: style.opacity,
        };
      }),
    };
  }), activitySelector);
  expect(rendered.map((item) => item.id).sort(), 'every catalog activity row is checked')
    .toEqual(Object.keys(snapshot.projects).sort());
  for (const item of rendered) {
    const record = snapshot.projects[item.id];
    const context = item.id ?? 'catalog activity';
    const repositoryBacked = record.kind === 'github' || record.kind === 'repository';
    const unfetched = record.kind === 'unfetched';
    const date = unfetched ? '' : repositoryBacked ? record.lastCommitAt! : record.lastPublicUpdateAt!;
    if (checkData) {
      assert.strictEqual(item.kind, record.kind, context + ': item.kind');
      assert.strictEqual(item.dateTag, unfetched ? 'SPAN' : 'TIME', context + ': item.dateTag');
      assert.strictEqual(item.date, date || null, context + ': item.date');
      assert.strictEqual(item.dateText, unfetched ? 'Activity not fetched' : dateFormat.format(new Date(`${date}T00:00:00Z`)), context + ': item.dateText');
      assert.strictEqual(item.dateRendered, item.dateText, context + ': item.dateRendered');
      if (!unfetched) assert.match(item.dateRendered, /^[A-Z][a-z]{2} [1-9]\d?, \d{4}$/, context + ': item.dateRendered');
    }
    assert.strictEqual(item.dateTransform, 'none', context + ': item.dateTransform');
    assert.strictEqual(item.weight, 400, context + ': item.weight');
    assert.strictEqual(item.dateLine, item.dateRendered, context + ': item.dateLine');
    const signalLabel = { paper: 'paper publication', release: 'release', 'public-update': 'public update' }[record.lastPublicUpdateType ?? ''];
    if (checkData) {
      assert.strictEqual(item.text, item.dateText, context + ': item.text');
      assert.doesNotMatch(item.text, /\/12|months/, context + ': item.text');
      for (const forbidden of ['Paper', 'Release', 'Public update', 'Latest', 'GitHub', 'GitLab']) expect(item.text).not.toContain(forbidden);
      assert.strictEqual(item.links, 0, context + ': item.links');
      if (repositoryBacked) {
        expect(item.text).not.toContain(record.repository!);
        expect(item.label).toContain(record.repository!);
        expect(item.label).toContain(`default branch ${record.defaultBranch}`);
      } else if (unfetched) {
        expect(item.provenance).toContain(`Activity not fetched for ${record.repository}; last attempt `);
        expect(item.label).toContain(item.provenance);
      } else {
        assert.match(item.provenance, new RegExp(`^${signalLabel}: .+`), context + ': item.provenance');
        expect(item.label).toContain(item.provenance);
      }
      const activeMonths = repositoryBacked ? record.commits!.filter((count) => count > 0).length : Number(snapshot.months.includes(date.slice(0, 7)));
      expect(item.label).toContain(`${activeMonths} months with reviewed public activity`);
      assert.strictEqual(item.months.length, 12, context + ': item.months');
      expect(item.label).toContain(`${monthLabels[0]}–${monthLabels[11]} (oldest to newest)`);
      assert.doesNotMatch(item.label, /newest (?:to oldest|(?:on|at) the left)|newest-left/i, context + ': item.label');
      assert.deepStrictEqual(item.months.map((month) => month.month), snapshot.months, context + ': item.months.map((month) => month.month)');
      assert.strictEqual(new Set(item.months.map((month) => month.month)).size, 12, context + ': new Set(item.months.map((month) => month.month)).size');
      assert.strictEqual(item.months[0].month, snapshot.months[0], context + ': item.months[0].month');
      assert.strictEqual(item.months[11].month, snapshot.reviewedAt.slice(0, 7), context + ': item.months[11].month');
    }
    assert.strictEqual(item.months[0].left, Math.min(...item.months.map((month) => month.left)), context + ': item.months[0].left');
    assert.strictEqual(item.months[11].left, Math.max(...item.months.map((month) => month.left)), context + ': item.months[11].left');
    assert(item.dateBottom < item.stripTop!, context + ': item.dateBottom');
    assert(item.activityWidth >= 94, context + ': item.activityWidth');
    assert(item.activityWidth <= 120, context + ': item.activityWidth');
    assert(Math.abs(item.stripWidth - 94) < 0.05, context + ': item.stripWidth');
    assert(item.stripWidth <= item.activityWidth, context + ': item.stripWidth');
    assert(item.dateRight <= item.activityRight, context + ': item.dateRight');
    if (checkData) {
      // One structural assertion retains every cell's exact metadata
      // without recording a separate Playwright trace step for each scalar field.
      expect(item.months.map(({ month, active, signal, count, source, title, accessible }) => ({
        month, active, signal, count, source, title, accessible,
      })), item.id!).toEqual(snapshot.months.map((month, index) => {
        const count = record.commits?.[index];
        const active = !unfetched && (repositoryBacked ? count! > 0 : month === date.slice(0, 7));
        const title = unfetched ? `${monthLabels[index]} — activity not fetched`
          : `${monthLabels[index]} · ${repositoryBacked ? `${count} default-branch commits` : active ? signalLabel : 'no reviewed public activity signal'}`;
        return { month, active, signal: unfetched ? 'unfetched' : repositoryBacked ? 'repository' : record.lastPublicUpdateType,
          count: repositoryBacked ? String(count) : undefined,
          source: !repositoryBacked && active ? record.lastPublicUpdateSource : undefined,
          title, accessible: title };
      }));
      if (!repositoryBacked) expect(item.months.map((bucket) => bucket.title.includes('commits')), item.id!)
        .toEqual(snapshot.months.map(() => false));
    }
    expect(item.months.map(({ width, height, borderWidth, opacity }) => ({ width, height, borderWidth, opacity })), `${item.id}: tick dimensions`)
      .toEqual(Array.from({ length: 12 }, () => ({ width: 6, height: 8, borderWidth: forcedColors ? 1 : 0, opacity: '1' })));
    // Compare the complete twelve-month result in one assertion per row. Thousands
    // of per-cell Playwright trace steps can otherwise consume the test deadline
    // before its scroll checks. Keep every predicate and the original precision-1
    // toBeCloseTo tolerance (< 0.05); do not sample rows or relax geometry.
    expect(item.months.map((bucket, index) => ({
      month: bucket.month,
      accessibleWidth: bucket.accessibleWidth <= 1,
      accessibleHeight: bucket.accessibleHeight <= 1,
      equalWidth: Math.abs(bucket.width - item.months[0].width) < 0.05,
      equalHeight: Object.is(bucket.height, item.months[0].height),
      verticalTick: bucket.height / bucket.width > 1,
      opaque: bucket.fill !== 'rgba(0, 0, 0, 0)',
      gap: index === 0 || Math.abs(bucket.left - item.months[index - 1].left - item.months[index - 1].width - 2) < 0.05,
    })), `${item.id}: activity tick geometry`).toEqual(snapshot.months.map((month) => ({
      month, accessibleWidth: true, accessibleHeight: true,
      equalWidth: true, equalHeight: true, verticalTick: true, opaque: true, gap: true,
    })));
  }
  const inactive = rendered.flatMap((row) => row.months).filter((month) => !month.active);
  const activeFills = new Set(rendered.flatMap((row) => row.months).filter((month) => month.active).map((month) => month.fill));
  expect(inactive.map((month) => activeFills.has(month.fill)), 'inactive activity colors differ from active colors')
    .toEqual(inactive.map(() => false));
  // Every active month has the same visual weight, irrespective of raw commit volume.
  const active = rendered.flatMap((row) => row.months).filter((month) => month.active);
  expect(active.length).toBeGreaterThan(0);
  expect(new Set(active.map((month) => `${month.fill}/${month.opacity}/${month.height}`)).size).toBe(1);
}

// Full actual-DOM wiring runs with JavaScript enabled and disabled.
export async function expectActivityBands(rows: Locator, activitySelector: string, snapshot: ActivitySnapshot, forcedColors = false) {
  await assertActivityBands(rows, activitySelector, snapshot, forcedColors, true);
}

// Viewport/forced-color cases retain every row and tick's physical checks, while
// actual month/count/source DOM wiring is owned by the normal and no-JS cases.
export async function expectActivityGeometry(rows: Locator, activitySelector: string, snapshot: ActivitySnapshot, forcedColors = false) {
  await assertActivityBands(rows, activitySelector, snapshot, forcedColors, false);
}

export async function expectTitleAndIndexGeometry(rows: Locator, width: number) {
  const geometry = await rows.evaluateAll((nodes) => nodes.map((el) => {
    const rect = (node: Element) => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width }; };
    const title = el.querySelector(`.catalog-title`)!;
    return {
      id: el.getAttribute('data-catalog-project'),
      columns: [...el.querySelectorAll('.catalog-rail, .catalog-overview')].map(rect), row: rect(el),
      rail: rect(el.querySelector('.catalog-rail')!), strip: rect(el.querySelector('.activity-strip')!),
      date: rect(el.querySelector('.activity-latest')!),
      title: rect(title), name: rect(el.querySelector('h2')!),
      justify: getComputedStyle(title).justifyContent,
      titleChildren: [...title.children].map(rect),
      nameLinks: el.querySelectorAll('h2 a').length, nameText: el.querySelector('h2')!.textContent,
      links: [...el.querySelectorAll(`.catalog-title .catalog-quicklinks a`)].map(rect),
      description: rect(el.querySelector(`.catalog-description`)!),
      scopeStyle: getComputedStyle(el.querySelector(`.catalog-scope`)!).display,
      scopeDirection: getComputedStyle(el.querySelector(`.catalog-scope`)!).flexDirection,
      scopeItems: [...el.querySelectorAll('[data-scope-item]')].map((item) => ({ ...rect(item), development: item.hasAttribute('data-ai-development') })),
    };
  }));
  for (const row of geometry) {
    const context = [row.id, width + 'px'].join(': ');
    assert.strictEqual(row.columns.length, 2, context + ': row.columns');
    assert(row.row.width <= 1200, context + ': row.row.width');
    if (width >= 1024) {
      assert.strictEqual(row.columns[0].width, 120, context + ': row.columns[0].width');
      assert(row.columns[1].width > 754, context + ': row.columns[1].width');
      assert.strictEqual(row.columns[1].left - row.columns[0].right, 0, context + ': row.columns[1].left - row.columns[0].right');
      if (width >= 1280) {
        assert.strictEqual(row.row.width, 1200, context + ': row.row.width');
        assert.strictEqual(row.columns[1].width, 1080, context + ': row.columns[1].width');
      }
    } else {
      assert.strictEqual(row.columns[0].left, row.columns[1].left, context + ': row.columns[0].left');
      assert(row.columns[1].bottom <= row.columns[0].top, context + ': row.columns[1].bottom');
    }
    assert(row.date.bottom < row.strip.top, context + ': row.date.bottom');
    assert(Math.abs(row.strip.top - row.date.bottom - 6) < 0.05, context + ': row.strip.top - row.date.bottom');
    assert(Math.abs(row.scopeItems[0].top - row.strip.bottom - 10) < 0.05, context + ': row.scopeItems[0].top - row.strip.bottom');
    for (const badge of row.scopeItems) {
      assert.strictEqual(badge.left, row.rail.left, context + ': badge.left');
      assert(badge.right <= row.rail.right, context + ': badge.right');
    }
    assert.strictEqual(row.justify, 'flex-start', context + ': row.justify');
    assert.strictEqual(row.nameLinks, 0, context + ': row.nameLinks');
    assert.doesNotMatch(row.nameText, /#/, context + ': row.nameText');
    assert(Math.abs(row.name.left - row.title.left) < 0.05, context + ': row.name.left');
    assert.strictEqual(row.titleChildren.length, 2, context + ': row.titleChildren'); // Plain-text name immediately followed by external quick links.
    for (let index = 1; index < row.titleChildren.length; index++) {
      const previous = row.titleChildren[index - 1], current = row.titleChildren[index];
      if (current.top < previous.bottom - 1) {
        assert(current.left - previous.right >= 15, context + ': current.left - previous.right');
        assert(current.left - previous.right <= 17, context + ': current.left - previous.right');
      } else assert(Math.abs(current.left - row.title.left) < 0.05, context + ': current.left');
    }
    assert(row.name.bottom < row.description.top, context + ': row.name.bottom');
    for (const link of row.links) {
      assert(link.left >= row.title.left - 1, context + ': link.left');
      assert(link.right <= row.title.right + 1, context + ': link.right');
      assert(link.bottom < row.description.top, context + ': link.bottom');
      assert(link.left >= row.name.right - 1 || link.top >= row.name.bottom - 1, context + ': link must not overlap the name');
    }
    for (let index = 1; index < row.links.length; index++) {
      const previous = row.links[index - 1], current = row.links[index];
      assert(current.left >= previous.right - 1 || current.top >= previous.bottom - 1, context + ': adjacent links must not overlap');
    }
    assert.strictEqual(row.scopeStyle, 'flex', context + ': row.scopeStyle'); assert.strictEqual(row.scopeDirection, 'column', context + ': row.scopeDirection');
    assert(row.scopeItems.length > 0, context + ': row.scopeItems.length');
    for (let index = 1; index < row.scopeItems.length; index++) {
      const previous = row.scopeItems[index - 1], current = row.scopeItems[index];
      assert(Math.abs(current.left - previous.left) < 0.05, context + ': current.left');
      assert(Math.abs(current.top - previous.bottom - (current.development ? 8 : 4)) < 0.05, context + ': current.top - previous.bottom');
    }
    for (const item of row.scopeItems) {
      assert(item.left >= row.rail.left, context + ': item.left');
      assert(item.right <= row.rail.right, context + ': item.right');
      assert(item.bottom - item.top < 24, context + ': item.bottom - item.top');
    }
  }
}

// Text presence alone does not catch CSS line-clamping: the hidden lines remain in the DOM.
export async function expectCompleteDescriptions(descriptions: Locator) {
  const rendered = await descriptions.evaluateAll((nodes) => nodes.map((el) => {
    const style = getComputedStyle(el);
    const bounds = el.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(el);
    const lines = [...range.getClientRects()];
    return {
      project: el.closest('[data-catalog-project]')!.getAttribute('data-catalog-project'),
      clamp: style.webkitLineClamp, height: el.clientHeight, fullHeight: el.scrollHeight,
      width: el.clientWidth, fullWidth: el.scrollWidth,
      paintOutset: Math.max(0, -parseFloat(getComputedStyle(el, '::before').right) || 0),
      copyWidth: el.parentElement!.clientWidth, copyFullWidth: el.parentElement!.scrollWidth,
      textFits: lines.every((line) => line.top >= bounds.top - 1 && line.bottom <= bounds.bottom + 1
        && line.left >= bounds.left - 1 && line.right <= bounds.right + 1),
    };
  }));
  expect(rendered.length).toBeGreaterThan(0);
  for (const description of rendered) {
    const context = description.project ?? 'catalog description';
    assert.strictEqual(description.clamp, 'none', context + ': description.clamp');
    assert(description.fullHeight <= description.height + 1, context + ': description.fullHeight');
    // The inert background extends into the existing body inset; text must still fit the paragraph.
    assert(description.fullWidth <= description.width + description.paintOutset + 1, context + ': description.fullWidth');
    assert(description.copyFullWidth <= description.copyWidth + 1, context + ': description.copyFullWidth');
    assert(description.textFits, context + ': description.textFits');
  }
}
