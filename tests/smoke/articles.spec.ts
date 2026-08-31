import { expect, test } from '@playwright/test';
import {
  findArticlesForEvent,
  resolveRelatedEvents,
  sortArticlesNewestFirst,
} from '../../src/lib/articles';

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

  expect(sortArticlesNewestFirst(articles).map(({ id }) => id)).toEqual([
    'same-date-a',
    'same-date-z',
    'older',
  ]);
  expect(articles.map(({ id }) => id)).toEqual(['older', 'same-date-z', 'same-date-a']);
});

test('related Event resolution preserves author order and rejects bad relationships', () => {
  const events = [event('event-a'), event('event-b')];
  expect(resolveRelatedEvents(article('valid-article', '2026-08-31', ['event-b', 'event-a']), events)
    .map(({ data }) => data.id)).toEqual(['event-b', 'event-a']);

  expect(() => resolveRelatedEvents(
    article('unknown-reference', '2026-08-31', ['missing-event']),
    events,
  )).toThrow('Article "unknown-reference" references unknown Event ID "missing-event".');

  expect(() => resolveRelatedEvents(
    article('duplicate-reference', '2026-08-31', ['event-a', 'event-a']),
    events,
  )).toThrow('Article "duplicate-reference" contains duplicate related Event ID "event-a".');
});

test('reverse Article lookup returns only related Articles in newest-first order', () => {
  const articles = [
    article('article-a', '2026-08-20', ['event-x']),
    article('article-b', '2026-08-31', ['event-x']),
    article('article-c', '2026-08-30', ['event-y']),
  ];

  expect(findArticlesForEvent(articles, 'event-x').map(({ id }) => id)).toEqual([
    'article-b',
    'article-a',
  ]);
  expect(findArticlesForEvent(articles, 'event-y').map(({ id }) => id)).toEqual(['article-c']);
  expect(findArticlesForEvent(articles, 'event-z')).toEqual([]);
});
