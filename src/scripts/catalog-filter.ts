// Read only the public name, description and Scope labels already in the DOM.
// No extra content index, URL state, storage, or EventExplorer dependency.
function normalize(value: string) {
  return value.normalize('NFKC').toLocaleLowerCase('en')
    .replace(/[\p{P}\p{S}]+/gu, ' ').replace(/\s+/g, ' ').trim();
}

export function enhanceCatalog(catalog: HTMLElement) {
  const form = catalog.querySelector<HTMLFormElement>('[data-catalog-filters]')!;
  const search = form.querySelector<HTMLInputElement>('[data-catalog-search]')!;
  const scope = form.querySelector<HTMLSelectElement>('[data-catalog-scope]')!;
  const count = form.querySelector<HTMLElement>('[data-catalog-count]')!;
  const empty = catalog.querySelector<HTMLElement>('[data-catalog-empty]')!;
  const list = catalog.querySelector<HTMLOListElement>('.catalog-list')!;
  const projects = [...list.querySelectorAll<HTMLElement>('[data-catalog-project]')].map((row) => {
    const text = normalize([...row.querySelectorAll('h2, .catalog-description, [data-scope-label]')]
      .map((node) => node.textContent).join(' '));
    return { row, text, words: new Set(text.split(' ')),
      stages: new Set([...row.querySelectorAll<HTMLElement>('[data-scope-item]')].map((item) => item.dataset.scopeItem)) };
  });

  function update() {
    const query = normalize(search.value);
    const terms = query.split(' ').filter(Boolean);
    let visible = 0;
    for (const project of projects) {
      // Short terms such as AI match words, not incidental letters in "maintains".
      const matches = (!scope.value || project.stages.has(scope.value))
        && terms.every((term) => term.length <= 2 ? project.words.has(term) : project.text.includes(term));
      project.row.hidden = !matches;
      if (matches) visible++;
    }
    const filtered = Boolean(query || scope.value);
    count.textContent = filtered ? `${visible} of ${projects.length} projects` : `${projects.length} projects`;
    list.hidden = visible === 0;
    empty.hidden = visible !== 0;
  }

  form.addEventListener('submit', (event) => { event.preventDefault(); update(); });
  search.addEventListener('input', (event) => { if (!(event instanceof InputEvent && event.isComposing)) update(); });
  search.addEventListener('compositionend', update);
  scope.addEventListener('change', update);
  // Browsers may restore native form values on history navigation.
  window.addEventListener('pageshow', update);
  update();
  form.hidden = false;
}
