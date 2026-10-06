import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export async function filesUnder(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(absolute, extension);
    return entry.isFile() && entry.name.endsWith(extension) ? [absolute] : [];
  }));
  return nested.flat().sort();
}

export async function exists(file) {
  try {
    await access(file);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

export function publicPathFor(outputRoot, siteBase, file) {
  const relative = path.relative(outputRoot, file).split(path.sep).join('/');
  const route = relative === 'index.html' ? '' : relative.replace(/\/index\.html$/, '/');
  return `${siteBase}${route}`;
}

export async function readRecords(directory) {
  const files = await filesUnder(directory, '.json');
  return Promise.all(files.map(async (file) => JSON.parse(await readFile(file, 'utf8'))));
}
