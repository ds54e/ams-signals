import { readFile, readdir } from 'node:fs/promises';
import type { CompanyEntry, EventEntry, PersonEntry } from '../../src/lib/content.ts';

export interface GoldenCorpus {
  events: EventEntry[];
  companies: CompanyEntry[];
  people: PersonEntry[];
}

/**
 * Loads the actual Golden source records the way the Astro content collections do:
 * one entry per JSON file, with the file stem as both the entry id and `data.id`.
 */
const loadDirectory = async <T>(relativeDirectory: string): Promise<T[]> => {
  const directory = new URL(relativeDirectory, import.meta.url);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.json')).sort();
  return Promise.all(files.map(async (file) => ({
    id: file.replace(/\.json$/, ''),
    collection: file,
    data: JSON.parse(await readFile(new URL(file, directory), 'utf8')),
  } as unknown as T)));
};

export async function loadGoldenCorpus(): Promise<GoldenCorpus> {
  const [events, companies, people] = await Promise.all([
    loadDirectory<EventEntry>('../../src/data/events/'),
    loadDirectory<CompanyEntry>('../../src/data/companies/'),
    loadDirectory<PersonEntry>('../../src/data/people/'),
  ]);
  return { events, companies, people };
}
