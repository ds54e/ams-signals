// Manual only. Checked-in data remains the build source; no network calls during checks.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseFrontmatter } from 'astro/markdown';
import { activityMonths, countActivity } from '../src/lib/eda-tools/activity.ts';
import { validateActivity, validateCatalog } from '../src/lib/eda-tools/schema.ts';
import { assertRepositoryIdentity, verifyMeaningfulCommit } from './eda-tools-activity-support.mjs';

const exec = promisify(execFile);
const run = async (command, args) => (await exec(command, args, {
  timeout: 120_000, maxBuffer: 32 * 1024 * 1024, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
})).stdout;
const directory = new URL('../src/content/eda-tools/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => {
  const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
  return { id: file.slice(0, -3), data: frontmatter, body: content };
}));
validateCatalog(projects);
const destination = new URL('../src/data/eda-tools-activity.json', import.meta.url);
const previous = validateActivity(projects, JSON.parse(await readFile(destination, 'utf8')));
const scratch = await mkdtemp(join(tmpdir(), 'eda-tools-activity-'));
const candidate = new URL(`../src/data/.eda-tools-activity-${process.pid}.tmp`, import.meta.url);
try {
  const records = {};
  const histories = new Map();
  for (const [id, record] of Object.entries(previous.projects)) {
    if (record.kind === 'public-update') { records[id] = record; continue; }
    const meta = JSON.parse(await run('gh', ['api', `repos/${record.repository}`]));
    assertRepositoryIdentity(record, meta);
    await run('git', ['check-ref-format', `refs/heads/${meta.default_branch}`]);
    const git = join(scratch, `${id}.git`);
    await run('git', ['clone', '--quiet', '--bare', '--filter=blob:none', '--single-branch', '--branch', meta.default_branch,
      `https://github.com/${record.repository}.git`, git]);
    const headSha = (await run('git', [`--git-dir=${git}`, 'rev-parse', 'HEAD'])).trim();
    const log = await run('git', [`--git-dir=${git}`, 'log', '--first-parent', '--format=%H\t%cI', headSha]);
    const history = log.trim().split('\n').map((line) => line.split('\t'));
    verifyMeaningfulCommit(record, history);
    histories.set(id, history.map(([, date]) => date));
    // Only mechanical fields advance. Meaningful dates/SHAs and non-GitHub updates stay manual.
    records[id] = { ...record, defaultBranch: meta.default_branch, headSha };
    console.log(`${id}: captured ${record.repository} (${meta.default_branch}) at ${headSha.slice(0, 7)}`);
  }
  const capturedAt = new Date().toISOString();
  const reviewedAt = capturedAt.slice(0, 10);
  for (const [id, dates] of histories) Object.assign(records[id], countActivity(dates, capturedAt));
  const snapshot = validateActivity(projects, {
    reviewedAt, capturedAt, method: 'first-parent-committer-utc', months: activityMonths(reviewedAt), projects: records,
  });
  await writeFile(candidate, `${JSON.stringify(snapshot, null, 2)}\n`, { flag: 'wx' });
  await rename(candidate, destination);
  console.log(`Saved complete snapshot ${reviewedAt}. Manually review meaningful activity and non-GitHub public updates before committing.`);
} finally {
  await rm(candidate, { force: true });
  await rm(scratch, { recursive: true, force: true });
}
