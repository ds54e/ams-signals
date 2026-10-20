// Manual only. Checked-in data remains the build source; no network calls during checks.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseFrontmatter } from 'astro/markdown';
import { activityMonths, countActivity } from '../src/lib/digital/activity.ts';
import { activitySchema, validateActivity, validateCatalog } from '../src/lib/digital/schema.ts';
import { assertRepositoryIdentity, verifyMeaningfulCommit } from './digital-activity-support.mjs';
import { githubMetadata, planActivityRegistration, preserveUnselectedCapture } from './activity-registration.mjs';

const exec = promisify(execFile);
const run = async (command, args) => (await exec(command, args, {
  timeout: 120_000, maxBuffer: 32 * 1024 * 1024, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
})).stdout;
const directory = new URL('../src/content/digital/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => {
  const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
  return { id: file.slice(0, -3), data: frontmatter, body: content };
}));
validateCatalog(projects);
const destination = new URL('../src/data/digital-activity.json', import.meta.url);
const previous = activitySchema.parse(JSON.parse(await readFile(destination, 'utf8')));
const selected = process.argv.slice(2).map((arg) => {
  if (!arg.startsWith('--project=')) throw new Error(`Unknown option: ${arg}`);
  return arg.slice('--project='.length);
});
if (selected.length && new Date().toISOString().slice(0, 7) !== previous.reviewedAt.slice(0, 7)) {
  throw new Error('Month rollover requires a complete refresh, including manually captured repositories');
}
const registrations = planActivityRegistration(projects, previous, selected);
validateActivity(registrations.filter(({ existing }) => existing).map(({ project }) => project), previous);
const scratch = await mkdtemp(join(tmpdir(), 'digital-activity-'));
const candidate = new URL(`../src/data/.digital-activity-${process.pid}.tmp`, import.meta.url);
try {
  const records = {};
  const histories = new Map();
  for (const { project, existing: record, repository, meaningfulSha, selected: capture } of registrations) {
    const id = project.id;
    if (!capture) { records[id] = preserveUnselectedCapture(record, previous.capturedAt); continue; }
    // Non-GitHub history is reviewed manually; validation rejects a shifted capture month.
    if (record && record.kind !== 'github' && record.kind !== 'unfetched') { records[id] = record; continue; }
    const repo = record?.repository ?? repository;
    try {
      const meta = await githubMetadata(repo);
      if (record?.kind === 'github') assertRepositoryIdentity(record, meta);
      else if (meta.private || meta.fork || meta.archived || meta.full_name.toLowerCase() !== repo.toLowerCase()) {
        throw new Error(`${id}: repository identity/access changed; review the primary source manually`);
      }
      await run('git', ['check-ref-format', `refs/heads/${meta.default_branch}`]);
      const git = join(scratch, `${id}.git`);
      await run('git', ['clone', '--quiet', '--bare', '--filter=blob:none', '--single-branch', '--branch', meta.default_branch,
        `https://github.com/${repo}.git`, git]);
      const headSha = (await run('git', [`--git-dir=${git}`, 'rev-parse', 'HEAD'])).trim();
      const log = await run('git', [`--git-dir=${git}`, 'log', '--first-parent', '--format=%H\t%cI', headSha]);
      const history = log.trim().split('\n').map((line) => line.split('\t'));
      if (record?.kind === 'github') verifyMeaningfulCommit(record, history);
      const reviewedSha = record?.lastMeaningfulCommitSha ?? meaningfulSha;
      const meaningfulDate = history.find(([sha]) => sha === reviewedSha)?.[1];
      if (!meaningfulDate) throw new Error(`${id}: meaningful commit is absent from first-parent history`);
      histories.set(id, history.map(([, date]) => date));
      // Only mechanical fields advance. Meaningful dates/SHAs and non-GitHub updates stay manual.
      records[id] = { ...(record?.kind === 'github' ? record : { kind: 'github', repository: repo, repositoryId: meta.id,
        lastMeaningfulCommitAt: new Date(meaningfulDate).toISOString().slice(0, 10), lastMeaningfulCommitSha: reviewedSha }),
        defaultBranch: meta.default_branch, headSha };
      console.log(`${id}: captured ${repo} (${meta.default_branch}) at ${headSha.slice(0, 7)}`);
    } catch (error) {
      if (record?.kind === 'github') throw error;
      records[id] = { kind: 'unfetched', repository: repo, attemptedAt: new Date().toISOString() };
      console.warn(`${id}: activity not fetched (${error.message}); catalog entry remains visible`);
    }
  }
  const capturedAt = new Date().toISOString();
  const reviewedAt = capturedAt.slice(0, 10);
  for (const [id, dates] of histories) Object.assign(records[id], countActivity(dates, capturedAt), { capturedAt });
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
