import { hasRepositoryHistory } from './catalog-repository-activity.ts';

export const publicSignalTypes = ['paper', 'release', 'public-update'] as const;
type PublicSignalType = typeof publicSignalTypes[number];
const signalLabels: Record<PublicSignalType, string> = {
  paper: 'paper publication', release: 'release', 'public-update': 'public update',
};

type ActivityRecord =
  | { kind: 'github' | 'repository'; repository: string; defaultBranch: string; lastCommitAt: string; commits: readonly number[] }
  | { kind: 'no-public-repo' | 'public-update'; lastPublicUpdateAt?: string; lastPublicUpdateSource?: string; lastPublicUpdateType: PublicSignalType };
type ActivityCell = {
  month: string; active: boolean; detail: string; signal: 'repository' | PublicSignalType;
  commits?: number; source?: string;
};

export function monthLabel(month: string): string {
  return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${month}-01T00:00:00Z`));
}

/** A render-only view of validated records: point signals never become commit buckets. */
export function activityBand(record: ActivityRecord, months: readonly string[], sources: readonly { id: string; title: string }[]) {
  let date: string, provenance: string, cells: ActivityCell[];
  if (hasRepositoryHistory(record)) {
    date = record.lastCommitAt;
    provenance = `${record.repository}, default branch ${record.defaultBranch}`;
    cells = months.map((month, index) => ({
      month, active: record.commits[index] > 0, commits: record.commits[index], signal: 'repository',
      detail: `${monthLabel(month)} · ${record.commits[index]} default-branch commits`,
    }));
  } else {
    const source = sources.find((source) => source.id === record.lastPublicUpdateSource);
    if (!record.lastPublicUpdateAt || !source) throw new Error('Public activity needs its reviewed date and source');
    date = record.lastPublicUpdateAt;
    provenance = `${signalLabels[record.lastPublicUpdateType]}: ${source.title}`;
    cells = months.map((month) => {
      const active = month === date.slice(0, 7);
      return {
        month, active, signal: record.lastPublicUpdateType, source: active ? source.id : undefined,
        detail: `${monthLabel(month)} · ${active ? signalLabels[record.lastPublicUpdateType] : 'no reviewed public activity signal'}`,
      };
    });
  }
  return { date, provenance, cells, activeMonths: cells.filter((cell) => cell.active).length };
}
