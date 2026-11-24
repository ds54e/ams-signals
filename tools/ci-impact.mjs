// An allowlist, not an exclusion list: unknown paths, unavailable history and
// ambiguous changes always require the full browser regression.
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const contentPaths = [
  /^src\/content\/(analog|digital|lab)\/(?!AGENTS\.md$|README\.md$)[^/]+\.md$/,
  /^src\/data\/(events|companies|people)\/[^/]+\.json$/,
  /^src\/data\/(analog|digital|lab)-activity\.json$/,
];

export function isContentOnly(paths) {
  return paths.length > 0 && paths.every((path) => contentPaths.some((pattern) => pattern.test(path)));
}

export function coreOnlyForBase(base, diff = execFileSync) {
  if (!/^[a-f0-9]{40}$/.test(base ?? '') || /^0+$/.test(base)) return false;
  try {
    const output = diff('git', ['diff', '--name-only', '--no-renames', '-z', base, 'HEAD'], {
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    if (!output.endsWith('\0')) return false;
    return isContentOnly(output.slice(0, -1).split('\0'));
  } catch {
    return false;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(`core_only=${coreOnlyForBase(process.argv[2])}`);
}
