const GOOGLE_TRANSLATE_URL = 'https://translate.google.com/translate';

export function englishAutoTranslationUrl(productionSourceUrl: string | URL): string {
  const translationUrl = new URL(GOOGLE_TRANSLATE_URL);
  translationUrl.searchParams.set('sl', 'ja');
  translationUrl.searchParams.set('tl', 'en');
  translationUrl.searchParams.set('u', new URL(productionSourceUrl).href);
  return translationUrl.href;
}
