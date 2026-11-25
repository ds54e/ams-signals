import { readFile } from 'node:fs/promises';
import { readCatalogProjects } from './lib/catalog-input.mjs';
import { validateCatalog, validateActivity } from '../src/lib/analog/schema.ts';

const projects = await readCatalogProjects(new URL('../src/content/analog/', import.meta.url), { recursive: true });
const updates = JSON.parse(await readFile(new URL('../src/data/analog-updates.json', import.meta.url), 'utf8'));
validateCatalog(projects, updates);
const activity = JSON.parse(await readFile(new URL('../src/data/analog-activity.json', import.meta.url), 'utf8'));
validateActivity(projects, activity);
console.log(`Validated ${projects.length} independent Analog projects and ${updates.length} catalog updates; activity snapshot ${activity.reviewedAt} covers twelve months.`);
