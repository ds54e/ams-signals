import assert from 'node:assert/strict';
import test from 'node:test';
import { dashboardActivity } from '../../src/lib/dashboard.ts';
import { sortProjects as sortAnalog } from '../../src/lib/analog/catalog.ts';

test('Home uses captured catalog dates and active projects while Events stay independent', () => {
  const months = ['2026-09', '2026-10'];
  const analog = { months, projects: {
    older: { kind: 'github' as const, lastCommitAt: '2026-09-15', commits: [2, 0] },
    newest: { kind: 'github' as const, lastCommitAt: '2026-10-20', commits: [0, 151] },
    pending: { kind: 'unfetched' as const },
  } };
  const digital = { months, projects: { cocotb: { kind: 'github' as const, commits: [1, 1] } } };
  const events = [{ data: { when: { start: '2026-10-03', precision: 'day' } } }];
  const rows = dashboardActivity(events, analog, digital, '2026-10-20');
  assert.deepEqual(rows.slice(-2).map(({ events, analog, digital }) => ({ events, analog, digital })), [
    { events: 0, analog: 1, digital: 1 }, { events: 1, analog: 1, digital: 1 },
  ]);
  const projects = Object.keys(analog.projects).map((id) => ({ id, data: { name: id } }));
  assert.deepEqual(sortAnalog(projects, analog.projects).map(({ id }) => id), ['newest', 'older', 'pending']);
});
