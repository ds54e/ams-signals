import { readdir, readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';

// Read authored articles without interpreting domain metadata or activity.
export async function readCatalogProjects(directory, { recursive = false } = {}) {
  const files = await readdir(directory, { recursive });
  return Promise.all(files.filter((file) => file.endsWith('.md')).map(async (file) => {
    const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
    return { id: file.slice(0, -3), data: frontmatter, body: content };
  }));
}
