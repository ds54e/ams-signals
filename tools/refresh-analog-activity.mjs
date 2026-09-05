// Manual only: never imported by a build, check, or browser entry point.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseFrontmatter } from 'astro/markdown';
import { activityMonths, countActivity } from '../src/lib/analog/activity.ts';
import { validateActivity } from '../src/lib/analog/schema.ts';

const exec = promisify(execFile);
const run = async (command, args) => (await exec(command, args, {
  timeout: 120_000, maxBuffer: 32 * 1024 * 1024, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
})).stdout;
const directory = new URL('../src/content/analog/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => ({
  id: file.slice(0, -3), data: parseFrontmatter(await readFile(new URL(file, directory), 'utf8')).frontmatter,
})));
const destination = new URL('../src/data/analog-activity.json', import.meta.url);
const previous = validateActivity(projects, JSON.parse(await readFile(destination, 'utf8')));
const scratch = await mkdtemp(join(tmpdir(), 'analog-activity-'));
const candidate = new URL(`../src/data/.analog-activity-${process.pid}.tmp`, import.meta.url);
try {
  const records = {};
  const histories = new Map();
  for (const [id, record] of Object.entries(previous.projects)) {
    // Non-GitHub history is reviewed manually; validation rejects a shifted capture month.
    if (record.kind !== 'github') { records[id] = record; continue; }
    const meta = JSON.parse(await run('gh', ['api', `repos/${record.repository}`]));
    if (meta.private || meta.fork || meta.archived || meta.full_name.toLowerCase() !== record.repository.toLowerCase()
      || (record.repositoryId !== undefined && meta.id !== record.repositoryId)) {
      throw new Error(`${id}: repository identity/access changed; review the primary source manually`);
    }
    await run('git', ['check-ref-format', `refs/heads/${meta.default_branch}`]);
    const git = join(scratch, `${id}.git`);
    await run('git', ['clone', '--quiet', '--bare', '--filter=blob:none', '--single-branch', '--branch', meta.default_branch,
      `https://github.com/${record.repository}.git`, git]);
    const headSha = (await run('git', [`--git-dir=${git}`, 'rev-parse', 'HEAD'])).trim();
    const log = await run('git', [`--git-dir=${git}`, 'log', '--first-parent', '--format=%H\t%cI', headSha]);
    const history = log.trim().split('\n').map((line) => line.split('\t'));
    if (record.lastMeaningfulCommitSha) {
      const date = history.find(([sha]) => sha === record.lastMeaningfulCommitSha)?.[1];
      if (!date || new Date(date).toISOString().slice(0, 10) !== record.lastMeaningfulCommitAt) {
        throw new Error(`${id}: meaningful commit is absent from first-parent history or its date differs; review manually`);
      }
    }
    histories.set(id, history.map(([, date]) => date));
    // Fresh commits do not automatically establish meaningful project activity.
    // Preserve the manually reviewed date; validation requires re-curation when it ages out.
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
  console.log(`Saved complete snapshot ${reviewedAt}. Review commit histories, meaningful-activity dates, repository notes, and paper-only status before committing.`);
} finally {
  await rm(candidate, { force: true });
  await rm(scratch, { recursive: true, force: true });
}
