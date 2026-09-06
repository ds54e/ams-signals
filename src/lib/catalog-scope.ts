import { z } from 'astro/zod';

export const stageScopeSchema = z.object({
  ai: z.boolean(),
}).strict();

type Stage = z.infer<typeof stageScopeSchema>;
type Scope<T extends string> = Partial<Record<T, Stage>> & { aiBuilt?: true };

// Domains own their stage vocabulary/order; runtime AI and development provenance
// remain separate facts, composed only for the static Scope list.
export function scopeItems<T extends string>(scope: Scope<T>, labels: Record<T, string>) {
  const items: { id: string; label: string; ai?: boolean }[] = [];
  for (const id of Object.keys(labels) as T[]) {
    const stage = scope[id];
    if (stage) items.push({
      id, label: `${stage.ai ? 'AI ' : ''}${labels[id]}`, ai: stage.ai,
    });
  }
  if (scope.aiBuilt) items.push({
    id: 'aiBuilt', label: 'AI-built',
  });
  return items;
}
