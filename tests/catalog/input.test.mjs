import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseFrontmatter } from 'astro/markdown';
import { readCatalogProjects } from '../../tools/lib/catalog-input.mjs';

test('catalog reader preserves authored metadata and notes and selects Markdown files', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'catalog-input-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const directory = pathToFileURL(root + sep);
  const article = '---\nname: "Example"\nreviewedAt: "2026-11-25"\nscope:\n  design: { ai: false }\n---\n\n[Evidence](#source-code)\n';
  const parsed = parseFrontmatter(article);
  await mkdir(join(root, 'nested'));
  await writeFile(join(root, 'top.md'), article);
  await writeFile(join(root, 'nested', 'child.md'), article);
  await writeFile(join(root, 'ignored.json'), '{}');

  const expected = { data: parsed.frontmatter, body: parsed.content };
  assert.deepEqual(await readCatalogProjects(directory), [{ id: 'top', ...expected }]);
  const recursive = await readCatalogProjects(directory, { recursive: true });
  assert.deepEqual(recursive.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0), [
    { id: join('nested', 'child'), ...expected },
    { id: 'top', ...expected },
  ]);
});

test('missing catalog inputs fail instead of returning an empty catalog', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'catalog-input-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await assert.rejects(readCatalogProjects(pathToFileURL(join(root, 'missing') + sep)), { code: 'ENOENT' });
});
