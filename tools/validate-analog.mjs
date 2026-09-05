import { readdir, readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { validateCatalog, validateActivity } from '../src/lib/analog/schema.ts';

const directory = new URL('../src/content/analog/', import.meta.url);
const files = await readdir(directory, { recursive: true });
const projects = await Promise.all(files.filter((file) => file.endsWith('.md')).map(async (file) => {
  const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
  return { id: file.replace(/\.md$/, ''), data: frontmatter, body: content };
}));
const updates = JSON.parse(await readFile(new URL('../src/data/analog-updates.json', import.meta.url), 'utf8'));
validateCatalog(projects, updates);
const activity = JSON.parse(await readFile(new URL('../src/data/analog-activity.json', import.meta.url), 'utf8'));
validateActivity(projects, activity);
console.log(`Validated ${projects.length} independent Analog projects and ${updates.length} catalog updates; activity snapshot ${activity.reviewedAt} covers twelve months.`);
