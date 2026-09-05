import { publicActivityDate, type PublicActivity } from './activity.ts';

export const areaIds = ['simulation', 'frontend-synthesis', 'formal-verification', 'debug-waveform', 'flow-physical'] as const;
export type EdaArea = typeof areaIds[number];
export const areaLabels: Record<EdaArea, string> = {
  simulation: 'Simulation', 'frontend-synthesis': 'Frontend / Synth',
  'formal-verification': 'Formal / Verify', 'debug-waveform': 'Debug / Wave',
  'flow-physical': 'Flow / Physical',
};
export const primaryLabels: Record<EdaArea, string> = {
  simulation: 'Simulation', 'frontend-synthesis': 'Frontend / Synthesis',
  'formal-verification': 'Formal / Verification', 'debug-waveform': 'Debug / Waveform',
  'flow-physical': 'Flow / Physical',
};
export const aiIds = ['ai-built', 'ai-enabled', 'traditional'] as const;
export const aiLabels = { 'ai-built': 'AI-built', 'ai-enabled': 'AI-enabled', traditional: 'Traditional' };
export const scopeLabels = { core: 'Core scope', supporting: 'Supporting scope' };
export const linkLabels = { official: 'Website', paper: 'Paper', code: 'Code', results: 'Results' };

export function sortProjects<T extends { id: string; data: { name: string } }>(
  projects: readonly T[], activity: Readonly<Record<string, PublicActivity>>,
): T[] {
  const key = (name: string) => name.normalize('NFKC').toLowerCase().trim();
  const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
  return [...projects].sort((a, b) =>
    compare(publicActivityDate(activity[b.id]), publicActivityDate(activity[a.id]))
    || compare(key(a.data.name), key(b.data.name)) || compare(a.id, b.id));
}
