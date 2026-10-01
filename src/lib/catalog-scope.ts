import { z } from 'astro/zod';

export const stageScopeSchema = z.object({
  ai: z.boolean(),
}).strict();

export const aiDevelopmentSchema = z.enum(['assisted', 'built']);
export type AiDevelopment = z.infer<typeof aiDevelopmentSchema>;
export const developmentEvidenceSchema = z.object({
  summary: z.string().trim().min(1).max(420).refine(
    (value) => !/[\r\n\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]|https?:\/\/|<\/?[a-z]|\b(?:TODO|TBD|FIXME|PLACEHOLDER|lorem ipsum)\b/iu.test(value),
    'Use a concise factual English paragraph; keep links in source references',
  ),
  sources: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).min(1).max(3)
    .refine((ids) => new Set(ids).size === ids.length, 'Duplicate development evidence source'),
  reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
  }, 'Use a valid provenance review date'),
}).strict();
export type DevelopmentEvidence = z.infer<typeof developmentEvidenceSchema>;

// Both domains enforce the same classification/evidence relationship. This date
// records a provenance review independently of the public-activity snapshot.
export function validateDevelopmentEvidence(project: {
  scope: { aiDevelopment?: AiDevelopment };
  developmentEvidence?: DevelopmentEvidence;
  addedAt: string;
  sources: readonly { id: string }[];
}, context: z.RefinementCtx) {
  const evidence = project.developmentEvidence;
  if (Boolean(project.scope.aiDevelopment) !== Boolean(evidence)) {
    context.addIssue({ code: 'custom', path: ['developmentEvidence'], message: 'Development provenance requires both a classification and its evidence' });
  }
  if (!evidence) return;
  const sourceIds = new Set(project.sources.map((source) => source.id));
  evidence.sources.forEach((id, index) => {
    if (!sourceIds.has(id)) context.addIssue({ code: 'custom', path: ['developmentEvidence', 'sources', index], message: 'Unknown development evidence source' });
  });
  if (evidence.reviewedAt < project.addedAt) {
    context.addIssue({ code: 'custom', path: ['developmentEvidence', 'reviewedAt'], message: 'Provenance review cannot precede addition' });
  }
}

type Stage = z.infer<typeof stageScopeSchema>;
type Scope<T extends string> = Partial<Record<T, Stage>> & { aiDevelopment?: AiDevelopment };

// Domains own their stage vocabulary/order; runtime AI and development provenance
// remain separate facts, composed only for the static Scope list.
export function scopeItems<T extends string>(scope: Scope<T>, labels: Record<T, string>) {
  const items: { id: string; label: string; ai?: boolean; aiDevelopment?: AiDevelopment }[] = [];
  for (const id of Object.keys(labels) as T[]) {
    const stage = scope[id];
    if (stage) items.push({
      id, label: `${stage.ai ? 'AI ' : ''}${labels[id]}`, ai: stage.ai,
    });
  }
  if (scope.aiDevelopment) items.push({
    id: 'aiDevelopment', label: scope.aiDevelopment === 'assisted' ? 'AI-ASSISTED' : 'AI-BUILT',
    aiDevelopment: scope.aiDevelopment,
  });
  return items;
}
