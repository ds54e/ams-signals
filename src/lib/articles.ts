import type { CollectionEntry } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;
export type ArticleRelationEntry = Pick<ArticleEntry, 'id'> & {
  data: Pick<ArticleEntry['data'], 'published' | 'relatedEvents'>;
};

type EventRelationEntry = {
  data: { id: string };
};

export function sortArticlesNewestFirst<T extends ArticleRelationEntry>(articles: readonly T[]): T[] {
  return [...articles].sort((left, right) =>
    right.data.published.localeCompare(left.data.published)
    || left.id.localeCompare(right.id, 'en'));
}

export function resolveRelatedEvents<T extends EventRelationEntry>(
  article: ArticleRelationEntry,
  events: readonly T[],
): T[] {
  const eventById = new Map(events.map((event) => [event.data.id, event]));
  const seen = new Set<string>();

  return article.data.relatedEvents.map((eventId) => {
    if (seen.has(eventId)) {
      throw new Error(`Article "${article.id}" contains duplicate related Event ID "${eventId}".`);
    }
    seen.add(eventId);

    const event = eventById.get(eventId);
    if (!event) {
      throw new Error(`Article "${article.id}" references unknown Event ID "${eventId}".`);
    }
    return event;
  });
}

export function validateArticleRelations(
  articles: readonly ArticleRelationEntry[],
  events: readonly EventRelationEntry[],
): void {
  for (const article of articles) resolveRelatedEvents(article, events);
}

export function findArticlesForEvent<T extends ArticleRelationEntry>(
  articles: readonly T[],
  eventId: string,
): T[] {
  return sortArticlesNewestFirst(articles.filter((article) => article.data.relatedEvents.includes(eventId)));
}
