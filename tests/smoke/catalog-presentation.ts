import { expect, type Locator } from '@playwright/test';

export async function expectScopeLabels(scope: Locator, forcedColors = false) {
  await expect(scope.locator('.scope-mark, [data-level], [aria-hidden="true"]')).toHaveCount(0);
  const items = await scope.locator('li[data-scope-item]').evaluateAll((nodes) => nodes.map((el) => {
    const style = getComputedStyle(el), box = el.getBoundingClientRect();
    return { id: el.getAttribute('data-scope-item'), ai: el.getAttribute('data-ai'), development: el.getAttribute('data-ai-development'),
      text: el.textContent!.trim(), renderedText: (el as HTMLElement).innerText.trim(), transform: style.textTransform,
      classes: [...el.classList], color: style.color, fill: style.backgroundColor,
      radius: parseFloat(style.borderRadius), font: parseFloat(style.fontSize), weight: Number(style.fontWeight),
      paddingX: parseFloat(style.paddingLeft), paddingY: parseFloat(style.paddingTop),
      width: box.width, height: box.height, outline: style.outlineStyle, shadow: style.boxShadow, border: style.borderColor, borderWidth: style.borderWidth,
    };
  }));
  expect(items.length).toBeGreaterThan(0);
  for (const item of items) {
    if (item.development) expect(item.development).toBe('assisted');
    expect(item.classes).toEqual(['category-label', 'scope-label', item.development ? `scope-ai-${item.development}` : `scope-${item.id}`]);
    if (item.development) expect(item.text).toBe('AI-ASSISTED');
    else expect(item.text).toMatch(/^(?:Design|Simulation|Synthesis|Verification|Layout)$/);
    expect(item.transform).toBe('none');
    expect(item.renderedText).toBe(item.text);
    expect(item.text).not.toMatch(/core|supporting|[●○◐]/i);
    expect(item.radius).toBe(0);
    expect(item.font).toBe(11); expect(item.weight).toBe(500);
    expect(item.paddingX).toBeGreaterThanOrEqual(5); expect(item.paddingX).toBeLessThanOrEqual(7);
    expect(item.paddingY).toBeGreaterThanOrEqual(2); expect(item.paddingY).toBeLessThanOrEqual(3);
    expect(item.width).toBeLessThanOrEqual(120);
    expect(item.height).toBeCloseTo(21.4, 1);
    if (item.development && !forcedColors) {
      expect(item.fill).toBe('rgba(0, 0, 0, 0)');
      expect(item.shadow).toBe('none');
      expect(item.borderWidth).toBe('1px');
      expect(item.border).not.toBe(item.fill);
    } else expect(item.fill).not.toBe('rgba(0, 0, 0, 0)');
    expect(item.color).not.toBe(item.fill);
    if (forcedColors) expect(item.outline).toBe('solid');
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
    const repositoryBacked = record.kind === 'github' || record.kind === 'repository';
    const unfetched = record.kind === 'unfetched';
    const date = unfetched ? '' : repositoryBacked ? record.lastCommitAt! : record.lastPublicUpdateAt!;
    if (checkData) {
      expect(item.kind).toBe(record.kind);
      expect(item.dateTag).toBe(unfetched ? 'SPAN' : 'TIME');
      expect(item.date).toBe(date || null);
      expect(item.dateText).toBe(unfetched ? 'Activity not fetched' : dateFormat.format(new Date(`${date}T00:00:00Z`)));
      expect(item.dateRendered).toBe(item.dateText);
      if (!unfetched) expect(item.dateRendered).toMatch(/^[A-Z][a-z]{2} [1-9]\d?, \d{4}$/);
    }
    expect(item.dateTransform).toBe('none');
    expect(item.weight).toBe(400);
    expect(item.dateLine).toBe(item.dateRendered);
    const signalLabel = { paper: 'paper publication', release: 'release', 'public-update': 'public update' }[record.lastPublicUpdateType ?? ''];
    if (checkData) {
      expect(item.text).toBe(item.dateText);
      expect(item.text).not.toMatch(/\/12|months/);
      for (const forbidden of ['Paper', 'Release', 'Public update', 'Latest', 'GitHub', 'GitLab']) expect(item.text).not.toContain(forbidden);
      expect(item.links).toBe(0);
      if (repositoryBacked) {
        expect(item.text).not.toContain(record.repository!);
        expect(item.label).toContain(record.repository!);
        expect(item.label).toContain(`default branch ${record.defaultBranch}`);
      } else if (unfetched) {
        expect(item.provenance).toContain(`Activity not fetched for ${record.repository}; last attempt `);
        expect(item.label).toContain(item.provenance);
      } else {
        expect(item.provenance).toMatch(new RegExp(`^${signalLabel}: .+`));
        expect(item.label).toContain(item.provenance);
      }
      const activeMonths = repositoryBacked ? record.commits!.filter((count) => count > 0).length : Number(snapshot.months.includes(date.slice(0, 7)));
      expect(item.label).toContain(`${activeMonths} months with reviewed public activity`);
      expect(item.months).toHaveLength(12);
      expect(item.label).toContain(`${monthLabels[0]}–${monthLabels[11]} (oldest to newest)`);
      expect(item.label).not.toMatch(/newest (?:to oldest|(?:on|at) the left)|newest-left/i);
      expect(item.months.map((month) => month.month)).toEqual(snapshot.months);
      expect(new Set(item.months.map((month) => month.month)).size).toBe(12);
      expect(item.months[0].month).toBe(snapshot.months[0]);
      expect(item.months[11].month).toBe(snapshot.reviewedAt.slice(0, 7));
    }
    expect(item.months[0].left).toBe(Math.min(...item.months.map((month) => month.left)));
    expect(item.months[11].left).toBe(Math.max(...item.months.map((month) => month.left)));
    expect(item.dateBottom).toBeLessThan(item.stripTop!);
    expect(item.activityWidth).toBeGreaterThanOrEqual(94);
    expect(item.activityWidth).toBeLessThanOrEqual(120);
    expect(item.stripWidth).toBeCloseTo(94, 1);
    expect(item.stripWidth).toBeLessThanOrEqual(item.activityWidth);
    expect(item.dateRight).toBeLessThanOrEqual(item.activityRight);
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
    expect(row.columns).toHaveLength(2);
    expect(row.row.width).toBeLessThanOrEqual(1200);
    if (width >= 1024) {
      expect(row.columns[0].width).toBe(120);
      expect(row.columns[1].width).toBeGreaterThan(754);
      expect(row.columns[1].left - row.columns[0].right).toBe(0);
      if (width >= 1280) {
        expect(row.row.width).toBe(1200);
        expect(row.columns[1].width).toBe(1080);
      }
    } else {
      expect(row.columns[0].left).toBe(row.columns[1].left);
      expect(row.columns[1].bottom).toBeLessThanOrEqual(row.columns[0].top);
    }
    expect(row.date.bottom).toBeLessThan(row.strip.top);
    expect(row.strip.top - row.date.bottom).toBeCloseTo(6, 1);
    expect(row.scopeItems[0].top - row.strip.bottom).toBeCloseTo(10, 1);
    for (const badge of row.scopeItems) {
      expect(badge.left).toBe(row.rail.left);
      expect(badge.right).toBeLessThanOrEqual(row.rail.right);
    }
    expect(row.justify).toBe('flex-start');
    expect(row.nameLinks).toBe(0); expect(row.nameText).not.toContain('#');
    expect(row.name.left).toBeCloseTo(row.title.left, 1);
    expect(row.titleChildren).toHaveLength(2); // Plain-text name immediately followed by external quick links.
    for (let index = 1; index < row.titleChildren.length; index++) {
      const previous = row.titleChildren[index - 1], current = row.titleChildren[index];
      if (current.top < previous.bottom - 1) {
        expect(current.left - previous.right).toBeGreaterThanOrEqual(15);
        expect(current.left - previous.right).toBeLessThanOrEqual(17);
      } else expect(current.left).toBeCloseTo(row.title.left, 1);
    }
    expect(row.name.bottom).toBeLessThan(row.description.top);
    for (const link of row.links) {
      expect(link.left).toBeGreaterThanOrEqual(row.title.left - 1);
      expect(link.right).toBeLessThanOrEqual(row.title.right + 1);
      expect(link.bottom).toBeLessThan(row.description.top);
      expect(link.left >= row.name.right - 1 || link.top >= row.name.bottom - 1).toBe(true);
    }
    for (let index = 1; index < row.links.length; index++) {
      const previous = row.links[index - 1], current = row.links[index];
      expect(current.left >= previous.right - 1 || current.top >= previous.bottom - 1).toBe(true);
    }
    expect(row.scopeStyle).toBe('flex'); expect(row.scopeDirection).toBe('column');
    expect(row.scopeItems.length).toBeGreaterThan(0);
    for (let index = 1; index < row.scopeItems.length; index++) {
      const previous = row.scopeItems[index - 1], current = row.scopeItems[index];
      expect(current.left).toBeCloseTo(previous.left, 1);
      expect(current.top - previous.bottom).toBeCloseTo(current.development ? 8 : 4, 1);
    }
    for (const item of row.scopeItems) {
      expect(item.left).toBeGreaterThanOrEqual(row.rail.left);
      expect(item.right).toBeLessThanOrEqual(row.rail.right);
      expect(item.bottom - item.top).toBeLessThan(24);
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
    expect(description.clamp, description.project!).toBe('none');
    expect(description.fullHeight, description.project!).toBeLessThanOrEqual(description.height + 1);
    // The inert background extends into the existing body inset; text must still fit the paragraph.
    expect(description.fullWidth, description.project!).toBeLessThanOrEqual(description.width + description.paintOutset + 1);
    expect(description.copyFullWidth, description.project!).toBeLessThanOrEqual(description.copyWidth + 1);
    expect(description.textFits, description.project!).toBe(true);
  }
}
