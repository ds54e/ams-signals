import assert from 'node:assert/strict';
import test from 'node:test';
import {
  resolveRelatedEvents,
  sortArticlesNewestFirst,
} from '../../src/lib/articles.ts';

type SyntheticArticle = {
  id: string;
  data: {
    published: string;
    relatedEvents: string[];
  };
};

const article = (
  id: string,
  published: string,
  relatedEvents: string[] = [],
): SyntheticArticle => ({ id, data: { published, relatedEvents } });

const event = (id: string) => ({ data: { id } });

test('Articles sort newest-first with stable ID tie-breaking', () => {
  const articles = [
    article('older', '2026-08-20'),
    article('same-date-z', '2026-08-31'),
    article('same-date-a', '2026-08-31'),
  ];

  assert.deepEqual(sortArticlesNewestFirst(articles).map(({ id }) => id), [
    'same-date-a',
    'same-date-z',
    'older',
  ]);
  assert.deepEqual(articles.map(({ id }) => id), ['older', 'same-date-z', 'same-date-a']);
});

test('related Event resolution preserves author order and rejects bad relationships', () => {
  const events = [event('event-a'), event('event-b')];
  assert.deepEqual(
    resolveRelatedEvents(article('valid-article', '2026-08-31', ['event-b', 'event-a']), events)
      .map(({ data }) => data.id),
    ['event-b', 'event-a'],
  );

  assert.throws(
    () => resolveRelatedEvents(article('unknown-reference', '2026-08-31', ['missing-event']), events),
    { message: 'Article "unknown-reference" references unknown Event ID "missing-event".' },
  );

  assert.throws(
    () => resolveRelatedEvents(article('duplicate-reference', '2026-08-31', ['event-a', 'event-a']), events),
    { message: 'Article "duplicate-reference" contains duplicate related Event ID "event-a".' },
  );
});
