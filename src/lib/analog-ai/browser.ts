import { catalogUrl, matchesProject, normalizeSearch, resolveCatalogUrl } from './catalog';
import type { CatalogState, SearchableProject } from './catalog';

export function initializeCatalog() {
  const root = document.querySelector<HTMLElement>('[data-analog-ai]');
  if (!root) return;
  const form = root.querySelector<HTMLFormElement>('[data-catalog-controls]')!;
  const search = root.querySelector<HTMLInputElement>('[data-catalog-search]')!;
  const type = root.querySelector<HTMLSelectElement>('[data-catalog-type]')!;
  const count = root.querySelector<HTMLElement>('[data-catalog-count]')!;
  const empty = root.querySelector<HTMLElement>('[data-catalog-empty]')!;
  const notice = root.querySelector<HTMLElement>('[data-catalog-notice]')!;
  const elements = [...root.querySelectorAll<HTMLElement>('[data-catalog-project]')];
  const projects: SearchableProject[] = elements.map((element) => ({
    id: element.id,
    roles: JSON.parse(element.dataset.roles!),
    text: normalizeSearch([
      ...JSON.parse(element.dataset.aliases!),
      ...[...element.querySelectorAll('[data-searchable]')].map((part) => part.textContent ?? ''),
    ].join(' ')),
  }));
  let composing = false;
  let searchSession = false;

  function filter(state: CatalogState) {
    let visible = 0;
    projects.forEach((project, index) => {
      const matches = matchesProject(project, state);
      elements[index].hidden = !matches;
      if (matches) visible += 1;
    });
    count.textContent = `Showing ${visible} of ${projects.length} projects`;
    empty.hidden = visible !== 0;
  }

  function updateUrl(url: URL, method: 'pushState' | 'replaceState') {
    if (url.href !== location.href) history[method](null, '', url);
  }

  function restore() {
    composing = false;
    searchSession = false;
    const result = resolveCatalogUrl(new URL(location.href), projects);
    search.value = result.state.q;
    type.value = result.state.type;
    filter(result.state);
    updateUrl(result.url, 'replaceState');
    notice.hidden = !result.cleared;
    notice.textContent = result.cleared ? 'Filters were cleared to show the linked project.' : '';
    if (result.target) {
      const target = elements.find((element) => element.id === result.target!.id)!;
      target.querySelector('details')!.open = true;
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
    }
  }

  function apply(method: 'pushState' | 'replaceState') {
    const state: CatalogState = { q: search.value, type: type.value as CatalogState['type'] };
    notice.hidden = true;
    filter(state);
    // A new user action replaces a linked-project arrival; its old hash must go.
    updateUrl(catalogUrl(new URL(location.href), state), method);
  }

  search.addEventListener('compositionstart', () => { composing = true; });
  search.addEventListener('compositionend', () => { composing = false; onSearch(); });
  function onSearch() {
    if (composing) return;
    // One history entry per editing session, never one per keystroke.
    apply(searchSession ? 'replaceState' : 'pushState');
    searchSession = true;
  }
  search.addEventListener('input', (event) => {
    if (!(event as InputEvent).isComposing) onSearch();
  });
  search.addEventListener('blur', () => { searchSession = false; });
  type.addEventListener('change', () => { searchSession = false; apply('pushState'); });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (composing) return;
    onSearch();
    searchSession = false;
  });
  form.addEventListener('reset', (event) => {
    event.preventDefault();
    search.value = '';
    type.value = '';
    composing = false;
    searchSession = false;
    apply('pushState');
  });
  window.addEventListener('popstate', restore);
  window.addEventListener('hashchange', restore);
  window.addEventListener('pageshow', (event) => { if (event.persisted) restore(); });

  // Static HTML starts open, so the complete text is also readable without JS.
  elements.forEach((element) => { element.querySelector('details')!.open = false; });
  root.querySelector<HTMLElement>('[data-catalog-static-count]')!.hidden = true;
  form.hidden = false;
  restore();
}
