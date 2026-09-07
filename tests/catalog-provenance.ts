import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { DevelopmentEvidence } from '../src/lib/catalog-scope.ts';

export const developmentEvidence = (): DevelopmentEvidence => ({
  summary: 'The maintainer credits an AI assistant with implementing the simulator backend and its command integration.',
  sources: ['code'], reviewedAt: '2026-09-07',
});

// Exercise each domain's actual schema with small fixtures, independently of the
// current research matrix and without treating a label as a runtime-AI setting.
export function provenanceSchemaTests(domain: string, schema: {
  parse(input: unknown): unknown;
  safeParse(input: unknown): { success: boolean };
}, base: () => { addedAt: string; sources: readonly { id: string }[] }, stages: readonly string[]) {
  const evidence = () => ({ ...developmentEvidence(), sources: [base().sources[0].id] });
  const labeled = () => ({ ...base(), scope: { [stages[0]]: { ai: false }, aiDevelopment: 'assisted' }, developmentEvidence: evidence() });

  test(`${domain} accepts assisted, built or absent independently of every runtime AI stage`, () => {
    for (const stage of stages) for (const ai of [false, true]) for (const level of [undefined, 'assisted', 'built']) {
      const scope = { [stage]: { ai }, ...(level ? { aiDevelopment: level } : {}) };
      const input = { ...base(), scope, developmentEvidence: level ? evidence() : undefined };
      const result = schema.parse(input) as { scope: typeof scope; developmentEvidence?: DevelopmentEvidence };
      assert.deepEqual(result.scope, scope);
      assert.equal(result.developmentEvidence?.reviewedAt, level ? '2026-09-07' : undefined);
    }
    for (const aiDevelopment of [true, false, null, '', 'AI-ASSISTED', 'ai-built', 'human', 'partial', 'core', 1,
      ['assisted', 'built'], { assisted: true, built: true }]) {
      assert.equal(schema.safeParse({ ...labeled(), scope: { [stages[0]]: { ai: false }, aiDevelopment } }).success, false);
    }
    for (const level of ['assisted', 'built']) {
      assert.equal(schema.safeParse({ ...labeled(), scope: { aiDevelopment: level } }).success, false, 'Provenance is not a functional stage');
    }
  });

  test(`${domain} rejects legacy and competing classification fields even alongside a valid enum`, () => {
    for (const aiBuilt of [true, false, 'built', null]) {
      assert.equal(schema.safeParse({ ...base(), scope: { [stages[0]]: { ai: false }, aiBuilt } }).success, false);
      assert.equal(schema.safeParse({ ...labeled(), scope: { ...labeled().scope, aiBuilt } }).success, false);
      assert.equal(schema.safeParse({ ...labeled(), aiBuilt }).success, false);
    }
    for (const field of ['aiAssisted', 'aiBuiltStrength', 'aiBuiltTier', 'aiDevelopmentConfidence', 'aiDevelopmentLevel', 'humanBuilt']) {
      assert.equal(schema.safeParse({ ...labeled(), [field]: true }).success, false);
      assert.equal(schema.safeParse({ ...labeled(), scope: { ...labeled().scope, [field]: true } }).success, false);
    }
  });

  test(`${domain} requires paired factual evidence with unique existing sources and a valid review date`, () => {
    assert.equal(schema.safeParse({ ...labeled(), developmentEvidence: undefined }).success, false);
    assert.equal(schema.safeParse({ ...labeled(), scope: { [stages[0]]: { ai: false } } }).success, false);
    const first = evidence().sources[0];
    const invalid = [
      null, {}, { ...evidence(), sources: [] }, { ...evidence(), sources: ['missing'] },
      { ...evidence(), sources: [first, first] }, { ...evidence(), sources: [first, 'a', 'b', 'c'] },
      { ...evidence(), sources: 'code' }, { ...evidence(), level: 'built' },
      ...['', 'TODO', 'x'.repeat(421), '<b>Generated</b>', 'See https://github.com', 'Line one\nLine two', '実装'].map((summary) => ({ ...evidence(), summary })),
      ...['2026-02-30', '2025-02-29', 'tomorrow', '2026-9-7', '2000-01-01'].map((reviewedAt) => ({ ...evidence(), reviewedAt })),
    ];
    for (const developmentEvidence of invalid) {
      assert.equal(schema.safeParse({ ...labeled(), developmentEvidence }).success, false, JSON.stringify(developmentEvidence));
    }
    const input = labeled();
    const addedAt = '2024-01-01';
    assert.equal(schema.safeParse({ ...input, addedAt, developmentEvidence: { ...evidence(), reviewedAt: '2024-02-29' } }).success, true);
    assert.equal(schema.safeParse({ ...input, developmentEvidence: { ...evidence(), sources: [first, 'account'] },
      sources: [...base().sources, { id: 'account', title: 'Maintainer account', url: 'https://github.com/author/project/commit/1234' }],
    }).success, true);
  });
}
