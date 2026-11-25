import { readFile } from 'node:fs/promises';
import { readCatalogProjects } from './lib/catalog-input.mjs';
import { validateCatalog, validateActivity } from '../src/lib/digital/schema.ts';

const projects = await readCatalogProjects(new URL('../src/content/digital/', import.meta.url), { recursive: true });
validateCatalog(projects);
const activity = validateActivity(projects, JSON.parse(await readFile(new URL('../src/data/digital-activity.json', import.meta.url), 'utf8')));
console.log(`Validated ${projects.length} independent Digital projects; activity snapshot ${activity.reviewedAt} covers twelve months.`);
