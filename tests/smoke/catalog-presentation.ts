import { expect, type Locator } from '@playwright/test';

export async function expectScopeLabels(scope: Locator, forcedColors = false) {
  await expect(scope.locator('.scope-mark, [data-level], [aria-hidden="true"]')).toHaveCount(0);
  const items = await scope.locator('li[data-scope-item]').evaluateAll((nodes) => nodes.map((el) => {
    const style = getComputedStyle(el), box = el.getBoundingClientRect();
    return { id: el.getAttribute('data-scope-item'), ai: el.getAttribute('data-ai'),
      text: el.textContent!.trim(), renderedText: (el as HTMLElement).innerText.trim(), transform: style.textTransform,
      classes: [...el.classList], color: style.color, fill: style.backgroundColor,
      radius: parseFloat(style.borderRadius), font: parseFloat(style.fontSize), weight: Number(style.fontWeight),
      paddingX: parseFloat(style.paddingLeft), paddingY: parseFloat(style.paddingTop),
      width: box.width, outline: style.outlineStyle,
    };
  }));
  expect(items.length).toBeGreaterThan(0);
  for (const item of items) {
    expect(item.classes).toEqual(['category-label', 'scope-label', item.id === 'aiBuilt' ? 'scope-ai-built' : `scope-${item.id}`]);
    expect(item.text).toMatch(/^(?:AI )?(?:Design|Simulation|Synthesis|Verification|Layout)$|^AI-built$/);
    expect(item.transform).toBe('uppercase');
    expect(item.renderedText).toBe(item.text.toUpperCase());
    expect(item.text).not.toMatch(/core|supporting|[●○◐]/i);
    expect(item.radius).toBeGreaterThanOrEqual(2); expect(item.radius).toBeLessThanOrEqual(3);
    expect(item.font).toBe(10); expect(item.weight).toBe(600);
    expect(item.paddingX).toBeGreaterThanOrEqual(5); expect(item.paddingX).toBeLessThanOrEqual(7);
    expect(item.paddingY).toBeGreaterThanOrEqual(2); expect(item.paddingY).toBeLessThanOrEqual(3);
    expect(item.width).toBeLessThanOrEqual(122);
    expect(item.fill).not.toBe('rgba(0, 0, 0, 0)');
    expect(item.color).not.toBe(item.fill);
    if (forcedColors) expect(item.outline).toBe('solid');
  }
  // AI-prefixed and conventional variants use the same stage color, while
  // development provenance has its own category; strength is not represented.
  for (const id of new Set(items.map((item) => item.id))) {
    expect(new Set(items.filter((item) => item.id === id).map((item) => item.fill)).size).toBe(1);
  }
  if (!forcedColors) expect(new Set(items.map((item) => item.fill)).size).toBe(new Set(items.map((item) => item.id)).size);
}

type ActivityRecord = {
  kind: string; lastCommitAt?: string; lastPublicUpdateAt?: string;
  lastPublicUpdateType?: string; lastPublicUpdateSource?: string;
  repository?: string; defaultBranch?: string; commits?: number[];
};

export async function expectActivityBands(rows: Locator, activitySelector: string, snapshot: {
  months: string[]; reviewedAt: string; projects: Record<string, ActivityRecord>;
}) {
  const rendered = await rows.evaluateAll((nodes, selector) => nodes.map((el) => {
    const activity = el.querySelector<HTMLElement>(selector)!;
    const time = activity.querySelector('time')!;
    const strip = activity.querySelector('ul');
    const stripBox = strip?.getBoundingClientRect();
    const visible = activity.cloneNode(true) as HTMLElement;
    visible.querySelectorAll('.visually-hidden').forEach((node) => node.remove());
    return {
      id: el.getAttribute('data-catalog-project'), kind: activity.getAttribute('data-activity-kind'), text: [...visible.childNodes].map((node) => node.textContent).join(' ').replace(/\s+/g, ' ').trim(),
      date: time.getAttribute('datetime'), dateText: time.textContent!, dateRendered: time.innerText,
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
  for (const item of rendered) {
    const record = snapshot.projects[item.id];
    const repositoryBacked = record.kind === 'github' || record.kind === 'repository';
    const date = repositoryBacked ? record.lastCommitAt! : record.lastPublicUpdateAt!;
    expect(item.kind).toBe(record.kind);
    expect(item.date).toBe(date);
    expect(item.dateText).toBe(new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`)));
    expect(item.dateRendered).toBe(item.dateText.toUpperCase());
    expect(item.dateRendered).toMatch(/^[A-Z]{3} [1-9]\d?, \d{4}$/);
    expect(item.dateTransform).toBe('uppercase');
    expect(item.weight).toBe(400);
    expect(item.dateLine).toBe(item.dateRendered);
    expect(item.text).toBe(item.dateText);
    expect(item.text).not.toMatch(/\/12|months/);
    for (const forbidden of ['Paper', 'Release', 'Public update', 'Latest', 'GitHub', 'GitLab']) expect(item.text).not.toContain(forbidden);
    expect(item.links).toBe(0);
    const signalLabel = { paper: 'paper publication', release: 'release', 'public-update': 'public update' }[record.lastPublicUpdateType ?? ''];
    if (repositoryBacked) {
      expect(item.text).not.toContain(record.repository!);
      expect(item.label).toContain(record.repository!);
      expect(item.label).toContain(`default branch ${record.defaultBranch}`);
    } else {
      expect(item.provenance).toMatch(new RegExp(`^${signalLabel}: .+`));
      expect(item.label).toContain(item.provenance);
    }
    const activeMonths = repositoryBacked ? record.commits!.filter((count) => count > 0).length : Number(snapshot.months.includes(date.slice(0, 7)));
    expect(item.label).toContain(`${activeMonths} months with reviewed public activity`);
    expect(item.months).toHaveLength(12);
    const monthLabel = (month: string) => new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month}-01T00:00:00Z`));
    expect(item.label).toContain(`${monthLabel(snapshot.months[0])}–${monthLabel(snapshot.months[11])} (oldest to newest)`);
    expect(item.label).not.toMatch(/newest (?:to oldest|(?:on|at) the left)|newest-left/i);
    expect(item.months.map((month) => month.month)).toEqual(snapshot.months);
    expect(new Set(item.months.map((month) => month.month)).size).toBe(12);
    expect(item.months[0].month).toBe(snapshot.months[0]);
    expect(item.months[11].month).toBe(snapshot.reviewedAt.slice(0, 7));
    expect(item.months[0].left).toBe(Math.min(...item.months.map((month) => month.left)));
    expect(item.months[11].left).toBe(Math.max(...item.months.map((month) => month.left)));
    expect(item.dateBottom).toBeLessThan(item.stripTop!);
    expect(item.activityWidth).toBeGreaterThanOrEqual(82);
    expect(item.activityWidth).toBeLessThanOrEqual(122);
    expect(item.stripWidth).toBeCloseTo(82, 1);
    expect(item.stripWidth).toBeLessThanOrEqual(item.activityWidth);
    expect(item.dateRight).toBeLessThanOrEqual(item.activityRight);
    for (let index = 0; index < 12; index++) {
      const bucket = item.months[index];
      const month = snapshot.months[index]; const count = record.commits?.[index];
      const active = repositoryBacked ? count! > 0 : month === date.slice(0, 7);
      const label = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month}-01T00:00:00Z`));
      expect(bucket.month).toBe(month);
      expect(bucket.active).toBe(active);
      expect(bucket.signal).toBe(repositoryBacked ? 'repository' : record.lastPublicUpdateType);
      expect(bucket.count).toBe(repositoryBacked ? String(count) : undefined);
      expect(bucket.source).toBe(!repositoryBacked && active ? record.lastPublicUpdateSource : undefined);
      expect(bucket.title).toBe(`${label} · ${repositoryBacked ? `${count} default-branch commits` : active ? signalLabel : 'no reviewed public activity signal'}`);
      if (!repositoryBacked) expect(bucket.title).not.toContain('commits');
      expect(bucket.accessible).toBe(bucket.title);
      expect(bucket.accessibleWidth).toBeLessThanOrEqual(1); expect(bucket.accessibleHeight).toBeLessThanOrEqual(1);
      expect(bucket.width).toBeCloseTo(item.months[0].width, 1);
      expect(bucket.height).toBe(item.months[0].height);
      expect(bucket.width).toBe(5); expect(bucket.height).toBe(10);
      // Narrow vertical ticks retain a compact recent-activity pattern.
      expect(bucket.height / bucket.width).toBeGreaterThan(1);
      expect(bucket.borderWidth).toBeGreaterThan(0); expect(bucket.opacity).toBe('1');
      expect(bucket.fill).toBe(active ? bucket.border : 'rgba(0, 0, 0, 0)');
      if (index) {
        const previous = item.months[index - 1];
        const gap = bucket.left - previous.left - previous.width;
        expect(gap).toBeCloseTo(2, 1);
      }
    }
  }
  // Every active month has the same visual weight, irrespective of raw commit volume.
  const active = rendered.flatMap((row) => row.months).filter((month) => month.active);
  expect(active.length).toBeGreaterThan(0);
  expect(new Set(active.map((month) => `${month.fill}/${month.opacity}/${month.height}`)).size).toBe(1);
}

export async function expectTitleAndIndexGeometry(rows: Locator, width: number) {
  const geometry = await rows.evaluateAll((nodes) => nodes.map((el) => {
    const rect = (node: Element) => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width }; };
    const title = el.querySelector(`.catalog-title`)!;
    return {
      columns: [...el.querySelector('article')!.children].map(rect), row: rect(el),
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
      scopeItems: [...el.querySelectorAll('[data-scope-item]')].map(rect),
    };
  }));
  for (const row of geometry) {
    expect(row.columns).toHaveLength(2);
    expect(row.row.width).toBeLessThanOrEqual(920);
    if (width >= 1024) {
      expect(row.columns[0].width).toBe(122);
      expect(row.columns[1].width).toBeGreaterThan(754);
      expect(row.columns[1].left - row.columns[0].right).toBe(12);
      if (width >= 1280) {
        expect(row.row.width).toBe(920);
        expect(row.columns[1].width).toBe(786);
      }
    } else {
      expect(row.columns[0].left).toBe(row.columns[1].left);
      expect(row.columns[1].bottom).toBeLessThan(row.columns[0].top);
    }
    expect(row.date.bottom).toBeLessThan(row.strip.top);
    expect(row.strip.top - row.date.bottom).toBeCloseTo(4, 1);
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
        expect(current.left - previous.right).toBeGreaterThanOrEqual(11);
        expect(current.left - previous.right).toBeLessThanOrEqual(13);
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
      expect(current.top - previous.bottom).toBeCloseTo(3, 1);
    }
    for (const item of row.scopeItems) {
      expect(item.left).toBeGreaterThanOrEqual(row.rail.left);
      expect(item.right).toBeLessThanOrEqual(row.rail.right);
      expect(item.bottom - item.top).toBeLessThan(24);
    }
  }
}
