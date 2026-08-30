import type { CollectionEntry } from 'astro:content';

export type EventEntry = CollectionEntry<'events'>;
export type CompanyEntry = CollectionEntry<'companies'>;
export type PersonEntry = CollectionEntry<'people'>;
export type AnalysisEntry = CollectionEntry<'analysis'>;

export function dateNumber(value: string): number {
  const [year, month = '01', day = '01'] = value.split('-');
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

export function eventYear(event: EventEntry): number {
  return Number(event.data.when.start.slice(0, 4));
}

export function sortEvents(events: EventEntry[]): EventEntry[] {
  return [...events].sort((a, b) => dateNumber(a.data.when.start) - dateNumber(b.data.when.start));
}

export function orderCompaniesByGoldenEventCount(
  companies: CompanyEntry[],
  events: EventEntry[],
): Array<{ company: CompanyEntry; eventCount: number }> {
  const eventCounts = new Map<string, number>();

  for (const event of events) {
    for (const companyId of new Set(event.data.companies)) {
      eventCounts.set(companyId, (eventCounts.get(companyId) ?? 0) + 1);
    }
  }

  return companies
    .map((company) => ({ company, eventCount: eventCounts.get(company.data.id) ?? 0 }))
    .sort((left, right) =>
      right.eventCount - left.eventCount
      || left.company.data.name.localeCompare(right.company.data.name, 'en')
      || left.company.data.id.localeCompare(right.company.data.id, 'en'));
}

export function formatWhen(event: EventEntry): string {
  const { start, end, precision } = event.data.when;
  const format = (value: string) => {
    const [year, month, day] = value.split('-').map(Number);
    if (precision === 'year') return String(year);
    if (precision === 'month') {
      return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, 1)));
    }
    return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
  };
  return end ? `${format(start)} – ${format(end)}` : format(start);
}
