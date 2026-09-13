import { readFile, writeFile } from 'node:fs/promises';

const reviewedAt = '2026-09-14';
const capturedAt = '2026-09-14T00:00:00.000Z';
const months = [
  '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03',
  '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09',
];

async function update(path, additions, revise = () => {}) {
  const snapshot = JSON.parse(await readFile(path, 'utf8'));
  snapshot.reviewedAt = reviewedAt;
  snapshot.capturedAt = capturedAt;
  snapshot.months = months;
  Object.assign(snapshot.projects, additions);
  revise(snapshot.projects);
  await writeFile(path, `${JSON.stringify(snapshot, null, 2)}\n`);
}

await update('src/data/analog-activity.json', {
  'cocotbext-ams': {
    kind: 'github',
    repository: 'VLSIDA/cocotbext-ams',
    repositoryId: 1184907467,
    defaultBranch: 'master',
    headSha: 'c64ad5c8a5b0a7550243520ab5d08651306edf0d',
    commits: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    lastCommitAt: '2026-03-19',
    lastMeaningfulCommitAt: '2026-03-19',
    lastMeaningfulCommitSha: 'c64ad5c8a5b0a7550243520ab5d08651306edf0d',
  },
  'ihp-sg13g2-ams-chip-template': {
    kind: 'github',
    repository: 'iic-jku/ihp-sg13g2-ams-chip-template',
    repositoryId: 1228233737,
    defaultBranch: 'main',
    headSha: '6524ffdd01daf7065d1669f268091b40cc4e3c21',
    commits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    lastCommitAt: '2026-08-26',
    lastMeaningfulCommitAt: '2026-08-26',
    lastMeaningfulCommitSha: '6524ffdd01daf7065d1669f268091b40cc4e3c21',
  },
  glayout: {
    kind: 'github',
    repository: 'ReaLLMASIC/gLayout',
    repositoryId: 846657008,
    defaultBranch: 'main',
    headSha: '3e129ede58b4d21509dad682e56b9d573cefe8ab',
    commits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    lastCommitAt: '2026-08-28',
    lastMeaningfulCommitAt: '2026-08-28',
    lastMeaningfulCommitSha: '3e129ede58b4d21509dad682e56b9d573cefe8ab',
  },
}, (projects) => {
  Object.assign(projects['razavi-bench'], {
    headSha: 'e2016fc760ff2c149c6d1ee268052bbc11280ac9',
    commits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    lastCommitAt: '2026-09-13',
    lastMeaningfulCommitAt: '2026-09-13',
    lastMeaningfulCommitSha: 'e2016fc760ff2c149c6d1ee268052bbc11280ac9',
    notes: 'Default-branch history was republished as a parentless root snapshot on 2026-09-13. The reviewed root contains the current benchmark, evaluator, website and simulator assets; earlier first-parent activity is no longer represented by the current branch history.',
  });
});

await update('src/data/digital-activity.json', {
  'uvm-2020-3-2': {
    kind: 'public-update',
    lastPublicUpdateAt: '2026-08-23',
    lastPublicUpdateSource: 'dated-observation',
    lastPublicUpdateType: 'public-update',
  },
  pyuvm: {
    kind: 'github',
    repository: 'pyuvm/pyuvm',
    repositoryId: 334507633,
    defaultBranch: 'master',
    headSha: 'a87a7386c765c5d810645ac18683a340cec0f6cc',
    commits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    lastCommitAt: '2026-09-07',
    lastMeaningfulCommitAt: '2026-08-31',
    lastMeaningfulCommitSha: 'f8355f3590142c26309eedc141fd7856552feaf7',
  },
  rtlscout: {
    kind: 'github',
    repository: 'huawei-csl/rtlscout',
    repositoryId: 1258007831,
    defaultBranch: 'main',
    headSha: 'bfeb165ee8c4ba8dc47a6fe575730e002da5092b',
    commits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    lastCommitAt: '2026-08-30',
    lastMeaningfulCommitAt: '2026-08-30',
    lastMeaningfulCommitSha: 'bfeb165ee8c4ba8dc47a6fe575730e002da5092b',
  },
});
