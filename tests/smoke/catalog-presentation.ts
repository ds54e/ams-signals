import { expect, type Locator } from '@playwright/test';

export async function expectIndexColumns(columns: Locator) {
  await expect(columns.locator(':scope > div')).toHaveText(['Project', 'Scope', 'Activity']);
  await expect(columns.locator('[class$="activity-range"]')).toHaveCount(0);
}

export async function expectScopeCircles(scope: Locator) {
  expect(await scope.evaluateAll((nodes) => nodes.map((el) => el.textContent).join(' '))).not.toContain('◐');
  const cells = await scope.locator('li[data-scope-item][data-level]').evaluateAll((nodes) => nodes.map((cell) => {
    const mark = cell.querySelector<HTMLElement>('[aria-hidden="true"]');
    const style = mark && getComputedStyle(mark);
    const box = mark?.getBoundingClientRect();
    const parent = cell.getBoundingClientRect();
    return {
      item: cell.getAttribute('data-scope-item'), state: cell.getAttribute('data-level'), meaning: cell.querySelector('.visually-hidden')?.textContent?.replace(/^: /, ''),
      title: cell.getAttribute('title'), mark: mark ? { text: mark.textContent, state: mark.classList.contains(cell.getAttribute('data-level')!),
        width: box!.width, height: box!.height, radius: style!.borderRadius, border: parseFloat(style!.borderWidth),
        fill: style!.backgroundColor, color: style!.color, centerOffset: Math.abs(box!.top + box!.height / 2 - parent.top - parent.height / 2),
      } : null,
    };
  }));
  expect(cells.length).toBeGreaterThan(0);
  for (const cell of cells) {
    expect(['core', 'supporting']).toContain(cell.state);
    const meaning = cell.item === 'aiBuilt'
      ? cell.state === 'core' ? 'Defining AI development provenance' : 'Partial or secondary AI development provenance'
      : cell.state === 'core' ? 'Core scope' : 'Supporting scope';
    expect(cell.meaning).toBe(meaning);
    expect(cell.title).toContain(meaning);
    expect(cell.mark).not.toBeNull();
    expect(cell.mark!.text).toBe(''); // CSS shape, independent of font glyphs.
    expect(cell.mark!.state).toBe(true);
    expect(cell.mark!.width).toBeCloseTo(cell.mark!.height, 1);
    expect(cell.mark!.width).toBeGreaterThanOrEqual(9);
    expect(cell.mark!.radius).toBe('50%');
    expect(cell.mark!.border).toBeGreaterThan(0);
    expect(cell.mark!.centerOffset).toBeLessThan(3);
    expect(cell.mark!.fill).toBe(cell.state === 'core' ? cell.mark!.color : 'rgba(0, 0, 0, 0)');
  }
  const marks = cells.filter((cell) => cell.mark);
  expect(new Set(marks.map((cell) => cell.mark!.color)).size).toBe(1);
  expect(new Set(marks.map((cell) => cell.mark!.width)).size).toBe(1);
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
    const summary = activity.querySelector<HTMLElement>('[class$="activity-summary"]');
    const summaryBox = summary?.getBoundingClientRect();
    const visible = activity.cloneNode(true) as HTMLElement;
    visible.querySelectorAll('.visually-hidden').forEach((node) => node.remove());
    return {
      id: el.getAttribute('data-catalog-project') ?? el.getAttribute('data-digital-project'), kind: activity.getAttribute('data-activity-kind'), text: [...visible.childNodes].map((node) => node.textContent).join(' ').replace(/\s+/g, ' ').trim(),
      date: time.getAttribute('datetime'), dateText: time.textContent, weight: Number(getComputedStyle(time).fontWeight),
      dateLine: time.parentElement!.innerText, provenance: time.title,
      dateBottom: time.getBoundingClientRect().bottom, dateRight: time.getBoundingClientRect().right,
      stripTop: stripBox?.top, stripBottom: stripBox?.bottom, stripWidth: stripBox?.width, stripRight: stripBox?.right, stripLeft: stripBox?.left,
      activityWidth: activity.getBoundingClientRect().width, activityRight: activity.getBoundingClientRect().right,
      label: strip?.getAttribute('aria-label') ?? null, links: activity.querySelectorAll('a').length,
      summary: summary?.textContent ?? null, summaryTop: summaryBox?.top, summaryRight: summaryBox?.right, summaryLeft: summaryBox?.left,
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
    expect(item.dateText).toBe(new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC',
      ...(date.slice(0, 4) !== snapshot.reviewedAt.slice(0, 4) ? { year: 'numeric' } : {}),
    }).format(new Date(`${date}T00:00:00Z`)));
    expect(item.weight).toBe(400);
    expect(item.dateLine).toBe(item.dateText);
    expect(item.text).toBe(`${item.dateText} ${item.summary}`);
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
    expect(item.summary).toBe(`${activeMonths}/12 months`);
    expect(item.months).toHaveLength(12);
    const monthLabel = (month: string) => new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month}-01T00:00:00Z`));
    expect(item.label).toContain(`${monthLabel(snapshot.months[11])}–${monthLabel(snapshot.months[0])} (newest to oldest)`);
    expect(item.months[0].month).toBe(snapshot.reviewedAt.slice(0, 7));
    expect(item.months[11].month).toBe(snapshot.months[0]);
    expect(item.months[0].left).toBe(Math.min(...item.months.map((month) => month.left)));
    expect(item.months[11].left).toBe(Math.max(...item.months.map((month) => month.left)));
    expect(item.dateBottom).toBeLessThan(item.stripTop!);
    expect(item.stripBottom).toBeLessThan(item.summaryTop!);
    expect(item.activityWidth).toBeGreaterThanOrEqual(105);
    expect(item.activityWidth).toBeLessThanOrEqual(110);
    expect(item.stripWidth).toBeCloseTo(82, 1);
    expect(item.stripWidth).toBeLessThan(item.activityWidth);
    expect(item.dateRight).toBeLessThanOrEqual(item.activityRight);
    expect(item.summaryLeft).toBeCloseTo(item.stripLeft!, 1);
    expect(item.summaryRight).toBeLessThanOrEqual(item.activityRight);
    for (let index = 0; index < 12; index++) {
      const bucket = item.months[index];
      const sourceIndex = 11 - index; // 0 months ago at the left, 11 months ago at the right.
      const month = snapshot.months[sourceIndex]; const count = record.commits?.[sourceIndex];
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
      expect(bucket.width).toBe(5); expect(bucket.height).toBe(12);
      // Upright segments, like an HP gauge; the full twelve-month band stays short.
      expect(bucket.height / bucket.width).toBeGreaterThanOrEqual(2);
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

export async function expectTitleAndIndexGeometry(rows: Locator, prefix: 'catalog' | 'digital', width: number) {
  const geometry = await rows.evaluateAll((nodes, p) => nodes.map((el) => {
    const rect = (node: Element) => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width }; };
    const title = el.querySelector(`.${p}-title`)!;
    return {
      columns: [...el.querySelector('article')!.children].map(rect), row: rect(el),
      title: rect(title), name: rect(el.querySelector('h2')!),
      justify: getComputedStyle(title).justifyContent,
      titleChildren: [...title.children].map(rect),
      nameLinks: el.querySelectorAll('h2 a').length, nameText: el.querySelector('h2')!.textContent,
      links: [...el.querySelectorAll(`.${p}-title .${p}-quicklinks a`)].map(rect),
      description: rect(el.querySelector(`.${p}-description`)!),
      scopeStyle: getComputedStyle(el.querySelector(`.${p}-scope`)!).display,
      scopeDirection: getComputedStyle(el.querySelector(`.${p}-scope`)!).flexDirection,
      scopeItems: [...el.querySelectorAll('[data-scope-item]')].map(rect),
    };
  }), prefix);
  for (const row of geometry) {
    expect(row.columns).toHaveLength(3);
    expect(row.row.width).toBeLessThanOrEqual(1120);
    if (width >= 1024) {
      expect(row.columns[0].width).toBeGreaterThan(610);
      expect(row.columns[1].width).toBe(170);
      expect(row.columns[2].width).toBe(108);
      expect(row.columns[1].left - row.columns[0].right).toBe(22);
      expect(row.columns[2].left - row.columns[1].right).toBe(22);
      if (width >= 1280) {
        expect(row.row.width).toBe(1120);
        expect(row.columns[0].width).toBe(798);
      }
    } else {
      expect(new Set(row.columns.map((column) => column.left)).size).toBe(1);
      expect(row.columns[0].bottom).toBeLessThan(row.columns[1].top);
      expect(row.columns[1].bottom).toBeLessThan(row.columns[2].top);
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
      expect(item.left).toBeGreaterThanOrEqual(row.columns[1].left);
      expect(item.right).toBeLessThanOrEqual(row.columns[1].right);
      expect(item.bottom - item.top).toBeLessThan(24);
    }
  }
}
