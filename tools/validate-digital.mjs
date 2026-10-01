import { readdir, readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { validateCatalog, validateActivity } from '../src/lib/digital/schema.ts';

const directory = new URL('../src/content/digital/', import.meta.url);
const projects = await Promise.all((await readdir(directory, { recursive: true })).filter((file) => file.endsWith('.md')).map(async (file) => {
  const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
  return { id: file.slice(0, -3), data: frontmatter, body: content };
}));
validateCatalog(projects);
const activity = validateActivity(projects, JSON.parse(await readFile(new URL('../src/data/digital-activity.json', import.meta.url), 'utf8')));
console.log(`Validated ${projects.length} independent Digital projects; activity snapshot ${activity.reviewedAt} covers twelve months.`);
