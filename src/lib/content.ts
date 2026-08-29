import type { CollectionEntry } from 'astro:content';

export type EventEntry = CollectionEntry<'events'>;
export type CompanyEntry = CollectionEntry<'companies'>;
export type PersonEntry = CollectionEntry<'people'>;

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
