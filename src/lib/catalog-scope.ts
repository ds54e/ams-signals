import { z } from 'astro/zod';

export const scopeLevelSchema = z.enum(['core', 'supporting']);
export const stageScopeSchema = z.object({
  level: scopeLevelSchema,
  ai: z.boolean(),
}).strict();

type Level = z.infer<typeof scopeLevelSchema>;
type Stage = z.infer<typeof stageScopeSchema>;
type Scope<T extends string> = Partial<Record<T, Stage>> & { aiBuilt?: Level };
export const scopeMeanings = { core: 'Core scope', supporting: 'Supporting scope' };
const buildMeanings = {
  core: 'Defining AI development provenance',
  supporting: 'Partial or secondary AI development provenance',
};

// Domains own their stage vocabulary/order; runtime AI and development provenance
// remain separate facts, composed only for the static Scope list.
export function scopeItems<T extends string>(scope: Scope<T>, labels: Record<T, string>) {
  const items: { id: string; label: string; level: Level; ai?: boolean; meaning: string }[] = [];
  for (const id of Object.keys(labels) as T[]) {
    const stage = scope[id];
    if (stage) items.push({
      id, label: `${stage.ai ? 'AI ' : ''}${labels[id]}`, level: stage.level,
      ai: stage.ai, meaning: scopeMeanings[stage.level],
    });
  }
  if (scope.aiBuilt) items.push({
    id: 'aiBuilt', label: 'AI-built', level: scope.aiBuilt, meaning: buildMeanings[scope.aiBuilt],
  });
  return items;
}
