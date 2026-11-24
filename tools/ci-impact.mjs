// An allowlist, not an exclusion list: unknown paths, unavailable history and
// ambiguous changes always require the full browser regression.
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const catalogRecord = /^src\/content\/(analog|digital|lab)\/(?!AGENTS\.md$|README\.md$)[^/]+\.md$/;
const catalogActivity = /^src\/data\/(analog|digital|lab)-activity\.json$/;
const goldenRecord = /^src\/data\/(?:events|companies|people)\/[^/]+\.json$/;

export function contentAreas(paths) {
  const areas = new Set();
  for (const path of paths) {
    const area = catalogRecord.exec(path)?.[1] ?? catalogActivity.exec(path)?.[1]
      ?? (goldenRecord.test(path) ? 'golden' : null);
    if (!area) return null;
    areas.add(area);
  }
  return areas.size > 0 ? [...areas].sort() : null;
}

export function coreAreasForBase(base, diff = execFileSync) {
  if (!/^[a-f0-9]{40}$/.test(base ?? '') || /^0+$/.test(base)) return null;
  try {
    const output = diff('git', ['diff', '--name-only', '--no-renames', '-z', base, 'HEAD'], {
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    if (!output.endsWith('\0')) return null;
    return contentAreas(output.slice(0, -1).split('\0'));
  } catch {
    return null;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const areas = coreAreasForBase(process.argv[2]);
  console.log(`core_only=${areas !== null}`);
  if (areas) console.log(`core_grep=@core-(common|${areas.join('|')})(?:$|\\s)`);
}
