// Manual capture engine. Importing this module performs no I/O or network work.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { activityMonths, countActivity } from '../../src/lib/catalog-activity.ts';
import { githubMetadata, planActivityRegistration, preserveUnselectedCapture } from '../activity-registration.mjs';

const exec = promisify(execFile);
const runCommand = async (command, args) => (await exec(command, args, {
  timeout: 120_000, maxBuffer: 32 * 1024 * 1024, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
})).stdout;

async function replaceSnapshot(destination, domain, snapshot) {
  // Stage beside the destination for atomic rename; clean up only our own files.
  const staging = await mkdtemp(new URL(`.${domain}-activity-`, destination));
  try {
    const candidate = join(staging, 'snapshot.json');
    await writeFile(candidate, `${JSON.stringify(snapshot, null, 2)}\n`, { flag: 'wx' });
    await rename(candidate, destination);
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

// Domain wrappers retain catalog/schema validation and repository/evidence policy.
// Runtime dependencies let offline tests exercise the complete capture transaction.
export async function refreshCatalogActivity({
  domain, projects, activitySchema, validateActivity, verifyRepository, verifyHistory, reviewMessage,
  destination = new URL(`../../src/data/${domain}-activity.json`, import.meta.url),
}, {
  args = process.argv.slice(2), now = () => new Date().toISOString(),
  fetchMetadata = githubMetadata, run = runCommand, logger = console,
} = {}) {
  const previous = activitySchema.parse(JSON.parse(await readFile(destination, 'utf8')));
  const selected = args.map((arg) => {
    if (!arg.startsWith('--project=')) throw new Error(`Unknown option: ${arg}`);
    return arg.slice('--project='.length);
  });
  if (selected.length && now().slice(0, 7) !== previous.reviewedAt.slice(0, 7)) {
    throw new Error('Month rollover requires a complete refresh, including manually captured repositories');
  }
  const registrations = planActivityRegistration(projects, previous, selected);
  validateActivity(registrations.filter(({ existing }) => existing).map(({ project }) => project), previous);
  const scratch = await mkdtemp(join(tmpdir(), `${domain}-activity-`));
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
        const meta = await fetchMetadata(repo);
        verifyRepository({ id, record, repository: repo, meta });
        await run('git', ['check-ref-format', `refs/heads/${meta.default_branch}`]);
        const git = join(scratch, `${id}.git`);
        await run('git', ['clone', '--quiet', '--bare', '--filter=blob:none', '--single-branch', '--branch', meta.default_branch,
          `https://github.com/${repo}.git`, git]);
        const headSha = (await run('git', [`--git-dir=${git}`, 'rev-parse', 'HEAD'])).trim();
        const log = await run('git', [`--git-dir=${git}`, 'log', '--first-parent', '--format=%H\t%cI', headSha]);
        const history = log.trim().split('\n').map((line) => line.split('\t'));
        const reviewedSha = record?.lastMeaningfulCommitSha ?? meaningfulSha;
        const meaningfulDate = history.find(([sha]) => sha === reviewedSha)?.[1];
        verifyHistory({ id, record, history, reviewedSha, meaningfulDate });
        histories.set(id, history.map(([, date]) => date));
        // Only mechanical fields advance; existing meaningful evidence remains manual.
        records[id] = { ...(record?.kind === 'github' ? record : {
          kind: 'github', repository: repo, repositoryId: meta.id,
          lastMeaningfulCommitAt: new Date(meaningfulDate).toISOString().slice(0, 10),
          lastMeaningfulCommitSha: reviewedSha,
        }), defaultBranch: meta.default_branch, headSha };
        logger.log(`${id}: captured ${repo} (${meta.default_branch}) at ${headSha.slice(0, 7)}`);
      } catch (error) {
        if (record?.kind === 'github') throw error;
        records[id] = { kind: 'unfetched', repository: repo, attemptedAt: now() };
        logger.warn(`${id}: activity not fetched (${error.message}); catalog entry remains visible`);
      }
    }
    const capturedAt = now();
    const reviewedAt = capturedAt.slice(0, 10);
    for (const [id, dates] of histories) Object.assign(records[id], countActivity(dates, capturedAt), { capturedAt });
    const snapshot = validateActivity(projects, {
      reviewedAt, capturedAt, method: 'first-parent-committer-utc', months: activityMonths(reviewedAt), projects: records,
    });
    await replaceSnapshot(destination, domain, snapshot);
    logger.log(`Saved complete snapshot ${reviewedAt}. ${reviewMessage}`);
    return snapshot;
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
}
